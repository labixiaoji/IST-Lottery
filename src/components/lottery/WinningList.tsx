import { useLotteryStore } from '../../stores/useLotteryStore';
import { RotateCcw, Trophy } from 'lucide-react';

export const WinningList = () => {
  const { drawRecords, revokeDraw, currentPrizeLevelId, prizeLevels } = useLotteryStore();

  const currentLevel = prizeLevels.find(l => l.id === currentPrizeLevelId);
  const currentRecords = drawRecords.filter(r => r.prizeLevelId === currentPrizeLevelId && !r.isRevoked);

  const handleRevoke = (id: string) => {
    if (window.confirm('确定要撤销这条中奖记录吗？号码将放回奖池。')) {
        revokeDraw(id);
    }
  };

  if (!currentLevel) return null;

  return (
    <div className="w-full h-full flex flex-col bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400">
            <Trophy className="w-5 h-5" />
            <h3 className="font-bold text-lg">{currentLevel.name} 中奖名单</h3>
        </div>
        <span className="text-sm text-slate-400">
            {currentRecords.length} / {currentLevel.count}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {currentRecords.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 py-10">
                <p>虚位以待...</p>
            </div>
        ) : (
            currentRecords.map((record, index) => (
                <div 
                    key={record.id}
                    className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors group animate-in slide-in-from-left-4 duration-300 fill-mode-backwards"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-sm border border-cyan-500/20">
                            {index + 1}
                        </span>
                        <span className="text-2xl font-black text-white tracking-tight">
                            {record.ticketNumber}
                        </span>
                    </div>
                    
                    <button
                        onClick={() => handleRevoke(record.id)}
                        className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        title="撤销中奖"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            ))
        )}
      </div>
    </div>
  );
};
