import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextDark = !isDark;
    
    // View Transitions API liquid reveal
    if ('startViewTransition' in document && typeof (document as any).startViewTransition === 'function') {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(() => {
        setIsDark(nextDark);
        if (nextDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        document.documentElement.animate(
          {
            clipPath: nextDark ? clipPath : [...clipPath].reverse()
          },
          {
            duration: 600,
            easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
            pseudoElement: nextDark
              ? '::view-transition-new(root)'
              : '::view-transition-old(root)'
          }
        );
      });
    } else {
      setIsDark(nextDark);
      if (nextDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light/dark theme"
      className="relative p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 hover:scale-110 active:scale-90 transition-all duration-200 shadow-sm cursor-pointer group overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative z-10 flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-amber-300 fill-amber-300/20" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
        )}
      </motion.div>
    </button>
  );
}
