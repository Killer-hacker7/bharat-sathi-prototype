import { MonumentDetail, SwapPair, ItineraryDay, CommunityTipSubmission } from '../types';

export const INITIAL_SWAP_PAIRS: SwapPair[] = [
  {
    id: 'taj-to-baby-taj',
    crowdedName: 'Taj Mahal',
    crowdedTag: 'High Footfall (2.5hr wait)',
    crowdedWait: '2.5h wait',
    crowdedImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&auto=format&fit=crop&q=80',
    twinId: 'tomb-of-itimad-ud-daulah',
    twinName: "Tomb of I'timād-ud-Daulah",
    twinSubtitle: '"Baby Taj" • 85% Less Crowds',
    crowdDiff: '85% Less Crowds',
    detourTime: '20 min detour • Riverside serene garden',
    impactNote: 'Verified by Uttar Pradesh Tourism Board',
    timeSaved: 'Save 110 mins',
    twinImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&auto=format&fit=crop&q=80',
    city: 'Agra, UP'
  },
  {
    id: 'amber-to-panna-meena',
    crowdedName: 'Amber Palace, Jaipur',
    crowdedTag: 'Peak Bottleneck (Surge)',
    crowdedWait: '1.5h queue',
    crowdedImage: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=300&auto=format&fit=crop&q=80',
    twinId: 'panna-meena-ka-kund',
    twinName: 'Panna Meena Ka Kund',
    twinSubtitle: 'Geometric Stepwell • Artisan Weavers',
    crowdDiff: 'Zero Line',
    detourTime: '8 min walk from fort • ₹0 surge',
    impactNote: 'Supports 4 Local Block-Print Families',
    timeSaved: 'Zero Line',
    twinImage: 'https://images.unsplash.com/photo-1609947017136-9e22987483ba?w=300&auto=format&fit=crop&q=80',
    city: 'Jaipur, Rajasthan'
  },
  {
    id: 'red-fort-to-sunder-nursery',
    crowdedName: 'Red Fort, Delhi',
    crowdedTag: 'High Density (1.5hr queue)',
    crowdedWait: '1.5h queue',
    crowdedImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&auto=format&fit=crop&q=80',
    twinId: 'sunder-nursery',
    twinName: 'Sunder Nursery & Humayun Baoli',
    twinSubtitle: 'Mughal Heritage Park • 90-acre Forest',
    crowdDiff: '90% Less Crowded',
    detourTime: '15 min metro • Open green pavilions',
    impactNote: 'Aga Khan Trust Heritage Conservation',
    timeSaved: 'Save 75 mins',
    twinImage: 'https://images.unsplash.com/photo-1622303584852-7360216bbf6a?w=300&auto=format&fit=crop&q=80',
    city: 'New Delhi'
  }
];

