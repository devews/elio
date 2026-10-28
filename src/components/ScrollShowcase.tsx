import React, { useRef, useState, useEffect } from 'react';
import { AppItem, APPS } from '../data/apps.ts';
import { AppLogo } from './AppLogo.tsx';
import { TiltCard } from './TiltCard.tsx';
import { RippleButton } from './RippleButton.tsx';
import { soundManager } from '../utils/audio.ts';

interface ScrollShowcaseProps {
  onLaunchApp: (app: AppItem) => void;
  activeAppId?: string;
}

export const ScrollShowcase: React.FC<ScrollShowcaseProps> = ({
  onLaunchApp,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      rowRefs.current.forEach((el, index) => {
        if (!el) return;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunch = (app: AppItem) => {
    soundManager.playOpenSwoosh();
    onLaunchApp(app);
    window.open(app.url, '_blank', 'noopener,noreferrer');
  };

  const scrollToApp = (index: number) => {
    soundManager.playClick();
    const target = rowRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="scroll-showcase-section" className="relative w-full py-28 bg-[#1B1E4A] text-[#AFAEA2] border-t border-white/10">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D21319]/10 blur-[130px]" />
      </div>

      {/* Section Intro */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 mb-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/15">
          <div>
            <p className="text-xs font-mono tracking-[0.25em] text-[#D21319] uppercase mb-2">
              ✦ ELIO DIRECTORY // 12 VOLUMES
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial-bold font-bold text-white uppercase tracking-tight">
              THE PORTALS <span className="text-[#D21319]">IN SEQUENCE</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#AFAEA2]">
            <span>INDEX</span>
            <span className="text-xl font-bold font-editorial text-[#D21319]">
              {String(activeIndex + 1).padStart(2, '0')} / {String(APPS.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Side Index Rail */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3">
        {APPS.map((app, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={app.id}
              onClick={() => scrollToApp(idx)}
              className="text-[10px] font-mono tracking-widest transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span className={isActive ? 'text-[#D21319] font-bold' : 'text-[#AFAEA2]/50 group-hover:text-white'}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-[#D21319] scale-150 shadow-[0_0_8px_#D21319]' : 'bg-[#AFAEA2]/30 group-hover:bg-white group-hover:shadow-[0_0_6px_#ffffff]'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Rows: Each App has a Big Logo and Bold Designer Title beside */}
      <div className="max-w-6xl mx-auto px-6 md:px-14 space-y-32 relative z-10">
        {APPS.map((app, index) => {
          const formattedIndex = String(index + 1).padStart(2, '0');
          const isCurrent = index === activeIndex;

          return (
            <div
              key={app.id}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className={`relative scroll-mt-24 transition-all duration-700 ${
                isCurrent ? 'opacity-100' : 'opacity-80 hover:opacity-100'
              }`}
            >
              {/* Row Container with Ambient Hover Aura */}
              <div className="group/row relative flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16 pb-16 border-b border-white/10 transition-all duration-500 rounded-3xl p-4 sm:p-6 hover:bg-[#15183d]/50 hover:shadow-[0_0_60px_rgba(210,19,25,0.12)]">
                {/* Big Logo with Interactive 3D Tilt and Ambient Glow on Hover */}
                <div
                  onClick={() => handleLaunch(app)}
                  className="cursor-pointer group/logo shrink-0 relative"
                  title={`Open official ${app.name} website in new tab`}
                >
                  <div className="absolute -inset-4 rounded-3xl bg-[#D21319]/0 group-hover/logo:bg-[#D21319]/25 blur-2xl transition-all duration-500 pointer-events-none" />

                  <TiltCard
                    maxTilt={14}
                    className="p-8 sm:p-10 rounded-3xl bg-[#141738] border border-white/10 group-hover/logo:border-[#D21319] transition-all duration-500 shadow-2xl relative group-hover/logo:shadow-[0_15px_40px_rgba(210,19,25,0.3)]"
                  >
                    <div className="relative flex flex-col items-center justify-center">
                      <AppLogo
                        id={app.id}
                        size="hero"
                        glow={false}
                        className="transform transition-transform duration-500 group-hover/logo:scale-105"
                      />
                      <span className="mt-4 text-[10px] font-mono tracking-[0.2em] uppercase text-[#AFAEA2] group-hover/logo:text-[#D21319] transition-colors">
                        CLICK TO LAUNCH ↗
                      </span>
                    </div>
                  </TiltCard>
                </div>

                {/* Content beside the logo */}
                <div className="flex-1 w-full text-left">
                  <div className="flex items-center gap-3 mb-2 text-xs font-mono text-[#AFAEA2]">
                    <span className="text-[#D21319] font-bold">N° {formattedIndex}</span>
                    <span>·</span>
                    <span className="uppercase tracking-widest">{app.category}</span>
                    <span>·</span>
                    <span className="text-[#AFAEA2]/60">OFFICIAL VERIFIED</span>
                  </div>

                  {/* Big Designer Title in Crimson Red (#D21319) with Ambient Glow */}
                  <h3
                    onClick={() => handleLaunch(app)}
                    className="text-5xl sm:text-6xl md:text-7xl font-editorial-bold font-black text-[#D21319] tracking-tight uppercase hover:text-white transition-all duration-300 cursor-pointer select-none leading-none mb-3 hover:drop-shadow-[0_0_20px_rgba(210,19,25,0.6)]"
                  >
                    {app.name}
                  </h3>

                  {/* Clean Designer Tagline with High-Fashion Typography */}
                  <p className="text-base sm:text-lg font-editorial text-white/95 italic tracking-wide mb-3">
                    {app.shortTitle} — {app.tagline}
                  </p>

                  {/* Refined Designer Description */}
                  <p className="text-xs sm:text-sm font-sans font-normal text-[#AFAEA2] leading-relaxed mb-8 max-w-xl tracking-normal">
                    {app.description}
                  </p>

                  {/* Tactile Button with subtle ripple animation on click */}
                  <div className="flex items-center gap-6">
                    <RippleButton
                      onClick={() => handleLaunch(app)}
                      className="px-6 py-3 rounded-2xl bg-[#D21319] hover:bg-[#ff1f27] text-white font-mono text-xs uppercase font-semibold tracking-wider shadow-lg shadow-[#D21319]/30 hover:shadow-[#D21319]/50 transition-all duration-300 border border-white/10 group/btn"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span>OPEN OFFICIAL {app.name.toUpperCase()}</span>
                        <span className="transform transition-transform group-hover/btn:translate-x-1">
                          →
                        </span>
                      </span>
                    </RippleButton>

                    <span className="text-[11px] font-mono text-[#AFAEA2]/50 group-hover/row:text-[#AFAEA2] transition-colors">
                      https://{app.displayUrl}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
