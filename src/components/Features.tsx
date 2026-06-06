'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface FeatureItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
}

const fallbackFeatures: FeatureItem[] = [
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

export default function Features() {
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatures() {
      try {
        const res = await fetch('/api/features');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setFeatures(data);
          } else {
            setFeatures(fallbackFeatures);
          }
        } else {
          setFeatures(fallbackFeatures);
        }
      } catch (err) {
        console.error('Error loading features:', err);
        setFeatures(fallbackFeatures);
      } finally {
        setLoading(false);
      }
    }
    loadFeatures();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] as const }
    },
  };

  return (
    <section id="features" className="relative py-24 bg-[#030712]/50 overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-glow-purple opacity-10 pointer-events-none rounded-full blur-[130px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            className="text-xs font-mono tracking-[0.3em] text-secondary uppercase mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Technical Tracks
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Conference Scope & Focus
          </motion.h2>
          <motion.div 
            className="w-12 h-1 bg-gradient-to-r from-secondary to-primary rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature, index) => {
            // Dynamically resolve icon from Lucide library
            const iconName = feature.icon as keyof typeof LucideIcons;
            const Icon = (LucideIcons[iconName] as any) || LucideIcons.HelpCircle;

            return (
              <motion.div
                key={feature.id || index}
                className="group relative p-8 rounded-2xl glass-card flex flex-col items-start overflow-hidden"
                variants={cardVariants}
              >
                {/* Neon glow hover gradient inside card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                
                {/* Dynamic Icon */}
                <div className="relative mb-6 p-4 rounded-2xl bg-gray-950 border border-white/5 group-hover:border-secondary/30 text-secondary group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Tracking Code/Badge */}
                <span className="mt-auto text-[10px] font-mono uppercase text-gray-600 tracking-wider">
                  Track {String(index + 1).padStart(2, '0')}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
