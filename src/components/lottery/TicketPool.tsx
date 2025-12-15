import { useLotteryStore } from '../../stores/useLotteryStore';
import { cn } from '../../utils/cn';

export const TicketPool = () => {
  const { tickets } = useLotteryStore();

  return (
    <div className="flex-1 overflow-y-auto min-h-[300px] max-h-[500px] p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm custom-scrollbar">
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.number}
            className={cn(
              "aspect-square rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 select-none",
              ticket.isDrawn
                ? "bg-slate-700/30 text-slate-600 scale-90 grayscale shadow-inner"
                : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white hover:scale-110 shadow-[0_0_10px_rgba(34,211,238,0.1)] cursor-default"
            )}
          >
            {ticket.number}
          </div>
        ))}
      </div>
    </div>
  );
};
