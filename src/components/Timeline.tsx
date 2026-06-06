'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, FileText, CheckCircle2, FileCheck, PartyPopper } from 'lucide-react';

interface Milestone {
  icon: any;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
}

const milestones: Milestone[] = [
  {
    icon: FileText,
    date: 'July 01, 2026',
    title: 'Call for Papers Opens',
    description: 'Authors are invited to submit complete drafts detailing original theoretical or practice-based contributions.',
    status: 'completed',
  },
  {
    icon: Calendar,
    date: 'September 15, 2026',
    title: 'Submission Deadline',
    description: 'Ensure papers conform to templates and upload drafts before midnight GMT.',
    status: 'active',
  },
  {
    icon: CheckCircle2,
    date: 'October 30, 2026',
    title: 'Acceptance Notifications',
    description: 'Peer reviews conclude and acceptance emails are sent out to selected delegates.',
    status: 'upcoming',
  },
  {
    icon: FileCheck,
    date: 'November 15, 2026',
    title: 'Camera-Ready Paper Due',
    description: 'Submit finalised manuscript versions and complete early-bird author registration.',
    status: 'upcoming',
  },
  {
    icon: PartyPopper,
    date: 'December 15-17, 2026',
    title: 'Conference Days',
    description: 'Presentation tracks, keynote addresses, and interactive hybrid networking events commence.',
    status: 'upcoming',
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position inside the timeline component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Smooth scrollProgress value using spring mechanics
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="timeline" className="relative py-24 bg-[#030712] overflow-hidden" ref={containerRef}>
      {/* ambient glows */}
      <div className="absolute left-1/4 top-1/4 w-[35rem] h-[35rem] bg-glow-purple opacity-20 pointer-events-none rounded-full blur-[110px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
            className="text-xs font-mono tracking-[0.3em] text-primary uppercase mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Important Dates
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Milestone Timeline
          </motion.h2>
          <motion.div 
            className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Timeline wrapper */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Line Background */}
          <div className="absolute left-[31px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gray-900" />
          
          {/* Animated Colored Vertical Line on scroll */}
          <motion.div 
            className="absolute left-[31px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-purple-500 to-secondary origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } relative`}
                >
                  {/* Left / Right Content Card */}
                  <div className="w-full md:w-1/2 pl-[80px] md:pl-0 md:px-12">
                    <motion.div
                      className={`p-6 rounded-2xl glass-card relative ${
                        milestone.status === 'active' 
                          ? 'border-secondary/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                          : milestone.status === 'completed'
                          ? 'border-primary/20'
                          : 'border-white/5'
                      }`}
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      {/* Arrow indicator for card pointing to center node */}
                      <div className={`hidden md:block absolute top-6 w-3 h-3 rotate-45 bg-[#0b0f19] border-t border-l border-white/5 ${
                        isEven ? '-left-1.5 border-r-0 border-b-0 rotate-[-45deg]' : '-right-1.5 border-l-0 border-t-0 rotate-[135deg]'
                      }`} />

                      <span className="text-xs font-mono font-semibold text-secondary uppercase mb-2 block">
                        {milestone.date}
                      </span>
                      
                      <h3 className="text-xl font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Icon Node */}
                  <motion.div 
                    className={`absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 z-10 flex items-center justify-center w-[64px] h-[64px] rounded-full border ${
                      milestone.status === 'active'
                        ? 'bg-[#030712] border-secondary text-secondary shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                        : milestone.status === 'completed'
                        ? 'bg-primary border-primary text-black'
                        : 'bg-[#030712] border-gray-800 text-gray-500'
                    }`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  {/* Empty Spacer Column for layout mapping */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
