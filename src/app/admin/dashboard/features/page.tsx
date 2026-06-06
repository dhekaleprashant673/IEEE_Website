'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash, X, Cpu, Loader2, Save } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const presetIcons = ['Network', 'CloudLightning', 'KeyRound', 'BrainCircuit', 'Atom', 'Leaf', 'Cpu', 'Database', 'FileText', 'Users', 'Calendar', 'ShieldAlert'];

export default function FeaturesManager() {
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Cpu');
  
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/features');
      if (res.ok) {
        const data = await res.json();
        setFeatures(data);
      }
    } catch (err) {
      console.error('Error loading features:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setIcon('Cpu');
    setFormOpen(false);
  };

  const handleEdit = (feat: FeatureItem) => {
    setEditingId(feat.id);
    setTitle(feat.title);
    setDescription(feat.description);
    setIcon(feat.icon);
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !icon) return;

    setSubmitting(true);
    const body = { title, description, icon };

    try {
      const url = editingId ? `/api/features/${editingId}` : '/api/features';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        resetForm();
        loadFeatures();
      }
    } catch (err) {
      console.error('Error saving feature:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this track?')) return;

    try {
      const res = await fetch(`/api/features/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        loadFeatures();
      }
    } catch (err) {
      console.error('Error deleting feature:', err);
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Technical Tracks</h1>
          <p className="text-sm text-gray-500 font-light mt-1">Manage core thematic tracks shown on the landing page</p>
        </div>
        
        {!formOpen && (
          <button
            onClick={() => setFormOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase bg-white text-black hover:bg-white/90 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Track</span>
          </button>
        )}
      </div>

      {/* Form Container */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Technical Track' : 'Create Technical Track'}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-4">
              {/* Title input */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Track Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-3 text-sm glass-input"
                  placeholder="e.g. Artificial Intelligence"
                />
              </div>

              {/* Icon selector */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Icon Preset</label>
                <div className="grid grid-cols-6 gap-2">
                  {presetIcons.map((ico) => {
                    const PresetIcon = (LucideIcons as any)[ico] || Cpu;
                    const isSelected = icon === ico;
                    return (
                      <button
                        key={ico}
                        type="button"
                        onClick={() => setIcon(ico)}
                        className={`p-2.5 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-primary border-primary text-black' 
                            : 'bg-gray-950 border-white/5 text-gray-400 hover:text-white'
                        }`}
                        title={ico}
                      >
                        <PresetIcon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Description textarea */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Track Description</label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-3 text-sm glass-input h-full resize-none"
                placeholder="Detail the scope and topics for this track..."
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
                  <span>Save Track</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Tracks List */}
      {loading ? (
        <div className="h-64 w-full flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
          <span className="text-sm text-gray-500 font-mono">Loading tracks...</span>
        </div>
      ) : features.length === 0 ? (
        <div className="p-10 rounded-2xl glass border border-white/5 text-center">
          <p className="text-gray-500 font-light">No technical tracks found. Create one to display on the landing page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => {
            const FeatureIcon = (LucideIcons as any)[feat.icon] || Cpu;
            return (
              <div 
                key={feat.id} 
                className="p-6 rounded-2xl glass border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gray-950 border border-white/5 rounded-xl text-secondary">
                      <FeatureIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-600">Track {String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-3 mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-2 border-t border-white/5 pt-4">
                  <button
                    onClick={() => handleEdit(feat)}
                    className="p-2 rounded-lg bg-gray-950 border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="Edit Track"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(feat.id)}
                    className="p-2 rounded-lg bg-gray-950 border border-white/5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete Track"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
