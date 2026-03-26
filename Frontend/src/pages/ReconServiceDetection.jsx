import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { ReconIcon } from '../components/ReconIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'intro',
    title: '1. Introduction to Service Detection',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=60',
    imgAlt: 'Service detection overview',
    bullets: [
      'Service detection identifies what application is running on an open port and, critically, which version � version numbers are the direct input for CVE lookups.',
      'Knowing a service is running on port 8080 is less useful than knowing it is Apache Tomcat 9.0.37 � the latter maps directly to known exploits.',
      'Service detection combines banner grabbing, protocol probing, and response fingerprinting to build a confident identification of each service.',
      'False positives and false negatives are possible � services can be misconfigured, banners can be modified, and some services do not respond to standard probes.',
      'Service detection is typically performed after host discovery and port scanning, focusing effort on confirmed open ports rather than the full port range.',
    ],
    questions: [
      { q: 'Why is knowing the exact version of a service more valuable than just knowing the port is open?', options: ['A. Version numbers are required for the final report cover page', 'B. Exact versions map directly to known CVEs and exploits in vulnerability databases', 'C. Version numbers reveal the server\'s physical location', 'D. Newer versions are always more vulnerable'], answer: 'B' },
      { q: 'What combination of techniques does service detection use to identify a service?', options: ['A. Only banner grabbing', 'B. Banner grabbing, protocol probing, and response fingerprinting', 'C. Only port scanning', 'D. Only WHOIS lookups'], answer: 'B' },
      { q: 'Why should service detection focus on confirmed open ports rather than the full port range?', options: ['A. Service detection tools cannot scan closed ports', 'B. Focusing on open ports avoids wasting time and reduces noise on ports with no listening service', 'C. Closed ports always return false positives', 'D. Full port range scanning is illegal'], answer: 'B' },
    ],
  },
  {
    id: 'nmap-service',
    title: '2. Nmap Service Detection',
    img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=60',
    imgAlt: 'Nmap service detection',
    bullets: [
      'Nmap\'s `-sV` flag enables service and version detection � it probes each open port with a series of protocol-specific requests and matches responses against its service database.',
      'The `--version-intensity` option (0�9) controls how aggressively Nmap probes services; higher values are more thorough but slower and more detectable.',
      '`nmap -sV --version-intensity 9 -p <ports> <target>` provides the most thorough version detection at the cost of speed.',
      'Nmap\'s service database (`nmap-service-probes`) contains thousands of probe/response patterns; it is regularly updated and can be extended with custom entries.',
      'Combined with `-sC` (default scripts), `-sV` provides both version information and automated checks for common misconfigurations in a single scan.',
    ],
    questions: [
      { q: 'What does the `--version-intensity 9` flag do in an Nmap service scan?', options: ['A. Limits the scan to 9 ports', 'B. Applies the most aggressive probing for version detection, maximising accuracy at the cost of speed', 'C. Runs 9 parallel scans simultaneously', 'D. Saves output in 9 different formats'], answer: 'B' },
      { q: 'Which Nmap flag enables service and version detection?', options: ['A. -sS', 'B. -sn', 'C. -sV', 'D. -O'], answer: 'C' },
      { q: 'What is the benefit of combining `-sV` with `-sC` in a single Nmap command?', options: ['A. It makes the scan run twice as fast', 'B. It provides both version information and automated checks for common misconfigurations simultaneously', 'C. It enables OS detection', 'D. It saves output in XML format automatically'], answer: 'B' },
    ],
  },
  {
    id: 'banner-grabbing',
    title: '3. Banner Grabbing Techniques',
    img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=700&q=60',
    imgAlt: 'Banner grabbing',
    bullets: [
      'Netcat (`nc <target> <port>`) is the simplest manual banner grabbing tool � connect to a port and read the initial response the service sends.',
      'For HTTP services, sending `HEAD / HTTP/1.0\\r\\n\\r\\n` returns response headers including the Server field, which often reveals the web server software and version.',
      'For SMTP servers, connecting to port 25 typically returns a banner like `220 mail.example.com ESMTP Postfix` � revealing the MTA software and hostname.',
      'Telnet can also be used for manual banner grabbing: `telnet <target> <port>` works identically to Netcat for text-based protocols.',
      'Automated tools like `amap` and `whatweb` extend banner grabbing with protocol-specific probes and pattern matching for web technologies.',
    ],
    questions: [
      { q: 'Which command performs a manual banner grab on TCP port 80?', options: ['A. nmap -sV -p 80 <target>', 'B. nc <target> 80', 'C. dig <target>', 'D. whois <target>'], answer: 'B' },
      { q: 'What HTTP request should be sent to retrieve the Server header from a web server?', options: ['A. GET / HTTP/1.1', 'B. HEAD / HTTP/1.0', 'C. POST / HTTP/1.0', 'D. OPTIONS / HTTP/1.1'], answer: 'B' },
      { q: 'An SMTP banner returns "220 mail.example.com ESMTP Postfix". What useful information does this provide?', options: ['A. The server\'s SSL certificate', 'B. The MTA software (Postfix) and the mail server hostname', 'C. The server\'s open ports', 'D. The number of email accounts on the server'], answer: 'B' },
    ],
  },
  {
    id: 'app-fingerprinting',
    title: '4. Application Fingerprinting',
    img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&q=60',
    imgAlt: 'Application fingerprinting',
    bullets: [
      'Application fingerprinting goes beyond banner grabbing � it analyses response patterns, error messages, header ordering, and behaviour to identify the application even when banners are suppressed.',
      'HTTP response header ordering and casing differ between web servers � Apache, Nginx, and IIS each have characteristic header patterns that persist even when the Server header is removed.',
      'Error page content and formatting are highly distinctive � a 404 page from Apache looks different from one generated by Nginx or a custom application framework.',
      'Cookie names and session token formats often reveal the underlying framework � `PHPSESSID` indicates PHP, `JSESSIONID` indicates Java, `ASP.NET_SessionId` indicates ASP.NET.',
      'Wappalyzer and WhatWeb automate web application fingerprinting by analysing HTML, JavaScript, headers, and cookies against a database of known technology signatures.',
    ],
    questions: [
      { q: 'How can an analyst identify a web server\'s software even when the Server header has been removed?', options: ['A. It is impossible without the Server header', 'B. By analysing HTTP response header ordering, error page content, and other behavioural patterns unique to each server', 'C. By running a port scan', 'D. By checking the domain\'s WHOIS record'], answer: 'B' },
      { q: 'A web application sets a cookie named "JSESSIONID". What does this reveal?', options: ['A. The server is running PHP', 'B. The server is running a Java-based application', 'C. The server is running ASP.NET', 'D. The server is running Python/Django'], answer: 'B' },
      { q: 'Which tool automates web application fingerprinting by analysing HTML, JavaScript, and headers?', options: ['A. Nmap', 'B. Wireshark', 'C. Wappalyzer / WhatWeb', 'D. Netcat'], answer: 'C' },
    ],
  },
  {
    id: 'database',
    title: '5. Database Service Detection',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=60',
    imgAlt: 'Database detection',
    bullets: [
      'Database services run on well-known default ports: MySQL (3306), PostgreSQL (5432), MSSQL (1433), Oracle (1521), MongoDB (27017), Redis (6379).',
      'Nmap NSE scripts (`--script mysql-info`, `--script ms-sql-info`) extract version information and configuration details from database services.',
      'Redis and MongoDB often run without authentication by default � detecting these services on internet-facing hosts is a critical finding.',
      'MSSQL instances can be enumerated via UDP port 1434 using the SQL Server Browser service, which returns instance names and port numbers.',
      'Database version information is particularly valuable � many database CVEs are version-specific and directly exploitable without authentication.',
    ],
    questions: [
      { q: 'Which default port does Redis use?', options: ['A. 3306', 'B. 5432', 'C. 27017', 'D. 6379'], answer: 'D' },
      { q: 'Why is detecting Redis or MongoDB on an internet-facing host a critical finding?', options: ['A. These databases are always encrypted', 'B. They often run without authentication by default, allowing unauthenticated access to all data', 'C. They use non-standard ports that are hard to find', 'D. They are only used by small organisations'], answer: 'B' },
      { q: 'Which Nmap NSE script extracts version and configuration information from MySQL?', options: ['A. --script http-title', 'B. --script mysql-info', 'C. --script ftp-anon', 'D. --script smb-vuln-ms17-010'], answer: 'B' },
    ],
  },
  {
    id: 'os-detection',
    title: '6. Operating System Detection',
    img: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=700&q=60',
    imgAlt: 'OS fingerprinting',
    bullets: [
      'OS detection analyses TCP/IP stack behaviour � TTL values, TCP window sizes, IP ID sequences, and response to unusual flag combinations � to identify the operating system.',
      'Nmap\'s `-O` flag enables OS detection; `-A` combines OS detection, version detection, script scanning, and traceroute in one command.',
      'OS detection requires at least one open and one closed port to function accurately � without both, Nmap cannot make a reliable determination.',
      'Active OS fingerprinting (Nmap -O) is detectable; passive fingerprinting tools like p0f analyse captured traffic without sending any probes.',
      'Knowing the OS narrows the attack surface significantly � a Windows Server 2016 host has a different CVE profile than a Linux host running the same service.',
    ],
    questions: [
      { q: 'What TCP/IP characteristics does Nmap analyse to determine the operating system?', options: ['A. Only the TTL value', 'B. TTL values, TCP window sizes, IP ID sequences, and responses to unusual flag combinations', 'C. Only open port numbers', 'D. Only the service banner'], answer: 'B' },
      { q: 'Why does Nmap OS detection require both an open and a closed port?', options: ['A. Open ports provide the OS banner; closed ports provide the version', 'B. Both port states are needed to generate the TCP/IP response patterns that Nmap compares against its OS database', 'C. Closed ports are required by the Nmap licence', 'D. Open ports alone are sufficient for OS detection'], answer: 'B' },
      { q: 'What is the advantage of passive OS fingerprinting (e.g., p0f) over active fingerprinting (Nmap -O)?', options: ['A. Passive fingerprinting is more accurate', 'B. Passive fingerprinting analyses existing traffic without sending any probes, making it completely undetectable', 'C. Passive fingerprinting works on all operating systems', 'D. Passive fingerprinting is faster'], answer: 'B' },
    ],
  },
  {
    id: 'vuln-correlation',
    title: '7. Vulnerability Correlation',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=60',
    imgAlt: 'Vulnerability correlation',
    bullets: [
      'Once service versions are identified, they are cross-referenced against vulnerability databases � NVD (nvd.nist.gov), CVE Details, and Exploit-DB � to find known exploits.',
      'A CVSS score provides a standardised severity rating (0�10) for each CVE; scores above 9.0 are Critical and should be prioritised immediately.',
      'Nmap\'s `--script vuln` category automates basic vulnerability correlation by running checks for known CVEs against detected service versions.',
      'Searchsploit (the offline Exploit-DB search tool) allows rapid lookup of exploits for a specific service and version without internet access.',
      'Correlation must be validated � a CVE may apply to a specific version range; confirming the exact version before reporting avoids false positives.',
    ],
    questions: [
      { q: 'What does a CVSS score of 9.8 indicate?', options: ['A. The vulnerability is informational only', 'B. The vulnerability is Critical severity and should be prioritised immediately', 'C. The vulnerability only affects Windows systems', 'D. The vulnerability has no known exploit'], answer: 'B' },
      { q: 'Which tool allows offline searching of Exploit-DB for exploits matching a specific service and version?', options: ['A. Nmap', 'B. Searchsploit', 'C. Wireshark', 'D. Maltego'], answer: 'B' },
      { q: 'Why must CVE correlation be validated against the exact service version before reporting?', options: ['A. CVEs are always version-specific and reporting without validation risks false positives', 'B. CVE databases are always inaccurate', 'C. Validation is required by law', 'D. CVEs only apply to the latest software versions'], answer: 'A' },
    ],
  },
  {
    id: 'evasion',
    title: '8. Evasion and Stealth Techniques',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=60',
    imgAlt: 'Stealth techniques',
    bullets: [
      'Reducing scan speed (`-T1` or `-T2`) spaces probes further apart, reducing the scan\'s signature in IDS logs and making correlation harder.',
      'Randomising target order (`--randomize-hosts`) prevents sequential scanning patterns that are trivially detected by threshold-based IDS rules.',
      'Decoy scanning (`-D RND:10`) inserts fake source IPs, making it harder for defenders to identify the real scanner IP in firewall logs.',
      'Idle/Zombie scanning (`-sI <zombie>`) uses a third-party host with predictable IP ID sequences to perform the scan, completely hiding the real source IP.',
      'Fragmenting packets (`-f`) splits probes into smaller IP fragments that may bypass older stateless packet inspection systems.',
    ],
    questions: [
      { q: 'How does idle/zombie scanning (-sI) hide the real scanner\'s IP address?', options: ['A. It encrypts all scan traffic', 'B. It routes scan probes through a third-party zombie host, so only the zombie\'s IP appears in target logs', 'C. It uses Tor to anonymise traffic', 'D. It spoofs the source IP in packet headers'], answer: 'B' },
      { q: 'Why does randomising target order (`--randomize-hosts`) help evade IDS detection?', options: ['A. It makes the scan run faster', 'B. It prevents sequential scanning patterns that threshold-based IDS rules are designed to detect', 'C. It reduces the number of packets sent', 'D. It bypasses firewall rules'], answer: 'B' },
      { q: 'What is the main limitation of packet fragmentation (-f) as an evasion technique?', options: ['A. It only works on UDP scans', 'B. Modern stateful firewalls and IDS systems reassemble fragments before inspection, making fragmentation ineffective against them', 'C. It requires root privileges on all operating systems', 'D. It doubles the scan time'], answer: 'B' },
    ],
  },
  {
    id: 'documentation',
    title: '9. Documentation and Reporting',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=60',
    imgAlt: 'Documentation',
    bullets: [
      'Save all raw Nmap output with `-oA <basename>` immediately � losing scan results because a terminal was closed is a common and avoidable mistake.',
      'Document each finding with: target IP, port, protocol, service name, version, detection method, and associated CVEs with CVSS scores.',
      'Organise findings by severity (Critical ? High ? Medium ? Low ? Informational) so the most important issues are immediately visible to the reader.',
      'Include the exact Nmap command used for each scan � this allows findings to be independently reproduced and verified.',
      'The service detection section of a report should map each version finding to its CVE and recommended remediation, not just list open ports.',
    ],
    questions: [
      { q: 'What is the recommended way to ensure Nmap scan results are not lost during an engagement?', options: ['A. Copy the terminal output manually', 'B. Use `-oA <basename>` to save results in all formats immediately when the scan starts', 'C. Take screenshots of the terminal', 'D. Run the scan twice'], answer: 'B' },
      { q: 'How should findings be organised in a service detection report?', options: ['A. Alphabetically by service name', 'B. By severity (Critical ? High ? Medium ? Low) so the most important issues are immediately visible', 'C. By port number in ascending order', 'D. By the order they were discovered'], answer: 'B' },
      { q: 'Why should the exact Nmap command be included in the report for each scan?', options: ['A. To make the report longer', 'B. To allow findings to be independently reproduced and verified by another analyst or the client', 'C. Nmap requires command logging for licensing', 'D. To show the client which tools were used'], answer: 'B' },
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

function ReconServiceDetection() {
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
          <h1 className="elegant-title recon-header-title">Service & Version Detection</h1>
          <p className="elegant-subtitle recon-header-subtitle">
            Fingerprint services and map findings to known vulnerabilities
            <span className="difficulty hard" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>hard</span>
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

export default ReconServiceDetection;
