/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { TabType, Language, CommunityTipSubmission } from './types';
import { TAJ_MAHAL_DETAIL, INITIAL_COMMUNITY_TIPS } from './data/mockData';
import { DesktopWrapper } from './components/DesktopWrapper';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ExploreScreen } from './components/ExploreScreen';
import { TwinsScreen } from './components/TwinsScreen';
import { AssistantScreen } from './components/AssistantScreen';
import { LocalHubScreen } from './components/LocalHubScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [language, setLanguage] = useState<Language>('EN');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hasSwappedTwin, setHasSwappedTwin] = useState<boolean>(false);
  const [communityTips, setCommunityTips] = useState<CommunityTipSubmission[]>(() => {
    const saved = localStorage.getItem('bharat_sathi_tips');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_COMMUNITY_TIPS;
      }
    }
    return INITIAL_COMMUNITY_TIPS;
  });

  const scrollContainerRef = useRef<HTMLElement>(null);

  const handleTabChange = (newTab: TabType) => {
    setActiveTab(newTab);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSwapTwin = () => {
    setHasSwappedTwin(true);
    // Automatically transition to Assistant to view the updated 3-day itinerary
    setTimeout(() => {
      handleTabChange('assistant');
    }, 600);
  };

  const handleUpvoteTip = (id: string) => {
    setCommunityTips((prev) => {
      const updated = prev.map((tip) => {
        if (tip.id === id) {
          const upvoted = !tip.userUpvoted;
          return {
            ...tip,
            upvotes: upvoted ? tip.upvotes + 1 : tip.upvotes - 1,
            userUpvoted: upvoted,
          };
        }
        return tip;
      });
      localStorage.setItem('bharat_sathi_tips', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmitTip = (
    newTipData: Omit<CommunityTipSubmission, 'id' | 'timestamp' | 'upvotes' | 'status'>
  ) => {
    const newTip: CommunityTipSubmission = {
      ...newTipData,
      id: `tip-${Date.now()}`,
      timestamp: 'Just now',
      upvotes: 1,
      status: 'unverified',
      userUpvoted: true,
    };
    const updated = [newTip, ...communityTips];
    setCommunityTips(updated);
    localStorage.setItem('bharat_sathi_tips', JSON.stringify(updated));
  };

  return (
    <DesktopWrapper activeTab={activeTab} onTabChange={handleTabChange}>
      {/* Sticky Mobile App Bar */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onLogoClick={() => handleTabChange('explore')}
      />

      {/* Screen Scroll Container */}
      <section
        ref={scrollContainerRef}
        id="screens-container"
        className="flex-1 overflow-y-auto relative no-scrollbar pb-20"
      >
        {activeTab === 'explore' && (
          <ExploreScreen
            onNavigateTab={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {activeTab === 'twins' && (
          <TwinsScreen
            monument={TAJ_MAHAL_DETAIL}
            onNavigateTab={handleTabChange}
            communityTips={communityTips}
            onUpvoteCommunityTip={handleUpvoteTip}
            onSwapTwin={handleSwapTwin}
            hasSwappedTwin={hasSwappedTwin}
          />
        )}

        {activeTab === 'assistant' && (
          <AssistantScreen
            onNavigateTab={handleTabChange}
            language={language}
            onLanguageChange={setLanguage}
            hasSwappedTwin={hasSwappedTwin}
          />
        )}

        {activeTab === 'hub' && (
          <LocalHubScreen
            onNavigateTab={handleTabChange}
            communityTips={communityTips}
            onSubmitTip={handleSubmitTip}
            onUpvoteTip={handleUpvoteTip}
          />
        )}
      </section>

      {/* Fixed Bottom Navigation Dock */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </DesktopWrapper>
  );
}
