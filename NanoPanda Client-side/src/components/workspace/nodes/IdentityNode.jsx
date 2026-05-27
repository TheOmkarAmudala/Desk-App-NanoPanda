import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const ActiveIdentityNode = ({ selectedUser, setSelectedUser, transition }) => {
  return (
    <motion.div
      key="fixed-accepted"
      onClick={() => setSelectedUser({ name: "Alex Rivet", email: "a.rivet@nanopanda.ai" })}
      animate={{ 
        x: selectedUser ? 0 : 0,
        y: selectedUser ? 0 : 0,
      }}
      transition={transition}
      className={`relative w-64 bg-[#0a0a0c] border rounded-xl p-3 shadow-xl cursor-pointer transition-all ${selectedUser ? 'border-orange-500 shadow-orange-500/10' : 'border-white/10 hover:border-emerald-500/50'}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500">Active Identity</span>
        </div>
        <CheckCircle2 size={12} className="text-emerald-500" />
      </div>
      <div className="bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2">
        <p className="text-[10px] font-bold text-white truncate">Alex Rivet</p>
        <p className="text-[8px] text-slate-500 truncate lowercase font-mono">a.rivet@nanopanda.ai</p>
      </div>
    </motion.div>
  );
};

export const PendingInviteNode = ({ invite, removeInvite }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative w-64 bg-[#0a0a0c] border border-white/10 rounded-xl p-3 shadow-xl flex flex-col gap-2 group transition-all hover:border-orange-500/30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-orange-500">Pending</span>
        </div>
        <button onClick={() => removeInvite(invite.id)} className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-slate-600 hover:text-red-500 uppercase">Cancel</button>
      </div>
      <div className="bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2">
        <p className="text-[10px] font-bold text-white truncate">{invite.name}</p>
        <p className="text-[8px] text-slate-500 truncate lowercase font-mono">{invite.email}</p>
      </div>
    </motion.div>
  );
};
