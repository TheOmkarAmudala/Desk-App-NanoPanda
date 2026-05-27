import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus } from 'lucide-react';

export const GlowingNode = ({ onClick, isActive }) => {
  return (
    <motion.div 
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative group cursor-pointer pointer-events-auto"
      onClick={onClick}
    >
      <div className={`absolute -inset-[1.5px] rounded-xl overflow-hidden transition-opacity ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'}`}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#f97316,#ec4899,#8b5cf6,#06b6d4,#10b981,#f97316)]"
        />
      </div>

      <div className="relative w-64 bg-[#0a0a0c] rounded-xl p-5 shadow-2xl border border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-white/[0.03] rounded-lg border border-white/5">
            <Users className={`${isActive ? 'text-orange-500' : 'text-slate-400 group-hover:text-orange-500'} transition-colors`} size={20} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Employee Vault</h3>
            <p className="text-[10px] text-slate-500">Directory Management</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-orange-500/50" />
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <div className="w-1 h-1 rounded-full bg-slate-800" />
          </div>
          <Plus size={16} className={`${isActive ? 'text-orange-500' : 'text-slate-600 group-hover:text-orange-500'} transition-colors`} />
        </div>
      </div>
    </motion.div>
  );
};
