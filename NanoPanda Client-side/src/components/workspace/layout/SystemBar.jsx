import React from 'react';
import { Cpu, Settings } from 'lucide-react';

export const SystemBar = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5">
      <button className="p-2.5 rounded-xl hover:bg-white/5 text-slate-600 hover:text-white transition-all"><Cpu size={18} /></button>
      <button className="p-2.5 rounded-xl hover:bg-white/5 text-slate-600 hover:text-white transition-all"><Settings size={18} /></button>
      <div className="w-px h-6 bg-white/10 mx-1" />
      <button className="text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 text-slate-400 hover:text-white transition-colors">System v1.2</button>
    </div>
  );
};
