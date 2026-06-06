'use client';

import { useEffect, useState } from 'react';
import { Newspaper, Trash, Copy, Check, Loader2, Calendar } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export default function NewsletterManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter');
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
      }
    } catch (err) {
      console.error('Error loading subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return;

    try {
      const res = await fetch(`/api/newsletter?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        loadSubscribers();
      }
    } catch (err) {
      console.error('Error deleting subscriber:', err);
    }
  };

  const handleCopyAll = () => {
    if (subscribers.length === 0) return;
    const emails = subscribers.map((sub) => sub.email).join(', ');
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 relative z-10 max-w-4xl">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Newsletter Subscribers</h1>
          <p className="text-sm text-gray-500 font-light mt-1">Monitor mailing lists and export email directories</p>
        </div>

        {subscribers.length > 0 && (
          <button
            onClick={handleCopyAll}
            className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase bg-white text-black hover:bg-white/90 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy All Emails</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Subscribers Table List */}
      <div className="p-6 rounded-2xl glass border border-white/5 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Newspaper className="w-5 h-5 text-primary" />
          <span>Active Subscribers ({subscribers.length})</span>
        </h2>

        {loading ? (
          <div className="h-64 w-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
            <span className="text-sm text-gray-500 font-mono">Loading subscribers...</span>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 font-light text-sm">No email subscribers found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-gray-300">
              <thead>
                <tr className="border-b border-white/5 font-mono text-xs text-gray-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-normal">Subscriber Email</th>
                  <th className="py-3.5 px-4 font-normal">Subscribed Date</th>
                  <th className="py-3.5 px-4 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-medium text-white">{sub.email}</td>
                    <td className="py-4 px-4 font-mono text-xs text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-2 rounded-lg bg-gray-950 border border-white/5 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Remove Subscriber"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
