function PendingIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pendingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Clock circle */}
      <circle cx="32" cy="32" r="20" fill="url(#pendingGrad)" opacity="0.2" />
      <circle cx="32" cy="32" r="20" stroke="url(#pendingGrad)" strokeWidth="2.5" fill="none" />
      {/* Clock hands */}
      <line x1="32" y1="32" x2="32" y2="20" stroke="url(#pendingGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="32" x2="40" y2="32" stroke="url(#pendingGrad)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="32" cy="32" r="2" fill="url(#pendingGrad)" />
      {/* Hour markers */}
      <circle cx="32" cy="16" r="1.5" fill="url(#pendingGrad)" />
      <circle cx="32" cy="48" r="1.5" fill="url(#pendingGrad)" />
      <circle cx="48" cy="32" r="1.5" fill="url(#pendingGrad)" />
      <circle cx="16" cy="32" r="1.5" fill="url(#pendingGrad)" />
    </svg>
  );
}

export default PendingIcon;
