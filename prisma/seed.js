// [NODE.JS BACKEND LOGIC] /prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// We copy our trek data here for the seed script
const guidesData = [
  {
    name: 'Rinzi Sherpa',
    location: 'Kathmandu',
    bio: 'Your friendly guide to the hidden temples and vibrant markets of the city.',
    imageUrl: '/images/guide1.jpg',
    specialty: 'City & History Tours',
    type: 'PROFESSIONAL'
  },
  {
    name: 'Sonam Tamang',
    location: 'Pokhara',
    bio: 'Let me show you the best views of the Annapurnas and the most peaceful spots by the lake.',
    imageUrl: '/images/guide2.jpg',
    specialty: 'Trekking & Nature',
    type: 'PROFESSIONAL'
  },
  {
    name: 'Anjali Gurung',
    location: 'Chitwan',
    bio: 'Passionate about wildlife and conservation. I’ll help you spot rhinos and tigers!',
    imageUrl: '/images/guide3.jpg',
    specialty: 'Wildlife Safari',
    type: 'PROFESSIONAL'
  },
];

const storiesData = [
  { id: 1, title: 'A Trek Through the Khumbu Valley', author: 'Jane Doe', imageUrl: '/images/story1.jpg' },
  { id: 2, title: 'The Living Goddesses of Kathmandu', author: 'John Smith', imageUrl: '/images/story2.jpg' },
  { id: 3, title: 'Monsoon Adventures: A Different Kind of Beauty', author: 'Emily White', imageUrl: '/images/story3.jpg' },
];

const lodgingsData = [
  // --- KATHMANDU (from Bagmati Province) ---
  { 
    name: 'Kathmandu Marriott Hotel', 
    description: 'A modern, 5-star hotel in the city center, near Thamel.', 
    imageUrl: '/images/marriottHotel.avif', 
    area: 'Kathmandu' // Matches your "Kathmandu" destination
  },
  { 
    name: 'Dwarika\'s Hotel', 
    description: 'A unique heritage hotel featuring extensive Nepali woodwork.', 
    imageUrl: '/images/dwarikasHotel.webp', 
    area: 'Kathmandu' 
  },
  
  // --- POKHARA (covers all 13 Pokhara attractions) ---
  { 
    name: 'Hotel Pokhara Grande', 
    description: 'Luxury hotel with a pool and stunning Annapurna mountain views.', 
    imageUrl: '/images/pokharaGrande.jpg', 
    area: 'Pokhara' // This will link to Phewa, Davis Falls, etc.
  },
  { 
    name: 'Temple Tree Resort & Spa', 
    description: 'A beautiful boutique resort in the heart of Lakeside.', 
    imageUrl: '/images/templeTreeResort.jpeg', 
    area: 'Pokhara' 
  },

  // --- BARDIA (from Lumbini Province) ---
  { 
    name: 'Bardia Tiger Resort', 
    description: 'A jungle lodge offering safaris and nature walks near the park.', 
    imageUrl: '/images/bardiaTigerResort.jpg', 
    area: 'Bardia National Park' // Matches your destination
  },

  // --- TANSEN (from Lumbini Province) ---
  { 
    name: 'Horizon Homestay', 
    description: 'A cozy homestay with a local Newari family in Tansen.', 
    imageUrl: '/images/horizonHomestay.jpg', 
    area: 'Tansen' // Matches your "Tansen" destination
  },

  // --- JANAKPUR (from Madhesh Province) ---
  { 
    name: 'Hotel Sita Sharan', 
    description: 'A comfortable hotel very close to the Janaki Mandir.', 
    imageUrl: '/images/hotelSitaSharan.jpg', 
    area: 'Janakpur' // Matches your "Janakpur" destination
  },

  // --- ILAM (covers Kanyam, Antu Danda, etc.) ---
  { 
    name: 'Green View Tea Resort', 
    description: 'Stay amidst the beautiful tea gardens of Kanyam.', 
    imageUrl: '/images/hotelGreenView.jpg', 
    area: 'Ilam' // This will link to Kanyam, Antu Danda...
  },

  // --- GORKHA (covers Gorkha Durbar, Manakamana) ---
  { 
    name: 'Gorkha Gaun Resort', 
    description: 'Hilltop resort with stunning views of Manaslu and Gorkha Durbar.', 
    imageUrl: '/images/gorkhaGaunResort.jpg', 
    area: 'Gorkha' // This will link to Gorkha Durbar, Manakamana
  },

  // --- BANDIPUR (from Gandaki Province) ---
  { 
    name: 'The Old Inn', 
    description: 'A restored Newari mansion on the main street of Bandipur.', 
    imageUrl: '/images/theOldInn.jpg', 
    area: 'Bandipur' // Matches your "Bandipur" destination
  },

  // --- UPPER MUSTANG (from Gandaki Province) ---
  { 
    name: 'Royal Mustang Resort', 
    description: 'A quality guesthouse in the ancient walled city of Lo Manthang.', 
    imageUrl: '/images/royalMustangResort.jpg', 
    area: 'Upper Mustang' // Matches your "Upper Mustang" destination
  },

  // --- RARA LAKE (from Karnali Province) ---
  { 
    name: 'Danphe Lodge', 
    description: 'A simple, rustic lodge on the pristine shores of Rara Lake.', 
    imageUrl: '/images/dapheLodge.jpg', 
    area: 'Rara Lake' // Matches your "Rara Lake" destination
  }
];


async function main() {
  console.log(`Start seeding ...`);
  // Add this new loop for stories
  for (const story of storiesData) {
    await prisma.story.create({
      data: {
        title: story.title,
        author: story.author,
        imageUrl: story.imageUrl,
      }
    });
  }

  for (const lodging of lodgingsData) {
    await prisma.lodging.create({
      data: lodging,
    });
  }

  // ADD THIS NEW LOOP
  for (const guide of guidesData) {
    await prisma.localGuide.create({
      data: guide,
    });
  }
  console.log(`Seeding finished.`);
}



main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });