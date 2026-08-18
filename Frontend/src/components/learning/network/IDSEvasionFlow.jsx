import { motion } from 'framer-motion';

export default function IDSEvasionFlow() {
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
          IDS Evasion: Insertion & Evasion Attacks
        </text>

        {/* INSERTION ATTACK */}
        <g>
          <text x="220" y="70" textAnchor="middle" fill="#ff6b6b" fontSize="15" fontWeight="700" fontFamily="'Sora', sans-serif">
            Insertion Attack
          </text>
          <text x="220" y="88" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            IDS accepts packet that target rejects
          </text>
          
          {/* Attacker */}
          <rect x="50" y="110" width="80" height="50" rx="6" fill="rgba(255, 107, 107, 0.12)" stroke="#ff6b6b" strokeWidth="2" />
          <text x="90" y="135" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Attacker
          </text>
          
          {/* Packets sent */}
          <g>
            {/* Valid packet */}
            <motion.rect
              x="160"
              y="115"
              width="60"
              height="18"
              rx="3"
              fill="rgba(45, 214, 143, 0.15)"
              stroke="#2dd68f"
              strokeWidth="1"
              initial={{ x: 50 }}
              animate={{ x: 160 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <text x="190" y="128" textAnchor="middle" fill="#2dd68f" fontSize="8" fontFamily="'Oxanium', sans-serif">
              MALI
            </text>
            
            {/* Invalid packet (bad TTL) */}
            <motion.rect
              x="160"
              y="137"
              width="60"
              height="18"
              rx="3"
              fill="rgba(255, 107, 107, 0.15)"
              stroke="#ff6b6b"
              strokeWidth="1"
              strokeDasharray="3,3"
              initial={{ x: 50 }}
              animate={{ x: 160 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            <text x="190" y="150" textAnchor="middle" fill="#ff6b6b" fontSize="8" fontFamily="'Oxanium', sans-serif">
              BENIGN
            </text>
            <text x="230" y="150" fill="#ff6b6b" fontSize="7" fontFamily="'Oxanium', sans-serif">
              TTL=0
            </text>
          </g>
          
          {/* IDS */}
          <motion.rect
            x="270"
            y="110"
            width="70"
            height="50"
            rx="6"
            fill="rgba(2, 168, 154, 0.12)"
            stroke="#02a89a"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />
          <text x="305" y="130" textAnchor="middle" fill="#02a89a" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            IDS
          </text>
          <text x="305" y="145" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="8" fontFamily="'Oxanium', sans-serif">
            Sees:
          </text>
          <text x="305" y="156" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="8" fontFamily="'Oxanium', sans-serif">
            MALIBENIGN
          </text>
          
          {/* Arrow to IDS */}
          <motion.path
            d="M 220 135 L 270 135"
            stroke="#3de9a0"
            strokeWidth="2"
            markerEnd="url(#arrow1)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          
          {/* Target */}
          <motion.rect
            x="380"
            y="110"
            width="70"
            height="50"
            rx="6"
            fill="rgba(45, 214, 143, 0.12)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          />
          <text x="415" y="130" textAnchor="middle" fill="#2dd68f" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            Target
          </text>
          <text x="415" y="145" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="8" fontFamily="'Oxanium', sans-serif">
            Sees:
          </text>
          <text x="415" y="156" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="8" fontFamily="'Oxanium', sans-serif">
            MALI (only)
          </text>
          
          {/* Arrow to target */}
          <motion.path
            d="M 340 125 L 380 125"
            stroke="#2dd68f"
            strokeWidth="2"
            markerEnd="url(#arrow2)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          />
          
          {/* Rejected packet visualization */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            <line x1="340" y1="145" x2="380" y2="145" stroke="#ff6b6b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="360" y="142" textAnchor="middle" fill="#ff6b6b" fontSize="7" fontFamily="'Oxanium', sans-serif">
              dropped
            </text>
          </motion.g>
          
          {/* Explanation */}
          <rect x="50" y="180" width="400" height="70" rx="6" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(255, 107, 107, 0.3)" strokeWidth="1" />
          <text x="250" y="202" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Result: IDS Sees Different Stream
          </text>
          <text x="250" y="220" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            IDS reconstructs "MALIBENIGN" → no signature match (benign)
          </text>
          <text x="250" y="235" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Target processes "MALI" → malicious payload executed
          </text>
        </g>

        {/* EVASION ATTACK */}
        <g>
          <text x="680" y="70" textAnchor="middle" fill="#ffd93d" fontSize="15" fontWeight="700" fontFamily="'Sora', sans-serif">
            Evasion Attack
          </text>
          <text x="680" y="88" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Target accepts packet that IDS rejects
          </text>
          
          {/* Attacker */}
          <rect x="510" y="110" width="80" height="50" rx="6" fill="rgba(255, 217, 61, 0.12)" stroke="#ffd93d" strokeWidth="2" />
          <text x="550" y="135" textAnchor="middle" fill="#ffd93d" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Attacker
          </text>
          
          {/* Packets sent */}
          <g>
            {/* Packet IDS rejects */}
            <motion.rect
              x="620"
              y="115"
              width="60"
              height="18"
              rx="3"
              fill="rgba(255, 107, 107, 0.15)"
              stroke="#ff6b6b"
              strokeWidth="1"
              strokeDasharray="3,3"
              initial={{ x: 510 }}
              animate={{ x: 620 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <text x="650" y="128" textAnchor="middle" fill="#ff6b6b" fontSize="8" fontFamily="'Oxanium', sans-serif">
              BENIGN
            </text>
            <text x="690" y="128" fill="#ff6b6b" fontSize="7" fontFamily="'Oxanium', sans-serif">
              bad
            </text>
            
            {/* Valid malicious packet */}
            <motion.rect
              x="620"
              y="137"
              width="60"
              height="18"
              rx="3"
              fill="rgba(255, 217, 61, 0.15)"
              stroke="#ffd93d"
              strokeWidth="1"
              initial={{ x: 510 }}
              animate={{ x: 620 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            <text x="650" y="150" textAnchor="middle" fill="#ffd93d" fontSize="8" fontFamily="'Oxanium', sans-serif">
              ATTACK
            </text>
          </g>
          
          {/* IDS */}
          <motion.rect
            x="730"
            y="110"
            width="70"
            height="50"
            rx="6"
            fill="rgba(2, 168, 154, 0.12)"
            stroke="#02a89a"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />
          <text x="765" y="130" textAnchor="middle" fill="#02a89a" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            IDS
          </text>
          <text x="765" y="145" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="8" fontFamily="'Oxanium', sans-serif">
            Sees:
          </text>
          <text x="765" y="156" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="8" fontFamily="'Oxanium', sans-serif">
            ATTACK (only)
          </text>
          
          {/* Arrow to IDS - rejected packet shown */}
          <motion.path
            d="M 680 125 L 730 125"
            stroke="#ff6b6b"
            strokeWidth="2"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <text x="705" y="120" textAnchor="middle" fill="#ff6b6b" fontSize="7" fontFamily="'Oxanium', sans-serif">
            dropped
          </text>
          
          {/* Arrow to IDS - attack packet */}
          <motion.path
            d="M 680 145 L 730 145"
            stroke="#3de9a0"
            strokeWidth="2"
            markerEnd="url(#arrow3)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          />
          
          {/* Target */}
          <motion.rect
            x="840"
            y="110"
            width="70"
            height="50"
            rx="6"
            fill="rgba(255, 217, 61, 0.12)"
            stroke="#ffd93d"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          />
          <text x="875" y="130" textAnchor="middle" fill="#ffd93d" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
            Target
          </text>
          <text x="875" y="145" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="8" fontFamily="'Oxanium', sans-serif">
            Sees:
          </text>
          <text x="875" y="156" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="8" fontFamily="'Oxanium', sans-serif">
            BENIGNATTACK
          </text>
          
          {/* Arrows to target */}
          <motion.path
            d="M 800 125 L 840 125"
            stroke="#2dd68f"
            strokeWidth="2"
            markerEnd="url(#arrow4)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
          />
          <motion.path
            d="M 800 145 L 840 145"
            stroke="#ffd93d"
            strokeWidth="2"
            markerEnd="url(#arrow5)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          />
          
          {/* Explanation */}
          <rect x="510" y="180" width="400" height="70" rx="6" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(255, 217, 61, 0.3)" strokeWidth="1" />
          <text x="710" y="202" textAnchor="middle" fill="#ffd93d" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Result: Target Sees Different Stream
          </text>
          <text x="710" y="220" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            IDS reconstructs "ATTACK" → alert triggered (false positive)
          </text>
          <text x="710" y="235" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Target processes "BENIGNATTACK" → attack succeeds undetected
          </text>
        </g>

        {/* Comparison divider */}
        <line x1="475" y1="100" x2="475" y2="250" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" strokeDasharray="8,8" />

        {/* Modern defenses section */}
        <g>
          <rect x="100" y="280" width="700" height="190" rx="12" fill="rgba(45, 214, 143, 0.08)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="2" />
          
          <text x="450" y="310" textAnchor="middle" fill="#2dd68f" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            Modern IDS/IPS Defense Mechanisms
          </text>
          
          <g>
            <rect x="130" y="330" width="290" height="120" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
            <text x="275" y="353" textAnchor="middle" fill="#02a89a" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Stream Reassembly
            </text>
            <text x="145" y="373" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • Reassemble TCP stream before inspection
            </text>
            <text x="145" y="390" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • Normalize fragments and overlaps
            </text>
            <text x="145" y="407" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • Track connection state (SYN, ACK, seq)
            </text>
            <text x="145" y="424" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • Apply same reassembly logic as target OS
            </text>
            <text x="145" y="441" fill="#2dd68f" fontSize="9" fontWeight="700" fontFamily="'Oxanium', sans-serif">
              ✓ Prevents insertion/evasion attacks
            </text>
          </g>
          
          <g>
            <rect x="450" y="330" width="290" height="120" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
            <text x="595" y="353" textAnchor="middle" fill="#5CF2FF" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Target-Based Policies
            </text>
            <text x="465" y="373" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • Configure IDS to match target OS behavior
            </text>
            <text x="465" y="390" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • Windows accepts overlaps differently than Linux
            </text>
            <text x="465" y="407" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • IDS mimics target's fragment handling
            </text>
            <text x="465" y="424" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • Reduces false positives/negatives
            </text>
            <text x="465" y="441" fill="#5CF2FF" fontSize="9" fontWeight="700" fontFamily="'Oxanium', sans-serif">
              ✓ IDS and target see identical streams
            </text>
          </g>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#3de9a0" />
          </marker>
          <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2dd68f" />
          </marker>
          <marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#3de9a0" />
          </marker>
          <marker id="arrow4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2dd68f" />
          </marker>
          <marker id="arrow5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#ffd93d" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
