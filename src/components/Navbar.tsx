'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home',               href: '#home' },
  { label: 'Schedule',           href: '#schedule' },
  { label: 'Patrons',            href: '#patrons' },
  { label: 'Committees',         href: '#committees' },
  { label: 'Conference Topics',  href: '#topics' },
  { label: 'Publication',        href: '#publication' },
  { label: 'Call for Papers',    href: '#call-for-papers' },
  { label: 'Contact',            href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map(i => i.href.substring(1));
      let current = 'home';
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 150 && r.bottom >= 150) { current = s; break; }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.substring(1));
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#2823a0] shadow-lg py-2'
            : 'bg-transparent py-2'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-6 flex items-center gap-6">

          {/* NBA Logo */}
          <div className="flex-shrink-0 h-12 w-12 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 40 40" className="w-full h-full text-emerald-600">
              <defs>
                <path id="cp" d="M 20,4 A 16,16 0 1,1 20,36 A 16,16 0 1,1 20,4" />
              </defs>
              <circle cx="20" cy="20" r="19.5" stroke="currentColor" strokeWidth="1" fill="none" />
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '20px 20px' }}
              >
                <text fill="currentColor" fontSize="2.8" fontWeight="bold" fontFamily="sans-serif">
                  <textPath href="#cp" startOffset="0%">
                    NATIONAL BOARD OF ACCREDITATION • ACCREDITED BY •
                  </textPath>
                </text>
              </motion.g>
              <circle cx="20" cy="20" r="10.5" fill="currentColor" />
              <circle cx="20" cy="20" r="9"    fill="white" />
              <circle cx="20" cy="20" r="7.5"  fill="currentColor" />
              <text x="20" y="22.5" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="black" fontFamily="sans-serif">NBA</text>
            </svg>
          </div>

          {/* Desktop Nav — centered in the middle */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative flex flex-col items-center text-center leading-tight group"
                >
                  {item.label === 'Conference Topics' ? (
                    <>
                      <span className={`text-[13px] font-semibold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/85 group-hover:text-white'}`}>Conference</span>
                      <span className={`text-[13px] font-semibold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/85 group-hover:text-white'}`}>Topics</span>
                    </>
                  ) : item.label === 'Call for Papers' ? (
                    <>
                      <span className={`text-[13px] font-semibold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/85 group-hover:text-white'}`}>Call for</span>
                      <span className={`text-[13px] font-semibold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/85 group-hover:text-white'}`}>Papers</span>
                    </>
                  ) : (
                    <span className={`text-[13px] font-semibold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/85 group-hover:text-white'}`}>
                      {item.label}
                    </span>
                  )}

                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full"
                      layoutId="underline"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-35 bg-[#3d3aaa] flex flex-col justify-center px-8 lg:hidden"
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
