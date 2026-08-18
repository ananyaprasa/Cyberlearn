import { memo } from 'react';

const TrafficAnalysisWorkflow = memo(function TrafficAnalysisWorkflow() {
  const stages = [
    { id: 1, label: 'Question', description: 'What am I investigating?', color: '#2dd68f' },
    { id: 2, label: 'Capture Traffic', description: 'Collect relevant packets', color: '#02a89a' },
    { id: 3, label: 'Apply Filter', description: 'Isolate suspicious traffic', color: '#2dd68f' },
    { id: 4, label: 'Inspect Packets', description: 'Examine protocol details', color: '#02a89a' },
    { id: 5, label: 'Follow Conversation', description: 'Reconstruct full exchange', color: '#2dd68f' },
    { id: 6, label: 'Identify Pattern', description: 'Recognize behavior', color: '#02a89a' },
    { id: 7, label: 'Security Decision', description: 'Benign or malicious?', color: '#2dd68f' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <svg viewBox="0 0 800 700" style={{ width: '100%', height: 'auto' }}>
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
              x="150"
              y="20"
              width="500"
              height="60"
              rx="12"
              fill="rgba(10, 15, 25, 0.8)"
              stroke={stage.color}
              strokeWidth="2"
            />
            
            {/* Stage number */}
            <circle cx="190" cy="50" r="20" fill={`${stage.color}30`} stroke={stage.color} strokeWidth="2" />
            <text x="190" y="57" fill={stage.color} fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
              {stage.id}
            </text>
            
            {/* Label */}
            <text x="230" y="46" fill="#e6e9f0" fontSize="17" fontWeight="700" fontFamily="'Sora', sans-serif">
              {stage.label}
            </text>
            
            {/* Description */}
            <text x="230" y="65" fill="rgba(171, 207, 201, 0.7)" fontSize="13" fontFamily="'Oxanium', sans-serif">
              {stage.description}
            </text>
          </g>
        ))}

        {/* Signature text */}
        <text x="400" y="680" fill="rgba(171, 207, 201, 0.6)" fontSize="13" textAnchor="middle" fontFamily="'Oxanium', sans-serif" fontStyle="italic">
          The analyst investigation workflow
        </text>
      </svg>

      <style>{`
        @media (max-width: 768px) {
          svg text {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
});

export default TrafficAnalysisWorkflow;
