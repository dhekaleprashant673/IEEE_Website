'use client';

import { motion } from 'framer-motion';

export default function Publication() {
  return (
    <section id="publication" className="py-20 bg-white text-gray-900 overflow-hidden border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Publication
        </motion.h2>

        {/* Content Card */}
        <motion.div
          className="border border-gray-200 rounded-lg p-8 md:p-10 bg-white shadow-sm"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {/* Intro line */}
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            All Accepted and Presented papers of ICICVT 2025 ,will be published by SciTePress
          </p>

          {/* About SciTePress bullet */}
          <ul className="list-disc pl-6 mb-4">
            <li>
              <a
                href="https://www.scitepress.org/HomePage.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium text-sm md:text-base"
              >
                About SciTePress:
              </a>
            </li>
          </ul>

          {/* SciTePress description paragraph */}
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            SciTePress publications are indexed by several abstracting and indexing organizations, including: SCOPUS, EI Engineering
            Index, Google Scholar, DBLP, Semantic Scholar, and Microsoft Academic. SciTePress is a publisher of scientific and
            technical publications, including: conference and workshop proceedings, tutorials, journals, e-books, and on-line
            courses. SciTePress publications are indexed by these organizations, but neither the publisher nor the organizations can
            guarantee indexing. The SciTePress Digital Library is an open access repository that includes: Over 57,700 full text papers,
            Keyword-powered search, and Search engine optimization for every paper.{' '}
            <a
              href="https://www.scitepress.org/HomePage.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:underline"
            >
              https://www.scitepress.org/HomePage.aspx
            </a>
          </p>

          {/* Q1 bold statement */}
          <p className="text-gray-900 text-sm md:text-base font-bold leading-relaxed mb-10">
            Selected and extended versions of articles will be considered for publication in a Scopus (Q1) indexed
            journal upon payment of additional fees.
          </p>

          {/* Previous Publication History */}
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-5">
            Previous Publication History
          </h3>

          <ul className="space-y-4 pl-2">
            {[
              {
                title: 'Computational Intelligence in Engineering Systems 2022-AIP Conference Proceedings',
                href: 'https://pubs.aip.org/aip/acp/issue/2494/1',
              },
              {
                title: 'Intelligent Computing in Information Technology for Engineering System 2021 - CRC Taylor & Francis Group',
                href: 'https://www.routledge.com/Intelligent-Computing-in-Information-Technology-for-Engineering-System/Karande-Deshmukh-Mahalle/p/book/9781032270807',
              },
              {
                title: 'Artificial Intelligence, IoT and Smart Materials for Energy Applications 2021 - CRC Taylor & Francis Group',
                href: 'https://www.routledge.com/Artificial-Intelligence-Internet-of-Things-IoT-and-Smart-Materials-for/Kolhe-Karande-Deshmukh/p/book/9781032115023',
              },
            ].map((pub, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-gray-800 mt-1 flex-shrink-0 text-base">•</span>
                <a
                  href={pub.href}
                  target={pub.href !== '#' ? '_blank' : undefined}
                  rel={pub.href !== '#' ? 'noopener noreferrer' : undefined}
                  className="text-blue-600 hover:underline text-sm md:text-base leading-relaxed font-medium"
                >
                  {pub.title}
                </a>
              </li>
            ))}
          </ul>

        </motion.div>

      </div>
    </section>
  );
}
