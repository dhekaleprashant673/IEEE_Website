'use client';

import { motion } from 'framer-motion';

interface TopicCard {
  letter: string;
  title: string;
  items: string[];
}

const topics: TopicCard[] = [
  {
    letter: 'A',
    title: 'ARTIFICIAL INTELLIGENCE',
    items: [
      'Evolutionary Computing',
      'Deep Learning',
      'Natural Language Processing',
      'Adaptive Automation in Engineering using Intelligence',
      'Safe Computing',
      'Cyber Intelligence',
      'High Performance Computing',
      'Social network Analysis',
      'Neural Networks',
    ],
  },
  {
    letter: 'B',
    title: 'MACHINE VISION',
    items: [
      'Augmented Reality',
      'Virtual Reality',
      'Image Processing',
      'Medical Diagnosis',
      'Human Computer Interaction',
      'Machine to Machine Interaction',
      'Machine Learning in Data Management',
      'Machine Learning in VLSI and Architecture Design',
    ],
  },
  {
    letter: 'C',
    title: 'INTELLIGENT COMPUTING TECHNOLOGIES',
    items: [
      'Human Centric Computing',
      'Best Comfortable Seat',
      'Distributed Computing',
      'Cloud Computing',
      'Block chain and server less Computing',
      'Bio informatics and Bio inspired computing',
    ],
  },
  {
    letter: 'D',
    title: 'OPTIMIZED COMPUTATIONAL INTELLIGENCE',
    items: [
      'Optimization in Speed and Memory using Multimodular Structure',
      'Real time Signal Acquisition and Filtering with Sensor Modules',
      'Data Distribution & measurement using Advanced Cloud platforms',
      'Electronic up gradation using Smart Device Sensor Networks',
    ],
  },
  {
    letter: 'E',
    title: 'DISCRETE MATHEMATICAL SCIENCES AND CRYPTOGRAPHY',
    items: [
      'Discrete Mathematics',
      'Applied Discrete Mathematics',
      'Combinatorics',
      'Discrete Structures',
      'Networks',
      'Applied Algebra',
      'Cryptography',
      'Crypt Analysis',
      'Elliptic Curves',
      'Information Security',
    ],
  },
];

export default function ConferenceTopics() {
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
      transition: { duration: 0.5, ease: 'easeOut' as const }
    },
  };

  return (
    <section id="topics" className="py-24 bg-white text-gray-900 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Conference Topics
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Topics Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              className="bg-white border-2 border-[#0250c5]/20 hover:border-[#0250c5]/40 rounded-2xl p-8 shadow-sm hover:shadow-lg flex flex-col transition-all duration-300 min-h-[350px]"
              variants={cardVariants}
            >
              {/* Header */}
              <div className="mb-6">
                <span className="text-[#0250c5] text-xs font-mono font-bold tracking-widest block uppercase mb-1.5">
                  Topic {topic.letter}
                </span>
                <h3 className="text-[#0f2b5c] font-extrabold text-lg tracking-tight leading-snug">
                  {topic.title}
                </h3>
              </div>

              {/* Items List */}
              <ul className="space-y-2.5 text-sm text-gray-600 font-light flex-grow">
                {topic.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#0250c5] mr-2 flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0250c5]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
