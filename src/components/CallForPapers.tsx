'use client';

import { motion } from 'framer-motion';
import { Download, FileText, AlertCircle, CreditCard, Landmark, CheckCircle, Info } from 'lucide-react';

export default function CallForPapers() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    },
  };

  return (
    <section id="call-for-papers" className="py-24 bg-[#f8fafc] text-gray-900 overflow-hidden border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Call for Papers
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        <motion.div 
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Submission Guidelines Card */}
          <motion.div 
            className="bg-white border border-gray-150 rounded-2xl p-8 shadow-sm"
            variants={itemVariants}
          >
            <h3 className="text-xl font-extrabold text-[#0f2b5c] mb-4 flex items-center">
              <FileText className="w-5 h-5 text-[#0250c5] mr-2.5" />
              Submission Guidelines & Instructions
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-light">
              Authors are being invited to submit their original research papers previously unpublished, currently not under review by other conference or journal. Acceptance of paper will be based on quality, relevance and originality of the work. The participants are requested to submit the papers through Microsoft CMT on or before <span className="line-through text-red-500">31st Oct 2025</span> <span className="font-bold text-[#0250c5]">November 15, 2025</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
              <div className="bg-[#f8fafc] p-5 rounded-xl border border-gray-150 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-[#0250c5] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-[#0f2b5c] mb-1">Plagiarism & Length Limit</h4>
                  <p className="text-gray-500 leading-relaxed font-light">
                    All papers must have a plagiarism rate <span className="font-semibold text-gray-800">below 15%</span>. The total length of the paper should be a <span className="font-semibold text-gray-800">maximum of 6 pages</span> conforming to the SciTePress template.
                  </p>
                </div>
              </div>

              <div className="bg-[#f8fafc] p-5 rounded-xl border border-gray-150 flex items-start space-x-3">
                <Info className="w-5 h-5 text-[#0250c5] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-[#0f2b5c] mb-1">Format Exclusion Notice</h4>
                  <p className="text-gray-500 leading-relaxed font-light">
                    Using the official templates is strongly advised to all authors submitting a paper for reviewing and mandatory for those uploading the camera-ready version. Failure to produce correctly formatted camera-ready submissions may result in the paper's exclusion from the Proceedings.
                  </p>
                </div>
              </div>
            </div>

            {/* Template Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#" 
                className="inline-flex items-center px-5 py-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-white bg-[#0250c5] hover:bg-[#0250c5]/90 transition-all shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                SciTePress LaTeX Template
              </a>
              <a 
                href="#" 
                className="inline-flex items-center px-5 py-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-[#0250c5] bg-white border border-[#0250c5]/25 hover:bg-[#0250c5]/5 transition-all shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                SciTePress MS Word Template
              </a>
            </div>
          </motion.div>

          {/* Registration Details Card */}
          <motion.div 
            className="bg-white border border-gray-150 rounded-2xl p-8 shadow-sm"
            variants={itemVariants}
          >
            <h3 className="text-xl font-extrabold text-[#0f2b5c] mb-4 flex items-center">
              <CreditCard className="w-5 h-5 text-[#0250c5] mr-2.5" />
              Registration Fee
            </h3>
            <p className="text-gray-600 text-sm mb-6 font-light">
              ONE Registration Fee includes the following for the registered authors:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                'Participation in the technical program',
                'Digital Attendance Certificate',
                'E-Proceedings',
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700 font-light">
                  <CheckCircle className="w-4 h-4 text-[#0250c5] mr-2.5 flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>

            {/* Pricing Table */}
            <div className="overflow-x-auto border border-gray-150 rounded-xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-[#0f2b5c] text-white font-mono uppercase text-xs tracking-wider">
                    <th className="py-4 px-5 border-r border-[#0f2b5c]/10 text-center w-12">#</th>
                    <th className="py-4 px-5 border-r border-[#0f2b5c]/10">Registration Category</th>
                    <th className="py-4 px-5 border-r border-[#0f2b5c]/10">Early Bird Rate</th>
                    <th className="py-4 px-5 border-r border-[#0f2b5c]/10">Normal Rate</th>
                    <th className="py-4 px-5">At Desk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 text-gray-700 font-light">
                  {[
                    {
                      cat: 'International Delegates (Scholars / Faculty)',
                      early: 'USD $ 150',
                      normal: 'USD $ 175',
                      desk: 'USD $ 200',
                    },
                    {
                      cat: 'International Students * (UG / PG)',
                      early: 'USD $ 125',
                      normal: 'USD $ 150',
                      desk: 'USD $ 175',
                    },
                    {
                      cat: 'International Participant (Without paper) / Listeners',
                      early: 'USD $ 100',
                      normal: 'USD $ 125',
                      desk: 'USD $ 150',
                    },
                    {
                      cat: 'Indian Regular Presenter (Scholars / Faculty)',
                      early: 'INR 7,000',
                      normal: 'INR 8,000',
                      desk: 'INR 9,000',
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-5 border-r border-gray-150 text-center font-bold text-gray-400">{idx + 1}</td>
                      <td className="py-4 px-5 border-r border-gray-150 font-bold text-[#0f2b5c]">{row.cat}</td>
                      <td className="py-4 px-5 border-r border-gray-150 text-emerald-600 font-bold">{row.early}</td>
                      <td className="py-4 px-5 border-r border-gray-150 text-gray-800 font-bold">{row.normal}</td>
                      <td className="py-4 px-5 text-gray-600 font-bold">{row.desk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Points to Note & Bank Transfer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Points to Note */}
            <motion.div 
              className="bg-white border border-gray-150 rounded-2xl p-8 shadow-sm flex flex-col justify-between"
              variants={itemVariants}
            >
              <div>
                <h3 className="text-xl font-extrabold text-[#0f2b5c] mb-6 flex items-center">
                  <AlertCircle className="w-5 h-5 text-[#0250c5] mr-2.5" />
                  Points to Note
                </h3>
                
                <ul className="space-y-4 text-sm text-gray-600 font-light leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 flex-shrink-0 mt-0.5 font-bold">*</span>
                    <span>Proof of Student Card is required.</span>
                  </li>
                  {[
                    'In case of multiple authors at least one author must register.',
                    'Only the registered author will receive the certificate. Certificate will be issued to all the authors of the paper only against the registration by all the authors.',
                    'If an author submits two papers, both papers must be registered separately.',
                    'Travel reimbursement and accommodation are not provided.',
                    'Presentation in Virtual mode is allowed with prior permission in few cases only.',
                  ].map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#0250c5] mr-2.5 flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[#0250c5]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Bank details for fee transfer */}
            <motion.div 
              className="bg-white border border-gray-150 rounded-2xl p-8 shadow-sm flex flex-col justify-between"
              variants={itemVariants}
            >
              <div>
                <h3 className="text-xl font-extrabold text-[#0f2b5c] mb-5 flex items-center">
                  <Landmark className="w-5 h-5 text-[#0250c5] mr-2.5" />
                  Bank Account Details
                </h3>
                <p className="text-gray-500 text-xs font-light mb-5 leading-relaxed">
                  Please find below the account details for the registration fee bank transfer:
                </p>

                <div className="space-y-3.5 text-sm">
                  {[
                    { label: 'Account Name', val: 'SKN Sinhgad College of Engineering (R&D)' },
                    { label: 'Account Number', val: '2676201000215', isMono: true },
                    { label: 'IFSC Code', val: 'CNRB0002676', isMono: true },
                    { label: 'MICR Code', val: '413015097', isMono: true },
                    { label: 'Swift Code', val: 'CNRBINBBBFD', isMono: true },
                    { label: 'Branch Name', val: 'PANDHARPUR' },
                    { label: 'Bank Address', val: 'CANARA BANK PANDHARPUR, Udyog Bhavan, Paschim Dwar, Main Road, Pandharpur, Dist Solapur, Maharashtra Pin-413304' },
                  ].map((row, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-1 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                      <span className="sm:col-span-4 text-xs font-mono font-bold uppercase text-gray-400 self-start">{row.label}</span>
                      <span className={`sm:col-span-8 text-[#0f2b5c] font-semibold text-sm ${row.isMono ? 'font-mono tracking-wider' : 'font-sans'}`}>
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
