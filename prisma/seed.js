// [NODE.JS BACKEND LOGIC] /prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// We copy our trek data here for the seed script
const treksData = [
  { id: 1, title: 'Everest Base Camp', duration: 14, difficulty: 'Challenging', description: 'The classic trek to the foot of the world\'s highest mountain.' },
  { id: 2, title: 'Poon Hill', duration: 5, difficulty: 'Easy', description: 'A short and scenic trek with stunning sunrise views of the Annapurnas.' },
  { id: 3, title: 'Annapurna Circuit', duration: 18, difficulty: 'Hard', description: 'A legendary trek circling the Annapurna massif, offering diverse landscapes.' },
  { id: 4, title: 'Manaslu Circuit', duration: 16, difficulty: 'Hard', description: 'A remote and challenging trek around the world\'s eighth highest mountain.' },
  { id: 5, title: 'Gokyo Lakes', duration: 12, difficulty: 'Challenging', description: 'A beautiful alternative to the EBC trek, featuring stunning turquoise lakes.' },
  { id: 6, title: 'Langtang Valley', duration: 8, difficulty: 'Medium', description: 'An accessible trek through beautiful valleys and Tamang villages.' },
];

const storiesData = [
  { id: 1, title: 'A Trek Through the Khumbu Valley', author: 'Jane Doe', imageUrl: '/images/story1.jpg' },
  { id: 2, title: 'The Living Goddesses of Kathmandu', author: 'John Smith', imageUrl: '/images/story2.jpg' },
  { id: 3, title: 'Monsoon Adventures: A Different Kind of Beauty', author: 'Emily White', imageUrl: '/images/story3.jpg' },
];

const lodgingsData = [
  { name: 'Mountain View Inn', description: 'Cozy inn with stunning peak views.', imageUrl: '/images/lodging1.jpg', area: 'Pokhara Lakeside' },
  { name: 'Riverside Cabins', description: 'Rustic cabins by the serene river.', imageUrl: '/images/lodging2.jpg', area: 'Pokhara Lakeside' },
  { name: 'Himalayan Grand Hotel', description: 'Luxury accommodation with premium amenities.', imageUrl: '/images/lodging3.jpg', area: 'Kathmandu Valley' },
];


async function main() {
  console.log(`Start seeding ...`);
  for (const trek of treksData) {
    // We use 'create' to add a new record to the 'Trek' table
    await prisma.trek.create({
      data: {
        title: trek.title,
        duration: trek.duration,
        difficulty: trek.difficulty,
        description: trek.description,
      },
    });
}

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