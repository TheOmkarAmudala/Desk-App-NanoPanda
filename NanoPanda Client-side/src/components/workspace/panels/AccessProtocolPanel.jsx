import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export const AccessProtocolPanel = ({
  selectedUser,
  setSelectedUser,
  apps,
  transition
}) => {

  return (

    <motion.div
      animate={{
        opacity: selectedUser ? 1 : 0,
        x: selectedUser ? 0 : 100,
        pointerEvents: selectedUser ? 'auto' : 'none'
      }}
      transition={transition}
      className="
      absolute
      right-10
      top-1/2
      -translate-y-1/2
      w-[480px]
      h-[78vh]
      rounded-[32px]
      overflow-hidden
      border
      border-white/10
      bg-[#070707]/95
      backdrop-blur-3xl
      shadow-[0_0_100px_rgba(0,0,0,0.8)]
      "
    >

      {/* HEADER */}
      <div
        className="
        sticky
        top-0
        z-20
        border-b
        border-white/10
        bg-[#070707]/90
        backdrop-blur-xl
        px-6
        py-5
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
              LIVE SYSTEM DATA
            </p>

            <h2
              className="
              mt-2
              text-2xl
              font-semibold
              tracking-tight
              text-white
              "
            >
              Running Applications
            </h2>

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
            {apps?.length || 0} detected
          </div>

        </div>

      </div>

      {/* LIST */}
      <div
        className="
        h-[calc(100%-95px)]
        overflow-y-auto
        p-4
        "
      >

        <div className="space-y-3">

          {apps && apps.length > 0 ? (

         apps.map((app, index) => (

              <div
            key={`${app.pid}-${index}`}
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
                hover:bg-[#151515]
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
                    {app.name || 'Unknown Process'}
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

                {/* MEMORY */}
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
                  {(
                    app.memory_usage /
                    1024 /
                    1024
                  ).toFixed(1)} MB
                </div>

              </div>

            ))

          ) : (

            <div
              className="
              flex
              h-full
              items-center
              justify-center
              text-slate-500
              "
            >
              No running applications detected
            </div>

          )}

        </div>

      </div>

    </motion.div>

  );

};