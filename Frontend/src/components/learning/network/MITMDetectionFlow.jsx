import { memo } from 'react';

const MITMDetectionFlow = memo(function MITMDetectionFlow() {
  const stages = [
    { id: 1, label: 'Baseline Monitoring', description: 'Normal network state', color: '#2dd68f', type: 'normal' },
    { id: 2, label: 'Anomaly Detection', description: 'Suspicious pattern identified', color: '#ff8800', type: 'alert' },
    { id: 3, label: 'Evidence Collection', description: 'Gather forensic data', color: '#02a89a', type: 'investigation' },
    { id: 4, label: 'Analysis', description: 'Confirm MITM indicators', color: '#2dd68f', type: 'analysis' },
    { id: 5, label: 'Response', description: 'Isolate and remediate', color: '#ff4646', type: 'response' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '850px', margin: '0 auto' }}>
      <svg viewBox="0 0 850 620" style={{ width: '100%', height: 'auto' }}>
        {/* Flow lines */}
        {stages.slice(0, -1).map((_, i) => (
          <g key={`line-${i}`}>
            <line
              x1="425"
              y1={80 + i * 110}
              x2="425"
              y2={120 + i * 110}
              stroke="rgba(45, 214, 143, 0.4)"
              strokeWidth="3"
            />
            <polygon
              points="425,120 420,110 430,110"
              fill="#2dd68f"
              transform={`translate(0, ${i * 110})`}
            />
          </g>
        ))}

        {/* Stage boxes */}
        {stages.map((stage, i) => (
          <g key={stage.id} transform={`translate(0, ${i * 110})`}>
            {/* Box */}
            <rect
              x="150"
              y="20"
              width="550"
              height="60"
              rx="12"
              fill="rgba(10, 15, 25, 0.8)"
              stroke={stage.color}
              strokeWidth="2"
            />
            
            {/* Stage number */}
            <circle cx="195" cy="50" r="22" fill={`${stage.color}30`} stroke={stage.color} strokeWidth="2" />
            <text x="195" y="57" fill={stage.color} fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
              {stage.id}
            </text>
            
            {/* Label */}
            <text x="240" y="45" fill="#e6e9f0" fontSize="17" fontWeight="700" fontFamily="'Sora', sans-serif">
              {stage.label}
            </text>
            
            {/* Description */}
            <text x="240" y="65" fill="rgba(171, 207, 201, 0.7)" fontSize="13" fontFamily="'Oxanium', sans-serif">
              {stage.description}
            </text>

            {/* Type icon */}
            {stage.type === 'alert' && (
              <text x="670" y="57" fill={stage.color} fontSize="24">⚠️</text>
            )}
            {stage.type === 'response' && (
              <text x="670" y="57" fill={stage.color} fontSize="24">🛡️</text>
            )}
            {stage.type === 'investigation' && (
              <text x="670" y="57" fill={stage.color} fontSize="24">🔍</text>
            )}
            {stage.type === 'analysis' && (
              <text x="670" y="57" fill={stage.color} fontSize="24">📊</text>
            )}
            {stage.type === 'normal' && (
              <text x="670" y="57" fill={stage.color} fontSize="24">✓</text>
            )}
          </g>
        ))}

        {/* Detection Indicators */}
        <g transform="translate(0, 570)">
          <rect x="50" y="0" width="750" height="40" rx="6" fill="rgba(2, 168, 154, 0.1)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
          <text x="425" y="25" fill="#02a89a" fontSize="13" fontWeight="600" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Key Indicators: ARP cache duplicates • Certificate warnings • Unexpected MAC changes • HTTP downgrade
          </text>
        </g>
      </svg>

      <style>{`
        @media (max-width: 768px) {
          svg text {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
});

export default MITMDetectionFlow;
