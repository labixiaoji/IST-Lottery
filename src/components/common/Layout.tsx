import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden relative font-sans selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black -z-10" />
      
      {/* Animated Grid Background (CSS only) */}
      <div className="absolute inset-0 -z-10 opacity-20" 
           style={{
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
             backgroundSize: '50px 50px'
           }} 
      />
      
      <main className="container mx-auto px-4 py-8 pb-32 min-h-screen flex flex-col relative z-10">
        {children}
      </main>
      
      <Navigation />
    </div>
  );
};
