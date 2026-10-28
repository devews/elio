import React from 'react';
import { ExternalLink, Check, Sparkles } from 'lucide-react';
import { AppItem } from '../data/apps.ts';
import { AppLogo } from './AppLogo.tsx';

interface LaunchToastProps {
  app: AppItem | null;
  onClose: () => void;
}

export const LaunchToast: React.FC<LaunchToastProps> = ({ app, onClose }) => {
  if (!app) return null;

  return (
    <div className="fixed bottom-8 right-6 z-50 animate-in slide-in-from-bottom duration-300 pointer-events-auto max-w-sm w-full">
      <div className="p-4 rounded-2xl bg-[#090b17]/95 border border-[#D21319]/50 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AppLogo id={app.id} size="sm" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-white uppercase">
                Opening {app.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
            </div>
            <p className="text-[11px] font-mono text-[#AFAEA2]">
              Official tab opened in new window
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#AFAEA2] hover:text-white hover:bg-white/10 transition-colors text-xs font-mono"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
