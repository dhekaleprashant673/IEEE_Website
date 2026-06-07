const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

async function main() {
  // Initialize Firebase Admin
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  let app;

  if (serviceAccountPath) {
    const resolvedPath = path.resolve(serviceAccountPath);
    if (fs.existsSync(resolvedPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
      app = initializeApp({ credential: cert(serviceAccount) });
    } else {
      console.error(`Service account file not found at: ${resolvedPath}`);
      process.exit(1);
    }
  } else {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    if (!projectId) {
      console.error('Set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_PROJECT_ID in .env');
      process.exit(1);
    }
    app = initializeApp({ projectId });
  }

  const db = getFirestore(app);

  console.log('Seeding Firestore database...');

  try {
    // 1. Clear existing data
    const collections = [
      'users', 'features', 'statistics',
      'team_members', 'gallery_images',
      'contacts', 'newsletter_subscribers',
    ];

    for (const col of collections) {
      const snapshot = await db.collection(col).get();
      if (!snapshot.empty) {
        const batch = db.batch();
        snapshot.docs.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
        console.log(`  Cleared ${snapshot.size} docs from '${col}'`);
      }
    }
    console.log('Cleared existing collections.');

    // 2. Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminRef = await db.collection('users').add({
      name: 'Nexus Administrator',
      email: 'admin@nexus2026.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    });
    console.log('Created admin user:', 'admin@nexus2026.com', '(id:', adminRef.id, ')');

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
      await db.collection('features').add({ ...feat, createdAt: new Date() });
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
      await db.collection('statistics').add({ ...stat, createdAt: new Date() });
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
      await db.collection('team_members').add({ ...mem, createdAt: new Date() });
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
      await db.collection('gallery_images').add({ ...img, createdAt: new Date() });
    }
    console.log(`Seeded ${gallery.length} gallery images.`);

    console.log('\n✅ Firestore database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main();
