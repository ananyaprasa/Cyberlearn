import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { OsintIcon } from '../components/OsintIcon';
import QuestionCard from '../components/QuestionCard';
import LessonCard from '../components/learning/ui/LessonCard';
import InfoCard from '../components/learning/ui/InfoCard';
import DiagramContainer from '../components/learning/ui/DiagramContainer';
import TerminalBlock from '../components/learning/ui/TerminalBlock';
import LearningObjective from '../components/learning/ui/LearningObjective';
import ConceptGrid from '../components/learning/ui/ConceptGrid';
import OSINTLifecycle from '../components/learning/osint/OSINTLifecycle';
import PassiveVsActiveComparison from '../components/learning/osint/PassiveVsActiveComparison';
import DigitalFootprintMap from '../components/learning/osint/DigitalFootprintMap';
import SourceVerification from '../components/learning/osint/SourceVerification';

// Helper Components
const SectionIntro = ({ children }) => (
  <div style={{
    fontFamily: "'Oxanium', sans-serif",
    fontSize: '1.05rem',
    lineHeight: '1.7',
    color: 'rgba(224, 224, 224, 0.9)',
    marginBottom: '2rem'
  }}>
    {children}
  </div>
);

const MCQBlock = ({ questions }) => (
  <div style={{ margin: '2rem 0' }}>
    <h4 style={{
      fontFamily: "'Sora', sans-serif",
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#2dd68f',
      margin: '0 0 1.5rem 0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8V12L14.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      Knowledge Check
    </h4>
    <div style={{ display: 'grid', gap: '1rem' }}>
      {questions.map((q, i) => (
        <QuestionCard key={i} question={q.q} options={q.options} correctAnswer={q.answer} />
      ))}
    </div>
  </div>
);

const ContinueLink = ({ to, label }) => (
  <Link to={to} style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.75rem',
    background: 'linear-gradient(135deg, rgba(45, 214, 143, 0.12), rgba(2, 168, 154, 0.12))',
    border: '1px solid rgba(45, 214, 143, 0.3)',
    borderRadius: '12px',
    color: '#2dd68f',
    fontFamily: "'Sora', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 600,
    textDecoration: 'none',
    marginTop: '2rem',
    transition: 'all 0.3s ease'
  }}>
    <span style={{ color: 'rgba(171, 207, 201, 0.7)' }}>Continue to:</span>
    <strong>{label}</strong>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Link>
);

// Section Components
function WhyPassiveSection() {
  const questions = [
    { q: "What is the defining characteristic of passive reconnaissance?", options: ["A. It uses automated scanning tools", "B. It involves no direct interaction with the target, leaving no detectable footprint", "C. It requires admin access to target systems", "D. It only works on social media platforms"], answer: "B" },
    { q: "Why is passive reconnaissance considered low-risk compared to active methods?", options: ["A. It uses encrypted connections", "B. It does not interact with the target, so it cannot be detected or logged by the target", "C. It is performed by certified professionals only", "D. It only collects data from government sources"], answer: "B" },
    { q: "An organisation runs passive OSINT against its own domain. What is the primary benefit?", options: ["A. It patches known vulnerabilities automatically", "B. It reveals what an attacker could discover without triggering any alerts", "C. It trains employees in cybersecurity awareness", "D. It generates a compliance report for auditors"], answer: "B" },
  ];

  return (
    <LessonCard number="01" title="Why Passive OSINT Matters" subtitle="The invisible intelligence gathering methodology">
      <SectionIntro>
        Passive reconnaissance is intelligence gathering that leaves zero footprint on the target. By collecting only
        publicly available data, analysts can map an entire attack surface before anyone knows they're looking. This
        makes it the safest — and often most valuable — phase of any investigation.
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: 'Zero Detection',
          children: 'No packets sent to the target means no logs, no alerts, no evidence. The target cannot detect passive activity because you never interact with their systems.'
        },
        {
          label: 'Legal Safety',
          children: 'When limited to public data, passive OSINT is legal in most jurisdictions. Public information has no expectation of privacy.'
        },
        {
          label: 'Intelligence Baseline',
          children: 'Establishes the foundation: exposed subdomains, employee names, technology stack, email formats — shapes every subsequent phase.'
        },
        {
          label: 'Proactive Defense',
          children: 'Organizations can run passive OSINT against themselves to discover what attackers see before an attack occurs.'
        }
      ]} />

      <InfoCard type="tip" title="💡 What Passive OSINT Reveals">
        Job postings expose internal tools. Social media reveals org structure. Certificate transparency logs
        expose unannounced infrastructure. The surface is larger than most organizations realize.
      </InfoCard>

      <DiagramContainer title="Intelligence Lifecycle" subtitle="From raw data to actionable intelligence">
        <OSINTLifecycle />
      </DiagramContainer>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function PassiveVsActiveSection() {
  return (
    <LessonCard number="02" title="Passive vs Active OSINT" subtitle="Understanding the detection risk spectrum">
      <SectionIntro>
        The line between passive and active OSINT defines risk. Passive methods query public sources — search engines,
        registries, social media. Active methods interact with target systems directly. One leaves no trace. The other
        leaves logs, alerts, and legal exposure.
      </SectionIntro>

      <DiagramContainer title="Method Comparison">
        <PassiveVsActiveComparison />
      </DiagramContainer>

      <InfoCard type="warn" title="⚠️ When Does Passive Become Active?">
        Directly querying a target's DNS server (even for public records) is active. Querying a third-party
        DNS lookup service is passive. The difference is whether <strong>your traffic touches their infrastructure</strong>.
      </InfoCard>
    </LessonCard>
  );
}

