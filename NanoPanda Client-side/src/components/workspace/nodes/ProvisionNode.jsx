import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Send } from 'lucide-react';

export const ProvisionNode = ({ employeeName, setEmployeeName, handleAddInvite, selectedUser, transition }) => {
  return (
    <motion.div
      key="input-node"
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: selectedUser ? 0 : 1, 
        x: selectedUser ? -100 : 0,
        scale: selectedUser ? 0.9 : 1
      }}
      exit={{ opacity: 0, x: -20 }}
      transition={transition}
      className="relative w-64 bg-[#0a0a0c] border border-white/10 rounded-xl p-4 shadow-2xl overflow-hidden"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <UserPlus size={14} className="text-orange-500" />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Provision</span>
        </div>
        <div className="flex flex-col gap-2">
          <input 
            type="text" 
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddInvite()}
            placeholder="Name..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-orange-500/50 transition-all text-white"
          />
          <button 
            onClick={handleAddInvite}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <Send size={10} /> Set Invite
          </button>
        </div>
      </div>
    </motion.div>
  );
};
