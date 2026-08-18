import { memo } from 'react';

const PacketCaptureWorkflow = memo(function PacketCaptureWorkflow() {
  const stages = [
    { label: 'Traffic Source', desc: 'Network activity', icon: '🌐' },
    { label: 'Network Interface', desc: 'NIC in promiscuous mode', icon: '📡' },
    { label: 'Capture Library', desc: 'libpcap/WinPcap', icon: '📦' },
    { label: 'Wireshark', desc: 'Protocol dissection', icon: '🔍' },
    { label: 'Analyst', desc: 'Investigation', icon: '👤' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <svg viewBox="0 0 900 450" style={{ width: '100%', height: 'auto' }}>
        {/* Connection lines */}
        {stages.slice(0, -1).map((_, i) => (
          <g key={`line-${i}`}>
            <line
              x1="450"
              y1={60 + i * 90}
              x2="450"
              y2={100 + i * 90}
              stroke="rgba(45, 214, 143, 0.4)"
              strokeWidth="3"
            />
            <polygon
              points="450,100 445,92 455,92"
              fill="#2dd68f"
              transform={`translate(0, ${i * 90})`}
            />
          </g>
        ))}

        {/* Stage boxes */}
        {stages.map((stage, i) => (
          <g key={i} transform={`translate(0, ${i * 90})`}>
            <rect
              x="200"
              y="20"
              width="500"
              height="60"
              rx="12"
              fill="rgba(10, 15, 25, 0.8)"
              stroke={i === 4 ? '#02a89a' : '#2dd68f'}
              strokeWidth="2"
            />
            
            {/* Icon */}
            <text x="240" y="58" fontSize="28" textAnchor="middle">
              {stage.icon}
            </text>
            
            {/* Label */}
            <text
              x="290"
              y="48"
              fill="#e6e9f0"
              fontSize="18"
              fontWeight="700"
              fontFamily="'Sora', sans-serif"
            >
              {stage.label}
            </text>
            
            {/* Description */}
            <text
              x="290"
              y="68"
              fill="rgba(171, 207, 201, 0.7)"
              fontSize="14"
              fontFamily="'Oxanium', sans-serif"
            >
              {stage.desc}
            </text>
          </g>
        ))}
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

export default PacketCaptureWorkflow;