export const TAJ_MAHAL_DETAIL: MonumentDetail = {
  id: 'taj-mahal',
  name: 'Taj Mahal, Agra',
  city: 'Agra',
  state: 'Uttar Pradesh',
  address: 'Dharmapuri, Forest Colony, Agra, Uttar Pradesh',
  statusText: 'High Footfall',
  waitTime: '2.5 hours',
  officialTicketPrice: 50,
  officialTicketLink: 'https://asi.nic.in',
  photos: [
    {
      title: 'Central Reflecting Pool',
      caption: 'Main Waterway at Sunrise',
      url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'Pietra Dura Inlay Art',
      caption: 'Ivory Marble Floral Inlay',
      url: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=600&auto=format&fit=crop&q=80'
    }
  ],
  criticalAlert: {
    title: 'Overcrowding Alert: High Footfall Site',
    description: 'Current wait time at ticket counter: 2.5 hours. High humidity & tight bottlenecks at Western Gate.'
  },
  twin: {
    id: 'tomb-of-itimad-ud-daulah',
    name: "Tomb of I'timād-ud-Daulah",
    nickname: 'Baby Taj',
    matchPercent: 98.4,
    address: 'Aligarh Road, Yamuna River Bank, Agra',
    crowdLess: '82% Fewer Crowds',
    distanceTime: '40 mins away',
    transportCost: 'Auto-rickshaw / Cab ₹120',
    bulletPoints: [
      'Precursor to Taj Mahal featuring exquisite marble inlay and lattice screens.',
      'Serene riverside gardens on the Yamuna with peaceful viewing platforms.'
    ],
    historicalGrounding:
      'Commissioned by Empress Nur Jahan, this was the very first Mughal mausoleum built entirely from white Rajasthani marble (not red sandstone). You witness identical craftsmanship without rush, noise, or pushy solicitation.',
    guide: {
      initials: 'SJ',
      name: 'Suresh Ji (Heritage Guide)',
      role: 'Local Resident • Fair ₹400/hr',
      rate: '₹400/hr',
      whatsappPhone: '+919876543210'
    }
  },
  safetySnapshot: {
    crowd: 'Crowd Footfall: Peak Congestion',
    crowdDetail: 'Extreme surges during daily sunrise (05:30 - 08:30) and sunset slots. Pickpocket risk across turnstiles.',
    guideContact: 'Verified Local Contact Present',
    guideContactDetail: 'Badge-carrying Ministry of Tourism guides stationed officially at Gates 1 & 2. Do not accept guides without physical photo lanyards.',
    soloWomen: 'Solo & Women Travelers Guidance',
    soloWomenDetail: 'Well-lit secure pedestrian walkways open and patrolled until 7:30 PM. Always utilize the official government prepaid auto booth located 50m outside Gate 2.',
    emergency: 'Emergency & Assistance Hubs',
    emergencyDetail: 'UP Tourist Police Kiosk situated 120m from East Gate.',
    helpline: '1363'
  },
  knowBeforeYouGo: [
    {
      id: 'scam-shoe-bootie',
      type: 'scam',
      title: 'Scam Warning',
      tag: 'Flag',
      text: '"Laminated \'shoe bootie\' chargers charging ₹100 outside: their poly official shoe covers are included inside with your ASI ticket. Do not hand over cash to unsolicited vendors."',
      source: 'Verified by 3 moderators',
      upvotes: 42
    },
    {
      id: 'rule-photography',
      type: 'unspoken_rule',
      title: 'Unspoken Rule',
      tag: 'Dispute',
      text: '"Photography prohibited inside the main crypt containing the cenotaphs. Brief glance permitted in single file; security guards will escort loud visitors outside."',
      source: 'Ground rule strictly enforced',
      upvotes: 28
    },
    {
      id: 'fair-rickshaw-rate',
      type: 'fair_price',
      title: 'Fair Price Guide',
      tag: 'Regulated Transit',
      text: '"Govt battery rickshaws from the parking area to monument ticket gate is fixed at ₹10 per seat. Reject private cart pullers asking for ₹150+."',
      source: 'Rate sheet at parking ticket counter',
      upvotes: 59
    }
  ],
  closureAlert: {
    title: 'Hours & Friday Closure Alert',
    content: 'Taj Mahal is completely CLOSED on Fridays for prayers. Open 30 minutes before sunrise to 30 minutes before sunset on other days.'
  },
  prohibitedItems: {
    title: 'Prohibited Items & Locker Facility',
    content: 'No tripods, external power banks, snacks, chewing gum, or lighters permitted inside. Free ASI lockers available at East Gate Cloakroom.'
  }
};

