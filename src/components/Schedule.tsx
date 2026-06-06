'use client';

import { motion } from 'framer-motion';

interface ScheduleRow {
  index: number;
  particulars: string;
  originalDate?: string;
  extendedDate: string;
}

const scheduleData: ScheduleRow[] = [
  {
    index: 1,
    particulars: 'Full Paper Submission',
    originalDate: 'October 30, 2025',
    extendedDate: 'November 15, 2025',
  },
  {
    index: 2,
    particulars: 'Notification of Acceptance',
    originalDate: 'October 30, 2025',
    extendedDate: 'November 22, 2025',
  },
  {
    index: 3,
    particulars: 'Final/Revised Paper Submission',
    originalDate: 'November 21, 2025',
    extendedDate: 'November 28, 2025',
  },
  {
    index: 4,
    particulars: 'Last Date of Regular Registration',
    extendedDate: 'November 28, 2025',
  },
  {
    index: 5,
    particulars: 'Conference Dates',
    extendedDate: 'December 12 & 13, 2025',
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Conference Schedule
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Schedule Table */}
        <motion.div 
          className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="bg-[#2a303b] text-white font-semibold uppercase text-xs md:text-sm tracking-wider">
                  <th className="py-4 px-6 w-16 text-center">#</th>
                  <th className="py-4 px-6">Particulars</th>
                  <th className="py-4 px-6">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scheduleData.map((row) => (
                  <tr 
                    key={row.index}
                    className={`transition-colors hover:bg-gray-50 ${
                      row.index % 2 === 0 ? 'bg-[#f8fafc]' : 'bg-white'
                    }`}
                  >
                    <td className="py-5 px-6 text-center font-bold text-gray-600">{row.index}</td>
                    <td className="py-5 px-6 font-semibold text-gray-800">{row.particulars}</td>
                    <td className="py-5 px-6 font-mono text-sm md:text-base text-gray-700">
                      {row.originalDate && (
                        <span className="line-through text-red-500 mr-3 decoration-1.5">
                          {row.originalDate}
                        </span>
                      )}
                      <span className="text-[#0250c5] font-bold">{row.extendedDate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
