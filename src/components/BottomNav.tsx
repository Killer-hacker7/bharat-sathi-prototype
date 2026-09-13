import React from 'react';
import { Compass, Repeat, Mic, MapPin } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { key: 'explore' as TabType, label: 'Explore', icon: Compass },
    { key: 'twins' as TabType, label: 'Twins', icon: Repeat },
    { key: 'assistant' as TabType, label: 'Assistant', icon: Mic },
    { key: 'hub' as TabType, label: 'Local Hub', icon: MapPin },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-2 flex items-center justify-around z-40"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            id={`nav-btn-${tab.key}`}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`nav-item flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 ${
              isActive ? 'text-emerald-900' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <div
              className={`nav-icon-wrapper w-10 h-7 rounded-full flex items-center justify-center mb-0.5 transition-colors ${
                isActive ? 'bg-emerald-100 text-emerald-900' : 'bg-transparent text-stone-500'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
