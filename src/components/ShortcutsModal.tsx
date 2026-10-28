import React from 'react';
import { X, ExternalLink, Zap } from 'lucide-react';
import { APPS } from '../data/apps.ts';
import { AppLogo } from './AppLogo.tsx';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunch: (url: string) => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  isOpen,
  onClose,
  onLaunch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090b17] border border-[#D21319]/40 p-6 sm:p-8 shadow-2xl text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1B1E4A] border border-[#D21319]/30">
              <Zap className="w-5 h-5 text-[#D21319]" />
            </div>
            <div>
              <h3 className="text-xl font-serif-luxury font-bold text-white uppercase tracking-wider">
                Keyboard Shortcuts
              </h3>
              <p className="text-xs font-mono text-[#AFAEA2]">
                Press any bound key at any time to open the official application
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#AFAEA2] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-h-[60vh] overflow-y-auto no-scrollbar">
          {APPS.map((app) => (
            <div
              key={app.id}
              onClick={() => {
                onLaunch(app.url);
                onClose();
              }}
              className="p-3 rounded-2xl bg-[#12152c] border border-white/5 hover:border-[#D21319]/50 flex items-center justify-between cursor-pointer group transition-all"
            >
              <div className="flex items-center gap-2.5">
                <AppLogo id={app.id} size="sm" />
                <span className="text-xs font-mono text-white group-hover:text-[#ff3b42] transition-colors">
                  {app.name}
                </span>
              </div>
              <kbd className="px-2 py-1 rounded bg-[#090b17] border border-white/15 text-[11px] font-mono text-[#AFAEA2] group-hover:text-white group-hover:border-[#D21319]">
                {app.keyShortcut}
              </kbd>
            </div>
          ))}
        </div>

        {/* System Keys */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#AFAEA2] gap-2">
          <span>[H] Toggle Bottom Dock</span>
          <span>[M] Toggle Audio</span>
          <span>[Esc] Close Dialog</span>
        </div>
      </div>
    </div>
  );
};
