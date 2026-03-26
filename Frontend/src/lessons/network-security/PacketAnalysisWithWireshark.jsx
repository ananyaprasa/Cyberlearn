import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const PacketAnalysisWithWireshark = {
  id: 2,
  title: 'Packet Analysis with Wireshark',
  difficulty: 'medium',
  description: 'Master network traffic capture and analysis techniques',
  intro: (
    <div className="intro-section">
      <h2>Packet Analysis with Wireshark</h2>
      <p>Wireshark is the world's most popular network protocol analyzer. It allows you to capture, inspect, and analyze network traffic in real-time, making it an essential tool for network troubleshooting, security analysis, and forensic investigations.</p>
      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=500&fit=crop" alt="Network Analysis" />
    </div>
  ),
  sections: [
    {
      title: 'Introduction to Wireshark',
      content: (
        <>
          <p>Wireshark is a free and open-source packet analyzer that provides deep inspection of network protocols.</p>
          
          <h4>Key Features:</h4>
          <ul>
            <li><strong>Live Capture:</strong> Real-time packet capture from network interfaces</li>
            <li><strong>Protocol Support:</strong> Hundreds of protocols supported</li>
            <li><strong>Deep Inspection:</strong> Detailed analysis of packet contents</li>
            <li><strong>Filtering:</strong> Powerful display and capture filters</li>
            <li><strong>Statistics:</strong> Network traffic statistics and graphs</li>
            <li><strong>Export Options:</strong> Save data in various formats</li>
          </ul>
          
          <h4>Common Use Cases:</h4>
          <ul>
            <li>Network troubleshooting and performance analysis</li>
            <li>Security incident investigation</li>
            <li>Protocol development and testing</li>
            <li>Network forensics and compliance</li>
            <li>Educational purposes and learning</li>
          </ul>
          
          <h4>Wireshark Interface Components:</h4>
          <ul>
            <li><strong>Packet List Pane:</strong> Summary of captured packets</li>
            <li><strong>Packet Details Pane:</strong> Protocol tree breakdown</li>
            <li><strong>Packet Bytes Pane:</strong> Raw hexadecimal data</li>
            <li><strong>Filter Bar:</strong> Apply display filters</li>
            <li><strong>Status Bar:</strong> Capture statistics and information</li>
          </ul>
          
          <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=400&fit=crop" alt="Network Analysis Tools" />
          
          <Quiz questions={[
            {
              question: "What are the three main panes in the Wireshark interface?",
              options: [
                "Capture, Filter, and Export panes",
                "Packet List, Packet Details, and Packet Bytes panes",
                "Protocol, Data, and Statistics panes",
                "Network, Transport, and Application panes"
              ],
              correct: "Packet List, Packet Details, and Packet Bytes panes"
            },
            {
              question: "What is the primary purpose of Wireshark?",
              options: [
                "To create network packets",
                "To analyze and capture network traffic",
                "To configure network devices",
                "To test network speed"
              ],
              correct: "To analyze and capture network traffic"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Capturing Network Traffic',
      content: (
        <>
          <h4>Starting a Capture:</h4>
          <ol>
            <li><strong>Select Interface:</strong> Choose the network interface to monitor</li>
            <li><strong>Set Capture Options:</strong> Configure filters and settings</li>
            <li><strong>Start Capture:</strong> Begin collecting packets</li>
            <li><strong>Stop Capture:</strong> End collection when sufficient data is gathered</li>
          </ol>
          
          <h4>Capture Filters:</h4>
          <p>Capture filters determine which packets are captured (applied during capture):</p>
          <ul>
            <li><code>host 192.168.1.1</code> - Capture traffic to/from specific host</li>
            <li><code>port 80</code> - Capture HTTP traffic</li>
            <li><code>tcp and port 443</code> - Capture HTTPS traffic</li>
            <li><code>not broadcast and not multicast</code> - Exclude broadcast traffic</li>
            <li><code>net 192.168.1.0/24</code> - Capture traffic from specific network</li>
          </ul>
          
          <h4>Display Filters:</h4>
          <p>Display filters determine which captured packets are shown (applied after capture):</p>
          <ul>
            <li><code>ip.addr == 192.168.1.1</code> - Show traffic to/from specific IP</li>
            <li><code>tcp.port == 80</code> - Show HTTP traffic</li>
            <li><code>http.request.method == "GET"</code> - Show HTTP GET requests</li>
            <li><code>dns</code> - Show only DNS traffic</li>
            <li><code>tcp.flags.syn == 1</code> - Show TCP SYN packets</li>
          </ul>
          
          <h4>Best Practices for Capturing:</h4>
          <ul>
            <li>Use capture filters to reduce file size and improve performance</li>
            <li>Capture only what you need for analysis</li>
            <li>Consider legal and privacy implications</li>
            <li>Use ring buffer for long-term monitoring</li>
            <li>Save captures with descriptive filenames</li>
          </ul>
          
          <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=400&fit=crop" alt="Network Packet Capture" />
          
          <PracticalQuiz exercises={[
            {
              title: "Basic Traffic Capture",
              difficulty: "beginner",
              description: "Start Wireshark and capture traffic on your main network interface for 30 seconds",
              command: "Open Wireshark → Select interface → Start capture → Wait 30s → Stop",
              placeholder: "How many packets did you capture approximately?",
              expectedAnswer: "varies",
              alternativeAnswers: ["hundreds", "many", "lots", "several hundred", "depends"],
              hint: "Look at the packet count in the status bar",
              explanation: "The number of packets depends on your network activity and background processes."
            },
            {
              title: "HTTP Traffic Filtering",
              difficulty: "intermediate",
              description: "Apply a display filter to show only HTTP traffic",
              command: "In Wireshark filter bar, type: http",
              placeholder: "Did the filter reduce the number of displayed packets?",
              expectedAnswer: "yes",
              alternativeAnswers: ["y", "reduced", "fewer", "less"],
              hint: "Compare packet count before and after applying the filter",
              explanation: "HTTP filters show only web traffic, which is typically a subset of all network traffic."
            },
            {
              title: "Protocol Statistics",
              difficulty: "intermediate",
              description: "View protocol hierarchy statistics in Wireshark",
              command: "Statistics → Protocol Hierarchy",
              placeholder: "What percentage of traffic is TCP?",
              expectedAnswer: "varies",
              alternativeAnswers: ["high", "majority", "most", "large percentage", "depends"],
              hint: "Look at the TCP percentage in the protocol hierarchy window",
              explanation: "TCP typically represents a large portion of network traffic due to web browsing and applications."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Protocol Analysis Techniques',
      content: (
        <>
          <h4>Analyzing TCP Connections:</h4>
          <ul>
            <li><strong>Three-way Handshake:</strong> Look for SYN, SYN-ACK, ACK sequence</li>
            <li><strong>Data Transfer:</strong> Analyze sequence and acknowledgment numbers</li>
            <li><strong>Connection Termination:</strong> FIN/ACK or RST packets</li>
            <li><strong>TCP Flags:</strong> SYN, ACK, FIN, RST, PSH, URG</li>
            <li><strong>Window Size:</strong> Flow control mechanism</li>
          </ul>
          
          <h4>HTTP Analysis:</h4>
          <ul>
            <li><strong>Request Methods:</strong> GET, POST, PUT, DELETE</li>
            <li><strong>Status Codes:</strong> 200 OK, 404 Not Found, 500 Internal Error</li>
            <li><strong>Headers:</strong> User-Agent, Content-Type, Authorization</li>
            <li><strong>Cookies:</strong> Session management and tracking</li>
            <li><strong>Content:</strong> HTML, JSON, XML payloads</li>
          </ul>
          
          <h4>DNS Analysis:</h4>
          <ul>
            <li><strong>Query Types:</strong> A, AAAA, MX, NS, CNAME records</li>
            <li><strong>Response Codes:</strong> NOERROR, NXDOMAIN, SERVFAIL</li>
            <li><strong>Authoritative Answers:</strong> AA flag in responses</li>
            <li><strong>Recursive Queries:</strong> RD flag in requests</li>
            <li><strong>TTL Values:</strong> Time-to-live for cached records</li>
          </ul>
          
          <h4>TLS/SSL Analysis:</h4>
          <ul>
            <li><strong>Handshake Process:</strong> Client Hello, Server Hello, Certificate</li>
            <li><strong>Cipher Suites:</strong> Encryption algorithms negotiated</li>
            <li><strong>Certificate Validation:</strong> Check certificate chain</li>
            <li><strong>Encrypted Data:</strong> Application data after handshake</li>
            <li><strong>Alerts:</strong> Error conditions and warnings</li>
          </ul>
          
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop" alt="Protocol Analysis" />
          
          <Quiz questions={[
            {
              question: "What TCP flags are set during the initial connection request?",
              options: [
                "ACK flag only",
                "SYN flag only",
                "SYN and ACK flags",
                "FIN flag only"
              ],
              correct: "SYN flag only"
            },
            {
              question: "What does an HTTP 404 status code indicate?",
              options: [
                "Server error",
                "Successful request",
                "Resource not found",
                "Unauthorized access"
              ],
              correct: "Resource not found"
            },
            {
              question: "In DNS, what does the AA flag indicate?",
              options: [
                "Additional Answer",
                "Authoritative Answer",
                "Authenticated Answer",
                "Automatic Answer"
              ],
              correct: "Authoritative Answer"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Security Analysis with Wireshark',
      content: (
        <>
          <h4>Detecting Network Attacks:</h4>
          <ul>
            <li><strong>Port Scans:</strong> Multiple SYN packets to different ports</li>
            <li><strong>ARP Spoofing:</strong> Duplicate IP addresses with different MACs</li>
            <li><strong>DNS Poisoning:</strong> Unexpected DNS responses</li>
            <li><strong>Man-in-the-Middle:</strong> Certificate anomalies, unexpected redirects</li>
            <li><strong>DDoS Attacks:</strong> High volume of similar packets</li>
          </ul>
          
          <h4>Identifying Suspicious Traffic:</h4>
          <ul>
            <li><strong>Unusual Protocols:</strong> Unexpected protocol usage</li>
            <li><strong>Abnormal Patterns:</strong> Irregular timing or packet sizes</li>
            <li><strong>Failed Connections:</strong> High number of RST packets</li>
            <li><strong>Data Exfiltration:</strong> Large outbound transfers</li>
            <li><strong>Malware Communication:</strong> Beaconing patterns</li>
          </ul>
          
          <h4>Forensic Analysis Techniques:</h4>
          <ul>
            <li><strong>Timeline Reconstruction:</strong> Chronological event analysis</li>
            <li><strong>File Extraction:</strong> Export files from HTTP/FTP transfers</li>
            <li><strong>Credential Harvesting:</strong> Find plaintext passwords</li>
            <li><strong>Communication Patterns:</strong> Identify C&C communications</li>
            <li><strong>Evidence Preservation:</strong> Maintain chain of custody</li>
          </ul>
          
          <h4>Useful Security Filters:</h4>
          <ul>
            <li><code>tcp.flags.syn == 1 and tcp.flags.ack == 0</code> - SYN scan detection</li>
            <li><code>arp.duplicate-address-detected</code> - ARP spoofing</li>
            <li><code>http.request.method == "POST"</code> - Form submissions</li>
            <li><code>tls.alert_message</code> - TLS/SSL errors</li>
            <li><code>icmp.type == 3</code> - ICMP unreachable messages</li>
          </ul>
          
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop" alt="Network Security Analysis" />
          
          <PracticalQuiz exercises={[
            {
              title: "TCP Flag Analysis",
              difficulty: "intermediate",
              description: "Use Wireshark to find TCP SYN packets in your capture",
              command: "Filter: tcp.flags.syn == 1 and tcp.flags.ack == 0",
              placeholder: "How many pure SYN packets did you find?",
              expectedAnswer: "varies",
              alternativeAnswers: ["several", "many", "few", "some", "depends"],
              hint: "Count the packets that match the SYN-only filter",
              explanation: "SYN packets initiate TCP connections and are common in network traffic."
            },
            {
              title: "HTTP Method Analysis",
              difficulty: "intermediate",
              description: "Analyze HTTP methods in your captured traffic",
              command: "Filter: http.request.method",
              placeholder: "What is the most common HTTP method you see?",
              expectedAnswer: "GET",
              alternativeAnswers: ["get", "HTTP GET", "GET requests"],
              hint: "Look at the HTTP request methods in the packet details",
              explanation: "GET is the most common HTTP method used for retrieving web pages and resources."
            },
            {
              title: "DNS Query Analysis",
              difficulty: "advanced",
              description: "Examine DNS queries in your network traffic",
              command: "Filter: dns.flags.response == 0",
              placeholder: "What types of DNS records are being queried most?",
              expectedAnswer: "A records",
              alternativeAnswers: ["A", "address records", "IPv4 addresses", "a records"],
              hint: "Look at the DNS query type field in DNS request packets",
              explanation: "A record queries (for IPv4 addresses) are the most common DNS queries."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Advanced Wireshark Features',
      content: (
        <>
          <h4>Following Streams:</h4>
          <ul>
            <li><strong>TCP Stream:</strong> Reconstruct entire TCP conversations</li>
            <li><strong>UDP Stream:</strong> Follow UDP-based communications</li>
            <li><strong>HTTP Stream:</strong> View complete HTTP transactions</li>
            <li><strong>TLS Stream:</strong> Analyze encrypted connections</li>
          </ul>
          
          <h4>Expert Information:</h4>
          <ul>
            <li><strong>Errors:</strong> Protocol violations and malformed packets</li>
            <li><strong>Warnings:</strong> Unusual but valid protocol behavior</li>
            <li><strong>Notes:</strong> Informational messages about traffic</li>
            <li><strong>Chats:</strong> Normal protocol operations</li>
          </ul>
          
          <h4>Statistics and Graphs:</h4>
          <ul>
            <li><strong>Protocol Hierarchy:</strong> Breakdown of protocols used</li>
            <li><strong>Conversations:</strong> Communication between endpoints</li>
            <li><strong>Endpoints:</strong> Individual network addresses</li>
            <li><strong>I/O Graphs:</strong> Traffic patterns over time</li>
            <li><strong>Flow Graphs:</strong> Sequence diagrams of communications</li>
          </ul>
          
          <h4>Customization Options:</h4>
          <ul>
            <li><strong>Custom Columns:</strong> Add specific protocol fields</li>
            <li><strong>Color Rules:</strong> Highlight packets based on criteria</li>
            <li><strong>Profiles:</strong> Save different configurations</li>
            <li><strong>Preferences:</strong> Customize interface and behavior</li>
          </ul>
          
          <h4>Export and Reporting:</h4>
          <ul>
            <li><strong>Packet Dissections:</strong> Export detailed packet information</li>
            <li><strong>Objects:</strong> Extract files from HTTP/FTP transfers</li>
            <li><strong>Statistics:</strong> Export traffic statistics</li>
            <li><strong>CSV Format:</strong> Import data into other tools</li>
          </ul>
          
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop" alt="Advanced Network Analysis" />
          
          <Quiz questions={[
            {
              question: "What does 'Follow TCP Stream' allow you to do?",
              options: [
                "Create new TCP connections",
                "View the complete conversation between two endpoints",
                "Modify TCP packets",
                "Block TCP traffic"
              ],
              correct: "View the complete conversation between two endpoints"
            },
            {
              question: "What information does the Expert Information system provide?",
              options: [
                "Only error messages",
                "Network device configurations",
                "Analysis of potential issues and unusual behavior",
                "User account information"
              ],
              correct: "Analysis of potential issues and unusual behavior"
            },
            {
              question: "What can you do with Wireshark's I/O Graphs?",
              options: [
                "Edit network packets",
                "Visualize traffic patterns over time",
                "Configure network devices",
                "Create network topologies"
              ],
              correct: "Visualize traffic patterns over time"
            }
          ]} />
        </>
      )
    }
  ]
};