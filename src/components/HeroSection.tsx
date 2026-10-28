import React from 'react';
import { ArrowDown } from 'lucide-react';
import { TransparentVideo } from './TransparentVideo.tsx';
import { RippleButton } from './RippleButton.tsx';

interface HeroSectionProps {
  onScrollDown: () => void;
  onExplorePortals: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollDown,
  onExplorePortals,
}) => {
  return (
    <section className="relative w-full min-h-screen bg-[#1B1E4A] text-[#AFAEA2] flex flex-col justify-between px-6 sm:px-10 md:px-14 py-6 md:py-8 overflow-hidden select-none">
      {/* Editorial Swirling Crimson Ribbons (#D21319) in 25% ratio over 70% Midnight Navy (#1B1E4A) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="absolute inset-0 w-full h-full opacity-90 animate-float-ribbon"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Main Crimson Ribbon Arcs circling the video subject */}
          <path
            d="M320,520 C480,240 760,180 980,320 C1180,450 1240,680 1020,780 C820,860 620,720 740,540 C840,390 1140,240 1340,340"
            stroke="#D21319"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M500,420 C640,260 920,240 1120,400 C1300,550 1220,780 940,820 C720,850 560,660 680,480 C800,310 1080,260 1280,380"
            stroke="#D21319"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />
          <path
            d="M420,680 C560,760 840,820 1080,720 C1260,630 1320,420 1160,320 C980,220 780,340 720,480 C670,600 780,720 980,740"
            stroke="#D21319"
            strokeWidth="2.2"
          />
          <path
            d="M600,200 C800,120 1120,180 1240,360 C1340,520 1200,720 980,760 C800,790 680,680 720,560"
            stroke="#D21319"
            strokeWidth="1"
            strokeDasharray="6 8"
            strokeOpacity="0.7"
          />

          <path
            d="M180,820 C420,780 720,850 1020,840"
            stroke="#AFAEA2"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* TOP HEADER: Clean ELIO Branding, Nav Links, Top-right Microtext */}
      <header className="relative z-20 w-full flex items-start justify-between text-xs tracking-widest uppercase font-mono">
        {/* Left: ✦ ELIO Official Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#1B1E4A] p-0.5 border border-[#D21319]/40 group-hover:border-[#D21319] group-hover:shadow-[0_0_20px_rgba(210,19,25,0.4)] transition-all">
              <img
                src="/assets/aistudio/Pink_Abstract_Floral_Square_Pillow_a2a9a355.png"
                alt="ELIO"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#D21319] text-base font-bold">✦</span>
              <span className="font-editorial text-2xl md:text-3xl font-bold tracking-[0.25em] text-white group-hover:text-[#D21319] transition-colors">
                ELIO
              </span>
            </div>
          </div>
          <span className="text-[10px] text-[#AFAEA2] tracking-widest pl-2 border-l border-white/20 hidden sm:inline">
            QUICK ACCESS
          </span>
        </div>

        {/* Center: Editorial Nav */}
        <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] text-[#AFAEA2]">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors cursor-pointer"
          >
            HOME
          </button>
          <button
            onClick={onExplorePortals}
            className="hover:text-[#D21319] text-white transition-colors cursor-pointer"
          >
            DIRECTORY
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('quick-grid-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            MATRIX
          </button>
          <button
            onClick={onScrollDown}
            className="hover:text-white transition-colors cursor-pointer"
          >
            SHOWCASE
          </button>
        </nav>

        {/* Right: Stacked Microcopy */}
        <div className="text-right text-[10px] tracking-widest leading-relaxed text-[#AFAEA2]/80">
          <p className="font-bold text-[#AFAEA2]">INSTANT</p>
          <p className="font-bold text-[#AFAEA2]">ACCESS, CALMER</p>
          <p className="font-bold text-[#AFAEA2] mb-1">WORKFLOWS</p>
          <p className="text-[8px] text-[#AFAEA2]/50 tracking-[0.3em]">
            STREAM · CREATE · CONNECT · DISCOVER
          </p>
        </div>
      </header>

      {/* HERO MAIN BODY: Left Quick-Access Typography + Front 3D Ring Video */}
      <div className="relative z-10 w-full flex-1 flex flex-col lg:flex-row items-center justify-between py-6 md:py-10 gap-8">
        {/* Left Side: Creative Designer Typography */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
          {/* Kicker */}
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase font-mono text-[#AFAEA2] mb-3">
            CURATED QUICK ACCESS · ONE-CLICK PORTALS
          </p>

          {/* Huge Main Title: THE ACCESS DIRECTORY in Crimson Red (#D21319) with span */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-editorial-bold font-black text-[#D21319] leading-[0.88] tracking-tight uppercase select-none">
            THE<br />
            ACCESS<br />
            <span
              className="inline-block transition-all duration-300 hover:shadow-[0_0_30px_rgba(210,19,25,0.5)]"
              style={{
                borderColor: '#b82323',
                backgroundColor: '#843636',
                color: '#ffffff',
                paddingLeft: '0.15em',
                paddingRight: '0.25em',
                borderRadius: '0.12em',
              }}
            >
              DIRECTORY
            </span>
          </h1>

          {/* Kicker description */}
          <p className="mt-6 text-sm sm:text-base font-editorial text-[#AFAEA2] max-w-md leading-relaxed italic">
            Instant high-fidelity gateways to your daily platforms. One click, direct access.
          </p>

          {/* Link button with subtle tactile ripple effect and ambient hover */}
          <div className="mt-8 flex items-center gap-6">
            <RippleButton
              onClick={onExplorePortals}
              rippleColor="rgba(210, 19, 25, 0.5)"
              className="px-5 py-2.5 rounded-full bg-[#141738] border border-[#D21319]/50 hover:border-[#D21319] hover:bg-[#D21319] text-[#D21319] hover:text-white transition-all duration-300 font-mono text-xs uppercase tracking-[0.2em] shadow-lg group"
            >
              <span className="flex items-center gap-3">
                <span>EXPLORE THE PORTALS</span>
                <span className="transform transition-transform group-hover:translate-x-1.5 text-base">
                  →
                </span>
              </span>
            </RippleButton>
          </div>
        </div>

        {/* Right Side / Front: The Video with Background Completely Removed In Front! */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] md:min-h-[520px]">
          {/* Ambient Crimson Halo with Hover Glow */}
          <div className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full bg-[#D21319]/20 blur-[100px] pointer-events-none transition-all duration-700 hover:scale-110" />

          {/* Transparent Video Playing In Front */}
          <div className="relative z-10 w-full max-w-[500px] md:max-w-[560px] aspect-square flex items-center justify-center group/video">
            <TransparentVideo
              src="/assets/aistudio/animo-showcase-stream-720p_0a558bb5.mp4"
              className="w-full h-full transform transition-transform duration-700 group-hover/video:scale-105"
            />
          </div>
        </div>
      </div>

      {/* FOOTER OF HERO SECTION: Coordinates (left) + SCROLL ↓ & Same Sky (right) */}
      <div className="relative z-20 w-full flex items-end justify-between pt-4 border-t border-white/[0.08] text-xs font-mono">
        {/* Bottom Left: Coordinates */}
        <div className="flex items-center gap-3 text-[#AFAEA2]/90 text-[11px] tracking-widest">
          <span className="text-[#D21319] font-bold">✦</span>
          <span>35.6886° N  73.9619° E</span>
        </div>

        {/* Bottom Right: SCROLL ↓ and Same Sky microtext */}
        <div className="flex items-end gap-10 text-right">
          <div className="text-[11px] leading-relaxed text-[#AFAEA2]/90 tracking-wider">
            <p>Same sky.</p>
            <p>Different</p>
            <p className="text-white">perspectives.</p>
          </div>

          <button
            onClick={onScrollDown}
            className="flex flex-col items-center gap-2 text-[#AFAEA2] hover:text-[#D21319] transition-colors cursor-pointer group"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-lr]">
              SCROLL
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#D21319]" />
          </button>
        </div>
      </div>
    </section>
  );
};
