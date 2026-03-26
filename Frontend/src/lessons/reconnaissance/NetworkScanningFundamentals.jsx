import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const NetworkScanningFundamentals = {
  id: 1,
  title: 'Network Scanning Fundamentals',
  difficulty: 'easy',
  description: 'Learn the basics of network discovery and host enumeration',
  intro: (
    <div className="intro-section">
      <h2>Network Scanning Fundamentals</h2>
      <p>Network scanning is the foundation of reconnaissance. It involves discovering live hosts, open ports, and services running on a network. Understanding these fundamentals is essential for any security professional.</p>
      <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=500&fit=crop" alt="Network Scanning" />
    </div>
  ),
  sections: [
    {
      title: 'What is Network Scanning?',
      content: (
        <>
          <p>Network scanning is the process of identifying active hosts, open ports, and services on a network. It's a critical first step in understanding your target's infrastructure.</p>
          <ul>
            <li><strong>Host Discovery:</strong> Finding which IP addresses are active</li>
            <li><strong>Port Scanning:</strong> Identifying open ports on discovered hosts</li>
            <li><strong>Service Detection:</strong> Determining what services are running</li>
            <li><strong>OS Fingerprinting:</strong> Identifying the operating system</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=400&fit=crop" alt="Network Discovery" />
          
          <Quiz questions={[
            {
              question: "What is the primary purpose of host discovery?",
              options: [
                "To hack into systems",
                "To find which IP addresses are active on a network",
                "To delete files from servers",
                "To install malware"
              ],
              correct: "To find which IP addresses are active on a network"
            },
            {
              question: "Which of the following is NOT a typical network scanning activity?",
              options: [
                "Port scanning",
                "Service detection",
                "Password cracking",
                "OS fingerprinting"
              ],
              correct: "Password cracking"
            }
          ]} />
        </>
      )
    },
    {
      title: 'TCP/IP Basics',
      content: (
        <>
          <p>Understanding TCP/IP is essential for effective network scanning:</p>
          <h4>TCP Three-Way Handshake:</h4>
          <ol>
            <li><strong>SYN:</strong> Client sends synchronization packet</li>
            <li><strong>SYN-ACK:</strong> Server acknowledges and sends its own SYN</li>
            <li><strong>ACK:</strong> Client acknowledges server's SYN</li>
          </ol>
          <h4>Common Port States:</h4>
          <ul>
            <li><strong>Open:</strong> Service is listening and accepting connections</li>
            <li><strong>Closed:</strong> No service listening, but port is accessible</li>
            <li><strong>Filtered:</strong> Firewall or filter is blocking access</li>
            <li><strong>Unfiltered:</strong> Port is accessible but state unknown</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&h=400&fit=crop" alt="TCP/IP Protocol" />
        </>
      )
    },
    {
      title: 'Ping Sweeps',
      content: (
        <>
          <p>Ping sweeps are used to discover live hosts on a network:</p>
          <p><strong>Basic Ping:</strong> <code>ping 192.168.1.1</code></p>
          <p><strong>Ping Sweep (Windows):</strong> <code>for /L %i in (1,1,254) do @ping -n 1 -w 100 192.168.1.%i | find "Reply"</code></p>
          <p><strong>Ping Sweep (Linux):</strong> <code>for i in &#123;1..254&#125;; do ping -c 1 -W 1 192.168.1.$i | grep "64 bytes"; done</code></p>
          <h4>ICMP Types:</h4>
          <ul>
            <li><strong>Echo Request (Type 8):</strong> Standard ping</li>
            <li><strong>Echo Reply (Type 0):</strong> Response to ping</li>
            <li><strong>Destination Unreachable (Type 3):</strong> Host/port unreachable</li>
            <li><strong>Time Exceeded (Type 11):</strong> TTL expired (used in traceroute)</li>
          </ul>
          
          <PracticalQuiz exercises={[
            {
              title: "Basic Ping Test",
              difficulty: "beginner",
              description: "Ping your default gateway to test connectivity",
              command: "ping 192.168.1.1",
              placeholder: "Did you receive replies? (yes/no)",
              expectedAnswer: "yes",
              alternativeAnswers: ["y", "received", "success"],
              hint: "Look for 'Reply from' in the output",
              explanation: "A successful ping indicates the host is reachable and responding to ICMP requests."
            },
            {
              title: "TTL Analysis",
              difficulty: "intermediate",
              description: "Ping google.com and check the TTL value",
              command: "ping google.com",
              placeholder: "What is the approximate TTL value? (e.g., 50-60)",
              expectedAnswer: "varies",
              alternativeAnswers: ["50", "55", "60", "50-60", "different", "multiple"],
              hint: "Look for 'TTL=' in the ping response",
              explanation: "TTL (Time To Live) indicates how many hops the packet can make. Lower values suggest more network hops."
            }
          ]} />
        </>
      )
    },
    {
      title: 'ARP Scanning',
      content: (
        <>
          <p>ARP (Address Resolution Protocol) scanning is highly effective on local networks:</p>
          <p><strong>View ARP Cache:</strong> <code>arp -a</code></p>
          <p><strong>Why ARP Scanning Works:</strong></p>
          <ul>
            <li>Works even when ICMP is blocked</li>
            <li>Fast and reliable on local networks</li>
            <li>Reveals MAC addresses</li>
            <li>Can identify device manufacturers</li>
          </ul>
          <h4>Tools for ARP Scanning:</h4>
          <ul>
            <li><strong>arp-scan:</strong> Fast ARP scanner for Linux</li>
            <li><strong>Nmap:</strong> <code>nmap -PR 192.168.1.0/24</code></li>
            <li><strong>Netdiscover:</strong> Passive/active ARP reconnaissance</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop" alt="Network Protocols" />
        </>
      )
    },
    {
      title: 'Best Practices',
      content: (
        <>
          <h4>Scanning Etiquette:</h4>
          <ul>
            <li><strong>Get Permission:</strong> Always have written authorization</li>
            <li><strong>Timing:</strong> Scan during approved maintenance windows</li>
            <li><strong>Rate Limiting:</strong> Don't overwhelm target systems</li>
            <li><strong>Documentation:</strong> Keep detailed logs of your activities</li>
          </ul>
          <h4>Avoiding Detection:</h4>
          <ul>
            <li>Use slower scan speeds</li>
            <li>Randomize scan order</li>
            <li>Fragment packets</li>
            <li>Use decoy IP addresses</li>
            <li>Scan from different source IPs</li>
          </ul>
        </>
      )
    }
  ]
};