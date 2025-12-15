import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, AppActions, Ticket, PrizeLevel } from '../types';
import { generateId, generateRandomColor } from '../utils/common';

const DEFAULT_CONFIG = {
  startNumber: 1,
  endNumber: 50,
  animationSpeed: 2,
  soundEnabled: true,
};

const INITIAL_STATE = {
  tickets: [],
  prizeLevels: [],
  drawRecords: [],
  currentPrizeLevelId: null,
  isDrawing: false,
};

// Helper to generate tickets based on range
const generateTickets = (start: number, end: number): Ticket[] => {
  const tickets: Ticket[] = [];
  for (let i = start; i <= end; i++) {
    tickets.push({ number: i, isDrawn: false });
  }
  return tickets;
};

export const useLotteryStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      config: DEFAULT_CONFIG,
      tickets: generateTickets(DEFAULT_CONFIG.startNumber, DEFAULT_CONFIG.endNumber),

      setTicketRange: (start, end) => {
        set((state) => {
            const newTickets = generateTickets(start, end);
            
            // Map existing drawn status
            const existingMap = new Map(state.tickets.map(t => [t.number, t]));
            const mergedTickets = newTickets.map(t => {
                const existing = existingMap.get(t.number);
                if (existing && existing.isDrawn) {
                    return existing;
                }
                return t;
            });

            return {
                config: { ...state.config, startNumber: start, endNumber: end },
                tickets: mergedTickets
            };
        });
      },

      addPrizeLevel: (levelData) => {
        const newLevel: PrizeLevel = {
            ...levelData,
            id: generateId(),
            remaining: levelData.count,
            color: levelData.color || generateRandomColor()
        };
        set((state) => ({
            prizeLevels: [...state.prizeLevels, newLevel],
            currentPrizeLevelId: state.currentPrizeLevelId || newLevel.id
        }));
      },

      updatePrizeLevel: (id, updates) => {
        set((state) => {
            const levels = state.prizeLevels.map(l => {
                if (l.id !== id) return l;
                const updated = { ...l, ...updates };
                // If count changed, adjust remaining carefully
                if (updates.count !== undefined) {
                    const diff = updates.count - l.count;
                    updated.remaining = Math.max(0, l.remaining + diff);
                }
                return updated;
            });
            return { prizeLevels: levels };
        });
      },

      removePrizeLevel: (id) => {
        set((state) => ({
            prizeLevels: state.prizeLevels.filter(l => l.id !== id),
            currentPrizeLevelId: state.currentPrizeLevelId === id 
                ? (state.prizeLevels.find(l => l.id !== id)?.id || null)
                : state.currentPrizeLevelId
        }));
      },

      setCurrentPrizeLevel: (id) => set({ currentPrizeLevelId: id }),

      startDrawing: () => set({ isDrawing: true }),

      stopDrawing: () => set({ isDrawing: false }),

      completeDraw: (ticketNumber) => {
        set((state) => {
            const { currentPrizeLevelId, prizeLevels, tickets } = state;
            if (!currentPrizeLevelId) return state;

            const currentLevel = prizeLevels.find(l => l.id === currentPrizeLevelId);
            if (!currentLevel || currentLevel.remaining <= 0) return state;

            // Update ticket
            const newTickets = tickets.map(t => 
                t.number === ticketNumber 
                ? { ...t, isDrawn: true, drawnAt: new Date().toISOString(), prizeLevelId: currentPrizeLevelId } 
                : t
            );

            // Update prize level
            const newPrizeLevels = prizeLevels.map(l => 
                l.id === currentPrizeLevelId 
                ? { ...l, remaining: l.remaining - 1 } 
                : l
            );

            // Add record
            const newRecord = {
                id: generateId(),
                ticketNumber,
                prizeLevelId: currentPrizeLevelId,
                prizeLevelName: currentLevel.name,
                drawnAt: new Date().toISOString(),
                isRevoked: false
            };

            return {
                tickets: newTickets,
                prizeLevels: newPrizeLevels,
                drawRecords: [newRecord, ...state.drawRecords],
                isDrawing: false
            };
        });
      },

      revokeDraw: (recordId) => {
        set((state) => {
            const record = state.drawRecords.find(r => r.id === recordId);
            if (!record || record.isRevoked) return state;

            // Update record
            const newRecords = state.drawRecords.map(r => 
                r.id === recordId ? { ...r, isRevoked: true } : r
            );

            // Restore ticket
            const newTickets = state.tickets.map(t => 
                t.number === record.ticketNumber 
                ? { ...t, isDrawn: false, drawnAt: undefined, prizeLevelId: undefined } 
                : t
            );

            // Restore prize level count
            const newPrizeLevels = state.prizeLevels.map(l => 
                l.id === record.prizeLevelId 
                ? { ...l, remaining: l.remaining + 1 } 
                : l
            );

            return {
                drawRecords: newRecords,
                tickets: newTickets,
                prizeLevels: newPrizeLevels
            };
        });
      },

      resetAll: () => {
          set({
              ...INITIAL_STATE,
              config: DEFAULT_CONFIG,
              tickets: generateTickets(DEFAULT_CONFIG.startNumber, DEFAULT_CONFIG.endNumber)
          });
      },

      resetPool: () => {
          set((state) => ({
              tickets: state.tickets.map(t => ({ ...t, isDrawn: false, drawnAt: undefined, prizeLevelId: undefined })),
              prizeLevels: state.prizeLevels.map(l => ({ ...l, remaining: l.count })),
              drawRecords: []
          }));
      },

      updateConfig: (updates) => {
          set((state) => ({
              config: { ...state.config, ...updates }
          }));
      }
    }),
    {
      name: 'ist-lottery-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