function SearchEngineSection() {
  const questions = [
    { q: "A researcher uses the query `filetype:pdf site:example.com confidential`. Which technique is this?", options: ["A. DNS enumeration", "B. WHOIS lookup", "C. Google dorking", "D. Metadata extraction"], answer: "C" },
    { q: "Which Google dork operator restricts search results to a specific domain?", options: ["A. inurl:", "B. filetype:", "C. site:", "D. intitle:"], answer: "C" },
    { q: "What is the Google Hacking Database (GHDB)?", options: ["A. A Google product for enterprise search", "B. A curated list of dorks for finding vulnerable systems and exposed data, maintained at exploit-db.com", "C. A database of all Google search queries", "D. A tool for automating Google searches"], answer: "B" },
  ];

  return (
    <LessonCard number="03" title="Search Engine Intelligence" subtitle="Google Dorking for security research">
      <SectionIntro>
        Search engines index billions of pages, including many that should never be public. Advanced search
        operators — called "Google Dorks" — surface information indexed but not easily discoverable through
        normal searches. This is legal, passive, and surprisingly powerful.
      </SectionIntro>

      <TerminalBlock
        title="Domain Enumeration"
        description="Find all indexed pages on a domain"
        command="site:example.com"
      />

      <TerminalBlock
        title="Exposed Documents"
        description="Surface PDFs that might contain sensitive information"
        command='filetype:pdf site:example.com confidential'
      />

      <TerminalBlock
        title="Admin Panel Discovery"
        description="Locate login pages and admin interfaces"
        command='inurl:admin site:example.com'
      />

      <TerminalBlock
        title="Title Search"
        description="Find pages with specific keywords in the title"
        command='intitle:"index of" site:example.com'
      />

      <InfoCard type="info">
        <strong>Google Hacking Database (GHDB)</strong> at exploit-db.com maintains thousands of curated
        dorks for finding vulnerable systems, exposed credentials, and misconfigured servers. Study it to
        understand what attackers search for.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function SOCMINTSection() {
  const questions = [
    { q: "Which platform is most valuable for gathering organisational structure and internal tool information?", options: ["A. Instagram", "B. Twitter/X", "C. LinkedIn", "D. Reddit"], answer: "C" },
    { q: "A photo posted publicly on social media contains GPS coordinates in its metadata. What does this reveal?", options: ["A. The photographer's email address", "B. The physical location where the photo was taken", "C. The camera's serial number linked to a purchase record", "D. The social media account's password hash"], answer: "B" },
    { q: "What ethical constraint applies when conducting SOCMINT?", options: ["A. Only government agencies may conduct SOCMINT", "B. Collect only data necessary for the stated objective and never use it to harass or harm", "C. All social media data is freely usable for any purpose", "D. SOCMINT requires written consent from every person profiled"], answer: "B" },
  ];

  return (
    <LessonCard number="04" title="Social Media Intelligence (SOCMINT)" subtitle="Building profiles from public posts">
      <SectionIntro>
        People share more online than they realize. Public social media profiles reveal employment history,
        relationships, travel patterns, opinions, and often unintentional operational security failures.
        SOCMINT systematically collects and analyzes this data to build comprehensive profiles.
      </SectionIntro>

      <DiagramContainer title="Digital Footprint Map" subtitle="What each source reveals">
        <DigitalFootprintMap />
      </DiagramContainer>

      <ConceptGrid concepts={[
        {
          label: 'LinkedIn',
          children: 'Richest source for organizational intelligence: employee names, job titles, internal tools mentioned in job postings, org chart structure.'
        },
        {
          label: 'Twitter/X & Facebook',
          children: 'Personal details, travel patterns, relationships, opinions. Helps build comprehensive target profiles beyond professional identity.'
        },
        {
          label: 'Instagram',
          children: 'Visual intelligence: locations, associates, lifestyle patterns. Photo metadata can include GPS coordinates before platforms strip it.'
        },
        {
          label: 'Photo Metadata',
          children: <>Embedded EXIF data can include GPS coordinates, device model, timestamp. Use <code>exiftool</code> to extract before platforms strip it.</>
        }
      ]} />

      <InfoCard type="danger" title="🔴 Ethical Boundary">
        Collect only what is necessary for the stated objective. Respect platform terms of service.
        <strong> Never use data to harass or harm individuals</strong>. Public does not mean permission to abuse.
      </InfoCard>

      <MCQBlock questions={questions} />
      <ContinueLink to="/osint/active" label="Active Information Gathering" />
    </LessonCard>
  );
}

function DomainIntelSection() {
  const questions = [
    { q: "Which DNS record type reveals the mail servers responsible for a domain?", options: ["A. A record", "B. MX record", "C. TXT record", "D. CNAME record"], answer: "B" },
    { q: "A researcher queries crt.sh for a target domain. What information does this provide?", options: ["A. Open ports on the target server", "B. All TLS certificates issued for the domain, revealing subdomains via Certificate Transparency logs", "C. The target's WHOIS registration history", "D. The target's email server configuration"], answer: "B" },
    { q: "What is the value of historical WHOIS data when investigating a threat actor?", options: ["A. It shows the actor's current physical location", "B. It reveals past registrant details, previous IPs, and infrastructure changes that help track the actor over time", "C. It provides the actor's login credentials", "D. It automatically blocks the actor's domains"], answer: "B" },
  ];

  return (
    <LessonCard number="05" title="Domain & DNS Intelligence" subtitle="Mapping infrastructure without touching it">
      <SectionIntro>
        Domain registration and DNS records are public by design. WHOIS databases, DNS queries, and certificate
        transparency logs reveal ownership, infrastructure, and often hidden subdomains — all without sending
        a single packet to the target.
      </SectionIntro>

      <TerminalBlock
        title="WHOIS Lookup"
        description="Retrieve domain registration details"
        command="whois example.com"
        output="Registrar: GoDaddy
Registrant: REDACTED FOR PRIVACY
Created: 1995-08-14
Expires: 2025-08-13
Name Servers: ns1.example.com, ns2.example.com"
      />

      <TerminalBlock
        title="DNS A Record"
        description="Resolve domain to IPv4 address"
        command="dig example.com A +short"
        output="93.184.216.34"
      />

      <TerminalBlock
        title="DNS MX Record"
        description="Find mail servers"
        command="dig example.com MX +short"
        output="10 mail.example.com."
      />

      <TerminalBlock
        title="Certificate Transparency"
        description="Discover subdomains via CT logs (visit crt.sh)"
        command="curl -s 'https://crt.sh/?q=%.example.com&output=json' | jq -r '.[].name_value' | sort -u"
        output="api.example.com
dev.example.com
staging.example.com
admin.example.com"
      />

      <InfoCard type="info">
        <strong>Certificate Transparency (CT) logs</strong> are public records of every TLS certificate issued.
        Querying crt.sh or Censys reveals subdomains the organization has never publicly advertised — often
        including dev, staging, and internal systems.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function ToolsSection() {
  const harvesterQs = [
    { q: "What types of data does theHarvester primarily collect?", options: ["A. Open ports, CVEs, and exploit code", "B. Email addresses, subdomains, hosts, and employee names from public sources", "C. Passwords and session tokens from web applications", "D. Network topology and routing tables"], answer: "B" },
    { q: "In the command `theHarvester -d example.com -b google,shodan`, what does the `-b` flag specify?", options: ["A. The output file format", "B. The data sources to query", "C. The brute-force wordlist to use", "D. The bandwidth limit for requests"], answer: "B" },
    { q: "Why is theHarvester typically run early in a passive recon phase?", options: ["A. It is the only tool that can query LinkedIn", "B. Its broad source coverage quickly surfaces the most obvious external exposure points", "C. It must be run before any DNS queries can be made", "D. It automatically exploits discovered vulnerabilities"], answer: "B" },
  ];

  const maltegoQs = [
    { q: "What is a 'transform' in Maltego?", options: ["A. A way to convert file formats", "B. An automated query that pulls live data from a source and renders results as graph nodes", "C. A manual data entry form", "D. A report export function"], answer: "B" },
    { q: "Which best describes Maltego's primary advantage over tools like theHarvester?", options: ["A. It collects more email addresses", "B. Its visual graph makes indirect relationships and infrastructure reuse immediately visible", "C. It is faster at DNS enumeration", "D. It requires no internet connection"], answer: "B" },
    { q: "For what type of investigation is Maltego particularly powerful?", options: ["A. Scanning for open ports on a single host", "B. Threat actor attribution — tracing infrastructure reuse and shared registrant details across malicious domains", "C. Extracting metadata from PDF files", "D. Brute-forcing subdomain names"], answer: "B" },
  ];

  const shodanQs = [
    { q: "What does Shodan index that makes it different from a standard web search engine?", options: ["A. Web page content and HTML", "B. Network service banners, open ports, TLS certificates, and device metadata across the entire IPv4 space", "C. Social media posts and profiles", "D. DNS zone files and WHOIS records"], answer: "B" },
    { q: "A researcher uses Shodan to find all devices running Apache 2.4.49 without scanning any IP directly. Why is this considered passive reconnaissance?", options: ["A. Apache 2.4.49 is not a real version", "B. The data comes from Shodan's own scanners — the analyst sends no traffic to the target", "C. Shodan encrypts all queries so the target cannot see them", "D. Apache servers do not log Shodan queries"], answer: "B" },
    { q: "Which Shodan filter would surface devices with known CVEs?", options: ["A. port:", "B. org:", "C. vuln:", "D. hostname:"], answer: "C" },
  ];

  return (
    <LessonCard number="06" title="Essential OSINT Tools" subtitle="theHarvester, Maltego, and Shodan">
      <SectionIntro>
        Manual searches work for small investigations, but comprehensive OSINT requires automation. These three
        tools aggregate data from dozens of public sources, reveal hidden relationships, and surface infrastructure
        that would take days to find manually.
      </SectionIntro>

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2rem', marginBottom: '1rem' }}>
        theHarvester
      </h3>
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '1rem', lineHeight: 1.7, color: 'rgba(224, 224, 224, 0.9)', marginBottom: '1.5rem' }}>
        Aggregates emails, subdomains, hosts, and employee names from multiple public sources (Google, Bing, LinkedIn,
        Shodan, Hunter.io) in a single run. Typically the first tool run in passive recon.
      </p>

      <TerminalBlock
        title="Basic theHarvester Scan"
        description="Query multiple sources for a target domain"
        command="theHarvester -d example.com -b google,linkedin,shodan"
        output="[*] Searching Google...
[*] Searching LinkedIn...
[*] Searching Shodan...

Emails found: 12
Hosts found: 8
----------------------------
john.doe@example.com
jane.smith@example.com
api.example.com
dev.example.com"
      />

      <MCQBlock questions={harvesterQs} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Maltego
      </h3>
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '1rem', lineHeight: 1.7, color: 'rgba(224, 224, 224, 0.9)', marginBottom: '1.5rem' }}>
        Visual intelligence platform that maps relationships between entities (domains, IPs, emails, people) as an
        interactive graph. "Transforms" query dozens of sources and render results as connected nodes. Makes indirect
        connections immediately visible.
      </p>

      <InfoCard type="info">
        Maltego Community Edition is free with limited transform calls per day. Maltego Pro provides higher
        limits and access to premium data sources like VirusTotal, Have I Been Pwned, and Shodan.
      </InfoCard>

      <MCQBlock questions={maltegoQs} />

      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: '#e6e9f0', marginTop: '2.5rem', marginBottom: '1rem' }}>
        Shodan
      </h3>
      <p style={{ fontFamily: "'Oxanium', sans-serif", fontSize: '1rem', lineHeight: 1.7, color: 'rgba(224, 224, 224, 0.9)', marginBottom: '1.5rem' }}>
        Search engine for internet-connected devices. Continuously scans IPv4 space and indexes service banners, open
        ports, TLS certificates, device metadata. Unlike Google (indexes web content), Shodan indexes network services.
      </p>

      <TerminalBlock
        title="Shodan Search Examples"
        description="Query Shodan's indexed data (visit shodan.io)"
        command={`# Search examples (use Shodan web interface or API):
hostname:example.com
org:"Example Corp"
port:3389 country:US
vuln:CVE-2021-44228`}
      />

      <InfoCard type="tip" title="💡 Why Shodan is Passive">
        <strong>Because Shodan's data comes from Shodan's own scanners, not yours</strong>. When you query
        Shodan, the target never sees traffic from you. You're querying a database, not scanning directly.
      </InfoCard>

      <MCQBlock questions={shodanQs} />
    </LessonCard>
  );
}

