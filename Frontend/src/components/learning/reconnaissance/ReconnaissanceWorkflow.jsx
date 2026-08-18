import { motion } from 'framer-motion';

export default function ReconnaissanceWorkflow() {
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
          Reconnaissance Investigation Workflow
        </text>
        <text x="450" y="50" textAnchor="middle" fill="rgba(171, 207, 201, 0.7)" fontSize="12" fontFamily="'Oxanium', sans-serif">
          From objective to actionable intelligence
        </text>

        {/* Step 1: Define Objective */}
        <g>
          <motion.rect
            x="300"
            y="90"
            width="300"
            height="70"
            rx="8"
            fill="rgba(45, 214, 143, 0.12)"
            stroke="#2dd68f"
            strokeWidth="2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          <text x="450" y="115" textAnchor="middle" fill="#2dd68f" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            1. Define Objective
          </text>
          <text x="450" y="135" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            What do I need to discover?
          </text>
          <text x="450" y="150" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Live hosts? Open ports? Service versions?
          </text>
        </g>

        {/* Arrow 1 */}
        <motion.path
          d="M 450 160 L 450 200"
          stroke="#3de9a0"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />

        {/* Step 2: Target Discovery */}
        <g>
          <motion.rect
            x="300"
            y="200"
            width="300"
            height="70"
            rx="8"
            fill="rgba(2, 168, 154, 0.12)"
            stroke="#02a89a"
            strokeWidth="2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
          <text x="450" y="225" textAnchor="middle" fill="#02a89a" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            2. Target Identification
          </text>
          <text x="450" y="245" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Identify IP ranges, domains, hosts
          </text>
          <text x="450" y="260" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Scope definition and authorization
          </text>
        </g>

        {/* Arrow 2 */}
        <motion.path
          d="M 450 270 L 450 310"
          stroke="#3de9a0"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />

        {/* Step 3: Scan Selection */}
        <g>
          <motion.rect
            x="300"
            y="310"
            width="300"
            height="70"
            rx="8"
            fill="rgba(92, 242, 255, 0.12)"
            stroke="#5CF2FF"
            strokeWidth="2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          />
          <text x="450" y="335" textAnchor="middle" fill="#5CF2FF" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            3. Scan Selection
          </text>
          <text x="450" y="355" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Choose scan type based on objective
          </text>
          <text x="450" y="370" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            SYN scan? Version detection? NSE scripts?
          </text>
        </g>

        {/* Arrow 3 */}
        <motion.path
          d="M 450 380 L 450 420"
          stroke="#3de9a0"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.9 }}
        />

        {/* Step 4: Execute Scan */}
        <g>
          <motion.rect
            x="300"
            y="420"
            width="300"
            height="70"
            rx="8"
            fill="rgba(255, 217, 61, 0.12)"
            stroke="#ffd93d"
            strokeWidth="2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.1 }}
          />
          <text x="450" y="445" textAnchor="middle" fill="#ffd93d" fontSize="14" fontWeight="700" fontFamily="'Sora', sans-serif">
            4. Execute Scan
          </text>
          <text x="450" y="465" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="11" fontFamily="'Oxanium', sans-serif">
            Run Nmap with selected options
          </text>
          <text x="450" y="480" textAnchor="middle" fill="rgba(224, 224, 224, 0.7)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Monitor progress, save output
          </text>
        </g>

        {/* Split to Analysis and Documentation */}
        <motion.path
          d="M 450 490 L 450 510 L 250 510 L 250 530"
          stroke="#3de9a0"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        />
        <motion.path
          d="M 450 510 L 650 510 L 650 530"
          stroke="#3de9a0"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        />

        {/* Step 5: Analyze Results */}
        <g>
          <motion.rect
            x="100"
            y="530"
            width="300"
            height="60"
            rx="8"
            fill="rgba(171, 207, 201, 0.12)"
            stroke="#abcfc9"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.9 }}
          />
          <text x="250" y="555" textAnchor="middle" fill="#abcfc9" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
            5. Analyze Results
          </text>
          <text x="250" y="573" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Interpret port states, services, versions
          </text>
        </g>

        {/* Step 6: Document Findings */}
        <g>
          <motion.rect
            x="500"
            y="530"
            width="300"
            height="60"
            rx="8"
            fill="rgba(171, 207, 201, 0.12)"
            stroke="#abcfc9"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.9 }}
          />
          <text x="650" y="555" textAnchor="middle" fill="#abcfc9" fontSize="13" fontWeight="700" fontFamily="'Sora', sans-serif">
            6. Document Findings
          </text>
          <text x="650" y="573" textAnchor="middle" fill="rgba(224, 224, 224, 0.8)" fontSize="10" fontFamily="'Oxanium', sans-serif">
            Record results, security implications
          </text>
        </g>

        {/* Side notes */}
        <g>
          <rect x="50" y="100" width="200" height="90" rx="6" fill="rgba(45, 214, 143, 0.08)" stroke="rgba(45, 214, 143, 0.3)" strokeWidth="1" />
          <text x="150" y="125" textAnchor="middle" fill="#2dd68f" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Analyst Questions
          </text>
          <text x="60" y="145" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            • What's the attack surface?
          </text>
          <text x="60" y="160" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            • Which services are exposed?
          </text>
          <text x="60" y="175" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            • What vulnerabilities exist?
          </text>
        </g>

        <g>
          <rect x="650" y="100" width="200" height="90" rx="6" fill="rgba(255, 107, 107, 0.08)" stroke="rgba(255, 107, 107, 0.3)" strokeWidth="1" />
          <text x="750" y="125" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="700" fontFamily="'Sora', sans-serif">
            Critical Steps
          </text>
          <text x="660" y="145" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Always save output (-oA)
          </text>
          <text x="660" y="160" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Verify authorization
          </text>
          <text x="660" y="175" fill="rgba(224, 224, 224, 0.7)" fontSize="9" fontFamily="'Oxanium', sans-serif">
            ✓ Document everything
          </text>
        </g>

        {/* Arrow marker */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#3de9a0" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
