import { motion } from 'framer-motion';

export default function ScanProcessDiagram() {
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
      <svg viewBox="0 0 900 500" style={{ width: '100%', height: 'auto' }}>
        {/* Title */}
        <text x="450" y="30" textAnchor="middle" fill="#e6e9f0" fontSize="18" fontWeight="700" fontFamily="'Sora', sans-serif">
          How Nmap Scanning Works
        </text>
        <text x="450" y="50" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="12" fontFamily="'Oxanium', sans-serif">
          From probe to port state determination
        </text>

        {/* Scanner (Analyst Machine) */}
        <g>
          <motion.rect
            x="80"
            y="120"
            width="160"
            height="100"
            rx="8"
            fill="rgba(45, 214, 143, 0.12)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <text x="160" y="150" textAnchor="middle" fill="#2dd68f" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            Scanner
          </text>
          <text x="160" y="170" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Analyst Machine
          </text>
          <text x="160" y="190" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Running Nmap
          </text>
          <text x="160" y="205" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            192.168.1.100
          </text>
        </g>

        {/* Probe Packet */}
        <g>
          <motion.rect
            x="280"
            y="155"
            width="80"
            height="30"
            rx="4"
            fill="rgba(92, 242, 255, 0.15)"
            stroke="#5CF2FF"
            strokeWidth="2"
            initial={{ x: 80 }}
            animate={{ x: 280 }}
            transition={{ duration: 1, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
          />
          <text x="320" y="175" textAnchor="middle" fill="#5CF2FF" fontSize="10" fontFamily="'Oxanium', sans-serif">
            SYN →
          </text>
        </g>

        <text x="320" y="145" textAnchor="middle" fill="rgba(171, 207, 201, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
          1. Send Probe
        </text>

        {/* Network Cloud */}
        <g>
          <ellipse cx="450" cy="170" rx="70" ry="50" fill="rgba(2, 168, 154, 0.08)" stroke="#02a89a" strokeWidth="2" />
          <text x="450" y="165" textAnchor="middle" fill="#02a89a" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">
            Network
          </text>
          <text x="450" y="180" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Internet/LAN
          </text>
        </g>

        {/* Probe continues to target */}
        <g>
          <motion.rect
            x="540"
            y="155"
            width="80"
            height="30"
            rx="4"
            fill="rgba(92, 242, 255, 0.15)"
            stroke="#5CF2FF"
            strokeWidth="2"
            initial={{ x: 280 }}
            animate={{ x: 540 }}
            transition={{ duration: 1, delay: 1.3, repeat: Infinity, repeatDelay: 2 }}
          />
          <text x="580" y="175" textAnchor="middle" fill="#5CF2FF" fontSize="10" fontFamily="'Oxanium', sans-serif">
            SYN →
          </text>
        </g>

        <text x="580" y="145" textAnchor="middle" fill="rgba(171, 207, 201, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
          2. Transit
        </text>

        {/* Target Host */}
        <g>
          <motion.rect
            x="660"
            y="120"
            width="160"
            height="100"
            rx="8"
            fill="rgba(255, 217, 61, 0.12)"
            stroke="#ffd93d"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <text x="740" y="150" textAnchor="middle" fill="#ffd93d" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            Target Host
          </text>
          <text x="740" y="170" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Web Server
          </text>
          <text x="740" y="190" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Port 80: OPEN
          </text>
          <text x="740" y="205" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            192.168.1.1
          </text>
        </g>

        {/* Response Packet */}
        <g>
          <motion.rect
            x="540"
            y="275"
            width="100"
            height="30"
            rx="4"
            fill="rgba(45, 214, 143, 0.15)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ x: 660 }}
            animate={{ x: 540 }}
            transition={{ duration: 1, delay: 1.8, repeat: Infinity, repeatDelay: 2 }}
          />
          <text x="590" y="295" textAnchor="middle" fill="#2dd68f" fontSize="10" fontFamily="'Oxanium', sans-serif">
            ← SYN-ACK
          </text>
        </g>

        <text x="590" y="265" textAnchor="middle" fill="rgba(171, 207, 201, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
          3. Response
        </text>

        {/* Response continues back */}
        <g>
          <motion.rect
            x="280"
            y="275"
            width="100"
            height="30"
            rx="4"
            fill="rgba(45, 214, 143, 0.15)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ x: 540 }}
            animate={{ x: 280 }}
            transition={{ duration: 1, delay: 2.3, repeat: Infinity, repeatDelay: 2 }}
          />
          <text x="330" y="295" textAnchor="middle" fill="#2dd68f" fontSize="10" fontFamily="'Oxanium', sans-serif">
            ← SYN-ACK
          </text>
        </g>

        {/* Analysis Box */}
        <g>
          <motion.rect
            x="80"
            y="350"
            width="160"
            height="120"
            rx="8"
            fill="rgba(2, 168, 154, 0.12)"
            stroke="#02a89a"
            strokeWidth="2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3 }}
          />
          <text x="160" y="375" textAnchor="middle" fill="#02a89a" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
            4. Analysis
          </text>
          <rect x="95" y="385" width="130" height="70" rx="4" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
          <text x="160" y="405" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Received: SYN-ACK
          </text>
          <text x="160" y="420" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            ↓
          </text>
          <text x="160" y="435" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Port State: OPEN
          </text>
        </g>

        {/* Port State Outcomes */}
        <g>
          <rect x="280" y="350" width="540" height="120" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
          <text x="550" y="375" textAnchor="middle" fill="#e6e9f0" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
            Possible Outcomes
          </text>
          
          {/* Open */}
          <rect x="295" y="390" width="160" height="65" rx="4" fill="rgba(45, 214, 143, 0.12)" stroke="#2dd68f" strokeWidth="1" />
          <text x="375" y="410" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            OPEN
          </text>
          <text x="375" y="425" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Received: SYN-ACK
          </text>
          <text x="375" y="440" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Service is listening
          </text>

          {/* Closed */}
          <rect x="470" y="390" width="160" height="65" rx="4" fill="rgba(255, 107, 107, 0.12)" stroke="#ff6b6b" strokeWidth="1" />
          <text x="550" y="410" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            CLOSED
          </text>
          <text x="550" y="425" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Received: RST
          </text>
          <text x="550" y="440" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            No service listening
          </text>

          {/* Filtered */}
          <rect x="645" y="390" width="160" height="65" rx="4" fill="rgba(255, 217, 61, 0.12)" stroke="#ffd93d" strokeWidth="1" />
          <text x="725" y="410" textAnchor="middle" fill="#ffd93d" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            FILTERED
          </text>
          <text x="725" y="425" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            No response
          </text>
          <text x="725" y="440" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Firewall blocking
          </text>
        </g>
      </svg>
    </div>
  );
}
