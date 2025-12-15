import { TicketRangeConfig } from './TicketRangeConfig';
import { PrizeLevelConfig } from './PrizeLevelConfig';
import { useLotteryStore } from '../../stores/useLotteryStore';
import { Volume2, VolumeX } from 'lucide-react';

export const ConfigPage = () => {
  const { config, updateConfig, resetAll } = useLotteryStore();

  return (
    <div className="max-w-4xl mx-auto w-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">系统配置</h1>
        <p className="text-slate-400">设置奖券范围、奖项等级及抽奖参数</p>
      </header>

      <div className="grid gap-8">
        {/* Global Settings */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 text-orange-400 flex items-center gap-2">
                <span>⚙️</span> 全局参数
            </h2>
            <div className="flex flex-wrap gap-8 items-center">
                <div className="flex items-center gap-4">
                    <span className="text-slate-400">音效开关</span>
                    <button 
                        onClick={() => updateConfig({ soundEnabled: !config.soundEnabled })}
                        className={`p-2 rounded-lg transition-colors ${config.soundEnabled ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}
                    >
                        {config.soundEnabled ? <Volume2 /> : <VolumeX />}
                    </button>
                </div>
                
                <div className="flex items-center gap-4">
                    <span className="text-slate-400">动画速度</span>
                    <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                        {[1, 2, 3].map(speed => (
                            <button
                                key={speed}
                                onClick={() => updateConfig({ animationSpeed: speed })}
                                className={`px-4 py-1 rounded-md text-sm transition-all ${config.animationSpeed === speed ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                {speed === 1 ? '慢' : speed === 2 ? '中' : '快'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 text-right">
                    <button 
                        onClick={() => {
                            if(window.confirm('确定要重置所有数据吗？这将清除所有配置和历史记录！')) {
                                resetAll();
                            }
                        }}
                        className="text-red-400 hover:text-red-300 text-sm underline decoration-red-400/30 hover:decoration-red-400 transition-colors"
                    >
                        重置系统数据
                    </button>
                </div>
            </div>
        </div>

        <TicketRangeConfig />
        <PrizeLevelConfig />
      </div>
    </div>
  );
};
