import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Volume2, VolumeX, Keyboard } from 'lucide-react';
import { soundManager } from '../utils/audio.ts';

interface BottomDockProps {
  onToggleSound: () => void;
  isMuted: boolean;
  onOpenShortcuts: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  onToggleSound,
  isMuted,
  onOpenShortcuts,
  onScrollToSection,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92vw] max-w-[680px] transition-transform duration-500 pointer-events-auto">
      {/* Collapse Tab */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => {
            soundManager.playClick();
            setIsCollapsed(!isCollapsed);
          }}
          className="flex items-center gap-1.5 px-3 py-0.5 rounded-t-lg bg-[#141738] border-t border-x border-white/10 text-[10px] font-mono text-[#AFAEA2] hover:text-white transition-colors cursor-pointer"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3 text-[#D21319]" />
              <span>DOCK</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 text-[#D21319]" />
              <span>COLLAPSE</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full p-2.5 rounded-xl bg-[#141738] border border-white/15 shadow-2xl flex items-center justify-between gap-3 transition-all duration-300 ${
          isCollapsed ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-[#D21319] text-sm">✦</span>
          <span className="font-editorial text-sm font-bold text-white tracking-widest">
            ELIO
          </span>
        </div>

        {/* Section shortcuts */}
        <div className="flex items-center gap-4 text-xs font-mono tracking-wider">
          <button
            onClick={() => {
              soundManager.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#AFAEA2] hover:text-white transition-colors"
          >
            TOP
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onScrollToSection('scroll-showcase-section');
            }}
            className="text-[#AFAEA2] hover:text-white transition-colors"
          >
            SEQUENCE
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onScrollToSection('quick-grid-section');
            }}
            className="text-[#D21319] hover:text-white font-bold transition-colors"
          >
            MATRIX
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-lg bg-[#1B1E4A] hover:bg-[#D21319] text-[#AFAEA2] hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#D21319]" />}
          </button>

          <button
            onClick={onOpenShortcuts}
            className="p-1.5 rounded-lg bg-[#1B1E4A] hover:bg-[#D21319] text-[#AFAEA2] hover:text-white transition-colors cursor-pointer"
            title="Keyboard shortcuts"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
