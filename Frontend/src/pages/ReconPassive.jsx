import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { ReconIcon } from '../components/ReconIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'understanding',
    title: '1. Understanding Passive Reconnaissance',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=60',
    imgAlt: 'Network overview',
    bullets: [
      'Passive reconnaissance is the process of gathering information about a target without directly interacting with its systems � all data comes from publicly available sources.',
      'Because no packets are sent to the target, the activity is undetectable by the target\'s security monitoring tools, IDS, or firewall logs.',
      'It forms the first phase of any structured penetration test or red team engagement, providing a broad intelligence baseline before active techniques are applied.',
      'Sources include WHOIS registries, DNS records, search engines, social media, job postings, certificate transparency logs, and archived web pages.',
      'The goal is to map the target\'s digital footprint � domains, IP ranges, employees, technologies � without triggering any alerts.',
    ],
    questions: [
      { q: 'What makes passive reconnaissance undetectable by the target?', options: ['A. It uses encrypted tools', 'B. No packets are sent directly to the target system', 'C. It only runs at night', 'D. It requires special government permission'], answer: 'B' },
      { q: 'Which of the following is a passive reconnaissance source?', options: ['A. Running Nmap against the target', 'B. Sending a ping to the target IP', 'C. Querying WHOIS records for domain ownership', 'D. Logging into the target web application'], answer: 'C' },
      { q: 'What is the primary goal of passive reconnaissance?', options: ['A. Exploit vulnerabilities immediately', 'B. Map the target\'s digital footprint without triggering alerts', 'C. Install malware on the target', 'D. Bypass the target firewall'], answer: 'B' },
    ],
  },
  {
    id: 'dns',
    title: '2. DNS Information Gathering',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=60',
    imgAlt: 'DNS records',
    bullets: [
      'DNS records are publicly queryable and reveal a significant amount of infrastructure detail � A, MX, NS, TXT, and CNAME records each expose different aspects of the target.',
      'A records map hostnames to IP addresses; querying them reveals the hosting provider and can expose CDN usage or direct server IPs.',
      'MX records identify mail servers, which are often less hardened than web servers and can be targeted for phishing infrastructure analysis.',
      'TXT records frequently contain SPF, DKIM, and DMARC policies � misconfigurations here indicate susceptibility to email spoofing.',
      'Tools like `dig`, `nslookup`, and online services such as DNSDumpster can enumerate subdomains and map the full DNS landscape passively.',
      'Certificate transparency logs (crt.sh) reveal subdomains that have been issued TLS certificates, often exposing internal or staging infrastructure.',
    ],
    questions: [
      { q: 'Which DNS record type reveals the mail servers for a domain?', options: ['A. A record', 'B. TXT record', 'C. MX record', 'D. CNAME record'], answer: 'C' },
      { q: 'What does a TXT record containing an SPF policy reveal about a target?', options: ['A. The target\'s physical address', 'B. Which mail servers are authorised to send email on behalf of the domain', 'C. The target\'s SSL certificate details', 'D. The IP address of the web server'], answer: 'B' },
      { q: 'Which tool or service can reveal subdomains via certificate transparency logs?', options: ['A. Nmap', 'B. crt.sh', 'C. Wireshark', 'D. Burp Suite'], answer: 'B' },
    ],
  },
  {
    id: 'ip-range',
    title: '3. Public IP Range Discovery',
    img: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=700&q=60',
    imgAlt: 'IP range mapping',
    bullets: [
      'Organisations register IP address blocks with Regional Internet Registries (RIRs) such as ARIN, RIPE, and APNIC � these registrations are publicly searchable.',
      'WHOIS queries against an organisation\'s name or known IP can reveal the full range of IP blocks they own, including netblocks not linked to their primary domain.',
      'BGP routing tables (via tools like BGPView or Hurricane Electric\'s BGP toolkit) show which Autonomous System Numbers (ASNs) an organisation controls.',
      'Knowing the full IP range allows an analyst to scope active scanning phases accurately and avoid missing assets hosted on non-obvious IP blocks.',
      'Shodan and Censys index internet-facing devices by IP and ASN, allowing passive discovery of exposed services across an organisation\'s entire IP space.',
    ],
    questions: [
      { q: 'Which organisation type maintains public records of IP address block registrations?', options: ['A. Certificate Authorities', 'B. Regional Internet Registries (RIRs) such as ARIN and RIPE', 'C. Domain registrars', 'D. Cloud providers'], answer: 'B' },
      { q: 'What does an ASN (Autonomous System Number) represent?', options: ['A. A single IP address assigned to a server', 'B. A collection of IP routing prefixes under the control of one organisation', 'C. A type of DNS record', 'D. A firewall rule set'], answer: 'B' },
      { q: 'Which tool indexes internet-facing devices by IP and ASN without directly scanning the target?', options: ['A. Nmap', 'B. Metasploit', 'C. Shodan', 'D. Nikto'], answer: 'C' },
    ],
  },
  {
    id: 'employee',
    title: '4. Employee Information Gathering',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=60',
    imgAlt: 'Social media profiles',
    bullets: [
      'LinkedIn is the primary source for employee enumeration � job titles, departments, technologies used, and reporting structures are often publicly visible.',
      'Employee names and email formats (e.g. firstname.lastname@company.com) can be inferred from LinkedIn and confirmed via tools like Hunter.io or theHarvester.',
      'Job postings reveal technology stack details � a posting for a "Senior AWS Engineer with Kubernetes experience" tells an attacker exactly what infrastructure the target runs.',
      'GitHub profiles of employees may contain personal projects, internal tooling, or accidentally committed credentials and configuration files.',
      'Social media posts can reveal physical office locations, travel schedules, internal project names, and upcoming product launches � all useful for social engineering.',
    ],
    questions: [
      { q: 'Why are job postings a valuable passive reconnaissance source?', options: ['A. They contain the target\'s IP addresses', 'B. They reveal technology stack and infrastructure details the organisation uses', 'C. They list employee passwords', 'D. They show firewall configurations'], answer: 'B' },
      { q: 'Which tool aggregates employee email addresses from public sources like LinkedIn and search engines?', options: ['A. Nmap', 'B. Wireshark', 'C. theHarvester', 'D. Metasploit'], answer: 'C' },
      { q: 'An employee\'s public GitHub repository contains a config file with database credentials. Which passive technique discovered this?', options: ['A. DNS enumeration', 'B. WHOIS lookup', 'C. Employee information gathering via open-source research', 'D. Port scanning'], answer: 'C' },
    ],
  },
  {
    id: 'tech-stack',
    title: '5. Technology Stack Identification',
    img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&q=60',
    imgAlt: 'Technology fingerprinting',
    bullets: [
      'Wappalyzer and BuiltWith analyse publicly accessible web pages to identify CMS platforms, JavaScript frameworks, analytics tools, CDNs, and server software.',
      'HTTP response headers (Server, X-Powered-By, X-Generator) often reveal web server software and versions without any active probing.',
      'SSL/TLS certificate details expose the certificate authority, organisation name, and sometimes internal hostnames listed as Subject Alternative Names (SANs).',
      'Favicon hashes can be used with Shodan to find all internet-facing assets using the same favicon � a reliable way to discover related infrastructure.',
      'Identifying the technology stack allows an analyst to focus vulnerability research on known CVEs for the specific versions in use.',
    ],
    questions: [
      { q: 'Which HTTP response header commonly reveals the web server software and version?', options: ['A. Content-Type', 'B. Server', 'C. Accept-Encoding', 'D. Cache-Control'], answer: 'B' },
      { q: 'What information can Subject Alternative Names (SANs) in a TLS certificate reveal?', options: ['A. The server\'s private key', 'B. Internal hostnames and related domains not publicly advertised', 'C. The server\'s open ports', 'D. Employee email addresses'], answer: 'B' },
      { q: 'How can a favicon hash be used in passive reconnaissance?', options: ['A. To decrypt HTTPS traffic', 'B. To find all internet-facing assets using the same favicon via Shodan', 'C. To identify employee names', 'D. To enumerate DNS records'], answer: 'B' },
    ],
  },
  {
    id: 'documentation',
    title: '6. Documentation and Reporting',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=60',
    imgAlt: 'Documentation',
    bullets: [
      'Every finding must be recorded with its source, collection timestamp, and the tool or method used � this ensures reproducibility and supports any legal proceedings.',
      'Organise findings by category (DNS, IP ranges, employees, technologies) rather than by tool, making it easier to build a coherent picture of the target.',
      'Assign confidence levels � distinguish between confirmed facts (directly evidenced) and inferences (logically derived) to avoid overstating certainty in the report.',
      'A passive reconnaissance report should clearly state what was found, where it came from, and what risk it represents � not just a raw data dump.',
      'Findings feed directly into the scoping of active phases � the report should conclude with a prioritised list of targets and attack vectors worth investigating further.',
    ],
    questions: [
      { q: 'Why should each passive reconnaissance finding include a source and timestamp?', options: ['A. To make the report longer', 'B. To ensure findings are reproducible and legally defensible', 'C. Timestamps are required by scanning tools', 'D. To sort findings alphabetically'], answer: 'B' },
      { q: 'What is the difference between a confirmed fact and an inference in a recon report?', options: ['A. Confirmed facts are always more useful', 'B. A confirmed fact is directly evidenced; an inference is a reasoned conclusion drawn from that evidence', 'C. Inferences should never appear in reports', 'D. Confirmed facts only come from active scanning'], answer: 'B' },
      { q: 'What should a passive reconnaissance report conclude with?', options: ['A. A list of all tools used', 'B. A prioritised list of targets and attack vectors for the active phase', 'C. The analyst\'s personal opinions', 'D. Raw tool output with no analysis'], answer: 'B' },
    ],
  },
];

