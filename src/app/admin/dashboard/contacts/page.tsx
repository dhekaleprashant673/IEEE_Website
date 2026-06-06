'use client';

import { useEffect, useState } from 'react';
import { Mail, Calendar, Loader2, User } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ContactsInbox() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error('Error loading contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 relative z-10">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Contact Messages</h1>
        <p className="text-sm text-gray-500 font-light mt-1">Review contact form submissions and inquiries received</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Messages List Column */}
        <div className="lg:col-span-6 p-6 rounded-2xl glass border border-white/5 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Mail className="w-5 h-5 text-primary" />
            <span>Inbox ({contacts.length})</span>
          </h2>

          {loading ? (
            <div className="h-64 w-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
              <span className="text-sm text-gray-500 font-mono">Fetching inbox...</span>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-light text-sm">Your inbox is empty. Submissions will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">
              {contacts.map((contact) => {
                const isSelected = selectedMessage?.id === contact.id;
                return (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedMessage(contact)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-primary/5 border-primary text-white'
                        : 'bg-gray-950/40 border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-white truncate max-w-[150px]">{contact.name}</span>
                      <span className="text-gray-500 font-mono flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`text-xs font-mono block truncate ${isSelected ? 'text-primary' : 'text-gray-300'}`}>
                      {contact.subject}
                    </span>
                    <p className="text-xs text-gray-500 font-light line-clamp-1 mt-1 leading-relaxed">
                      {contact.message}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Message Detail Column */}
        <div className="lg:col-span-6 p-6 rounded-2xl glass border border-white/5 min-h-[400px]">
          {selectedMessage ? (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="border-b border-white/5 pb-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedMessage.subject}</h3>
                    <div className="flex flex-col space-y-1 mt-2 text-xs font-mono text-gray-400">
                      <span className="flex items-center">
                        <User className="w-3.5 h-3.5 mr-1.5 text-secondary" />
                        <span>Sender: {selectedMessage.name}</span>
                      </span>
                      <span className="flex items-center">
                        <Mail className="w-3.5 h-3.5 mr-1.5 text-primary" />
                        <span>Email: <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">{selectedMessage.email}</a></span>
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 bg-gray-950 px-2.5 py-1 rounded-full border border-white/5">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div>
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Message Body</h4>
                <p className="text-sm text-gray-300 leading-relaxed font-light whitespace-pre-wrap bg-gray-950/40 p-4 rounded-xl border border-white/5">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Reply trigger button */}
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-mono uppercase bg-white text-black hover:bg-white/90 transition-all font-semibold"
              >
                Reply via Email
              </a>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-24 text-center space-y-3">
              <Mail className="w-8 h-8 text-gray-600 animate-pulse" />
              <p className="text-gray-500 font-light text-sm">Select an inquiry from the inbox to read its details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
