import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { OsintIcon } from '../components/OsintIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'active-vs-passive',
    title: '1. Understanding Active vs Passive Reconnaissance',
    img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=700&q=60',
    imgAlt: 'Active vs passive reconnaissance',
    bullets: [
      'Passive reconnaissance gathers intelligence using only publicly available data � no packets are sent to the target, leaving zero detectable footprint on the target\'s systems.',
      'Active reconnaissance directly interacts with target systems by sending packets, requests, or probes � this leaves log entries on the target and may trigger IDS/IPS alerts.',
      'Active methods reveal information that passive sources cannot: live port states, exact software versions, real-time service responses, and network topology.',
      'Because active techniques touch the target, they must only be performed with explicit written authorisation � unauthorised scanning violates computer misuse laws in most jurisdictions.',
      'In a typical engagement, passive recon establishes the baseline first; active recon then focuses probes on the most relevant targets identified passively, maximising efficiency.',
    ],
    questions: [
      { q: 'What is the defining difference between active and passive reconnaissance?', options: ['A. Active recon uses only free tools', 'B. Active recon directly interacts with the target, leaving a detectable footprint; passive recon does not touch the target', 'C. Passive recon requires more technical skill', 'D. Active recon only works on web applications'], answer: 'B' },
      { q: 'Why must active reconnaissance always be authorised in writing before starting?', options: ['A. Written permission makes the scan run faster', 'B. Unauthorised scanning is illegal and verbal permission offers no legal protection if a dispute arises', 'C. Tools like Nmap require a licence key tied to written consent', 'D. Active scans automatically notify the target anyway'], answer: 'B' },
      { q: 'In a typical engagement workflow, when does active reconnaissance occur relative to passive?', options: ['A. Before any passive gathering has taken place', 'B. Only after the final report is submitted', 'C. After passive reconnaissance has established a baseline, so probes can be focused on relevant targets', 'D. Simultaneously with report writing'], answer: 'C' },
    ],
  },
  {
    id: 'port-scanning',
    title: '2. Port Scanning Techniques',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=60',
    imgAlt: 'Port scanning techniques',
    bullets: [
      'TCP SYN scan (half-open scan) sends a SYN packet and waits for SYN-ACK � if received, the port is open; the scanner sends RST instead of completing the handshake, making it faster and less likely to be logged by the application.',
      'TCP Connect scan completes the full three-way handshake � it is more reliably detected but works without raw socket privileges, making it useful when running without root/admin access.',
      'UDP scanning probes UDP ports by sending empty or protocol-specific payloads; an ICMP "port unreachable" response means the port is closed, while no response may mean open or filtered.',
      'NULL, FIN, and Xmas scans send packets with unusual TCP flag combinations that some stateless firewalls pass through � they can identify open ports on systems that drop SYN packets.',
      'Port scan results are categorised as open (service responding), closed (port reachable but no service), or filtered (firewall dropping packets with no response).',
    ],
    questions: [
      { q: 'Why is a TCP SYN scan considered "stealthier" than a TCP Connect scan?', options: ['A. SYN scans are encrypted', 'B. SYN scans never complete the handshake, so the application layer typically does not log the connection', 'C. SYN scans use UDP instead of TCP', 'D. SYN scans only work on Windows targets'], answer: 'B' },
      { q: 'A port scan returns "filtered" for port 443. What does this most likely indicate?', options: ['A. HTTPS is running and accepting connections', 'B. The port is closed and no service is listening', 'C. A firewall is dropping probe packets to that port with no response', 'D. The target machine is powered off'], answer: 'C' },
      { q: 'Which scan type works without raw socket privileges by completing the full TCP handshake?', options: ['A. SYN scan', 'B. UDP scan', 'C. TCP Connect scan', 'D. NULL scan'], answer: 'C' },
    ],
  },
  {
    id: 'nmap',
    title: '3. Nmap � The Network Mapper',
    img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=60',
    imgAlt: 'Nmap network scanner',
    bullets: [
      'Nmap is the industry-standard open-source network scanner supporting host discovery, port scanning, service/version detection, OS fingerprinting, and scripted checks via the Nmap Scripting Engine (NSE).',
      'Host discovery (`nmap -sn 192.168.1.0/24`) identifies live hosts in a subnet using ICMP, ARP, and TCP probes before running heavier port scans � avoids wasting time on inactive IPs.',
      'Service and version detection (`-sV`) connects to open ports and reads banners to identify the running application and version, enabling direct CVE lookups.',
      'OS fingerprinting (`-O`) analyses TCP/IP stack behaviour (TTL values, window sizes, TCP options) to estimate the target operating system and version.',
      'NSE scripts (`--script`) extend Nmap with hundreds of checks: vulnerability detection, brute-force, service enumeration, and exploit verification � e.g. `--script vuln` runs all vulnerability scripts.',
      'Timing templates (`-T0` to `-T5`) control scan speed and stealth; `-T1` (sneaky) is slow and avoids IDS thresholds; `-T4` (aggressive) is fast for authorised internal scans.',
    ],
    questions: [
      { q: 'Which Nmap flag enables service and version detection on discovered open ports?', options: ['A. -O', 'B. -sV', 'C. -sn', 'D. -p'], answer: 'B' },
      { q: 'What does the Nmap `-sn` flag do?', options: ['A. Performs a SYN scan on all ports', 'B. Disables port scanning and performs host discovery only', 'C. Enables NSE script scanning', 'D. Sets the timing template to sneaky'], answer: 'B' },
      { q: 'An analyst runs `nmap --script vuln 192.168.1.10`. What does this do?', options: ['A. Scans only for open ports without service detection', 'B. Runs all NSE vulnerability detection scripts against the target', 'C. Performs a UDP scan for vulnerabilities', 'D. Exports results in XML format'], answer: 'B' },
    ],
  },
  {
    id: 'service-enumeration',
    title: '4. Service Enumeration',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=60',
    imgAlt: 'Service enumeration',
    bullets: [
      'Banner grabbing connects to an open port and reads the service response � e.g. connecting to port 22 returns "SSH-2.0-OpenSSH_7.4", directly revealing the software and version.',
      'HTTP enumeration probes web servers for server headers (`Server: Apache/2.4.49`), default pages, directory listings, and robots.txt entries that expose internal paths.',
      'SMB enumeration (using tools like enum4linux or smbclient) can reveal share names, usernames, OS version, and domain information from Windows hosts without authentication.',
      'SNMP enumeration queries Simple Network Management Protocol (UDP 161) on network devices � default community strings ("public") often expose full device configuration, routing tables, and interface details.',
      'DNS enumeration attempts zone transfers, brute-forces subdomains, and queries all record types (A, MX, TXT, NS, CNAME) to map the full DNS infrastructure of the target.',
      'Each enumerated service version should be cross-referenced against the National Vulnerability Database (NVD) and CVE databases to identify known exploitable weaknesses.',
    ],
    questions: [
      { q: 'A banner grab on port 22 returns "SSH-2.0-OpenSSH_7.4". What is the immediate security value of this information?', options: ['A. It reveals the target user\'s password', 'B. The exact version can be looked up in CVE databases to find known vulnerabilities', 'C. It shows the physical location of the server', 'D. It confirms the server is running Linux'], answer: 'B' },
      { q: 'An SNMP query using the community string "public" returns full device configuration. What does this indicate?', options: ['A. The device is correctly secured', 'B. The device is using the default SNMP community string, a common misconfiguration that exposes sensitive data', 'C. SNMP is encrypted on this device', 'D. The device requires authentication for all queries'], answer: 'B' },
      { q: 'A DNS zone transfer succeeds against a target name server. What is the most significant risk?', options: ['A. The attacker can now modify DNS records', 'B. All subdomains and internal hostnames are exposed, significantly expanding the known attack surface', 'C. The DNS server will crash after the transfer', 'D. The target\'s email will stop working'], answer: 'B' },
    ],
  },
  {
    id: 'legal',
    title: '5. Legal Considerations',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=60',
    imgAlt: 'Legal and authorisation',
    bullets: [
      'Active reconnaissance without written authorisation is illegal under computer misuse and unauthorised access laws in virtually every jurisdiction � intent does not provide a legal defence.',
      'A signed Rules of Engagement (RoE) document must define the exact scope (IP ranges, domains, systems), permitted techniques, time windows, and escalation procedures before any active work begins.',
      'Scope creep is a serious legal risk � automated tools may follow redirects or resolve hostnames outside the agreed scope; always review tool configuration and restrict target ranges explicitly.',
      'Aggressive scans can inadvertently cause service disruption (accidental DoS) � this can have legal and contractual consequences even within an authorised engagement if not covered by the RoE.',
      'Data collected during active reconnaissance must be handled securely, shared only with authorised parties, and disposed of properly at the end of the engagement per the agreed data handling policy.',
    ],
    questions: [
      { q: 'A consultant performs active port scanning after receiving only verbal permission from a manager. Why is this legally problematic?', options: ['A. Verbal permission is legally insufficient and offers no protection if a dispute or incident arises', 'B. Port scanning always requires a court order', 'C. The manager should have used email instead', 'D. Active scanning cannot be authorised by a manager'], answer: 'A' },
      { q: 'Which document specifically defines permitted techniques, target scope, and time windows for an active engagement?', options: ['A. Non-disclosure agreement (NDA)', 'B. Statement of work (SoW)', 'C. Rules of Engagement (RoE)', 'D. Penetration test report'], answer: 'C' },
      { q: 'A scanner follows an HTTP redirect to a domain outside the agreed scope and scans it. What risk does this illustrate?', options: ['A. Banner grabbing failure', 'B. Scope creep � automated tools can stray outside agreed boundaries if not explicitly restricted', 'C. DNS poisoning by the target', 'D. A false negative in vulnerability detection'], answer: 'B' },
    ],
  },
];

