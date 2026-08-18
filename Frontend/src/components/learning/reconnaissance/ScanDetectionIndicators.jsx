import { motion } from 'framer-motion';

export default function ScanDetectionIndicators() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem',
      background: 'rgba(10, 15, 15, 0.6)',
      borderRadius: '16px',
      border: '1px solid rgba(2, 168, 154, 0.2)'
    }}>
      <svg viewBox="0 0 1000 600" style={{ width: '100%', height: 'auto' }}>
        {/* Title */}
        <text x="500" y="30" textAnchor="middle" fill="#e6e9f0" fontSize="18" fontWeight="700" fontFamily="'Sora', sans-serif">
          🛡️ How Defenders Detect Reconnaissance
        </text>
        <text x="500" y="50" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="12" fontFamily="'Oxanium', sans-serif">
          Understanding defensive visibility into scanning activity
        </text>

        {/* Attacker side */}
        <g>
          <motion.rect
            x="50"
            y="90"
            width="180"
            height="80"
            rx="8"
            fill="rgba(255, 107, 107, 0.12)"
            stroke="#ff6b6b"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <text x="140" y="120" textAnchor="middle" fill="#ff6b6b" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            Attacker
          </text>
          <text x="140" y="140" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Running Nmap
          </text>
          <text x="140" y="155" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            192.168.1.100
          </text>
        </g>

        {/* Scan patterns */}
        <g>
          <motion.path
            d="M 230 130 Q 350 130 450 160"
            stroke="#ff6b6b"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            markerEnd="url(#arrow-scan)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
          />
          <text x="340" y="120" textAnchor="middle" fill="#ff6b6b" fontSize="10" fontFamily="'Oxanium', sans-serif">
            SYN floods
          </text>
        </g>

        {/* Detection systems */}
        <g>
          <rect x="450" y="90" width="500" height="450" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(2, 168, 154, 0.4)" strokeWidth="2" />
          <text x="700" y="120" textAnchor="middle" fill="#02a89a" fontSize="15" fontWeight="700" fontFamily="'Sora', sans-serif">
            Defensive Detection Layers
          </text>

          {/* Firewall */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <rect x="470" y="145" width="460" height="70" rx="6" fill="rgba(255, 217, 61, 0.12)" stroke="#ffd93d" strokeWidth="2" />
            <circle cx="495" cy="180" r="18" fill="rgba(255, 217, 61, 0.2)" stroke="#ffd93d" strokeWidth="2" />
            <text x="510" y="175" fill="#ffd93d" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
              FW
            </text>
            
            <text x="540" y="170" fill="#ffd93d" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
              Firewall
            </text>
            <text x="540" y="188" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              • Detects: Port scanning patterns, unusual connection attempts
            </text>
            <text x="540" y="203" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              • Logs: Source IP, destination ports, connection states
            </text>
          </motion.g>

          {/* IDS/IPS */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <rect x="470" y="230" width="460" height="70" rx="6" fill="rgba(255, 107, 107, 0.12)" stroke="#ff6b6b" strokeWidth="2" />
            <circle cx="495" cy="265" r="18" fill="rgba(255, 107, 107, 0.2)" stroke="#ff6b6b" strokeWidth="2" />
            <text x="502" y="272" fill="#ff6b6b" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">
              ⚡
            </text>
            
            <text x="540" y="255" fill="#ff6b6b" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
              IDS/IPS (Intrusion Detection/Prevention)
            </text>
            <text x="540" y="273" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              • Detects: Nmap signatures, scan timing patterns, OS fingerprinting
            </text>
            <text x="540" y="288" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              • Action: Alerts security team, can block attacker IP (IPS mode)
            </text>
          </motion.g>

          {/* SIEM */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <rect x="470" y="315" width="460" height="70" rx="6" fill="rgba(92, 242, 255, 0.12)" stroke="#5CF2FF" strokeWidth="2" />
            <circle cx="495" cy="350" r="18" fill="rgba(92, 242, 255, 0.2)" stroke="#5CF2FF" strokeWidth="2" />
            <text x="498" y="357" fill="#5CF2FF" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">
              📊
            </text>
            
            <text x="540" y="340" fill="#5CF2FF" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
              SIEM (Security Information & Event Management)
            </text>
            <text x="540" y="358" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              • Correlates: Logs from firewall, IDS, servers, failed auth attempts
            </text>
            <text x="540" y="373" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              • Identifies: Distributed scans, reconnaissance across multiple targets
            </text>
          </motion.g>

          {/* Network Monitoring */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          >
            <rect x="470" y="400" width="460" height="70" rx="6" fill="rgba(45, 214, 143, 0.12)" stroke="#2dd68f" strokeWidth="2" />
            <circle cx="495" cy="435" r="18" fill="rgba(45, 214, 143, 0.2)" stroke="#2dd68f" strokeWidth="2" />
            <text x="498" y="442" fill="#2dd68f" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">
              📡
            </text>
            
            <text x="540" y="425" fill="#2dd68f" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
              Network Traffic Analysis
            </text>
            <text x="540" y="443" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              • Detects: Traffic anomalies, unusual packet patterns, bandwidth spikes
            </text>
            <text x="540" y="458" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              • Baseline: Compares current behavior against normal network patterns
            </text>
          </motion.g>

          {/* Alert box */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            <rect x="470" y="485" width="460" height="45" rx="6" fill="rgba(255, 107, 107, 0.2)" stroke="#ff6b6b" strokeWidth="2" />
            <text x="700" y="505" textAnchor="middle" fill="#ff6b6b" fontSize="12" fontWeight="700" fontFamily="'Sora', sans-serif">
              🚨 ALERT: Reconnaissance Activity Detected
            </text>
            <text x="700" y="522" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Multiple port connection attempts from 192.168.1.100 - Possible Nmap scan
            </text>
          </motion.g>
        </g>

        {/* Detection indicators box */}
        <g>
          <rect x="50" y="200" width="350" height="340" rx="8" fill="rgba(10, 15, 15, 0.9)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
          <text x="225" y="230" textAnchor="middle" fill="#02a89a" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            What Makes Scans Detectable?
          </text>

          <g>
            <rect x="70" y="250" width="310" height="70" rx="4" fill="rgba(255, 107, 107, 0.08)" stroke="rgba(255, 107, 107, 0.3)" strokeWidth="1" />
            <text x="80" y="270" fill="#ff6b6b" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              🔴 HIGH NOISE: Sequential Port Scans
            </text>
            <text x="80" y="288" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              Scanning ports 1-65535 in order creates an obvious signature.
            </text>
            <text x="80" y="302" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              IDS systems easily detect this pattern.
            </text>
          </g>

          <g>
            <rect x="70" y="330" width="310" height="70" rx="4" fill="rgba(255, 217, 61, 0.08)" stroke="rgba(255, 217, 61, 0.3)" strokeWidth="1" />
            <text x="80" y="350" fill="#ffd93d" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              ⚠️ MEDIUM NOISE: Rapid Scans (-T4, -T5)
            </text>
            <text x="80" y="368" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              Fast scans generate high packet volumes in short time.
            </text>
            <text x="80" y="382" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              Traffic spike triggers anomaly detection systems.
            </text>
          </g>

          <g>
            <rect x="70" y="410" width="310" height="70" rx="4" fill="rgba(92, 242, 255, 0.08)" stroke="rgba(92, 242, 255, 0.3)" strokeWidth="1" />
            <text x="80" y="430" fill="#5CF2FF" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              ℹ️ LOWER NOISE: Stealth Techniques
            </text>
            <text x="80" y="448" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • Slow timing (-T0, -T1) spreads traffic over hours
            </text>
            <text x="80" y="462" fill="rgba(224, 224, 224, 0.8)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • Randomized port order avoids sequential patterns
            </text>
            <text x="80" y="476" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              • Source IP spoofing (advanced, not always practical)
            </text>
          </g>

          <g>
            <rect x="70" y="490" width="310" height="40" rx="4" fill="rgba(45, 214, 143, 0.08)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="1" />
            <text x="225" y="510" textAnchor="middle" fill="#2dd68f" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
              ✓ Reality Check: No scan is truly invisible
            </text>
            <text x="225" y="524" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="8" fontFamily="'Oxanium', sans-serif">
              All scans leave logs. Stealth only delays detection.
            </text>
          </g>
        </g>

        {/* Arrow marker */}
        <defs>
          <marker id="arrow-scan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#ff6b6b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
