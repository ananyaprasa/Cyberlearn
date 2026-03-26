export function PendingGradingIcon({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes pg-tick { 0%,100%{transform:rotate(0deg)} 20%{transform:rotate(-15deg)} 60%{transform:rotate(10deg)} }
          @keyframes pg-glow { 0%,100%{filter:drop-shadow(0 0 4px #fb923c)} 50%{filter:drop-shadow(0 0 16px #fb923c)} }
          @keyframes pg-pulse{ 0%,100%{opacity:.5;r:5} 50%{opacity:1;r:7} }
          .pg-wrap  { animation: pg-glow 3s ease-in-out infinite; }
          .pg-clock { animation: pg-tick 2.8s ease-in-out infinite; transform-origin:100px 108px; }
          .pg-dot   { animation: pg-pulse 1.5s ease-in-out infinite; }
        `}
      </style>
      <g className="pg-wrap">
        <g className="pg-clock">
          <circle cx="100" cy="108" r="70" fill="#3a2008" stroke="#fb923c" strokeWidth="2.5"/>
          <circle cx="100" cy="108" r="58" fill="#2a1600" stroke="#fb923c" strokeWidth="1" opacity="0.3"/>
          <line x1="100" y1="44"  x2="100" y2="54"  stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
          <line x1="100" y1="162" x2="100" y2="172" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
          <line x1="36"  y1="108" x2="46"  y2="108" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
          <line x1="154" y1="108" x2="164" y2="108" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
          <line x1="100" y1="108" x2="100" y2="66" stroke="#fb923c" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="100" y1="108" x2="128" y2="120" stroke="#fdba74" strokeWidth="3.5" strokeLinecap="round"/>
          <circle className="pg-dot" cx="100" cy="108" r="5" fill="#fb923c"/>
        </g>
        <path d="M100 6 L132 56 L68 56 Z" fill="#fb923c" opacity="0.95"/>
        <line x1="100" y1="20" x2="100" y2="40" stroke="#3a2008" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="100" cy="47" r="3" fill="#3a2008"/>
      </g>
    </svg>
  );
}
