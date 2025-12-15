import { useState } from 'react';
import { TicketPool } from './TicketPool';
import { DrawControl } from './DrawControl';
import { DrawResult } from './DrawResult';
import { WinningList } from './WinningList';
import { PrizeLevel } from '../../types';
import { useSound } from '../../hooks/useSound';
import { VolumeX } from 'lucide-react';

export const LotteryPage = () => {
  const [result, setResult] = useState<{ winner: number | null; prize: PrizeLevel | null }>({
    winner: null,
    prize: null
  });
  const [isResultOpen, setIsResultOpen] = useState(false);
  const { isPlaying, stop } = useSound();

  const handleDrawComplete = (winner: number, prize: PrizeLevel) => {
    setResult({ winner, prize });
    setTimeout(() => {
        setIsResultOpen(true);
        
        // Auto close after 3 seconds
        setTimeout(() => {
            setIsResultOpen(false);
        }, 3000);
    }, 500); // Small delay for effect
  };

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500 pb-20 pt-4 px-4">
      <header className="text-center flex-none relative">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg mb-1 tracking-tight">
            IST 实验室晚会抽奖
        </h1>
        {isPlaying && (
            <button
                onClick={stop}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all animate-pulse"
                title="停止播放音乐"
            >
                <VolumeX className="w-6 h-6" />
            </button>
        )}
      </header>

      <div className="flex-1 min-h-0 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Draw Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex-none flex justify-center py-4">
                <DrawControl onDrawComplete={handleDrawComplete} />
            </div>
            
            <div className="flex-1 min-h-[300px] bg-slate-900/30 rounded-3xl p-6 border border-slate-800 backdrop-blur-sm relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
                 <TicketPool />
            </div>
        </div>

        {/* Side Panel: Winning List */}
        <div className="lg:col-span-4 flex flex-col h-full min-h-[400px]">
            <WinningList />
        </div>
      </div>

      <DrawResult 
        isOpen={isResultOpen} 
        onClose={() => setIsResultOpen(false)} 
        winner={result.winner} 
        prize={result.prize} 
      />
    </div>
  );
};
