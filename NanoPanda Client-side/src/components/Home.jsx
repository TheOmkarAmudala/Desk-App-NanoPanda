import React from 'react';
import { useState, useRef } from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import VerificationOverlay from "./VerificationOverlay"
import {useNavigate} from "react-router-dom";

const NavItem = ({ text }) => (
  <a href="#" className="flex items-center text-gray-200 hover:text-white transition-colors text-[15px] font-medium group">
    <span className="w-1.5 h-1.5 bg-gray-500 mr-2.5 opacity-70 group-hover:bg-white transition-colors"></span>
    {text}
  </a>
);


export default function Home() {
  const navigate = useNavigate();
  const [showVerification, setShowVerification] = useState(false);
  const verificationRef = useRef(null);

  const handleExplore = () => {
    verificationRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlehomescreen = async () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0a0b0e] text-white overflow-hidden selection:bg-pink-500 selection:text-white">

      {/* Navigation Bar */}
      <header className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 border-b border-gray-800/60 relative z-20 bg-black/20 backdrop-blur-md">
        <div className="flex items-center">
          {/* Logo */}
          <div onClick={handlehomescreen} className="text-xl md:text-2xl lg:text-3xl font-black tracking-widest text-white flex items-center gap-1">
            <span>NANOPANDA</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavItem text="Platform" />
          <NavItem text="Solutions" />
          <NavItem text="Why NanoPanda" />
          <NavItem text="Partners" />
          <NavItem text="Resources" />
        </nav>

        {/* CTA Button */}
        <button className="bg-[#f06e28] hover:bg-[#eb5c10] transition-colors text-white px-4 md:px-5 py-2 rounded-full flex items-center space-x-2 text-sm md:text-sm font-semibold group">
          <span>Get a demo</span>
          <ArrowRight size={18} className="text-black group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-grow relative flex flex-col">
        {/* Background Video Container - set to 80% of the screen height to leave 20% below */}
        <div className="absolute inset-x-0 top-0 h-[80vh] z-0 overflow-hidden bg-black">
          {/* - autoPlay: starts immediately.
              - muted/playsInline: required for autoplay.
              - loop removed: so it plays once and stops.
              - scale-[1.4]: to keep the crop effect.
          */}
          <video
            autoPlay
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover scale-[1.35] origin-center"
          >
            <source src="Background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Subtle vignette for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
        </div>
        
        {/* Subtle Glowing Curves/Lines */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none mix-blend-screen opacity-20">
          <svg className="absolute bottom-0 right-0 w-[120%] h-[80%] transform translate-x-1/4 translate-y-1/4" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,70 80,60 100,20" stroke="#ffb885" strokeWidth="0.2" fill="none" style={{ filter: 'blur(2px)' }} />
            <path d="M10,100 C40,80 90,70 100,40" stroke="#ffb885" strokeWidth="0.4" fill="none" style={{ filter: 'blur(1px)' }} />
          </svg>
        </div>

        {/* Top Center Expand Icon */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
          <button className="bg-black/20 hover:bg-black/40 transition-colors p-2 rounded-lg backdrop-blur-sm text-white/80 hover:text-white border border-white/10">
            <Maximize2 size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Main Content - Padded to align within the 80vh area */}
        <div className="relative z-10 h-[80vh] flex flex-col justify-center px-6 md:px-10 lg:px-16 max-w-4xl mx-auto w-full">

          <h1 className="text-3xl md:text-[3.8rem] lg:text-[4.5rem] font-black leading-[0.95] tracking-[-0.02em] uppercase drop-shadow-2xl">
            Securing AI<br />
            Starts<br />
            With NanoPanda
          </h1>
          
          <p className="mt-6 text-lg md:text-xl lg:text-[1.9rem] font-medium max-w-2xl leading-[1.2] tracking-tight drop-shadow-lg">
            The leader in AI-native cybersecurity delivers new innovations in securing AI
          </p>
          
          <div className="mt-10"onClick={handleExplore}>
            <button className="bg-white text-gray-900 px-5 py-3 rounded-full flex items-center space-x-3 hover:bg-gray-50 transition-all shadow-xl font-semibold text-[15px] md:text-[17px] group">
              <span>Explore the product</span>
              <ArrowRight className="text-[#ea4819] group-hover:translate-x-1 transition-transform" size={20} strokeWidth={2.5} />
            </button>
          </div>

        </div>
      </main>
      <section ref={verificationRef}>
        <VerificationOverlay />
      </section>
    </div>
  );
}