import React from 'react';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="256" cy="256" r="256" fill="#000000" />
      {/* Shape 1: Diamond */}
      <path
        d="M 144 216 L 184 288 L 144 360 L 104 288 Z"
        fill="#FFFFFF"
      />
      {/* Shape 2: Middle Ribbon */}
      <path
        d="M 172 152 H 236 L 212 192 L 312 288 L 256 360 L 228 288 L 184 216 Z"
        fill="#FFFFFF"
      />
      {/* Shape 3: Right Ribbon */}
      <path
        d="M 284 152 H 348 L 324 192 L 424 288 L 368 360 L 340 288 L 296 216 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default Logo;