const CollapsibleCard = memo(function CollapsibleCard({ title, img, imgAlt, bullets, questions }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`active-panel${open ? ' active-panel--open' : ''}`}>
      <button className="active-panel-header" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="active-panel-title">{title}</span>
        <span className="active-panel-toggle" aria-hidden="true">{open ? '-' : '+'}</span>
      </button>
      <div className="active-panel-body">
        <div>
          <img className="active-panel-img" src={img} alt={imgAlt} />
          <div className="active-panel-content">
            <ul className="active-card-list">{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <div className="active-mcq-block">
              <p className="active-mcq-heading">Practice Questions</p>
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

function OSINTActive() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}>
          <ShaderGradient animate="off" brightness={1.4} cAzimuthAngle={0} cDistance={7.1} cPolarAngle={140} cameraZoom={17.29} color1="#aeacb7" color2="#152921" color3="#002f00" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={0} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={0} shader="defaults" type="sphere" uAmplitude={1.6} uDensity={1.1} uFrequency={5.5} uSpeed={0.1} uStrength={1} uTime={0} wireframe={false} />
        </ShaderGradientCanvas>
      </Suspense>
      <style>{`
        .active-back-btn { transition: transform 0.2s ease; }
        .active-back-btn:hover { transform: scale(1.05) translateY(-2px); background: rgba(92,242,255,0.25) !important; border-color: #5CF2FF !important; color: #FFFFFF !important; }
        .active-header-title { color: #abcfc9 !important; -webkit-text-fill-color: #abcfc9 !important; background: none !important; font-family: 'Sora', sans-serif !important; }
        .active-header-subtitle { font-family: 'Sora', sans-serif !important; }
        .active-accordion { display: flex; flex-direction: column; gap: 0.85rem; margin-top: 2rem; }
        .active-panel { background: linear-gradient(135deg,#0a0f0f 0%,#0d0d0d 100%); border: 1px solid rgba(1,107,97,0.2); border-radius: 8px; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .active-panel:hover, .active-panel--open { border-color: #02a89a; box-shadow: 0 4px 18px rgba(1,107,97,0.18); }
        .active-panel-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: transparent; border: none; cursor: pointer; text-align: left; gap: 1rem; }
        .active-panel-header:focus-visible { outline: 2px solid #02a89a; outline-offset: -2px; }
        .active-panel-title { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: #02a89a; letter-spacing: 0.01em; line-height: 1.3; }
        .active-panel-toggle { flex-shrink: 0; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid rgba(2,168,154,0.45); color: #02a89a; font-size: 1.2rem; line-height: 1; font-family: 'Sora', sans-serif; font-weight: 300; transition: background 0.2s ease, border-color 0.2s ease; user-select: none; }
        .active-panel--open .active-panel-toggle { background: rgba(2,168,154,0.12); border-color: #02a89a; }
        .active-panel-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; overflow: hidden; }
        .active-panel--open .active-panel-body { grid-template-rows: 1fr; overflow: visible; }
        .active-panel-body > div { overflow: hidden; }
        .active-panel--open .active-panel-body > div { overflow: visible; }
        .active-panel-img { width: 100%; height: auto; max-height: 240px; object-fit: cover; display: block; border-radius: 6px; margin-bottom: 1rem; opacity: 0.68; filter: saturate(0.5) brightness(0.8); transition: opacity 0.25s ease; }
        .active-panel--open .active-panel-img { opacity: 0.82; }
        .active-panel-content { padding: 1rem 1.5rem 1.4rem; }
        .active-card-list { margin: 0; padding-left: 1.15rem; list-style: disc; }
        .active-card-list li { font-family: 'Oxanium', sans-serif; font-size: 0.875rem; color: rgba(224,224,224,0.85); line-height: 1.7; margin-bottom: 0.35rem; }
        .active-card-list li::marker { color: #016B61; }
        .active-mcq-block { margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid rgba(1,107,97,0.25); }
        .active-mcq-heading { font-family: 'Sora', sans-serif; font-size: 0.82rem; font-weight: 700; color: #2dd68f; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
      `}</style>
      <Navbar />
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><OsintIcon size={80} /></div>
          <h1 className="elegant-title active-header-title">Active Information Gathering</h1>
          <p className="elegant-subtitle active-header-subtitle">
            Directly interact with target systems to extract data
            <span className="difficulty medium" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>medium</span>
          </p>
          <div className="header-divider"></div>
        </div>
        <Link to="/osint" className="back-btn active-back-btn" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #00FFC8', color: '#FFFFFF' }}>
          ← Back to OSINT
        </Link>
        <div className="active-accordion">
          {SECTIONS.map((s) => <CollapsibleCard key={s.id} {...s} />)}
        </div>
      </div>
    </div>
  );
}

export default OSINTActive;
