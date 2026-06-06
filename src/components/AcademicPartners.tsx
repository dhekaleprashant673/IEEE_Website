'use client';

import { motion } from 'framer-motion';

interface Partner {
  name: string;
  location: string;
  abbreviation: string;
  logoColor: string;
  textColor: string;
}

const partners: Partner[] = [
  {
    name: 'University of Tarapaca',
    location: 'Arica, Chile',
    abbreviation: 'UTA',
    logoColor: 'bg-amber-500',
    textColor: 'text-amber-600',
  },
  {
    name: 'University of AGDER',
    location: 'Norway',
    abbreviation: 'UiA',
    logoColor: 'bg-red-500',
    textColor: 'text-red-600',
  },
  {
    name: 'KYUSHU SANGYO',
    location: 'University, Japan',
    abbreviation: 'KSU',
    logoColor: 'bg-emerald-600',
    textColor: 'text-emerald-600',
  },
  {
    name: 'PAH Solapur University, Solapur',
    location: 'India',
    abbreviation: 'PAHSU',
    logoColor: 'bg-teal-500',
    textColor: 'text-teal-600',
  },
];

const bottomPartners: Partner[] = [
  {
    name: 'Sinhgad Technical Education Society, Pune',
    location: 'India',
    abbreviation: 'STES',
    logoColor: 'bg-indigo-600',
    textColor: 'text-indigo-600',
  },
  {
    name: 'PAH Solapur University, Solapur',
    location: 'India',
    abbreviation: 'PAHSU',
    logoColor: 'bg-cyan-500',
    textColor: 'text-cyan-600',
  },
  {
    name: 'Pradhan Mantri Uchchatar Shiksha Abhiyan',
    location: 'India',
    abbreviation: 'PM-USHA',
    logoColor: 'bg-orange-500',
    textColor: 'text-orange-600',
  },
];

export default function AcademicPartners() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    },
  };

  return (
    <section id="partners" className="py-24 bg-white text-gray-900 overflow-hidden border-t border-gray-100">
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
            Academic Partners
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Top Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-6 flex flex-col items-center justify-between text-center min-h-[240px] transition-all duration-300 hover:scale-[1.02]"
              variants={cardVariants}
            >
              {/* Graphic Logo Placeholder */}
              <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm mb-4">
                <span className={`text-2xl font-extrabold tracking-wider ${partner.textColor}`}>
                  {partner.abbreviation}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 leading-tight mb-1">{partner.name}</h3>
                <p className="text-xs text-gray-400 font-light font-mono">{partner.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Grid (Centered 3 columns) */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {bottomPartners.map((partner, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-6 flex flex-col items-center justify-between text-center min-h-[240px] transition-all duration-300 hover:scale-[1.02]"
              variants={cardVariants}
            >
              {/* Graphic Logo Placeholder */}
              <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm mb-4">
                <span className={`text-2xl font-extrabold tracking-wider ${partner.textColor}`}>
                  {partner.abbreviation}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 leading-tight mb-1">{partner.name}</h3>
                <p className="text-xs text-gray-400 font-light font-mono">{partner.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
