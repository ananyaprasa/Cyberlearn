export function DashboardIcon({ size = 200, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes db-bar1 { 0%,100%{height:38px;y:82px} 50%{height:52px;y:68px} }
          @keyframes db-bar2 { 0%,100%{height:58px;y:62px} 50%{height:44px;y:76px} }
          @keyframes db-bar3 { 0%,100%{height:28px;y:92px} 50%{height:46px;y:74px} }
          @keyframes db-glow { 0%,100%{filter:drop-shadow(0 0 5px #fb923c)} 50%{filter:drop-shadow(0 0 18px #fb923c)} }
          @keyframes db-line { 0%{stroke-dashoffset:80} 100%{stroke-dashoffset:0} }
          .db-bar1 { animation: db-bar1 2s ease-in-out infinite; }
          .db-bar2 { animation: db-bar2 2s ease-in-out infinite 0.3s; }
          .db-bar3 { animation: db-bar3 2s ease-in-out infinite 0.6s; }
          .db-wrap { animation: db-glow 3s ease-in-out infinite; }
          .db-line { stroke-dasharray: 80; animation: db-line 2s linear infinite; }
        `}
      </style>
      <rect className="db-wrap" x="20" y="20" width="160" height="160" rx="32" fill="#4a2408" stroke="#fb923c" strokeWidth="2.5"/>
      <rect x="28" y="28" width="144" height="144" rx="26" fill="#5c300e"/>
      <line x1="40" y1="120" x2="160" y2="120" stroke="#fb923c" strokeWidth="0.8" opacity="0.2"/>
      <line x1="40" y1="100" x2="160" y2="100" stroke="#fb923c" strokeWidth="0.8" opacity="0.13"/>
      <line x1="40" y1="122" x2="160" y2="122" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
      <rect className="db-bar1" x="52" y="82" width="26" height="38" rx="5" fill="#fb923c"/>
      <rect className="db-bar2" x="87" y="62" width="26" height="58" rx="5" fill="#fdba74"/>
      <rect className="db-bar3" x="122" y="92" width="26" height="28" rx="5" fill="#fed7aa"/>
      <polyline className="db-line" points="52,95 87,78 122,100 155,68" fill="none" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="155" cy="68" r="4" fill="#fde68a"/>
    </svg>
  );
}
