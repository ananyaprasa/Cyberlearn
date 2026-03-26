function SubmittedIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="submittedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      {/* Document */}
      <rect x="16" y="8" width="32" height="48" rx="2" fill="url(#submittedGrad)" opacity="0.2" />
      <rect x="16" y="8" width="32" height="48" rx="2" stroke="url(#submittedGrad)" strokeWidth="2" fill="none" />
      {/* Lines */}
      <line x1="22" y1="18" x2="42" y2="18" stroke="url(#submittedGrad)" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="26" x2="42" y2="26" stroke="url(#submittedGrad)" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="34" x2="36" y2="34" stroke="url(#submittedGrad)" strokeWidth="2" strokeLinecap="round" />
      {/* Checkmark */}
      <circle cx="32" cy="44" r="8" fill="url(#submittedGrad)" opacity="0.3" />
      <path d="M28 44 L31 47 L36 41" stroke="url(#submittedGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default SubmittedIcon;
