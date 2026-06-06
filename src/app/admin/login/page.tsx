'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.replace('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      console.error('Login submit error:', err);
      setError('Network connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030712] relative overflow-hidden px-4">
      {/* decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-glow-purple opacity-20 pointer-events-none rounded-full blur-[110px]" />

      {/* Floating Back Link */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center space-x-2 text-xs font-mono text-gray-500 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Website</span>
      </Link>

      <motion.div
        className="w-full max-w-md p-8 rounded-2xl glass relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Title */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono tracking-[0.25em] text-primary uppercase block mb-2">Security Portal</span>
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Console</h1>
          <p className="text-xs text-gray-500 mt-2">Sign in to manage conference content and submissions</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email input */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 text-sm glass-input"
                placeholder="admin@nexus2026.com"
                disabled={loading}
              />
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="password" className="text-xs font-mono text-gray-400 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 text-sm glass-input"
                placeholder="••••••••"
                disabled={loading}
              />
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* Error Feedbacks */}
          {error && (
            <motion.div
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center space-x-2 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Login Action Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-semibold tracking-wider uppercase text-black bg-white hover:bg-transparent hover:text-white border border-white flex items-center justify-center space-x-2 transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authorizing...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
