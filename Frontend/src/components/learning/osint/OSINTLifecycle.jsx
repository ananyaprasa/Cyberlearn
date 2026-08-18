import { memo } from 'react';

const OSINTLifecycle = memo(function OSINTLifecycle() {
  const stages = [
    { id: 1, label: 'Question', description: 'Define objective', color: '#2dd68f' },
    { id: 2, label: 'Planning', description: 'Identify sources', color: '#02a89a' },
    { id: 3, label: 'Collection', description: 'Gather data', color: '#2dd68f' },
    { id: 4, label: 'Verification', description: 'Validate sources', color: '#02a89a' },
    { id: 5, label: 'Analysis', description: 'Extract intelligence', color: '#2dd68f' },
    { id: 6, label: 'Reporting', description: 'Document findings', color: '#02a89a' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <svg viewBox="0 0 800 600" style={{ width: '100%', height: 'auto' }}>
        {/* Flow lines */}
        {stages.slice(0, -1).map((_, i) => (
          <g key={`line-${i}`}>
            <line
              x1="400"
              y1={80 + i * 100}
              x2="400"
              y2={120 + i * 100}
              stroke="rgba(45, 214, 143, 0.3)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <polygon
              points="400,120 395,115 405,115"
              fill="#2dd68f"
              transform={`translate(0, ${i * 100})`}
            />
          </g>
        ))}

        {/* Stage boxes */}
        {stages.map((stage, i) => (
          <g key={stage.id} transform={`translate(0, ${i * 100})`}>
            {/* Box */}
            <rect
              x="200"
              y="20"
              width="400"
              height="60"
              rx="12"
              fill="rgba(10, 15, 25, 0.8)"
              stroke={stage.color}
              strokeWidth="2"
            />
            {/* Stage number */}
            <circle cx="230" cy="50" r="18" fill={`${stage.color}30`} stroke={stage.color} strokeWidth="2" />
            <text x="230" y="56" fill={stage.color} fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
              {stage.id}
            </text>
            {/* Label */}
            <text x="270" y="48" fill="#e6e9f0" fontSize="18" fontWeight="700" fontFamily="'Sora', sans-serif">
              {stage.label}
            </text>
            {/* Description */}
            <text x="270" y="65" fill="rgba(171, 207, 201, 0.7)" fontSize="14" fontFamily="'Oxanium', sans-serif">
              {stage.description}
            </text>
          </g>
        ))}

        {/* Loop back arrow */}
        <path
          d="M 620 520 Q 700 400 620 280"
          stroke="rgba(45, 214, 143, 0.3)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
        />
        <polygon points="620,280 625,290 615,290" fill="#2dd68f" />
        <text x="720" y="400" fill="rgba(171, 207, 201, 0.6)" fontSize="12" fontFamily="'Oxanium', sans-serif">
          Iterate
        </text>
      </svg>

      <style>{`
        @media (max-width: 768px) {
          svg text {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
});

export default OSINTLifecycle;
