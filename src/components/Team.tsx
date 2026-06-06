'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface TeamMember {
  id?: string;
  name: string;
  designation: string;
  image: string;
  linkedin?: string | null;
  github?: string | null;
}

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const fallbackTeam: TeamMember[] = [
  {
    name: 'Dr. Elena Rostova',
    designation: 'General Chair',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Prof. Marcus Vance',
    designation: 'Program Chair',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Dr. Aisha Rahman',
    designation: 'Technical Committee Chair',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Prof. David Kim',
    designation: 'Organising Secretary',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
];

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setTeam(data);
          } else {
            setTeam(fallbackTeam);
          }
        } else {
          setTeam(fallbackTeam);
        }
      } catch (err) {
        console.error('Error loading team:', err);
        setTeam(fallbackTeam);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
    },
  };

  return (
    <section id="team" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* glow circles */}
      <div className="absolute right-1/4 bottom-1/4 w-[35rem] h-[35rem] bg-glow-cyan opacity-20 pointer-events-none rounded-full blur-[110px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
            className="text-xs font-mono tracking-[0.3em] text-primary uppercase mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Advisory Board
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Organising Committee
          </motion.h2>
          <motion.div 
            className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Committee Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {team.map((member, index) => (
            <motion.div
              key={member.id || index}
              className="group flex flex-col items-center rounded-2xl glass-card p-6 relative overflow-hidden"
              variants={cardVariants}
            >
              {/* Image Circle wrapper with border layout */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-white/5 group-hover:border-primary/40 transition-colors duration-300">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-500">
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>

              {/* Text info */}
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors text-center">
                {member.name}
              </h3>
              <p className="text-xs text-gray-400 font-light text-center mb-6">
                {member.designation}
              </p>

              {/* Social icons links list */}
              <div className="flex space-x-3 mt-auto relative z-15">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-950 border border-white/5 text-gray-400 hover:text-primary hover:border-primary/30 transition-all"
                    aria-label={`${member.name} LinkedIn Profile`}
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-950 border border-white/5 text-gray-400 hover:text-secondary hover:border-secondary/30 transition-all"
                    aria-label={`${member.name} GitHub Profile`}
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
