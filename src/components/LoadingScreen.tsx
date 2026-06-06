'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600); // Allow exit animation to complete
          }, 400);
          return 100;
        }
        // Increment progress faster at first, then slower for a natural loading feel
        const diff = Math.random() * 15;
        return Math.min(prev + diff, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Letters for the text animation
  const titleLetters = "NEXUS 2026".split("");

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712]"
          exit={{ 
            y: '-100vh',
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className="absolute inset-0 bg-glow-purple opacity-30 pointer-events-none" />
          
          <div className="relative flex flex-col items-center max-w-xs w-full px-4">
            {/* Title text with staggered letters reveal */}
            <div className="flex space-x-1.5 mb-8 overflow-hidden text-2xl font-semibold tracking-[0.4em] text-white">
              {titleLetters.map((letter, idx) => (
                <motion.span
                  key={idx}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: idx * 0.08, 
                    ease: [0.215, 0.610, 0.355, 1.000] as const
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Percentage counter */}
            <motion.div 
              className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 tabular-nums"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {Math.floor(progress)}%
            </motion.div>

            {/* Outer Progress Bar */}
            <div className="relative h-[2px] w-full bg-gray-900 overflow-hidden rounded-full">
              {/* Inner progress fill */}
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
              />
            </div>

            <motion.p 
              className="text-xs text-gray-500 mt-3 font-mono tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing Experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
