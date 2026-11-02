import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Sparkles, ArrowRight, ArrowUpRight, MessageSquare, Layers } from 'lucide-react';
import { AnimatedBackground } from './hero/AnimatedBackground';
import { CursorGlow } from './hero/CursorGlow';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const FEATURED_DESIGN_WORKS = [
  {
    id: 'work-1',
    title: 'Loom Studio',
    subtitle: 'AI Editorial Canvas & Design System',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800&h=500',
    link: '#projects',
  },
  {
    id: 'work-2',
    title: 'Atlas Design Lab',
    subtitle: 'Brand Identity & WebGL Surface',
    category: 'Branding & 3D',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800&h=500',
    link: '#projects',
  },
  {
    id: 'work-3',
    title: 'Rhythm OS',
    subtitle: 'Product Telemetry & Motion Interface',
    category: 'Motion & Dev',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=500',
    link: '#projects',
  },
  {
    id: 'work-4',
    title: 'Monsoon Mood',
    subtitle: 'Cinematic Visual Storytelling',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800&h=500',
    link: '#photography',
  },
];

export const Hero = memo(function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['0%', '-8%']
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    shouldReduceMotion ? [1, 1] : [1, 0]
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden select-none bg-[#020306] px-4 sm:px-6 pt-24 pb-20 sm:pt-28 sm:pb-24"
    >
      {/* Cosmic Animated Star Background */}
      <AnimatedBackground />

      {/* Interactive Cursor Glow */}
      <CursorGlow />

      {/* Hero Core Content */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-[1140px] w-full mx-auto flex flex-col items-center justify-center py-6 sm:py-8 transform-gpu"
      >
        {/* Exact Rounded Stadium/Capsule Backdrop from reference image */}
        <div className="absolute inset-x-2 sm:inset-x-6 md:inset-x-10 top-0 bottom-36 sm:bottom-44 rounded-[50px] sm:rounded-[90px] md:rounded-[120px] bg-gradient-to-b from-[#15192d]/65 via-[#0e1322]/80 to-[#090d18]/85 border border-white/[0.05] ring-1 ring-white/[0.03] backdrop-blur-[2px] pointer-events-none -z-10 shadow-[0_0_90px_rgba(25,35,75,0.35),inset_0_1px_1px_rgba(255,255,255,0.08)]" />

        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 w-full max-w-3xl px-4">
          {/* 1. Top Availability Pill Badge */}
          <motion.div variants={lineVariants} className="z-10">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#12141c]/90 hover:bg-[#1a1d28]/90 border border-white/[0.12] hover:border-white/25 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              {/* Glowing Status Dot */}
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 items-center justify-center shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
              </span>

              <span className="text-[10px] sm:text-[11px] font-medium text-neutral-200 tracking-normal font-sans">
                Available for Freelance Projects
              </span>

              <Sparkles className="w-3 h-3 text-purple-400 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
            </a>
          </motion.div>

          {/* 2. Main Headline */}
          <motion.div variants={lineVariants} className="w-full space-y-0.5 sm:space-y-1 z-10">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] font-bold tracking-tight text-white leading-[1.12] sm:leading-[1.1] drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
              <span className="block">Crafting Unforgettable</span>
              <span className="block">Visuals Through</span>
              <span className="block mt-1 sm:mt-1.5">
                {/* Translucent Highlight Box matching exact reference image */}
                <span className="inline-block relative px-2.5 sm:px-3.5 py-0.5 rounded-md bg-[#1a2348]/65 border border-indigo-500/20 shadow-[0_0_25px_rgba(99,102,241,0.2)]">
                  <span className="bg-gradient-to-r from-[#7a72f6] via-[#6d7bfb] to-[#48a5fa] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(122,114,246,0.4)]">
                    Photography, Videography & Editing
                  </span>
                </span>
              </span>
            </h1>
          </motion.div>

          {/* 3. Subtitle / Bio Description */}
          <motion.div variants={lineVariants} className="max-w-[500px] mx-auto px-2 z-10">
            <p className="text-xs sm:text-[13px] md:text-sm text-neutral-300/85 leading-[1.6] font-normal">
              Hi, I'm <strong className="text-white font-semibold">Mushfiq</strong>. I transform ideas into cinematic visuals through video editing, photography, videography, photo editing, and creative design.
            </p>
          </motion.div>

          {/* 4. Action CTA Buttons */}
          <motion.div variants={lineVariants} className="flex flex-wrap items-center justify-center gap-3 pt-1 sm:pt-1.5 z-10">
            {/* Primary Button: Explore My Work */}
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-xs sm:text-[13px] text-white tracking-wide bg-gradient-to-r from-[#7c75f8] to-[#4396fa] hover:from-[#6d66f5] hover:to-[#2b88f8] shadow-[0_0_24px_rgba(124,117,248,0.5)] hover:shadow-[0_0_36px_rgba(67,150,250,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span className="font-sans font-medium">Explore My Work</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Secondary Button: Let's Talk */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-xs sm:text-[13px] text-white bg-[#14151a]/90 hover:bg-[#1d1f27]/95 border border-white/10 hover:border-white/20 backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span className="font-sans font-medium">Let's Talk</span>
              <MessageSquare className="w-3.5 h-3.5 text-[#c084fc] group-hover:text-purple-300 transition-colors" />
            </a>
          </motion.div>
        </div>

        {/* 5. Featured Design Works Showcase Strip */}
        <motion.div
          variants={lineVariants}
          className="w-full max-w-[1060px] mx-auto mt-8 sm:mt-10 px-2 sm:px-4 z-10"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between px-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                Featured Design & Creative Works
              </span>
            </div>
            <a
              href="#projects"
              className="group inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-neutral-400 hover:text-white transition-colors"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Cards Grid: 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
            {FEATURED_DESIGN_WORKS.map((work) => (
              <a
                key={work.id}
                href={work.link}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-white/[0.01] bg-neutral-950/70 border border-white/[0.08] hover:border-indigo-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(99,102,241,0.22)] flex flex-col cursor-pointer text-left ring-1 ring-white/[0.02]"
              >
                {/* Thumbnail Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/25 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-2 left-2 text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded-full bg-neutral-950/80 border border-white/15 text-neutral-300 backdrop-blur-md">
                    {work.category}
                  </span>
                </div>

                {/* Card Info Bar */}
                <div className="p-2.5 sm:p-3 flex items-center justify-between gap-1.5">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11px] sm:text-xs font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                      {work.title}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-neutral-400 truncate">
                      {work.subtitle}
                    </p>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:border-indigo-400 transition-all duration-300">
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 6. Minimalist Scroll to Explore Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none select-none text-neutral-500 z-20"
      >
        <span className="text-[8px] sm:text-[9px] font-sans font-medium tracking-[0.25em] text-neutral-400/70 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-3 h-5 rounded-full border border-neutral-600/70 flex items-start justify-center p-0.5 backdrop-blur-sm">
          <div className="w-1 h-1.5 rounded-full bg-neutral-300 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
});
