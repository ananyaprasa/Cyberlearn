import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const NetworkProtocolsFundamentals = {
  id: 1,
  title: 'Network Protocols Fundamentals',
  difficulty: 'easy',
  description: 'Understanding TCP/IP, UDP, and network fundamentals',
  intro: (
    <div className="intro-section">
      <h2>Network Protocols Fundamentals</h2>
      <p>Network protocols are the foundation of all network communication. Understanding how data flows through networks, how protocols interact, and the security implications of each layer is essential for any cybersecurity professional.</p>
      <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=500&fit=crop" alt="Network Infrastructure" />
    </div>
  ),
  sections: [
    {
      title: 'The OSI Model',
      content: (
        <>
          <p>The Open Systems Interconnection (OSI) model provides a conceptual framework for understanding network communications:</p>
          <h4>The Seven Layers:</h4>
          <ol>
            <li><strong>Physical Layer (Layer 1):</strong> Electrical signals, cables, hubs</li>
            <li><strong>Data Link Layer (Layer 2):</strong> MAC addresses, switches, frames</li>
            <li><strong>Network Layer (Layer 3):</strong> IP addresses, routers, packets</li>
            <li><strong>Transport Layer (Layer 4):</strong> TCP/UDP, ports, segments</li>
            <li><strong>Session Layer (Layer 5):</strong> Session management, connections</li>
            <li><strong>Presentation Layer (Layer 6):</strong> Encryption, compression, formatting</li>
            <li><strong>Application Layer (Layer 7):</strong> HTTP, FTP, SMTP, user applications</li>
          </ol>
          <h4>Security Implications by Layer:</h4>
          <ul>
            <li><strong>Layer 1-2:</strong> Physical access, MAC spoofing, switch attacks</li>
            <li><strong>Layer 3:</strong> IP spoofing, routing attacks, ICMP attacks</li>
            <li><strong>Layer 4:</strong> Port scanning, TCP hijacking, UDP floods</li>
            <li><strong>Layer 7:</strong> Application vulnerabilities, protocol attacks</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&h=400&fit=crop" alt="Network Layers" />
          
          <Quiz questions={[
            {
              question: "Which OSI layer is responsible for routing packets between networks?",
              options: [
                "Data Link Layer (Layer 2)",
                "Network Layer (Layer 3)",
                "Transport Layer (Layer 4)",
                "Session Layer (Layer 5)"
              ],
              correct: "Network Layer (Layer 3)"
            },
            {
              question: "What type of address is used at the Data Link Layer?",
              options: [
                "IP Address",
                "MAC Address",
                "Port Number",
                "Domain Name"
              ],
              correct: "MAC Address"
            },
            {
              question: "Which layers are most commonly targeted by network attacks?",
              options: [
                "Physical and Data Link only",
                "Network and Transport primarily",
                "Session and Presentation only",
                "All layers can be targeted"
              ],
              correct: "All layers can be targeted"
            }
          ]} />
        </>
      )
    },
    {
      title: 'TCP/IP Protocol Suite',
      content: (
        <>
          <p>The TCP/IP model is the practical implementation used in modern networks:</p>
          <h4>TCP/IP Layers:</h4>
          <ul>
            <li><strong>Network Access Layer:</strong> Combines OSI Physical and Data Link</li>
            <li><strong>Internet Layer:</strong> IP, ICMP, ARP protocols</li>
            <li><strong>Transport Layer:</strong> TCP and UDP protocols</li>
            <li><strong>Application Layer:</strong> HTTP, FTP, SMTP, DNS</li>
          </ul>
          
          <h4>Internet Protocol (IP):</h4>
          <ul>
            <li><strong>IPv4:</strong> 32-bit addresses (192.168.1.1)</li>
            <li><strong>IPv6:</strong> 128-bit addresses (2001:db8::1)</li>
            <li><strong>Functions:</strong> Addressing, routing, fragmentation</li>
            <li><strong>Security Issues:</strong> No built-in authentication or encryption</li>
          </ul>
          
          <h4>Internet Control Message Protocol (ICMP):</h4>
          <ul>
            <li><strong>Purpose:</strong> Error reporting and network diagnostics</li>
            <li><strong>Common Types:</strong> Echo Request/Reply (ping), Destination Unreachable</li>
            <li><strong>Security Concerns:</strong> Information disclosure, covert channels</li>
          </ul>
          
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop" alt="TCP/IP Protocol Stack" />
          
          <PracticalQuiz exercises={[
            {
              title: "IP Address Analysis",
              difficulty: "beginner",
              description: "Use ipconfig (Windows) or ifconfig (Linux) to view your network configuration",
              command: "ipconfig /all",
              placeholder: "What is your default gateway IP address?",
              expectedAnswer: "varies",
              alternativeAnswers: ["192.168.1.1", "192.168.0.1", "10.0.0.1", "different"],
              hint: "Look for 'Default Gateway' in the output",
              explanation: "The default gateway is typically your router's IP address on the local network."
            },
            {
              title: "ICMP Testing",
              difficulty: "beginner",
              description: "Test ICMP connectivity to Google's DNS server",
              command: "ping 8.8.8.8",
              placeholder: "What is the average response time in milliseconds?",
              expectedAnswer: "varies",
              alternativeAnswers: ["low", "fast", "under 100", "good", "varies"],
              hint: "Look at the statistics at the end of the ping output",
              explanation: "Response times depend on your location and network connection quality."
            },
            {
              title: "Route Tracing",
              difficulty: "intermediate",
              description: "Trace the network path to a remote server",
              command: "tracert google.com",
              placeholder: "How many hops does it take to reach Google?",
              expectedAnswer: "varies",
              alternativeAnswers: ["10-20", "multiple", "several", "many", "depends"],
              hint: "Count the numbered lines in the traceroute output",
              explanation: "The number of hops varies based on your ISP and geographic location."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Transport Layer Protocols',
      content: (
        <>
          <h4>Transmission Control Protocol (TCP):</h4>
          <ul>
            <li><strong>Connection-oriented:</strong> Reliable, ordered delivery</li>
            <li><strong>Three-way handshake:</strong> SYN → SYN-ACK → ACK</li>
            <li><strong>Flow control:</strong> Prevents overwhelming receiver</li>
            <li><strong>Error detection:</strong> Checksums and retransmission</li>
            <li><strong>Common ports:</strong> 80 (HTTP), 443 (HTTPS), 22 (SSH), 25 (SMTP)</li>
          </ul>
          
          <h4>User Datagram Protocol (UDP):</h4>
          <ul>
            <li><strong>Connectionless:</strong> Fast but unreliable</li>
            <li><strong>No handshake:</strong> Fire-and-forget delivery</li>
            <li><strong>Lower overhead:</strong> Minimal header information</li>
            <li><strong>Common uses:</strong> DNS, DHCP, streaming media, gaming</li>
            <li><strong>Common ports:</strong> 53 (DNS), 67/68 (DHCP), 161 (SNMP)</li>
          </ul>
          
          <h4>Security Implications:</h4>
          <ul>
            <li><strong>TCP attacks:</strong> SYN flooding, session hijacking, RST attacks</li>
            <li><strong>UDP attacks:</strong> UDP flooding, amplification attacks</li>
            <li><strong>Port scanning:</strong> Identifying open services</li>
            <li><strong>Firewall evasion:</strong> Using unexpected ports or protocols</li>
          </ul>
          
          <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=400&fit=crop" alt="Network Protocols" />
          
          <Quiz questions={[
            {
              question: "What is the main difference between TCP and UDP?",
              options: [
                "TCP is faster than UDP",
                "TCP is connection-oriented and reliable, UDP is connectionless",
                "UDP is more secure than TCP",
                "TCP uses different ports than UDP"
              ],
              correct: "TCP is connection-oriented and reliable, UDP is connectionless"
            },
            {
              question: "Which protocol would be better for real-time video streaming?",
              options: [
                "TCP because it's reliable",
                "UDP because it's faster with lower latency",
                "Both are equally good",
                "Neither, you need a special protocol"
              ],
              correct: "UDP because it's faster with lower latency"
            },
            {
              question: "What happens during a TCP three-way handshake?",
              options: [
                "Client sends data, server responds, client confirms",
                "Client sends SYN, server sends SYN-ACK, client sends ACK",
                "Server sends request, client responds, server confirms",
                "Both sides exchange encryption keys"
              ],
              correct: "Client sends SYN, server sends SYN-ACK, client sends ACK"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Common Network Services',
      content: (
        <>
          <h4>Domain Name System (DNS):</h4>
          <ul>
            <li><strong>Purpose:</strong> Translates domain names to IP addresses</li>
            <li><strong>Port:</strong> 53 (UDP for queries, TCP for zone transfers)</li>
            <li><strong>Record Types:</strong> A, AAAA, MX, NS, CNAME, TXT</li>
            <li><strong>Security Issues:</strong> DNS poisoning, cache poisoning, tunneling</li>
          </ul>
          
          <h4>Dynamic Host Configuration Protocol (DHCP):</h4>
          <ul>
            <li><strong>Purpose:</strong> Automatically assigns IP addresses</li>
            <li><strong>Ports:</strong> 67 (server), 68 (client)</li>
            <li><strong>Process:</strong> Discover → Offer → Request → Acknowledge</li>
            <li><strong>Security Issues:</strong> Rogue DHCP servers, starvation attacks</li>
          </ul>
          
          <h4>Address Resolution Protocol (ARP):</h4>
          <ul>
            <li><strong>Purpose:</strong> Maps IP addresses to MAC addresses</li>
            <li><strong>Scope:</strong> Local network segment only</li>
            <li><strong>Process:</strong> ARP request (broadcast) → ARP reply (unicast)</li>
            <li><strong>Security Issues:</strong> ARP spoofing, man-in-the-middle attacks</li>
          </ul>
          
          <h4>Simple Network Management Protocol (SNMP):</h4>
          <ul>
            <li><strong>Purpose:</strong> Network device monitoring and management</li>
            <li><strong>Ports:</strong> 161 (agent), 162 (trap)</li>
            <li><strong>Versions:</strong> v1, v2c (plaintext), v3 (encrypted)</li>
            <li><strong>Security Issues:</strong> Default community strings, information disclosure</li>
          </ul>
          
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop" alt="Network Services" />
          
          <PracticalQuiz exercises={[
            {
              title: "DNS Lookup",
              difficulty: "beginner",
              description: "Perform a DNS lookup for google.com",
              command: "nslookup google.com",
              placeholder: "What type of DNS record shows the IP address?",
              expectedAnswer: "A record",
              alternativeAnswers: ["A", "address record", "a record"],
              hint: "Look for the record type that maps to an IPv4 address",
              explanation: "A records map domain names to IPv4 addresses."
            },
            {
              title: "ARP Table Inspection",
              difficulty: "intermediate",
              description: "View your system's ARP table",
              command: "arp -a",
              placeholder: "How many entries are in your ARP table?",
              expectedAnswer: "varies",
              alternativeAnswers: ["several", "multiple", "few", "many", "depends"],
              hint: "Count the number of IP-to-MAC address mappings",
              explanation: "ARP tables contain mappings for recently communicated devices on your local network."
            },
            {
              title: "Network Service Discovery",
              difficulty: "advanced",
              description: "Check which network services are running on your system",
              command: "netstat -tuln",
              placeholder: "Is DNS service (port 53) listening on your system?",
              expectedAnswer: "no",
              alternativeAnswers: ["yes", "maybe", "depends", "not usually"],
              hint: "Look for port 53 in the LISTEN state",
              explanation: "Most client systems don't run DNS servers locally unless specifically configured."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Network Security Fundamentals',
      content: (
        <>
          <h4>Common Network Threats:</h4>
          <ul>
            <li><strong>Eavesdropping:</strong> Intercepting network communications</li>
            <li><strong>Man-in-the-Middle:</strong> Intercepting and modifying traffic</li>
            <li><strong>Denial of Service:</strong> Overwhelming network resources</li>
            <li><strong>Spoofing:</strong> Impersonating other network entities</li>
            <li><strong>Session Hijacking:</strong> Taking over established connections</li>
          </ul>
          
          <h4>Network Security Controls:</h4>
          <ul>
            <li><strong>Firewalls:</strong> Packet filtering and access control</li>
            <li><strong>Intrusion Detection Systems (IDS):</strong> Monitoring for attacks</li>
            <li><strong>Intrusion Prevention Systems (IPS):</strong> Blocking detected attacks</li>
            <li><strong>Virtual Private Networks (VPN):</strong> Encrypted tunnels</li>
            <li><strong>Network Segmentation:</strong> Isolating network segments</li>
          </ul>
          
          <h4>Encryption and Authentication:</h4>
          <ul>
            <li><strong>SSL/TLS:</strong> Securing web communications</li>
            <li><strong>IPSec:</strong> Network layer encryption</li>
            <li><strong>WPA/WPA2/WPA3:</strong> Wireless security protocols</li>
            <li><strong>802.1X:</strong> Port-based network access control</li>
          </ul>
          
          <h4>Best Practices:</h4>
          <ul>
            <li>Use strong encryption for sensitive communications</li>
            <li>Implement network segmentation and access controls</li>
            <li>Monitor network traffic for anomalies</li>
            <li>Keep network devices updated and properly configured</li>
            <li>Use secure protocols instead of legacy insecure ones</li>
          </ul>
          
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop" alt="Network Security" />
          
          <Quiz questions={[
            {
              question: "What is the primary purpose of a firewall?",
              options: [
                "To encrypt network traffic",
                "To filter and control network traffic based on rules",
                "To detect viruses in files",
                "To provide wireless connectivity"
              ],
              correct: "To filter and control network traffic based on rules"
            },
            {
              question: "Which protocol provides encryption at the network layer?",
              options: [
                "SSL/TLS",
                "IPSec",
                "HTTP",
                "FTP"
              ],
              correct: "IPSec"
            },
            {
              question: "What is the main difference between IDS and IPS?",
              options: [
                "IDS is faster than IPS",
                "IDS detects attacks, IPS can also block them",
                "IPS is only for wireless networks",
                "There is no difference"
              ],
              correct: "IDS detects attacks, IPS can also block them"
            }
          ]} />
        </>
      )
    }
  ]
};