import { memo } from 'react';

const DefenseLayersDiagram = memo(function DefenseLayersDiagram() {
  const layers = [
    { label: 'Network Layer', controls: 'DAI • 802.1X • VLAN Segmentation', color: '#2dd68f', yOffset: 0 },
    { label: 'Protocol Layer', controls: 'TLS 1.3 • DNSSEC • HSTS', color: '#02a89a', yOffset: 90 },
    { label: 'Application Layer', controls: 'Certificate Pinning • Secure Cookies', color: '#2dd68f', yOffset: 180 },
    { label: 'Monitoring Layer', controls: 'IDS/IPS • SIEM • Traffic Analysis', color: '#02a89a', yOffset: 270 },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <svg viewBox="0 0 800 450" style={{ width: '100%', height: 'auto' }}>
        {/* Title */}
        <text x="400" y="30" fill="#2dd68f" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
          Defense in Depth: Multiple Protection Layers
        </text>

        {/* Defense layers */}
        {layers.map((layer, i) => (
          <g key={i} transform={`translate(0, ${layer.yOffset})`}>
            {/* Main box */}
            <rect
              x="100"
              y="60"
              width="600"
              height="70"
              rx="10"
              fill={`${layer.color}15`}
              stroke={layer.color}
              strokeWidth="2"
            />
            
            {/* Shield icon */}
            <circle cx="140" cy="95" r="20" fill={`${layer.color}30`} stroke={layer.color} strokeWidth="1.5" />
            <text x="140" y="103" fill={layer.color} fontSize="20" textAnchor="middle">🛡️</text>
            
            {/* Layer label */}
            <text x="180" y="88" fill="#e6e9f0" fontSize="15" fontWeight="700" fontFamily="'Sora', sans-serif">
              {layer.label}
            </text>
            
            {/* Controls */}
            <text x="180" y="110" fill="rgba(171, 207, 201, 0.8)" fontSize="13" fontFamily="'Oxanium', sans-serif">
              {layer.controls}
            </text>

            {/* Layer number */}
            <text x="670" y="100" fill={layer.color} fontSize="18" fontWeight="700" fontFamily="'Sora', sans-serif">
              {i + 1}
            </text>
          </g>
        ))}

        {/* Bottom note */}
        <text x="400" y="420" fill="rgba(171, 207, 201, 0.6)" fontSize="13" textAnchor="middle" fontFamily="'Oxanium', sans-serif" fontStyle="italic">
          No single layer provides complete protection — defense requires multiple controls
        </text>
      </svg>

      <style>{`
        @media (max-width: 768px) {
          svg text {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
});

export default DefenseLayersDiagram;
