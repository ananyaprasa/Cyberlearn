import { motion } from 'framer-motion';

export default function PortStateDiagram() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem',
      background: 'rgba(10, 15, 15, 0.6)',
      borderRadius: '16px',
      border: '1px solid rgba(2, 168, 154, 0.2)'
    }}>
      <svg viewBox="0 0 900 550" style={{ width: '100%', height: 'auto' }}>
        {/* Title */}
        <text x="450" y="30" textAnchor="middle" fill="#e6e9f0" fontSize="18" fontWeight="700" fontFamily="'Sora', sans-serif">
          Port State Determination
        </text>
        <text x="450" y="50" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="12" fontFamily="'Oxanium', sans-serif">
          How Nmap interprets target responses
        </text>

        {/* OPEN PORT */}
        <g>
          <text x="150" y="90" textAnchor="middle" fill="#2dd68f" fontSize="15" fontWeight="700" fontFamily="'Sora', sans-serif">
            OPEN
          </text>
          
          <motion.rect
            x="50"
            y="110"
            width="200"
            height="180"
            rx="8"
            fill="rgba(45, 214, 143, 0.08)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Handshake visualization */}
          <g>
            <circle cx="90" cy="150" r="8" fill="#5CF2FF" />
            <text x="105" y="155" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Scanner
            </text>
            
            <circle cx="210" cy="150" r="8" fill="#ffd93d" />
            <text x="160" y="155" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Target
            </text>

            {/* SYN arrow */}
            <motion.path
              d="M 90 170 L 90 185 L 210 185 L 210 170"
              stroke="#5CF2FF"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrow-open1)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <text x="150" y="182" textAnchor="middle" fill="#5CF2FF" fontSize="9" fontFamily="'Oxanium', sans-serif">
              SYN
            </text>

            {/* SYN-ACK arrow */}
            <motion.path
              d="M 210 195 L 210 210 L 90 210 L 90 195"
              stroke="#2dd68f"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrow-open2)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            />
            <text x="150" y="207" textAnchor="middle" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
              SYN-ACK
            </text>

            {/* RST arrow (stealth) */}
            <motion.path
              d="M 90 220 L 90 235 L 210 235 L 210 220"
              stroke="rgba(224, 224, 224, 0.5)"
              strokeWidth="1"
              strokeDasharray="3,3"
              fill="none"
              markerEnd="url(#arrow-rst)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 2.1 }}
            />
            <text x="150" y="232" textAnchor="middle" fill="rgba(224, 224, 224, 0.5)" fontSize="8" fontFamily="'Oxanium', sans-serif">
              RST (stealth)
            </text>
          </g>

          <text x="150" y="265" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Meaning:
          </text>
          <text x="150" y="280" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Service is listening
          </text>
        </g>

        {/* CLOSED PORT */}
        <g>
          <text x="450" y="90" textAnchor="middle" fill="#ff6b6b" fontSize="15" fontWeight="700" fontFamily="'Sora', sans-serif">
            CLOSED
          </text>
          
          <motion.rect
            x="350"
            y="110"
            width="200"
            height="180"
            rx="8"
            fill="rgba(255, 107, 107, 0.08)"
            stroke="#ff6b6b"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* RST visualization */}
          <g>
            <circle cx="390" cy="150" r="8" fill="#5CF2FF" />
            <text x="405" y="155" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Scanner
            </text>
            
            <circle cx="510" cy="150" r="8" fill="#ffd93d" />
            <text x="460" y="155" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Target
            </text>

            {/* SYN arrow */}
            <motion.path
              d="M 390 170 L 390 185 L 510 185 L 510 170"
              stroke="#5CF2FF"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrow-closed1)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
            <text x="450" y="182" textAnchor="middle" fill="#5CF2FF" fontSize="9" fontFamily="'Oxanium', sans-serif">
              SYN
            </text>

            {/* RST arrow */}
            <motion.path
              d="M 510 195 L 510 210 L 390 210 L 390 195"
              stroke="#ff6b6b"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrow-closed2)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            />
            <text x="450" y="207" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
              RST
            </text>
          </g>

          <text x="450" y="250" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Meaning:
          </text>
          <text x="450" y="265" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            No service listening
          </text>
          <text x="450" y="280" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Port reachable
          </text>
        </g>

        {/* FILTERED PORT */}
        <g>
          <text x="750" y="90" textAnchor="middle" fill="#ffd93d" fontSize="15" fontWeight="700" fontFamily="'Sora', sans-serif">
            FILTERED
          </text>
          
          <motion.rect
            x="650"
            y="110"
            width="200"
            height="180"
            rx="8"
            fill="rgba(255, 217, 61, 0.08)"
            stroke="#ffd93d"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />

          {/* Firewall blocking */}
          <g>
            <circle cx="690" cy="150" r="8" fill="#5CF2FF" />
            <text x="705" y="155" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Scanner
            </text>
            
            <rect x="745" y="145" width="30" height="40" rx="2" fill="rgba(255, 107, 107, 0.2)" stroke="#ff6b6b" strokeWidth="2" />
            <text x="760" y="155" textAnchor="middle" fill="#ff6b6b" fontSize="8" fontWeight="700" fontFamily="'Sora', sans-serif">
              FW
            </text>

            <circle cx="810" cy="165" r="8" fill="#ffd93d" />
            <text x="755" y="185" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Target
            </text>

            {/* SYN arrow blocked */}
            <motion.path
              d="M 690 170 L 690 200 L 745 200"
              stroke="#5CF2FF"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrow-filtered1)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            />
            <text x="717" y="197" textAnchor="middle" fill="#5CF2FF" fontSize="9" fontFamily="'Oxanium', sans-serif">
              SYN
            </text>

            {/* X mark on firewall */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.9 }}
            >
              <line x1="750" y1="195" x2="770" y2="215" stroke="#ff6b6b" strokeWidth="3" />
              <line x1="770" y1="195" x2="750" y2="215" stroke="#ff6b6b" strokeWidth="3" />
            </motion.g>

            {/* No response arrow */}
            <motion.path
              d="M 745 220 L 690 220 L 690 210"
              stroke="rgba(224, 224, 224, 0.3)"
              strokeWidth="1"
              strokeDasharray="4,4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 2.4 }}
            />
            <text x="717" y="237" textAnchor="middle" fill="rgba(224, 224, 224, 0.5)" fontSize="8" fontFamily="'Oxanium', sans-serif">
              (no response)
            </text>
          </g>

          <text x="750" y="265" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Meaning:
          </text>
          <text x="750" y="280" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Firewall blocking
          </text>
        </g>

        {/* Comparison table */}
        <g>
          <rect x="50" y="320" width="800" height="200" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
          <text x="450" y="345" textAnchor="middle" fill="#e6e9f0" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            Security Implications
          </text>

          {/* Open */}
          <rect x="70" y="360" width="230" height="140" rx="6" fill="rgba(45, 214, 143, 0.08)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="1" />
          <text x="185" y="380" textAnchor="middle" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">
            OPEN Port
          </text>
          <text x="80" y="400" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Service is accessible
          </text>
          <text x="80" y="418" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Can enumerate version
          </text>
          <text x="80" y="436" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ⚠ Potential attack vector
          </text>
          <text x="80" y="454" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ⚠ Check for vulnerabilities
          </text>
          <text x="80" y="472" fill="#2dd68f" fontSize="9" fontWeight="700" fontFamily="'Oxanium', sans-serif">
            → Next: Version detection (-sV)
          </text>

          {/* Closed */}
          <rect x="320" y="360" width="230" height="140" rx="6" fill="rgba(255, 107, 107, 0.08)" stroke="rgba(255, 107, 107, 0.3)" strokeWidth="1" />
          <text x="435" y="380" textAnchor="middle" fill="#ff6b6b" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">
            CLOSED Port
          </text>
          <text x="330" y="400" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Host is reachable
          </text>
          <text x="330" y="418" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ No service on this port
          </text>
          <text x="330" y="436" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ℹ No immediate threat
          </text>
          <text x="330" y="454" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ℹ Try other ports
          </text>
          <text x="330" y="472" fill="#ff6b6b" fontSize="9" fontWeight="700" fontFamily="'Oxanium', sans-serif">
            → Continue scanning
          </text>

          {/* Filtered */}
          <rect x="570" y="360" width="230" height="140" rx="6" fill="rgba(255, 217, 61, 0.08)" stroke="rgba(255, 217, 61, 0.3)" strokeWidth="1" />
          <text x="685" y="380" textAnchor="middle" fill="#ffd93d" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">
            FILTERED Port
          </text>
          <text x="580" y="400" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ⚠ Firewall detected
          </text>
          <text x="580" y="418" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ? Port state unknown
          </text>
          <text x="580" y="436" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ? Service may exist
          </text>
          <text x="580" y="454" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ℹ Evasion may be needed
          </text>
          <text x="580" y="472" fill="#ffd93d" fontSize="9" fontWeight="700" fontFamily="'Oxanium', sans-serif">
            → Try evasion techniques
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrow-open1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#5CF2FF" />
          </marker>
          <marker id="arrow-open2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#2dd68f" />
          </marker>
          <marker id="arrow-rst" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="rgba(224, 224, 224, 0.5)" />
          </marker>
          <marker id="arrow-closed1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#5CF2FF" />
          </marker>
          <marker id="arrow-closed2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#ff6b6b" />
          </marker>
          <marker id="arrow-filtered1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#5CF2FF" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
