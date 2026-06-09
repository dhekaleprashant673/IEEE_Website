'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!form.name.trim()) tempErrors.name = 'Name is required';
    
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) tempErrors.email = 'Invalid email address';
    }

    if (!form.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!form.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to submit form.');
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMessage('Network error, please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#f8fafc] text-gray-900 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-[#0f2b5c] tracking-tight uppercase mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h2>
          <motion.p 
            className="text-gray-500 font-light text-sm mb-6 max-w-lg text-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Feel free to reach out to us for any queries or assistance related to the conference.
          </motion.p>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full mb-12"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Conference Conveners */}
        <div className="mb-16">
          <h3 className="text-center text-lg md:text-xl font-extrabold text-[#0f2b5c] mb-8 uppercase tracking-wide">
            Conference Conveners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Dr. A. O. Mulani', desc: 'H.O.D, ENTC' },
              { name: 'Prof. N. M. Sawant', desc: 'IQAC Co-ordinator, SKNSCOE, Pandharpur' }
            ].map((convener, idx) => (
              <motion.div 
                key={idx}
                className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-300 min-h-[120px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <h4 className="font-extrabold text-[#0f2b5c] text-base mb-1.5">{convener.name}</h4>
                <p className="text-gray-500 text-xs font-light leading-relaxed max-w-xs">{convener.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Co-Conveners */}
        <div className="mb-20">
          <h3 className="text-center text-lg md:text-xl font-extrabold text-[#0f2b5c] mb-8 uppercase tracking-wide">
            Co-Conveners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Prof. S. G. Linge', desc: 'Assistant Professor, ENTC' },
              { name: 'Prof. S. R. Takale', desc: 'Assistant Professor, ENTC' }
            ].map((coConvener, idx) => (
              <motion.div 
                key={idx}
                className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-300 min-h-[140px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <h4 className="font-extrabold text-[#0f2b5c] text-base mb-1.5">{coConvener.name}</h4>
                <p className="text-gray-500 text-xs font-light leading-relaxed max-w-xs">{coConvener.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Secretariat Header */}
        <div className="border-t border-gray-200/50 pt-16 mb-12">
          <h3 className="text-center text-lg md:text-xl font-extrabold text-[#0f2b5c] uppercase tracking-wide">
            Contact Secretariat
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Details Column */}
          <motion.div 
            className="lg:col-span-5 flex flex-col space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-[#0f2b5c] mb-4">Have Questions?</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Reach out to the conference steering committee for inquiries regarding paper submission formats, registration invoicing, hotel reservations, or partnership opportunities.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-[#0250c5] shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-gray-800 font-bold mb-1">Venue Location</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    S.K.N. Sinhgad College of Engineering,<br />
                    Korti, Pandharpur, Maharashtra 413304, India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-[#0250c5] shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-gray-800 font-bold mb-1">Email Queries</h4>
                  <p className="text-sm text-gray-500 font-light">
                    contact@icicvt.com<br />
                    support@sknscoe.ac.in
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-[#0250c5] shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-gray-800 font-bold mb-1">Call Us</h4>
                  <p className="text-sm text-gray-500 font-light">
                    +91 2186 250146<br />
                    +91 9881 382455
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white shadow-xl border border-gray-100 flex flex-col space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0250c5] focus:ring-1 focus:ring-[#0250c5] bg-gray-50 text-gray-800 transition-all"
                    placeholder="John Doe"
                    disabled={status === 'submitting'}
                  />
                  {errors.name && <span className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0250c5] focus:ring-1 focus:ring-[#0250c5] bg-gray-50 text-gray-800 transition-all"
                    placeholder="john@example.com"
                    disabled={status === 'submitting'}
                  />
                  {errors.email && <span className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="subject" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0250c5] focus:ring-1 focus:ring-[#0250c5] bg-gray-50 text-gray-800 transition-all"
                  placeholder="Paper Submission Inquiry"
                  disabled={status === 'submitting'}
                />
                {errors.subject && <span className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0250c5] focus:ring-1 focus:ring-[#0250c5] bg-gray-50 text-gray-800 transition-all resize-none"
                  placeholder="Enter details of your query..."
                  disabled={status === 'submitting'}
                />
                {errors.message && <span className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg font-mono font-bold tracking-widest uppercase text-white bg-[#0250c5] hover:bg-[#0250c5]/90 flex items-center justify-center space-x-2 transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Response Alerts */}
              {status === 'success' && (
                <motion.div 
                  className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-start space-x-3 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Message Submitted</span>
                    <span className="font-light">Thank you! The secretariat will reply to your registered email address soon.</span>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 flex items-start space-x-3 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Submission Failed</span>
                    <span className="font-light">{errorMessage}</span>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