function VerificationSection() {
  return (
    <LessonCard number="07" title="Source Verification" subtitle="Evaluating intelligence reliability">
      <SectionIntro>
        A single data point is rarely sufficient. Public sources can be outdated, incorrect, or deliberately
        misleading. Cross-referencing findings across multiple independent sources increases confidence and
        reduces false positives. Trust, but verify.
      </SectionIntro>

      <DiagramContainer title="Evidence Evaluation Process">
        <SourceVerification />
      </DiagramContainer>

      <ConceptGrid concepts={[
        {
          label: 'Source Reliability',
          children: 'Is this source authoritative? Official registries (WHOIS, DNS) are more reliable than third-party aggregators or social media.'
        },
        {
          label: 'Multiple Sources',
          children: 'Corroborate claims across independent sources. If three different sources confirm the same detail, confidence increases.'
        },
        {
          label: 'Temporal Relevance',
          children: 'When was this data collected? WHOIS records change. Employees leave. Subdomains are decommissioned. Check timestamps.'
        },
        {
          label: 'Context Matters',
          children: 'A LinkedIn profile claiming "CEO of ExampleCorp" needs verification. Cross-reference with company website, press releases, other profiles.'
        }
      ]} />

      <InfoCard type="warn" title="⚠️ Confirmation Bias Risk">
        Don't just seek information that confirms your hypothesis. Actively look for contradictory evidence.
        A good analyst challenges their own conclusions.
      </InfoCard>
    </LessonCard>
  );
}

