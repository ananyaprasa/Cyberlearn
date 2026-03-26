import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const PassiveInformationGathering = {
  id: 1,
  title: 'Passive Information Gathering',
  difficulty: 'easy',
  description: 'Collecting data without interacting with the target',
  intro: (
    <div className="intro-section">
      <h2>What is Passive Information Gathering?</h2>
      <p>Passive information gathering, also known as passive reconnaissance, is the process of collecting information about a target without directly interacting with their systems. This approach minimizes the risk of detection and is often the first step in any security assessment.</p>
      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=500&fit=crop" alt="Cybersecurity Intelligence Gathering" />
    </div>
  ),
  sections: [
    {
      title: 'Why Passive Reconnaissance Matters',
      content: (
        <>
          <p>Passive reconnaissance is crucial because it allows security professionals to:</p>
          <ul>
            <li>Gather intelligence without alerting the target</li>
            <li>Build a comprehensive profile before active testing</li>
            <li>Identify potential attack vectors and vulnerabilities</li>
            <li>Understand the organization's digital footprint</li>
            <li>Comply with legal and ethical boundaries</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop" alt="Digital Footprint Analysis" />
          
          <Quiz questions={[
            {
              question: "What is the main advantage of passive reconnaissance over active reconnaissance?",
              options: [
                "It provides more detailed information",
                "It doesn't alert the target or leave traces",
                "It's faster to perform",
                "It requires less technical knowledge"
              ],
              correct: "It doesn't alert the target or leave traces"
            },
            {
              question: "Which of the following is NOT a benefit of passive reconnaissance?",
              options: [
                "Identifying potential vulnerabilities",
                "Understanding digital footprint",
                "Direct interaction with target systems",
                "Complying with legal boundaries"
              ],
              correct: "Direct interaction with target systems"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Search Engine Intelligence (Google Dorking)',
      content: (
        <>
          <p>Search engines index billions of pages, and advanced operators can reveal sensitive information:</p>
          <ul>
            <li><code>site:example.com filetype:pdf</code> - Find all PDF files on a domain</li>
            <li><code>intitle:"index of" site:example.com</code> - Discover directory listings</li>
            <li><code>inurl:admin site:example.com</code> - Locate admin panels</li>
            <li><code>cache:example.com</code> - View cached versions of pages</li>
            <li><code>"@example.com" filetype:xls</code> - Find spreadsheets with email addresses</li>
          </ul>
          <p><strong>Use Cases:</strong> Finding exposed documents, backup files, configuration files, employee information, and sensitive data accidentally indexed by search engines.</p>
          <img src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1200&h=400&fit=crop" alt="Search Engine Research" />
          
          <Quiz questions={[
            {
              question: "What does the 'site:' operator do in Google Dorking?",
              options: [
                "Searches for websites similar to the specified domain",
                "Limits search results to a specific domain",
                "Finds the site's IP address",
                "Checks if a site is indexed by Google"
              ],
              correct: "Limits search results to a specific domain"
            },
            {
              question: "Which Google Dork would you use to find admin panels on example.com?",
              options: [
                "site:example.com admin",
                "inurl:admin site:example.com",
                "filetype:admin example.com",
                "cache:admin example.com"
              ],
              correct: "inurl:admin site:example.com"
            },
            {
              question: "What type of files can you search for using the 'filetype:' operator?",
              options: [
                "Only PDF files",
                "Only image files",
                "Various file types like PDF, XLS, DOC, etc.",
                "Only executable files"
              ],
              correct: "Various file types like PDF, XLS, DOC, etc."
            }
          ]} />
          
          <PracticalQuiz exercises={[
            {
              title: "Find PDF Files on a Domain",
              difficulty: "beginner",
              description: "Use Google to find all PDF files on github.com",
              command: "site:github.com filetype:pdf",
              placeholder: "How many results did you find? (approximate, e.g., 1000)",
              expectedAnswer: "many",
              alternativeAnswers: ["thousands", "lots", "multiple", "several", "100+", "1000+"],
              hint: "Enter the search query in Google and look at the results count",
              explanation: "GitHub hosts numerous PDF files including documentation, research papers, and guides."
            },
            {
              title: "Discover Directory Listings",
              difficulty: "intermediate",
              description: "Search for exposed directory listings on any .edu domain",
              command: "intitle:\"index of\" site:.edu",
              placeholder: "Did you find exposed directories? (yes/no)",
              expectedAnswer: "yes",
              alternativeAnswers: ["found", "true", "y"],
              hint: "This dork reveals directories that are publicly accessible",
              explanation: "Many educational institutions have misconfigured servers that expose directory listings."
            },
            {
              title: "Find Login Pages",
              difficulty: "intermediate",
              description: "Search for login pages on stackoverflow.com",
              command: "site:stackoverflow.com inurl:login",
              placeholder: "What is the main login URL you found?",
              expectedAnswer: "stackoverflow.com/users/login",
              alternativeAnswers: ["users/login", "/users/login", "login"],
              hint: "Look for the primary login page in the results",
              explanation: "The inurl: operator helps locate specific pages within a domain."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Social Media Intelligence (SOCMINT)',
      content: (
        <>
          <p>Social media platforms are goldmines for OSINT:</p>
          <ul>
            <li><strong>LinkedIn:</strong> Employee roles, organizational structure, technologies used, job postings revealing tech stack</li>
            <li><strong>Twitter/X:</strong> Real-time updates, employee opinions, company announcements, geolocation data</li>
            <li><strong>Facebook:</strong> Personal connections, events, photos with metadata, group memberships</li>
            <li><strong>Instagram:</strong> Location data, lifestyle patterns, visual intelligence</li>
            <li><strong>GitHub:</strong> Code repositories, API keys, configuration files, developer information</li>
          </ul>
          <p><strong>Techniques:</strong> Profile analysis, connection mapping, metadata extraction from images, timeline analysis, and sentiment analysis.</p>
          <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=400&fit=crop" alt="Social Media Analysis" />
        </>
      )
    },
    {
      title: 'WHOIS and Domain Intelligence',
      content: (
        <>
          <p>Domain registration data reveals valuable information:</p>
          <ul>
            <li><strong>Registrant Information:</strong> Name, email, phone number, address (if not privacy-protected)</li>
            <li><strong>Registration Dates:</strong> Domain age, expiration dates, update history</li>
            <li><strong>Name Servers:</strong> DNS infrastructure and hosting providers</li>
            <li><strong>Historical Data:</strong> Previous owners, changes over time</li>
          </ul>
          <p><strong>Tools:</strong> whois command-line tool, who.is, DomainTools, ViewDNS.info</p>
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop" alt="Domain and Network Intelligence" />
          
          <PracticalQuiz exercises={[
            {
              title: "Domain Registrar Lookup",
              difficulty: "beginner",
              description: "Find the registrar for microsoft.com using whois",
              command: "whois microsoft.com",
              placeholder: "Enter the registrar name",
              expectedAnswer: "MarkMonitor Inc.",
              alternativeAnswers: ["MarkMonitor", "markmonitor inc", "markmonitor"],
              hint: "Look for the 'Registrar:' field in the whois output",
              explanation: "Microsoft uses MarkMonitor Inc., a premium domain registrar service."
            },
            {
              title: "Domain Creation Date",
              difficulty: "beginner",
              description: "Find when google.com was registered",
              command: "whois google.com",
              placeholder: "Enter the year (e.g., 1997)",
              expectedAnswer: "1997",
              alternativeAnswers: ["1997-09-15", "september 1997", "sep 1997"],
              hint: "Look for 'Creation Date' or 'Registered On' field",
              explanation: "Google.com was registered on September 15, 1997, before Google Inc. was officially founded."
            },
            {
              title: "Name Server Discovery",
              difficulty: "intermediate",
              description: "Find the name servers for facebook.com",
              command: "whois facebook.com",
              placeholder: "Enter one name server (e.g., ns1.facebook.com)",
              expectedAnswer: "a.ns.facebook.com",
              alternativeAnswers: ["b.ns.facebook.com", "c.ns.facebook.com", "d.ns.facebook.com", "ns1.facebook.com"],
              hint: "Look for 'Name Server:' entries in the output",
              explanation: "Facebook uses its own name servers for DNS resolution."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Essential Tools - theHarvester',
      content: (
        <>
          <h4>theHarvester</h4>
          <p>A powerful tool for gathering emails, subdomains, hosts, employee names, and more from public sources.</p>
          <p><strong>Usage:</strong> <code>theHarvester -d example.com -b google,linkedin,bing</code></p>
          <p><strong>Features:</strong></p>
          <ul>
            <li>Multiple data source support</li>
            <li>Subdomain enumeration</li>
            <li>Email harvesting</li>
            <li>DNS brute-forcing</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=400&fit=crop" alt="OSINT Tools" />
        </>
      )
    },
    {
      title: 'Essential Tools - Maltego',
      content: (
        <>
          <h4>Maltego</h4>
          <p>Visual link analysis tool for mapping relationships and connections.</p>
          <p><strong>Capabilities:</strong></p>
          <ul>
            <li>Entity relationship mapping</li>
            <li>Social network analysis</li>
            <li>Infrastructure visualization</li>
            <li>Automated transforms</li>
          </ul>
          <p><strong>Use Cases:</strong> Investigating complex relationships, visualizing attack surfaces, tracking digital footprints</p>
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop" alt="Data Visualization and Analysis" />
          
          <PracticalQuiz exercises={[
            {
              title: "DNS Record Enumeration",
              difficulty: "beginner",
              description: "Use nslookup to find the mail server (MX record) for outlook.com",
              command: "nslookup -type=MX outlook.com",
              placeholder: "Enter the mail server domain (e.g., outlook-com.olc.protection.outlook.com)",
              expectedAnswer: "outlook-com.olc.protection.outlook.com",
              alternativeAnswers: ["outlook.com", "mail.outlook.com", "mx.outlook.com"],
              hint: "Look for the MX record in the output",
              explanation: "Outlook.com uses Microsoft's mail protection services for email routing."
            },
            {
              title: "Reverse DNS Lookup",
              difficulty: "intermediate",
              description: "Perform a reverse DNS lookup on Google's public DNS server 8.8.8.8",
              command: "nslookup 8.8.8.8",
              placeholder: "Enter the hostname (e.g., dns.google)",
              expectedAnswer: "dns.google",
              alternativeAnswers: ["google-public-dns-a.google.com", "dns.google.com"],
              hint: "The reverse lookup reveals the hostname associated with the IP",
              explanation: "Google's public DNS servers resolve to dns.google domain names."
            },
            {
              title: "Subdomain Discovery",
              difficulty: "advanced",
              description: "Use dig to find all DNS records for github.com",
              command: "dig github.com ANY",
              placeholder: "How many different record types did you find? (number)",
              expectedAnswer: "multiple",
              alternativeAnswers: ["several", "many", "3", "4", "5", "2+"],
              hint: "Count the different record types like A, MX, NS, TXT, etc.",
              explanation: "The ANY query returns multiple DNS record types including A, MX, NS, and TXT records."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Essential Tools - Shodan',
      content: (
        <>
          <h4>Shodan</h4>
          <p>The search engine for Internet-connected devices and services.</p>
          <p><strong>Search Examples:</strong></p>
          <ul>
            <li><code>org:"Company Name"</code> - Find all devices belonging to an organization</li>
            <li><code>port:3389 country:US</code> - Find RDP servers in the US</li>
            <li><code>product:Apache</code> - Locate Apache web servers</li>
          </ul>
          <p><strong>Information Revealed:</strong> Open ports, running services, software versions, default credentials, misconfigurations</p>
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop" alt="Internet of Things Security" />
          
          <Quiz questions={[
            {
              question: "What is Shodan primarily used for?",
              options: [
                "Social media monitoring",
                "Searching for Internet-connected devices",
                "Email harvesting",
                "Website vulnerability scanning"
              ],
              correct: "Searching for Internet-connected devices"
            },
            {
              question: "Which Shodan query would find RDP servers in the United States?",
              options: [
                "rdp:US",
                "port:3389 country:US",
                "service:rdp location:US",
                "protocol:rdp region:US"
              ],
              correct: "port:3389 country:US"
            }
          ]} />
          
          <PracticalQuiz exercises={[
            {
              title: "Network Service Detection",
              difficulty: "beginner",
              description: "Use netstat to see active connections on your machine",
              command: "netstat -an",
              placeholder: "Did you see any ESTABLISHED connections? (yes/no)",
              expectedAnswer: "yes",
              alternativeAnswers: ["y", "true", "found"],
              hint: "Look for lines with 'ESTABLISHED' status",
              explanation: "Netstat shows active network connections. ESTABLISHED means an active connection exists."
            },
            {
              title: "Port Listening Check",
              difficulty: "intermediate",
              description: "Check which services are listening on your local machine",
              command: "netstat -tuln",
              placeholder: "Is port 80 or 443 listening? (yes/no)",
              expectedAnswer: "no",
              alternativeAnswers: ["yes", "maybe", "depends"],
              hint: "Look for LISTEN state on ports 80 or 443",
              explanation: "Ports 80/443 are typically only listening if you're running a web server locally."
            },
            {
              title: "Traceroute Analysis",
              difficulty: "advanced",
              description: "Trace the route to google.com",
              command: "tracert google.com",
              placeholder: "How many hops to reach google.com? (number)",
              expectedAnswer: "varies",
              alternativeAnswers: ["10", "15", "20", "multiple", "several", "many"],
              hint: "Count the number of lines/hops in the output",
              explanation: "The number of hops varies based on your location and network path to Google's servers."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Legal and Ethical Considerations',
      content: (
        <>
          <p><strong>Important:</strong> Always ensure you have proper authorization before conducting reconnaissance. Even passive techniques must be performed ethically and legally.</p>
          <ul>
            <li>Respect privacy laws and regulations (GDPR, CCPA, etc.)</li>
            <li>Obtain written permission for security assessments</li>
            <li>Don't use gathered information for malicious purposes</li>
            <li>Follow responsible disclosure practices</li>
            <li>Understand the legal boundaries in your jurisdiction</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=400&fit=crop" alt="Cybersecurity Ethics and Law" />
        </>
      )
    },
    {
      title: 'Best Practices',
      content: (
        <>
          <ul>
            <li>Use VPNs and proxies to protect your identity</li>
            <li>Document your methodology and findings</li>
            <li>Verify information from multiple sources</li>
            <li>Stay updated on new OSINT tools and techniques</li>
            <li>Respect rate limits and terms of service</li>
            <li>Maintain operational security (OPSEC)</li>
          </ul>
          <h4>Common Mistakes to Avoid:</h4>
          <ul>
            <li>Relying on a single source of information</li>
            <li>Failing to verify data accuracy</li>
            <li>Leaving digital footprints during reconnaissance</li>
            <li>Ignoring legal and ethical boundaries</li>
            <li>Poor documentation and organization</li>
          </ul>
        </>
      )
    }
  ]
};