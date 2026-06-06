'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Conference
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Split Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Photo Column */}
          <motion.div 
            className="lg:col-span-5 w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50 group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/about-conference.png"
              alt="SKN Sinhgad College of Engineering Conference"
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>

          {/* Right Description Column */}
          <motion.div 
            className="lg:col-span-7 flex flex-col space-y-6 text-sm md:text-base text-gray-700 leading-relaxed font-light"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p>
              The <strong>International Conference on Innovations in Engineering Technologies and Sciences for Sustainable Development (ICIETSSD)</strong> serves as a premier global platform for researchers, academicians, industry professionals, and policymakers. The event fosters the exchange of cutting-edge research, innovative ideas, and practical challenges encountered in the fields of engineering, technology, and applied sciences.
            </p>
            <p>
              With a core focus on <strong>Sustainable Development</strong>, the conference highlights technological advancements that balance industrial progress with environmental preservation. Attendees will explore interdisciplinary solutions across electrical, electronics, computer science, mechanical engineering, and general sciences to address global challenges like climate change, resource scarcity, and energy efficiency.
            </p>
            <p className="border-t border-gray-100 pt-6 font-semibold text-[#0f2b5c] text-base">
              All registered and presented papers that meet IEEE quality standards will be submitted for inclusion into <strong>IEEE Xplore</strong>.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
