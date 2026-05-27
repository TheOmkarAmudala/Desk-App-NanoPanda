import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout Components
import { Header } from './workspace/layout/Header';
import { HeroSection } from './workspace/layout/HeroSection';
import { DotGrid } from './workspace/layout/DotGrid';
import { SystemBar } from './workspace/layout/SystemBar';

// Node Components
import { GlowingNode } from './workspace/nodes/GlowingNode';
import { ProvisionNode } from './workspace/nodes/ProvisionNode';
import {
  ActiveIdentityNode,
  PendingInviteNode
} from './workspace/nodes/IdentityNode';

// Panel Components
import { AccessProtocolPanel } from './workspace/panels/AccessProtocolPanel';
import { NotificationPanel } from './workspace/panels/NotificationPanel';

import { invoke } from '@tauri-apps/api/core';

// Data/Config
import { MOCK_APPS, transition } from './workspace/data/workspaceData';

export default function WorkSpace() {
  // --- STATE ---
  const [isNodeActive, setIsNodeActive] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [pendingInvites, setPendingInvites] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [installedApps, setInstalledApps] = useState([]);

  // --- HANDLERS ---
  const fetchApps = async () => {
    try {
      const apps = await invoke("get_running_apps");
      console.log(invoke);
      setInstalledApps(apps);
    } catch (err) {
      console.error("Failed to fetch apps:", err);
    }
  };

  const handleOpenNotifications = async () => {
    setIsNotificationOpen(true);
    await fetchApps();
  };
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

  const removeInvite = (id) => {
    setPendingInvites(pendingInvites.filter((inv) => inv.id !== id));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-slate-300 font-sans">
      {/* BACKGROUND */}
      <DotGrid />

      {/* HEADER */}
      <Header onOpenNotifications={handleOpenNotifications} />

      {/* MAIN WORKSPACE */}
      <main
        className="
        absolute
        inset-0
        z-10
        flex
        items-center
        justify-center
        overflow-hidden
        p-20
        pointer-events-none
        "
      >
        <motion.div
          animate={{ x: selectedUser ? '-15%' : '0%' }}
          transition={transition}
          className="relative flex items-start gap-12 max-w-full"
        >
          {/* CENTRAL NODE SYSTEM */}
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
                  className="
                  absolute
                  left-full
                  top-1/2
                  h-px
                  w-12
                  -translate-y-1/2
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-500/10
                  "
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* ACTION/PROVISIONING AREA */}
          <div
            className="
            pointer-events-auto
            flex
            max-h-[80vh]
            flex-col
            gap-4
            overflow-y-auto
            pr-4
            "
          >
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

        {/* RIGHT PANEL (ACCESS PROTOCOLS) */}
        <AccessProtocolPanel
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          apps={installedApps.length > 0 ? installedApps : MOCK_APPS}
          transition={transition}
        />

        {/* HERO/BRANDING SECTION */}
        <HeroSection />
      </main>

      {/* SYSTEM TOOLBAR */}
      <SystemBar />

      {/* NOTIFICATION MODAL */}
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        installedApps={installedApps}
      />
    </div>
  );
}