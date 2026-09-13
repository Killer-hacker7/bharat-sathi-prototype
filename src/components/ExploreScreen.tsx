import React, { useState } from 'react';
import {
  Mic,
  Search,
  Map,
  Users,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Heart,
  PhoneCall,
  Clock,
  Landmark,
  Check
} from 'lucide-react';
import { Category, SwapPair, TabType } from '../types';
import { INITIAL_SWAP_PAIRS } from '../data/mockData';

interface ExploreScreenProps {
  onNavigateTab: (tab: TabType) => void;
  onSelectMonument?: (monumentId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onNavigateTab,
  onSelectMonument,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Monuments');
  const [activePin, setActivePin] = useState<'taj' | 'babyTaj' | 'amber' | 'panna'>('taj');

  const categories: Category[] = ['Monuments', 'Craft Villages', 'Homestays', 'Cuisine Walks'];

  const filteredSwaps = INITIAL_SWAP_PAIRS.filter(
    (swap) =>
      swap.crowdedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      swap.twinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      swap.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <article id="screen-explore" className="px-4 py-3 space-y-4">
      {/* Voice Assistant Mini Banner */}
      <section
        id="voice-assistant-banner"
        className="bg-white rounded-2xl p-3 border border-orange-200/70 shadow-xs flex items-center justify-between gap-3 hover:border-orange-300 transition-all cursor-pointer"
        onClick={() => onNavigateTab('assistant')}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-[#c2410c] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-900">Ask in Hindi / English</p>
            <p className="text-[10px] text-stone-500">Sarvam / Bhashini Audio Assistant</p>
          </div>
        </div>
        <button
          id="btn-voice-speak"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigateTab('assistant');
          }}
          className="px-3.5 py-1.5 bg-orange-50 hover:bg-orange-100 text-[#c2410c] text-xs font-semibold rounded-lg border border-orange-200 transition-colors shrink-0 active:scale-95"
        >
          Speak
        </button>
      </section>

      {/* Hero Title Section */}
      <header id="hero-section" className="pt-1">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[11px] font-semibold rounded-full border border-emerald-200/90 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Verified Sustainable Tourism Pilot
        </span>
        <h1 className="text-[26px] leading-[1.18] font-extrabold text-stone-950 tracking-tight">
          See India deeply,{' '}
          <span className="text-[#c2410c] underline decoration-orange-300 decoration-wavy underline-offset-4">
            not just crowdedly.
          </span>
        </h1>
        <p className="text-xs leading-relaxed text-stone-600 mt-2 font-normal">
          For every overcrowded monument you search, we find you a verified, peaceful alternative nearby—while keeping you safe and putting money directly into local hands.
        </p>
      </header>

      {/* Search Bar Input */}
      <section id="search-input" className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
          <input
            id="explore-search-input-field"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Indian city, monument, or region..."
            className="w-full pl-10 pr-10 py-2.5 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 placeholder-stone-400 shadow-xs"
          />
          <button
            id="btn-search-mic-trigger"
            type="button"
            aria-label="Mic input"
            onClick={() => onNavigateTab('assistant')}
            className="absolute right-3 text-[#c2410c] hover:opacity-80 p-0.5"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Horizontal Category Pills */}
      <nav id="category-pills" className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`btn-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs shrink-0 transition-colors ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white font-semibold shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 font-medium hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Key Stats / Trust Row */}
      <section
        id="trust-metrics"
        className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-2.5 grid grid-cols-3 divide-x divide-indigo-200/60 text-center shadow-xs"
      >
        <div>
          <span className="block text-base font-extrabold text-[#c2410c] leading-none">15+</span>
          <span className="text-[9px] font-semibold text-stone-600 uppercase tracking-tight">
            Curated Twin Pairs
          </span>
        </div>
        <div>
          <span className="block text-base font-extrabold text-emerald-700 leading-none">Direct</span>
          <span className="text-[9px] font-semibold text-stone-600 uppercase tracking-tight">
            Operator Contacts
          </span>
        </div>
        <div>
          <span className="block text-base font-extrabold text-indigo-700 leading-none">100%</span>
          <span className="text-[9px] font-semibold text-stone-600 uppercase tracking-tight">
            ASI Verified Data
          </span>
        </div>
      </section>

      {/* Interactive Map Widget Mockup */}
      <section id="map-widget" className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 text-[#c2410c]" />
            <span className="text-xs font-bold text-stone-900">Golden Triangle Pilot Pins</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-medium text-stone-500">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-600"></span> Crowded
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Quiet Twin
            </span>
          </div>
        </div>

        {/* Stylized Mock Map Graphic with clickable interactive pins */}
        <div className="relative w-full h-40 bg-stone-100 rounded-xl overflow-hidden border border-stone-200/70 select-none">
          {/* Simulated Map Roads & Region Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <line stroke="#cbd5e1" strokeWidth="5" x1="20" x2="360" y1="30" y2="110" />
            <line stroke="#cbd5e1" strokeWidth="4" x1="100" x2="300" y1="135" y2="25" />
            <line stroke="#f97316" strokeWidth="2" strokeDasharray="4,4" x1="160" x2="260" y1="90" y2="40" />
            <circle cx="250" cy="50" fill="#e2e8f0" r="50" />
            <circle cx="90" cy="90" fill="#e2e8f0" r="35" />
          </svg>

          {/* Interactive Map Pins */}
          <div className="absolute inset-0 p-2.5 flex flex-col justify-between">
            {/* Taj Mahal Crowded Pin */}
            <div className="self-end mr-3">
              <button
                type="button"
                id="map-pin-taj"
                onClick={() => {
                  setActivePin('taj');
                  onNavigateTab('twins');
                }}
                className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md animate-pulse cursor-pointer transition-transform active:scale-95"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Taj Mahal: 2.5h Wait
              </button>
            </div>

            {/* Baby Taj Serene Pin */}
            <div className="self-center mt-1">
              <button
                type="button"
                id="map-pin-baby-taj"
                onClick={() => {
                  setActivePin('babyTaj');
                  onNavigateTab('twins');
                }}
                className="inline-flex items-center gap-1 bg-emerald-800 hover:bg-emerald-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md cursor-pointer transition-transform active:scale-95"
              >
                <Check className="w-3 h-3 text-emerald-300" /> Baby Taj: 0 Wait
              </button>
            </div>

            {/* Live ASI Sensor Feed Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[10px] text-stone-700 font-medium border border-stone-200 shadow-xs self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Live ASI Sensor Feed: Agra Corridor</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending De-congested Swaps Section */}
      <section id="trending-swaps" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Trending De-congested Swaps</h2>
            <p className="text-[11px] text-stone-500">Real-time alternative routes verified today</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('twins')}
            className="text-xs font-bold text-[#c2410c] hover:underline"
          >
            View All
          </button>
        </div>

        {/* Dynamic Swap Cards */}
        {filteredSwaps.map((swap) => (
          <div
            key={swap.id}
            id={`swap-card-${swap.id}`}
            className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all hover:shadow-sm"
          >
            {/* Overcrowded origin */}
            <div className="p-3 bg-red-50/50 border-b border-red-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {swap.crowdedImage ? (
                  <img
                    src={swap.crowdedImage}
                    alt={swap.crowdedName}
                    className="w-9 h-9 rounded-lg object-cover border border-red-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center text-red-700 font-black text-xs shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="text-xs font-bold text-stone-900 leading-tight">{swap.crowdedName}</h3>
                  <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> {swap.crowdedTag}
                  </p>
                </div>
              </div>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>

            {/* Recommended Serene Twin */}
            <div className="p-3 bg-emerald-50/30">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-emerald-300 shrink-0 bg-emerald-100 flex items-center justify-center">
                    {swap.twinImage ? (
                      <img
                        src={swap.twinImage}
                        alt={swap.twinName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Sparkles className="w-5 h-5 text-emerald-800" />
                    )}
                    <span className="absolute bottom-0 right-0 bg-emerald-900 text-[7px] font-bold text-white px-1 rounded-tl uppercase">
                      TWIN
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 leading-tight">{swap.twinName}</h4>
                    <p className="text-[10px] text-emerald-800 font-medium">{swap.twinSubtitle}</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">{swap.detourTime}</p>
                  </div>
                </div>
                <button
                  id={`btn-reroute-${swap.id}`}
                  type="button"
                  onClick={() => {
                    if (onSelectMonument) onSelectMonument(swap.twinId);
                    onNavigateTab('twins');
                  }}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg shadow-xs transition-colors shrink-0 active:scale-95 cursor-pointer"
                >
                  Reroute
                </button>
              </div>

              {/* Verification footer */}
              <div className="mt-2.5 pt-2 border-t border-emerald-200/50 flex items-center justify-between text-[10px]">
                <span className="text-stone-600 font-medium flex items-center gap-1">
                  {swap.id === 'amber-to-panna-meena' ? (
                    <Heart className="w-3.5 h-3.5 text-rose-600" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  )}
                  {swap.impactNote}
                </span>
                <span className="text-[#c2410c] font-bold">{swap.timeSaved}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 24x7 Multi-lingual Tourist Helpline Callout */}
      <section
        id="helpline-card"
        className="bg-indigo-50 border border-indigo-200/80 rounded-xl p-3 flex items-center justify-between shadow-xs"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-950">24x7 Multi-lingual Tourist Helpline</p>
            <p className="text-[10px] text-indigo-700">Govt of India Public Service 1363</p>
          </div>
        </div>
        <a
          id="link-helpline-1363"
          href="tel:1363"
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors active:scale-95"
        >
          Call 1363
        </a>
      </section>
    </article>
  );
};