export const INITIAL_ITINERARY_DAYS: ItineraryDay[] = [
  {
    dayNumber: 1,
    dayTitle: 'Agra Off-beat Heritage',
    queueTotal: '~15m total',
    items: [
      {
        id: 'day1-mehtab',
        time: '06:00 AM',
        title: 'Morning: Mehtab Bagh Dawn View',
        description: 'Riverbank sunrise perspective of Taj Mahal; bypasses the 2.5-hour main gate queue entirely.',
        tagColor: 'terracotta',
        crowdLevel: 'Low (Sunrise serenity)',
        localImpact: 'Protects fragile marble from footfall friction'
      },
      {
        id: 'day1-baby-taj',
        time: '10:30 AM',
        title: "Midday: Tomb of I'timād-ud-Daulah",
        description: 'Intricate ivory marble with lush shaded Persian garden walks. 0 wait time.',
        tagColor: 'emerald',
        crowdLevel: 'Zero queue entry',
        localImpact: 'Direct ticket revenue to local ASI conservation fund'
      },
      {
        id: 'day1-kachhpura',
        time: '04:30 PM',
        title: 'Evening: Kachhpura Artisan Heritage Walk',
        description: "Community tea with Sanjhi art craftsmen; direct payment to women's self-help group.",
        tagColor: 'indigo',
        crowdLevel: 'Authentic village setting',
        localImpact: '100% fair trade direct artisan remuneration'
      }
    ]
  },
  {
    dayNumber: 2,
    dayTitle: 'Fatehpur Sikri Countryside & Stepwells',
    queueTotal: '~20m total',
    items: [
      {
        id: 'day2-sikri-dawn',
        time: '07:30 AM',
        title: 'Morning: Birbal Bhawan & Zanana Courtyard',
        description: 'Early morning acoustic pavilions before standard tour bus convoys arrive at 10:30 AM.',
        tagColor: 'terracotta',
        crowdLevel: 'Low morning breeze',
        localImpact: 'Guided by hereditary Fatehpur Sikri oral historian'
      },
      {
        id: 'day2-abhaneri',
        time: '02:00 PM',
        title: 'Afternoon: Chand Baori Stepwell, Abhaneri',
        description: '3,500 narrow steps spanning 13 stories. 90% fewer tourists than Jaipur Amber fort.',
        tagColor: 'emerald',
        crowdLevel: 'Peaceful architectural marvel',
        localImpact: 'Village panchayat eco-tourism pass'
      }
    ]
  },
  {
    dayNumber: 3,
    dayTitle: 'Jaipur Living Crafts & Courtyards',
    queueTotal: '~10m total',
    items: [
      {
        id: 'day3-panna-meena',
        time: '08:00 AM',
        title: 'Morning: Panna Meena Ka Kund Stepwell',
        description: 'Serene geometric symmetrical stepwell just 8 minutes from congested Amber Palace.',
        tagColor: 'emerald',
        crowdLevel: 'Zero line entry',
        localImpact: 'Local block print masters workshop visit'
      },
      {
        id: 'day3-anokhi',
        time: '11:30 AM',
        title: 'Midday: Anokhi Museum of Hand Printing',
        description: 'Restored haveli showcasing heritage woodblock carvers and natural indigo vats.',
        tagColor: 'indigo',
        crowdLevel: 'Calm indoor gallery',
        localImpact: 'Sustains 40+ rural textile master artisans'
      },
      {
        id: 'day3-nahargarh-secret',
        time: '05:30 PM',
        title: 'Sunset: Charan Mandir Ridge Walk',
        description: 'Aravalli hilltop panorama bypassing the overcrowded Nahargarh stepwell cafe crowd.',
        tagColor: 'terracotta',
        crowdLevel: 'Tranquil sunset vista',
        localImpact: 'Zero commercial hawkers zone'
      }
    ]
  }
];

export const INITIAL_COMMUNITY_TIPS: CommunityTipSubmission[] = [
  {
    id: 'tip-1',
    homeCity: 'Agra, Uttar Pradesh',
    mistakeAdvice: "Never buy 'marble' souvenirs near the main Western Gate—it is cheap soapstone coated with chalk. Visit the hereditary artisan cooperative in Taj Ganj for authentic inlay.",
    twinDetourTitle: 'Chini Ka Rauza & Kachhpura village walk',
    twinDetourDesc: 'Peaceful Yamuna river bank vantage point with zero bus tour crowds. Overlooks the backside of monument corridors with active craft.',
    authenticFoodArtisan: "Master Weaver Abdul's loom & Bhimsen Baati",
    whatsappNumber: '+919876543210',
    timestamp: '2 hours ago',
    upvotes: 42,
    status: 'verified'
  },
  {
    id: 'tip-2',
    homeCity: 'Jaipur, Rajasthan',
    mistakeAdvice: 'Do not pay ₹500 for auto drivers promising "secret Hawa Mahal photo rooftop". The street-level terrace cafes like Wind View charge only ₹80 for ginger chai with direct views.',
    twinDetourTitle: 'Gatore Ki Chhatriyan',
    twinDetourDesc: 'Marble cenotaphs of Kachwaha rulers tucked under Nahargarh hill. Zero rush, breathtaking stone lattice work.',
    authenticFoodArtisan: 'Mahaveer Rabdi Bhandar, Kishanpole Bazar',
    whatsappNumber: '+919414002341',
    timestamp: 'Yesterday',
    upvotes: 68,
    status: 'verified'
  },
  {
    id: 'tip-3',
    homeCity: 'Delhi, NCR',
    mistakeAdvice: 'Touts near Qutub Minar claim Chand Minar is closed today. The ticket kiosk accepts QR scan directly and includes Mehrauli park grounds.',
    twinDetourTitle: 'Jamali Kamali & Balban Tomb inside Archaeological Park',
    twinDetourDesc: '5-minute shaded walk across the road into lush pine groves with 1,000 years of Sultanate architecture and zero entry queues.',
    authenticFoodArtisan: 'Ustad Moinuddin Kebabs, Lal Kuan',
    whatsappNumber: '+919811234901',
    timestamp: '3 days ago',
    upvotes: 35,
    status: 'verified'
  }
];
