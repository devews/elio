import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundManager } from '../utils/audio.ts';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#141738] text-[#AFAEA2] border-t border-white/10 py-16 px-6 md:px-14 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#D21319] text-base font-bold">✦</span>
            <span className="font-editorial text-2xl font-bold tracking-[0.2em] text-white">
              ELIO
            </span>
          </div>
          <p className="text-xs font-editorial italic text-[#AFAEA2] max-w-sm leading-relaxed mb-4">
            Curated quick-access directory and official gateways to the world's essential digital platforms.
          </p>
          <div className="text-[10px] font-mono tracking-widest text-[#AFAEA2]/70 space-y-1">
            <p>LAT: 35.6886° N  LONG: 73.9619° E</p>
            <p>COMPOSITION: 70% MIDNIGHT NAVY · 25% CRIMSON RED · 5% STONE GREY</p>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6 text-xs font-mono">
          <div className="text-left md:text-right text-[#AFAEA2]/90 leading-relaxed">
            <p>Same sky.</p>
            <p>Different</p>
            <p className="text-white">perspectives.</p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#D21319] hover:text-white transition-colors cursor-pointer group"
          >
            <span className="tracking-widest uppercase text-xs">BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
