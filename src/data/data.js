
// [JAVASCRIPT DATA] /src/data/treks.js
export const seasonsData = [
  { id: 's1', season: 'Spring', slug: 'spring', description: 'Blooming rhododendrons and perfect trekking weather.', imageUrl: '/images/spring.jpg' },
  { id: 's2', season: 'Autumn', slug: 'autumn', description: 'Clear skies and stunning mountain visibility.', imageUrl: '/images/autumn.jpg' },
  { id: 's3', season: 'Summer', slug: 'summer', description: 'Lush green landscapes and monsoon adventures.', imageUrl: '/images/summer.jpg' },
  { id: 's4', season: 'Winter', slug: 'winter', description: 'Snow-capped peaks and cozy cultural experiences.', imageUrl: '/images/winter.jpg' },
];
// Add to /src/data/treks.js
export const localsData = [
  { id: 1, name: 'Tenzing Sherpa', specialty: 'Everest Region Expert', imageUrl: '/images/local1.jpg' },
  { id: 2, name: 'Maya Gurung', specialty: 'Cultural Tours & Homestays', imageUrl: '/images/local2.jpg' },
  { id: 3, name: 'Rajesh Thapa', specialty: 'Annapurna Circuit Guide', imageUrl: '/images/local3.jpg' },
];

// Replace the old plannerNavData in /src/data/treks.js
export const plannerNavData = [
  { id: 1, title: 'Lodging', href: '/lodging', imageUrl: '/images/nav-lodging.jpg' },
  { id: 2, title: 'Bus Booking', href: '/bus-booking', imageUrl: '/images/nav-bus.jpg' },
  { id: 3, title: 'Local Experiences', href: '/locals', imageUrl: '/images/nav-local.jpg' },
  { id: 4, title: 'Events', href: '/events', imageUrl: '/images/nav-events.jpg' },
];

export const promoData = [
  { id: 1, title: 'YOUR NEPAL TRAVEL GUIDE', description: 'Everything you need to plan your adventure.', linkText: '→ Get the Guide', imageUrl: '/images/promo1.jpg', href: '#' },
  { id: 2, title: 'CULTURAL EVENTS THIS WEEK', description: 'Live Music, Local Feasts, Art & More', linkText: '→ Check It Out', imageUrl: '/images/promo2.jpg', href: '#' },
];