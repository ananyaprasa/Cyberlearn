import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const ActiveReconnaissance = {
  id: 4,
  title: 'Active Reconnaissance',
  difficulty: 'hard',
  description: 'Interacting with the target\'s systems to collect technical information',
  intro: (
    <div className="intro-section">
      <h2>Active Reconnaissance</h2>
      <p>Active reconnaissance includes port scans, ping sweeps, banner grabbing, and subdomain enumeration. These actions send network requests to the target and may be detectable by security systems. Proper authorization is essential.</p>
      <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=500&fit=crop" alt="Active Reconnaissance" />
    </div>
  ),
  sections: [
    {
      title: 'Active vs Passive Reconnaissance',
      content: (
        <>
          <p>Understanding the difference between active and passive reconnaissance is crucial for security professionals:</p>
          <h4>Passive Reconnaissance:</h4>
          <ul>
            <li>No direct interaction with target systems</li>
            <li>Uses publicly available information</li>
            <li>Difficult to detect</li>
            <li>Lower legal risk</li>
          </ul>
          <h4>Active Reconnaissance:</h4>
          <ul>
            <li>Direct interaction with target systems</li>
            <li>Sends packets and requests to targets</li>
            <li>Can be detected and logged</li>
            <li>Requires explicit authorization</li>
            <li>May trigger security alerts</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop" alt="Reconnaissance Types" />
          
          <Quiz questions={[
            {
              question: "What is the main risk of active reconnaissance?",
              options: [
                "It's too slow",
                "It can be detected and may trigger security alerts",
                "It doesn't provide useful information",
                "It's illegal in all cases"
              ],
              correct: "It can be detected and may trigger security alerts"
            },
            {
              question: "Which activity is considered active reconnaissance?",
              options: [
                "Reading a company's public blog",
                "Viewing LinkedIn profiles",
                "Port scanning a target server",
                "Searching Google for company information"
              ],
              correct: "Port scanning a target server"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Ping Sweeps and Host Discovery',
      content: (
        <>
          <p>Identify live hosts on a network using various techniques:</p>
          <h4>ICMP Ping Sweep:</h4>
          <ul>
            <li><code>ping 192.168.1.1</code> - Single host ping</li>
            <li><code>nmap -sn 192.168.1.0/24</code> - Network ping sweep</li>
            <li><code>fping -a -g 192.168.1.0/24</code> - Fast ping sweep</li>
          </ul>
          <h4>Alternative Discovery Methods:</h4>
          <ul>
            <li><strong>TCP SYN Ping:</strong> <code>nmap -PS 192.168.1.0/24</code></li>
            <li><strong>TCP ACK Ping:</strong> <code>nmap -PA 192.168.1.0/24</code></li>
            <li><strong>UDP Ping:</strong> <code>nmap -PU 192.168.1.0/24</code></li>
            <li><strong>ARP Ping:</strong> <code>nmap -PR 192.168.1.0/24</code></li>
          </ul>
          <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=400&fit=crop" alt="Network Discovery" />
          
          <PracticalQuiz exercises={[
            {
              title: "Network Ping Sweep",
              difficulty: "beginner",
              description: "Perform a ping sweep on your local network (use your gateway IP)",
              command: "ping 192.168.1.1",
              placeholder: "Did you receive a reply? (yes/no)",
              expectedAnswer: "yes",
              alternativeAnswers: ["y", "received", "success"],
              hint: "Look for 'Reply from' in the output",
              explanation: "A successful ping indicates the host is alive and responding to ICMP requests."
            },
            {
              title: "Nmap Host Discovery",
              difficulty: "intermediate",
              description: "Use Nmap to discover hosts on scanme.nmap.org",
              command: "nmap -sn scanme.nmap.org",
              placeholder: "Is the host up? (yes/no)",
              expectedAnswer: "yes",
              alternativeAnswers: ["up", "alive", "online"],
              hint: "Look for 'Host is up' in the output",
              explanation: "The -sn flag performs a ping scan without port scanning."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Port Scanning Techniques',
      content: (
        <>
          <p>Identify open ports and services on target systems:</p>
          <h4>Common Port Scans:</h4>
          <ul>
            <li><strong>Quick Scan:</strong> <code>nmap -F target.com</code> - Top 100 ports</li>
            <li><strong>Full Scan:</strong> <code>nmap -p- target.com</code> - All 65535 ports</li>
            <li><strong>Specific Ports:</strong> <code>nmap -p 80,443,8080 target.com</code></li>
            <li><strong>Service Scan:</strong> <code>nmap -sV target.com</code> - Version detection</li>
          </ul>
          <h4>Stealth Techniques:</h4>
          <ul>
            <li><strong>SYN Scan:</strong> <code>nmap -sS target.com</code> - Half-open scan</li>
            <li><strong>FIN Scan:</strong> <code>nmap -sF target.com</code> - Firewall evasion</li>
            <li><strong>Null Scan:</strong> <code>nmap -sN target.com</code> - No flags set</li>
            <li><strong>Xmas Scan:</strong> <code>nmap -sX target.com</code> - FIN, PSH, URG flags</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&h=400&fit=crop" alt="Port Scanning" />
        </>
      )
    },
    {
      title: 'Banner Grabbing',
      content: (
        <>
          <p>Retrieve service banners to identify software and versions:</p>
          <h4>Manual Banner Grabbing:</h4>
          <ul>
            <li><strong>Netcat:</strong> <code>nc target.com 80</code></li>
            <li><strong>Telnet:</strong> <code>telnet target.com 25</code></li>
            <li><strong>Curl:</strong> <code>curl -I http://target.com</code></li>
          </ul>
          <h4>Automated Banner Grabbing:</h4>
          <ul>
            <li><code>nmap -sV --version-intensity 5 target.com</code></li>
            <li><code>nmap --script banner target.com</code></li>
            <li><strong>Dmitry:</strong> <code>dmitry -pb target.com</code></li>
          </ul>
          <h4>Common Service Banners:</h4>
          <ul>
            <li><strong>HTTP:</strong> Server type and version</li>
            <li><strong>FTP:</strong> FTP server software</li>
            <li><strong>SSH:</strong> SSH version and implementation</li>
            <li><strong>SMTP:</strong> Mail server information</li>
          </ul>
          
          <PracticalQuiz exercises={[
            {
              title: "HTTP Banner Grab",
              difficulty: "beginner",
              description: "Grab the HTTP banner from example.com",
              command: "curl -I http://example.com",
              placeholder: "What HTTP status code did you get?",
              expectedAnswer: "200",
              alternativeAnswers: ["200 ok", "ok", "http 200"],
              hint: "Look at the first line of the response",
              explanation: "HTTP 200 OK indicates a successful request."
            },
            {
              title: "Service Version Detection",
              difficulty: "intermediate",
              description: "Use Nmap to detect service versions on scanme.nmap.org",
              command: "nmap -sV scanme.nmap.org",
              placeholder: "What service is on port 22?",
              expectedAnswer: "SSH",
              alternativeAnswers: ["ssh", "openssh", "OpenSSH"],
              hint: "Look for the service name next to port 22",
              explanation: "Port 22 typically runs SSH (Secure Shell) for remote access."
            }
          ]} />
        </>
      )
    },
    {
      title: 'DNS Enumeration',
      content: (
        <>
          <p>Gather DNS information about target domains:</p>
          <h4>DNS Record Types:</h4>
          <ul>
            <li><strong>A Records:</strong> IPv4 addresses</li>
            <li><strong>AAAA Records:</strong> IPv6 addresses</li>
            <li><strong>MX Records:</strong> Mail servers</li>
            <li><strong>NS Records:</strong> Name servers</li>
            <li><strong>TXT Records:</strong> Text information (SPF, DKIM)</li>
            <li><strong>CNAME Records:</strong> Canonical names (aliases)</li>
          </ul>
          <h4>DNS Enumeration Tools:</h4>
          <ul>
            <li><code>nslookup target.com</code> - Basic DNS lookup</li>
            <li><code>dig target.com ANY</code> - All DNS records</li>
            <li><code>host target.com</code> - Simple DNS lookup</li>
            <li><code>dnsenum target.com</code> - Comprehensive DNS enumeration</li>
            <li><code>fierce -dns target.com</code> - DNS reconnaissance</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop" alt="DNS Enumeration" />
        </>
      )
    },
    {
      title: 'Subdomain Brute Forcing',
      content: (
        <>
          <p>Actively discover subdomains through brute force techniques:</p>
          <h4>Brute Force Tools:</h4>
          <ul>
            <li><strong>Gobuster:</strong> <code>gobuster dns -d target.com -w wordlist.txt</code></li>
            <li><strong>Subbrute:</strong> Fast subdomain enumeration</li>
            <li><strong>Fierce:</strong> <code>fierce --domain target.com</code></li>
            <li><strong>DNSRecon:</strong> <code>dnsrecon -d target.com -t brt</code></li>
          </ul>
          <h4>Wordlists:</h4>
          <ul>
            <li><strong>SecLists:</strong> Comprehensive wordlist collection</li>
            <li><strong>Common subdomains:</strong> www, mail, ftp, admin, dev, test</li>
            <li><strong>Custom wordlists:</strong> Based on target naming conventions</li>
          </ul>
          <h4>Zone Transfer Attempts:</h4>
          <ul>
            <li><code>dig axfr @nameserver target.com</code></li>
            <li><code>host -l target.com nameserver</code></li>
          </ul>
          
          <Quiz questions={[
            {
              question: "What is a DNS zone transfer?",
              options: [
                "A method to transfer domain ownership",
                "A way to replicate DNS records between servers",
                "A type of DDoS attack",
                "A DNS encryption method"
              ],
              correct: "A way to replicate DNS records between servers"
            },
            {
              question: "Which tool is commonly used for subdomain brute forcing?",
              options: [
                "Wireshark",
                "Gobuster",
                "Metasploit",
                "Burp Suite"
              ],
              correct: "Gobuster"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Detection and Evasion',
      content: (
        <>
          <p>Understanding how active reconnaissance can be detected and how to minimize your footprint:</p>
          <h4>Detection Methods:</h4>
          <ul>
            <li><strong>IDS/IPS:</strong> Intrusion Detection/Prevention Systems</li>
            <li><strong>Firewall Logs:</strong> Connection attempts logged</li>
            <li><strong>SIEM Systems:</strong> Security Information and Event Management</li>
            <li><strong>Honeypots:</strong> Decoy systems to detect attackers</li>
          </ul>
          <h4>Evasion Techniques:</h4>
          <ul>
            <li><strong>Slow Scanning:</strong> <code>nmap -T2 target.com</code></li>
            <li><strong>Fragmentation:</strong> <code>nmap -f target.com</code></li>
            <li><strong>Decoys:</strong> <code>nmap -D RND:10 target.com</code></li>
            <li><strong>Source Port:</strong> <code>nmap --source-port 53 target.com</code></li>
            <li><strong>Randomize Hosts:</strong> <code>nmap --randomize-hosts target.com</code></li>
          </ul>
          <h4>Best Practices:</h4>
          <ul>
            <li>Always have written authorization</li>
            <li>Scan during approved time windows</li>
            <li>Use rate limiting to avoid DoS</li>
            <li>Document all activities</li>
            <li>Respect scope boundaries</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop" alt="Security Detection" />
        </>
      )
    },
    {
      title: 'Legal and Ethical Considerations',
      content: (
        <>
          <p><strong>CRITICAL:</strong> Active reconnaissance can be illegal without proper authorization.</p>
          <h4>Legal Requirements:</h4>
          <ul>
            <li><strong>Written Authorization:</strong> Always required before active scanning</li>
            <li><strong>Scope Definition:</strong> Clear boundaries of what can be tested</li>
            <li><strong>Time Windows:</strong> Approved testing periods</li>
            <li><strong>Contact Information:</strong> Emergency contacts during testing</li>
          </ul>
          <h4>Ethical Guidelines:</h4>
          <ul>
            <li>Minimize impact on target systems</li>
            <li>Respect privacy and confidentiality</li>
            <li>Follow responsible disclosure practices</li>
            <li>Document all activities thoroughly</li>
            <li>Stop testing if unauthorized access is gained</li>
          </ul>
          <h4>Legal Consequences:</h4>
          <ul>
            <li>Computer Fraud and Abuse Act (CFAA) violations</li>
            <li>Criminal charges for unauthorized access</li>
            <li>Civil liability for damages</li>
            <li>Professional license revocation</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=400&fit=crop" alt="Legal and Ethical Considerations" />
        </>
      )
    }
  ]
};