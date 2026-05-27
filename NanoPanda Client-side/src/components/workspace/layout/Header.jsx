import React from 'react';
import { Bell, ArrowRight } from 'lucide-react';

export const Header = ({ onOpenNotifications }) => {
  return (
    <header
      className="
      absolute
      top-0
      left-0
      w-full
      h-16
      z-30
      flex
      items-center
      justify-between
      px-8
      border-b
      border-white/5
      bg-black/40
      backdrop-blur-md
      "
    >
      <div className="flex items-center gap-12">
        <span
          className="
          text-lg
          font-bold
          tracking-[0.2em]
          text-white
          "
        >
          NANOPANDA
        </span>

        <nav className="hidden md:flex items-center gap-8">
          <button
            className="
            text-[11px]
            font-bold
            uppercase
            tracking-widest
            text-slate-500
            hover:text-white
            transition-colors
            "
          >
            Platform
          </button>

          <button
            className="
            text-[11px]
            font-bold
            uppercase
            tracking-widest
            text-slate-500
            hover:text-white
            transition-colors
            "
          >
            Partners
          </button>

          <button
            onClick={onOpenNotifications}
            className="
            flex
            items-center
            gap-2
            text-[11px]
            font-bold
            uppercase
            tracking-widest
            text-slate-500
            hover:text-white
            transition-colors
            "
          >
            <Bell size={14} />
            Notifications
          </button>
        </nav>
      </div>

      <button
        className="
        flex
        items-center
        gap-2
        rounded-full
        bg-orange-600
        hover:bg-orange-500
        px-5
        py-2
        text-[11px]
        font-bold
        uppercase
        tracking-wider
        text-white
        transition-all
        "
      >
        Get a demo
        <ArrowRight size={14} />
      </button>
    </header>
  );
};
