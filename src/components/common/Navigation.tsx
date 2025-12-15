import { Link, useLocation } from 'react-router-dom';
import { Home, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: '抽奖' },
    { path: '/config', icon: Settings, label: '配置' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-3 shadow-2xl">
      <div className="flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300 group",
                isActive ? "text-cyan-400 scale-110" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
