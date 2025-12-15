import { Ticket } from '../types';

export function drawTicket(tickets: Ticket[]): number | null {
  const availableTickets = tickets.filter(t => !t.isDrawn);
  if (availableTickets.length === 0) return null;
  
  // Use crypto.getRandomValues for better randomness if available
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  const randomNumber = randomBuffer[0] / (0xffffffff + 1);
  
  const randomIndex = Math.floor(randomNumber * availableTickets.length);
  return availableTickets[randomIndex].number;
}
