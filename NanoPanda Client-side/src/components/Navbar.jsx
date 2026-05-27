// src/components/Navbar.jsx
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on auth routes
  const hiddenRoutes = ['/login', '/signup', '/workspace'];
  if (hiddenRoutes.includes(location.pathname)) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handlehomescreen = async () => {
    navigate('/home');
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <>
      <style>{`
        @keyframes navbarSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes avatarPulseGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(240,110,40,0.4), 0 0 20px rgba(240,110,40,0.15); }
          50%      { box-shadow: 0 0 14px rgba(240,110,40,0.6), 0 0 32px rgba(240,110,40,0.25); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .navbar-enter {
          animation: navbarSlideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .avatar-glow {
          animation: avatarPulseGlow 3s ease-in-out infinite;
        }
        .brand-gradient {
          background: linear-gradient(135deg, #f06e28 0%, #ff9a56 40%, #ffffff 100%);
          background-size: 200% 200%;
          animation: gradientShift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .logout-btn {
          position: relative;
          overflow: hidden;
        }
        .logout-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(240,110,40,0.15), rgba(255,60,60,0.15));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .logout-btn:hover::before {
          opacity: 1;
        }
        .gradient-border-bottom {
          position: relative;
        }
        .gradient-border-bottom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, #f06e28 0%, #f06e28 30%, transparent 100%);
        }
      `}</style>

      <header className="navbar-enter gradient-border-bottom fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-black/60 backdrop-blur-xl border-b border-white/[0.04]">
        {/* Left — Brand */}
        <div className="flex items-center gap-2.5 select-none">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#f06e28]/20 to-[#f06e28]/5 border border-[#f06e28]/20">
            <span className="text-lg leading-none">🛡️</span>
          </div>
          <div className="flex flex-col" onClick={handlehomescreen}>
            <span className="brand-gradient text-xl font-black tracking-[0.2em] leading-tight">
              NANOPANDA
            </span>
            <span className="text-[10px] font-medium tracking-[0.35em] text-gray-500 uppercase leading-tight">
              Security
            </span>
          </div>
        </div>

        {/* Right — User Info & Logout */}
        {user && (
          <div className="flex items-center gap-4">
            {/* User Avatar + Name */}
            <div className="flex items-center gap-3">
              <div className="avatar-glow relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#f06e28] to-[#d4520a] text-white text-sm font-bold select-none">
                {userInitial}
                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black/80" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-100 leading-tight">
                  {user.name}
                </span>
                <span className="text-[11px] text-gray-500 leading-tight">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="logout-btn group flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all duration-300 cursor-pointer text-sm font-medium"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className="h-[60px]" />
    </>
  );
}
