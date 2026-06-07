'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function VenueFooter() {
  return (
    <div className="w-full">

      {/* ── Venue Banner ── */}
      <section
        className="relative w-full min-h-[220px] flex items-center overflow-hidden"
        style={{
          backgroundImage: "url('/college_building.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Blue/indigo overlay — matches the screenshot tone */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(29, 27, 123, 0.82) 0%, rgba(37, 82, 195, 0.70) 60%, rgba(29, 27, 123, 0.75) 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Heading */}
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-white flex-shrink-0" />
              <h2 className="text-white font-bold text-xl tracking-wide">
                Venue Location
              </h2>
            </div>

            {/* Divider */}
            <div className="w-48 h-px bg-white/40 mb-5" />

            {/* Address lines */}
            <div className="space-y-1 text-white/90 text-sm font-light leading-relaxed">
              <p>SKN Sinhgad College of Engineering, Korti, Pandharpur–413304</p>
              <p>State– Maharashtra</p>
              <p>Country– India</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Copyright Bar ── */}
      <div
        className="w-full py-4 px-6 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(20, 18, 100, 0.97)' }}
      >
        <p className="text-white/80 text-xs text-center leading-relaxed tracking-wide">
          Designed and Developed by Mr. Sandeep. G. Linge. All Rights Reserved by SKNSCOE, Pandharpur
        </p>
      </div>

    </div>
  );
}
