import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface Pill {
  label: string;
  depth: number;
  initialX: number; // percentage
  initialY: number; // percentage
}

interface ParallaxPillsProps {
  pills: Pill[];
}

export function ParallaxPills({ pills }: ParallaxPillsProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-full">
      {pills.map((pill, idx) => (
        <motion.div
          key={idx}
          className="absolute z-10 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-semibold shadow-xl backdrop-blur-md whitespace-nowrap pointer-events-auto cursor-default"
          style={{
            top: `${pill.initialY}%`,
            left: `${pill.initialX}%`,
            x: useSpring(useMotionValue(0), { stiffness: 40, damping: 15 }),
            y: useSpring(useMotionValue(0), { stiffness: 40, damping: 15 })
          }}
          animate={{
            y: [0, -8, 0],
            rotate: [0, idx % 2 === 0 ? 3 : -3, 0]
          }}
          transition={{
            duration: 4 + idx,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-2" />
          {pill.label}
        </motion.div>
      ))}
    </div>
  );
}
