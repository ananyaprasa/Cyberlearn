import Quiz from '../../components/Quiz';
import PracticalQuiz from '../../components/PracticalQuiz';

export const PassiveReconnaissance = {
  id: 2,
  title: 'Passive Reconnaissance',
  difficulty: 'medium',
  description: 'Gathering publicly available data specifically about a target',
  intro: (
    <div className="intro-section">
      <h2>Passive Reconnaissance</h2>
      <p>Passive reconnaissance focuses on building a profile of a specific target using OSINT sources. It includes collecting DNS information, public IP ranges, employee details, or leaked data without touching the target's systems. This approach minimizes detection risk while gathering valuable intelligence.</p>
      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=500&fit=crop" alt="Passive Reconnaissance" />
    </div>
  ),
  sections: [
    {
      title: 'Understanding Passive Reconnaissance',
      content: (
        <>
          <p>Passive reconnaissance is the art of gathering information about a target without any direct interaction with their systems. This approach leaves no traces and is virtually undetectable.</p>
          <h4>Key Characteristics:</h4>
          <ul>
            <li><strong>No Direct Contact:</strong> Never touches target systems</li>
            <li><strong>Public Sources Only:</strong> Uses publicly available information</li>
            <li><strong>Zero Detection Risk:</strong> Completely undetectable by target</li>
            <li><strong>Legal and Safe:</strong> Stays within legal boundaries</li>
            <li><strong>Foundation Building:</strong> Creates baseline for further assessment</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop" alt="Passive Reconnaissance" />
          
          <Quiz questions={[
            {
              question: "What is the main advantage of passive reconnaissance?",
              options: [
                "It provides more detailed information",
                "It is completely undetectable by the target",
                "It's faster than active reconnaissance",
                "It requires less technical knowledge"
              ],
              correct: "It is completely undetectable by the target"
            },
            {
              question: "Which activity is considered passive reconnaissance?",
              options: [
                "Port scanning a target server",
                "Researching DNS records using public databases",
                "Banner grabbing from services",
                "Ping sweeping a network"
              ],
              correct: "Researching DNS records using public databases"
            }
          ]} />
        </>
      )
    },
    {
      title: 'DNS Information Gathering',
      content: (
        <>
          <p>Collect DNS information using public databases and passive queries:</p>
          <h4>DNS Records to Research:</h4>
          <ul>
            <li><strong>A Records:</strong> IPv4 addresses of hosts</li>
            <li><strong>AAAA Records:</strong> IPv6 addresses</li>
            <li><strong>MX Records:</strong> Mail server information</li>
            <li><strong>NS Records:</strong> Name server details</li>
            <li><strong>TXT Records:</strong> SPF, DKIM, and other text data</li>
            <li><strong>SOA Records:</strong> Zone authority information</li>
          </ul>
          <h4>Passive DNS Tools:</h4>
          <ul>
            <li><strong>DNSDumpster:</strong> DNS reconnaissance and research</li>
            <li><strong>SecurityTrails:</strong> Historical DNS data</li>
            <li><strong>ViewDNS.info:</strong> Multiple DNS tools</li>
            <li><strong>Robtex:</strong> DNS and IP research</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop" alt="DNS Research" />
          
          <PracticalQuiz exercises={[
            {
              title: "DNS Record Lookup",
              difficulty: "beginner",
              description: "Look up the A record for google.com using nslookup",
              command: "nslookup google.com",
              placeholder: "Did you find an IP address? (yes/no)",
              expectedAnswer: "yes",
              alternativeAnswers: ["y", "found", "multiple"],
              hint: "Look for 'Address:' in the output",
              explanation: "A records map domain names to IP addresses."
            },
            {
              title: "MX Record Discovery",
              difficulty: "intermediate",
              description: "Find the mail servers for gmail.com",
              command: "nslookup -type=MX gmail.com",
              placeholder: "Did you find mail server records? (yes/no)",
              expectedAnswer: "yes",
              alternativeAnswers: ["found", "multiple", "y"],
              hint: "MX records point to mail servers",
              explanation: "MX records indicate which servers handle email for a domain."
            }
          ]} />
        </>
      )
    },
    {
      title: 'Public IP Range Discovery',
      content: (
        <>
          <p>Identify IP ranges owned by the target organization:</p>
          <h4>Methods:</h4>
          <ul>
            <li><strong>WHOIS Databases:</strong> Query regional internet registries</li>
            <li><strong>BGP Looking Glass:</strong> View routing information</li>
            <li><strong>ASN Lookup:</strong> Find Autonomous System Numbers</li>
            <li><strong>ARIN/RIPE/APNIC:</strong> Regional registry searches</li>
          </ul>
          <h4>Tools and Resources:</h4>
          <ul>
            <li><strong>ARIN WHOIS:</strong> North American IP registry</li>
            <li><strong>RIPE Database:</strong> European IP registry</li>
            <li><strong>Hurricane Electric BGP:</strong> BGP routing data</li>
            <li><strong>IPinfo.io:</strong> IP address information</li>
          </ul>
          <h4>Information to Collect:</h4>
          <ul>
            <li>IP address ranges (CIDR notation)</li>
            <li>Network names and descriptions</li>
            <li>Administrative contacts</li>
            <li>Registration dates</li>
            <li>Associated ASNs</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop" alt="IP Range Discovery" />
        </>
      )
    },
    {
      title: 'Employee Information Gathering',
      content: (
        <>
          <p>Build profiles of employees using public sources:</p>
          <h4>LinkedIn Intelligence:</h4>
          <ul>
            <li><strong>Job Titles:</strong> Organizational structure and hierarchy</li>
            <li><strong>Technologies:</strong> Skills and tools mentioned in profiles</li>
            <li><strong>Connections:</strong> Professional relationships</li>
            <li><strong>Job Postings:</strong> Technology stack from requirements</li>
            <li><strong>Company Updates:</strong> Projects and initiatives</li>
          </ul>
          <h4>Other Sources:</h4>
          <ul>
            <li><strong>Company Websites:</strong> Team pages and bios</li>
            <li><strong>Conference Talks:</strong> Speaker profiles and presentations</li>
            <li><strong>GitHub:</strong> Developer accounts and repositories</li>
            <li><strong>Twitter/X:</strong> Professional discussions and opinions</li>
            <li><strong>Academic Papers:</strong> Research and publications</li>
          </ul>
          <h4>Information to Collect:</h4>
          <ul>
            <li>Names and job titles</li>
            <li>Email address patterns</li>
            <li>Technical skills and certifications</li>
            <li>Professional interests</li>
            <li>Contact information</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop" alt="Employee Research" />
        </>
      )
    },
    {
      title: 'Technology Stack Identification',
      content: (
        <>
          <p>Identify technologies used by the target organization:</p>
          <h4>Web Technology Detection:</h4>
          <ul>
            <li><strong>Wappalyzer:</strong> Browser extension for technology detection</li>
            <li><strong>BuiltWith:</strong> Website technology profiler</li>
            <li><strong>Shodan:</strong> Search for exposed services and versions</li>
            <li><strong>Censys:</strong> Internet-wide scanning data</li>
          </ul>
          <h4>Information to Gather:</h4>
          <ul>
            <li><strong>Web Frameworks:</strong> React, Angular, Django, etc.</li>
            <li><strong>CMS Platforms:</strong> WordPress, Drupal, Joomla</li>
            <li><strong>Server Software:</strong> Apache, Nginx, IIS</li>
            <li><strong>Programming Languages:</strong> PHP, Python, Java, .NET</li>
            <li><strong>Third-Party Services:</strong> CDNs, analytics, payment processors</li>
          </ul>
          <h4>Sources:</h4>
          <ul>
            <li>Job postings and career pages</li>
            <li>Technology blogs and case studies</li>
            <li>Conference presentations</li>
            <li>GitHub repositories</li>
            <li>Stack Overflow profiles</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop" alt="Technology Stack" />
          
          <Quiz questions={[
            {
              question: "Which source can reveal a company's technology stack?",
              options: [
                "Only direct system access",
                "Job postings listing required skills",
                "Physical office visits",
                "Social engineering"
              ],
              correct: "Job postings listing required skills"
            },
            {
              question: "What is BuiltWith used for?",
              options: [
                "Building websites",
                "Identifying technologies used by websites",
                "Port scanning",
                "Password cracking"
              ],
              correct: "Identifying technologies used by websites"
            }
          ]} />
        </>
      )
    },
    {
      title: 'Documentation and Reporting',
      content: (
        <>
          <p>Proper documentation is essential for effective passive reconnaissance:</p>
          <h4>What to Document:</h4>
          <ul>
            <li><strong>Sources:</strong> Where each piece of information came from</li>
            <li><strong>Timestamps:</strong> When data was collected</li>
            <li><strong>IP Ranges:</strong> Discovered network blocks</li>
            <li><strong>Subdomains:</strong> All discovered subdomains</li>
            <li><strong>Employee Information:</strong> Names, roles, contact details</li>
            <li><strong>Technologies:</strong> Identified tech stack</li>
            <li><strong>Relationships:</strong> Connections between entities</li>
          </ul>
          <h4>Organization Tools:</h4>
          <ul>
            <li><strong>Maltego:</strong> Visual link analysis and mapping</li>
            <li><strong>CherryTree:</strong> Hierarchical note-taking</li>
            <li><strong>Obsidian:</strong> Knowledge base with linking</li>
            <li><strong>Spreadsheets:</strong> Structured data organization</li>
            <li><strong>Mind Maps:</strong> Visual relationship mapping</li>
          </ul>
          <h4>Best Practices:</h4>
          <ul>
            <li>Use consistent naming conventions</li>
            <li>Tag and categorize information</li>
            <li>Verify data from multiple sources</li>
            <li>Note confidence levels for findings</li>
            <li>Keep raw data separate from analysis</li>
            <li>Maintain chain of custody</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop" alt="Documentation" />
        </>
      )
    }
  ]
};