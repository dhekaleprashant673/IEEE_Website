'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Schedule from '@/components/Schedule';
import Patrons from '@/components/Patrons';
import Committees from '@/components/Committees';
import ConferenceTopics from '@/components/ConferenceTopics';
import Publication from '@/components/Publication';
import CallForPapers from '@/components/CallForPapers';
import Download from '@/components/Download';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Schedule />
        <Patrons />
        <Committees />
        <ConferenceTopics />
        <Publication />
        <CallForPapers />
        <Download />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