function EthicsSection() {
  const questions = [
    { q: "A consultant performs passive OSINT after receiving only verbal permission. Why is this problematic?", options: ["A. Verbal permission is legally insufficient and offers no protection if a dispute arises", "B. Passive OSINT always requires a court order", "C. The manager should have used email instead", "D. Passive OSINT cannot be authorised by a manager"], answer: "A" },
    { q: "Which principle should guide how much personal data is collected during passive OSINT?", options: ["A. Collect everything available to maximise intelligence value", "B. Collect only data strictly necessary for the stated objective", "C. Collect data until the storage limit is reached", "D. Collect whatever the tools find automatically"], answer: "B" },
    { q: "Using public social media data to track an individual's daily movements without their knowledge is:", options: ["A. Acceptable because the data is public", "B. Only acceptable if done by law enforcement", "C. Potentially illegal and a serious ethical violation regardless of data source", "D. Fine as long as no hacking tools are used"], answer: "C" },
  ];

  return (
    <LessonCard number="08" title="Legal & Ethical Considerations" subtitle="Operating within boundaries">
      <SectionIntro>
        "Public" does not mean "permission to abuse." Laws governing data collection vary by jurisdiction.
        What's legal in one country may be criminal in another. Written authorization, respect for privacy,
        and responsible data handling are non-negotiable.
      </SectionIntro>

      <InfoCard type="danger" title="🔴 Legal Requirements">
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Written authorization</strong> before conducting OSINT as part of any professional engagement</li>
          <li style={{ marginBottom: '0.5rem' }}>Verbal permission is legally insufficient and offers no protection</li>
          <li style={{ marginBottom: '0.5rem' }}>Laws vary by jurisdiction — understand local regulations</li>
          <li>Cross-border investigations may trigger multiple legal frameworks</li>
        </ul>
      </InfoCard>

      <ConceptGrid concepts={[
        {
          label: 'Data Minimization',
          children: 'Collect only data strictly necessary for the stated objective. Avoid aggregating personal information beyond what the task requires.'
        },
        {
          label: 'Responsible Handling',
          children: 'Store gathered data securely, limit access to those who need it, dispose of it properly when the engagement is complete.'
        },
        {
          label: 'Respect for Privacy',
          children: 'Public does not mean consequence-free. Using data to harass or harm individuals is illegal regardless of how it was obtained.'
        },
        {
          label: 'Platform Terms of Service',
          children: 'Respect ToS of platforms you query. Automated scraping may violate terms even if data is public.'
        }
      ]} />

      <InfoCard type="warn" title="⚠️ Passive ≠ Harmless">
        Passive OSINT can still cause harm if misused. Doxing, stalking, and harassment using public data
        are crimes in many jurisdictions. <strong>Intent and use matter as much as method</strong>.
      </InfoCard>

      <MCQBlock questions={questions} />
    </LessonCard>
  );
}

