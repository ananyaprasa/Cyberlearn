import { motion } from 'framer-motion';

export default function IDSDeploymentTopology() {
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
          IDS vs IPS Deployment Architecture
        </text>

        {/* NIDS (Network-based IDS) */}
        <g>
          <text x="220" y="70" textAnchor="middle" fill="#2dd68f" fontSize="15" fontWeight="700" fontFamily="'Sora', sans-serif">
            NIDS (Network IDS)
          </text>
          <text x="220" y="88" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Passive monitoring
          </text>
          
          {/* Network diagram */}
          {/* Internet cloud */}
          <ellipse cx="220" cy="140" rx="50" ry="30" fill="rgba(92, 242, 255, 0.1)" stroke="#5CF2FF" strokeWidth="2" />
          <text x="220" y="145" textAnchor="middle" fill="#5CF2FF" fontSize="11" fontFamily="'Sora', sans-serif">
            Internet
          </text>
          
          {/* Router */}
          <rect x="190" y="210" width="60" height="40" rx="4" fill="rgba(2, 168, 154, 0.15)" stroke="#02a89a" strokeWidth="2" />
          <text x="220" y="234" textAnchor="middle" fill="#02a89a" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            Router
          </text>
          
          <line x1="220" y1="170" x2="220" y2="210" stroke="#3de9a0" strokeWidth="2" />
          
          {/* Switch */}
          <rect x="190" y="300" width="60" height="40" rx="4" fill="rgba(2, 168, 154, 0.15)" stroke="#02a89a" strokeWidth="2" />
          <text x="220" y="324" textAnchor="middle" fill="#02a89a" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            Switch
          </text>
          
          <line x1="220" y1="250" x2="220" y2="300" stroke="#3de9a0" strokeWidth="2" />
          
          {/* SPAN/Mirror port line */}
          <motion.line
            x1="250"
            y1="320"
            x2="320"
            y2="320"
            stroke="#ffd93d"
            strokeWidth="2"
            strokeDasharray="6,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
          />
          <text x="285" y="315" textAnchor="middle" fill="#ffd93d" fontSize="9" fontFamily="'Oxanium', sans-serif">
            SPAN/Mirror
          </text>
          
          {/* NIDS sensor */}
          <motion.rect
            x="320"
            y="295"
            width="80"
            height="50"
            rx="6"
            fill="rgba(45, 214, 143, 0.12)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <text x="360" y="315" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            NIDS
          </text>
          <text x="360" y="330" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            (Monitor)
          </text>
          
          {/* Alert */}
          <motion.path
            d="M 360 295 L 360 250"
            stroke="#ff6b6b"
            strokeWidth="2"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatDelay: 2 }}
          />
          <text x="370" y="270" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Alert →
          </text>
          
          {/* Internal hosts */}
          <rect x="80" y="400" width="50" height="35" rx="4" fill="rgba(2, 168, 154, 0.1)" stroke="#02a89a" strokeWidth="1" />
          <text x="105" y="421" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Host 1
          </text>
          
          <rect x="195" y="400" width="50" height="35" rx="4" fill="rgba(2, 168, 154, 0.1)" stroke="#02a89a" strokeWidth="1" />
          <text x="220" y="421" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Host 2
          </text>
          
          <rect x="310" y="400" width="50" height="35" rx="4" fill="rgba(2, 168, 154, 0.1)" stroke="#02a89a" strokeWidth="1" />
          <text x="335" y="421" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Host 3
          </text>
          
          <line x1="105" y1="340" x2="105" y2="400" stroke="rgba(61, 233, 160, 0.5)" strokeWidth="1" />
          <line x1="220" y1="340" x2="220" y2="400" stroke="rgba(61, 233, 160, 0.5)" strokeWidth="1" />
          <line x1="335" y1="340" x2="335" y2="400" stroke="rgba(61, 233, 160, 0.5)" strokeWidth="1" />
          
          {/* Key points */}
          <g>
            <rect x="50" y="460" width="340" height="70" rx="6" fill="rgba(45, 214, 143, 0.08)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="1" />
            <text x="220" y="480" textAnchor="middle" fill="#2dd68f" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
              NIDS Characteristics:
            </text>
            <text x="220" y="497" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✓ Monitors copy of traffic (SPAN/TAP)
            </text>
            <text x="220" y="510" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✓ Does NOT block — only alerts
            </text>
            <text x="220" y="523" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ⚠ Cannot stop attack in real-time
            </text>
          </g>
        </g>

        {/* NIPS (Network-based IPS) */}
        <g>
          <text x="680" y="70" textAnchor="middle" fill="#5CF2FF" fontSize="15" fontWeight="700" fontFamily="'Sora', sans-serif">
            NIPS (Network IPS)
          </text>
          <text x="680" y="88" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Inline blocking
          </text>
          
          {/* Network diagram */}
          {/* Internet cloud */}
          <ellipse cx="680" cy="140" rx="50" ry="30" fill="rgba(92, 242, 255, 0.1)" stroke="#5CF2FF" strokeWidth="2" />
          <text x="680" y="145" textAnchor="middle" fill="#5CF2FF" fontSize="11" fontFamily="'Sora', sans-serif">
            Internet
          </text>
          
          {/* Router */}
          <rect x="650" y="210" width="60" height="40" rx="4" fill="rgba(2, 168, 154, 0.15)" stroke="#02a89a" strokeWidth="2" />
          <text x="680" y="234" textAnchor="middle" fill="#02a89a" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            Router
          </text>
          
          <line x1="680" y1="170" x2="680" y2="210" stroke="#3de9a0" strokeWidth="2" />
          
          {/* NIPS (INLINE) */}
          <motion.rect
            x="640"
            y="280"
            width="80"
            height="50"
            rx="6"
            fill="rgba(92, 242, 255, 0.12)"
            stroke="#5CF2FF"
            strokeWidth="3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <text x="680" y="300" textAnchor="middle" fill="#5CF2FF" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            NIPS
          </text>
          <text x="680" y="315" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            (INLINE)
          </text>
          
          <line x1="680" y1="250" x2="680" y2="280" stroke="#3de9a0" strokeWidth="2" />
          
          {/* Traffic flow arrows */}
          <motion.path
            d="M 680 250 L 680 280"
            stroke="#3de9a0"
            strokeWidth="3"
            markerEnd="url(#arrowInline)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
          />
          
          {/* Blocked packet */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: [0, 1, 1, 0], x: [-20, 0, 0, 20] }}
            transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <circle cx="720" cy="265" r="8" fill="#ff6b6b" />
            <line x1="715" y1="260" x2="725" y2="270" stroke="#fff" strokeWidth="2" />
            <line x1="725" y1="260" x2="715" y2="270" stroke="#fff" strokeWidth="2" />
            <text x="740" y="270" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
              BLOCKED
            </text>
          </motion.g>
          
          {/* Switch */}
          <rect x="650" y="370" width="60" height="40" rx="4" fill="rgba(2, 168, 154, 0.15)" stroke="#02a89a" strokeWidth="2" />
          <text x="680" y="394" textAnchor="middle" fill="#02a89a" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            Switch
          </text>
          
          <line x1="680" y1="330" x2="680" y2="370" stroke="#3de9a0" strokeWidth="2" />
          
          {/* Internal hosts */}
          <rect x="540" y="450" width="50" height="35" rx="4" fill="rgba(2, 168, 154, 0.1)" stroke="#02a89a" strokeWidth="1" />
          <text x="565" y="471" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Host 1
          </text>
          
          <rect x="655" y="450" width="50" height="35" rx="4" fill="rgba(2, 168, 154, 0.1)" stroke="#02a89a" strokeWidth="1" />
          <text x="680" y="471" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Host 2
          </text>
          
          <rect x="770" y="450" width="50" height="35" rx="4" fill="rgba(2, 168, 154, 0.1)" stroke="#02a89a" strokeWidth="1" />
          <text x="795" y="471" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Host 3
          </text>
          
          <line x1="565" y1="410" x2="565" y2="450" stroke="rgba(61, 233, 160, 0.5)" strokeWidth="1" />
          <line x1="680" y1="410" x2="680" y2="450" stroke="rgba(61, 233, 160, 0.5)" strokeWidth="1" />
          <line x1="795" y1="410" x2="795" y2="450" stroke="rgba(61, 233, 160, 0.5)" strokeWidth="1" />
          
          {/* Key points */}
          <g>
            <rect x="510" y="505" width="340" height="35" rx="6" fill="rgba(92, 242, 255, 0.08)" stroke="rgba(92, 242, 255, 0.3)" strokeWidth="1" />
            <text x="680" y="525" textAnchor="middle" fill="#5CF2FF" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
              NIPS Characteristics:
            </text>
          </g>
          <g>
            <rect x="510" y="542" width="160" height="8" rx="2" fill="rgba(45, 214, 143, 0.2)" />
            <text x="520" y="547" fill="rgba(224, 224, 224, 0.75)" fontSize="8" fontFamily="'Oxanium', sans-serif">
              ✓ ALL traffic flows through
            </text>
          </g>
          <g>
            <rect x="680" y="542" width="160" height="8" rx="2" fill="rgba(45, 214, 143, 0.2)" />
            <text x="690" y="547" fill="rgba(224, 224, 224, 0.75)" fontSize="8" fontFamily="'Oxanium', sans-serif">
              ✓ Blocks threats in real-time
            </text>
          </g>
        </g>

        {/* Comparison divider */}
        <line x1="450" y1="60" x2="450" y2="540" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" strokeDasharray="8,8" />

        {/* Arrow marker */}
        <defs>
          <marker id="arrowInline" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#3de9a0" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
