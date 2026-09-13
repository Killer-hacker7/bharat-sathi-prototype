import React, { useState } from 'react';
import { TabType } from '../types';
import { Smartphone, Monitor } from 'lucide-react';

interface DesktopWrapperProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  children: React.ReactNode;
}

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({
  activeTab,
  onTabChange,
  children,
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'expanded'>('mobile');

  const navTabs = [
    { key: 'explore' as TabType, label: '1. Explore' },
    { key: 'twins' as TabType, label: '2. Twins' },
    { key: 'assistant' as TabType, label: '3. Voice AI' },
    { key: 'hub' as TabType, label: '4. Local Hub' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-800 flex flex-col items-center justify-start py-0 md:py-6 px-0 md:px-4 selection:bg-orange-200">
      {/* Top desktop preview controls visible on tablet and desktop */}
      <aside
        id="desktop-controls"
        className="hidden md:flex items-center justify-between w-full max-w-[428px] mb-3 px-3 py-2 bg-slate-800/90 backdrop-blur rounded-xl border border-slate-700 text-xs text-slate-300 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-slate-100 text-[11px]">ASI 1363 Pilot Active</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-lg border border-slate-700/60">
          {navTabs.map((tab) => (
            <button
              key={tab.key}
              id={`btn-desktop-${tab.key}`}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`px-2 py-1 text-[11px] rounded font-medium transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-[#c2410c] text-white font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Device Frame */}
      <main
        id="mobile-viewport"
        className={`relative w-full transition-all duration-300 ${
          deviceMode === 'mobile'
            ? 'max-w-[412px] h-[100dvh] md:h-[860px] md:rounded-[40px] md:border-[8px] md:border-slate-800 shadow-2xl'
            : 'max-w-4xl h-[100dvh] md:h-[90vh] md:rounded-2xl md:border-2 md:border-slate-700 shadow-2xl'
        } bg-[#fbf9f6] overflow-hidden flex flex-col`}
      >
        {children}
      </main>
    </div>
  );
};
