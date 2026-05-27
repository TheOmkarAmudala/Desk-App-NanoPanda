import { useState } from "react";

/**
 * FaceRegisterPopup — Premium glassmorphic modal for face registration.
 *
 * Props:
 *   invitationId  – the invitation ID associated with this registration
 *   onClose       – callback to dismiss the popup
 */
export default function FaceRegisterPopup({ invitationId, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose?.(), 280);
  };

  return (
    /* ── Overlay ── */
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      onClick={handleClose}
    >
      {/* ── Card ── */}
      <div
        className={`relative w-full max-w-md glass ${
          isClosing ? "animate-scaleOut" : "animate-modalIn"
        }`}
        style={{ borderRadius: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close Button ── */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10"
          style={{ color: "var(--np-text-muted)", border: "none", background: "transparent", cursor: "pointer", fontSize: "1.125rem" }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* ── Content ── */}
        <div className="flex flex-col items-center px-8 pt-8 pb-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <span className="mb-2 block text-3xl">📸</span>
            <h2
              className="text-xl font-bold tracking-tight"
              style={{ color: "#fff" }}
            >
              Face Registration
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--np-text-muted)" }}
            >
              Secure your identity with biometric verification
            </p>
          </div>

          {/* Camera Preview Area */}
          <div className="relative mb-6 flex items-center justify-center">
            {/* Pulsing ring */}
            <div
              className="animate-pulse-ring absolute rounded-full"
              style={{
                width: 216,
                height: 216,
                border: "2px solid var(--np-accent)",
                opacity: 0.5,
              }}
            />
            {/* Second pulsing ring (offset) */}
            <div
              className="animate-pulse-ring absolute rounded-full"
              style={{
                width: 216,
                height: 216,
                border: "2px solid var(--np-accent-light)",
                opacity: 0.3,
                animationDelay: "0.8s",
              }}
            />

            {/* Dashed circle */}
            <div
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: 200,
                height: 200,
                border: "2px dashed rgba(255, 255, 255, 0.12)",
                background:
                  "radial-gradient(circle, rgba(240,110,40,0.06) 0%, transparent 70%)",
              }}
            >
              {/* Face silhouette */}
              <span className="text-6xl select-none" style={{ opacity: 0.4 }}>
                👤
              </span>

              {/* Corner accent marks */}
              {["top-2 left-4", "top-2 right-4", "bottom-2 left-4", "bottom-2 right-4"].map(
                (pos, i) => (
                  <span
                    key={i}
                    className={`absolute ${pos}`}
                    style={{
                      width: 14,
                      height: 14,
                      borderColor: "var(--np-accent)",
                      borderStyle: "solid",
                      borderWidth: 0,
                      ...(pos.includes("top") && pos.includes("left")
                        ? { borderTopWidth: 2, borderLeftWidth: 2, borderTopLeftRadius: 4 }
                        : pos.includes("top") && pos.includes("right")
                        ? { borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: 4 }
                        : pos.includes("bottom") && pos.includes("left")
                        ? { borderBottomWidth: 2, borderLeftWidth: 2, borderBottomLeftRadius: 4 }
                        : { borderBottomWidth: 2, borderRightWidth: 2, borderBottomRightRadius: 4 }),
                      opacity: 0.7,
                    }}
                  />
                )
              )}
            </div>
          </div>

          {/* Description */}
          <div
            className="mb-8 rounded-xl px-4 py-3 text-center text-sm leading-relaxed"
            style={{
              color: "var(--np-text-muted)",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--np-border)",
            }}
          >
            Position your face within the frame and ensure good lighting.
            Your face data is{" "}
            <span className="font-semibold" style={{ color: "var(--np-accent-light)" }}>
              encrypted end-to-end
            </span>{" "}
            and never leaves your device.
          </div>

          {/* Actions */}
          <div className="flex w-full gap-3">
            <button
              onClick={handleClose}
              className="btn-outline flex-1"
              style={{ borderRadius: 12 }}
            >
              Skip for now
            </button>
            <button
              onClick={() => {
                /* TODO: start face registration flow */
              }}
              className="btn-primary flex-1"
              style={{ borderRadius: 12 }}
            >
              <span>Start Registration</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Scoped keyframes (no framer-motion) ── */}
      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes scaleOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.92) translateY(8px);
          }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        .animate-modalIn {
          animation: modalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scaleOut {
          animation: scaleOut 0.28s cubic-bezier(0.4, 0, 1, 1) forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 0.28s ease forwards;
        }
      `}</style>
    </div>
  );
}
