import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import newly extracted components
import { DotGrid } from './workspace/DotGrid';
import { GlowingNode } from './workspace/GlowingNode';
import { ProvisionNode } from './workspace/ProvisionNode';
import { ActiveIdentityNode, PendingInviteNode } from './workspace/IdentityNode';
import { AccessProtocolPanel } from './workspace/AccessProtocolPanel';
import { SystemBar } from './workspace/SystemBar';

import {
  ArrowRight,
  ShieldCheck,
  Terminal,
  Activity,
  Box,
  Monitor,
  Shield,
  Lock,
  Cpu,
  Globe,
  Database,
  HardDrive,
  Layout,
  Layers,
  MessageSquare,
  Mail,
  Play,
  Cloud,
  Info,
  Bell,
  X
} from 'lucide-react';
import { invoke } from '@tauri-apps/api/core';

export default function WorkSpace() {
  const [isNodeActive, setIsNodeActive] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [pendingInvites, setPendingInvites] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // NEW
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [installedApps, setInstalledApps] = useState([]);
  const handleAddInvite = () => {
    if (employeeName.trim()) {
      const newInvite = {
        id: Date.now(),
        name: employeeName,
        email: `${employeeName.replace(/\s+/g, '.').toLowerCase()}@nanopanda.ai`,
        status: 'pending'
      };

      setPendingInvites([newInvite, ...pendingInvites]);
      setEmployeeName('');
    }
  };

  async function fetchApps() {

  try {

    const apps = await invoke("get_running_apps");

    console.log(apps);

    setInstalledApps(apps);

  } catch (err) {

    console.error(err);

  }

}

  const removeInvite = (id) => {
    setPendingInvites(
      pendingInvites.filter((inv) => inv.id !== id)
    );
  };

  const transition = {
    type: 'spring',
    stiffness: 40,
    damping: 20,
    mass: 1.2
  };

  return (
    <div className="relative w-full h-screen text-slate-300 overflow-hidden font-sans selection:bg-orange-500/20 bg-black">

      <DotGrid />

      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full h-16 bg-black/40 backdrop-blur-md z-30 flex items-center justify-between px-8 border-b border-white/5">

        <div className="flex items-center gap-12">

          <span className="font-bold tracking-[0.2em] text-lg text-white">
            NANOPANDA
          </span>

          <nav className="hidden md:flex items-center gap-8">

            <button className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              Platform
            </button>

            <button className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              Partners
            </button>

            <button
              onClick={async () => {

  setIsNotificationOpen(true);

  await fetchApps();

}}
              className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2"
            >
              <Bell size={13} />
              Notifications
            </button>

          </nav>

        </div>

        <button className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-full font-bold text-[11px] uppercase tracking-wider flex items-center gap-2 transition-all">
          Get a demo
          <ArrowRight size={14} />
        </button>

      </header>

      {/* MAIN */}
      <main className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none p-20 overflow-hidden">

        <motion.div
          animate={{ x: selectedUser ? '-15%' : '0%' }}
          transition={transition}
          className="flex items-start gap-12 max-w-full relative"
        >

          {/* PARENT NODE */}
          <motion.div
            animate={{
              opacity: selectedUser ? 0 : 1,
              scale: selectedUser ? 0.8 : 1,
              filter: selectedUser ? 'blur(10px)' : 'blur(0px)'
            }}
            transition={transition}
            className="relative flex flex-col items-center"
          >

            <GlowingNode
              isActive={isNodeActive}
              onClick={() => setIsNodeActive(!isNodeActive)}
            />

            <AnimatePresence>
              {isNodeActive && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  exit={{ width: 0 }}
                  className="absolute left-full top-1/2 w-12 h-px bg-gradient-to-r from-orange-500 to-orange-500/10 -translate-y-1/2 pointer-events-none"
                />
              )}
            </AnimatePresence>

          </motion.div>

          {/* ACTION AREA */}
          <div className="flex flex-col gap-4 pointer-events-auto max-h-[80vh] overflow-y-auto no-scrollbar pr-4">

            <AnimatePresence>

              {isNodeActive && (
                <>

                  <ProvisionNode
                    employeeName={employeeName}
                    setEmployeeName={setEmployeeName}
                    handleAddInvite={handleAddInvite}
                    selectedUser={selectedUser}
                    transition={transition}
                  />

                  <ActiveIdentityNode
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    transition={transition}
                  />

                  {!selectedUser &&
                    pendingInvites.map((invite) => (
                      <PendingInviteNode
                        key={invite.id}
                        invite={invite}
                        removeInvite={removeInvite}
                      />
                    ))}

                </>
              )}

            </AnimatePresence>

          </div>

        </motion.div>

        {/* ACCESS PANEL */}
       <AccessProtocolPanel
  selectedUser={selectedUser}
  setSelectedUser={setSelectedUser}
  apps={installedApps}
  transition={transition}
/>

        {/* HERO TEXT */}
        <div className="absolute bottom-16 right-10 text-right opacity-[0.03] pointer-events-none select-none max-w-lg">

          <h1 className="text-8xl font-black italic tracking-tighter leading-[0.8] text-white">
            SECURING AI
            <br />
            STARTS WITH
            <br />
            NANOPANDA
          </h1>

        </div>

      </main>

      <SystemBar />

      {/* NOTIFICATION POPUP */}
      <AnimatePresence>

        {isNotificationOpen && (
          <>

            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotificationOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
            />

            {/* PANEL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 80
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 40
              }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 22
              }}
              className="
              fixed
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              z-50
              w-[70vw]
              h-[72vh]
              rounded-[36px]
              overflow-hidden
              border border-white/10
              bg-white/[0.05]
              backdrop-blur-3xl
              shadow-[0_0_120px_rgba(0,0,0,0.9)]
              "
            >

              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-cyan-500/10" />

              {/* HEADER */}
              <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10">

                <div>

                  <h2 className="text-3xl font-bold text-white tracking-wide">
                    Notification Center
                  </h2>

                  <p className="text-slate-400 text-sm mt-2">
                    AI monitoring alerts, access requests & employee activity
                  </p>

                </div>

                <button
                  onClick={() => setIsNotificationOpen(false)}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center"
                >
                  <X size={18} />
                </button>

              </div>

              {/* BODY */}
              <div className="relative z-10 p-8 grid grid-cols-2 gap-6 overflow-y-auto h-[calc(100%-100px)]">

              <div
  className="
  h-full
  overflow-y-auto
  p-6
  "
>

  <div
    className="
    flex
    items-center
    justify-between
    mb-6
    "
  >

    <div>

      <p
        className="
        text-[11px]
        uppercase
        tracking-[0.25em]
        text-slate-500
        "
      >
        LIVE SYSTEM DATA
      </p>

      <h2
        className="
        mt-2
        text-3xl
        font-semibold
        text-white
        "
      >
        Running Applications
      </h2>

    </div>

    <div
      className="
      px-4
      py-2
      rounded-full
      border
      border-white/10
      bg-white/[0.03]
      text-sm
      text-slate-400
      "
    >
      {installedApps.length} detected
    </div>

  </div>

  {/* LIST */}

  <div className="space-y-3">

    {installedApps.map((app) => (

      <div
        key={app.pid}
        className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-[#0f0f0f]
        px-5
        py-4
        hover:bg-[#151515]
        transition-all
        "
      >

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <div
            className="
            w-11
            h-11
            rounded-xl
            bg-orange-500/10
            flex
            items-center
            justify-center
            "
          >
            <Terminal
              size={18}
              className="text-orange-400"
            />
          </div>

          <div>

            <p
              className="
              text-sm
              font-medium
              text-white
              "
            >
              {app.name}
            </p>

            <p
              className="
              mt-1
              text-xs
              text-slate-500
              "
            >
              PID: {app.pid}
            </p>

          </div>

        </div>

        {/* MEMORY */}
        <div
          className="
          px-3
          py-1
          rounded-full
          bg-green-500/10
          text-green-400
          text-xs
          "
        >

          {(app.memory_usage / 1024 / 1024).toFixed(1)} MB

        </div>

      </div>

    ))}

  </div>

</div>

              </div>

            </motion.div>

          </>
        )}

      </AnimatePresence>

    </div>
  );
}