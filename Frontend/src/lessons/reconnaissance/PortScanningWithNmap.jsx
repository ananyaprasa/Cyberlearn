import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const PortScanningWithNmap = {
  id: 3,
  title: 'Port Scanning with Nmap',
  difficulty: 'medium',
  description: 'Master advanced Nmap techniques and scan types',
  intro: (
    <div className="intro-section">
      <h2>Port Scanning with Nmap</h2>
      <p>Nmap (Network Mapper) is the industry-standard tool for network discovery and security auditing. Mastering Nmap is essential for any penetration tester or security professional.</p>
      <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&h=500&fit=crop" alt="Nmap Network Scanning" />
    </div>
  ),
  sections: [
    {
      title: 'Nmap Scan Types',
      content: (
        <>
          <p>Nmap offers various scan types, each with different characteristics:</p>
          <h4>TCP Scans:</h4>
          <ul>
            <li><strong>TCP Connect (-sT):</strong> Full three-way handshake, most reliable but easily detected</li>
            <li><strong>SYN Scan (-sS):</strong> "Stealth scan", doesn't complete handshake, requires root</li>
            <li><strong>ACK Scan (-sA):</strong> Used to map firewall rules</li>
            <li><strong>Window Scan (-sW):</strong> Similar to ACK but examines TCP window</li>
            <li><strong>FIN Scan (-sF):</strong> Sends FIN packets, can bypass simple firewalls</li>
          </ul>
          <h4>UDP Scans:</h4>
          <ul>
            <li><strong>UDP Scan (-sU):</strong> Scans UDP ports, slower than TCP</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=400&fit=crop" alt="Port Scanning Techniques" />
          
          <Quiz questions={[
            {
              question: "Which Nmap scan type is considered the most stealthy?",
              options: [
                "TCP Connect Scan (-sT)",
                "SYN Scan (-sS)",
                "UDP Scan (-sU)",
                "Ping Scan (-sn)"
              ],
              correct: "SYN Scan (-sS)"
            },
            {
              question: "What does the -sV flag do in Nmap?",
              options: [
                "Scans for vulnerabilities",
                "Enables verbose output",
                "Detects service versions",
                "Scans only vital ports"
              ],
              correct: "Detects service versions"
            },
            {
              question: "Which scan requires root/administrator privileges?",
              options: [
                "TCP Connect Scan",
                "SYN Scan",
                "Version Detection",
                "Script Scan"
              ],
              correct: "SYN Scan"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Essential Nmap Commands',
      content: (
        <>
          <h4>Basic Scans:</h4>
          <ul>
            <li><code>nmap 192.168.1.1</code> - Basic scan of single host</li>
            <li><code>nmap 192.168.1.0/24</code> - Scan entire subnet</li>
            <li><code>nmap -p 80,443 example.com</code> - Scan specific ports</li>
            <li><code>nmap -p- example.com</code> - Scan all 65535 ports</li>
            <li><code>nmap -F example.com</code> - Fast scan (top 100 ports)</li>
          </ul>
          <h4>Advanced Scans:</h4>
          <ul>
            <li><code>nmap -sS example.com</code> - SYN stealth scan</li>
            <li><code>nmap -sV example.com</code> - Version detection</li>
            <li><code>nmap -O example.com</code> - OS detection</li>
            <li><code>nmap -A example.com</code> - Aggressive scan (OS, version, scripts, traceroute)</li>
            <li><code>nmap -sC example.com</code> - Run default NSE scripts</li>
          </ul>
          
          <PracticalQuiz exercises={[
            {
              title: "Basic Host Scan",
              difficulty: "beginner",
              description: "Scan scanme.nmap.org (a legal test target)",
              command: "nmap scanme.nmap.org",
              placeholder: "How many open ports did you find?",
              expectedAnswer: "varies",
              alternativeAnswers: ["2", "3", "4", "few", "several", "multiple"],
              hint: "Count the ports marked as 'open'",
              explanation: "scanme.nmap.org typically has a few ports open for testing purposes."
            },
            {
              title: "Service Version Detection",
              difficulty: "intermediate",
              description: "Detect service versions on scanme.nmap.org",
              command: "nmap -sV scanme.nmap.org",
              placeholder: "What service is running on port 22? (e.g., SSH)",
              expectedAnswer: "SSH",
              alternativeAnswers: ["ssh", "openssh", "OpenSSH"],
              hint: "Look for the service name next to port 22",
              explanation: "Port 22 typically runs SSH (Secure Shell) for remote access."
            },
            {
              title: "Fast Scan",
              difficulty: "beginner",
              description: "Perform a fast scan of the top 100 ports",
              command: "nmap -F scanme.nmap.org",
              placeholder: "Was the scan faster than a full scan? (yes/no)",
              expectedAnswer: "yes",
              alternativeAnswers: ["y", "faster", "quicker"],
              hint: "The -F flag scans only the most common 100 ports",
              explanation: "Fast scans are useful for quick reconnaissance but may miss services on uncommon ports."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Nmap Timing and Performance',
      content: (
        <>
          <p>Nmap offers timing templates to balance speed and stealth:</p>
          <h4>Timing Templates (-T):</h4>
          <ul>
            <li><strong>T0 (Paranoid):</strong> Extremely slow, for IDS evasion</li>
            <li><strong>T1 (Sneaky):</strong> Very slow, for IDS evasion</li>
            <li><strong>T2 (Polite):</strong> Slows down to use less bandwidth</li>
            <li><strong>T3 (Normal):</strong> Default timing</li>
            <li><strong>T4 (Aggressive):</strong> Faster, assumes fast network</li>
            <li><strong>T5 (Insane):</strong> Very fast, may miss results</li>
          </ul>
          <p><strong>Example:</strong> <code>nmap -T4 -A example.com</code></p>
          <h4>Performance Options:</h4>
          <ul>
            <li><code>--min-rate 100</code> - Minimum packets per second</li>
            <li><code>--max-rate 1000</code> - Maximum packets per second</li>
            <li><code>--min-parallelism 10</code> - Minimum parallel probes</li>
          </ul>
        </>
      )
    },
    {
      title: 'Nmap Scripting Engine (NSE)',
      content: (
        <>
          <p>NSE extends Nmap's capabilities with hundreds of scripts:</p>
          <h4>Script Categories:</h4>
          <ul>
            <li><strong>auth:</strong> Authentication testing</li>
            <li><strong>broadcast:</strong> Network broadcast discovery</li>
            <li><strong>brute:</strong> Brute force attacks</li>
            <li><strong>default:</strong> Default safe scripts</li>
            <li><strong>discovery:</strong> Network discovery</li>
            <li><strong>exploit:</strong> Exploitation scripts</li>
            <li><strong>vuln:</strong> Vulnerability detection</li>
          </ul>
          <h4>Using NSE Scripts:</h4>
          <ul>
            <li><code>nmap --script=default example.com</code> - Run default scripts</li>
            <li><code>nmap --script=vuln example.com</code> - Run vulnerability scripts</li>
            <li><code>nmap --script=http-title example.com</code> - Run specific script</li>
            <li><code>nmap --script-help http-title</code> - Get script help</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=400&fit=crop" alt="Nmap Scripting" />
        </>
      )
    },
    {
      title: 'Output and Reporting',
      content: (
        <>
          <p>Nmap supports multiple output formats for documentation:</p>
          <h4>Output Formats:</h4>
          <ul>
            <li><code>-oN scan.txt</code> - Normal output</li>
            <li><code>-oX scan.xml</code> - XML output</li>
            <li><code>-oG scan.gnmap</code> - Grepable output</li>
            <li><code>-oA scan</code> - All formats</li>
          </ul>
          <h4>Verbosity:</h4>
          <ul>
            <li><code>-v</code> - Verbose output</li>
            <li><code>-vv</code> - Very verbose</li>
            <li><code>-d</code> - Debugging output</li>
          </ul>
          <p><strong>Example:</strong> <code>nmap -sV -oA company_scan example.com</code></p>
        </>
      )
    }
  ]
};