import React, { memo } from 'react';
import { FloatingParticles } from './FloatingParticles';

export const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div
      className="absolute inset-0 bg-[#030305] overflow-hidden pointer-events-none select-none"
      style={{ contain: 'strict' }}
    >
      {/* Cool Cosmic Indigo & Violet Ambient Glows matching exact hero reference */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1100px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12)_0%,rgba(56,189,248,0.06)_40%,transparent_75%)] transform-gpu blur-2xl"
      />

      <div
        className="absolute -top-32 -left-20 w-[55vw] max-w-[700px] h-[55vw] max-h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1)_0%,rgba(99,102,241,0.04)_45%,transparent_70%)] transform-gpu blur-3xl"
      />

      <div
        className="absolute -bottom-32 -right-20 w-[60vw] max-w-[750px] h-[60vw] max-h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0%,rgba(99,102,241,0.04)_45%,transparent_70%)] transform-gpu blur-3xl"
      />

      {/* Floating Starlight Particles */}
      <FloatingParticles />

      {/* Vignette Overlays for deep contrast and typography readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-[#030305]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#030305_95%)]" />

      {/* Subtle Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
});
