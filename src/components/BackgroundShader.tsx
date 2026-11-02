import React, { useEffect, useState } from 'react';
import Aurora from './Aurora';

export function BackgroundShader() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Theme configuration
  const auroraColors: [string, string, string] = isDark
    ? ['#7C3AED', '#3B82F6', '#06B6D4'] // Dark Mode
    : ['#7C3AED', '#4F46E5', '#06B6D4']; // Light Mode

  return (
    <div
      className={`fixed inset-0 z-[-10] pointer-events-none overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-[#050816]' : 'bg-[#F8FAFC]'
      }`}
    >
      {/* Layer 1: Core Aurora WebGL Canvas with Blur */}
      <div className="absolute inset-0 filter blur-[90px] opacity-75 transform scale-105">
        <Aurora
          colorStops={auroraColors}
          speed={0.18}
          amplitude={0.65}
          blend={0.38}
        />
      </div>

      {/* Layer 2: Large Radial Light Glow (35% opacity near top center) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] pointer-events-none transition-opacity duration-700 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,rgba(124,58,237,0.35),transparent_70%)]'
            : 'bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,rgba(79,70,229,0.25),transparent_70%)]'
        }`}
      />

      {/* Layer 3: Edge Vignette (Soft edge dark/light fade) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,8,22,0.85)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(248,250,252,0.85)_100%)]'
        }`}
      />

      {/* Layer 4: Vertical Gradient Mask (Fade aurora toward the bottom of screen) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
          isDark
            ? 'bg-gradient-to-b from-transparent via-transparent 60% to-[#050816]'
            : 'bg-gradient-to-b from-transparent via-transparent 60% to-[#F8FAFC]'
        }`}
      />

      {/* Layer 5: Ultra-subtle Film Grain / Noise Overlay (< 3% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

