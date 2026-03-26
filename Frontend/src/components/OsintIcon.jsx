export function OsintIcon({ size = 200, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes osint-scan { 0%,100%{opacity:.2} 50%{opacity:1} }
          @keyframes osint-rotate { from{transform-origin:85px 85px;transform:rotate(0deg)} to{transform-origin:85px 85px;transform:rotate(360deg)} }
          @keyframes osint-ping { 0%,100%{r:18;opacity:.8} 50%{r:26;opacity:.2} }
          .osint-ring1{animation:osint-ping 2s ease-in-out infinite}
          .osint-ring2{animation:osint-ping 2s ease-in-out infinite .5s}
          .osint-handle{animation:osint-rotate 8s linear infinite}
          .osint-dot1{animation:osint-scan 1.5s ease-in-out infinite}
          .osint-dot2{animation:osint-scan 1.5s ease-in-out infinite .3s}
          .osint-dot3{animation:osint-scan 1.5s ease-in-out infinite .6s}
        `}
      </style>
      <circle cx="85" cy="85" r="60" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.2"/>
      <circle className="osint-ring1" cx="85" cy="85" r="18" fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
      <circle className="osint-ring2" cx="85" cy="85" r="26" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.5"/>
      <circle cx="85" cy="85" r="46" fill="#0a1628" stroke="#3b82f6" strokeWidth="2.5"/>
      <circle cx="85" cy="85" r="38" fill="#0d1f3c" stroke="#1d4ed8" strokeWidth="1.5"/>
      <line x1="85" y1="55" x2="85" y2="65" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="85" y1="105" x2="85" y2="115" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="55" y1="85" x2="65" y2="85" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="105" y1="85" x2="115" y2="85" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="85" cy="85" r="4" fill="#60a5fa"/>
      <circle className="osint-dot1" cx="70" cy="72" r="3" fill="#93c5fd"/>
      <circle className="osint-dot2" cx="98" cy="78" r="2.5" fill="#60a5fa"/>
      <circle className="osint-dot3" cx="75" cy="96" r="2" fill="#3b82f6"/>
      <g className="osint-handle">
        <line x1="121" y1="121" x2="155" y2="155" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round"/>
        <line x1="121" y1="121" x2="155" y2="155" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      </g>
    </svg>
  );
}
