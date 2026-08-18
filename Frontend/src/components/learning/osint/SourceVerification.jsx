import { memo } from 'react';

const SourceVerification = memo(function SourceVerification() {
  const levels = [
    { level: 'Low', color: '#ef4444', confidence: '< 40%', criteria: 'Single uncorroborated source' },
    { level: 'Medium', color: '#ffa500', confidence: '40-70%', criteria: 'Multiple sources, some corroboration' },
    { level: 'High', color: '#2dd68f', confidence: '> 70%', criteria: 'Multiple independent sources confirm' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <svg viewBox="0 0 800 500" style={{ width: '100%', height: 'auto' }}>
        {/* Flow stages */}
        <g>
          {/* Source */}
          <rect x="300" y="30" width="200" height="60" rx="8" fill="rgba(45, 214, 143, 0.1)" stroke="#2dd68f" strokeWidth="2" />
          <text x="400" y="55" fill="#2dd68f" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Source
          </text>
          <text x="400" y="75" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Where did this come from?
          </text>

          {/* Arrow */}
          <line x1="400" y1="90" x2="400" y2="120" stroke="rgba(45, 214, 143, 0.5)" strokeWidth="2" />
          <polygon points="400,120 395,110 405,110" fill="#2dd68f" />

          {/* Claim */}
          <rect x="300" y="130" width="200" height="60" rx="8" fill="rgba(2, 168, 154, 0.1)" stroke="#02a89a" strokeWidth="2" />
          <text x="400" y="155" fill="#02a89a" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Claim
          </text>
          <text x="400" y="175" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            What does it assert?
          </text>

          {/* Arrow */}
          <line x1="400" y1="190" x2="400" y2="220" stroke="rgba(45, 214, 143, 0.5)" strokeWidth="2" />
          <polygon points="400,220 395,210 405,210" fill="#2dd68f" />

          {/* Verification */}
          <rect x="300" y="230" width="200" height="60" rx="8" fill="rgba(45, 214, 143, 0.1)" stroke="#2dd68f" strokeWidth="2" />
          <text x="400" y="255" fill="#2dd68f" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Verification
          </text>
          <text x="400" y="275" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Can it be confirmed?
          </text>

          {/* Arrow */}
          <line x1="400" y1="290" x2="400" y2="320" stroke="rgba(45, 214, 143, 0.5)" strokeWidth="2" />
          <polygon points="400,320 395,310 405,310" fill="#2dd68f" />

          {/* Confidence */}
          <rect x="300" y="330" width="200" height="60" rx="8" fill="rgba(2, 168, 154, 0.1)" stroke="#02a89a" strokeWidth="2" />
          <text x="400" y="355" fill="#02a89a" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Confidence Level
          </text>
          <text x="400" y="375" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            How reliable is this?
          </text>
        </g>

        {/* Confidence scale */}
        <g transform="translate(50, 420)">
          <text x="350" y="0" fill="#e6e9f0" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Confidence Levels
          </text>
          
          {levels.map((level, i) => (
            <g key={i} transform={`translate(${i * 240}, 20)`}>
              <rect
                width="220"
                height="50"
                rx="8"
                fill={`${level.color}20`}
                stroke={level.color}
                strokeWidth="2"
              />
              <text x="110" y="20" fill={level.color} fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
                {level.level}
              </text>
              <text x="110" y="36" fill="rgba(224, 224, 224, 0.9)" fontSize="11" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
                {level.confidence}
              </text>
              <text x="110" y="50" fill="rgba(171, 207, 201, 0.7)" fontSize="10" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
                {level.criteria}
              </text>
            </g>
          ))}
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

export default SourceVerification;
