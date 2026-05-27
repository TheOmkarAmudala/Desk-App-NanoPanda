// src/pages/Invitations.jsx
import React, { useEffect, useState } from 'react';
import { fetchInvitations, acceptInvitation, rejectInvitation } from '../services/api';
import { useAuth } from '../components/AuthContext';
import FaceRegisterPopup from '../components/FaceRegisterPopup';

/* ── helper: human-readable relative time ── */
function timeAgo(dateString) {
  if (!dateString) return '';
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60)   return 'just now';
  if (seconds < 3600)  return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

/* ── status → color map ── */
const statusStyles = {
  pending:  { bg: 'bg-amber-500/15',  text: 'text-amber-400',  dot: 'bg-amber-400'  },
  accepted: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  rejected: { bg: 'bg-red-500/15',     text: 'text-red-400',     dot: 'bg-red-400'     },
};

export default function Invitations() {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFacePopup, setShowFacePopup] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  /* ── data fetching ── */
  const loadInvitations = async () => {
    setLoading(true);
    try {
      const data = await fetchInvitations();
      setInvitations(data.invitations || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadInvitations();
  }, [user]);

  /* ── handlers ── */
  const handleAccept = async (id) => {
    setProcessingId(id);
    try {
      const res = await acceptInvitation(id);
      if (res.success) {
        setSelectedInvitation(id);
        setShowFacePopup(true);
        loadInvitations();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    setProcessingId(id);
    try {
      await rejectInvitation(id);
      loadInvitations();
    } catch (e) {
      console.error(e);
    } finally {
      setProcessingId(null);
    }
  };

  const closeFacePopup = () => {
    setShowFacePopup(false);
    setSelectedInvitation(null);
  };

  /* ── render ── */
  return (
    <>
      <style>{`
        /* ── keyframes ── */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0;  }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(52,211,153,0.3), 0 0 30px rgba(52,211,153,0.1); }
          50%      { box-shadow: 0 0 20px rgba(52,211,153,0.5), 0 0 50px rgba(52,211,153,0.2); }
        }
        @keyframes headerReveal {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── utility classes ── */
        .card-entrance {
          animation: fadeInUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .header-entrance {
          animation: headerReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .skeleton-line {
          background: linear-gradient(90deg, #1a1b1e 0%, #2a2b30 50%, #1a1b1e 100%);
          background-size: 800px 100%;
          animation: shimmer 1.8s infinite linear;
          border-radius: 8px;
        }
        .accept-btn-glow:hover {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .float-emoji {
          animation: floatEmoji 3s ease-in-out infinite;
        }

        /* ── card glass ── */
        .inv-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.06);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease;
        }
        .inv-card:hover {
          transform: translateY(-4px) scale(1.005);
          box-shadow: 0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(240,110,40,0.1);
          border-color: rgba(255,255,255,0.1);
        }

        /* ── gradient accent bar on left ── */
        .accent-bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          border-radius: 3px 0 0 3px;
          background: linear-gradient(180deg, #f06e28 0%, #f06e28 50%, transparent 100%);
          opacity: 0.8;
          transition: opacity 0.3s ease, width 0.3s ease;
        }
        .inv-card:hover .accent-bar {
          opacity: 1;
          width: 4px;
        }

        /* ── processing spinner ── */
        .spin-icon {
          animation: spinSlow 1s linear infinite;
        }
      `}</style>

      <div className="min-h-screen bg-[#050507] text-white px-4 py-10 sm:px-8 lg:px-16">
        {/* ── Page Header ── */}
        <div className="header-entrance max-w-4xl mx-auto mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#f06e28]/20 to-[#f06e28]/5 border border-[#f06e28]/15">
              <svg className="w-5 h-5 text-[#f06e28]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f06e28 60%, #ff9a56 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              My Invitations
            </h1>
          </div>
          <p className="text-gray-500 text-sm sm:text-base ml-[52px]">
            Workspace invitations from your team members. Accept to join or decline gracefully.
          </p>
        </div>

        {/* ── Content ── */}
        <div className="max-w-4xl mx-auto">

          {/* ── Loading Skeleton ── */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative rounded-2xl p-6 overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    animationDelay: `${i * 0.12}s`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="skeleton-line w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2.5">
                      <div className="skeleton-line h-4 w-3/5" />
                      <div className="skeleton-line h-3 w-2/5" />
                    </div>
                    <div className="flex gap-2">
                      <div className="skeleton-line h-9 w-20 rounded-lg" />
                      <div className="skeleton-line h-9 w-20 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Error State ── */}
          {!loading && error && (
            <div className="card-entrance flex items-center gap-3 rounded-2xl p-5 bg-red-500/10 border border-red-500/20">
              <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span className="text-red-300 text-sm">Failed to load invitations: {error}</span>
              <button
                onClick={loadInvitations}
                className="ml-auto text-xs text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* ── Empty State ── */}
          {!loading && !error && invitations.length === 0 && (
            <div className="card-entrance flex flex-col items-center justify-center py-24 text-center">
              <div className="float-emoji text-6xl mb-6">📭</div>
              <h2 className="text-xl font-semibold text-gray-300 mb-2">No Invitations Yet</h2>
              <p className="text-gray-600 text-sm max-w-xs">
                When a teammate invites you to a workspace, it'll appear here. Sit tight!
              </p>
            </div>
          )}

          {/* ── Invitation Cards ── */}
          {!loading && !error && invitations.length > 0 && (
            <div className="space-y-4">
              {invitations.map((inv, idx) => {
                const status = (inv.status || 'pending').toLowerCase();
                const sStyle = statusStyles[status] || statusStyles.pending;
                const isPending = status === 'pending';
                const isProcessing = processingId === inv._id;

                return (
                  <div
                    key={inv._id}
                    className="inv-card card-entrance relative rounded-2xl p-5 sm:p-6 overflow-hidden"
                    style={{ animationDelay: `${idx * 0.08}s` }}
                  >
                    {/* Accent bar */}
                    <div className="accent-bar" />

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* ── Left: Sender avatar ── */}
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#f06e28]/25 to-[#f06e28]/5 border border-[#f06e28]/20 text-[#f06e28] font-bold text-sm select-none">
                          {inv.invitedBy?.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>

                        <div className="min-w-0 flex-1">
                          {/* Sender name */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-gray-100 truncate">
                              {inv.invitedBy?.name || 'Unknown'}
                            </span>
                            <span className="text-[11px] text-gray-600">invited you</span>
                          </div>

                          {/* Sender email */}
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {inv.invitedBy?.email}
                          </p>

                          {/* Workspace & meta */}
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            {inv.workspace?.name && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 bg-white/[0.05] border border-white/[0.06] rounded-md px-2 py-0.5">
                                <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21" />
                                </svg>
                                {inv.workspace.name}
                              </span>
                            )}
                            {inv.createdAt && (
                              <span className="text-[11px] text-gray-600">
                                {timeAgo(inv.createdAt)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ── Right: Status + Actions ── */}
                      <div className="flex items-center gap-3 sm:shrink-0">
                        {/* Status badge */}
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${sStyle.bg} ${sStyle.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sStyle.dot}`} />
                          {status}
                        </span>

                        {/* Action buttons — only for pending */}
                        {isPending && (
                          <div className="flex items-center gap-2">
                            {/* Accept */}
                            <button
                              onClick={() => handleAccept(inv._id)}
                              disabled={isProcessing}
                              className="accept-btn-glow group relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                              style={{
                                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                              }}
                            >
                              {isProcessing ? (
                                <svg className="spin-icon w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              )}
                              Accept
                            </button>

                            {/* Reject */}
                            <button
                              onClick={() => handleReject(inv._id)}
                              disabled={isProcessing}
                              className="group flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-red-400 border border-red-500/20 bg-red-500/[0.06] hover:bg-red-500/15 hover:border-red-500/35 hover:text-red-300 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Face Register Popup ── */}
        {showFacePopup && (
          <FaceRegisterPopup invitationId={selectedInvitation} onClose={closeFacePopup} />
        )}
      </div>
    </>
  );
}
