import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { techStack } from '../config/site';
import { Sparkles, Code2, Palette, Camera, Terminal, Box, Globe, Zap, Image, PenTool, Layout, FileCode, Film, Video, GitBranch, Cloud } from 'lucide-react';

const TECH_CATEGORIES = ['All', 'Design', 'Frontend', 'Media', 'Tools'];

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTech = selectedCategory === 'All'
    ? techStack
    : techStack.filter(t => t.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Figma': return <PenTool className="w-4 h-4 text-purple-500" />;
      case 'Image': return <Image className="w-4 h-4 text-blue-500" />;
      case 'PenTool': return <PenTool className="w-4 h-4 text-orange-500" />;
      case 'Layout': return <Layout className="w-4 h-4 text-emerald-500" />;
      case 'Code2': return <Code2 className="w-4 h-4 text-cyan-500" />;
      case 'Globe': return <Globe className="w-4 h-4 text-indigo-500" />;
      case 'FileCode': return <FileCode className="w-4 h-4 text-blue-600" />;
      case 'Palette': return <Palette className="w-4 h-4 text-teal-500" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'Zap': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'Box': return <Box className="w-4 h-4 text-rose-500" />;
      case 'Camera': return <Camera className="w-4 h-4 text-sky-500" />;
      case 'Video': return <Video className="w-4 h-4 text-violet-500" />;
      case 'Film': return <Film className="w-4 h-4 text-purple-600" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4 text-orange-600" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-emerald-600" />;
      case 'Cloud': return <Cloud className="w-4 h-4 text-sky-600" />;
      default: return <Code2 className="w-4 h-4 text-neutral-500" />;
    }
  };

  return (
    <section id="techstack" className="py-28 px-6 max-w-7xl mx-auto relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" /> Toolkit & Technologies
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white"
          >
            Interactive Tech Board
          </motion.h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 backdrop-blur-md w-fit">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'text-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
              data-cursor-text="Filter"
            >
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeTechCategoryPill"
                  className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Physics Floating Chip Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredTech.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: index * 0.05
              }}
              whileHover={{ scale: 1.06, y: -6 }}
              whileTap={{ scale: 0.96 }}
              className="group relative p-5 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 shadow-md backdrop-blur-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all cursor-pointer overflow-hidden"
              data-cursor-text={item.name}
            >
              {/* Subtle Glow background */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none" />

              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group-hover:scale-110 transition-transform">
                  {getIcon(item.icon)}
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  {item.category}
                </span>
              </div>

              <h3 className="font-semibold text-neutral-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {item.name}
              </h3>

              {/* Skill Proficiency Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400 mb-1.5">
                  <span>Proficiency</span>
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">{item.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </section>
  );
}
