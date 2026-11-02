import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../config/site';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 400);
      } else {
        setProgress(currentProgress);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  const brandName = "MUSHFII";

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.9, ease: [0.87, 0, 0.13, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-12 bg-[#0A0A0A] text-white select-none overflow-hidden"
        >
          {/* Top Info Bar */}
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-neutral-400 uppercase">
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-ping" />
              <span className="font-semibold text-white">MUSHFII PORTFOLIO</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden sm:flex items-center gap-2 text-neutral-400"
            >
              <span>CALICUT, IN</span>
              <span>•</span>
              <span className="text-[#2563EB] font-semibold">2026 EDITION</span>
            </motion.div>
          </div>

          {/* Center Brand Typography Reveal */}
          <div className="my-auto flex flex-col items-center justify-center text-center relative">
            {/* Ambient Background Radial Glow */}
            <div className="absolute w-[350px] h-[350px] bg-[#2563EB]/15 rounded-full blur-[120px] pointer-events-none" />

            {/* Glowing Ring Progress Indicator */}
            <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-neutral-800"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-[#2563EB]"
                  strokeWidth="4"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * progress) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                />
              </svg>
              <span className="absolute font-mono text-3xl font-bold tracking-tight text-white">
                {progress}%
              </span>
            </div>

            {/* Staggered Character Reveal for MUSHFII */}
            <div className="overflow-hidden flex items-center justify-center gap-1">
              {brandName.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-7xl font-bold tracking-tight text-white inline-block font-mono"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs sm:text-sm font-mono text-neutral-400 mt-3 uppercase tracking-widest"
            >
              {siteConfig.title}
            </motion.p>
          </div>

          {/* Bottom Progress Bar */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
              <span className="uppercase tracking-widest text-neutral-500">SYSTEM INITIALIZING</span>
              <span className="text-[#2563EB] font-semibold">LOADING ASSETS</span>
            </div>

            <div className="w-full h-[3px] bg-neutral-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2563EB] via-amber-500 to-[#2563EB] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
