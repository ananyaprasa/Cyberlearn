export function TotalSubmissionsIcon({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes ts-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes ts-glow  { 0%,100%{filter:drop-shadow(0 0 4px #38bdf8)} 50%{filter:drop-shadow(0 0 16px #38bdf8)} }
          @keyframes ts-arrow { 0%,100%{opacity:.4;transform:translateY(-4px)} 50%{opacity:1;transform:translateY(4px)} }
          .ts-wrap  { animation: ts-glow 3s ease-in-out infinite; }
          .ts-doc   { animation: ts-float 2.5s ease-in-out infinite; }
          .ts-arrow { animation: ts-arrow 1.6s ease-in-out infinite; }
        `}
      </style>
      <g className="ts-wrap">
        <rect x="20" y="138" width="160" height="38" rx="10" fill="#0d2535" stroke="#38bdf8" strokeWidth="2"/>
        <line x1="36" y1="157" x2="90" y2="157" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.55"/>
        <circle cx="148" cy="157" r="8" fill="#38bdf8" opacity="0.3"/>
        <g className="ts-doc">
          <rect x="62" y="22" width="76" height="96" rx="10" fill="#0d2535" stroke="#38bdf8" strokeWidth="2"/>
          <line x1="80" y1="48" x2="120" y2="48" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.85"/>
          <line x1="80" y1="65" x2="120" y2="65" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.65"/>
          <line x1="80" y1="82" x2="105" y2="82" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
        </g>
        <g className="ts-arrow">
          <line x1="100" y1="118" x2="100" y2="140" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round"/>
          <path d="M86 130 L100 145 L114 130" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </g>
    </svg>
  );
}
