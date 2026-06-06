'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryImage {
  id?: string;
  imageUrl: string;
  title: string;
  category: string;
}

const fallbackGallery: GalleryImage[] = [
  {
    title: 'General Keynote Presentation',
    category: 'Keynotes',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Auditorium Venue Stage',
    category: 'Venue',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'IoT Research Parallel Session',
    category: 'Sessions',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Delegates Networking Dinner',
    category: 'Sessions',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Panel Discussion on Cloud AI',
    category: 'Keynotes',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Exhibition Hall Exterior',
    category: 'Venue',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
];

const categories = ['All', 'Venue', 'Sessions', 'Keynotes'];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setImages(data);
          } else {
            setImages(fallbackGallery);
          }
        } else {
          setImages(fallbackGallery);
        }
      } catch (err) {
        console.error('Error loading gallery:', err);
        setImages(fallbackGallery);
      }
    }
    loadGallery();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((img) => img.category === activeCategory));
    }
  }, [activeCategory, images]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-gray-50 text-gray-900 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Event Gallery
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Categories tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 text-xs font-mono font-bold tracking-widest uppercase rounded-full border transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0250c5] text-white border-[#0250c5] shadow-md'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#0250c5] hover:text-[#0250c5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.imageUrl}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative h-64 rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Hover Details Panel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest mb-1">
                    {img.category}
                  </span>
                  <h3 className="text-white font-bold text-base mb-1">
                    {img.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-white/80 font-light mt-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand Photo</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full-Screen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2.5 rounded-full bg-gray-900 border border-white/5 cursor-pointer"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-3 rounded-full bg-gray-900 border border-white/5 hidden sm:block cursor-pointer"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-3 rounded-full bg-gray-900 border border-white/5 hidden sm:block cursor-pointer"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[lightboxIndex].imageUrl}
                alt={filteredImages[lightboxIndex].title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="text-center mt-6">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  {filteredImages[lightboxIndex].category}
                </span>
                <h3 className="text-white font-semibold text-xl mt-1">
                  {filteredImages[lightboxIndex].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
