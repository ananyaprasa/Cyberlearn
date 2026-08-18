import { memo } from 'react';

const PacketEncapsulation = memo(function PacketEncapsulation() {
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <svg viewBox="0 0 800 500" style={{ width: '100%', height: 'auto' }}>
        {/* Application Layer */}
        <g>
          <rect x="250" y="30" width="300" height="60" rx="8" fill="rgba(45, 214, 143, 0.15)" stroke="#2dd68f" strokeWidth="2" />
          <text x="400" y="55" fill="#2dd68f" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Application Data
          </text>
          <text x="400" y="75" fill="rgba(171, 207, 201, 0.7)" fontSize="12" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            HTTP, DNS, SSH, etc.
          </text>
        </g>

        {/* Arrow */}
        <line x1="400" y1="90" x2="400" y2="110" stroke="rgba(45, 214, 143, 0.5)" strokeWidth="2" />
        <polygon points="400,110 395,100 405,100" fill="#2dd68f" />

        {/* Transport Layer */}
        <g>
          <rect x="200" y="120" width="400" height="70" rx="8" fill="rgba(2, 168, 154, 0.15)" stroke="#02a89a" strokeWidth="2" />
          <rect x="210" y="130" width="60" height="50" rx="4" fill="rgba(45, 214, 143, 0.2)" stroke="#2dd68f" strokeWidth="1.5" />
          <text x="240" y="152" fill="#2dd68f" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            TCP
          </text>
          <text x="240" y="168" fill="rgba(171, 207, 201, 0.7)" fontSize="10" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Header
          </text>
          <text x="410" y="160" fill="#e6e9f0" fontSize="14" fontWeight="600" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Application Data
          </text>
        </g>

        {/* Arrow */}
        <line x1="400" y1="190" x2="400" y2="210" stroke="rgba(45, 214, 143, 0.5)" strokeWidth="2" />
        <polygon points="400,210 395,200 405,200" fill="#2dd68f" />

        {/* Network Layer */}
        <g>
          <rect x="150" y="220" width="500" height="80" rx="8" fill="rgba(45, 214, 143, 0.12)" stroke="#2dd68f" strokeWidth="2" />
          <rect x="160" y="230" width="60" height="60" rx="4" fill="rgba(2, 168, 154, 0.2)" stroke="#02a89a" strokeWidth="1.5" />
          <text x="190" y="256" fill="#02a89a" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            IP
          </text>
          <text x="190" y="272" fill="rgba(171, 207, 201, 0.7)" fontSize="10" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Header
          </text>
          <text x="430" y="265" fill="#e6e9f0" fontSize="14" fontWeight="600" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            TCP + Application Data
          </text>
        </g>

        {/* Arrow */}
        <line x1="400" y1="300" x2="400" y2="320" stroke="rgba(45, 214, 143, 0.5)" strokeWidth="2" />
        <polygon points="400,320 395,310 405,310" fill="#2dd68f" />

        {/* Data Link Layer */}
        <g>
          <rect x="100" y="330" width="600" height="90" rx="8" fill="rgba(2, 168, 154, 0.12)" stroke="#02a89a" strokeWidth="2" />
          <rect x="110" y="340" width="70" height="70" rx="4" fill="rgba(45, 214, 143, 0.2)" stroke="#2dd68f" strokeWidth="1.5" />
          <text x="145" y="368" fill="#2dd68f" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            Ethernet
          </text>
          <text x="145" y="384" fill="rgba(171, 207, 201, 0.7)" fontSize="10" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Header
          </text>
          <text x="450" y="380" fill="#e6e9f0" fontSize="14" fontWeight="600" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            IP + TCP + Application Data
          </text>
          <rect x="620" y="340" width="70" height="70" rx="4" fill="rgba(2, 168, 154, 0.2)" stroke="#02a89a" strokeWidth="1.5" />
          <text x="655" y="368" fill="#02a89a" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="'Sora', sans-serif">
            FCS
          </text>
          <text x="655" y="384" fill="rgba(171, 207, 201, 0.7)" fontSize="10" textAnchor="middle" fontFamily="'Oxanium', sans-serif">
            Trailer
          </text>
        </g>

        {/* Right side annotations */}
        <g transform="translate(720, 0)">
          <text x="0" y="60" fill="rgba(171, 207, 201, 0.8)" fontSize="12" fontFamily="'Oxanium', sans-serif">Layer 7</text>
          <text x="0" y="155" fill="rgba(171, 207, 201, 0.8)" fontSize="12" fontFamily="'Oxanium', sans-serif">Layer 4</text>
          <text x="0" y="260" fill="rgba(171, 207, 201, 0.8)" fontSize="12" fontFamily="'Oxanium', sans-serif">Layer 3</text>
          <text x="0" y="375" fill="rgba(171, 207, 201, 0.8)" fontSize="12" fontFamily="'Oxanium', sans-serif">Layer 2</text>
        </g>

        {/* Bottom note */}
        <text x="400" y="460" fill="rgba(171, 207, 201, 0.7)" fontSize="14" textAnchor="middle" fontFamily="'Oxanium', sans-serif" fontStyle="italic">
          Wireshark dissects all layers automatically
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

export default PacketEncapsulation;
