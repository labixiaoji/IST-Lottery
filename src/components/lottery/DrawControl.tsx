import { useLotteryStore } from '../../stores/useLotteryStore';
import { drawTicket } from '../../utils/lottery';
import { useSound } from '../../hooks/useSound';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { PrizeLevel } from '../../types';

interface DrawControlProps {
    onDrawComplete: (ticketNumber: number, prize: PrizeLevel) => void;
}

export const DrawControl = ({ onDrawComplete }: DrawControlProps) => {
  const { 
    isDrawing, 
    startDrawing, 
    stopDrawing, 
    completeDraw, 
    currentPrizeLevelId, 
    prizeLevels, 
    tickets, 
    config,
    setCurrentPrizeLevel
  } = useLotteryStore();

  const [displayNumber, setDisplayNumber] = useState<number | string>('?');
  const animationRef = useRef<number | null>(null);
  const { play } = useSound();
  
  const currentPrizeLevel = prizeLevels.find(l => l.id === currentPrizeLevelId);
  const availableTickets = tickets.filter(t => !t.isDrawn);
  const hasTickets = availableTickets.length > 0;
  const hasPrize = currentPrizeLevel && currentPrizeLevel.remaining > 0;
  const canDraw = hasTickets && hasPrize && !isDrawing;

  // Auto-select prize level
  useEffect(() => {
    // Only auto-select if no level is selected
    if (!currentPrizeLevelId && prizeLevels.length > 0) {
        // Try to find first available
        const firstAvailable = prizeLevels.find(l => l.remaining > 0);
        if (firstAvailable) {
            setCurrentPrizeLevel(firstAvailable.id);
        } else {
            // If all full, just select the first one (so we can see the list)
             setCurrentPrizeLevel(prizeLevels[0].id);
        }
    }
    // If current level is done but user manually selected it, we DON'T switch away automatically.
    // This allows viewing completed lists.
  }, [prizeLevels, currentPrizeLevelId, setCurrentPrizeLevel]);

  const handleStart = () => {
    if (!canDraw) return;
    startDrawing();
  };

  const handleStop = () => {
    if (!isDrawing) return;
    
    const winner = drawTicket(tickets);
    stopDrawing();
    
    if (winner !== null && currentPrizeLevel) {
        setDisplayNumber(winner);
        completeDraw(winner);
        onDrawComplete(winner, currentPrizeLevel);
        
        // Play configured music or default
        if (currentPrizeLevel.musicUrl) {
            play(currentPrizeLevel.musicUrl);
        }
        
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: [currentPrizeLevel.color || '#ffffff']
        });
    }
  };

  // Animation Loop
  useEffect(() => {
    if (isDrawing) {
        let lastTime = 0;
        // Map 1, 2, 3 to ms delay. 1(Slow)=100ms, 2(Normal)=50ms, 3(Fast)=20ms
        const speed = config.animationSpeed === 1 ? 100 : config.animationSpeed === 2 ? 50 : 20;
        
        const animate = (time: number) => {
            if (time - lastTime > speed) {
                if (availableTickets.length > 0) {
                    const randomTicket = availableTickets[Math.floor(Math.random() * availableTickets.length)];
                    setDisplayNumber(randomTicket.number);
                }
                lastTime = time;
            }
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);
    } else {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    }
    return () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };
  }, [isDrawing, availableTickets, config.animationSpeed]);

  return (
    <div className="flex flex-col items-center gap-6 py-8 w-full max-w-2xl mx-auto">
      {/* Prize Selection */}
      <div className="flex gap-3 flex-wrap justify-center mb-4">
        {prizeLevels.map(level => (
            <button
                key={level.id}
                onClick={() => setCurrentPrizeLevel(level.id)}
                className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                    currentPrizeLevelId === level.id 
                    ? 'bg-white text-black border-white scale-110 font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                    : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                } ${level.remaining === 0 ? 'opacity-50' : ''}`}
            >
                <span className="mr-2">{level.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${currentPrizeLevelId === level.id ? 'bg-black/10' : 'bg-slate-700'}`}>
                    {level.remaining}
                </span>
            </button>
        ))}
      </div>

      {/* Main Display */}
      <div className="relative w-80 h-80 flex items-center justify-center mb-4">
        {/* Outer Glow */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] border border-slate-700 ${isDrawing ? 'animate-pulse border-cyan-500/50' : ''}`}></div>
        
        {/* Inner Circle */}
        <div className="absolute inset-4 rounded-full bg-[#0f172a] flex items-center justify-center border border-slate-800 shadow-2xl overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-20" 
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} 
             />
             
             {/* Number */}
             <div className={`text-9xl font-black tabular-nums tracking-tighter transition-all duration-100 z-10 ${
                isDrawing 
                    ? 'text-white blur-[1px] scale-110' 
                    : 'text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-600 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] scale-100'
             }`}>
                {displayNumber}
             </div>
        </div>

        {/* Decorative Rings */}
        <div className={`absolute inset-[-10px] border border-cyan-500/20 rounded-full ${isDrawing ? 'animate-[spin_3s_linear_infinite]' : ''}`} 
             style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
        />
        <div className={`absolute inset-[-20px] border border-purple-500/20 rounded-full ${isDrawing ? 'animate-[spin_5s_linear_infinite_reverse]' : ''}`} 
             style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}
        />
      </div>

      {/* Control Button */}
      {!isDrawing ? (
          <button
            onClick={handleStart}
            disabled={!canDraw}
            className={`
                px-16 py-5 rounded-full text-2xl font-bold transition-all duration-300 transform group relative overflow-hidden
                ${canDraw 
                    ? 'bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 hover:shadow-[0_0_50px_rgba(6,182,212,0.6)]' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }
            `}
          >
            <span className="relative z-10">{hasTickets ? (hasPrize ? '开始抽奖' : '该奖项已抽完') : '奖池已空'}</span>
            {canDraw && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />}
          </button>
      ) : (
          <button
            onClick={handleStop}
            className="px-16 py-5 rounded-full text-2xl font-bold bg-red-500 hover:bg-red-600 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse hover:scale-105 transition-transform"
          >
            停止
          </button>
      )}
    </div>
  );
};
