'use client';

import { motion } from 'framer-motion';
import { Download as DownloadIcon, FileText } from 'lucide-react';

export default function Download() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    },
  };

  return (
    <section id="download" className="py-24 bg-white text-gray-900 overflow-hidden border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Download
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Templates List */}
        <div className="flex justify-center">
          <motion.div 
            className="w-full max-w-xl bg-white border-2 border-[#0250c5]/15 hover:border-[#0250c5]/30 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between sm:items-center space-y-4 sm:space-y-0"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-4">
              <div className="p-3 bg-[#0250c5]/10 rounded-xl text-[#0250c5] mb-2 sm:mb-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#0f2b5c] text-lg mb-1">
                  SciTePress Lecture Notes Template
                </h3>
                <p className="text-gray-500 text-xs font-light">
                  Required formatting for draft and camera-ready paper submissions.
                </p>
              </div>
            </div>
            
            <a 
              href="#"
              className="inline-flex items-center px-6 py-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-white bg-[#0250c5] hover:bg-[#0250c5]/90 transition-all shadow-md group cursor-pointer"
            >
              <DownloadIcon className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
              Download ZIP
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
