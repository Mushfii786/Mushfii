import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Calendar, MapPin, Sparkles } from 'lucide-react';
import { timelineItems } from '../config/site';

export function Timeline() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  const filteredItems = timelineItems.filter(item => item.type === activeTab);

  return (
    <section id="experience" className="py-28 px-6 max-w-7xl mx-auto relative">
      
      {/* --- SUBSECTION 1: Career Experience & Education --- */}
      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2563EB] font-semibold mb-3 hover:scale-105 transition-transform duration-200 cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5" /> Career Journey
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white"
            >
              Experience & Education
            </motion.h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 backdrop-blur-md w-fit">
            <button
              onClick={() => setActiveTab('experience')}
              className={`relative px-5 py-2 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
                activeTab === 'experience'
                  ? 'text-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {activeTab === 'experience' && (
                <motion.div
                  layoutId="timelineTabPill"
                  className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Briefcase className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Work Experience</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`relative px-5 py-2 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
                activeTab === 'education'
                  ? 'text-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {activeTab === 'education' && (
                <motion.div
                  layoutId="timelineTabPill"
                  className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Timeline Items List */}
        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 md:ml-8 space-y-12">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Bullet Point */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-600 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:scale-125 transition-all duration-200" />

              {/* Content Card */}
              <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800/80 shadow-md shadow-neutral-200/50 dark:shadow-none hover:border-[#2563EB] hover:scale-[1.01] transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white">
                      {item.roleOrDegree}
                    </h3>
                    <p className="text-sm font-semibold text-[#2563EB] mt-0.5">
                      {item.organization}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 mb-6 text-sm text-neutral-700 dark:text-neutral-300 font-light leading-relaxed list-disc list-inside">
                  {item.description.map((desc, dIdx) => (
                    <li key={dIdx}>{desc}</li>
                  ))}
                </ul>

                {/* Skills Used Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800/60">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:scale-105 transition-transform duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
