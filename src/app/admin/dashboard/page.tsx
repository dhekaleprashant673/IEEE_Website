'use client';

import { useEffect, useState } from 'react';
import { 
  Cpu, 
  BarChart3, 
  Users, 
  Image as ImageIcon, 
  Mail, 
  Newspaper,
  ArrowRight,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  features: number;
  statistics: number;
  team: number;
  gallery: number;
  contacts: number;
  subscribers: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Fetch stats counts in parallel
        const [featuresRes, statsRes, teamRes, galleryRes, contactsRes, subsRes] = await Promise.all([
          fetch('/api/features'),
          fetch('/api/statistics'),
          fetch('/api/team'),
          fetch('/api/gallery'),
          fetch('/api/contacts'),
          fetch('/api/newsletter'),
        ]);

        const features = await featuresRes.json();
        const statistics = await statsRes.json();
        const team = await teamRes.json();
        const gallery = await galleryRes.json();
        const contacts = await contactsRes.json();
        const subscribers = await subsRes.json();

        setStats({
          features: Array.isArray(features) ? features.length : 0,
          statistics: Array.isArray(statistics) ? statistics.length : 0,
          team: Array.isArray(team) ? team.length : 0,
          gallery: Array.isArray(gallery) ? gallery.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
          subscribers: Array.isArray(subscribers) ? subscribers.length : 0,
        });

        if (Array.isArray(contacts)) {
          setRecentContacts(contacts.slice(0, 3));
        }
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-96 w-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
        <span className="text-sm text-gray-500 font-mono">Fetching database metrics...</span>
      </div>
    );
  }

  const statCards = [
    { label: 'Technical Tracks', value: stats?.features || 0, icon: Cpu, href: '/admin/dashboard/features', color: 'text-cyan-400' },
    { label: 'Active Stats', value: stats?.statistics || 0, icon: BarChart3, href: '/admin/dashboard/statistics', color: 'text-purple-400' },
    { label: 'Committee Members', value: stats?.team || 0, icon: Users, href: '/admin/dashboard/team', color: 'text-emerald-400' },
    { label: 'Gallery Images', value: stats?.gallery || 0, icon: ImageIcon, href: '/admin/dashboard/gallery', color: 'text-rose-400' },
    { label: 'Inquiries Received', value: stats?.contacts || 0, icon: Mail, href: '/admin/dashboard/contacts', color: 'text-blue-400' },
    { label: 'Newsletter Subscribers', value: stats?.subscribers || 0, icon: Newspaper, href: '/admin/dashboard/newsletter', color: 'text-orange-400' },
  ];

  return (
    <div className="space-y-10 relative z-10">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Overview</h1>
        <p className="text-sm text-gray-500 font-light mt-1">Live metrics and recent submissions across your platform</p>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link 
              key={card.label} 
              href={card.href}
              className="p-6 rounded-2xl glass-card relative group flex items-start justify-between"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block">{card.label}</span>
                <span className="text-3xl font-bold text-white block font-mono">{card.value}</span>
              </div>
              <div className={`p-3 rounded-xl bg-gray-950 border border-white/5 group-hover:border-primary/20 ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Recent Message submissions column */}
        <div className="lg:col-span-7 p-6 rounded-2xl glass border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Inquiries</h2>
            <Link 
              href="/admin/dashboard/contacts" 
              className="text-xs font-mono text-gray-400 hover:text-white flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentContacts.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6 font-light">No inquiries received yet.</p>
            ) : (
              recentContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className="p-4 rounded-xl bg-gray-950/40 border border-white/5 flex flex-col space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{contact.name}</span>
                    <span className="text-gray-500 font-mono">{new Date(contact.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className="text-xs font-mono text-primary truncate block">{contact.subject}</span>
                  <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                    {contact.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick links shortcuts card */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass border border-white/5 space-y-6">
          <h2 className="text-lg font-bold text-white">Quick Tasks</h2>
          <div className="flex flex-col space-y-3">
            <Link 
              href="/admin/dashboard/features" 
              className="p-3.5 rounded-xl bg-gray-950/60 border border-white/5 hover:border-secondary/30 text-xs font-mono flex items-center justify-between text-gray-400 hover:text-white transition-all"
            >
              <span>Add Technical Track</span>
              <ArrowRight className="w-4 h-4 text-secondary" />
            </Link>
            <Link 
              href="/admin/dashboard/team" 
              className="p-3.5 rounded-xl bg-gray-950/60 border border-white/5 hover:border-primary/30 text-xs font-mono flex items-center justify-between text-gray-400 hover:text-white transition-all"
            >
              <span>Add Committee Member</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
            <Link 
              href="/admin/dashboard/gallery" 
              className="p-3.5 rounded-xl bg-gray-950/60 border border-white/5 hover:border-rose-300/30 text-xs font-mono flex items-center justify-between text-gray-400 hover:text-white transition-all"
            >
              <span>Upload Gallery Image</span>
              <ArrowRight className="w-4 h-4 text-rose-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
