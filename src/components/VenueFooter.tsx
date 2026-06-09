'use client';

import { motion } from 'framer-motion';

export default function VenueFooter() {
  return (
    <div className="w-full">

      {/* ── Venue Banner ── */}
      <section
        className="relative w-full min-h-[220px] flex items-center overflow-hidden"
        style={{
          backgroundImage: "url('/campus.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Same blue overlay as Hero section */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(40, 35, 160, 0.55)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-10 py-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Heading */}
            <h2 className="text-white font-bold text-xl tracking-wide mb-3">
              Venue Location
            </h2>

            {/* Address lines */}
            <div className="space-y-0.5 text-white/90 text-sm font-light leading-relaxed">
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
        style={{ backgroundColor: '#1a1870' }}
      >
        <p className="text-white/85 text-xs text-center leading-relaxed tracking-wide">
          Designed and Developed by Mr. Sandeep. G. Linge. All Rights Reserved by SKNSCOE, Pandharpur
        </p>
      </div>

    </div>
  );
}
