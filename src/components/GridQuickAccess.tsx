import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { AppItem, APPS } from '../data/apps.ts';
import { AppLogo } from './AppLogo.tsx';
import { TiltCard } from './TiltCard.tsx';
import { soundManager } from '../utils/audio.ts';

interface GridQuickAccessProps {
  onLaunchApp: (app: AppItem) => void;
}

export const GridQuickAccess: React.FC<GridQuickAccessProps> = ({ onLaunchApp }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Streaming', 'Social', 'Creative', 'Productivity', 'Mobility'];

  const filteredApps = APPS.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.shortTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleLaunch = (app: AppItem) => {
    soundManager.playOpenSwoosh();
    onLaunchApp(app);
    window.open(app.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="quick-grid-section" className="relative w-full py-28 bg-[#1B1E4A] text-[#AFAEA2] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/15">
          <div>
            <p className="text-xs font-mono tracking-[0.25em] text-[#D21319] uppercase mb-2">
              ✦ ARCHIVE MATRIX // DIRECTORY
            </p>
            <h2 className="text-4xl sm:text-5xl font-editorial-bold font-bold text-white uppercase tracking-tight">
              ALL <span className="text-[#D21319]">PORTALS</span>
            </h2>
          </div>

          {/* Minimalist Search */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-[#AFAEA2] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH ARCHIVE..."
              className="w-full pl-10 pr-4 py-2 bg-[#141738] border border-white/15 focus:border-[#D21319] text-xs font-mono text-white placeholder-[#AFAEA2]/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Minimalist Filters */}
        <div className="flex items-center gap-6 overflow-x-auto pb-4 mb-12 text-xs font-mono tracking-widest uppercase">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`transition-colors cursor-pointer pb-1 border-b ${
                selectedCategory === cat
                  ? 'text-[#D21319] border-[#D21319] font-bold'
                  : 'text-[#AFAEA2] border-transparent hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid: 12 Apps with Big Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              onClick={() => handleLaunch(app)}
              className="cursor-pointer group relative"
              title={`Open official ${app.name} website in new tab`}
            >
              {/* Ambient Hover Aura */}
              <div className="absolute -inset-2 rounded-3xl bg-[#D21319]/0 group-hover:bg-[#D21319]/20 blur-xl transition-all duration-500 pointer-events-none" />

              <TiltCard
                maxTilt={10}
                className="h-full p-8 rounded-2xl bg-[#141738] border border-white/10 group-hover:border-[#D21319] group-hover:shadow-[0_12px_36px_rgba(210,19,25,0.25)] transition-all duration-300 flex flex-col justify-between relative z-10"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#AFAEA2]/70 mb-6">
                    <span>{app.category}</span>
                    <span className="text-[#D21319]">OFFICIAL</span>
                  </div>

                  {/* Big Logo */}
                  <div className="my-6 flex items-center justify-center">
                    <AppLogo
                      id={app.id}
                      size="lg"
                      glow={false}
                      className="transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-end justify-between">
                  <div>
                    <h4 className="text-2xl font-editorial-bold font-bold text-white group-hover:text-[#D21319] transition-colors uppercase">
                      {app.name}
                    </h4>
                    <p className="text-xs font-mono text-[#AFAEA2] mt-0.5">
                      {app.displayUrl}
                    </p>
                  </div>

                  <span className="text-base text-[#D21319] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    ↗
                  </span>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
