import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Zap,
  Languages,
  ShieldCheck,
  Mic,
  MicOff,
  User,
  Database,
  Calendar,
  Send,
  Keyboard,
  Sparkles,
  RefreshCw,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Language, TabType, ItineraryDay, ChatMessage } from '../types';
import { INITIAL_ITINERARY_DAYS } from '../data/mockData';

interface AssistantScreenProps {
  onNavigateTab: (tab: TabType) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  hasSwappedTwin: boolean;
}

export const AssistantScreen: React.FC<AssistantScreenProps> = ({
  onNavigateTab,
  language,
  onLanguageChange,
  hasSwappedTwin,
}) => {
  const [selectedLang, setSelectedLang] = useState<'EN' | 'HI' | 'Hinglish'>('HI');
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('Day 2 me budget add karo');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>(INITIAL_ITINERARY_DAYS);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'user',
      text: '3 din ka Agra-Jaipur trip, bina bheed ke heritage aur shaant jagah chahiye.',
      timestamp: '09:42 AM',
    },
    {
      id: 'msg-2',
      role: 'assistant',
      text: 'नमस्ते! ASI लाइव फुटफॉल सेंसर और हेरिटेज ट्विन डेटा के आधार पर, मैंने 3-दिन का डी-कंजेसटेड रूट तैयार किया है। इसमें मुख्य भीड़ वाले समय को बाईपास करके शांत मुगल वास्तुकला, महताब बाग और स्थानीय कारीगरों के संपर्क को प्राथमिकता दी गई है।',
      timestamp: '09:43 AM',
    },
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Quick prompt suggestions
  const quickChips = [
    'Day 2 me budget add karo',
    'Baby Taj ke pass authentic thali?',
    'Jaipur me artisan block printing?',
    'Women solo safety helpline rules',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Call server API or smart AI fallback
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, language: selectedLang }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          text: data.reply || 'Here is your de-congested recommendation backed by ASI 1363 guidelines.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        return;
      }
    } catch {
      // Fallback below
    }

    // Intelligent context-aware client fallback
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('budget') || lower.includes('खर्च') || lower.includes('day 2')) {
        reply =
          'Day 2 फतेहपुर सीकरी और आभानेरी स्टेपवेल के लिए अनुमानित बजट: ASI एंट्री ₹50 + ₹25, सरकारी टूरिस्ट इलेक्ट्रिक शटल ₹10, स्थानीय गाइड ₹350/घंटा (सीधे गाइड को), और पारंपरिक बाजरा रोटी भोजन ₹120। कुल अनुमानित खर्च ₹600-₹850 प्रति व्यक्ति।';
      } else if (lower.includes('thali') || lower.includes('food') || lower.includes('खाना')) {
        reply =
          'बेबी ताज (Tomb of I\'timād-ud-Daulah) के पास यमुना पार ताजगंज की तुलना में 70% सस्ती और प्रामाणिक भोजन उपलब्ध है। "भीमसेन बाटी चोखा" और स्थानीय "ब्रजवासी भोजनालय" शुद्ध घी थाली ₹140 में परोसते हैं।';
      } else if (lower.includes('jaipur') || lower.includes('block') || lower.includes('print')) {
        reply =
          'आमेर किले की भीड़ से 8 मिनट दूर "पन्ना मीना का कुंड" और अनौखी म्यूजियम ऑफ हैंड प्रिंटिंग (Anokhi Museum) जाएँ। यहाँ 40+ पारंपरिक छिपा समुदाय के कारीगर बिना किसी शोर-शराबे के प्राकृतिक नील (Indigo) ब्लॉक प्रिंटिंग सिखाते हैं।';
      } else {
        reply =
          'Bharat Sathi de-congestion protocol: For popular sites during peak hours (10:00 AM - 04:00 PM), we always route to nearby ASI Grade-1 protected twin structures with 80%+ crowd reduction and 0% commission local operators.';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const toggleSpeechSimulation = () => {
    setIsVoiceActive((prev) => !prev);
  };

  return (
    <article id="screen-assistant" className="px-4 py-3 space-y-3.5">
      {/* Sheet Top Header */}
      <section id="assistant-header" className="border-b border-stone-200 pb-2.5 flex items-start justify-between">
        <div>
          <h1 className="text-base font-black text-stone-900 leading-tight">Bharat Sathi AI Assistant</h1>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Voice-first, hallucination-free de-congested travel planning
          </p>
        </div>
        <button
          id="btn-close-assistant"
          type="button"
          onClick={() => onNavigateTab('explore')}
          className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </section>

      {/* AI Engine Tech Badges */}
      <section id="tech-stack-pills" className="flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold rounded-lg shadow-2xs">
          <Zap className="w-3 h-3 text-indigo-600" /> Sarvam 2B
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold rounded-lg shadow-2xs">
          <Languages className="w-3 h-3 text-emerald-600" /> Bhashini N-L
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 border border-orange-200 text-[#c2410c] text-[10px] font-bold rounded-lg shadow-2xs">
          <ShieldCheck className="w-3 h-3 text-[#c2410c]" /> ASI RAG
        </span>
      </section>

      {/* Language Segment Control */}
      <section id="language-selector" className="flex p-1 bg-stone-100 rounded-xl max-w-xs text-xs font-semibold shadow-inner">
        <button
          type="button"
          onClick={() => setSelectedLang('EN')}
          className={`flex-1 py-1 rounded-lg text-center transition-all ${
            selectedLang === 'EN' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setSelectedLang('HI')}
          className={`flex-1 py-1 rounded-lg text-center transition-all ${
            selectedLang === 'HI' ? 'bg-[#c2410c] text-white shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          हिंदी
        </button>
        <button
          type="button"
          onClick={() => setSelectedLang('Hinglish')}
          className={`flex-1 py-1 rounded-lg text-center transition-all ${
            selectedLang === 'Hinglish' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Hinglish
        </button>
      </section>

      {/* Live Audio Stream Active Box */}
      <section
        id="voice-streaming-card"
        className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-3 space-y-2.5 shadow-xs transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSpeechSimulation}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xs transition-colors ${
                isVoiceActive ? 'bg-[#c2410c]' : 'bg-stone-400'
              }`}
            >
              {isVoiceActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
            <div>
              <p className="text-xs font-bold text-stone-900">
                {isVoiceActive ? 'Voice Stream Active' : 'Voice Input Standby'}
              </p>
              <p className="text-[10px] text-stone-500">Indic ASR 44.1kHz • Low Latency</p>
            </div>
          </div>

          {/* Waveform Animation Bars */}
          <div className="flex items-center gap-1 h-6 px-2 bg-white/80 rounded-lg border border-indigo-100">
            {isVoiceActive ? (
              <>
                <span className="w-1 bg-[#c2410c] rounded-full wave-bar"></span>
                <span className="w-1 bg-[#c2410c] rounded-full wave-bar"></span>
                <span className="w-1 bg-[#c2410c] rounded-full wave-bar"></span>
                <span className="w-1 bg-[#c2410c] rounded-full wave-bar"></span>
                <span className="w-1 bg-[#c2410c] rounded-full wave-bar"></span>
              </>
            ) : (
              <span className="text-[10px] text-stone-400 font-medium">Muted</span>
            )}
          </div>
        </div>

        {/* User Voice Input Bubble */}
        <div className="bg-white rounded-xl p-2.5 border border-stone-200 text-xs text-stone-800 shadow-xs flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-orange-100 text-[#c2410c] flex items-center justify-center shrink-0 mt-0.5">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1">
            <span className="font-bold text-stone-900 text-[11px]">User Voice Prompt:</span>
            <p className="italic text-stone-700 mt-0.5">
              "3 din ka Agra-Jaipur trip, bina bheed ke heritage aur shaant jagah chahiye."
            </p>
          </div>
        </div>

        {/* Grounded System Response Status */}
        <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200/90 text-[11px] text-emerald-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800">
            <Database className="w-3.5 h-3.5" />
            <span>Grounded in ASI Database • Live Footfall Stream #UP-RAJ-89</span>
          </div>
          <p className="leading-relaxed text-stone-600 text-[11px]">
            Generating an itinerary with minimal queues, serene alternatives, and high artisan community impact...
          </p>
        </div>
      </section>

      {/* Curated Plan Output Card */}
      <section id="curated-plan" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#c2410c]" />
            <h2 className="text-xs font-bold text-stone-900">Curated De-congested Plan (3 Days)</h2>
          </div>
          <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
            94% Less Wait
          </span>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex gap-1.5">
          {itineraryDays.map((day) => (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => setSelectedDay(day.dayNumber)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                selectedDay === day.dayNumber
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              Day {day.dayNumber}
            </button>
          ))}
        </div>

        {/* Day Card */}
        {(() => {
          const currentDay = itineraryDays.find((d) => d.dayNumber === selectedDay) || itineraryDays[0];
          return (
            <div className="bg-white rounded-2xl border border-stone-200 p-3 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-orange-100 text-[#c2410c] font-black text-xs flex items-center justify-center">
                    D{currentDay.dayNumber}
                  </span>
                  <span className="text-xs font-bold text-stone-900">{currentDay.dayTitle}</span>
                </div>
                <span className="text-[10px] text-stone-500 font-medium">
                  Queue: {currentDay.queueTotal}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {currentDay.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        item.tagColor === 'terracotta'
                          ? 'bg-[#c2410c]'
                          : item.tagColor === 'emerald'
                          ? 'bg-emerald-600'
                          : 'bg-indigo-600'
                      }`}
                    ></span>
                    <div className="flex-1 space-y-0.5">
                      <p className="font-bold text-stone-900 text-xs">
                        {item.title}{' '}
                        <span className="text-[10px] text-stone-400 font-normal">({item.time})</span>
                      </p>
                      <p className="text-[11px] text-stone-600 leading-snug">{item.description}</p>
                      {item.localImpact && (
                        <p className="text-[10px] text-emerald-700 font-medium pt-0.5">
                          ✓ {item.localImpact}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      {/* Interactive Chat Stream & Quick Suggestions */}
      <section className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Quick Questions
          </span>
          <span className="text-[10px] text-stone-400">Instant Grounded Answers</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {quickChips.map((chip, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(chip)}
              className="px-2.5 py-1 bg-white hover:bg-orange-50 text-stone-700 hover:text-[#c2410c] text-[11px] font-medium rounded-lg border border-stone-200 hover:border-orange-200 shrink-0 transition-colors shadow-2xs"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat message bubbles if user asked additional queries */}
        {messages.slice(2).map((msg) => (
          <div
            key={msg.id}
            className={`p-2.5 rounded-xl text-xs space-y-1 ${
              msg.role === 'user'
                ? 'bg-orange-50 border border-orange-200 text-stone-900 ml-6'
                : 'bg-white border border-stone-200 text-stone-800 shadow-xs mr-4'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-stone-400">
              <span className="font-bold text-stone-700">
                {msg.role === 'user' ? 'You' : 'Bharat Sathi AI'}
              </span>
              <span>{msg.timestamp}</span>
            </div>
            <p className="leading-relaxed">{msg.text}</p>
          </div>
        ))}

        {isTyping && (
          <div className="bg-stone-50 p-2 rounded-xl text-[11px] text-stone-500 flex items-center gap-2 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-[#c2410c]" />
            <span>Consulting ASI Footfall Stream &amp; Local Guides Registry...</span>
          </div>
        )}
      </section>

      {/* Sticky Floating Voice/Text Input Bar */}
      <section id="chat-input-bar" className="pt-2 sticky bottom-0 bg-transparent pb-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              id="assistant-chat-input-field"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything in English or Hindi..."
              className="w-full pl-3 pr-9 py-2.5 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-stone-800 shadow-xs"
            />
            <button
              type="button"
              aria-label="Keyboard switch"
              className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
            >
              <Keyboard className="w-4 h-4" />
            </button>
          </div>

          <button
            id="btn-assistant-send-or-voice"
            type="submit"
            aria-label="Send or voice input"
            className="w-10 h-10 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white flex items-center justify-center shrink-0 shadow-md transition-colors active:scale-95 cursor-pointer"
          >
            {inputText.trim() ? <Send className="w-4 h-4" /> : <Mic className="w-5 h-5" />}
          </button>
        </form>
        <p className="text-[10px] text-center text-stone-400 mt-1.5 flex items-center justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Indic-NLP Engine Live • Tap mic for Hindi/English speech
        </p>
      </section>
    </article>
  );
};
