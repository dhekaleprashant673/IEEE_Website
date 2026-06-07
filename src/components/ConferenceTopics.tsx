'use client';

import { motion } from 'framer-motion';

interface Track {
  number: string;
  department: string;
  title: string;
  subtopics: string[];
  color: string;
}

const tracks: Track[] = [
  {
    number: '01',
    department: 'Electrical Engineering',
    title: 'Sustainable Energy Systems and Smart Grids',
    subtopics: [
      'Renewable Energy Technologies',
      'Smart Grids and Microgrids',
      'Energy Storage Systems',
      'Power Electronics and Energy Management',
    ],
    color: '#0250c5',
  },
  {
    number: '02',
    department: 'Electrical Engineering / Electronics Engineering',
    title: 'Electric Mobility and Intelligent Automation',
    subtopics: [
      'Electric Vehicle Technologies',
      'Battery Management Systems',
      'Autonomous Transportation Systems',
      'Intelligent Control and Automation',
    ],
    color: '#006db3',
  },
  {
    number: '03',
    department: 'Electronics & Telecommunication Engineering',
    title: 'Electronics, Communication, and IoT Systems',
    subtopics: [
      'Low-Power VLSI and Embedded Systems',
      'Wireless and 6G Communications',
      'Internet of Things (IoT)',
      'Signal and Sensor Technologies',
    ],
    color: '#0083b0',
  },
  {
    number: '04',
    department: 'Computer Science & Engineering / Information Technology',
    title: 'Artificial Intelligence and Computing Technologies',
    subtopics: [
      'Artificial Intelligence and Machine Learning',
      'Data Science and Big Data Analytics',
      'Cloud and Edge Computing',
      'Sustainable Computing Technologies',
    ],
    color: '#0097a7',
  },
  {
    number: '05',
    department: 'Computer Science & Engineering / Electronics Engineering',
    title: 'Cybersecurity and Cyber-Physical Systems',
    subtopics: [
      'Cybersecurity and Information Assurance',
      'Blockchain Technologies',
      'Industrial Internet of Things (IIoT)',
      'Cyber-Physical Systems',
    ],
    color: '#00838f',
  },
  {
    number: '06',
    department: 'Applied Sciences / Biomedical Engineering',
    title: 'Advanced Materials, Applied Sciences, and Healthcare Technologies',
    subtopics: [
      'Advanced Materials and Nanotechnology',
      'Green Chemistry and Sustainable Materials',
      'Biosensors & Medical Instrumentation',
      'Health Informatics and Medical Diagnostics',
    ],
    color: '#00695c',
  },
  {
    number: '07',
    department: 'Mechanical Engineering',
    title: 'Intelligent Design and Smart Manufacturing for Sustainable Industry',
    subtopics: [
      'Sustainable Manufacturing and Industry 5.0 Technologies',
      'Intelligent Design, Product Development, and Optimization',
      'CAD, CAM, CAE',
      'Thermal Engineering, Heat Transfer, and Fluid Engineering',
      'Additive Manufacturing and Advanced Manufacturing Processes',
      'Robotics and Automation Systems',
      'AI and Machine Learning Applications in Mechanical Systems',
    ],
    color: '#4e6c0b',
  },
  {
    number: '08',
    department: 'Civil Engineering / Environmental Engineering / Multidisciplinary',
    title: 'Smart Cities, Environment, and Sustainable Development',
    subtopics: [
      'Smart City Technologies',
      'Water and Waste Management',
      'Environmental Monitoring and Remote Sensing',
      'Engineering Education and Sustainable Development Goals (SDGs)',
    ],
    color: '#6a4c00',
  },
];

export default function ConferenceTopics() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="topics" className="py-24 bg-[#f4f7fc] text-gray-900 overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.p
            className="text-[#0250c5] text-xs font-mono font-bold tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Call for Contributions
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Conference Tracks
          </motion.h2>
          <motion.div
            className="w-20 h-1.5 bg-[#0250c5] rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          />
          <motion.p
            className="text-gray-500 max-w-2xl text-base leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            ICSEET 2026 features eight focused tracks spanning the breadth of modern engineering and applied sciences.
            Authors are invited to submit original research aligned with any of the following tracks.
          </motion.p>
        </div>

        {/* Tracks Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 flex flex-col border border-gray-100 hover:-translate-y-1"
              variants={cardVariants}
              style={{ '--track-color': track.color } as React.CSSProperties}
            >
              {/* Colored top bar */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: track.color }}
              />

              <div className="p-6 flex flex-col flex-grow">
                {/* Track number badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      color: track.color,
                      backgroundColor: `${track.color}15`,
                    }}
                  >
                    TRACK {track.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[#0f2b5c] font-extrabold text-base leading-snug mb-2 tracking-tight">
                  {track.title}
                </h3>

                {/* Department */}
                <p
                  className="text-xs font-semibold mb-5 leading-snug"
                  style={{ color: track.color }}
                >
                  {track.department}
                </p>

                {/* Divider */}
                <div className="w-8 h-px bg-gray-200 mb-4" />

                {/* Sub-topics */}
                <ul className="space-y-2 text-sm text-gray-600 font-light flex-grow">
                  {track.subtopics.map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: track.color }}
                      />
                      <span className="leading-snug">{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-gray-400 text-xs mt-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          * Topics are indicative. Papers covering related areas within the scope of each track are also welcome.
        </motion.p>

      </div>
    </section>
  );
}
