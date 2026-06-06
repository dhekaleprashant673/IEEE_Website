'use client';

import { motion } from 'framer-motion';

interface PatronData {
  name: string;
  designation: string;
  organization: string;
  image: string;
}

const chiefPatrons: PatronData[] = [
  {
    name: 'Prof. M. N. Navale',
    designation: 'Founder, President',
    organization: 'Sinhgad Institutes',
    image: '/navale.png',
  },
  {
    name: 'Dr. Sunanda Navale',
    designation: 'Vice President (HR)',
    organization: 'Sinhgad Institutes',
    image: '/sunanda.png',
  },
  {
    name: 'Dr. Rohit M. Navale',
    designation: 'Vice President (HR)',
    organization: 'Sinhgad Institutes',
    image: '/rohit.png',
  },
  {
    name: 'Dr. Rachana Navale',
    designation: 'Vice President (Admin)',
    organization: 'Sinhgad Institutes',
    image: '/rachana.png',
  },
];

const patrons: PatronData[] = [
  {
    name: 'Dr. Laxmikant Dama',
    designation: 'Pro-Vice Chancellor',
    organization: 'Punyashlok Ahilyadevi Holkar Solapur University, Solapur',
    image: '/dama.png',
  },
  {
    name: 'Dr. Kailash J. Karande',
    designation: 'Principal, SKNSCOE',
    organization: 'Campus Director, Sinhgad Institute, Pandharpur',
    image: '/karande.png',
  },
];

export default function Patrons() {
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
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
    },
  };

  return (
    <section id="patrons" className="py-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ================= CHIEF PATRONS SECTION ================= */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Chief Patrons
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Chief Patrons Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {chiefPatrons.map((patron, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              variants={cardVariants}
            >
              {/* Photo Box */}
              <div className="w-full h-72 rounded-xl overflow-hidden mb-6 border border-gray-100 bg-gray-50">
                <img
                  src={patron.image}
                  alt={patron.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              
              {/* Info details */}
              <h3 className="text-xl font-bold text-[#0f2b5c] mb-1">{patron.name}</h3>
              <p className="text-sm font-semibold text-gray-500 mb-1">{patron.designation}</p>
              <p className="text-xs text-gray-400 font-light max-w-[200px] leading-relaxed">{patron.organization}</p>
            </motion.div>
          ))}
        </motion.div>


        {/* ================= PATRONS SECTION ================= */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Patrons
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Patrons Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {patrons.map((patron, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              variants={cardVariants}
            >
              {/* Photo Box - use object-contain so full head is visible, no cropping */}
              <div className="w-48 h-56 rounded-xl overflow-hidden mb-5 border border-gray-100 bg-gray-50 mx-auto">
                <img
                  src={patron.image}
                  alt={patron.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Info details - matching reference layout */}
              <h3 className="text-lg font-bold text-[#0f2b5c] mb-1">{patron.name}</h3>
              <p className="text-sm italic text-gray-600 mb-0.5">{patron.designation}</p>
              <p className="text-xs italic text-gray-500 font-light leading-relaxed max-w-[220px]">{patron.organization}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
