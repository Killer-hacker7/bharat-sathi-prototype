import React, { useState } from 'react';
import {
  ShieldCheck,
  LocateFixed,
  MapPin,
  AlertCircle,
  Sparkles,
  Store,
  Shield,
  Send,
  BookOpen,
  CheckCircle,
  ThumbsUp,
  MessageCircle,
  Check
} from 'lucide-react';
import { CommunityTipSubmission, TabType } from '../types';

interface LocalHubScreenProps {
  onNavigateTab: (tab: TabType) => void;
  communityTips: CommunityTipSubmission[];
  onSubmitTip: (newTip: Omit<CommunityTipSubmission, 'id' | 'timestamp' | 'upvotes' | 'status'>) => void;
  onUpvoteTip: (id: string) => void;
}

export const LocalHubScreen: React.FC<LocalHubScreenProps> = ({
  onNavigateTab,
  communityTips,
  onSubmitTip,
  onUpvoteTip,
}) => {
  const [homeCity, setHomeCity] = useState('Agra, Uttar Pradesh');
  const [mistakeAdvice, setMistakeAdvice] = useState(
    "Never buy 'marble' souvenirs near the main Western Gate—it is cheap soapstone coated with chalk. Visit the hereditary artisan cooperative in Taj Ganj for authentic inlay."
  );
  const [twinDetourTitle, setTwinDetourTitle] = useState('Chini Ka Rauza & Kachhpura village walk');
  const [twinDetourDesc, setTwinDetourDesc] = useState(
    'Peaceful Yamuna river bank vantage point with zero bus tour crowds. Overlooks the backside of monument corridors with active craft.'
  );
  const [authenticFoodArtisan, setAuthenticFoodArtisan] = useState(
    "Master Weaver Abdul's loom & Bhimsen Baati"
  );
  const [whatsappNumber, setWhatsappNumber] = useState('98765 43210');
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mistakeAdvice.trim() || !homeCity.trim()) return;

    onSubmitTip({
      homeCity,
      mistakeAdvice,
      twinDetourTitle,
      twinDetourDesc,
      authenticFoodArtisan,
      whatsappNumber: whatsappNumber ? `+91${whatsappNumber.replace(/\s+/g, '')}` : undefined,
    });

    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  const handleAutoDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setHomeCity('Agra, Uttar Pradesh (GPS Verified)');
        },
        () => {
          setHomeCity('Agra, Uttar Pradesh');
        }
      );
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem(
      'bharat_sathi_hub_draft',
      JSON.stringify({
        homeCity,
        mistakeAdvice,
        twinDetourTitle,
        twinDetourDesc,
        authenticFoodArtisan,
        whatsappNumber,
      })
    );
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2000);
  };

  return (
    <article id="screen-hub" className="px-4 py-3 space-y-4">
      {/* Guidelines Modal */}
      {showGuidelines && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 space-y-3 border border-stone-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#c2410c]" />
                <h3 className="text-sm font-bold text-stone-900">Community Trust Guidelines</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuidelines(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-stone-600 space-y-2 leading-relaxed">
              <p>
                <strong>1. No Commercial Kickbacks:</strong> Recommend artisans and food stalls based on genuine craft, not commissions or affiliate cuts.
              </p>
              <p>
                <strong>2. Accurate Pricing:</strong> Only quote verified government rates (e.g. ₹10 battery rickshaw, ₹50 entry) to protect visitors from inflated tout rates.
              </p>
              <p>
                <strong>3. Respect Artisan Dignity:</strong> Encourage travelers to observe traditional crafts with respect and purchase directly without harsh haggling.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowGuidelines(false)}
              className="w-full py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {submittedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-emerald-900 text-xs flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
          <div>
            <p className="font-bold">धन्यवाद! Your insight was published.</p>
            <p className="text-[11px] text-emerald-800">
              Live in Community Stream with [Unverified Community Tip] badge.
            </p>
          </div>
        </div>
      )}

      {draftSavedToast && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2 text-indigo-900 text-xs text-center font-bold">
          ✓ Draft saved to device
        </div>
      )}

      {/* Section Header */}
      <header id="hub-header" className="space-y-1">
        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3 h-3 text-emerald-700" /> Community Trust Network • I Live Here
        </span>
        <h1 className="text-xl font-black text-stone-900 tracking-tight">Share Your Local Knowledge</h1>
        <p className="text-xs text-stone-600 leading-relaxed">
          Help travelers bypass tourist traps, travel safely, and direct spending to genuine local artisans and homestays.
        </p>
      </header>

      {/* Contribution Form */}
      <form
        id="local-knowledge-form"
        onSubmit={handleSubmit}
        className="space-y-3.5"
      >
        {/* Field 1: Hometown / Village with Auto Detect */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-800">
              Your Home City, Town, or Village <span className="text-red-500">*</span>
            </label>
            <button
              id="btn-auto-detect-location"
              type="button"
              onClick={handleAutoDetect}
              className="text-[10px] text-[#c2410c] font-bold flex items-center gap-0.5 hover:underline active:scale-95"
            >
              <LocateFixed className="w-3 h-3" /> Auto-detect
            </button>
          </div>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              id="input-home-city"
              type="text"
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              required
              className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-stone-900 font-medium shadow-xs"
            />
          </div>
          <p className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
            <Check className="w-3 h-3 text-emerald-600" /> Verified geo-fenced local anchor
          </p>
        </div>

        {/* Field 2: Overcrowded Scam / Common Mistake Advice */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-800">
              One thing tourists always get wrong or overpay for
            </label>
            <span className="text-[10px] text-stone-400">{mistakeAdvice.length}/300</span>
          </div>
          <textarea
            id="textarea-mistake-advice"
            rows={3}
            maxLength={300}
            value={mistakeAdvice}
            onChange={(e) => setMistakeAdvice(e.target.value)}
            className="w-full p-2.5 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-stone-800 leading-relaxed font-normal shadow-xs"
          />
          <p className="text-[10px] text-[#c2410c] font-semibold flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Direct impact tip for fair-trade preservation
          </p>
        </div>

        {/* Field 3: Recommended Alternative Twin (Detour) */}
        <div className="bg-indigo-50/40 border border-indigo-200/80 rounded-2xl p-3 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              A quiet alternative or hidden gem within 40 km
            </span>
            <span className="text-[9px] font-extrabold bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded uppercase">
              TWIN DETOUR
            </span>
          </div>
          <input
            id="input-twin-detour-title"
            type="text"
            value={twinDetourTitle}
            onChange={(e) => setTwinDetourTitle(e.target.value)}
            placeholder="Name of monument or artisan village"
            className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-stone-300 focus:outline-none focus:border-indigo-500 text-stone-800 font-medium shadow-xs"
          />
          <textarea
            id="textarea-twin-detour-desc"
            rows={2}
            value={twinDetourDesc}
            onChange={(e) => setTwinDetourDesc(e.target.value)}
            placeholder="Why should travelers visit here instead?"
            className="w-full p-2 text-xs bg-white rounded-lg border border-stone-300 focus:outline-none focus:border-indigo-500 text-stone-700 shadow-xs"
          />
        </div>

        {/* Field 4: Authentic Food / Craftsman Contact */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-stone-800 flex items-center gap-1">
            <Store className="w-3.5 h-3.5 text-stone-600" /> Best authentic local food or artisan spot
          </label>
          <input
            id="input-authentic-food-artisan"
            type="text"
            value={authenticFoodArtisan}
            onChange={(e) => setAuthenticFoodArtisan(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-stone-800 shadow-xs"
          />
        </div>

        {/* Field 5: WhatsApp Direct Contact for Fair Operator Registry */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-800">
              Local Host or Guide WhatsApp Number <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
              0% Middleman Cut
            </span>
          </div>
          <div className="flex rounded-xl overflow-hidden border border-stone-300 bg-white shadow-xs">
            <span className="px-3 py-2 bg-stone-100 text-stone-600 text-xs font-bold border-r border-stone-300 select-none">
              +91
            </span>
            <input
              id="input-whatsapp-number"
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="10 digit mobile number"
              className="flex-1 px-3 py-2 text-xs bg-transparent focus:outline-none text-stone-900 font-medium"
            />
          </div>
          <p className="text-[10px] text-stone-500 leading-snug">
            Enables travelers to contact you directly without commission cut. Encrypted and strictly opt-in.
          </p>
        </div>

        {/* Transparency Guarantee Box */}
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-2.5 shadow-xs">
          <Shield className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-900 leading-relaxed">
            <strong>Transparency Guarantee:</strong> Entries appear immediately with an{' '}
            <span className="bg-white px-1 py-0.5 rounded border border-blue-200 text-stone-700 font-medium">
              [Unverified Community Tip]
            </span>{' '}
            badge until verified by 5 traveler upvotes or local civic moderator.
          </p>
        </div>

        {/* Form Submit Actions */}
        <div className="space-y-2 pt-1">
          <button
            id="btn-publish-tip"
            type="submit"
            className="w-full py-3 bg-[#c2410c] hover:bg-[#9a3412] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Publish to Bharat Sathi
          </button>
          <div className="flex gap-2">
            <button
              id="btn-save-draft"
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 py-2 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs rounded-xl border border-stone-300 transition-colors cursor-pointer"
            >
              Save Draft
            </button>
            <button
              id="btn-open-guidelines"
              type="button"
              onClick={() => setShowGuidelines(true)}
              className="flex-1 py-2 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs rounded-xl border border-stone-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" /> Guidelines
            </button>
          </div>
        </div>
      </form>

      {/* Live Community Stream */}
      <section className="space-y-2 pt-2 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-stone-900">Recent Community Submissions</h3>
          <span className="text-[10px] text-emerald-700 font-bold">Crowdsourced Transparency</span>
        </div>

        <div className="space-y-2">
          {communityTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-xl border border-stone-200 p-3 space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-stone-800 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#c2410c]" /> {tip.homeCity}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded font-bold ${
                    tip.status === 'verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {tip.status === 'verified' ? '✓ Verified' : '[Unverified Tip]'}
                </span>
              </div>

              <p className="text-xs text-stone-800 leading-relaxed font-medium">"{tip.mistakeAdvice}"</p>

              {tip.twinDetourTitle && (
                <div className="bg-indigo-50/50 p-2 rounded-lg border border-indigo-100 text-[11px] space-y-0.5">
                  <span className="font-bold text-indigo-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-600" /> Twin Detour: {tip.twinDetourTitle}
                  </span>
                  <p className="text-stone-600 text-[10px]">{tip.twinDetourDesc}</p>
                </div>
              )}

              {tip.authenticFoodArtisan && (
                <p className="text-[11px] text-stone-600 flex items-center gap-1">
                  <Store className="w-3 h-3 text-stone-400" />
                  <strong>Artisan/Food:</strong> {tip.authenticFoodArtisan}
                </p>
              )}

              <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[10px] text-stone-500">
                <span>{tip.timestamp}</span>
                <button
                  type="button"
                  onClick={() => onUpvoteTip(tip.id)}
                  className={`font-bold flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                    tip.userUpvoted ? 'bg-emerald-50 text-emerald-700' : 'text-[#c2410c] hover:bg-orange-50'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" /> ▲ {tip.upvotes} upvotes
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
