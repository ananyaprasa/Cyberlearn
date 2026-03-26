export function CTFIcon({ size = 200, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes ctf-wave{0%,100%{d:path("M80 70 Q90 60 100 70 Q110 80 120 70")}50%{d:path("M80 65 Q90 78 100 65 Q110 52 120 65")}}
          @keyframes ctf-glow{0%,100%{filter:drop-shadow(0 0 4px #f97316)}50%{filter:drop-shadow(0 0 16px #f97316)}}
          @keyframes ctf-rise{0%{transform:translateY(4px)}50%{transform:translateY(-2px)}100%{transform:translateY(4px)}}
          .ctf-flag{animation:ctf-glow 2s ease-in-out infinite}
          .ctf-pole-group{animation:ctf-rise 3s ease-in-out infinite}
        `}
      </style>
      <g className="ctf-pole-group">
        <line x1="75" y1="40" x2="75" y2="155" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
        <line x1="75" y1="40" x2="75" y2="155" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <path className="ctf-flag" d="M75 42 L148 58 L148 100 L75 116 Z" fill="#f97316"/>
        <path d="M75 42 L148 58 L148 100 L75 116 Z" fill="url(#ctf-stripe)" opacity="0.3"/>
        <defs>
          <pattern id="ctf-stripe" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(45)">
            <rect width="6" height="12" fill="rgba(0,0,0,0.3)"/>
          </pattern>
        </defs>
        <text x="111" y="84" textAnchor="middle" fill="white" fontSize="16" fontFamily="'Share Tech Mono', monospace" fontWeight="bold" opacity="0.9">CTF</text>
        <path d="M75 42 L148 58 L148 65 L75 52 Z" fill="white" opacity="0.1"/>
        <ellipse cx="75" cy="155" rx="16" ry="6" fill="#431407" stroke="#f97316" strokeWidth="1.5"/>
      </g>
      <text x="48" y="60" fill="#fb923c" fontSize="12" opacity="0.6">★</text>
      <text x="152" y="50" fill="#f97316" fontSize="10" opacity="0.5">★</text>
      <text x="155" y="112" fill="#fb923c" fontSize="8" opacity="0.4">★</text>
    </svg>
  );
}
