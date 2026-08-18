import { motion } from 'framer-motion';

export default function FirewallArchitectureDiagram() {
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
          Firewall Evolution: Stateless → Stateful → NGFW
        </text>

        {/* STATELESS FIREWALL */}
        <g>
          <text x="150" y="70" textAnchor="middle" fill="#2dd68f" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            Stateless (Packet Filtering)
          </text>
          
          {/* Firewall box */}
          <motion.rect
            x="80"
            y="90"
            width="140"
            height="180"
            rx="8"
            fill="rgba(45, 214, 143, 0.08)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Packet in */}
          <motion.circle
            cx="40"
            cy="140"
            r="8"
            fill="#3de9a0"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
          />
          <line x1="48" y1="140" x2="80" y2="140" stroke="#3de9a0" strokeWidth="2" strokeDasharray="4,4" />
          
          {/* Decision logic */}
          <text x="150" y="130" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Check:
          </text>
          <text x="150" y="148" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            • Source IP
          </text>
          <text x="150" y="163" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            • Dest IP
          </text>
          <text x="150" y="178" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            • Protocol
          </text>
          <text x="150" y="193" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            • Port
          </text>
          
          <text x="150" y="220" textAnchor="middle" fill="#ff6b6b" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            ⚠ NO SESSION MEMORY
          </text>
          
          {/* Packet out */}
          <line x1="220" y1="140" x2="252" y2="140" stroke="#3de9a0" strokeWidth="2" strokeDasharray="4,4" />
          <motion.circle
            cx="260"
            cy="140"
            r="8"
            fill="#3de9a0"
            initial={{ x: 0 }}
            animate={{ x: 50 }}
            transition={{ duration: 0.8, delay: 0.8, repeat: Infinity, repeatDelay: 1 }}
          />
          
          {/* Label */}
          <text x="150" y="290" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif" style={{ maxWidth: '140px' }}>
            Each packet inspected
          </text>
          <text x="150" y="302" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            independently
          </text>
        </g>

        {/* STATEFUL FIREWALL */}
        <g>
          <text x="450" y="70" textAnchor="middle" fill="#02a89a" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            Stateful (Connection Tracking)
          </text>
          
          {/* Firewall box */}
          <motion.rect
            x="380"
            y="90"
            width="140"
            height="180"
            rx="8"
            fill="rgba(2, 168, 154, 0.08)"
            stroke="#02a89a"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          
          {/* Packet in */}
          <motion.circle
            cx="340"
            cy="140"
            r="8"
            fill="#3de9a0"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
          />
          <line x1="348" y1="140" x2="380" y2="140" stroke="#3de9a0" strokeWidth="2" strokeDasharray="4,4" />
          
          {/* Decision logic */}
          <text x="450" y="120" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Check ACL +
          </text>
          <text x="450" y="140" textAnchor="middle" fill="#02a89a" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Connection State
          </text>
          
          {/* State table */}
          <rect x="395" y="155" width="110" height="50" rx="4" fill="rgba(2, 168, 154, 0.15)" stroke="rgba(2, 168, 154, 0.4)" strokeWidth="1" />
          <text x="450" y="172" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            State Table:
          </text>
          <text x="450" y="185" textAnchor="middle" fill="rgba(224, 224, 224, 0.65)" fontSize="8" fontFamily="'Oxanium', sans-serif">
            Track active sessions
          </text>
          <text x="450" y="197" textAnchor="middle" fill="rgba(224, 224, 224, 0.65)" fontSize="8" fontFamily="'Oxanium', sans-serif">
            NEW | ESTABLISHED | RELATED
          </text>
          
          <text x="450" y="230" textAnchor="middle" fill="#2dd68f" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            ✓ SESSION AWARE
          </text>
          
          {/* Packet out */}
          <line x1="520" y1="140" x2="552" y2="140" stroke="#3de9a0" strokeWidth="2" strokeDasharray="4,4" />
          <motion.circle
            cx="560"
            cy="140"
            r="8"
            fill="#3de9a0"
            initial={{ x: 0 }}
            animate={{ x: 50 }}
            transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatDelay: 1 }}
          />
          
          {/* Label */}
          <text x="450" y="290" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Only allows packets
          </text>
          <text x="450" y="302" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            from valid sessions
          </text>
        </g>

        {/* NGFW */}
        <g>
          <text x="750" y="70" textAnchor="middle" fill="#5CF2FF" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            NGFW (Next-Gen)
          </text>
          
          {/* Firewall box */}
          <motion.rect
            x="680"
            y="90"
            width="140"
            height="180"
            rx="8"
            fill="rgba(92, 242, 255, 0.08)"
            stroke="#5CF2FF"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          
          {/* Packet in */}
          <motion.circle
            cx="640"
            cy="140"
            r="8"
            fill="#3de9a0"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, repeat: Infinity, repeatDelay: 1 }}
          />
          <line x1="648" y1="140" x2="680" y2="140" stroke="#3de9a0" strokeWidth="2" strokeDasharray="4,4" />
          
          {/* Decision logic */}
          <text x="750" y="115" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            ACL + State +
          </text>
          <text x="750" y="133" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            • Deep Packet Inspection
          </text>
          <text x="750" y="147" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            • Application Awareness
          </text>
          <text x="750" y="161" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            • IPS Signatures
          </text>
          <text x="750" y="175" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            • SSL/TLS Inspection
          </text>
          <text x="750" y="189" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            • User Identity
          </text>
          <text x="750" y="203" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            • Threat Intelligence
          </text>
          
          <text x="750" y="230" textAnchor="middle" fill="#5CF2FF" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            ✓ FULL VISIBILITY
          </text>
          
          {/* Packet out */}
          <line x1="820" y1="140" x2="852" y2="140" stroke="#3de9a0" strokeWidth="2" strokeDasharray="4,4" />
          <motion.circle
            cx="860"
            cy="140"
            r="8"
            fill="#3de9a0"
            initial={{ x: 0 }}
            animate={{ x: 50 }}
            transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatDelay: 1 }}
          />
          
          {/* Label */}
          <text x="750" y="290" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Understands applications
          </text>
          <text x="750" y="302" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            & detects threats
          </text>
        </g>

        {/* Evolution arrows */}
        <motion.path
          d="M 260 320 L 340 320"
          stroke="#2dd68f"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.path
          d="M 560 320 L 640 320"
          stroke="#02a89a"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead2)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />

        <text x="300" y="315" textAnchor="middle" fill="#2dd68f" fontSize="10" fontFamily="'Sora', sans-serif">
          Evolution
        </text>
        <text x="600" y="315" textAnchor="middle" fill="#02a89a" fontSize="10" fontFamily="'Sora', sans-serif">
          Evolution
        </text>

        {/* Capabilities comparison */}
        <g>
          <text x="450" y="370" textAnchor="middle" fill="#e6e9f0" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
            Key Capabilities Comparison
          </text>
          
          <rect x="100" y="390" width="700" height="80" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
          
          {/* Stateless */}
          <circle cx="150" cy="415" r="4" fill="#2dd68f" />
          <text x="160" y="419" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Fast, simple, no context
          </text>
          
          {/* Stateful */}
          <circle cx="380" cy="415" r="4" fill="#02a89a" />
          <text x="390" y="419" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Connection tracking, session memory
          </text>
          
          {/* NGFW */}
          <circle cx="680" cy="415" r="4" fill="#5CF2FF" />
          <text x="690" y="419" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            App-aware, DPI, IPS, SSL inspect
          </text>
          
          {/* Limitations */}
          <text x="150" y="445" textAnchor="start" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ⚠ Can't detect attacks spanning multiple packets
          </text>
          <text x="380" y="445" textAnchor="start" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Blocks unsolicited responses
          </text>
          <text x="680" y="445" textAnchor="start" fill="#5CF2FF" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Blocks malware in allowed protocols
          </text>
        </g>

        {/* Arrow definitions */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2dd68f" />
          </marker>
          <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#02a89a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
