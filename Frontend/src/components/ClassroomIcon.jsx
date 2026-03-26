export function ClassroomIcon({ size = 200, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes cls-mortar { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
          @keyframes cls-glow { 0%,100%{filter:drop-shadow(0 0 5px #818cf8)} 50%{filter:drop-shadow(0 0 18px #818cf8)} }
          @keyframes cls-beam { 0%{opacity:.3} 50%{opacity:.9} 100%{opacity:.3} }
          @keyframes cls-dot1 { 0%,100%{opacity:.5} 33%{opacity:1} }
          @keyframes cls-dot2 { 0%,100%{opacity:.5} 66%{opacity:1} }
          @keyframes cls-dot3 { 0%,100%{opacity:.5} 100%{opacity:1} }
          .cls-wrap { animation: cls-glow 3s ease-in-out infinite; }
          .cls-mortar { animation: cls-mortar 3s ease-in-out infinite; transform-origin: 100px 75px; }
          .cls-beam { animation: cls-beam 2s ease-in-out infinite; }
          .cls-d1 { animation: cls-dot1 1.5s ease-in-out infinite; }
          .cls-d2 { animation: cls-dot2 1.5s ease-in-out infinite; }
          .cls-d3 { animation: cls-dot3 1.5s ease-in-out infinite; }
        `}
      </style>
      <rect className="cls-wrap" x="20" y="20" width="160" height="160" rx="32" fill="#2e2a5e" stroke="#818cf8" strokeWidth="2.5"/>
      <rect x="28" y="28" width="144" height="144" rx="26" fill="#383472"/>
      <g className="cls-mortar">
        <polygon points="100,44 152,64 100,84 48,64" fill="#818cf8"/>
        <polygon points="100,44 152,64 100,84 48,64" fill="#c7d2fe" opacity="0.25"/>
        <ellipse cx="100" cy="84" rx="24" ry="8" fill="#6366f1"/>
        <rect x="76" y="64" width="48" height="20" rx="2" fill="#4f46e5"/>
        <ellipse cx="100" cy="64" rx="24" ry="8" fill="#818cf8"/>
        <line x1="152" y1="64" x2="152" y2="95" stroke="#c7d2fe" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="152" cy="98" r="6" fill="#a5b4fc"/>
        <line x1="148" y1="98" x2="145" y2="110" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="152" y1="99" x2="152" y2="112" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="156" y1="98" x2="159" y2="110" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <circle className="cls-d1" cx="80" cy="138" r="7" fill="#818cf8"/>
      <circle className="cls-d2" cx="100" cy="138" r="7" fill="#a5b4fc"/>
      <circle className="cls-d3" cx="120" cy="138" r="7" fill="#c7d2fe"/>
      <line className="cls-beam" x1="60" y1="112" x2="140" y2="112" stroke="#818cf8" strokeWidth="1" strokeDasharray="4 3"/>
    </svg>
  );
}
