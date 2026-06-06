'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash, X, Image as ImageIcon, Loader2, Save } from 'lucide-react';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
}

const categoriesPreset = ['Venue', 'Sessions', 'Keynotes'];

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Venue');
  const [imageUrl, setImageUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (err) {
      console.error('Error loading gallery images:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Venue');
    setImageUrl('');
    setFormOpen(false);
  };

  const handleEdit = (img: GalleryImage) => {
    setEditingId(img.id);
    setTitle(img.title);
    setCategory(img.category);
    setImageUrl(img.imageUrl);
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !imageUrl) return;

    setSubmitting(true);
    const body = { title, category, imageUrl };

    try {
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        resetForm();
        loadGallery();
      }
    } catch (err) {
      console.error('Error saving gallery image:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo record?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        loadGallery();
      }
    } catch (err) {
      console.error('Error deleting gallery image:', err);
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Gallery</h1>
          <p className="text-sm text-gray-500 font-light mt-1">Manage photo assets and categories shown on the landing page</p>
        </div>

        {!formOpen && (
          <button
            onClick={() => setFormOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase bg-white text-black hover:bg-white/90 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        )}
      </div>

      {/* Form Container */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass border border-white/5 space-y-6 max-w-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Gallery Photo' : 'Upload Gallery Photo'}
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
            {/* Title */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Image Caption / Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 text-sm glass-input"
                placeholder="e.g. Auditorium Stage Setup"
              />
            </div>

            {/* Category selection */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Category Tag</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 text-sm glass-input bg-gray-950 text-white cursor-pointer"
              >
                {categoriesPreset.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div className="flex flex-col space-y-1.5 sm:col-span-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Image Source URL</label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="p-3 text-sm glass-input font-mono"
                placeholder="https://images.unsplash.com/photo-..."
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
                  <span>Save Photo</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Gallery List Grid */}
      {loading ? (
        <div className="h-64 w-full flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
          <span className="text-sm text-gray-500 font-mono">Loading photos...</span>
        </div>
      ) : images.length === 0 ? (
        <div className="p-10 rounded-2xl glass border border-white/5 text-center">
          <p className="text-gray-500 font-light">No gallery images found. Upload one to display on the landing page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div 
              key={img.id} 
              className="group rounded-2xl glass border border-white/5 overflow-hidden flex flex-col justify-between"
            >
              {/* Photo preview container */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-950 flex items-center justify-center text-gray-500">
                {img.imageUrl ? (
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ImageIcon className="w-10 h-10" />
                )}
                
                {/* Category tag */}
                <span className="absolute top-4 left-4 px-2 py-0.5 rounded bg-gray-950/80 backdrop-blur text-[9px] font-mono uppercase tracking-widest text-secondary border border-white/5">
                  {img.category}
                </span>
              </div>

              {/* Text Caption */}
              <div className="p-5 flex-grow">
                <h3 className="font-semibold text-white text-sm line-clamp-1">{img.title}</h3>
              </div>

              <div className="flex items-center justify-end space-x-2 border-t border-white/5 p-4 bg-gray-950/40">
                <button
                  onClick={() => handleEdit(img)}
                  className="p-2 rounded-lg bg-gray-950 border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Edit Photo"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-2 rounded-lg bg-gray-950 border border-white/5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete Photo"
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
