export function AssignmentIcon({ size = 200, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes asgn-check { 0%,70%,100%{stroke-dashoffset:48} 35%{stroke-dashoffset:0} }
          @keyframes asgn-glow { 0%,100%{filter:drop-shadow(0 0 5px #fbbf24)} 50%{filter:drop-shadow(0 0 18px #fbbf24)} }
          @keyframes asgn-prog { 0%{width:0} 100%{width:52} }
          @keyframes asgn-line { 0%{opacity:.4} 50%{opacity:1} 100%{opacity:.4} }
          .asgn-wrap { animation: asgn-glow 3s ease-in-out infinite; }
          .asgn-check { stroke-dasharray: 48; animation: asgn-check 2.5s ease-in-out infinite; }
          .asgn-prog { animation: asgn-prog 2s ease-out infinite alternate; }
          .asgn-l1 { animation: asgn-line 2s ease-in-out infinite; }
          .asgn-l2 { animation: asgn-line 2s ease-in-out infinite 0.5s; }
          .asgn-l3 { animation: asgn-line 2s ease-in-out infinite 1s; }
        `}
      </style>
      <rect className="asgn-wrap" x="20" y="20" width="160" height="160" rx="32" fill="#44310a" stroke="#fbbf24" strokeWidth="2.5"/>
      <rect x="28" y="28" width="144" height="144" rx="26" fill="#523c0e"/>
      <rect x="55" y="55" width="90" height="105" rx="10" fill="#3a2808" stroke="#d97706" strokeWidth="1.5"/>
      <rect x="78" y="48" width="44" height="20" rx="8" fill="#44310a" stroke="#fbbf24" strokeWidth="1.8"/>
      <rect x="86" y="53" width="28" height="9" rx="4" fill="#3a2808"/>
      <rect x="64" y="74" width="18" height="18" rx="4" fill="#3a2808" stroke="#4ade80" strokeWidth="1.5"/>
      <polyline className="asgn-check" points="67,83 72,88 80,76" fill="none" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <line className="asgn-l1" x1="89" y1="83" x2="134" y2="83" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
      <rect x="64" y="100" width="18" height="18" rx="4" fill="#3a2808" stroke="#4ade80" strokeWidth="1.5"/>
      <polyline points="67,109 72,114 80,102" fill="none" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
      <line className="asgn-l2" x1="89" y1="109" x2="128" y2="109" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
      <rect x="64" y="126" width="18" height="18" rx="4" fill="#3a2808" stroke="#d97706" strokeWidth="1.5"/>
      <line className="asgn-l3" x1="89" y1="135" x2="122" y2="135" stroke="#d97706" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
      <rect x="64" y="150" width="72" height="6" rx="3" fill="#3a2808" stroke="#92400e" strokeWidth="1"/>
      <rect className="asgn-prog" x="64" y="150" width="52" height="6" rx="3" fill="#fbbf24"/>
    </svg>
  );
}
