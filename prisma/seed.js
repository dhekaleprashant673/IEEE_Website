const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL is not set in environment variables');
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('Seeding database...');

  try {
    // 1. Clear existing data to avoid constraint/duplicate violations
    await prisma.user.deleteMany({});
    await prisma.feature.deleteMany({});
    await prisma.statistic.deleteMany({});
    await prisma.teamMember.deleteMany({});
    await prisma.galleryImage.deleteMany({});
    await prisma.contact.deleteMany({});
    await prisma.newsletterSubscriber.deleteMany({});

    console.log('Cleared existing tables.');

    // 2. Hash admin password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        name: 'Nexus Administrator',
        email: 'admin@nexus2026.com',
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log('Created admin user:', admin.email);

    // 3. Seed Features/Tracks
    const features = [
      {
        title: 'IoT & Smart Grids',
        description: 'Decentralized sensor systems, low-power networks, smart city interfaces, and automated real-time hardware telemetry.',
        icon: 'Network',
      },
      {
        title: 'Cloud & Edge Infrastructure',
        description: 'Next-generation hyper-scalable hosting, serverless computing grids, and latency-optimized edge processors.',
        icon: 'CloudLightning',
      },
      {
        title: 'Zero-Trust Cyber Security',
        description: 'Advanced data encryption layers, secure enclave processing, and cryptographically verified network handshake protocols.',
        icon: 'KeyRound',
      },
      {
        title: 'AI & Computational Vision',
        description: 'Autonomous neural network layers, deep learning, computer vision models, and natural language analytics.',
        icon: 'BrainCircuit',
      },
      {
        title: 'Quantum Grid Computing',
        description: 'Exploring quantum superposition logic gates, qubit coherence algorithms, and quantum-resistant network security.',
        icon: 'Atom',
      },
      {
        title: 'Sustainable Technology Grids',
        description: 'Carbon-neutral data center strategies, ecological energy grids, and green computing efficiency certifications.',
        icon: 'Leaf',
      },
    ];

    for (const feat of features) {
      await prisma.feature.create({ data: feat });
    }
    console.log(`Seeded ${features.length} technical tracks.`);

    // 4. Seed Statistics
    const stats = [
      { title: 'Research Papers Submitted', value: '480+' },
      { title: 'Global Keynote Speakers', value: '24+' },
      { title: 'Participating Countries', value: '35+' },
      { title: 'Registered Delegates', value: '1500+' },
    ];

    for (const stat of stats) {
      await prisma.statistic.create({ data: stat });
    }
    console.log(`Seeded ${stats.length} metrics.`);

    // 5. Seed Team/Committee Members
    const team = [
      {
        name: 'Dr. Elena Rostova',
        designation: 'General Chair',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        name: 'Prof. Marcus Vance',
        designation: 'Program Chair',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        name: 'Dr. Aisha Rahman',
        designation: 'Technical Committee Chair',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400',
        linkedin: 'https://linkedin.com',
      },
      {
        name: 'Prof. David Kim',
        designation: 'Organising Secretary',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    ];

    for (const mem of team) {
      await prisma.teamMember.create({ data: mem });
    }
    console.log(`Seeded ${team.length} committee members.`);

    // 6. Seed Gallery Images
    const gallery = [
      {
        title: 'General Keynote Presentation',
        category: 'Keynotes',
        imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Auditorium Venue Stage',
        category: 'Venue',
        imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'IoT Research Parallel Session',
        category: 'Sessions',
        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Delegates Networking Dinner',
        category: 'Sessions',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Panel Discussion on Cloud AI',
        category: 'Keynotes',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800',
      },
      {
        title: 'Exhibition Hall Exterior',
        category: 'Venue',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      },
    ];

    for (const img of gallery) {
      await prisma.galleryImage.create({ data: img });
    }
    console.log(`Seeded ${gallery.length} gallery images.`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
