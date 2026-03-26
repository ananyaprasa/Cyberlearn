export function NetworkSecurityIcon({ size = 200, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes net-pulse{0%,100%{opacity:.5;r:5}50%{opacity:1;r:7}}
          @keyframes net-flow{0%{stroke-dashoffset:30}100%{stroke-dashoffset:0}}
          @keyframes net-shield{0%,100%{filter:drop-shadow(0 0 5px #06b6d4)}50%{filter:drop-shadow(0 0 15px #06b6d4)}}
          .net-node{animation:net-pulse 2s ease-in-out infinite}
          .net-n2{animation:net-pulse 2s ease-in-out infinite .4s}
          .net-n3{animation:net-pulse 2s ease-in-out infinite .8s}
          .net-n4{animation:net-pulse 2s ease-in-out infinite 1.2s}
          .net-edge{animation:net-flow 1.8s linear infinite;stroke-dasharray:5 4}
          .net-shield{animation:net-shield 3s ease-in-out infinite}
        `}
      </style>
      <path className="net-shield" d="M100 18 L145 38 L145 90 C145 125 124 148 100 158 C76 148 55 125 55 90 L55 38 Z" fill="#041e26" stroke="#06b6d4" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M100 28 L138 45 L138 90 C138 120 120 140 100 150 C80 140 62 120 62 90 L62 45 Z" fill="#062330" opacity="0.7"/>
      <circle className="net-node" cx="100" cy="85" r="5" fill="#22d3ee"/>
      <circle className="net-n2" cx="78" cy="68" r="5" fill="#06b6d4"/>
      <circle className="net-n3" cx="122" cy="68" r="5" fill="#06b6d4"/>
      <circle className="net-n4" cx="100" cy="110" r="5" fill="#06b6d4"/>
      <circle cx="82" cy="102" r="4" fill="#0e7490" opacity="0.8"/>
      <circle cx="118" cy="102" r="4" fill="#0e7490" opacity="0.8"/>
      <line className="net-edge" x1="100" y1="85" x2="78" y2="68" stroke="#22d3ee" strokeWidth="1.5"/>
      <line className="net-edge" x1="100" y1="85" x2="122" y2="68" stroke="#22d3ee" strokeWidth="1.5"/>
      <line className="net-edge" x1="100" y1="85" x2="100" y2="110" stroke="#22d3ee" strokeWidth="1.5"/>
      <line className="net-edge" x1="100" y1="85" x2="82" y2="102" stroke="#22d3ee" strokeWidth="1" opacity="0.7"/>
      <line className="net-edge" x1="100" y1="85" x2="118" y2="102" stroke="#22d3ee" strokeWidth="1" opacity="0.7"/>
      <line x1="78" y1="68" x2="122" y2="68" stroke="#0e7490" strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}
