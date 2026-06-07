'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate countdown to the conference date: December 12, 2025 (matching 00s in screenshot)
  useEffect(() => {
    const targetDate = new Date('2027-06-10T09:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center bg-[#1d1b7b] overflow-hidden pt-28 pb-20"
      style={{ borderRadius: '0 0 3rem 3rem' }}
    >
      {/* Background Campus Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url('/campus.png')`
        }}
      />

      {/* Single semi-transparent blue overlay — lets building show through */}
      <div className="absolute inset-0 z-1 pointer-events-none" style={{ background: 'rgba(40, 35, 160, 0.55)' }} />

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center mt-12">
        
        {/* ================= COUNTDOWN TIMER GRID ================= */}
        <div className="grid grid-cols-4 gap-4 md:gap-12 max-w-lg w-full mb-10">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-extrabold text-[#ff1e1e] font-sans leading-none select-none drop-shadow">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm font-bold text-[#ff1e1e] mt-3 uppercase tracking-wider">Days</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-extrabold text-[#ffd700] font-sans leading-none select-none drop-shadow">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm font-bold text-[#ffd700] mt-3 uppercase tracking-wider">Hours</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-extrabold text-[#00e5ff] font-sans leading-none select-none drop-shadow">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm font-bold text-[#00e5ff] mt-3 uppercase tracking-wider">Minutes</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-extrabold text-[#7eff14] font-sans leading-none select-none drop-shadow">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm font-bold text-[#7eff14] mt-3 uppercase tracking-wider">Seconds</span>
          </div>
        </div>

        {/* Date Tag */}
        <motion.h3
          className="text-base md:text-xl font-bold tracking-wider text-white mb-3 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          10<sup>TH</sup> &amp; 11<sup>TH</sup> JUNE 2027
        </motion.h3>

        {/* Main Title Heading */}
        <motion.h1
          className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 uppercase tracking-wide leading-snug max-w-4xl text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          1st International Conference on Innovations in Engineering Technologies and Sciences for Sustainable Development (ICIETSS-2027)
        </motion.h1>

        {/* In Association Tag */}
        <motion.p
          className="text-sm md:text-base text-white/95 font-medium max-w-3xl mb-3 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          In association with Punyashlok Ahilyadevi Holkar Solapur University, Solapur
        </motion.p>

        {/* Deadline Tag with struck out dates */}
        <motion.p
          className="text-xs md:text-sm font-bold text-white mb-10 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Full Paper Submission Deadline:{' '}
          <span>1st March 2027</span>
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-row items-center justify-center space-x-5 w-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a
            href="#contact"
            className="px-8 py-3 rounded-full text-xs md:text-sm font-bold text-white bg-[#0250c5] hover:bg-[#0250c5]/90 transition-all duration-300 shadow-md cursor-pointer select-none"
          >
            Register Now
          </a>
          <a
            href="https://www.sknscoe.ac.in/About-us.php"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full text-xs md:text-sm font-bold text-[#0250c5] bg-white hover:bg-gray-100 transition-all duration-300 shadow-md cursor-pointer select-none"
          >
            About Institute
          </a>
        </motion.div>

      </div>
    </section>
  );
}
