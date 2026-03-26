function TotalPointsIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pointsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* Trophy base */}
      <rect x="26" y="48" width="12" height="6" rx="1" fill="url(#pointsGrad)" opacity="0.3" />
      <rect x="22" y="54" width="20" height="4" rx="2" fill="url(#pointsGrad)" />
      {/* Trophy stem */}
      <rect x="30" y="42" width="4" height="8" fill="url(#pointsGrad)" opacity="0.5" />
      {/* Trophy cup */}
      <path d="M18 18 L18 26 C18 32 22 36 32 36 C42 36 46 32 46 26 L46 18 Z" fill="url(#pointsGrad)" opacity="0.2" />
      <path d="M18 18 L18 26 C18 32 22 36 32 36 C42 36 46 32 46 26 L46 18" stroke="url(#pointsGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Top rim */}
      <line x1="16" y1="18" x2="48" y2="18" stroke="url(#pointsGrad)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Handles */}
      <path d="M16 18 C12 18 10 20 10 24 C10 26 11 28 14 28" stroke="url(#pointsGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M48 18 C52 18 54 20 54 24 C54 26 53 28 50 28" stroke="url(#pointsGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Star on cup */}
      <path d="M32 24 L33.5 28 L37.5 28 L34.5 30.5 L35.5 34 L32 31.5 L28.5 34 L29.5 30.5 L26.5 28 L30.5 28 Z" fill="url(#pointsGrad)" opacity="0.6" />
    </svg>
  );
}

export default TotalPointsIcon;
