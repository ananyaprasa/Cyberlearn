import { memo } from 'react';

const PassiveVsActiveComparison = memo(function PassiveVsActiveComparison() {
  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <svg viewBox="0 0 900 400" style={{ width: '100%', height: 'auto' }}>
        {/* Passive side */}
        <g>
          {/* Background */}
          <rect x="20" y="20" width="400" height="360" rx="16" fill="rgba(45, 214, 143, 0.08)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="2" />
          
          {/* Title */}
          <text x="220" y="60" fill="#2dd68f" fontSize="24" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            PASSIVE OSINT
          </text>
          
          {/* Researcher */}
          <circle cx="220" cy="120" r="30" fill="rgba(45, 214, 143, 0.2)" stroke="#2dd68f" strokeWidth="2" />
          <text x="220" y="130" fill="#2dd68f" fontSize="28" textAnchor="middle">👤</text>
          <text x="220" y="165" fill="rgba(224, 224, 224, 0.9)" fontSize="14" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Analyst
          </text>
          
          {/* Arrow down */}
          <line x1="220" y1="175" x2="220" y2="210" stroke="rgba(45, 214, 143, 0.5)" strokeWidth="2" />
          <polygon points="220,210 215,200 225,200" fill="#2dd68f" />
          
          {/* Public sources */}
          <rect x="120" y="220" width="200" height="60" rx="8" fill="rgba(45, 214, 143, 0.15)" stroke="#2dd68f" strokeWidth="2" />
          <text x="220" y="250" fill="#e6e9f0" fontSize="16" fontWeight="600" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Public Sources
          </text>
          <text x="220" y="270" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Search engines, WHOIS,
          </text>
          <text x="220" y="285" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Social media, CT logs
          </text>
          
          {/* Characteristics */}
          <text x="40" y="320" fill="#2dd68f" fontSize="14" fontWeight="600" fontFamily="'Sora', sans-serif">✓ No direct interaction</text>
          <text x="40" y="340" fill="#2dd68f" fontSize="14" fontWeight="600" fontFamily="'Sora', sans-serif">✓ Zero footprint</text>
          <text x="40" y="360" fill="#2dd68f" fontSize="14" fontWeight="600" fontFamily="'Sora', sans-serif">✓ Legally safer</text>
        </g>

        {/* Active side */}
        <g>
          {/* Background */}
          <rect x="480" y="20" width="400" height="360" rx="16" fill="rgba(255, 165, 0, 0.08)" stroke="rgba(255, 165, 0, 0.3)" strokeWidth="2" />
          
          {/* Title */}
          <text x="680" y="60" fill="#ffa500" fontSize="24" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            ACTIVE OSINT
          </text>
          
          {/* Researcher */}
          <circle cx="680" cy="120" r="30" fill="rgba(255, 165, 0, 0.2)" stroke="#ffa500" strokeWidth="2" />
          <text x="680" y="130" fill="#ffa500" fontSize="28" textAnchor="middle">👤</text>
          <text x="680" y="165" fill="rgba(224, 224, 224, 0.9)" fontSize="14" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Analyst
          </text>
          
          {/* Arrow down */}
          <line x1="680" y1="175" x2="680" y2="210" stroke="rgba(255, 165, 0, 0.5)" strokeWidth="2" />
          <polygon points="680,210 675,200 685,200" fill="#ffa500" />
          
          {/* Target interaction */}
          <rect x="580" y="220" width="200" height="60" rx="8" fill="rgba(255, 165, 0, 0.15)" stroke="#ffa500" strokeWidth="2" />
          <text x="680" y="250" fill="#e6e9f0" fontSize="16" fontWeight="600" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Target Systems
          </text>
          <text x="680" y="270" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Direct queries, scans,
          </text>
          <text x="680" y="285" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            service probes
          </text>
          
          {/* Characteristics */}
          <text x="500" y="320" fill="#ffa500" fontSize="14" fontWeight="600" fontFamily="'Sora', sans-serif">⚠ Direct interaction</text>
          <text x="500" y="340" fill="#ffa500" fontSize="14" fontWeight="600" fontFamily="'Sora', sans-serif">⚠ Detectable footprint</text>
          <text x="500" y="360" fill="#ffa500" fontSize="14" fontWeight="600" fontFamily="'Sora', sans-serif">⚠ Higher legal risk</text>
        </g>

        {/* Center divider */}
        <line x1="450" y1="40" x2="450" y2="360" stroke="rgba(45, 214, 143, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
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

export default PassiveVsActiveComparison;
