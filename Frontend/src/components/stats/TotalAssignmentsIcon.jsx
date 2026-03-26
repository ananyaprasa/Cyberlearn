export function TotalAssignmentsIcon({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes ta-glow  { 0%,100%{filter:drop-shadow(0 0 4px #4ade80)} 50%{filter:drop-shadow(0 0 16px #4ade80)} }
          @keyframes ta-scan  { 0%{stroke-dashoffset:60} 100%{stroke-dashoffset:0} }
          @keyframes ta-ping  { 0%,100%{r:5;opacity:.8} 50%{r:8;opacity:.2} }
          .ta-wrap { animation: ta-glow 3s ease-in-out infinite; }
          .ta-l1   { stroke-dasharray:40 8; animation: ta-scan 2s linear infinite; }
          .ta-l2   { stroke-dasharray:40 8; animation: ta-scan 2s linear infinite .5s; }
          .ta-ping { animation: ta-ping 2s ease-in-out infinite; }
        `}
      </style>
      <g className="ta-wrap">
        <rect x="70" y="30" width="88" height="112" rx="10" fill="#1a4028" stroke="#4ade80" strokeWidth="1.5" opacity="0.4"/>
        <rect x="55" y="44" width="88" height="112" rx="10" fill="#1a4028" stroke="#4ade80" strokeWidth="1.5" opacity="0.65"/>
        <rect x="40" y="58" width="88" height="112" rx="10" fill="#0f2e1e" stroke="#4ade80" strokeWidth="2"/>
        <line className="ta-l1" x1="56" y1="88" x2="112" y2="88" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
        <line className="ta-l2" x1="56" y1="106" x2="112" y2="106" stroke="#86efac" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        <line x1="56" y1="124" x2="90" y2="124" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <circle cx="148" cy="68" r="30" fill="#0a1f14" stroke="#4ade80" strokeWidth="2"/>
        <circle className="ta-ping" cx="148" cy="68" r="5" fill="#4ade80"/>
        <rect x="135" y="70" width="26" height="18" rx="4" fill="#4ade80" opacity="0.9"/>
        <path d="M138 70 V63 a10 10 0 0 1 20 0 V70" stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="148" cy="78" r="3" fill="#0a1f14"/>
      </g>
    </svg>
  );
}
