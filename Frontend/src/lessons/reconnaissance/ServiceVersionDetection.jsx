import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const ServiceVersionDetection = {
  id: 5,
  title: 'Service & Version Detection',
  difficulty: 'hard',
  description: 'Identify services, versions, and potential vulnerabilities',
  intro: (
    <div className="intro-section">
      <h2>Service & Version Detection</h2>
      <p>Service and version detection is a critical phase of reconnaissance that involves identifying the specific software, versions, and configurations running on target systems. This information is essential for vulnerability assessment and penetration testing.</p>
      <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=500&fit=crop" alt="Service Version Detection" />
    </div>
  ),
  sections: [
    {
      title: 'Introduction to Service Detection',
      content: (
        <>
          <p>Service detection goes beyond simple port scanning to identify what services are actually running and their specific versions:</p>
          <h4>Why Service Detection Matters:</h4>
          <ul>
            <li>Identifies specific software versions</li>
            <li>Reveals potential vulnerabilities</li>
            <li>Helps plan targeted attacks</li>
            <li>Assists in compliance assessments</li>
            <li>Enables accurate risk assessment</li>
          </ul>
          <h4>Detection Methods:</h4>
          <ul>
            <li><strong>Banner Grabbing:</strong> Reading service banners</li>
            <li><strong>Probe Responses:</strong> Analyzing responses to specific probes</li>
            <li><strong>Behavioral Analysis:</strong> Studying service behavior patterns</li>
            <li><strong>Fingerprinting:</strong> Identifying unique service characteristics</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop" alt="Service Detection Overview" />
          
          <Quiz questions={[
            {
              question: "What is the primary goal of service version detection?",
              options: [
                "To find open ports",
                "To identify specific software and versions running on services",
                "To perform denial of service attacks",
                "To bypass firewalls"
              ],
              correct: "To identify specific software and versions running on services"
            },
            {
              question: "Which information is most valuable for vulnerability assessment?",
              options: [
                "Port numbers only",
                "Service names and exact version numbers",
                "Operating system type",
                "Network topology"
              ],
              correct: "Service names and exact version numbers"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Nmap Service Detection',
      content: (
        <>
          <p>Nmap is the most powerful tool for service and version detection:</p>
          <h4>Basic Service Detection:</h4>
          <ul>
            <li><code>nmap -sV target.com</code> - Basic version detection</li>
            <li><code>nmap -sV --version-intensity 5 target.com</code> - Aggressive detection</li>
            <li><code>nmap -sV --version-light target.com</code> - Light detection (faster)</li>
            <li><code>nmap -sV --version-all target.com</code> - Try all probes</li>
          </ul>
          <h4>Advanced Options:</h4>
          <ul>
            <li><code>nmap -sV -O target.com</code> - Version + OS detection</li>
            <li><code>nmap -A target.com</code> - Aggressive scan (includes -sV, -O, -sC)</li>
            <li><code>nmap -sV --script vuln target.com</code> - Version + vulnerability scripts</li>
            <li><code>nmap -sV -p- target.com</code> - All ports with version detection</li>
          </ul>
          <h4>Version Intensity Levels:</h4>
          <ul>
            <li><strong>0:</strong> Light mode - only most likely probes</li>
            <li><strong>1-8:</strong> Increasing probe intensity</li>
            <li><strong>9:</strong> All probes (slowest but most thorough)</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=400&fit=crop" alt="Nmap Service Detection" />
          
          <PracticalQuiz exercises={[
            {
              title: "Basic Version Detection",
              difficulty: "beginner",
              description: "Perform version detection on scanme.nmap.org",
              command: "nmap -sV scanme.nmap.org",
              placeholder: "What SSH version is running on port 22?",
              expectedAnswer: "OpenSSH",
              alternativeAnswers: ["openssh", "ssh", "OpenSSH 6.6.1p1"],
              hint: "Look for the service version information next to port 22",
              explanation: "Nmap's -sV flag performs service version detection by sending probes and analyzing responses."
            },
            {
              title: "Aggressive Service Detection",
              difficulty: "intermediate",
              description: "Use aggressive version detection on scanme.nmap.org",
              command: "nmap -sV --version-intensity 9 scanme.nmap.org",
              placeholder: "How many open ports were detected?",
              expectedAnswer: "3",
              alternativeAnswers: ["three", "2-4", "few"],
              hint: "Count the ports marked as 'open' in the output",
              explanation: "Higher version intensity uses more probes for more accurate detection but takes longer."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Banner Grabbing Techniques',
      content: (
        <>
          <p>Manual banner grabbing provides detailed service information:</p>
          <h4>HTTP Banner Grabbing:</h4>
          <ul>
            <li><code>curl -I http://target.com</code> - HTTP headers</li>
            <li><code>wget --server-response --spider http://target.com</code></li>
            <li><code>nc target.com 80</code> then type: <code>HEAD / HTTP/1.1</code></li>
            <li><code>telnet target.com 80</code> - Manual HTTP connection</li>
          </ul>
          <h4>FTP Banner Grabbing:</h4>
          <ul>
            <li><code>nc target.com 21</code> - Connect to FTP</li>
            <li><code>telnet target.com 21</code> - FTP banner</li>
            <li><code>ftp target.com</code> - FTP client connection</li>
          </ul>
          <h4>SSH Banner Grabbing:</h4>
          <ul>
            <li><code>nc target.com 22</code> - SSH version string</li>
            <li><code>ssh -V target.com</code> - SSH version (may not connect)</li>
            <li><code>telnet target.com 22</code> - SSH banner</li>
          </ul>
          <h4>SMTP Banner Grabbing:</h4>
          <ul>
            <li><code>nc target.com 25</code> - SMTP banner</li>
            <li><code>telnet target.com 25</code> - SMTP connection</li>
            <li>Commands: <code>HELO test</code>, <code>HELP</code>, <code>VRFY</code></li>
          </ul>
          <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&h=400&fit=crop" alt="Banner Grabbing" />
        </>
      )
    },
    {
      title: 'Application Fingerprinting',
      content: (
        <>
          <p>Identify web applications and their versions through various techniques:</p>
          <h4>Web Application Detection:</h4>
          <ul>
            <li><strong>Wappalyzer:</strong> Browser extension for technology detection</li>
            <li><strong>WhatWeb:</strong> <code>whatweb target.com</code></li>
            <li><strong>Nikto:</strong> <code>nikto -h target.com</code></li>
            <li><strong>Nmap Scripts:</strong> <code>nmap --script http-enum target.com</code></li>
          </ul>
          <h4>CMS Detection:</h4>
          <ul>
            <li><strong>WordPress:</strong> <code>wpscan --url target.com</code></li>
            <li><strong>Joomla:</strong> <code>joomscan -u target.com</code></li>
            <li><strong>Drupal:</strong> <code>droopescan scan drupal -u target.com</code></li>
            <li><strong>Generic:</strong> <code>cmseek -u target.com</code></li>
          </ul>
          <h4>Framework Detection:</h4>
          <ul>
            <li>HTTP headers analysis</li>
            <li>Cookie names and values</li>
            <li>URL patterns and structures</li>
            <li>Error messages and responses</li>
            <li>JavaScript libraries and frameworks</li>
          </ul>
          
          <PracticalQuiz exercises={[
            {
              title: "HTTP Header Analysis",
              difficulty: "beginner",
              description: "Analyze HTTP headers of example.com",
              command: "curl -I http://example.com",
              placeholder: "What web server is running?",
              expectedAnswer: "Apache",
              alternativeAnswers: ["apache", "nginx", "server"],
              hint: "Look for the 'Server:' header in the response",
              explanation: "The Server header reveals the web server software and sometimes version information."
            },
            {
              title: "Technology Stack Detection",
              difficulty: "intermediate",
              description: "Use WhatWeb to analyze a website (if available)",
              command: "whatweb example.com",
              placeholder: "What technologies were detected?",
              expectedAnswer: "HTML",
              alternativeAnswers: ["html", "http", "web"],
              hint: "Look for the list of detected technologies",
              explanation: "WhatWeb identifies web technologies, frameworks, and applications running on websites."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Database Service Detection',
      content: (
        <>
          <p>Identify and enumerate database services:</p>
          <h4>Common Database Ports:</h4>
          <ul>
            <li><strong>MySQL:</strong> Port 3306</li>
            <li><strong>PostgreSQL:</strong> Port 5432</li>
            <li><strong>Microsoft SQL Server:</strong> Port 1433</li>
            <li><strong>Oracle:</strong> Port 1521</li>
            <li><strong>MongoDB:</strong> Port 27017</li>
            <li><strong>Redis:</strong> Port 6379</li>
          </ul>
          <h4>Database Enumeration:</h4>
          <ul>
            <li><code>nmap -sV -p 3306 target.com</code> - MySQL detection</li>
            <li><code>nmap --script mysql-info target.com</code> - MySQL information</li>
            <li><code>nmap --script ms-sql-info target.com</code> - SQL Server info</li>
            <li><code>nmap --script oracle-sid-brute target.com</code> - Oracle SID</li>
          </ul>
          <h4>Database Connection Testing:</h4>
          <ul>
            <li><code>mysql -h target.com -u root</code> - MySQL connection</li>
            <li><code>psql -h target.com -U postgres</code> - PostgreSQL</li>
            <li><code>sqlcmd -S target.com</code> - SQL Server</li>
            <li><code>mongo target.com:27017</code> - MongoDB</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop" alt="Database Detection" />
        </>
      )
    },
    {
      title: 'Operating System Detection',
      content: (
        <>
          <p>Identify the target operating system through various fingerprinting techniques:</p>
          <h4>Nmap OS Detection:</h4>
          <ul>
            <li><code>nmap -O target.com</code> - Basic OS detection</li>
            <li><code>nmap -O --osscan-guess target.com</code> - Aggressive guessing</li>
            <li><code>nmap -O --osscan-limit target.com</code> - Limit to promising targets</li>
            <li><code>nmap -A target.com</code> - OS + service + script detection</li>
          </ul>
          <h4>OS Fingerprinting Methods:</h4>
          <ul>
            <li><strong>TCP/IP Stack:</strong> Analyzing TCP/IP implementation differences</li>
            <li><strong>ICMP Responses:</strong> How systems respond to ICMP packets</li>
            <li><strong>TCP Options:</strong> Different TCP option implementations</li>
            <li><strong>Window Sizes:</strong> Default TCP window sizes vary by OS</li>
          </ul>
          <h4>Passive OS Detection:</h4>
          <ul>
            <li><strong>p0f:</strong> Passive OS fingerprinting</li>
            <li><strong>Wireshark:</strong> Analyze captured traffic</li>
            <li><strong>TTL Values:</strong> Different default TTL values</li>
            <li><strong>HTTP Headers:</strong> User-Agent and other headers</li>
          </ul>
          
          <Quiz questions={[
            {
              question: "What does TTL stand for in networking?",
              options: [
                "Time To Live",
                "Total Transfer Length",
                "Target Trace Location",
                "Transmission Type Label"
              ],
              correct: "Time To Live"
            },
            {
              question: "Which Nmap flag enables OS detection?",
              options: [
                "-sV",
                "-O",
                "-sS",
                "-A"
              ],
              correct: "-O"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Vulnerability Correlation',
      content: (
        <>
          <p>Use service version information to identify potential vulnerabilities:</p>
          <h4>Vulnerability Databases:</h4>
          <ul>
            <li><strong>CVE:</strong> Common Vulnerabilities and Exposures</li>
            <li><strong>NVD:</strong> National Vulnerability Database</li>
            <li><strong>ExploitDB:</strong> Exploit database</li>
            <li><strong>SecurityFocus:</strong> BugTraq database</li>
          </ul>
          <h4>Automated Vulnerability Scanning:</h4>
          <ul>
            <li><code>nmap --script vuln target.com</code> - Nmap vulnerability scripts</li>
            <li><code>nmap --script exploit target.com</code> - Exploit scripts</li>
            <li><code>nikto -h target.com</code> - Web vulnerability scanner</li>
            <li><code>openvas</code> - Comprehensive vulnerability scanner</li>
          </ul>
          <h4>Manual Vulnerability Research:</h4>
          <ul>
            <li>Search CVE databases by software version</li>
            <li>Check vendor security advisories</li>
            <li>Review exploit databases</li>
            <li>Analyze security mailing lists</li>
          </ul>
          <h4>Risk Assessment:</h4>
          <ul>
            <li><strong>CVSS Scores:</strong> Common Vulnerability Scoring System</li>
            <li><strong>Exploitability:</strong> How easy is it to exploit?</li>
            <li><strong>Impact:</strong> What damage could be done?</li>
            <li><strong>Patch Availability:</strong> Are fixes available?</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop" alt="Vulnerability Assessment" />
        </>
      )
    },
    {
      title: 'Evasion and Stealth Techniques',
      content: (
        <>
          <p>Perform service detection while minimizing detection by security systems:</p>
          <h4>Timing and Rate Limiting:</h4>
          <ul>
            <li><code>nmap -T1 -sV target.com</code> - Paranoid timing (very slow)</li>
            <li><code>nmap -T2 -sV target.com</code> - Sneaky timing</li>
            <li><code>nmap --scan-delay 5s -sV target.com</code> - Custom delay</li>
            <li><code>nmap --max-rate 10 -sV target.com</code> - Rate limiting</li>
          </ul>
          <h4>Fragmentation and Decoys:</h4>
          <ul>
            <li><code>nmap -f -sV target.com</code> - Fragment packets</li>
            <li><code>nmap -D RND:10 -sV target.com</code> - Random decoys</li>
            <li><code>nmap --source-port 53 -sV target.com</code> - Spoof source port</li>
            <li><code>nmap --data-length 25 -sV target.com</code> - Append random data</li>
          </ul>
          <h4>Proxy and Anonymization:</h4>
          <ul>
            <li>Use proxy chains (proxychains)</li>
            <li>Tor network for anonymity</li>
            <li>VPN services</li>
            <li>Distributed scanning from multiple sources</li>
          </ul>
          
          <PracticalQuiz exercises={[
            {
              title: "Stealth Service Detection",
              difficulty: "advanced",
              description: "Perform slow, stealthy service detection on scanme.nmap.org",
              command: "nmap -T2 -sV scanme.nmap.org",
              placeholder: "How long did the scan take approximately?",
              expectedAnswer: "longer",
              alternativeAnswers: ["slow", "minutes", "long time", "extended"],
              hint: "Compare the scan time to a normal -sV scan",
              explanation: "Stealth timing templates make scans much slower but harder to detect."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Documentation and Reporting',
      content: (
        <>
          <p>Properly document service detection findings for analysis and reporting:</p>
          <h4>Information to Document:</h4>
          <ul>
            <li><strong>Service Names:</strong> HTTP, SSH, FTP, etc.</li>
            <li><strong>Version Numbers:</strong> Exact version strings</li>
            <li><strong>Port Numbers:</strong> Both standard and non-standard</li>
            <li><strong>Banner Information:</strong> Complete service banners</li>
            <li><strong>Configuration Details:</strong> Enabled features and modules</li>
          </ul>
          <h4>Output Formats:</h4>
          <ul>
            <li><code>nmap -sV -oN output.txt target.com</code> - Normal format</li>
            <li><code>nmap -sV -oX output.xml target.com</code> - XML format</li>
            <li><code>nmap -sV -oG output.gnmap target.com</code> - Grepable format</li>
            <li><code>nmap -sV -oA output target.com</code> - All formats</li>
          </ul>
          <h4>Analysis and Prioritization:</h4>
          <ul>
            <li>Identify outdated software versions</li>
            <li>Flag services with known vulnerabilities</li>
            <li>Prioritize by criticality and exploitability</li>
            <li>Create remediation recommendations</li>
          </ul>
          <h4>Reporting Best Practices:</h4>
          <ul>
            <li>Include methodology and tools used</li>
            <li>Provide evidence (screenshots, command output)</li>
            <li>Explain business impact</li>
            <li>Offer specific remediation steps</li>
            <li>Follow responsible disclosure practices</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=400&fit=crop" alt="Documentation and Reporting" />
        </>
      )
    }
  ]
};