const CollapsibleCard = memo(function CollapsibleCard({ title, img, imgAlt, bullets, questions }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`osint-panel${open ? ' osint-panel--open' : ''}`}>
      <button className="osint-panel-header" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="osint-panel-title">{title}</span>
        <span className="osint-panel-toggle" aria-hidden="true">{open ? '-' : '+'}</span>
      </button>
      <div className="osint-panel-body">
        <div>
          <img className="osint-panel-img" src={img} alt={imgAlt} />
          <div className="osint-panel-content">
            <ul className="osint-card-list">{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <div className="osint-mcq-block">
              <p className="osint-mcq-heading">Practice Questions</p>
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

function ReconPassive() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}>
          <ShaderGradient animate="off" axesHelper="on" brightness={1.4} cAzimuthAngle={0} cDistance={7.1} cPolarAngle={140} cameraZoom={17.29} color1="#aeacb7" color2="#152921" color3="#002f00" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={0} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={0} shader="defaults" type="sphere" uAmplitude={1.6} uDensity={1.1} uFrequency={5.5} uSpeed={0.1} uStrength={1} uTime={0} wireframe={false} />
        </ShaderGradientCanvas>
      </Suspense>
      <style>{`
        .back-btn { transition: transform 0.2s ease; }
        .back-btn:hover { transform: scale(1.05) translateY(-2px); }
        .recon-back-btn:hover { background: rgba(92,242,255,0.25) !important; border-color: #5CF2FF !important; color: #FFFFFF !important; }
        .recon-header-title { color: #abcfc9 !important; -webkit-text-fill-color: #abcfc9 !important; background: none !important; font-family: 'Sora', sans-serif !important; }
        .recon-header-subtitle { font-family: 'Sora', sans-serif !important; }
        .osint-accordion { display: flex; flex-direction: column; gap: 0.85rem; margin-top: 2rem; }
        .osint-panel { background: linear-gradient(135deg,#0a0f0f 0%,#0d0d0d 100%); border: 1px solid rgba(1,107,97,0.2); border-radius: 8px; overflow: hidden; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .osint-panel:hover, .osint-panel--open { border-color: #02a89a; box-shadow: 0 4px 18px rgba(1,107,97,0.18); }
        .osint-panel-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: transparent; border: none; cursor: pointer; text-align: left; gap: 1rem; }
        .osint-panel-header:focus-visible { outline: 2px solid #02a89a; outline-offset: -2px; }
        .osint-panel-title { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: #02a89a; letter-spacing: 0.01em; line-height: 1.3; }
        .osint-panel-toggle { flex-shrink: 0; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid rgba(2,168,154,0.45); color: #02a89a; font-size: 1.2rem; line-height: 1; font-family: 'Sora', sans-serif; font-weight: 300; transition: background 0.2s ease, border-color 0.2s ease; user-select: none; }
        .osint-panel--open .osint-panel-toggle { background: rgba(2,168,154,0.12); border-color: #02a89a; }
        .osint-panel-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; }
        .osint-panel--open .osint-panel-body { grid-template-rows: 1fr; }
        .osint-panel-body > div { overflow: hidden; }
        .osint-panel--open .osint-panel-body > div { overflow: visible; }
        .osint-panel-img { width: 100%; height: auto; max-height: 260px; object-fit: cover; display: block; border-radius: 6px; margin-bottom: 1rem; opacity: 0.68; filter: saturate(0.5) brightness(0.8); transition: opacity 0.25s ease; }
        .osint-panel--open .osint-panel-img { opacity: 0.82; }
        .osint-panel-content { padding: 1rem 1.5rem 1.4rem; }
        .osint-card-list { margin: 0; padding-left: 1.15rem; list-style: disc; }
        .osint-card-list li { font-family: 'Oxanium', sans-serif; font-size: 0.875rem; color: rgba(224,224,224,0.85); line-height: 1.7; margin-bottom: 0.35rem; }
        .osint-card-list li::marker { color: #016B61; }
        .osint-mcq-block { margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid rgba(1,107,97,0.25); }
        .osint-mcq-heading { font-family: 'Sora', sans-serif; font-size: 0.82rem; font-weight: 700; color: #2dd68f; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
      `}</style>
      <Navbar />
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><ReconIcon size={80} /></div>
          <h1 className="elegant-title recon-header-title">Passive Reconnaissance</h1>
          <p className="elegant-subtitle recon-header-subtitle">
            Gather intelligence without touching the target
            <span className="difficulty medium" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>medium</span>
          </p>
          <div className="header-divider"></div>
        </div>
        <Link to="/reconnaissance" className="back-btn recon-back-btn" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #00FFC8', color: '#FFFFFF' }}>
          ← Back to Reconnaissance
        </Link>
        <div className="osint-accordion">
          {SECTIONS.map((s) => <CollapsibleCard key={s.id} {...s} />)}
        </div>
      </div>
    </div>
  );
}

export default ReconPassive;
