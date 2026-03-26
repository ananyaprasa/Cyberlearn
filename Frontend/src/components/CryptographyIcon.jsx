export function CryptographyIcon({ size = 200, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes crypto-glow{0%,100%{filter:drop-shadow(0 0 4px #a855f7)}50%{filter:drop-shadow(0 0 14px #a855f7)}}
          @keyframes crypto-flow{0%{stroke-dashoffset:60}100%{stroke-dashoffset:0}}
          @keyframes crypto-spin{from{transform-origin:100px 78px;transform:rotate(0deg)}to{transform-origin:100px 78px;transform:rotate(360deg)}}
          .crypto-lock{animation:crypto-glow 2.5s ease-in-out infinite}
          .crypto-bit1{animation:crypto-flow 1.5s linear infinite;stroke-dasharray:6 4}
          .crypto-bit2{animation:crypto-flow 1.5s linear infinite .5s;stroke-dasharray:6 4}
          .crypto-gear{animation:crypto-spin 6s linear infinite}
        `}
      </style>
      <polygon points="100,20 130,38 130,74 100,92 70,74 70,38" fill="#1a0a2e" stroke="#7c3aed" strokeWidth="1.5" className="crypto-lock"/>
      <polygon points="100,30 122,43 122,69 100,82 78,69 78,43" fill="#120820" stroke="#9333ea" strokeWidth="1"/>
      <path d="M82 62 L82 50 A18 18 0 0 1 118 50 L118 62" stroke="#a855f7" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <rect x="72" y="62" width="56" height="44" rx="8" fill="#1e0a3c" stroke="#a855f7" strokeWidth="2"/>
      <circle cx="100" cy="80" r="7" fill="#a855f7" opacity="0.8"/>
      <rect x="96.5" y="80" width="7" height="12" rx="3" fill="#a855f7" opacity="0.8"/>
      <text className="crypto-bit1" x="36" y="95" fill="#c084fc" fontSize="9" fontFamily="monospace" opacity="0.7">10110</text>
      <text className="crypto-bit2" x="130" y="85" fill="#c084fc" fontSize="9" fontFamily="monospace" opacity="0.7">01001</text>
      <text x="42" y="115" fill="#7c3aed" fontSize="8" fontFamily="monospace" opacity="0.5">11010</text>
      <text x="126" y="110" fill="#7c3aed" fontSize="8" fontFamily="monospace" opacity="0.5">00101</text>
      <g className="crypto-gear" opacity="0.3">
        <circle cx="100" cy="150" r="14" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 3"/>
      </g>
    </svg>
  );
}
