import { memo } from 'react';

const CommunicationTrustModel = memo(function CommunicationTrustModel() {
  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <svg viewBox="0 0 900 500" style={{ width: '100%', height: 'auto' }}>
        {/* Client */}
        <g>
          <rect x="50" y="200" width="180" height="100" rx="12" fill="rgba(45, 214, 143, 0.15)" stroke="#2dd68f" strokeWidth="2" />
          <text x="140" y="240" fill="#2dd68f" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Client
          </text>
          <text x="140" y="265" fill="rgba(171, 207, 201, 0.7)" fontSize="13" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            User/Device
          </text>
          <text x="140" y="282" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            192.168.1.10
          </text>
        </g>

        {/* Trust Arrow to Server */}
        <defs>
          <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#2dd68f" />
          </marker>
        </defs>
        
        <line x1="230" y1="220" x2="620" y2="220" stroke="#2dd68f" strokeWidth="3" markerEnd="url(#arrowGreen)" strokeDasharray="8 4" />
        <text x="425" y="210" fill="#2dd68f" fontSize="14" fontWeight="600" textAnchor="middle" fontFamily="'Sora', sans-serif">
          Trusted Communication
        </text>

        {/* Server */}
        <g>
          <rect x="670" y="200" width="180" height="100" rx="12" fill="rgba(2, 168, 154, 0.15)" stroke="#02a89a" strokeWidth="2" />
          <text x="760" y="240" fill="#02a89a" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Server
          </text>
          <text x="760" y="265" fill="rgba(171, 207, 201, 0.7)" fontSize="13" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Web/API Server
          </text>
          <text x="760" y="282" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            93.184.216.34
          </text>
        </g>

        {/* Trust Assumptions (bottom) */}
        <g>
          <rect x="200" y="360" width="500" height="100" rx="8" fill="rgba(10, 15, 25, 0.8)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="1.5" />
          <text x="450" y="385" fill="#2dd68f" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Communication Trust Assumptions
          </text>
          
          <g transform="translate(220, 400)">
            <text x="0" y="0" fill="rgba(171, 207, 201, 0.9)" fontSize="13" fontFamily="'Oxanium', sans-serif">
              • ARP maps IP to correct MAC address
            </text>
            <text x="0" y="20" fill="rgba(171, 207, 201, 0.9)" fontSize="13" fontFamily="'Oxanium', sans-serif">
              • DNS returns legitimate server IPs
            </text>
            <text x="0" y="40" fill="rgba(171, 207, 201, 0.9)" fontSize="13" fontFamily="'Oxanium', sans-serif">
              • No interception between endpoints
            </text>
          </g>
        </g>

        {/* MITM Threat (top) */}
        <g>
          <circle cx="450" cy="100" r="50" fill="rgba(255, 70, 70, 0.15)" stroke="#ff4646" strokeWidth="2" />
          <text x="450" y="95" fill="#ff4646" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            MITM
          </text>
          <text x="450" y="112" fill="rgba(255, 120, 120, 0.8)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Attacker
          </text>
          
          {/* Arrow down to traffic line */}
          <path d="M 450 150 L 450 205" stroke="#ff4646" strokeWidth="2" strokeDasharray="4 3" />
          <polygon points="450,205 445,195 455,195" fill="#ff4646" />
          
          <text x="450" y="175" fill="#ff4646" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Intercepts
          </text>
        </g>

        {/* Bottom note */}
        <text x="450" y="490" fill="rgba(171, 207, 201, 0.6)" fontSize="13" textAnchor="middle" fontFamily="'Oxanium', sans-serif" fontStyle="italic">
          MITM breaks trust assumptions by positioning between endpoints
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

export default CommunicationTrustModel;
