'use client';

import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, Award, History } from 'lucide-react';

export default function Publication() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    },
  };

  return (
    <section id="publication" className="py-24 bg-white text-gray-900 overflow-hidden border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Publication
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        <motion.div 
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Main SciTePress Card */}
          <motion.div 
            className="bg-white border-2 border-[#0250c5]/15 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0250c5]/5 rounded-full -mr-16 -mt-16" />
            
            <div className="flex items-start space-x-5 relative z-10">
              <div className="p-3 bg-[#0250c5]/10 rounded-xl text-[#0250c5] hidden sm:block">
                <Award className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-extrabold text-[#0f2b5c] mb-3 leading-snug">
                  Conference Proceedings Indexing
                </h3>
                <p className="text-gray-700 font-medium text-base mb-6">
                  All Accepted and Presented papers of <span className="text-[#0250c5] font-bold">ICICVT 2026</span> will be published by <span className="font-bold">SciTePress</span>.
                </p>

                {/* About SciTePress */}
                <div className="border-t border-gray-100 pt-6 mt-6">
                  <a 
                    href="https://www.scitepress.org/HomePage.aspx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#0250c5] hover:underline font-bold text-sm mb-4 group"
                  >
                    About SciTePress
                    <ExternalLink className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 font-light leading-relaxed">
                    <div className="space-y-3">
                      <p>
                        SciTePress publications are indexed by several abstracting and indexing organizations, including: <span className="font-semibold text-gray-800">SCOPUS, EI Engineering Index, Google Scholar, DBLP, Semantic Scholar, and Microsoft Academic</span>.
                      </p>
                      <p>
                        SciTePress is a publisher of scientific and technical publications, including: conference and workshop proceedings, tutorials, journals, e-books, and on-line courses.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p>
                        SciTePress publications are indexed by these organizations, but neither the publisher nor the organizations can guarantee indexing.
                      </p>
                      <p>
                        The SciTePress Digital Library is an open access repository that includes:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-500">
                        <li>Over 57,700 full text papers</li>
                        <li>Keyword-powered search</li>
                        <li>Search engine optimization for every paper</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Q1 Indexed Journal Box */}
                <div className="mt-8 p-5 bg-gradient-to-r from-[#0250c5]/5 to-transparent border-l-4 border-[#0250c5] rounded-r-xl">
                  <p className="text-sm text-gray-800 leading-relaxed font-semibold">
                    Selected and extended versions of articles will be considered for publication in a <span className="text-[#0250c5]">Scopus (Q1)</span> indexed journal upon payment of additional fees.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Previous Publication History */}
          <motion.div 
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gray-50 border border-gray-150 rounded-lg text-gray-600">
                <History className="w-5 h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-[#0f2b5c]">
                Previous Publication History
              </h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Computational Intelligence in Engineering Systems 2022',
                  publisher: 'AIP Conference Proceedings',
                },
                {
                  title: 'Intelligent Computing in Information Technology for Engineering System 2021',
                  publisher: 'CRC Taylor & Francis Group',
                },
                {
                  title: 'Artificial Intelligence, IoT and Smart Materials for Energy Applications 2021',
                  publisher: 'CRC Taylor & Francis Group',
                },
              ].map((pub, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start p-4 hover:bg-[#0250c5]/5 rounded-xl border border-transparent hover:border-[#0250c5]/10 transition-all duration-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0250c5] mr-3.5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0f2b5c] text-sm md:text-base leading-snug">
                      {pub.title}
                    </h4>
                    <p className="text-xs text-[#0250c5] font-semibold mt-1">
                      {pub.publisher}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
