export function ReconIcon({ size = 200, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes recon-spin{from{transform-origin:100px 100px;transform:rotate(0deg)}to{transform-origin:100px 100px;transform:rotate(360deg)}}
          @keyframes recon-pulse{0%,100%{opacity:.3;r:6}50%{opacity:1;r:8}}
          @keyframes recon-sweep{0%{opacity:0}10%{opacity:.8}100%{opacity:0;transform-origin:100px 100px;transform:rotate(360deg)}}
          .recon-outer{animation:recon-spin 12s linear infinite}
          .recon-sweep{animation:recon-sweep 3s linear infinite}
          .recon-blip1{animation:recon-pulse 2s ease-in-out infinite}
          .recon-blip2{animation:recon-pulse 2s ease-in-out infinite .7s}
          .recon-blip3{animation:recon-pulse 2s ease-in-out infinite 1.4s}
        `}
      </style>
      <circle cx="100" cy="100" r="80" fill="none" stroke="#166534" strokeWidth="1" opacity="0.3"/>
      <circle cx="100" cy="100" r="65" fill="#071a0f" stroke="#16a34a" strokeWidth="2"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.4"/>
      <circle cx="100" cy="100" r="35" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.3"/>
      <circle cx="100" cy="100" r="18" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.2"/>
      <line x1="100" y1="35" x2="100" y2="165" stroke="#22c55e" strokeWidth="0.8" opacity="0.25"/>
      <line x1="35" y1="100" x2="165" y2="100" stroke="#22c55e" strokeWidth="0.8" opacity="0.25"/>
      <g className="recon-outer">
        <circle cx="100" cy="35" r="5" fill="#22c55e" opacity="0.6"/>
        <circle cx="165" cy="100" r="5" fill="#22c55e" opacity="0.6"/>
      </g>
      <g className="recon-sweep">
        <path d="M100 100 L100 35 A65 65 0 0 1 156 132 Z" fill="#22c55e" opacity="0.08"/>
        <line x1="100" y1="100" x2="100" y2="35" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <circle className="recon-blip1" cx="118" cy="72" r="6" fill="#4ade80"/>
      <circle className="recon-blip2" cx="82" cy="115" r="6" fill="#22c55e"/>
      <circle className="recon-blip3" cx="130" cy="108" r="6" fill="#86efac"/>
      <circle cx="100" cy="100" r="4" fill="#4ade80"/>
    </svg>
  );
}
