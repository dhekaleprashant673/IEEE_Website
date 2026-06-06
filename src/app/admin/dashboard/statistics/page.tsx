'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash, X, BarChart3, Loader2, Save } from 'lucide-react';

interface StatItem {
  id: string;
  title: string;
  value: string;
}

export default function StatisticsManager() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/statistics');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setValue('');
    setFormOpen(false);
  };

  const handleEdit = (st: StatItem) => {
    setEditingId(st.id);
    setTitle(st.title);
    setValue(st.value);
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !value) return;

    setSubmitting(true);
    const body = { title, value };

    try {
      const url = editingId ? `/api/statistics/${editingId}` : '/api/statistics';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        resetForm();
        loadStats();
      }
    } catch (err) {
      console.error('Error saving stat:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this statistic?')) return;

    try {
      const res = await fetch(`/api/statistics/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        loadStats();
      }
    } catch (err) {
      console.error('Error deleting stat:', err);
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Statistics</h1>
          <p className="text-sm text-gray-500 font-light mt-1">Manage numbers, count-ups, and metrics shown on the landing page</p>
        </div>

        {!formOpen && (
          <button
            onClick={() => setFormOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase bg-white text-black hover:bg-white/90 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Statistic</span>
          </button>
        )}
      </div>

      {/* Form Container */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass border border-white/5 space-y-6 max-w-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Statistic' : 'Create Statistic'}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Value input */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Display Value</label>
              <input
                type="text"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="p-3 text-sm glass-input font-mono"
                placeholder="e.g. 500+ or 98%"
              />
              <span className="text-[10px] text-gray-500 font-light">Can contain numbers, +, %, or letters (e.g. 15k).</span>
            </div>

            {/* Title input */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Metric Description</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 text-sm glass-input"
                placeholder="e.g. Keynote Attendees"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase bg-white text-black hover:bg-white/90 flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Metric</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Statistics List Grid */}
      {loading ? (
        <div className="h-64 w-full flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
          <span className="text-sm text-gray-500 font-mono">Loading metrics...</span>
        </div>
      ) : stats.length === 0 ? (
        <div className="p-10 rounded-2xl glass border border-white/5 text-center">
          <p className="text-gray-500 font-light">No statistics metrics found. Create one to display on the landing page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st) => (
            <div 
              key={st.id} 
              className="p-6 rounded-2xl glass border border-white/5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-gray-950 border border-white/5 rounded-xl text-primary">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-white block font-mono bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{st.value}</span>
                  <p className="text-xs text-gray-400 font-light mt-1.5">{st.title}</p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 border-t border-white/5 pt-4 mt-6">
                <button
                  onClick={() => handleEdit(st)}
                  className="p-2 rounded-lg bg-gray-950 border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Edit Metric"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(st.id)}
                  className="p-2 rounded-lg bg-gray-950 border border-white/5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete Metric"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
