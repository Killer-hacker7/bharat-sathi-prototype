export type TabType = 'explore' | 'twins' | 'assistant' | 'hub';

export type Language = 'EN' | 'HI' | 'HINGLISH';

export type Category = 'Monuments' | 'Craft Villages' | 'Homestays' | 'Cuisine Walks';

export interface SwapPair {
  id: string;
  crowdedName: string;
  crowdedTag: string;
  crowdedWait: string;
  crowdedImage?: string;
  twinId: string;
  twinName: string;
  twinSubtitle: string;
  crowdDiff: string;
  detourTime: string;
  impactNote: string;
  timeSaved: string;
  twinImage?: string;
  city: string;
}

export interface MonumentDetail {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  statusText: string;
  waitTime: string;
  officialTicketPrice: number;
  officialTicketLink?: string;
  photos: {
    title: string;
    url: string;
    caption: string;
  }[];
  criticalAlert: {
    title: string;
    description: string;
  };
  twin: {
    id: string;
    name: string;
    nickname: string;
    matchPercent: number;
    address: string;
    crowdLess: string;
    distanceTime: string;
    transportCost: string;
    bulletPoints: string[];
    historicalGrounding: string;
    guide: {
      initials: string;
      name: string;
      role: string;
      rate: string;
      whatsappPhone: string;
    };
  };
  safetySnapshot: {
    crowd: string;
    crowdDetail: string;
    guideContact: string;
    guideContactDetail: string;
    soloWomen: string;
    soloWomenDetail: string;
    emergency: string;
    emergencyDetail: string;
    helpline: string;
  };
  knowBeforeYouGo: {
    id: string;
    type: 'scam' | 'unspoken_rule' | 'fair_price' | 'community';
    title: string;
    tag?: string;
    text: string;
    source: string;
    upvotes: number;
    userUpvoted?: boolean;
  }[];
  closureAlert: {
    title: string;
    content: string;
  };
  prohibitedItems: {
    title: string;
    content: string;
  };
}

export interface PlanItem {
  id: string;
  time: string;
  title: string;
  description: string;
  tagColor: 'terracotta' | 'emerald' | 'indigo' | 'amber';
  crowdLevel: string;
  localImpact?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  dayTitle: string;
  queueTotal: string;
  items: PlanItem[];
}

export interface CommunityTipSubmission {
  id: string;
  homeCity: string;
  mistakeAdvice: string;
  twinDetourTitle: string;
  twinDetourDesc: string;
  authenticFoodArtisan: string;
  whatsappNumber?: string;
  timestamp: string;
  upvotes: number;
  status: 'unverified' | 'verified';
  userUpvoted?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  language?: Language;
  plan?: ItineraryDay[];
  timestamp: string;
  isStreaming?: boolean;
}
