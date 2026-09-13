import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onLogoClick }) => {
  return (
    <header
      id="global-header"
      className="shrink-0 bg-white border-b border-stone-200/90 px-4 py-2.5 flex items-center justify-between z-30 shadow-xs sticky top-0"
    >
      <div 
        className="flex items-center gap-2.5 cursor-pointer select-none"
        onClick={onLogoClick}
      >
        <div className="w-8 h-8 rounded-lg bg-orange-100/90 border border-orange-200 flex items-center justify-center text-orange-700 shadow-xs">
          <Compass className="w-5 h-5 text-[#c2410c]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-bold text-[15px] tracking-tight text-stone-900">Bharat Sathi</span>
            <span className="text-[10px] bg-emerald-100 font-semibold text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
              ASI 1363
            </span>
          </div>
          <p className="text-[10px] text-stone-500 font-medium mt-0.5">De-congestion &amp; Trust Layer</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          id="btn-language-selector"
          type="button"
          aria-label="Language selector"
          onClick={() => onLanguageChange(language === 'EN' ? 'HI' : 'EN')}
          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200/90 text-stone-700 text-xs font-semibold rounded-md border border-stone-300/80 flex items-center gap-1 transition-colors active:scale-95"
        >
          <span className={language === 'EN' ? 'text-stone-900 font-bold' : 'text-stone-500'}>EN</span>
          <span className="text-stone-300">|</span>
          <span className={language === 'HI' ? 'text-[#c2410c] font-bold' : 'text-[#c2410c]'}>हिंदी</span>
        </button>
      </div>
    </header>
  );
};