function BestPracticesSection() {
  const questions = [
    { q: "Why should OSINT work be performed in a dedicated isolated environment?", options: ["A. To make the tools run faster", "B. To prevent accidental account linkage or cookie-based tracking that could alert the target", "C. Isolated environments are required by law for OSINT", "D. To avoid using too much bandwidth"], answer: "B" },
    { q: "Why is cross-referencing findings across multiple sources important before drawing conclusions?", options: ["A. It makes the report longer", "B. A single data point is rarely sufficient — corroboration increases confidence and reduces false positives", "C. It is required by all OSINT frameworks", "D. It speeds up the data collection phase"], answer: "B" },
    { q: "What is the purpose of archiving raw tool outputs with timestamps?", options: ["A. To compress data for faster transmission", "B. To allow findings to be independently verified and reproduced later", "C. To automatically generate a final report", "D. To encrypt sensitive findings"], answer: "B" },
  ];

  return (
    <LessonCard number="09" title="Best Practices" subtitle="Operating like a professional">
      <SectionIntro>
        Professional OSINT follows a disciplined methodology: Define scope. Isolate environment. Document everything.
        Cross-reference findings. Update tools regularly. These practices separate intelligence analysts from
        amateur searches.
      </SectionIntro>

      <ConceptGrid concepts={[
        {
          label: 'Define Scope First',
          children: 'Document exactly which domains, IP ranges, or individuals are authorized for investigation. Prevents scope creep into unauthorized territory.'
        },
        {
          label: 'Isolated Environment',
          children: <>Use a dedicated VM or separate browser profile for OSINT work. Prevents accidental account linkage or cookie-based tracking by the target.</>
        },
        {
          label: 'Document Everything',
          children: 'Archive raw tool outputs with timestamps and source references. Findings must be reproducible and independently verifiable.'
        },
        {
          label: 'Cross-Reference',
          children: 'Single data point = low confidence. Multiple independent sources confirm = high confidence. Always corroborate before concluding.'
        },
        {
          label: 'Tool Maintenance',
          children: 'OSINT sources change frequently. Tools that worked last year may be deprecated or blocked. Regular updates essential.'
        },
        {
          label: 'Operational Security',
          children: 'Protect analyst identity. Use VPNs where appropriate. Avoid reusing personal accounts for investigations.'
        }
      ]} />

      <InfoCard type="tip" title="💡 Professional Workflow">
        <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Define objective and scope (written)</li>
          <li style={{ marginBottom: '0.5rem' }}>Set up isolated investigation environment</li>
          <li style={{ marginBottom: '0.5rem' }}>Run broad tools first (theHarvester, Shodan queries)</li>
          <li style={{ marginBottom: '0.5rem' }}>Deep dive into specific findings</li>
          <li style={{ marginBottom: '0.5rem' }}>Cross-reference all claims</li>
          <li style={{ marginBottom: '0.5rem' }}>Document sources and confidence levels</li>
          <li>Report findings with evidence chain</li>
        </ol>
      </InfoCard>

      <MCQBlock questions={questions} />
      <ContinueLink to="/osint/active" label="Active Information Gathering" />
    </LessonCard>
  );
}

