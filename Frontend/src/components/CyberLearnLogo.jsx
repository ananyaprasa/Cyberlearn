function CyberLearnLogo({ className = '' }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield outline */}
      <path 
        d="M100 20 L160 40 L160 100 Q160 140 100 180 Q40 140 40 100 L40 40 Z" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3"
      />
      
      {/* Network nodes */}
      <circle cx="100" cy="70" r="6" fill="currentColor" />
      <circle cx="80" cy="100" r="6" fill="currentColor" />
      <circle cx="120" cy="100" r="6" fill="currentColor" />
      <circle cx="100" cy="130" r="6" fill="currentColor" />
      
      {/* Connecting lines */}
      <line x1="100" y1="70" x2="80" y2="100" stroke="currentColor" strokeWidth="2" />
      <line x1="100" y1="70" x2="120" y2="100" stroke="currentColor" strokeWidth="2" />
      <line x1="80" y1="100" x2="100" y2="130" stroke="currentColor" strokeWidth="2" />
      <line x1="120" y1="100" x2="100" y2="130" stroke="currentColor" strokeWidth="2" />
      
      {/* Key symbol in center */}
      <circle cx="100" cy="100" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="98" y="100" width="4" height="20" fill="currentColor" />
      <rect x="98" y="115" width="8" height="3" fill="currentColor" />
      <rect x="98" y="120" width="6" height="3" fill="currentColor" />
    </svg>
  );
}

export default CyberLearnLogo;
