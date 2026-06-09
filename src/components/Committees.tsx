'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CommitteeMember {
  index: number;
  name: string;
  designation: string;
  role: string;
}

interface TechnicalMember {
  index: number;
  name: string;
  affiliation: string;
}

const organizingChairs: { index: number; name: string; designation: string }[] = [
  { index: 1,  name: 'Dr. Kailash. J. Karande',      designation: 'Principal, SKNSCOE and Director, Sinhgad Institutes, Pandharpur' },
  { index: 2,  name: 'Dr. S. G. Kulkarni',            designation: 'Vice Principal, SKNSCOE and Director, Sinhgad Institutes, Pandharpur' },
  { index: 3,  name: 'Dr. Kondooru Shivashanker',     designation: 'H.O.D, Electrical' },
  { index: 4,  name: 'Dr. A. O. Mulani',              designation: 'H.O.D, ENTC' },
  { index: 5,  name: 'Dr. S. S. Kulkarni',            designation: 'Dean (Academic), H.O.D. (MECH)' },
  { index: 6,  name: 'Dr. S. V. Pingale',             designation: 'H.O.D, CSE' },
  { index: 7,  name: 'Prof. N. M. Sawant',            designation: 'H.O.D, AIDS' },
  { index: 8,  name: 'Dr. S. G. Deshmukh',            designation: 'Dean (Publication)' },
  { index: 9,  name: 'Dr. C. P. Pise',               designation: 'Dean (Admin)' },
  { index: 10, name: 'Dr. B. B. Godbole',            designation: 'Dean (Research)' },
  { index: 11, name: 'Dr. B. S. Gandhare',           designation: 'Dean (PG) and EDP' },
  { index: 12, name: 'Dr. S. D. Katekar',            designation: 'Dean (Training and Placement)' },
  { index: 13, name: 'Dr. A. I. Nikam',              designation: 'Dean (Student Affair), H.O.D. (GSE)' },
  { index: 14, name: 'Dr. Y. P. Pawar',              designation: 'H.O.D, Civil' },
];

const organizingCommittee: CommitteeMember[] = [
  { index: 1, name: 'Dr. Kailash. J. Karande', designation: 'Principal, SKNSCOE and Director, Sinhgad Institutes, Pandharpur', role: 'General Chair' },
  { index: 2, name: 'Dr. A. O. Mulani', designation: 'H.O.D, ENTC', role: 'Conference Convener' },
  { index: 3, name: 'Prof. N. M. Sawant', designation: 'IQAC Co-ordinator, SKNSCOE, Pandharpur', role: 'Conference Convener' },
  { index: 4, name: 'Dr. S. G. Kulkarni', designation: 'Vice Principal', role: 'Committee Member' },
  { index: 5, name: 'Dr. S. G. Deshmukh', designation: 'Dean (Publication)', role: 'Committee Member' },
  { index: 6, name: 'Dr. S. S. Kulkarni', designation: 'Dean (Academic), H.O.D. (MECH)', role: 'Committee Member' },
  { index: 7, name: 'Dr. C. P. Pise', designation: 'Dean (Admin)', role: 'Committee Member' },
  { index: 8, name: 'Dr. B. S. Gandhare', designation: 'Dean (PG) and EDP', role: 'Committee Member' },
  { index: 9, name: 'Dr. B. B. Godbole', designation: 'Dean (Research)', role: 'Committee Member' },
  { index: 10, name: 'Dr. S. S. Kadam', designation: 'HOD (Civil)', role: 'Committee Member' },
  { index: 11, name: 'Dr. S. D. Katekar', designation: 'Dean (Training and Placement)', role: 'Committee Member' },
  { index: 12, name: 'Dr. Kondooru Shivashanker', designation: 'H.O.D.& Associate Professor (Electrical Engineering)', role: 'Committee Member' },
  { index: 13, name: 'Dr. A. I. Nikam', designation: 'Dean (Student Affair), H.O.D. (GSE)', role: 'Committee Member' },
  { index: 14, name: 'Prof. S. G. Linge', designation: 'Assistant Professor (CSE)', role: 'Conference Co-Convener' },
  { index: 15, name: 'Prof. S. R. Takale', designation: 'Assistant Professor (ENTC)', role: 'Conference Co-Convener' },
];

