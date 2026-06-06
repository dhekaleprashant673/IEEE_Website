'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Patrons', href: '#patrons' },
  { label: 'Committees', href: '#committees' },
  { label: 'Conference Topics', href: '#topics' },
  { label: 'Publication', href: '#publication' },
  { label: 'Call for Papers', href: '#call-for-papers' },
  { label: 'Download', href: '#download' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#1d1b7b] py-2.5 shadow-lg border-b border-white/10' 
            : 'bg-[#1d1b7b]/90 backdrop-blur-md py-4 border-b border-white/5'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Top Left Logos Group (Sinhgad & NBA Circular Seal) */}
          <div className="flex items-center space-x-3">
            {/* Logo 1: Sinhgad vertical emblem with red torch flame */}
            <div className="h-11 w-[38px] bg-white border border-[#b2bec3] rounded shadow-sm flex items-center justify-center p-0.5 overflow-hidden">
              <svg viewBox="0 0 32 40" fill="none" className="w-full h-full">
                <path d="M13 25 L19 25 L17 38 L15 38 Z" fill="#b2bec3" />
                <rect x="12" y="22" width="8" height="3" fill="#e17055" rx="0.5" />
                <path d="M9 16 L23 16 L21 22 L11 22 Z" fill="#0f2b5c" />
                <path d="M16 2 C16 2 22 9 20 15 C19 18 13 18 12 15 C11 11 16 2 16 2 Z" fill="#d63031" />
                <path d="M16 6 C16 6 19 11 18 14 C17.5 15.5 14.5 15.5 14 14 C13.5 12 16 6 16 6 Z" fill="#fdcb6e" />
              </svg>
            </div>
            
            {/* Logo 2: NBA green circular accreditation seal with spinning outer text */}
            <div className="h-11 w-11 bg-white border border-emerald-500 rounded-full shadow-sm flex items-center justify-center p-0.5 overflow-hidden relative">
              <svg viewBox="0 0 40 40" className="w-full h-full text-emerald-600">
                <defs>
                  {/* Clockwise circle path starting at 12 o'clock */}
                  <path
                    id="circlePath"
                    d="M 20,4 A 16,16 0 1,1 20,36 A 16,16 0 1,1 20,4"
                  />
                </defs>
                {/* Outer border */}
                <circle cx="20" cy="20" r="19.5" stroke="currentColor" strokeWidth="1" fill="none" />
                
                {/* Rotating text ring */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '20px 20px' }}
                >
                  <text fill="currentColor" fontSize="2.8" fontWeight="bold" fontFamily="sans-serif">
                    <textPath href="#circlePath" startOffset="0%">
                      NATIONAL BOARD OF ACCREDITATION • ACCREDITED BY •
                    </textPath>
                  </text>
                </motion.g>

                {/* Inner Circle (Middle) */}
                <circle cx="20" cy="20" r="10.5" fill="currentColor" />
                <circle cx="20" cy="20" r="9" fill="white" />
                <circle cx="20" cy="20" r="7.5" fill="currentColor" />
                <text x="20" y="22.5" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="black" fontFamily="sans-serif">
                  NBA
                </text>
              </svg>
            </div>
          </div>

          {/* Desktop Nav links (with vertical stacking for multi-word items, mixed-case styling) */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-[13px] font-semibold tracking-wide text-white/90 hover:text-white transition-colors duration-200 flex items-center min-h-[40px]"
              >
                {item.label === 'Conference Topics' ? (
                  <span className="flex flex-col items-start leading-none text-left">
                    <span>Conference</span>
                    <span className="mt-0.5">Topics</span>
                  </span>
                ) : item.label === 'Call for Papers' ? (
                  <span className="flex flex-col items-start leading-none text-left">
                    <span>Call for</span>
                    <span className="mt-0.5">Papers</span>
                  </span>
                ) : (
                  <span>{item.label}</span>
                )}

                {activeSection === item.href.substring(1) && (
                  <motion.span
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-white rounded-full"
                    layoutId="navbarUnderline"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-white/80 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-35 bg-[#0250c5] flex flex-col justify-center px-8 lg:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex flex-col space-y-5 text-center">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-lg font-semibold tracking-wide transition-colors ${
                    activeSection === item.href.substring(1)
                      ? 'text-white underline decoration-2 underline-offset-8'
                      : 'text-white/70 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
