import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  X,
  ShieldCheck,
  ArrowRight,
  Check,
  ExternalLink,
  Globe,
  Terminal,
  Box,
  Layout,
  Monitor,
  Database,
  MessageSquare,
  Cloud,
  HardDrive
} from 'lucide-react';

export const NotificationPanel = ({
  isOpen,
  onClose,
  installedApps
}) => {
  // =========================================
  // STATES
  // =========================================

  const [step, setStep] = useState('request');
  const [agreed, setAgreed] = useState(false);

  // Reset step when modal is opened
  React.useEffect(() => {
    if (isOpen) {
      setStep('request');
      setAgreed(false);
    }
  }, [isOpen]);

  // =========================================
  // STATIC SOFTWARE LIST
  // =========================================


  return (
    <AnimatePresence>

      {isOpen && (
        <>

          {/* ========================================= */}
          {/* BACKDROP */}
          {/* ========================================= */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
            fixed
            inset-0
            z-40
            bg-black/80
            backdrop-blur-md
            "
          />

          {/* ========================================= */}
          {/* PANEL */}
          {/* ========================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.96
            }}
            transition={{
              type: 'spring',
              damping: 22,
              stiffness: 140
            }}
            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            p-3
            md:p-6
            "
          >

            {/* ========================================= */}
            {/* MAIN CARD */}
            {/* ========================================= */}

            <div
              className="
              relative
              flex
              h-full
              w-full
              max-w-7xl
              flex-col
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-[#050505]/95
              backdrop-blur-3xl
              md:h-[92vh]
              "
            >

              {/* GLOW */}
              <div
                className="
                absolute
                inset-0
                bg-gradient-to-br
                from-orange-500/10
                via-transparent
                to-cyan-500/10
                "
              />

              {/* ========================================= */}
              {/* HEADER */}
              {/* ========================================= */}

              <div
                className="
                relative
                z-10
                flex
                items-center
                justify-between
                border-b
                border-white/10
                px-5
                py-4
                md:px-8
                "
              >

                <div>

                  <p
                    className="
                    text-[10px]
                    uppercase
                    tracking-[0.3em]
                    text-orange-400
                    "
                  >
                    NANOPANDA SECURITY
                  </p>

                  <h2
                    className="
                    mt-2
                    text-xl
                    font-bold
                    text-white
                    md:text-3xl
                    "
                  >

                    {step === 'request'
                      ? 'Employee Access Request'
                      : 'Software Visibility Consent'}

                  </h2>

                </div>

                <button
                  onClick={onClose}
                  className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  text-white
                  hover:bg-white/10
                  "
                >
                  <X size={18} />
                </button>

              </div>

              {/* ========================================= */}
              {/* BODY */}
              {/* ========================================= */}

              <div
                className="
                relative
                z-10
                flex-1
                overflow-y-auto
                "
              >

                {/* ========================================= */}
                {/* STEP 1 */}
                {/* ========================================= */}

                {step === 'request' && (

                  <div
                    className="
                    grid
                    gap-6
                    p-4
                    md:grid-cols-[320px_1fr]
                    md:p-8
                    "
                  >

                    {/* LEFT */}
                    <div className="space-y-5">

                      <div
                        className="
                        rounded-[28px]
                        border
                        border-white/10
                        bg-white/[0.03]
                        p-6
                        "
                      >

                        <div className="text-center">

                          <img
                            src="https://i.pravatar.cc/300?img=12"
                            alt=""
                            className="
                            mx-auto
                            h-28
                            w-28
                            rounded-[24px]
                            border
                            border-white/10
                            object-cover
                            "
                          />

                          <h1
                            className="
                            mt-5
                            text-2xl
                            font-bold
                            text-white
                            "
                          >
                            Rohit Sharma
                          </h1>

                          <p
                            className="
                            mt-2
                            text-sm
                            text-orange-400
                            "
                          >
                            Senior Infrastructure Engineer
                          </p>

                          <p
                            className="
                            mt-2
                            text-sm
                            leading-6
                            text-slate-500
                            "
                          >
                            Nanopanda AI Labs
                            <br />
                            Cloud Operations Team
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                      <div
                        className="
                        rounded-[30px]
                        border
                        border-orange-500/20
                        bg-gradient-to-br
                        from-orange-500/10
                        to-transparent
                        p-6
                        md:p-8
                        "
                      >

                        <div className="flex items-start gap-5">

                          <div
                            className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-orange-500/20
                            "
                          >
                            <ShieldCheck className="text-orange-400" />
                          </div>

                          <div>

                            <h3
                              className="
                              text-2xl
                              font-semibold
                              text-white
                              "
                            >
                              Why access is requested
                            </h3>

                            <p
                              className="
                              mt-4
                              text-sm
                              leading-8
                              text-slate-300
                              "
                            >
                              Nanopanda requires temporary software
                              visibility access to synchronize your
                              installed development tools, browsers
                              and enterprise applications with
                              centralized monitoring infrastructure.
                            </p>

                          </div>

                        </div>

                      </div>

                      <button
                        onClick={() => setStep('consent')}
                        className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-[24px]
                        bg-orange-600
                        px-6
                        py-5
                        text-lg
                        font-semibold
                        text-white
                        transition-all
                        hover:bg-orange-500
                        "
                      >
                        Allow Access
                        <ArrowRight size={20} />
                      </button>

                    </div>

                  </div>

                )}

                {/* ========================================= */}
                {/* STEP 2 */}
                {/* ========================================= */}

          {step === 'consent' && (

  <div
    className="
    h-full
    overflow-hidden
    "
  >

    <div
      className="
      grid
      h-full
      md:grid-cols-[1fr_420px]
      "
    >

      {/* ===================================== */}
      {/* LEFT SOFTWARE LIST */}
      {/* ===================================== */}

      <div
        className="
        overflow-y-auto
        bg-[#070707]
        "
      >

        {/* TOP */}
        <div
          className="
          sticky
          top-0
          z-10
          border-b
          border-white/10
          bg-[#070707]/90
          px-6
          py-5
          backdrop-blur-xl
          "
        >

          <div
            className="
            flex
            items-center
            justify-between
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
                Installed Applications
              </p>

              <h3
                className="
                mt-2
                text-2xl
                font-semibold
                tracking-tight
                text-white
                "
              >
                Software inventory
              </h3>

            </div>

            <div
              className="
              rounded-full
              border
              border-white/10
              bg-[#111111]
              px-4
              py-2
              text-sm
              text-slate-400
              "
            >
              {installedApps.length} detected
            </div>

          </div>

        </div>

        {/* SOFTWARE LIST */}
        <div className="p-4 md:p-6">

        <div className="space-y-3">
          {installedApps && installedApps.length > 0 ? (
            installedApps.map((app) => (
              <div
                key={app.pid || app.name}
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
                transition-all
                hover:bg-[#141414]
                "
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <div
                    className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#171717]
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
                      PID: {app.pid || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="
                  rounded-full
                  bg-green-500/10
                  px-3
                  py-1
                  text-xs
                  text-green-400
                  "
                >
                  {(app.memory_usage / 1024 / 1024).toFixed(1)} MB
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-500">
              No applications detected.
            </div>
          )}
        </div>
      </div>
    </div>

      {/* ===================================== */}
      {/* RIGHT SIDEBAR */}
      {/* ===================================== */}

      <div
        className="
        border-l
        border-white/10
        bg-[#0a0a0a]
        p-6
        md:p-8
        overflow-y-auto
        "
      >

        {/* BRAND */}
        <div>

          <div
            className="
            text-[11px]
            uppercase
            tracking-[0.25em]
            text-orange-400
            "
          >
            Nanopanda Security
          </div>

          <h2
            className="
            mt-4
            text-3xl
            font-semibold
            tracking-tight
            text-white
            "
          >
            Review before continuing
          </h2>

          <p
            className="
            mt-4
            text-sm
            leading-7
            text-slate-400
            "
          >
            Please review the software visibility
            agreement before granting access
            to your application inventory.
          </p>

        </div>

        {/* TERMS LINKS */}
        <div className="mt-10 space-y-3">

          {[
            'Terms & Conditions',
            'Privacy Policy',
            'Visibility Policy'
          ].map((item) => (

            <button
              key={item}
              className="
              flex
              w-full
              items-center
              justify-between
              rounded-2xl
              border
              border-white/10
              bg-[#111111]
              px-5
              py-4
              text-sm
              text-white
              transition-all
              hover:bg-[#151515]
              "
            >

              <span>{item}</span>

              <ExternalLink
                size={15}
                className="text-slate-500"
              />

            </button>

          ))}

        </div>

        {/* CONSENT */}
        <div
          className="
          mt-10
          rounded-3xl
          border
          border-white/10
          bg-[#111111]
          p-5
          "
        >

          <button
            onClick={() => setAgreed(!agreed)}
            className="
            flex
            items-start
            gap-4
            text-left
            "
          >

            <div
              className={`
              mt-1
              flex
              h-5
              w-5
              shrink-0
              items-center
              justify-center
              rounded-md
              border
              transition-all

              ${agreed
                ? 'border-orange-500 bg-orange-500'
                : 'border-white/20 bg-transparent'
              }
              `}
            >

              {agreed && (
                <Check size={13} />
              )}

            </div>

            <p
              className="
              text-sm
              leading-7
              text-slate-300
              "
            >
              I understand that Nanopanda
              will access installed software
              metadata and application
              inventory information for
              infrastructure and compliance
              purposes only.
            </p>

          </button>

          {/* BUTTON */}

          <button
            onClick={onClose}
            disabled={!agreed}
            className={`
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            px-6
            py-4
            text-sm
            font-medium
            transition-all

            ${agreed
              ? 'bg-orange-600 text-white hover:bg-orange-500'
              : 'cursor-not-allowed bg-[#1a1a1a] text-slate-600'
            }
            `}
          >

            Agree & Proceed

            <ArrowRight size={16} />

          </button>

        </div>

      </div>

    </div>

  </div>

)}

              </div>

            </div>

          </motion.div>

        </>
      )}

    </AnimatePresence>
  );
};