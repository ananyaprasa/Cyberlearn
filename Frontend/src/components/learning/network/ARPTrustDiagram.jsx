import { memo } from 'react';

const ARPTrustDiagram = memo(function ARPTrustDiagram() {
  return (
    <div style={{ width: '100%', maxWidth: '950px', margin: '0 auto' }}>
      <svg viewBox="0 0 950 550" style={{ width: '100%', height: 'auto' }}>
        {/* Title */}
        <text x="475" y="30" fill="#2dd68f" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
          ARP Mapping Process (No Authentication)
        </text>

        {/* Step 1: ARP Request */}
        <g>
          <rect x="50" y="70" width="220" height="80" rx="10" fill="rgba(45, 214, 143, 0.1)" stroke="#2dd68f" strokeWidth="2" />
          <text x="160" y="100" fill="#2dd68f" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            1. ARP Request
          </text>
          <text x="160" y="125" fill="rgba(171, 207, 201, 0.9)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            "Who has 192.168.1.1?"
          </text>
          <text x="160" y="142" fill="rgba(171, 207, 201, 0.7)" fontSize="11" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            (Broadcast to all)
          </text>
        </g>

        <text x="310" y="115" fill="rgba(171, 207, 201, 0.6)" fontSize="20" fontFamily="'Sora', sans-serif">→</text>

        {/* Step 2: ARP Reply */}
        <g>
          <rect x="360" y="70" width="220" height="80" rx="10" fill="rgba(2, 168, 154, 0.1)" stroke="#02a89a" strokeWidth="2" />
          <text x="470" y="100" fill="#02a89a" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            2. ARP Reply
          </text>
          <text x="470" y="125" fill="rgba(171, 207, 201, 0.9)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            "192.168.1.1 is at"
          </text>
          <text x="470" y="142" fill="rgba(171, 207, 201, 0.9)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            aa:bb:cc:dd:ee:ff
          </text>
        </g>

        <text x="620" y="115" fill="rgba(171, 207, 201, 0.6)" fontSize="20" fontFamily="'Sora', sans-serif">→</text>

        {/* Step 3: Trust */}
        <g>
          <rect x="670" y="70" width="220" height="80" rx="10" fill="rgba(45, 214, 143, 0.08)" stroke="#2dd68f" strokeWidth="2" />
          <text x="780" y="100" fill="#2dd68f" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            3. Trusted Mapping
          </text>
          <text x="780" y="125" fill="rgba(171, 207, 201, 0.9)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            ARP cache updated
          </text>
          <text x="780" y="142" fill="rgba(171, 207, 201, 0.7)" fontSize="11" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            No verification!
          </text>
        </g>

        {/* Warning Box */}
        <g>
          <rect x="150" y="200" width="650" height="100" rx="10" fill="rgba(255, 70, 70, 0.1)" stroke="#ff4646" strokeWidth="2" />
          <text x="475" y="230" fill="#ff4646" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            ⚠️ Security Problem: No Authentication
          </text>
          <text x="475" y="258" fill="rgba(255, 120, 120, 0.9)" fontSize="13" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            ANY device can send ARP replies claiming to be ANY IP address
          </text>
          <text x="475" y="280" fill="rgba(255, 120, 120, 0.9)" fontSize="13" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            The network will trust it without verification
          </text>
        </g>

        {/* ARP Poisoning Attack Example */}
        <text x="475" y="345" fill="#02a89a" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
          ARP Poisoning Attack Flow
        </text>

        {/* Attacker */}
        <g>
          <rect x="50" y="370" width="180" height="70" rx="8" fill="rgba(255, 70, 70, 0.15)" stroke="#ff4646" strokeWidth="2" />
          <text x="140" y="400" fill="#ff4646" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Attacker
          </text>
          <text x="140" y="420" fill="rgba(255, 120, 120, 0.8)" fontSize="11" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            MAC: 11:22:33:44:55:66
          </text>
        </g>

        {/* Fake ARP Reply */}
        <g>
          <path d="M 230 405 L 330 405" stroke="#ff4646" strokeWidth="2" markerEnd="url(#arrowRed)" />
          <defs>
            <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#ff4646" />
            </marker>
          </defs>
          <text x="280" y="395" fill="#ff4646" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Gratuitous ARP
          </text>
          <text x="280" y="425" fill="rgba(255, 120, 120, 0.8)" fontSize="10" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            "192.168.1.1 is at
          </text>
          <text x="280" y="438" fill="rgba(255, 120, 120, 0.8)" fontSize="10" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            11:22:33:44:55:66"
          </text>
        </g>

        {/* Victim */}
        <g>
          <rect x="360" y="370" width="180" height="70" rx="8" fill="rgba(45, 214, 143, 0.1)" stroke="#2dd68f" strokeWidth="2" />
          <text x="450" y="400" fill="#2dd68f" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Victim
          </text>
          <text x="450" y="420" fill="rgba(171, 207, 201, 0.7)" fontSize="11" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            ARP cache poisoned!
          </text>
        </g>

        {/* Poisoned Traffic */}
        <g>
          <path d="M 540 405 L 640 405" stroke="#ff8800" strokeWidth="2" markerEnd="url(#arrowOrange)" strokeDasharray="6 3" />
          <defs>
            <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#ff8800" />
            </marker>
          </defs>
          <text x="590" y="395" fill="#ff8800" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Traffic intended
          </text>
          <text x="590" y="425" fill="#ff8800" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            for gateway →
          </text>
          <text x="590" y="438" fill="rgba(255, 136, 0, 0.8)" fontSize="10" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            goes to attacker
          </text>
        </g>

        {/* Gateway */}
        <g>
          <rect x="670" y="370" width="180" height="70" rx="8" fill="rgba(2, 168, 154, 0.1)" stroke="#02a89a" strokeWidth="2" />
          <text x="760" y="400" fill="#02a89a" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Gateway
          </text>
          <text x="760" y="420" fill="rgba(171, 207, 201, 0.7)" fontSize="11" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            192.168.1.1
          </text>
        </g>

        {/* Bottom note */}
        <text x="475" y="520" fill="rgba(171, 207, 201, 0.6)" fontSize="13" textAnchor="middle" fontFamily="'Oxanium', sans-serif" fontStyle="italic">
          Attacker intercepts traffic by exploiting lack of ARP authentication
        </text>
      </svg>

      <style>{`
        @media (max-width: 768px) {
          svg text {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
});

export default ARPTrustDiagram;
