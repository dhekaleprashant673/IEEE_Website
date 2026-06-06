'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9" fill="currentColor" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setMessage('Successfully subscribed to newsletters!');
      } else {
        const data = await res.json();
        setMessage(data.error || 'Failed to subscribe.');
        setStatus('error');
      }
    } catch (err) {
      console.error('Newsletter subscribe error:', err);
      setMessage('Network error, please try again.');
      setStatus('error');
    }
  };

  return (
    <footer className="bg-[#02050e] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* decorative ambient glow */}
      <div className="absolute left-1/3 bottom-0 w-[30rem] h-[15rem] bg-glow-purple opacity-15 pointer-events-none rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Col 1: About logo */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-[0.2em] text-white">
                NEXUS<span className="text-primary font-light">2026</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 font-light leading-relaxed max-w-sm">
              International Conference on Next-Generation Technologies, Intelligent Computing and Secure Systems. Hosted in collaboration with leading technical universities.
            </p>
            {/* Social Handles */}
            <div className="flex space-x-4 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-secondary transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-400 transition-colors">
                <YouTubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white">Conference</h4>
            <div className="flex flex-col space-y-2 text-sm text-gray-500">
              <a href="#about" className="hover:text-white transition-colors">About Info</a>
              <a href="#features" className="hover:text-white transition-colors">Track Areas</a>
              <a href="#timeline" className="hover:text-white transition-colors">Key Dates</a>
              <a href="#gallery" className="hover:text-white transition-colors">Gallery Photos</a>
              <a href="#team" className="hover:text-white transition-colors">Committee</a>
            </div>
          </div>

          {/* Col 3: Information & Resources */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white">Resources</h4>
            <div className="flex flex-col space-y-2 text-sm text-gray-500">
              <Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
              <a href="#contact" className="hover:text-white transition-colors">Registrations</a>
              <a href="#" className="hover:text-white transition-colors">Paper Template</a>
              <a href="#" className="hover:text-white transition-colors">Copyright Form</a>
            </div>
          </div>

          {/* Col 4: Newsletter Subscriber Form */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white">Subscribe to Newsletters</h4>
            <p className="text-sm text-gray-500 font-light max-w-sm">
              Sign up to receive acceptance alerts, keynote announcements, and registration vouchers.
            </p>
            <form onSubmit={handleSubscribe} className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full p-3 pr-12 text-sm glass-input rounded-xl"
                disabled={status === 'submitting'}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-white text-black hover:bg-primary hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                disabled={status === 'submitting'}
                aria-label="Subscribe"
              >
                {status === 'submitting' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>

            {/* Newsletter feedback messages */}
            {status === 'success' && (
              <motion.span 
                className="text-xs text-emerald-400 flex items-center mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                {message}
              </motion.span>
            )}

            {status === 'error' && (
              <motion.span 
                className="text-xs text-red-400 flex items-center mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {message}
              </motion.span>
            )}
          </div>
        </div>

        <div className="h-px bg-white/5 mb-8" />

        {/* Row 2: Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-light">
          <span>&copy; 2026 NEXUS Tech Conference. All Rights Reserved.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
