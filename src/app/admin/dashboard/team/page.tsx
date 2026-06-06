'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash, X, Users, Loader2, Save, User, Link as LinkIcon } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  linkedin?: string | null;
  github?: string | null;
}

export default function TeamManager() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [image, setImage] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/team');
      if (res.ok) {
        const data = await res.json();
        setTeam(data);
      }
    } catch (err) {
      console.error('Error loading team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setDesignation('');
    setImage('');
    setLinkedin('');
    setGithub('');
    setFormOpen(false);
  };

  const handleEdit = (mem: TeamMember) => {
    setEditingId(mem.id);
    setName(mem.name);
    setDesignation(mem.designation);
    setImage(mem.image);
    setLinkedin(mem.linkedin || '');
    setGithub(mem.github || '');
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !designation || !image) return;

    setSubmitting(true);
    const body = { 
      name, 
      designation, 
      image, 
      linkedin: linkedin || null, 
      github: github || null 
    };

    try {
      const url = editingId ? `/api/team/${editingId}` : '/api/team';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        resetForm();
        loadTeam();
      }
    } catch (err) {
      console.error('Error saving team member:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this committee member?')) return;

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        loadTeam();
      }
    } catch (err) {
      console.error('Error deleting team member:', err);
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Committee / Team</h1>
          <p className="text-sm text-gray-500 font-light mt-1">Manage Advisory Board and Organising Committee members</p>
        </div>

        {!formOpen && (
          <button
            onClick={() => setFormOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase bg-white text-black hover:bg-white/90 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        )}
      </div>

      {/* Form Container */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass border border-white/5 space-y-6 max-w-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Committee Member' : 'Add Committee Member'}
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
            <div className="space-y-4">
              {/* Name */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-3 text-sm glass-input"
                  placeholder="Dr. Elena Rostova"
                />
              </div>

              {/* Designation */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Designation / Role</label>
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="p-3 text-sm glass-input"
                  placeholder="General Chair"
                />
              </div>

              {/* Photo URL */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Image URL</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="p-3 text-sm glass-input font-mono"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* LinkedIn URL */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">LinkedIn Profile (Optional)</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="p-3 text-sm glass-input font-mono"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              {/* GitHub URL */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">GitHub Profile (Optional)</label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="p-3 text-sm glass-input font-mono"
                  placeholder="https://github.com/username"
                />
              </div>
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
                  <span>Save Member</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Committee Grid */}
      {loading ? (
        <div className="h-64 w-full flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
          <span className="text-sm text-gray-500 font-mono">Loading committee members...</span>
        </div>
      ) : team.length === 0 ? (
        <div className="p-10 rounded-2xl glass border border-white/5 text-center">
          <p className="text-gray-500 font-light">No committee members found. Add one to display on the landing page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((mem) => (
            <div 
              key={mem.id} 
              className="p-6 rounded-2xl glass border border-white/5 flex flex-col items-center justify-between"
            >
              <div className="flex flex-col items-center text-center w-full">
                {/* Photo container */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border border-white/10 bg-gray-900 flex items-center justify-center text-gray-500">
                  {mem.image ? (
                    <img
                      src={mem.image}
                      alt={mem.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10" />
                  )}
                </div>

                <h3 className="font-bold text-white text-base truncate w-full">{mem.name}</h3>
                <span className="text-xs text-gray-400 font-light truncate w-full mt-0.5">{mem.designation}</span>

                {/* Social links indicators */}
                <div className="flex items-center space-x-2 mt-4 text-xs font-mono text-gray-600">
                  {mem.linkedin && <span className="px-2 py-0.5 rounded bg-gray-950 border border-white/5 text-primary">LinkedIn</span>}
                  {mem.github && <span className="px-2 py-0.5 rounded bg-gray-950 border border-white/5 text-secondary">GitHub</span>}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 border-t border-white/5 pt-4 mt-6 w-full">
                <button
                  onClick={() => handleEdit(mem)}
                  className="p-2 rounded-lg bg-gray-950 border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Edit Member"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(mem.id)}
                  className="p-2 rounded-lg bg-gray-950 border border-white/5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete Member"
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
