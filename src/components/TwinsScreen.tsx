import React, { useState } from 'react';
import {
  Bookmark,
  Share2,
  MapPin,
  Ticket,
  ExternalLink,
  AlertCircle,
  Shuffle,
  ArrowDown,
  CheckCircle,
  Check,
  Landmark,
  MessageSquare,
  RefreshCw,
  ShieldAlert,
  Calendar,
  Briefcase,
  ChevronDown,
  Tag,
  Info,
  CheckCheck
} from 'lucide-react';
import { MonumentDetail, TabType, CommunityTipSubmission } from '../types';

interface TwinsScreenProps {
  monument: MonumentDetail;
  onNavigateTab: (tab: TabType) => void;
  communityTips: CommunityTipSubmission[];
  onUpvoteCommunityTip: (id: string) => void;
  onSwapTwin: () => void;
  hasSwappedTwin: boolean;
}

export const TwinsScreen: React.FC<TwinsScreenProps> = ({
  monument,
  onNavigateTab,
  communityTips,
  onUpvoteCommunityTip,
  onSwapTwin,
  hasSwappedTwin,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [knowBeforeTips, setKnowBeforeTips] = useState(monument.knowBeforeYouGo);

  const handleUpvoteTip = (id: string) => {
    setKnowBeforeTips((prev) =>
      prev.map((tip) => {
        if (tip.id === id) {
          const upvoted = !tip.userUpvoted;
          return {
            ...tip,
            upvotes: upvoted ? tip.upvotes + 1 : tip.upvotes - 1,
            userUpvoted: upvoted,
          };
        }
        return tip;
      })
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Bharat Sathi - ' + monument.name,
          text: `Check out de-congested alternatives for ${monument.name} on Bharat Sathi!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <article id="screen-twins" className="px-4 py-3 space-y-3.5">
      {/* Toast Notification */}
      {showShareToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Link copied to clipboard!</span>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 space-y-3 border border-stone-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#c2410c]" />
                <h3 className="text-sm font-bold text-stone-900">Official ASI Ticket Window</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold px-1"
              >
                ✕
              </button>
            </div>
            <div className="bg-orange-50/80 rounded-xl p-3 border border-orange-200 text-xs space-y-1">
              <p className="font-bold text-stone-900">Government Fixed Entry Fee</p>
              <p className="text-stone-600">
                Indian Citizen: <strong className="text-stone-900">₹50</strong> per adult (Shoe covers included at turnstile)
              </p>
              <p className="text-stone-600">
                Foreign Tourist: <strong className="text-stone-900">₹1,100</strong> (Includes high-speed queue bypass &amp; bottled water)
              </p>
            </div>
            <p className="text-[11px] text-stone-500">
              Note: Avoid unauthorized street counters charging ₹200–₹500 for "instant entry passes". All official tickets have encrypted QR codes.
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href={monument.officialTicketLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-bold rounded-xl text-center shadow-xs transition-colors"
              >
                Proceed to ASI.nic.in ↗
              </a>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Monument Bar */}
      <section id="monument-header" className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            {monument.statusText}
          </span>
          <div className="flex items-center gap-2">
            <button
              id="btn-bookmark-monument"
              type="button"
              aria-label="Bookmark"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center transition-colors ${
                isBookmarked ? 'text-[#c2410c] border-orange-300' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              id="btn-share-monument"
              type="button"
              aria-label="Share"
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h1 className="text-xl font-black text-stone-900 leading-tight">{monument.name}</h1>
        <p className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          {monument.address}
        </p>
      </section>

      {/* Official ASI Ticket Box */}
      <section
        id="asi-booking"
        className="bg-white rounded-xl border border-stone-200 p-2.5 flex items-center justify-between shadow-xs"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#c2410c] shrink-0">
            <Ticket className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-900 flex items-center gap-1">
              Official ASI Portal <ExternalLink className="w-3 h-3 text-stone-400" />
            </p>
            <p className="text-[10px] text-stone-500">Verified Gate Entry • Zero Exorbitant Fees</p>
          </div>
        </div>
        <button
          id="btn-book-asi-ticket"
          type="button"
          onClick={() => setShowBookingModal(true)}
          className="px-3 py-1.5 bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-bold rounded-lg transition-colors shadow-xs shrink-0 active:scale-95 cursor-pointer"
        >
          Book ₹{monument.officialTicketPrice} ↗
        </button>
      </section>

      {/* Photo Strip Mockup */}
      <section id="photo-strip" className="grid grid-cols-2 gap-2">
        {monument.photos.map((photo, idx) => (
          <div
            key={idx}
            className="relative h-28 bg-stone-200 rounded-xl overflow-hidden border border-stone-200 flex items-end p-2 group"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className="relative z-10 text-[9px] font-semibold text-white bg-black/60 backdrop-blur px-1.5 py-0.5 rounded">
              {photo.title}
            </span>
          </div>
        ))}
      </section>

      {/* Overcrowding Alert */}
      <section
        id="critical-alert"
        className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 shadow-xs"
      >
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-red-900">{monument.criticalAlert.title}</span>
            <span className="text-[9px] font-extrabold bg-red-600 text-white px-1.5 py-0.5 rounded uppercase">
              CRITICAL
            </span>
          </div>
          <p className="text-[11px] text-red-800 leading-tight mt-1">
            Current wait time at ticket counter: <strong>{monument.waitTime}</strong>. High humidity &amp; tight bottlenecks at Western Gate.
          </p>
        </div>
      </section>

      {/* Smart Travel Twin Recommendation Engine Card */}
      <section
        id="twin-recommendation"
        className="bg-gradient-to-b from-stone-50 to-white rounded-2xl border-2 border-emerald-500/40 p-3.5 space-y-3 shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div className="flex items-center gap-1.5">
            <Shuffle className="w-4 h-4 text-emerald-800" />
            <h2 className="text-xs font-extrabold text-stone-900 tracking-tight">
              Smart Travel Twin Recommendation
            </h2>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            AI Match: {monument.twin.matchPercent}%
          </span>
        </div>

        {/* Current Spot Summary */}
        <div className="bg-red-50/50 rounded-xl p-2.5 border border-red-200/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-stone-500 tracking-wide">
              Current Selected Spot
            </span>
            <span className="text-[9px] font-semibold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
              Peak Footfall Today
            </span>
          </div>
          <p className="text-xs font-bold text-stone-800 mt-1">Taj Mahal Main Complex</p>
          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-stone-600 font-medium">
            <span>⏱️ Current Wait: <strong>2.5h-3h</strong></span>
            <span>🌡️ Midday humidity high in queue</span>
          </div>
        </div>

        {/* Terracotta Action Divider */}
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center gap-1 bg-[#c2410c] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <ArrowDown className="w-3 h-3 animate-bounce" /> TRY THIS INSTEAD
          </span>
        </div>

        {/* Recommended Twin Spot Details */}
        <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-300/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wide">
              De-congested Alternative Twin
            </span>
            <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold bg-emerald-700 text-white px-1.5 py-0.5 rounded">
              <CheckCircle className="w-2.5 h-2.5" /> Verified Twin
            </span>
          </div>
          <div>
            <h3 className="text-sm font-black text-stone-900">{monument.twin.name}</h3>
            <p className="text-[10px] text-stone-500 font-medium">{monument.twin.address}</p>
          </div>

          {/* Key Metric Pills */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-lg p-2 border border-emerald-200 text-center shadow-xs">
              <span className="block text-xs font-black text-emerald-700">{monument.twin.crowdLess}</span>
              <span className="text-[9px] text-stone-500 font-medium">Walk right in (0 min queue)</span>
            </div>
            <div className="bg-white rounded-lg p-2 border border-emerald-200 text-center shadow-xs">
              <span className="block text-xs font-black text-stone-800">{monument.twin.distanceTime}</span>
              <span className="text-[9px] text-stone-500 font-medium">{monument.twin.transportCost}</span>
            </div>
          </div>

          {/* Bullet reasons */}
          <ul className="text-[11px] text-stone-700 space-y-1 pt-1 font-medium">
            {monument.twin.bulletPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          {/* Why This Twin Historical Grounding Callout */}
          <div className="bg-white/90 rounded-lg p-2.5 border border-emerald-200/90 space-y-1">
            <p className="text-[10px] font-bold text-amber-900 flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              Why this twin? Historical Grounding
            </p>
            <p className="text-[10px] leading-relaxed text-stone-600">
              {monument.twin.historicalGrounding}
            </p>
          </div>

          {/* Local Guide Connection */}
          <div className="bg-white rounded-lg p-2 border border-stone-200 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-100 font-bold text-xs text-emerald-800 flex items-center justify-center">
                {monument.twin.guide.initials}
              </div>
              <div>
                <p className="text-[11px] font-bold text-stone-800 leading-tight">
                  {monument.twin.guide.name}
                </p>
                <p className="text-[9px] text-stone-500">{monument.twin.guide.role}</p>
              </div>
            </div>
            <a
              id="link-guide-whatsapp"
              href={`https://wa.me/${monument.twin.guide.whatsappPhone.replace(/\+/g, '')}?text=Namaste%20Suresh%20Ji,%20I%20am%20interested%20in%20visiting%20the%20Baby%20Taj%20with%20your%20guidance.`}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors shadow-xs active:scale-95"
            >
              <MessageSquare className="w-3 h-3" /> WhatsApp
            </a>
          </div>

          {/* Primary Action Button */}
          <button
            id="btn-swap-itinerary-twin"
            type="button"
            onClick={onSwapTwin}
            className={`w-full py-2.5 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-98 cursor-pointer ${
              hasSwappedTwin ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-emerald-900 hover:bg-emerald-950'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${hasSwappedTwin ? 'rotate-180 transition-transform' : ''}`} />
            {hasSwappedTwin ? '✓ Swapped to Baby Taj in Itinerary' : 'Swap to this twin in Itinerary'}
          </button>
        </div>
      </section>

      {/* Safety Snapshot */}
      <section
        id="safety-snapshot"
        className="bg-white rounded-2xl border border-stone-200 p-3 space-y-2.5 shadow-xs"
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-stone-700" />
            <h2 className="text-xs font-extrabold text-stone-900">Safety Snapshot</h2>
          </div>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
            ASI/UPP VERIFIED
          </span>
        </div>
        <div className="space-y-2 text-[11px]">
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0 text-[10px]">
              🚨
            </span>
            <p className="text-stone-700">
              <strong>{monument.safetySnapshot.crowd}</strong>
              <br />
              <span className="text-stone-500 text-[10px]">{monument.safetySnapshot.crowdDetail}</span>
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-[10px]">
              👮
            </span>
            <p className="text-stone-700">
              <strong>{monument.safetySnapshot.guideContact}</strong>
              <br />
              <span className="text-stone-500 text-[10px]">{monument.safetySnapshot.guideContactDetail}</span>
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 text-[10px]">
              🚶‍♀️
            </span>
            <p className="text-stone-700">
              <strong>{monument.safetySnapshot.soloWomen}</strong>
              <br />
              <span className="text-stone-500 text-[10px]">{monument.safetySnapshot.soloWomenDetail}</span>
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 text-[10px]">
              ℹ️
            </span>
            <p className="text-stone-700">
              <strong>{monument.safetySnapshot.emergency}</strong>
              <br />
              <span className="text-stone-500 text-[10px]">{monument.safetySnapshot.emergencyDetail}</span>
            </p>
          </div>
        </div>
        <a
          id="btn-safety-helpline-call"
          href="tel:1363"
          className="block w-full py-2 bg-indigo-900 hover:bg-indigo-950 text-white text-center text-xs font-bold rounded-lg shadow-xs transition-colors active:scale-95"
        >
          National Tourist Helpline: 1363 (Govt Multilingual)
        </a>
      </section>

      {/* Know Before You Go Accordion / Warning Cards */}
      <section id="know-before-you-go" className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-stone-900">Know Before You Go</h2>
          <button
            id="btn-submit-tip-trigger"
            type="button"
            onClick={() => onNavigateTab('hub')}
            className="text-[11px] font-bold text-[#c2410c] hover:underline"
          >
            Submit Tip +
          </button>
        </div>

        {/* Know Before Tips */}
        {knowBeforeTips.map((tip) => (
          <div
            key={tip.id}
            id={`tip-card-${tip.id}`}
            className="bg-white rounded-xl border border-stone-200 p-3 space-y-1.5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                  tip.type === 'scam'
                    ? 'text-red-700 bg-red-50'
                    : tip.type === 'unspoken_rule'
                    ? 'text-indigo-700 bg-indigo-50'
                    : 'text-emerald-800 bg-emerald-50'
                }`}
              >
                {tip.type === 'scam' && <ShieldAlert className="w-3 h-3" />}
                {tip.type === 'unspoken_rule' && <Info className="w-3 h-3" />}
                {tip.type === 'fair_price' && <Tag className="w-3 h-3" />}
                {tip.title}
              </span>
              <span className="text-[10px] text-stone-400 font-medium">{tip.tag}</span>
            </div>
            <p className="text-xs text-stone-800 leading-snug">{tip.text}</p>
            <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-100">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                {tip.source}
              </span>
              <button
                type="button"
                onClick={() => handleUpvoteTip(tip.id)}
                className={`font-bold flex items-center gap-0.5 active:scale-95 ${
                  tip.userUpvoted ? 'text-emerald-700' : 'text-[#c2410c] hover:opacity-80'
                }`}
              >
                ▲ {tip.upvotes} upvotes
              </button>
            </div>
          </div>
        ))}

        {/* User-submitted community tips for this area */}
        {communityTips.slice(0, 1).map((cTip) => (
          <div
            key={cTip.id}
            className="bg-emerald-50/40 rounded-xl border border-emerald-200 p-3 space-y-1.5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                <CheckCircle className="w-3 h-3" /> Community Verified Insight
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">{cTip.homeCity}</span>
            </div>
            <p className="text-xs text-stone-800 leading-snug">"{cTip.mistakeAdvice}"</p>
            <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-emerald-100">
              <span className="text-stone-500">Submitted by local resident</span>
              <button
                type="button"
                onClick={() => onUpvoteCommunityTip(cTip.id)}
                className={`font-bold flex items-center gap-0.5 ${
                  cTip.userUpvoted ? 'text-emerald-800' : 'text-[#c2410c]'
                }`}
              >
                ▲ {cTip.upvotes} upvotes
              </button>
            </div>
          </div>
        ))}

        {/* Static Accordion Toggles */}
        <details className="bg-white rounded-xl border border-stone-200 p-2.5 text-xs text-stone-800">
          <summary className="font-bold cursor-pointer list-none flex items-center justify-between select-none">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#c2410c]" />
              {monument.closureAlert.title}
            </span>
            <ChevronDown className="w-4 h-4 text-stone-400" />
          </summary>
          <p className="text-[11px] text-stone-600 mt-2 pl-6 leading-relaxed">
            {monument.closureAlert.content}
          </p>
        </details>

        <details className="bg-white rounded-xl border border-stone-200 p-2.5 text-xs text-stone-800">
          <summary className="font-bold cursor-pointer list-none flex items-center justify-between select-none">
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#c2410c]" />
              {monument.prohibitedItems.title}
            </span>
            <ChevronDown className="w-4 h-4 text-stone-400" />
          </summary>
          <p className="text-[11px] text-stone-600 mt-2 pl-6 leading-relaxed">
            {monument.prohibitedItems.content}
          </p>
        </details>
      </section>
    </article>
  );
};
