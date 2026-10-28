/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { HeroSection } from './components/HeroSection.tsx';
import { ScrollShowcase } from './components/ScrollShowcase.tsx';
import { GridQuickAccess } from './components/GridQuickAccess.tsx';
import { BottomDock } from './components/BottomDock.tsx';
import { ShortcutsModal } from './components/ShortcutsModal.tsx';
import { LaunchToast } from './components/LaunchToast.tsx';
import { FooterSection } from './components/FooterSection.tsx';
import { KoiPondOverlay } from './components/KoiPondOverlay.tsx';
import { AppItem, APPS } from './data/apps.ts';
import { soundManager } from './utils/audio.ts';

export default function App() {
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);
  const [toastApp, setToastApp] = useState<AppItem | null>(null);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Global Keyboard Navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toUpperCase();

      const matchedApp = APPS.find((app) => app.keyShortcut.toUpperCase() === key);
      if (matchedApp) {
        e.preventDefault();
        soundManager.playOpenSwoosh();
        setToastApp(matchedApp);
        window.open(matchedApp.url, '_blank', 'noopener,noreferrer');
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        const nextMute = soundManager.toggleMute();
        setIsMuted(nextMute);
      } else if (e.key === '?' || e.key === 'k' || e.key === 'K') {
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsShortcutsOpen(false);
        setToastApp(null);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleLaunchApp = (app: AppItem) => {
    setToastApp(app);
    setTimeout(() => {
      setToastApp((current) => (current?.id === app.id ? null : current));
    }, 3500);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const nextMute = soundManager.toggleMute();
    setIsMuted(nextMute);
    if (!nextMute) {
      soundManager.playClick();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1B1E4A] text-[#AFAEA2] selection:bg-[#D21319] selection:text-white">
      {/* Three Painterly Butterfly Koi Swimming Over the Page & Letters (FINSMITH-style) */}
      <KoiPondOverlay />

      {/* 1. Hero: Editorial layout with ELIO branding, THE ACCESS DIRECTORY heading, and front video */}
      <HeroSection
        onScrollDown={() => scrollToSection('scroll-showcase-section')}
        onExplorePortals={() => scrollToSection('scroll-showcase-section')}
      />

      {/* 2. Scroll Showcase: Big Logo and Bold Designer Title beside */}
      <ScrollShowcase
        onLaunchApp={handleLaunchApp}
        activeAppId={activeApp?.id}
      />

      {/* 3. Responsive Grid Matrix */}
      <GridQuickAccess onLaunchApp={handleLaunchApp} />

      {/* 4. Editorial Footer */}
      <FooterSection />

      {/* 5. Minimalist Bottom Dock */}
      <BottomDock
        onToggleSound={handleToggleSound}
        isMuted={isMuted}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* 6. Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        onLaunch={(url) => window.open(url, '_blank', 'noopener,noreferrer')}
      />

      {/* 7. Toast */}
      <LaunchToast app={toastApp} onClose={() => setToastApp(null)} />
    </div>
  );
}