function OSINTPassive() {
  const learningObjectives = [
    'Understand passive information gathering methodology',
    'Master search engine intelligence (Google Dorking)',
    'Collect social media intelligence (SOCMINT) ethically',
    'Perform domain and DNS reconnaissance',
    'Use theHarvester, Maltego, and Shodan effectively',
    'Verify source reliability and evaluate confidence levels',
    'Operate within legal and ethical boundaries',
    'Follow professional OSINT best practices'
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}>
          <ShaderGradient animate="off" brightness={1.4} cAzimuthAngle={0} cDistance={7.1} cPolarAngle={140} cameraZoom={17.29} color1="#aeacb7" color2="#152921" color3="#002f00" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={0} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={0} shader="defaults" type="sphere" uAmplitude={1.6} uDensity={1.1} uFrequency={5.5} uSpeed={0.1} uStrength={1} uTime={0} wireframe={false} />
        </ShaderGradientCanvas>
      </Suspense>

      <Navbar />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', padding: '3rem 0 2rem', position: 'relative' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <OsintIcon size={80} />
          </div>
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '3rem',
            fontWeight: 800,
            color: '#abcfc9',
            margin: '0 0 1rem 0',
            lineHeight: 1.2
          }}>
            Passive OSINT Fundamentals
          </h1>
          <p style={{
            fontFamily: "'Oxanium', sans-serif",
            fontSize: '1.25rem',
            color: 'rgba(171, 207, 201, 0.8)',
            margin: '0 auto 2rem',
            maxWidth: '700px',
            lineHeight: 1.6
          }}>
            Learn how security researchers collect intelligence from publicly available sources without directly
            interacting with the target
          </p>

          {/* Metadata */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{
              background: 'rgba(45, 214, 143, 0.1)',
              border: '1px solid rgba(45, 214, 143, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Level</div>
              <div style={{ fontSize: '1rem', color: '#2dd68f', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>Beginner</div>
            </div>
            <div style={{
              background: 'rgba(45, 214, 143, 0.1)',
              border: '1px solid rgba(45, 214, 143, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Lessons</div>
              <div style={{ fontSize: '1rem', color: '#2dd68f', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>9</div>
            </div>
            <div style={{
              background: 'rgba(45, 214, 143, 0.1)',
              border: '1px solid rgba(45, 214, 143, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(171, 207, 201, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Duration</div>
              <div style={{ fontSize: '1rem', color: '#2dd68f', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>90 min</div>
            </div>
          </div>
        </div>

        <Link to="/osint" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          background: 'rgba(0,0,0,0.35)',
          border: '1px solid #00FFC8',
          borderRadius: '12px',
          color: '#FFFFFF',
          fontFamily: "'Sora', sans-serif",
          fontSize: '0.95rem',
          fontWeight: 600,
          textDecoration: 'none',
          marginBottom: '2rem',
          transition: 'all 0.2s ease'
        }}>
          ← Back to OSINT
        </Link>

        <LearningObjective objectives={learningObjectives} />

        <WhyPassiveSection />
        <PassiveVsActiveSection />
        <SearchEngineSection />
        <SOCMINTSection />
        <DomainIntelSection />
        <ToolsSection />
        <VerificationSection />
        <EthicsSection />
        <BestPracticesSection />
      </div>
    </div>
  );
}

export default OSINTPassive;