const technicalCommittee: TechnicalMember[] = [
  { index: 1, name: 'Dr. Faheem Ullah', affiliation: 'University of Adelaide, Australia' },
  { index: 2, name: 'Dr. Reza Mohammadkhani', affiliation: 'University of Sussex, UK' },
  { index: 3, name: 'Dr. George Ghinea', affiliation: 'Brunel University London, UK' },
  { index: 4, name: 'Dr. Anil Audumbar Pise', affiliation: 'University of the Witwatersrant, Johannesburg' },
  { index: 5, name: 'Dr. Mohd Helmy Abd Wahab', affiliation: 'Universiti Tun Hussein Onn Malaysia' },
  { index: 6, name: 'Dr. Ikram Hoosain', affiliation: 'University of Manitoba, Canada' },
  { index: 7, name: 'Dr. Korhan Cengiz', affiliation: 'Prince Mohammad Bin Fahd University, Saudi Arabia' },
  { index: 8, name: 'Dr. Kazem Dastoori', affiliation: 'University of Dundee, UK' },
  { index: 9, name: 'Dr. Jaroslav Frnda', affiliation: 'University of Zilina, Slovakia' },
  { index: 10, name: 'Dr. Surbhi B. Khan', affiliation: 'School of Science, Engineering and Environment, University of Salford, United Kingdom' },
  { index: 11, name: 'Dr. GodsGift Uzor', affiliation: 'Department of Computer Science, Texas Tech University, USA' },
  { index: 12, name: 'Dr. Ghaida Muttshar Abdulsahib', affiliation: 'University of Technology, Iraq' },
  { index: 13, name: 'Dr. Sachin Nanavati', affiliation: 'Numerical Algorithm Group (NAG) Ltd., UK' },
  { index: 14, name: 'Dr. Manuel Cardona', affiliation: 'Don Bosco University' },
  { index: 15, name: 'Dr. Aamer Mohamed Huroon Mohamed', affiliation: 'National Yang Ming ChiaoTung University, Taiwan' },
  { index: 16, name: 'Dr. A. Prasanth', affiliation: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, Chennai, Tamil Nadu, India' },
  { index: 17, name: 'Dr. Joanne Gomes', affiliation: 'St. Francis Institute of Technology, Mumbai, India' },
  { index: 18, name: 'Dr. Ghanapriya Singh', affiliation: 'National Institute of Technology (NIT), Kurukshetra, India' },
  { index: 19, name: 'Dr. Girish Revadigar', affiliation: 'Indian Institute of Information Technology (IIIT), Dharwad, India' },
  { index: 20, name: 'Dr. Swati Maurya', affiliation: 'Somaiya Vidyavihar University, Mumbai, India' },
  { index: 21, name: 'Dr. Mandar Karyakarte', affiliation: 'Indian Institute of Information Technology, Allahabad, India' },
  { index: 22, name: 'Dr. Rahul Shivaji Pol', affiliation: 'Vishwakarma Institute of Technology, Pune, India' },
  { index: 23, name: 'Dr. Mahesh Kolte', affiliation: 'Pimpri Chinchwad College of Engineering, Pune, India' },
  { index: 24, name: 'Dr. Vibha Vyas', affiliation: 'COEP Technological University, Pune, India' },
  { index: 25, name: 'Dr. Geetanjali Kale', affiliation: 'Pune Institute of Information Technology, Pune, India' },
  { index: 26, name: 'Dr. Ajitkumar Shitole', affiliation: 'International Institute of Information Technology (I²IT), Pune, India' },
  { index: 27, name: 'Dr. Saurabh Singh', affiliation: 'School of Computer Science and Engineering, Galgotias University, Greater Noida, India' },
  { index: 28, name: 'Dr. Deepali Shahane', affiliation: 'School of Computer Science and Applications, Dr. Vishwanath Karad MIT World Peace University, Pune, India' },
  { index: 29, name: 'Dr. Vikas T. Humbe', affiliation: 'School of Technology, SRTM University, Latur, India' },
  { index: 30, name: 'Dr. Ramesh R. Manza', affiliation: 'Department of Computer Science and Information Technology, Dr. Babasaheb Ambedkar Marathwada University, Aurangabad, India' },
  { index: 31, name: 'Dr. P. L. Yannawar', affiliation: 'Department of Computer Science & Information Technology, Dr. Babasaheb Ambedkar Marathwada University (BAMU), Chhatrapati Sambhajinagar, India' },
  { index: 32, name: 'Dr. Vijay Kumbhar', affiliation: 'Department of Computer Science, Shivaji University, Kolhapur, India' },
  { index: 33, name: 'Dr. D. B. Kulkarni', affiliation: 'Walchand College of Engineering, Sangli, India' },
  { index: 34, name: 'Dr. B. F. Momin', affiliation: 'Walchand College of Engineering, Sangli, India' },
  { index: 35, name: 'Dr. V. K. Bairagi', affiliation: 'AISSMS Institute of Information Technology, Pune, India' },
  { index: 36, name: 'Dr. Vaishali S. Jadhav', affiliation: 'Ramrao Adik Institute of Technology, D. Y. Patil University Campus, Mumbai, India' },
  { index: 37, name: 'Dr. Gaurav Dhiman', affiliation: 'Jagat Guru Nanak Dev Punjab State Open University, Patiala' },
];

const advisoryCommittee: TechnicalMember[] = [
  { index: 1, name: 'Dr. Mufi Mahmud', affiliation: 'King Fahd University, Saud Arabia' },
  { index: 2, name: 'Dr. Ashutosh Dhar Dwivedi', affiliation: 'Aalborg University, Copenhagen, Denmark' },
  { index: 3, name: 'Dr. Osama Ibrahim Khalaf', affiliation: 'Al-Nahrain University, Iraq' },
  { index: 4, name: 'Dr. Mohan L. Kolhe', affiliation: 'University of Agder, Norway' },
  { index: 5, name: 'Dr. Sanjeevikumar Padmanabhan', affiliation: 'University of South-Eastern Norway, Norway' },
  { index: 6, name: 'Dr. Balwinder Raj', affiliation: 'National Institute of Technology, Jalandhar' },
  { index: 7, name: 'Dr. M. S. Sutaone', affiliation: 'Indian Institute of Information Technology, Allahabad, India' },
  { index: 8, name: 'Dr. Parikshit Mahalle', affiliation: 'Vishwakarma Institute of Technology, Pune, India' },
  { index: 9, name: 'Dr. Suman Lata Tripathi', affiliation: 'Symbiosis Institute of Technology (SIT), Symbiosis International (Deemed University), Pune, India' },
  { index: 10, name: 'Dr. Deepak Gupta', affiliation: 'Motilal Nehru National Institute of Technology, Allahabad, India' },
  { index: 11, name: 'Dr. RajaniKanth Aluvalu', affiliation: 'Symbiosis International (Deemed University), Hyderabad, India' },
  { index: 12, name: 'Dr. Prashant P. Bartakke', affiliation: 'School of Engineering and Technology, COEP Technological University, Pune, India' },
  { index: 13, name: 'Dr. Ganesh Pathak', affiliation: 'School of Computing, MIT Art, Design and Technology University, Pune, India' },
  { index: 14, name: 'Dr. Tarandeep Kaur Bhatia', affiliation: 'Amity University, Mohali, India' },
];

const conferenceChairs: { index: number; name: string; designation: string }[] = [
  { index: 1, name: 'Dr. A. O. Mulani',    designation: 'H.O.D, ENTC' },
  { index: 2, name: 'Dr. S. G. Kulkarni',  designation: 'Vice-Principal, SKNSCOE and Director, Sinhgad Institutes, Pandharpur' },
];

const publicationChairs: { index: number; name: string; designation: string }[] = [
  { index: 1, name: 'Prof. N. M. Sawant',         designation: 'H.O.D, AIDS' },
  { index: 2, name: 'Dr. Kondooru Shivashanker',  designation: 'H.O.D, Electrical' },
  { index: 3, name: 'Dr. S. S. Kulkarni',         designation: 'Dean (Academic), H.O.D. (MECH)' },
  { index: 4, name: 'Dr. Shirgan',                designation: '—' },
];

const internationalRelationChairs: { index: number; name: string; designation: string }[] = [
  { index: 1, name: 'Dr. S. G. Deshmukh', designation: 'Dean (Publication)' },
];

const technicalChairs: { index: number; name: string; designation: string }[] = [
  { index: 1, name: 'Dr. S. V. Pingale',    designation: 'H.O.D, CSE' },
  { index: 2, name: 'Dr. Y. P. Pawar',      designation: 'H.O.D, Civil' },
  { index: 3, name: 'Dr. Vijay Biradar',    designation: '—' },
  { index: 4, name: 'Mr. D. M. Korake',     designation: '—' },
  { index: 5, name: 'Mr. P. B. Vyavahare',  designation: '—' },
  { index: 6, name: 'Mrs. A. A. Chandane',  designation: '—' },
  { index: 7, name: 'Mr. A. N. Godase',     designation: '—' },
];

const registrationChairs: { index: number; name: string; designation: string }[] = [
  { index: 1, name: 'Dr. Vinayak G. M. Jagtap', designation: '—' },
  { index: 2, name: 'Mr. V. P. More',            designation: '—' },
  { index: 3, name: 'Mr. K. P. Jadhav',          designation: '—' },
];

const hospitalityChairs: { index: number; name: string; designation: string }[] = [
  { index: 1, name: 'Dr. A. C. Pise',       designation: '—' },
  { index: 2, name: 'Mr. N. V. Khandekar',  designation: '—' },
  { index: 3, name: 'Mr. A. N. Godase',     designation: '—' },
];

const programmeCommittee: { index: number; name: string; designation: string }[] = [
  { index: 1, name: 'Mrs. S. D. Ghodake',  designation: '—' },
  { index: 2, name: 'Mr. K. P. Jadhav',    designation: '—' },
  { index: 3, name: 'Mr. N. V. Khandekar', designation: '—' },
  { index: 4, name: 'Mr. M. R. Khadatare', designation: '—' },
];

export default function Committees() {
  const [activeTab, setActiveTab] = useState<'chairs' | 'organizing' | 'conf-chairs' | 'pub-chairs' | 'tech-chairs' | 'reg-chairs' | 'hosp-chairs' | 'prog-comm' | 'intl-chairs' | 'technical' | 'advisory'>('chairs');

  return (
    <section id="committees" className="py-24 bg-white text-gray-900 overflow-hidden border-t border-gray-100">
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
            Organizing Committees
          </motion.h2>
          <motion.div 
            className="w-20 h-1.5 bg-[#0250c5] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {[
            { id: 'chairs',       label: 'Organizing Chairs' },
            { id: 'organizing',   label: 'Organizing Committee' },
            { id: 'conf-chairs',  label: 'Conference Chairs' },
            { id: 'pub-chairs',   label: 'Publication Chairs' },
            { id: 'intl-chairs',  label: 'Intl. Relation Chairs' },
            { id: 'tech-chairs',  label: 'Technical Chairs' },
            { id: 'reg-chairs',   label: 'Registration Chairs' },
            { id: 'hosp-chairs',  label: 'Hospitality Chairs' },
            { id: 'prog-comm',    label: 'Programme Committee' },
            { id: 'technical',    label: 'Technical Committee' },
            { id: 'advisory',     label: 'Advisory Committee' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-5 py-2.5 text-xs font-mono font-bold tracking-widest uppercase rounded-md border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0250c5] text-white border-[#0250c5] shadow-md'
                    : 'bg-white text-[#0250c5] border-[#0250c5] hover:bg-[#0250c5]/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Committee Members Table */}
        <motion.div 
          className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-xl"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="overflow-x-auto">
            {activeTab === 'chairs' ? (
              /* Organizing Chairs Table — 3 columns: #, Name, Designation */
              <table className="w-full border-collapse text-left text-sm md:text-base">
                <thead>
                  <tr className="bg-[#2a303b] text-white font-semibold uppercase text-xs md:text-sm tracking-wider">
                    <th className="py-4 px-6 w-16 text-center">#</th>
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Designation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {organizingChairs.map((member) => (
                    <tr
                      key={member.index}
                      className={`transition-colors hover:bg-gray-50 ${
                        member.index % 2 === 0 ? 'bg-[#f8fafc]' : 'bg-white'
                      }`}
                    >
                      <td className="py-4 px-6 text-center font-bold text-gray-500">{member.index}</td>
                      <td className="py-4 px-6 font-bold text-gray-800">{member.name}</td>
                      <td className="py-4 px-6 font-light text-gray-600 leading-relaxed">{member.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === 'organizing' ? (
              /* Organizing Committee Table — 4 columns: #, Name, Designation, Role */
              <table className="w-full border-collapse text-left text-sm md:text-base">
                <thead>
                  <tr className="bg-[#2a303b] text-white font-semibold uppercase text-xs md:text-sm tracking-wider">
                    <th className="py-4 px-6 w-16 text-center">#</th>
                    <th className="py-4 px-6">Name of Committee Member</th>
                    <th className="py-4 px-6">Designation</th>
                    <th className="py-4 px-6">Role in Committee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {organizingCommittee.map((member) => (
                    <tr
                      key={member.index}
                      className={`transition-colors hover:bg-gray-50 ${
                        member.index % 2 === 0 ? 'bg-[#f8fafc]' : 'bg-white'
                      }`}
                    >
                      <td className="py-4 px-6 text-center font-bold text-gray-500">{member.index}</td>
                      <td className="py-4 px-6 font-bold text-gray-800">{member.name}</td>
                      <td className="py-4 px-6 font-light text-gray-600 leading-relaxed">{member.designation}</td>
                      <td className="py-4 px-6 font-semibold text-[#0250c5]">{member.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === 'technical' || activeTab === 'advisory' ? (
              /* Technical & Advisory Committee Table — 3 columns: Sr. No, Name, Affiliation */
              <table className="w-full border-collapse text-left text-sm md:text-base">
                <thead>
                  <tr className="bg-[#2a303b] text-white font-semibold uppercase text-xs md:text-sm tracking-wider">
                    <th className="py-4 px-6 w-16 text-center">Sr. No</th>
                    <th className="py-4 px-6">Name of Committee Member</th>
                    <th className="py-4 px-6">Affiliation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(activeTab === 'technical' ? technicalCommittee : advisoryCommittee).map((member) => (
                    <tr 
                      key={member.index}
                      className={`transition-colors hover:bg-gray-50 ${
                        member.index % 2 === 0 ? 'bg-[#f8fafc]' : 'bg-white'
                      }`}
                    >
                      <td className="py-4 px-6 text-center font-bold text-gray-500">{member.index}</td>
                      <td className="py-4 px-6 font-bold text-gray-800">{member.name}</td>
                      <td className="py-4 px-6 font-light text-gray-600 leading-relaxed">{member.affiliation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              /* All other sub-committee tables — 3 columns: #, Name, Designation */
              (() => {
                const dataMap: Record<string, { index: number; name: string; designation: string }[]> = {
                  'conf-chairs': conferenceChairs,
                  'pub-chairs': publicationChairs,
                  'intl-chairs': internationalRelationChairs,
                  'tech-chairs': technicalChairs,
                  'reg-chairs': registrationChairs,
                  'hosp-chairs': hospitalityChairs,
                  'prog-comm': programmeCommittee,
                };
                const data = dataMap[activeTab] ?? [];
                return (
                  <table className="w-full border-collapse text-left text-sm md:text-base">
                    <thead>
                      <tr className="bg-[#2a303b] text-white font-semibold uppercase text-xs md:text-sm tracking-wider">
                        <th className="py-4 px-6 w-16 text-center">#</th>
                        <th className="py-4 px-6">Name</th>
                        <th className="py-4 px-6">Designation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.map((member) => (
                        <tr
                          key={member.index}
                          className={`transition-colors hover:bg-gray-50 ${
                            member.index % 2 === 0 ? 'bg-[#f8fafc]' : 'bg-white'
                          }`}
                        >
                          <td className="py-4 px-6 text-center font-bold text-gray-500">{member.index}</td>
                          <td className="py-4 px-6 font-bold text-gray-800">{member.name}</td>
                          <td className="py-4 px-6 font-light text-gray-600 leading-relaxed">{member.designation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              })()
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
