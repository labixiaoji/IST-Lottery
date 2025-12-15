import { useState } from 'react';
import { useLotteryStore } from '../../stores/useLotteryStore';
import { Trash2, Plus, Music } from 'lucide-react';

export const PrizeLevelConfig = () => {
  const { prizeLevels, addPrizeLevel, removePrizeLevel } = useLotteryStore();
  const [newLevel, setNewLevel] = useState({ name: '', count: 1, musicUrl: '' });

  const handleAdd = () => {
    if (!newLevel.name) return;
    addPrizeLevel(newLevel);
    setNewLevel({ name: '', count: 1, musicUrl: '' });
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mt-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-purple-400 flex items-center gap-2">
        <span>🏆</span> 奖项等级配置
      </h2>
      
      {/* Add New Level */}
      <div className="flex flex-col md:flex-row items-end gap-4 mb-8 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
        <div className="flex flex-col gap-2 flex-1 w-full">
            <label className="text-sm text-slate-400">奖项名称</label>
            <input 
                type="text" 
                value={newLevel.name}
                onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                placeholder="例如：特等奖"
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors w-full"
            />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-32">
            <label className="text-sm text-slate-400">数量</label>
            <input 
                type="number" 
                value={newLevel.count}
                min={1}
                onChange={(e) => setNewLevel({ ...newLevel, count: parseInt(e.target.value) || 1 })}
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors w-full"
            />
        </div>
        <div className="flex flex-col gap-2 flex-1 w-full">
             <label className="text-sm text-slate-400 flex items-center gap-1">
                <Music className="w-3 h-3" /> 专属音乐URL (可选)
             </label>
             <input 
                 type="text" 
                 value={newLevel.musicUrl}
                 onChange={(e) => setNewLevel({ ...newLevel, musicUrl: e.target.value })}
                 placeholder="https://example.com/win.mp3"
                 className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors w-full"
             />
        </div>
        <button 
            onClick={handleAdd}
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 h-[42px]"
        >
            <Plus className="w-4 h-4" /> 添加
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {prizeLevels.map((level) => (
            <div key={level.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: level.color }} />
                    <div className="flex-1">
                        <div className="font-medium text-lg">{level.name}</div>
                        <div className="text-xs text-slate-500 md:hidden">共 {level.count} 名</div>
                    </div>
                </div>
                
                <div className="flex items-center gap-6 w-full md:w-auto justify-between">
                    <div className="text-slate-400 hidden md:block w-24 text-right">共 {level.count} 名</div>
                    <div className="text-slate-400 text-sm max-w-[150px] truncate flex items-center gap-1" title={level.musicUrl}>
                        {level.musicUrl ? (
                            <><Music className="w-3 h-3 text-purple-400" /> <span className="text-purple-400">已配音乐</span></>
                        ) : (
                            <span className="text-slate-600">默认音效</span>
                        )}
                    </div>
                    <button 
                        onClick={() => removePrizeLevel(level.id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="删除奖项"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        ))}
        {prizeLevels.length === 0 && (
            <div className="text-center text-slate-500 py-8 border-2 border-dashed border-slate-700 rounded-xl">
                暂无奖项配置，请添加奖项。
            </div>
        )}
      </div>
    </div>
  );
};
