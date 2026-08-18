import { motion } from 'framer-motion';

export default function HostDiscoveryFlow() {
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
      <svg viewBox="0 0 900 450" style={{ width: '100%', height: 'auto' }}>
        {/* Title */}
        <text x="450" y="30" textAnchor="middle" fill="#e6e9f0" fontSize="18" fontWeight="700" fontFamily="'Sora', sans-serif">
          Host Discovery Process
        </text>
        <text x="450" y="50" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="12" fontFamily="'Oxanium', sans-serif">
          Finding live hosts before port scanning
        </text>

        {/* Scanner */}
        <g>
          <motion.rect
            x="50"
            y="100"
            width="150"
            height="80"
            rx="8"
            fill="rgba(45, 214, 143, 0.12)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <text x="125" y="130" textAnchor="middle" fill="#2dd68f" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
            Nmap Scanner
          </text>
          <text x="125" y="150" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Command:
          </text>
          <text x="125" y="165" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            nmap -sn 192.168.1.0/24
          </text>
        </g>

        {/* Probe types */}
        <g>
          <rect x="250" y="100" width="400" height="280" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
          <text x="450" y="125" textAnchor="middle" fill="#02a89a" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            Discovery Probes
          </text>

          {/* ICMP Echo */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <rect x="270" y="145" width="360" height="45" rx="6" fill="rgba(92, 242, 255, 0.12)" stroke="#5CF2FF" strokeWidth="1" />
            <text x="285" y="165" fill="#5CF2FF" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              ICMP Echo Request (Ping)
            </text>
            <text x="285" y="180" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              Classic ping - may be blocked by firewalls
            </text>
          </motion.g>

          {/* TCP SYN */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <rect x="270" y="200" width="360" height="45" rx="6" fill="rgba(45, 214, 143, 0.12)" stroke="#2dd68f" strokeWidth="1" />
            <text x="285" y="220" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              TCP SYN to Port 443
            </text>
            <text x="285" y="235" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              Often passes through firewalls (HTTPS common)
            </text>
          </motion.g>

          {/* TCP ACK */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <rect x="270" y="255" width="360" height="45" rx="6" fill="rgba(2, 168, 154, 0.12)" stroke="#02a89a" strokeWidth="1" />
            <text x="285" y="275" fill="#02a89a" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              TCP ACK to Port 80
            </text>
            <text x="285" y="290" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              May bypass stateless firewalls
            </text>
          </motion.g>

          {/* ARP */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <rect x="270" y="310" width="360" height="45" rx="6" fill="rgba(255, 217, 61, 0.12)" stroke="#ffd93d" strokeWidth="1" />
            <text x="285" y="330" fill="#ffd93d" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              ARP Request (Local Network)
            </text>
            <text x="285" y="345" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              Most reliable on same subnet - cannot be blocked
            </text>
          </motion.g>
        </g>

        {/* Subnet targets */}
        <g>
          <text x="750" y="125" textAnchor="middle" fill="#e6e9f0" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
            Target Subnet
          </text>
          <text x="750" y="143" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            192.168.1.0/24
          </text>

          {/* Live host */}
          <motion.rect
            x="685"
            y="160"
            width="130"
            height="50"
            rx="6"
            fill="rgba(45, 214, 143, 0.15)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          />
          <text x="750" y="180" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            192.168.1.10
          </text>
          <text x="750" y="195" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Responded
          </text>
          <text x="750" y="207" textAnchor="middle" fill="#2dd68f" fontSize="9" fontWeight="700" fontFamily="'Oxanium', sans-serif">
            UP
          </text>

          {/* Dead host */}
          <motion.rect
            x="685"
            y="225"
            width="130"
            height="50"
            rx="6"
            fill="rgba(255, 107, 107, 0.15)"
            stroke="#ff6b6b"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          />
          <text x="750" y="245" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            192.168.1.15
          </text>
          <text x="750" y="260" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✗ No response
          </text>
          <text x="750" y="272" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontWeight="700" fontFamily="'Oxanium', sans-serif">
            DOWN
          </text>

          {/* Filtered host */}
          <motion.rect
            x="685"
            y="290"
            width="130"
            height="50"
            rx="6"
            fill="rgba(255, 217, 61, 0.15)"
            stroke="#ffd93d"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.9 }}
          />
          <text x="750" y="310" textAnchor="middle" fill="#ffd93d" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            192.168.1.20
          </text>
          <text x="750" y="325" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ? Filtered
          </text>
          <text x="750" y="337" textAnchor="middle" fill="#ffd93d" fontSize="9" fontWeight="700" fontFamily="'Oxanium', sans-serif">
            UNKNOWN
          </text>
        </g>

        {/* Arrows from probes to targets */}
        <motion.path
          d="M 650 167 L 685 185"
          stroke="#5CF2FF"
          strokeWidth="1"
          strokeDasharray="3,3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        />
        <motion.path
          d="M 650 222 L 685 185"
          stroke="#2dd68f"
          strokeWidth="1"
          strokeDasharray="3,3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 2.4 }}
        />

        {/* Bottom explanation */}
        <g>
          <rect x="50" y="395" width="800" height="45" rx="6" fill="rgba(2, 168, 154, 0.08)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
          <text x="450" y="415" textAnchor="middle" fill="#02a89a" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Why Host Discovery First?
          </text>
          <text x="450" y="432" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Scanning all 65,535 ports on 254 hosts = 16.6 million probes. First find which hosts are UP, then port scan only those.
          </text>
        </g>
      </svg>
    </div>
  );
}
