import { Suspense, useState, memo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { OsintIcon } from "../components/OsintIcon";
import QuestionCard from "../components/QuestionCard";

const SECTIONS = [
  {
    id: "why-passive",
    title: "1. Why Passive Reconnaissance Matters",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=60",
    imgAlt: "Passive reconnaissance overview",
    bullets: [
      "Passive reconnaissance is the practice of gathering intelligence about a target using only publicly available data � no packets are sent to the target, leaving zero detectable footprint.",
      "Because the target cannot detect passive activity, it is the safest starting point for any security assessment and is legal in most jurisdictions when limited to public data.",
      "It establishes a broad intelligence baseline � exposed subdomains, employee names, technology stack, email formats � that shapes every subsequent phase of an engagement.",
      "Organisations can run passive recon against themselves to discover what attackers can see before an attack occurs, enabling proactive risk reduction.",
      "Passive methods often reveal more than expected: job postings expose internal tools, social media reveals org structure, and certificate logs expose unannounced infrastructure.",
    ],
    questions: [
      { q: "What is the defining characteristic of passive reconnaissance?", options: ["A. It uses automated scanning tools", "B. It involves no direct interaction with the target, leaving no detectable footprint", "C. It requires admin access to target systems", "D. It only works on social media platforms"], answer: "B" },
      { q: "Why is passive reconnaissance considered low-risk compared to active methods?", options: ["A. It uses encrypted connections", "B. It does not interact with the target, so it cannot be detected or logged by the target", "C. It is performed by certified professionals only", "D. It only collects data from government sources"], answer: "B" },
      { q: "An organisation runs passive OSINT against its own domain. What is the primary benefit?", options: ["A. It patches known vulnerabilities automatically", "B. It reveals what an attacker could discover without triggering any alerts", "C. It trains employees in cybersecurity awareness", "D. It generates a compliance report for auditors"], answer: "B" },
    ],
  },
  {
    id: "google-dorking",
    title: "2. Search Engine Intelligence (Google Dorking)",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=60",
    imgAlt: "Search engine intelligence",
    bullets: [
      "Google Dorking uses advanced search operators to surface information that is indexed but not easily discoverable through normal searches.",
      "The `site:` operator restricts results to a specific domain (e.g. `site:example.com`) � useful for mapping all indexed pages, subdomains, and file types.",
      "The `filetype:` operator finds specific document types: `filetype:pdf site:example.com confidential` can surface sensitive internal documents accidentally indexed.",
      "The `inurl:` and `intitle:` operators find pages with specific strings in their URL or title � commonly used to locate exposed admin panels, login pages, and config files.",
      "Google Hacking Database (GHDB) at exploit-db.com maintains a curated list of dorks for finding vulnerable systems, exposed credentials, and misconfigured servers.",
    ],
    questions: [
      { q: "A researcher uses the query `filetype:pdf site:example.com confidential`. Which technique is this?", options: ["A. DNS enumeration", "B. WHOIS lookup", "C. Google dorking", "D. Metadata extraction"], answer: "C" },
      { q: "Which Google dork operator restricts search results to a specific domain?", options: ["A. inurl:", "B. filetype:", "C. site:", "D. intitle:"], answer: "C" },
      { q: "What is the Google Hacking Database (GHDB)?", options: ["A. A Google product for enterprise search", "B. A curated list of dorks for finding vulnerable systems and exposed data, maintained at exploit-db.com", "C. A database of all Google search queries", "D. A tool for automating Google searches"], answer: "B" },
    ],
  },
  {
    id: "socmint",
    title: "3. Social Media Intelligence (SOCMINT)",
    img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=700&q=60",
    imgAlt: "Social media intelligence",
    bullets: [
      "SOCMINT involves systematically collecting and analysing publicly available social media data to build profiles of individuals, organisations, or groups.",
      "LinkedIn is the richest source for organisational intelligence � employee names, job titles, internal tools mentioned in job postings, and org chart structure are all publicly visible.",
      "Twitter/X, Facebook, and Instagram can reveal personal details, travel patterns, relationships, and opinions that help build a comprehensive target profile.",
      "Metadata embedded in photos posted to social media (before platforms strip it) can include GPS coordinates, device model, and timestamp � revealing physical location.",
      "SOCMINT must be conducted ethically: collecting only what is necessary, respecting platform terms of service, and never using data to harass or harm individuals.",
    ],
    questions: [
      { q: "Which platform is most valuable for gathering organisational structure and internal tool information?", options: ["A. Instagram", "B. Twitter/X", "C. LinkedIn", "D. Reddit"], answer: "C" },
      { q: "A photo posted publicly on social media contains GPS coordinates in its metadata. What does this reveal?", options: ["A. The photographer's email address", "B. The physical location where the photo was taken", "C. The camera's serial number linked to a purchase record", "D. The social media account's password hash"], answer: "B" },
      { q: "What ethical constraint applies when conducting SOCMINT?", options: ["A. Only government agencies may conduct SOCMINT", "B. Collect only data necessary for the stated objective and never use it to harass or harm", "C. All social media data is freely usable for any purpose", "D. SOCMINT requires written consent from every person profiled"], answer: "B" },
    ],
  },
  {
    id: "whois",
    title: "4. WHOIS and Domain Intelligence",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=60",
    imgAlt: "WHOIS domain lookup",
    bullets: [
      "WHOIS queries domain registration databases to retrieve ownership details, registrar information, registration and expiry dates, and sometimes registrant contact information.",
      "DNS enumeration maps a domain's infrastructure by querying record types: A (IPv4 address), MX (mail servers), TXT (SPF/DKIM/verification tokens), NS (name servers), and CNAME (aliases).",
      "Reverse DNS lookups resolve an IP address back to a hostname, often revealing related infrastructure, hosting providers, and other domains on the same server.",
      "Certificate Transparency (CT) logs are public records of every TLS certificate issued � querying crt.sh or Censys reveals subdomains the organisation has never publicly advertised.",
      "Historical WHOIS data (via DomainTools or SecurityTrails) shows past registrant details, previous IP addresses, and infrastructure changes over time � invaluable for tracking threat actors.",
    ],
    questions: [
      { q: "Which DNS record type reveals the mail servers responsible for a domain?", options: ["A. A record", "B. MX record", "C. TXT record", "D. CNAME record"], answer: "B" },
      { q: "A researcher queries crt.sh for a target domain. What information does this provide?", options: ["A. Open ports on the target server", "B. All TLS certificates issued for the domain, revealing subdomains via Certificate Transparency logs", "C. The target's WHOIS registration history", "D. The target's email server configuration"], answer: "B" },
      { q: "What is the value of historical WHOIS data when investigating a threat actor?", options: ["A. It shows the actor's current physical location", "B. It reveals past registrant details, previous IPs, and infrastructure changes that help track the actor over time", "C. It provides the actor's login credentials", "D. It automatically blocks the actor's domains"], answer: "B" },
    ],
  },
  {
    id: "theharvester",
    title: "5. Essential Tools � theHarvester",
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&q=60",
    imgAlt: "theHarvester tool",
    bullets: [
      "theHarvester is an open-source OSINT tool designed to aggregate email addresses, subdomains, hosts, employee names, and open ports from multiple public sources in a single run.",
      "It queries sources including Google, Bing, LinkedIn, Shodan, Hunter.io, and DNS brute-force to build a comprehensive picture of a target's external footprint.",
      "Basic usage: `theHarvester -d example.com -b google,linkedin,shodan` � the `-d` flag sets the target domain and `-b` specifies the data sources to query.",
      "Output includes discovered email addresses (useful for phishing simulations and credential checks), subdomains, and associated IP addresses.",
      "theHarvester is typically one of the first tools run in a passive recon phase because its broad source coverage quickly surfaces the most obvious exposure points.",
    ],
    questions: [
      { q: "What types of data does theHarvester primarily collect?", options: ["A. Open ports, CVEs, and exploit code", "B. Email addresses, subdomains, hosts, and employee names from public sources", "C. Passwords and session tokens from web applications", "D. Network topology and routing tables"], answer: "B" },
      { q: "In the command `theHarvester -d example.com -b google,shodan`, what does the `-b` flag specify?", options: ["A. The output file format", "B. The data sources to query", "C. The brute-force wordlist to use", "D. The bandwidth limit for requests"], answer: "B" },
      { q: "Why is theHarvester typically run early in a passive recon phase?", options: ["A. It is the only tool that can query LinkedIn", "B. Its broad source coverage quickly surfaces the most obvious external exposure points", "C. It must be run before any DNS queries can be made", "D. It automatically exploits discovered vulnerabilities"], answer: "B" },
    ],
  },
  {
    id: "maltego",
    title: "6. Essential Tools � Maltego",
    img: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=700&q=60",
    imgAlt: "Maltego link analysis",
    bullets: [
      "Maltego is a visual intelligence and link analysis platform that maps relationships between entities � domains, IP addresses, email addresses, people, and organisations � as an interactive graph.",
      "Data is gathered via 'transforms': automated queries that pull live data from dozens of public and commercial sources (Shodan, VirusTotal, HaveIBeenPwned, DNS, WHOIS) and render results as graph nodes.",
      "The visual graph makes indirect connections immediately visible � an email address linked to a domain linked to an IP linked to another domain reveals infrastructure reuse that a flat list would hide.",
      "Maltego Community Edition is free with limited transform calls per day; Maltego Pro and commercial transform hubs provide higher limits and access to premium data sources.",
      "It is particularly powerful for threat actor attribution � tracing infrastructure reuse, shared registrant details, and overlapping IP ranges across multiple malicious domains.",
    ],
    questions: [
      { q: "What is a 'transform' in Maltego?", options: ["A. A way to convert file formats", "B. An automated query that pulls live data from a source and renders results as graph nodes", "C. A manual data entry form", "D. A report export function"], answer: "B" },
      { q: "Which best describes Maltego's primary advantage over tools like theHarvester?", options: ["A. It collects more email addresses", "B. Its visual graph makes indirect relationships and infrastructure reuse immediately visible", "C. It is faster at DNS enumeration", "D. It requires no internet connection"], answer: "B" },
      { q: "For what type of investigation is Maltego particularly powerful?", options: ["A. Scanning for open ports on a single host", "B. Threat actor attribution � tracing infrastructure reuse and shared registrant details across malicious domains", "C. Extracting metadata from PDF files", "D. Brute-forcing subdomain names"], answer: "B" },
    ],
  },
  {
    id: "shodan",
    title: "7. Essential Tools � Shodan",
    img: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=60",
    imgAlt: "Shodan internet scanner",
    bullets: [
      "Shodan is a search engine for internet-connected devices � it continuously scans the entire IPv4 address space and indexes service banners, open ports, TLS certificates, and device metadata.",
      "Unlike Google, which indexes web content, Shodan indexes the responses of network services: HTTP headers, SSH banners, FTP greetings, Telnet prompts, and industrial control system (ICS) protocols.",
      "Analysts can search for specific software versions (`apache/2.4.49`), default credentials pages, exposed webcams, or industrial SCADA systems without ever touching the target.",
      "Shodan filters include `hostname:`, `org:`, `port:`, `country:`, and `vuln:` � the `vuln:` filter surfaces devices with known CVEs, making it a powerful vulnerability discovery tool.",
      "Because Shodan's data is collected by Shodan's own scanners (not the analyst), querying it is entirely passive � the target never sees any traffic from the analyst.",
    ],
    questions: [
      { q: "What does Shodan index that makes it different from a standard web search engine?", options: ["A. Web page content and HTML", "B. Network service banners, open ports, TLS certificates, and device metadata across the entire IPv4 space", "C. Social media posts and profiles", "D. DNS zone files and WHOIS records"], answer: "B" },
      { q: "A researcher uses Shodan to find all devices running Apache 2.4.49 without scanning any IP directly. Why is this considered passive reconnaissance?", options: ["A. Apache 2.4.49 is not a real version", "B. The data comes from Shodan's own scanners � the analyst sends no traffic to the target", "C. Shodan encrypts all queries so the target cannot see them", "D. Apache servers do not log Shodan queries"], answer: "B" },
      { q: "Which Shodan filter would surface devices with known CVEs?", options: ["A. port:", "B. org:", "C. vuln:", "D. hostname:"], answer: "C" },
    ],
  },
  {
    id: "legal",
    title: "8. Legal and Ethical Considerations",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=60",
    imgAlt: "Legal and ethics",
    bullets: [
      "Always operate within legal boundaries � laws governing data collection vary by jurisdiction; activities legal in one country may be criminal in another.",
      "Obtain written authorisation before conducting OSINT as part of any professional engagement; verbal permission is insufficient and offers no legal protection.",
      "Respect individual privacy � collect only the data necessary for the stated objective; avoid aggregating personal information beyond what the task requires.",
      "Handle gathered data responsibly � store it securely, limit access to those who need it, and dispose of it properly when the engagement is complete.",
      "Passive does not mean consequence-free � using publicly available data to harass or harm individuals is illegal regardless of how the data was obtained.",
    ],
    questions: [
      { q: "A consultant performs passive OSINT after receiving only verbal permission. Why is this problematic?", options: ["A. Verbal permission is legally insufficient and offers no protection if a dispute arises", "B. Passive OSINT always requires a court order", "C. The manager should have used email instead", "D. Passive OSINT cannot be authorised by a manager"], answer: "A" },
      { q: "Which principle should guide how much personal data is collected during passive OSINT?", options: ["A. Collect everything available to maximise intelligence value", "B. Collect only data strictly necessary for the stated objective", "C. Collect data until the storage limit is reached", "D. Collect whatever the tools find automatically"], answer: "B" },
      { q: "Using public social media data to track an individual's daily movements without their knowledge is:", options: ["A. Acceptable because the data is public", "B. Only acceptable if done by law enforcement", "C. Potentially illegal and a serious ethical violation regardless of data source", "D. Fine as long as no hacking tools are used"], answer: "C" },
    ],
  },
  {
    id: "best-practices",
    title: "9. Best Practices",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=60",
    imgAlt: "Best practices checklist",
    bullets: [
      "Define scope before starting � document exactly which domains, IP ranges, or individuals are authorised for investigation to avoid straying into unauthorised territory.",
      "Use a dedicated, isolated environment (VM or separate browser profile) for OSINT work to prevent accidental account linkage or cookie-based tracking by the target.",
      "Document everything with timestamps and source references � raw outputs must be reproducible so findings can be independently verified.",
      "Cross-reference findings across multiple sources before drawing conclusions � a single data point is rarely sufficient; corroboration increases confidence and reduces false positives.",
      "Regularly update your toolset and source list � OSINT sources change frequently; tools that worked last year may be deprecated or blocked today.",
    ],
    questions: [
      { q: "Why should OSINT work be performed in a dedicated isolated environment?", options: ["A. To make the tools run faster", "B. To prevent accidental account linkage or cookie-based tracking that could alert the target", "C. Isolated environments are required by law for OSINT", "D. To avoid using too much bandwidth"], answer: "B" },
      { q: "Why is cross-referencing findings across multiple sources important before drawing conclusions?", options: ["A. It makes the report longer", "B. A single data point is rarely sufficient � corroboration increases confidence and reduces false positives", "C. It is required by all OSINT frameworks", "D. It speeds up the data collection phase"], answer: "B" },
      { q: "What is the purpose of archiving raw tool outputs with timestamps?", options: ["A. To compress data for faster transmission", "B. To allow findings to be independently verified and reproduced later", "C. To automatically generate a final report", "D. To encrypt sensitive findings"], answer: "B" },
    ],
  },
];

const CollapsibleCard = memo(function CollapsibleCard({ title, img, imgAlt, bullets, questions }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`passive-panel${open ? ' passive-panel--open' : ''}`}>
      <button className="passive-panel-header" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="passive-panel-title">{title}</span>
        <span className="passive-panel-toggle" aria-hidden="true">{open ? '-' : '+'}</span>
      </button>
      <div className="passive-panel-body">
        <div>
          <img className="passive-panel-img" src={img} alt={imgAlt} />
          <div className="passive-panel-content">
            <ul className="passive-card-list">{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <div className="passive-mcq-block">
              <p className="passive-mcq-heading">Practice Questions</p>
              {questions.map((item, qi) => (
                <QuestionCard key={`${item.q}-${qi}`} question={item.q} options={item.options} correctAnswer={item.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

function OSINTPassive() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}>
          <ShaderGradient animate="off" brightness={1.4} cAzimuthAngle={0} cDistance={7.1} cPolarAngle={140} cameraZoom={17.29} color1="#aeacb7" color2="#152921" color3="#002f00" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={0} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={0} shader="defaults" type="sphere" uAmplitude={1.6} uDensity={1.1} uFrequency={5.5} uSpeed={0.1} uStrength={1} uTime={0} wireframe={false} />
        </ShaderGradientCanvas>
      </Suspense>
      <style>{`
        .passive-back-btn { transition: transform 0.2s ease; }
        .passive-back-btn:hover { transform: scale(1.05) translateY(-2px); background: rgba(92,242,255,0.25) !important; border-color: #5CF2FF !important; color: #FFFFFF !important; }
        .passive-header-title { color: #abcfc9 !important; -webkit-text-fill-color: #abcfc9 !important; background: none !important; font-family: 'Sora', sans-serif !important; }
        .passive-header-subtitle { font-family: 'Sora', sans-serif !important; }
        .passive-accordion { display: flex; flex-direction: column; gap: 0.85rem; margin-top: 2rem; }
        .passive-panel { background: linear-gradient(135deg,#0a0f0f 0%,#0d0d0d 100%); border: 1px solid rgba(1,107,97,0.2); border-radius: 8px; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .passive-panel:hover, .passive-panel--open { border-color: #02a89a; box-shadow: 0 4px 18px rgba(1,107,97,0.18); }
        .passive-panel-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: transparent; border: none; cursor: pointer; text-align: left; gap: 1rem; }
        .passive-panel-header:focus-visible { outline: 2px solid #02a89a; outline-offset: -2px; }
        .passive-panel-title { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: #02a89a; letter-spacing: 0.01em; line-height: 1.3; }
        .passive-panel-toggle { flex-shrink: 0; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid rgba(2,168,154,0.45); color: #02a89a; font-size: 1.2rem; line-height: 1; font-family: 'Sora', sans-serif; font-weight: 300; transition: background 0.2s ease, border-color 0.2s ease; user-select: none; }
        .passive-panel--open .passive-panel-toggle { background: rgba(2,168,154,0.12); border-color: #02a89a; }
        .passive-panel-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; overflow: hidden; }
        .passive-panel--open .passive-panel-body { grid-template-rows: 1fr; overflow: visible; }
        .passive-panel-body > div { overflow: hidden; }
        .passive-panel--open .passive-panel-body > div { overflow: visible; }
        .passive-panel-img { width: 100%; height: auto; max-height: 240px; object-fit: cover; display: block; border-radius: 6px; margin-bottom: 1rem; opacity: 0.68; filter: saturate(0.5) brightness(0.8); transition: opacity 0.25s ease; }
        .passive-panel--open .passive-panel-img { opacity: 0.82; }
        .passive-panel-content { padding: 1rem 1.5rem 1.4rem; }
        .passive-card-list { margin: 0; padding-left: 1.15rem; list-style: disc; }
        .passive-card-list li { font-family: 'Oxanium', sans-serif; font-size: 0.875rem; color: rgba(224,224,224,0.85); line-height: 1.7; margin-bottom: 0.35rem; }
        .passive-card-list li::marker { color: #016B61; }
        .passive-mcq-block { margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid rgba(1,107,97,0.25); }
        .passive-mcq-heading { font-family: 'Sora', sans-serif; font-size: 0.82rem; font-weight: 700; color: #2dd68f; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
      `}</style>
      <Navbar />
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><OsintIcon size={80} /></div>
          <h1 className="elegant-title passive-header-title">Passive Information Gathering</h1>
          <p className="elegant-subtitle passive-header-subtitle">
            Collect intelligence without touching the target
            <span className="difficulty easy" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>easy</span>
          </p>
          <div className="header-divider"></div>
        </div>
        <Link to="/osint" className="back-btn passive-back-btn" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #00FFC8', color: '#FFFFFF' }}>
          ← Back to OSINT
        </Link>
        <div className="passive-accordion">
          {SECTIONS.map((s) => <CollapsibleCard key={s.id} {...s} />)}
        </div>
      </div>
    </div>
  );
}

export default OSINTPassive;
