import { motion } from 'framer-motion';

export default function DetectionMethodComparison() {
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
      <svg viewBox="0 0 900 600" style={{ width: '100%', height: 'auto' }}>
        {/* Title */}
        <text x="450" y="30" textAnchor="middle" fill="#e6e9f0" fontSize="18" fontWeight="700" fontFamily="'Sora', sans-serif">
          IDS Detection Methods: Signature vs Anomaly
        </text>

        {/* SIGNATURE-BASED */}
        <g>
          <text x="220" y="75" textAnchor="middle" fill="#2dd68f" fontSize="16" fontWeight="700" fontFamily="'Sora', sans-serif">
            Signature-Based Detection
          </text>
          
          {/* Database */}
          <motion.rect
            x="80"
            y="100"
            width="280"
            height="100"
            rx="8"
            fill="rgba(45, 214, 143, 0.08)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <text x="220" y="125" textAnchor="middle" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">
            Signature Database
          </text>
          <text x="220" y="145" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Known attack pattern: CVE-2021-44228
          </text>
          <text x="220" y="160" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Known malware hash: a3f8b9c2...
          </text>
          <text x="220" y="175" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Known C2 domain: evil-server.com
          </text>
          <text x="220" y="190" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            SQL injection pattern: ' OR 1=1--
          </text>
          
          {/* Incoming traffic */}
          <motion.circle
            cx="40"
            cy="260"
            r="10"
            fill="#3de9a0"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
          />
          <text x="70" y="265" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Incoming Traffic
          </text>
          
          {/* Match process */}
          <motion.rect
            x="80"
            y="230"
            width="280"
            height="80"
            rx="8"
            fill="rgba(2, 168, 154, 0.08)"
            stroke="#02a89a"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <text x="220" y="255" textAnchor="middle" fill="#02a89a" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Pattern Matching Engine
          </text>
          <text x="220" y="275" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Compare traffic against signature database
          </text>
          <motion.text
            x="220"
            y="295"
            textAnchor="middle"
            fill="#2dd68f"
            fontSize="9"
            fontFamily="'Oxanium', sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
          >
            Checking... Checking... Checking...
          </motion.text>
          
          <line x1="220" y1="200" x2="220" y2="230" stroke="#2dd68f" strokeWidth="2" strokeDasharray="4,4" />
          
          {/* Results */}
          <g>
            <motion.rect
              x="80"
              y="340"
              width="130"
              height="60"
              rx="6"
              fill="rgba(45, 214, 143, 0.12)"
              stroke="#2dd68f"
              strokeWidth="2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
            <text x="145" y="365" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Match Found
            </text>
            <text x="145" y="382" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✓ Alert: Known
            </text>
            <text x="145" y="395" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              attack detected
            </text>
            
            <motion.rect
              x="230"
              y="340"
              width="130"
              height="60"
              rx="6"
              fill="rgba(255, 107, 107, 0.12)"
              stroke="#ff6b6b"
              strokeWidth="2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />
            <text x="295" y="365" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              No Match
            </text>
            <text x="295" y="382" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✗ Zero-day attack
            </text>
            <text x="295" y="395" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              passes through
            </text>
          </g>
          
          {/* Pros/Cons */}
          <rect x="80" y="430" width="280" height="120" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="1" />
          <text x="220" y="455" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Strengths & Weaknesses
          </text>
          
          <text x="95" y="477" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ High accuracy for known threats
          </text>
          <text x="95" y="493" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Low false positive rate
          </text>
          <text x="95" y="509" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Fast pattern matching
          </text>
          
          <text x="95" y="530" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✗ Cannot detect zero-day attacks
          </text>
          <text x="95" y="545" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✗ Requires constant signature updates
          </text>
        </g>

        {/* ANOMALY-BASED */}
        <g>
          <text x="680" y="75" textAnchor="middle" fill="#5CF2FF" fontSize="16" fontWeight="700" fontFamily="'Sora', sans-serif">
            Anomaly-Based Detection
          </text>
          
          {/* Baseline learning */}
          <motion.rect
            x="540"
            y="100"
            width="280"
            height="100"
            rx="8"
            fill="rgba(92, 242, 255, 0.08)"
            stroke="#5CF2FF"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <text x="680" y="125" textAnchor="middle" fill="#5CF2FF" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">
            Baseline "Normal" Behavior
          </text>
          <text x="680" y="145" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Traffic rate: 1,000 packets/sec
          </text>
          <text x="680" y="160" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Connection count: 50 concurrent
          </text>
          <text x="680" y="175" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Protocol mix: 70% HTTPS, 20% DNS, 10% other
          </text>
          <text x="680" y="190" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Login attempts: 2-5 per minute
          </text>
          
          {/* Incoming traffic */}
          <motion.circle
            cx="500"
            cy="260"
            r="10"
            fill="#3de9a0"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, repeat: Infinity, repeatDelay: 1.5 }}
          />
          <text x="460" y="265" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Live Traffic
          </text>
          
          {/* Comparison */}
          <motion.rect
            x="540"
            y="230"
            width="280"
            height="80"
            rx="8"
            fill="rgba(2, 168, 154, 0.08)"
            stroke="#02a89a"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <text x="680" y="255" textAnchor="middle" fill="#02a89a" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Behavioral Analysis Engine
          </text>
          <text x="680" y="275" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            Compare current behavior to baseline
          </text>
          <motion.text
            x="680"
            y="295"
            textAnchor="middle"
            fill="#5CF2FF"
            fontSize="9"
            fontFamily="'Oxanium', sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, delay: 1.3, repeat: Infinity, repeatDelay: 1 }}
          >
            Analyzing deviation... Statistical check...
          </motion.text>
          
          <line x1="680" y1="200" x2="680" y2="230" stroke="#5CF2FF" strokeWidth="2" strokeDasharray="4,4" />
          
          {/* Results */}
          <g>
            <motion.rect
              x="540"
              y="340"
              width="130"
              height="60"
              rx="6"
              fill="rgba(45, 214, 143, 0.12)"
              stroke="#2dd68f"
              strokeWidth="2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            />
            <text x="605" y="365" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Normal
            </text>
            <text x="605" y="382" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✓ Within baseline
            </text>
            <text x="605" y="395" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              parameters
            </text>
            
            <motion.rect
              x="690"
              y="340"
              width="130"
              height="60"
              rx="6"
              fill="rgba(255, 217, 61, 0.12)"
              stroke="#ffd93d"
              strokeWidth="2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            />
            <text x="755" y="365" textAnchor="middle" fill="#ffd93d" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Anomaly!
            </text>
            <text x="755" y="382" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ⚠ Alert: Unusual
            </text>
            <text x="755" y="395" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              behavior detected
            </text>
          </g>
          
          {/* Pros/Cons */}
          <rect x="540" y="430" width="280" height="120" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(92, 242, 255, 0.3)" strokeWidth="1" />
          <text x="680" y="455" textAnchor="middle" fill="#5CF2FF" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Strengths & Weaknesses
          </text>
          
          <text x="555" y="477" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Can detect zero-day attacks
          </text>
          <text x="555" y="493" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Identifies novel attack patterns
          </text>
          <text x="555" y="509" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ No signature updates needed
          </text>
          
          <text x="555" y="530" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✗ Higher false positive rate
          </text>
          <text x="555" y="545" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✗ Requires training period for baseline
          </text>
        </g>

        {/* Comparison divider */}
        <line x1="450" y1="90" x2="450" y2="560" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" strokeDasharray="8,8" />
        
        {/* Bottom comparison */}
        <rect x="100" y="565" width="700" height="25" rx="6" fill="rgba(2, 168, 154, 0.08)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
        <text x="450" y="582" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
          Modern IDS/IPS systems combine BOTH methods for comprehensive threat detection
        </text>
      </svg>
    </div>
  );
}
