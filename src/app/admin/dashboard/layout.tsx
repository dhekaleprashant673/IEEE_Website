'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Cpu, 
  BarChart3, 
  Users, 
  Image as ImageIcon, 
  Mail, 
  Newspaper, 
  LogOut, 
  Loader2,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

interface SidebarItem {
  label: string;
  href: string;
  icon: any;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Tracks / Features', href: '/admin/dashboard/features', icon: Cpu },
  { label: 'Statistics', href: '/admin/dashboard/statistics', icon: BarChart3 },
  { label: 'Committee / Team', href: '/admin/dashboard/team', icon: Users },
  { label: 'Gallery', href: '/admin/dashboard/gallery', icon: ImageIcon },
  { label: 'Contact Messages', href: '/admin/dashboard/contacts', icon: Mail },
  { label: 'Newsletter Subs', href: '/admin/dashboard/newsletter', icon: Newspaper },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setAdminUser(data.user);
          setLoading(false);
        } else {
          router.replace('/admin/login');
        }
      } catch (err) {
        console.error('Check auth error:', err);
        router.replace('/admin/login');
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.replace('/admin/login');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#030712] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
        <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">Loading Dashboard Session</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02050e] text-gray-100 flex flex-col md:flex-row">
      {/* Mobile Top Navbar Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-950 border-b border-white/5">
        <span className="text-sm font-bold tracking-[0.2em] text-white">
          NEXUS<span className="text-primary">DASH</span>
        </span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gray-950/70 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col justify-between
        transform transition-transform duration-300 md:relative md:transform-none md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col space-y-8">
          {/* Logo Branding */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-lg font-bold tracking-[0.2em] text-white">
              NEXUS<span className="text-primary">DASH</span>
            </span>
          </div>

          {/* Admin Tag */}
          <div className="p-4 rounded-xl bg-gray-900 border border-white/5 text-xs">
            <span className="text-gray-500 font-mono block">Logged In As:</span>
            <span className="font-semibold text-white block truncate mt-1">{adminUser?.name || 'Administrator'}</span>
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono text-[9px] uppercase">
              {adminUser?.role}
            </span>
          </div>

          {/* Sidebar Nav Links list */}
          <nav className="flex flex-col space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-black font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sign Out Hook Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all w-full mt-6"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content Area Panel */}
      <main className="flex-1 min-h-[calc(100vh-60px)] md:min-h-screen overflow-y-auto p-6 md:p-10 relative">
        {/* Glow point */}
        <div className="absolute right-0 top-0 w-[30rem] h-[30rem] bg-glow-purple opacity-10 pointer-events-none rounded-full blur-[100px]" />
        
        {children}
      </main>
    </div>
  );
}
