'use client';

import { motion } from 'framer-motion';
import { IndianRupee, DollarSign, BadgeCheck, Info, ExternalLink } from 'lucide-react';

interface FeeRow {
  category: string;
  inr: string;
  usd: string;
  highlight?: boolean;
}

const feeData: FeeRow[] = [
  {
    category: 'Industry Professionals',
    inr: '12,000',
    usd: '150',
  },
  {
    category: 'Faculty / Academicians',
    inr: '10,000',
    usd: '120',
  },
  {
    category: 'Faculty / Academicians (IEEE Members)',
    inr: '8,000',
    usd: '100',
    highlight: true,
  },
  {
    category: 'Research Scholars and UG/PG Students',
    inr: '7,000',
    usd: '80',
  },
  {
    category: 'Research Scholars and UG/PG Students (IEEE Members)',
    inr: '6,000',
    usd: '70',
    highlight: true,
  },
  {
    category: 'Co-Authors / Participants',
    inr: '3,000',
    usd: '40',
  },
];

const notes = [
  'Registration fees include conference kit, proceedings, and lunch on the day of the conference.',
  'IEEE Members must provide a valid IEEE Membership ID at the time of registration.',
  'Each accepted paper requires at least one author to complete a full (non-student) registration.',
  'Fees are non-refundable after the registration deadline.',
  'Authors presenting more than one paper must pay the full fee for each additional paper.',
];

export default function Registration() {
  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
    }),
  };

  return (
    <section
      id="registration"
      className="py-24 bg-[#0a0f1e] text-white overflow-hidden relative border-t border-white/5"
    >
      {/* Background ambient glows */}
      <div className="absolute -top-40 left-1/4 w-[40rem] h-[40rem] bg-[#0250c5]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[30rem] h-[30rem] bg-[#0083b0]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.p
            className="text-[#4da3ff] text-xs font-mono font-bold tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ICSEET 2026
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Registration
          </motion.h2>
          <motion.div
            className="w-20 h-1.5 bg-[#0250c5] rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          />
          <motion.p
            className="text-gray-400 max-w-xl text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Register now to present your research at ICSEET 2026. Early registration is encouraged.
            IEEE Members enjoy a special discounted rate.
          </motion.p>
        </div>

        {/* Fees Table Card */}
        <motion.div
          className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {/* Table header */}
          <div className="bg-[#0250c5] px-6 py-4">
            <h3 className="text-white font-bold text-lg tracking-wide uppercase">
              Registration Fees
            </h3>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0a1535] border-b border-white/10">
                  <th className="text-left px-6 py-4 text-white font-semibold tracking-wide w-full">
                    Category
                  </th>
                  <th className="text-center px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center justify-center gap-1 text-[#4da3ff] font-semibold">
                      <IndianRupee className="w-3.5 h-3.5" /> in INR
                    </span>
                  </th>
                  <th className="text-center px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center justify-center gap-1 text-[#4da3ff] font-semibold">
                      <DollarSign className="w-3.5 h-3.5" /> in USD
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeData.map((row, index) => (
                  <motion.tr
                    key={index}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`border-b border-white/5 transition-colors duration-200 hover:bg-white/5 ${
                      row.highlight
                        ? 'bg-[#0250c5]/10'
                        : index % 2 === 0
                        ? 'bg-[#0d1628]'
                        : 'bg-[#0a1020]'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-white flex items-center gap-2">
                      {row.highlight && (
                        <BadgeCheck className="w-4 h-4 text-[#4da3ff] flex-shrink-0" />
                      )}
                      {row.category}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-white whitespace-nowrap">
                      ₹ {row.inr}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-[#4da3ff] whitespace-nowrap">
                      $ {row.usd}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          className="bg-[#0d1628] border border-white/10 rounded-2xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-[#4da3ff] flex-shrink-0" />
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              Important Notes
            </h4>
          </div>
          <ul className="space-y-2.5">
            {notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-400">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0250c5] flex-shrink-0" />
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="#contact"
            id="register-now-btn"
            className="inline-flex items-center gap-2 bg-[#0250c5] hover:bg-[#0240a5] text-white font-bold px-8 py-4 rounded-full text-sm tracking-wide uppercase transition-all duration-300 shadow-lg hover:shadow-[#0250c5]/40 hover:shadow-xl hover:-translate-y-0.5"
          >
            Register Now
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
