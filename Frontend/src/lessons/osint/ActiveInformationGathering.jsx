import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const ActiveInformationGathering = {
  id: 2,
  title: 'Active Information Gathering',
  difficulty: 'medium',
  description: 'OSINT with minor interaction with target systems',
  intro: (
    <div className="intro-section">
      <h2>Active Information Gathering</h2>
      <p>Active information gathering involves directly interacting with the target's systems to collect information. Unlike passive reconnaissance, active techniques send packets and requests to the target, which can be logged and detected.</p>
      <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=500&fit=crop" alt="Active Network Scanning" />
    </div>
  ),
  sections: [
    {
      title: 'Understanding Active vs Passive Reconnaissance',
      content: (
        <>
          <p><strong>Active Reconnaissance:</strong> Direct interaction with target systems (scanning, probing, querying)</p>
          <p><strong>Key Differences:</strong></p>
          <ul>
            <li>Leaves traces in logs and monitoring systems</li>
            <li>Provides real-time, accurate information</li>
            <li>Can trigger intrusion detection systems (IDS)</li>
            <li>Requires explicit authorization</li>
            <li>More likely to be noticed by security teams</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop" alt="Network Security Monitoring" />
        </>
      )
    },
    {
      title: 'Port Scanning Techniques',
      content: (
        <>
          <p>Port scanning identifies which ports are open, closed, or filtered on a target system.</p>
          <p><strong>Scan Types:</strong></p>
          <ul>
            <li><strong>TCP Connect Scan:</strong> Completes full TCP handshake, most reliable but easily detected</li>
            <li><strong>SYN Scan (Stealth Scan):</strong> Sends SYN packets without completing handshake</li>
            <li><strong>UDP Scan:</strong> Scans UDP ports, slower and less reliable than TCP</li>
            <li><strong>FIN Scan:</strong> Sends FIN packets to bypass simple firewalls</li>
          </ul>
          <p><strong>Common Ports:</strong></p>
          <ul>
            <li>Port 22 - SSH, Port 80 - HTTP, Port 443 - HTTPS</li>
            <li>Port 3306 - MySQL, Port 3389 - RDP</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=400&fit=crop" alt="Port Scanning" />
          
          <Quiz questions={[
            {
              question: "Which port scan type is considered the most stealthy?",
              options: [
                "TCP Connect Scan",
                "SYN Scan",
                "UDP Scan",
                "Full Connect Scan"
              ],
              correct: "SYN Scan"
            },
            {
              question: "What service typically runs on port 443?",
              options: [
                "SSH",
                "FTP",
                "HTTPS",
                "MySQL"
              ],
              correct: "HTTPS"
            },
            {
              question: "Why is a TCP Connect Scan easily detected?",
              options: [
                "It uses UDP packets",
                "It completes the full TCP handshake",
                "It sends malformed packets",
                "It scans too quickly"
              ],
              correct: "It completes the full TCP handshake"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Nmap - The Network Mapper',
      content: (
        <>
          <p>The industry-standard tool for network discovery and security auditing.</p>
          <p><strong>Basic Scans:</strong></p>
          <ul>
            <li><code>nmap 192.168.1.1</code> - Basic scan of single host</li>
            <li><code>nmap -p 80,443 example.com</code> - Scan specific ports</li>
            <li><code>nmap -p- example.com</code> - Scan all 65535 ports</li>
          </ul>
          <p><strong>Advanced Scans:</strong></p>
          <ul>
            <li><code>nmap -sS example.com</code> - SYN stealth scan</li>
            <li><code>nmap -sV example.com</code> - Version detection</li>
            <li><code>nmap -O example.com</code> - OS detection</li>
            <li><code>nmap -A example.com</code> - Aggressive scan</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&h=400&fit=crop" alt="Network Mapping Tools" />
          
          <Quiz questions={[
            {
              question: "What does the '-sV' flag do in Nmap?",
              options: [
                "Performs a vulnerability scan",
                "Detects service versions",
                "Scans for viruses",
                "Enables verbose mode"
              ],
              correct: "Detects service versions"
            },
            {
              question: "Which Nmap command scans all 65535 ports?",
              options: [
                "nmap -p 1-65535 example.com",
                "nmap -p- example.com",
                "nmap --all-ports example.com",
                "nmap -pA example.com"
              ],
              correct: "nmap -p- example.com"
            },
            {
              question: "What does the '-A' flag enable in Nmap?",
              options: [
                "Anonymous scanning",
                "Aggressive scan with OS detection, version detection, and scripts",
                "All ports scan",
                "Automatic vulnerability detection"
              ],
              correct: "Aggressive scan with OS detection, version detection, and scripts"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Service Enumeration',
      content: (
        <>
          <p>Determining what services are running and their versions:</p>
          <ul>
            <li><strong>Banner Grabbing:</strong> Connecting to services to read their banners</li>
            <li><strong>Service Fingerprinting:</strong> Analyzing responses to identify software</li>
            <li><strong>Version Detection:</strong> Determining exact software versions</li>
            <li><strong>OS Fingerprinting:</strong> Identifying the operating system</li>
          </ul>
          <p><strong>Why Version Detection Matters:</strong></p>
          <ul>
            <li>Identifies known vulnerabilities (CVEs)</li>
            <li>Reveals outdated or unpatched software</li>
            <li>Helps plan exploitation strategies</li>
          </ul>
          
          <PracticalQuiz exercises={[
            {
              title: "HTTP Banner Grabbing",
              difficulty: "beginner",
              description: "Use curl to grab the HTTP headers from example.com",
              command: "curl -I http://example.com",
              placeholder: "What HTTP status code did you receive? (e.g., 200)",
              expectedAnswer: "200",
              alternativeAnswers: ["200 ok", "http 200", "ok"],
              hint: "Look at the first line of the response",
              explanation: "HTTP 200 OK indicates a successful request. The -I flag fetches headers only."
            },
            {
              title: "Service Version Detection",
              difficulty: "intermediate",
              description: "Check the server header from github.com",
              command: "curl -I https://github.com",
              placeholder: "What server software is GitHub using? (e.g., nginx)",
              expectedAnswer: "GitHub.com",
              alternativeAnswers: ["github", "github.com", "custom"],
              hint: "Look for the 'Server:' header in the response",
              explanation: "GitHub uses custom server software identified as 'GitHub.com' in headers."
            },
            {
              title: "TCP Connection Test",
              difficulty: "intermediate",
              description: "Test if port 443 is open on google.com using telnet",
              command: "telnet google.com 443",
              placeholder: "Did the connection succeed? (yes/no)",
              expectedAnswer: "yes",
              alternativeAnswers: ["connected", "open", "success", "y"],
              hint: "If you see 'Connected' or similar, the port is open",
              explanation: "Port 443 (HTTPS) is open on Google's servers for secure web traffic."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Legal Considerations',
      content: (
        <>
          <p><strong>CRITICAL:</strong> Active scanning can be considered intrusive and may be illegal without proper authorization.</p>
          <ul>
            <li><strong>Always obtain written permission</strong> before conducting active reconnaissance</li>
            <li>Understand the Computer Fraud and Abuse Act (CFAA) and local laws</li>
            <li>Unauthorized scanning can result in criminal charges</li>
            <li>Document your authorization and scope</li>
            <li>Respect rate limits and avoid DoS conditions</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop" alt="Legal Authorization" />
        </>
      )
    }
  ]
};