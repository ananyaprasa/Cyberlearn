export function ProfileIcon({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        {/* Main background gradient: teal to emerald */}
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1de8b5" stopOpacity="1"/>
          <stop offset="100%" stopColor="#0d7a5f" stopOpacity="1"/>
        </linearGradient>
        {/* Inner glow overlay */}
        <radialGradient id="glowOverlay" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </radialGradient>
        {/* Soft drop shadow filter */}
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0a4a38" floodOpacity="0.45"/>
        </filter>
        {/* Glow filter for the icon silhouette */}
        <filter id="iconGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        {/* Clip to rounded square */}
        <clipPath id="roundedClip">
          <rect width="64" height="64" rx="16" ry="16"/>
        </clipPath>
      </defs>
      {/* Outer container with shadow */}
      <rect width="64" height="64" rx="16" ry="16"
        fill="url(#bgGrad)"
        filter="url(#softShadow)"/>
      {/* Subtle inner glow layer */}
      <rect width="64" height="64" rx="16" ry="16"
        fill="url(#glowOverlay)"
        clipPath="url(#roundedClip)"/>
      {/* Fine top-edge highlight for depth */}
      <rect x="1" y="1" width="62" height="30" rx="15" ry="15"
        fill="#ffffff" fillOpacity="0.07"
        clipPath="url(#roundedClip)"/>
      {/* Profile silhouette (head + shoulders), centered */}
      <g filter="url(#iconGlow)">
        {/* Head */}
        <circle cx="32" cy="23" r="9"
          fill="#e0fff7" fillOpacity="0.95"/>
        {/* Shoulders / body arc */}
        <path d="M13,50 C13,37 51,37 51,50"
          fill="#e0fff7" fillOpacity="0.95"/>
      </g>
    </svg>
  );
}
