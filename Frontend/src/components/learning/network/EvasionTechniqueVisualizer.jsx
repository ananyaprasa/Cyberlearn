import { motion } from 'framer-motion';
import { useState } from 'react';

export default function EvasionTechniqueVisualizer() {
  const [activeTechnique, setActiveTechnique] = useState('fragmentation');

  const techniques = {
    fragmentation: {
      title: 'Packet Fragmentation',
      description: 'Split attack payload across multiple fragments',
      color: '#2dd68f'
    },
    sourcePort: {
      title: 'Source Port Manipulation',
      description: 'Use trusted source ports (53, 80) to bypass ACLs',
      color: '#02a89a'
    },
    tunneling: {
      title: 'Protocol Tunneling',
      description: 'Encapsulate blocked protocols inside allowed ones',
      color: '#5CF2FF'
    },
    decoy: {
      title: 'Decoy Scanning',
      description: 'Flood logs with fake IPs to hide real attacker',
      color: '#ffd93d'
    }
  };

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
      {/* Technique selector */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {Object.entries(techniques).map(([key, tech]) => (
          <button
            key={key}
            onClick={() => setActiveTechnique(key)}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTechnique === key 
                ? `rgba(${tech.color === '#2dd68f' ? '45, 214, 143' : tech.color === '#02a89a' ? '2, 168, 154' : tech.color === '#5CF2FF' ? '92, 242, 255' : '255, 217, 61'}, 0.2)`
                : 'rgba(10, 15, 15, 0.8)',
              border: `2px solid ${activeTechnique === key ? tech.color : 'rgba(2, 168, 154, 0.3)'}`,
              borderRadius: '8px',
              color: activeTechnique === key ? tech.color : 'rgba(224, 224, 224, 0.7)',
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {tech.title}
          </button>
        ))}
      </div>

      {/* Visualization area */}
      <svg viewBox="0 0 900 400" style={{ width: '100%', height: 'auto' }}>
        {/* Title */}
        <text x="450" y="30" textAnchor="middle" fill="#e6e9f0" fontSize="16" fontWeight="700" fontFamily="'Sora', sans-serif">
          {techniques[activeTechnique].title}
        </text>
        <text x="450" y="50" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="12" fontFamily="'Oxanium', sans-serif">
          {techniques[activeTechnique].description}
        </text>

        {/* Fragmentation visualization */}
        {activeTechnique === 'fragmentation' && (
          <g>
            {/* Normal packet */}
            <text x="150" y="100" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Sora', sans-serif">
              Normal Packet:
            </text>
            <rect x="50" y="110" width="200" height="40" rx="4" fill="rgba(45, 214, 143, 0.15)" stroke="#2dd68f" strokeWidth="2" />
            <text x="150" y="135" textAnchor="middle" fill="#e6e9f0" fontSize="10" fontFamily="'Oxanium', sans-serif">
              MALICIOUS PAYLOAD SIGNATURE
            </text>
            
            {/* Firewall sees it */}
            <motion.circle
              cx="300"
              cy="130"
              r="35"
              fill="rgba(255, 107, 107, 0.15)"
              stroke="#ff6b6b"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <text x="300" y="125" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Firewall
            </text>
            <text x="300" y="140" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✗ BLOCKED
            </text>
            
            <motion.path
              d="M 250 130 L 265 130"
              stroke="#ff6b6b"
              strokeWidth="2"
              markerEnd="url(#arrowBlocked)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />

            {/* Fragmented packets */}
            <text x="150" y="220" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Sora', sans-serif">
              Fragmented (Evasion):
            </text>
            
            <motion.rect
              x="50"
              y="230"
              width="60"
              height="35"
              rx="4"
              fill="rgba(45, 214, 143, 0.15)"
              stroke="#2dd68f"
              strokeWidth="2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
            <text x="80" y="252" textAnchor="middle" fill="#e6e9f0" fontSize="8" fontFamily="'Oxanium', sans-serif">
              MALI
            </text>
            
            <motion.rect
              x="120"
              y="230"
              width="60"
              height="35"
              rx="4"
              fill="rgba(45, 214, 143, 0.15)"
              stroke="#2dd68f"
              strokeWidth="2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />
            <text x="150" y="252" textAnchor="middle" fill="#e6e9f0" fontSize="8" fontFamily="'Oxanium', sans-serif">
              CIOUS
            </text>
            
            <motion.rect
              x="190"
              y="230"
              width="60"
              height="35"
              rx="4"
              fill="rgba(45, 214, 143, 0.15)"
              stroke="#2dd68f"
              strokeWidth="2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            />
            <text x="220" y="245" textAnchor="middle" fill="#e6e9f0" fontSize="8" fontFamily="'Oxanium', sans-serif">
              PAYLOAD
            </text>
            <text x="220" y="258" textAnchor="middle" fill="#e6e9f0" fontSize="8" fontFamily="'Oxanium', sans-serif">
              SIG
            </text>
            
            {/* Fragments pass through */}
            <motion.circle
              cx="320"
              cy="247"
              r="35"
              fill="rgba(45, 214, 143, 0.15)"
              stroke="#2dd68f"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            />
            <text x="320" y="242" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Firewall
            </text>
            <text x="320" y="257" textAnchor="middle" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✓ ALLOWED
            </text>
            
            <motion.path
              d="M 260 247 L 285 247"
              stroke="#2dd68f"
              strokeWidth="2"
              markerEnd="url(#arrowAllowed)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
            />
            
            {/* Reassembly at target */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              <text x="450" y="242" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="10" fontFamily="'Oxanium', sans-serif">
                Target reassembles →
              </text>
              <rect x="540" y="225" width="120" height="40" rx="4" fill="rgba(255, 107, 107, 0.15)" stroke="#ff6b6b" strokeWidth="2" />
              <text x="600" y="250" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontWeight="700" fontFamily="'Oxanium', sans-serif">
                MALICIOUS PAYLOAD
              </text>
            </motion.g>

            {/* Explanation */}
            <rect x="50" y="310" width="800" height="70" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="1" />
            <text x="450" y="335" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Why It Works:
            </text>
            <text x="450" y="353" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Stateless firewalls inspect each fragment independently. No individual fragment matches the attack signature.
            </text>
            <text x="450" y="369" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Target host reassembles fragments into complete malicious payload.
            </text>
          </g>
        )}

        {/* Source Port Manipulation visualization */}
        {activeTechnique === 'sourcePort' && (
          <g>
            {/* Blocked packet */}
            <text x="150" y="100" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Sora', sans-serif">
              Normal Probe:
            </text>
            <rect x="50" y="110" width="200" height="50" rx="4" fill="rgba(255, 107, 107, 0.15)" stroke="#ff6b6b" strokeWidth="2" />
            <text x="150" y="130" textAnchor="middle" fill="#e6e9f0" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Src: 192.168.1.100:45678
            </text>
            <text x="150" y="148" textAnchor="middle" fill="#e6e9f0" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Dst: Target:22 (SSH)
            </text>
            
            <motion.circle
              cx="320"
              cy="135"
              r="35"
              fill="rgba(255, 107, 107, 0.15)"
              stroke="#ff6b6b"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <text x="320" y="130" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Firewall
            </text>
            <text x="320" y="145" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✗ BLOCKED
            </text>
            
            <motion.path
              d="M 250 135 L 285 135"
              stroke="#ff6b6b"
              strokeWidth="2"
              markerEnd="url(#arrowBlocked)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />

            {/* Spoofed source port */}
            <text x="150" y="230" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Sora', sans-serif">
              Source Port Spoofed:
            </text>
            <motion.rect
              x="50"
              y="240"
              width="200"
              height="50"
              rx="4"
              fill="rgba(2, 168, 154, 0.15)"
              stroke="#02a89a"
              strokeWidth="2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
            <text x="150" y="260" textAnchor="middle" fill="#02a89a" fontSize="10" fontWeight="700" fontFamily="'Oxanium', sans-serif">
              Src: 192.168.1.100:53 (DNS)
            </text>
            <text x="150" y="278" textAnchor="middle" fill="#e6e9f0" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Dst: Target:22 (SSH)
            </text>
            
            <motion.circle
              cx="320"
              cy="265"
              r="35"
              fill="rgba(45, 214, 143, 0.15)"
              stroke="#2dd68f"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            />
            <text x="320" y="260" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Firewall
            </text>
            <text x="320" y="275" textAnchor="middle" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✓ ALLOWED
            </text>
            
            <motion.path
              d="M 250 265 L 285 265"
              stroke="#2dd68f"
              strokeWidth="2"
              markerEnd="url(#arrowAllowed)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
            />
            
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              <rect x="380" y="240" width="100" height="50" rx="4" fill="rgba(45, 214, 143, 0.15)" stroke="#2dd68f" strokeWidth="2" />
              <text x="430" y="260" textAnchor="middle" fill="#2dd68f" fontSize="10" fontWeight="700" fontFamily="'Sora', sans-serif">
                Target
              </text>
              <text x="430" y="277" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
                Port scanned
              </text>
            </motion.g>

            {/* Explanation */}
            <rect x="50" y="320" width="800" height="60" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(2, 168, 154, 0.3)" strokeWidth="1" />
            <text x="450" y="345" textAnchor="middle" fill="#02a89a" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Why It Works:
            </text>
            <text x="450" y="363" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Naive firewall rules allow traffic from trusted source ports (53/DNS, 80/HTTP, 443/HTTPS) without deep inspection.
            </text>
          </g>
        )}

        {/* Protocol Tunneling visualization */}
        {activeTechnique === 'tunneling' && (
          <g>
            <text x="150" y="100" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Sora', sans-serif">
              Direct (Blocked):
            </text>
            <rect x="50" y="110" width="200" height="40" rx="4" fill="rgba(255, 107, 107, 0.15)" stroke="#ff6b6b" strokeWidth="2" />
            <text x="150" y="135" textAnchor="middle" fill="#e6e9f0" fontSize="10" fontFamily="'Oxanium', sans-serif">
              SSH Traffic (Port 22)
            </text>
            
            <motion.circle
              cx="320"
              cy="130"
              r="35"
              fill="rgba(255, 107, 107, 0.15)"
              stroke="#ff6b6b"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <text x="320" y="130" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✗ BLOCKED
            </text>
            
            {/* Tunneled */}
            <text x="150" y="210" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Sora', sans-serif">
              Tunneled (Allowed):
            </text>
            
            <motion.rect
              x="50"
              y="220"
              width="200"
              height="70"
              rx="4"
              fill="rgba(92, 242, 255, 0.15)"
              stroke="#5CF2FF"
              strokeWidth="2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            />
            
            <text x="150" y="240" textAnchor="middle" fill="#5CF2FF" fontSize="10" fontWeight="700" fontFamily="'Oxanium', sans-serif">
              DNS Query (Port 53)
            </text>
            <rect x="70" y="248" width="160" height="30" rx="3" fill="rgba(45, 214, 143, 0.12)" stroke="#2dd68f" strokeWidth="1" strokeDasharray="3,3" />
            <text x="150" y="268" textAnchor="middle" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
              SSH data inside DNS payload
            </text>
            
            <motion.circle
              cx="320"
              cy="255"
              r="35"
              fill="rgba(45, 214, 143, 0.15)"
              stroke="#2dd68f"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            />
            <text x="320" y="255" textAnchor="middle" fill="#2dd68f" fontSize="9" fontFamily="'Oxanium', sans-serif">
              ✓ ALLOWED
            </text>
            
            <motion.path
              d="M 250 255 L 285 255"
              stroke="#2dd68f"
              strokeWidth="2"
              markerEnd="url(#arrowAllowed)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
            />
            
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              <text x="480" y="250" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="10" fontFamily="'Oxanium', sans-serif">
                Server extracts →
              </text>
              <rect x="550" y="230" width="100" height="50" rx="4" fill="rgba(45, 214, 143, 0.15)" stroke="#2dd68f" strokeWidth="2" />
              <text x="600" y="255" textAnchor="middle" fill="#2dd68f" fontSize="9" fontWeight="700" fontFamily="'Oxanium', sans-serif">
                SSH Data
              </text>
            </motion.g>

            {/* Explanation */}
            <rect x="50" y="320" width="800" height="60" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(92, 242, 255, 0.3)" strokeWidth="1" />
            <text x="450" y="345" textAnchor="middle" fill="#5CF2FF" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Protocol Tunneling:
            </text>
            <text x="450" y="363" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Encapsulate blocked protocols inside allowed ones. DNS, ICMP, HTTP all used for covert channels.
            </text>
          </g>
        )}

        {/* Decoy scanning visualization */}
        {activeTechnique === 'decoy' && (
          <g>
            <text x="450" y="100" textAnchor="middle" fill="rgba(224, 224, 224, 0.9)" fontSize="11" fontFamily="'Sora', sans-serif">
              Decoy Scanning Floods Logs:
            </text>
            
            {/* Multiple decoy sources */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
              >
                <rect
                  x="50"
                  y={130 + i * 45}
                  width="150"
                  height="35"
                  rx="4"
                  fill={i === 2 ? "rgba(255, 217, 61, 0.15)" : "rgba(171, 207, 201, 0.08)"}
                  stroke={i === 2 ? "#ffd93d" : "rgba(171, 207, 201, 0.3)"}
                  strokeWidth={i === 2 ? "2" : "1"}
                />
                <text
                  x="125"
                  y={153 + i * 45}
                  textAnchor="middle"
                  fill={i === 2 ? "#ffd93d" : "rgba(224, 224, 224, 0.6)"}
                  fontSize={i === 2 ? "10" : "9"}
                  fontWeight={i === 2 ? "700" : "400"}
                  fontFamily="'Oxanium', sans-serif"
                >
                  {i === 2 ? "192.168.1.100 (REAL)" : `10.0.${i}.${Math.floor(Math.random() * 255)} (DECOY)`}
                </text>
              </motion.g>
            ))}
            
            {/* All arrows to firewall */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.path
                key={`arrow-${i}`}
                d={`M 200 ${147 + i * 45} L 270 ${147 + i * 45}`}
                stroke={i === 2 ? "#ffd93d" : "rgba(171, 207, 201, 0.5)"}
                strokeWidth={i === 2 ? "3" : "1"}
                markerEnd={i === 2 ? "url(#arrowReal)" : "url(#arrowDecoy)"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              />
            ))}
            
            {/* Firewall */}
            <motion.rect
              x="270"
              y="170"
              width="80"
              height="120"
              rx="6"
              fill="rgba(2, 168, 154, 0.12)"
              stroke="#02a89a"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            />
            <text x="310" y="220" textAnchor="middle" fill="#02a89a" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Firewall
            </text>
            <text x="310" y="237" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              Logs:
            </text>
            <text x="310" y="253" textAnchor="middle" fill="rgba(224, 224, 224, 0.6)" fontSize="7" fontFamily="'Oxanium', sans-serif">
              10.0.0.x
            </text>
            <text x="310" y="263" textAnchor="middle" fill="rgba(224, 224, 224, 0.6)" fontSize="7" fontFamily="'Oxanium', sans-serif">
              10.0.1.x
            </text>
            <text x="310" y="273" textAnchor="middle" fill="#ffd93d" fontSize="7" fontWeight="700" fontFamily="'Oxanium', sans-serif">
              192.168.1.100
            </text>
            <text x="310" y="283" textAnchor="middle" fill="rgba(224, 224, 224, 0.6)" fontSize="7" fontFamily="'Oxanium', sans-serif">
              10.0.3.x
            </text>
            
            {/* Target */}
            <motion.rect
              x="420"
              y="200"
              width="100"
              height="60"
              rx="6"
              fill="rgba(45, 214, 143, 0.12)"
              stroke="#2dd68f"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            />
            <text x="470" y="225" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Target
            </text>
            <text x="470" y="242" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              All probes
            </text>
            <text x="470" y="255" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
              reach target
            </text>
            
            <motion.path
              d="M 350 230 L 420 230"
              stroke="#3de9a0"
              strokeWidth="2"
              markerEnd="url(#arrowAllowed)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            />

            {/* Explanation */}
            <rect x="50" y="340" width="800" height="50" rx="8" fill="rgba(10, 15, 15, 0.8)" stroke="rgba(255, 217, 61, 0.3)" strokeWidth="1" />
            <text x="450" y="363" textAnchor="middle" fill="#ffd93d" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
              Decoy Effect:
            </text>
            <text x="450" y="379" textAnchor="middle" fill="rgba(224, 224, 224, 0.75)" fontSize="10" fontFamily="'Oxanium', sans-serif">
              Logs flooded with fake IPs make it hard to identify and block the real attacker's address.
            </text>
          </g>
        )}

        {/* Arrow markers */}
        <defs>
          <marker id="arrowBlocked" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#ff6b6b" />
          </marker>
          <marker id="arrowAllowed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2dd68f" />
          </marker>
          <marker id="arrowReal" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#ffd93d" />
          </marker>
          <marker id="arrowDecoy" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="rgba(171, 207, 201, 0.5)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
