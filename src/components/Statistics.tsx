'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

interface StatItem {
  id?: string;
  title: string;
  value: string;
}

const fallbackStats: StatItem[] = [
  { title: 'Research Papers Submitted', value: '480+' },
  { title: 'Global Keynote Speakers', value: '24+' },
  { title: 'Participating Countries', value: '35+' },
  { title: 'Registered Delegates', value: '1500+' },
];

function parseValue(valueStr: string) {
  const numericPart = parseInt(valueStr.replace(/[^\d]/g, ''), 10) || 0;
  const suffix = valueStr.replace(/[\d]/g, '');
  return { numericPart, suffix };
}

function StatCounter({ valueStr }: { valueStr: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { numericPart, suffix } = parseValue(valueStr);
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return Math.floor(latest).toLocaleString() + suffix;
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, numericPart, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      });
      return controls.stop;
    }
  }, [inView, count, numericPart]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Statistics() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/statistics');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setStats(data);
          } else {
            setStats(fallbackStats);
          }
        } else {
          setStats(fallbackStats);
        }
      } catch (err) {
        console.error('Error loading stats:', err);
        setStats(fallbackStats);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <section className="relative py-20 bg-[#030712] overflow-hidden">
      {/* Grid mask overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              className="flex flex-col items-center text-center p-6 rounded-2xl glass border border-white/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Number value */}
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-mono tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                <StatCounter valueStr={stat.value} />
              </div>
              
              {/* Title description */}
              <p className="text-xs md:text-sm text-gray-400 font-light max-w-[180px]">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
