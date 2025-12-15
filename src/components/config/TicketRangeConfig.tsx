import { useState, useEffect } from 'react';
import { useLotteryStore } from '../../stores/useLotteryStore';

export const TicketRangeConfig = () => {
  const { config, setTicketRange } = useLotteryStore();
  const [start, setStart] = useState(config.startNumber);
  const [end, setEnd] = useState(config.endNumber);

  // Sync with store config if it changes externally
  useEffect(() => {
    setStart(config.startNumber);
    setEnd(config.endNumber);
  }, [config.startNumber, config.endNumber]);

  const handleSave = () => {
    if (start >= end) {
        alert("起始编号必须小于结束编号");
        return;
    }
    setTicketRange(start, end);
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
        <span>🎟️</span> 奖券范围设置
      </h2>
      <div className="flex flex-col md:flex-row items-end gap-4">
        <div className="flex flex-col gap-2 w-full md:w-auto">
            <label className="text-sm text-slate-400">起始编号</label>
            <input 
                type="number" 
                value={start}
                onChange={(e) => setStart(parseInt(e.target.value) || 0)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors w-full"
            />
        </div>
        <span className="text-slate-500 pb-3 hidden md:block">至</span>
        <div className="flex flex-col gap-2 w-full md:w-auto">
            <label className="text-sm text-slate-400">结束编号</label>
            <input 
                type="number" 
                value={end}
                onChange={(e) => setEnd(parseInt(e.target.value) || 0)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors w-full"
            />
        </div>
        <button 
            onClick={handleSave}
            className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg transition-colors font-medium h-[42px]"
        >
            应用设置
        </button>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        * 注意：修改范围可能会重置当前的抽奖状态。
      </p>
    </div>
  );
};
