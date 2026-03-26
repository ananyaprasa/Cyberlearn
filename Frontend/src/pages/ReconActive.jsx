import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { ReconIcon } from '../components/ReconIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'vs-passive',
    title: '1. Active vs Passive Reconnaissance',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=60',
    imgAlt: 'Active vs passive',
    bullets: [
      'Passive reconnaissance collects data from public sources without touching the target; active reconnaissance sends packets directly to target systems.',
      'Active methods leave a detectable footprint � IDS/IPS, firewalls, and SIEM platforms log incoming probes and may trigger automated alerts or blocks.',
      'Active reconnaissance provides ground truth: it confirms which hosts are live, which ports are open, and which services are actually running � passive data can be stale.',
      'The transition from passive to active should be deliberate and scoped � only probe systems explicitly listed in the rules of engagement.',
      'Active reconnaissance is typically performed after passive gathering has established a baseline, allowing probes to be focused on the most relevant targets.',
    ],
    questions: [
      { q: 'What is the key operational difference between active and passive reconnaissance?', options: ['A. Active uses free tools; passive requires paid tools', 'B. Active sends packets to the target and leaves a detectable footprint; passive does not', 'C. Passive is always illegal; active is always legal', 'D. Active only works on web applications'], answer: 'B' },
      { q: 'Why is active reconnaissance considered to provide "ground truth"?', options: ['A. It uses government-verified data sources', 'B. It directly confirms live hosts, open ports, and running services rather than relying on potentially stale public data', 'C. It is performed by certified professionals only', 'D. It automatically patches vulnerabilities it finds'], answer: 'B' },
      { q: 'When should the transition from passive to active reconnaissance occur?', options: ['A. Immediately, before any passive gathering', 'B. Only after the final report is submitted', 'C. After passive gathering has established a baseline and scope has been confirmed', 'D. Simultaneously with report writing'], answer: 'C' },
    ],
  },
  {
    id: 'ping-sweep',
    title: '2. Ping Sweeps and Host Discovery',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=60',
    imgAlt: 'Host discovery',
    bullets: [
      'A ping sweep sends ICMP Echo Request packets to a range of IP addresses to identify which hosts are live and responding.',
      '`nmap -sn 192.168.1.0/24` performs a host discovery sweep without port scanning � fast and relatively low-noise.',
      'Many modern networks block ICMP; Nmap compensates by also sending TCP SYN to port 443 and TCP ACK to port 80 during host discovery.',
      'ARP requests are used for host discovery on local subnets � ARP cannot be blocked at the network layer, making it highly reliable for LAN discovery.',
      'Masscan can sweep large IP ranges at millions of packets per second, making it suitable for discovering live hosts across wide scopes quickly.',
    ],
    questions: [
      { q: 'Why does Nmap send TCP probes during host discovery even when ICMP is used?', options: ['A. TCP probes are faster than ICMP', 'B. Many networks block ICMP, so TCP probes serve as a fallback to detect live hosts', 'C. TCP probes are required by the Nmap licence', 'D. ICMP only works on Windows hosts'], answer: 'B' },
      { q: 'Why is ARP-based host discovery highly reliable on local subnets?', options: ['A. ARP uses encryption that bypasses firewalls', 'B. ARP operates at Layer 2 and cannot be blocked at the network layer', 'C. ARP is faster than all other protocols', 'D. ARP requires no special permissions'], answer: 'B' },
      { q: 'Which tool is best suited for rapidly discovering live hosts across a very large IP range?', options: ['A. Nmap with -T1', 'B. Wireshark', 'C. Masscan', 'D. theHarvester'], answer: 'C' },
    ],
  },
  {
    id: 'port-scanning',
    title: '3. Port Scanning Techniques',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=60',
    imgAlt: 'Port scanning',
    bullets: [
      'Port scanning probes TCP and UDP ports to determine their state: open (service listening), closed (no service, host reachable), or filtered (firewall blocking).',
      'SYN scanning (-sS) is the most common technique � it sends a SYN and interprets the response without completing the handshake, reducing log entries on the target.',
      'Full TCP connect scanning (-sT) completes the handshake and is more reliably detected but works without raw socket privileges.',
      'UDP scanning (-sU) is essential for discovering services like DNS (53), SNMP (161), and TFTP (69) that run over UDP rather than TCP.',
      'Scanning all 65,535 ports (`-p-`) is thorough but slow; a common approach is to first scan the top 1,000 ports, then follow up with a full scan on interesting hosts.',
    ],
    questions: [
      { q: 'What does a "filtered" port state indicate in an Nmap scan result?', options: ['A. The port is open and accepting connections', 'B. The port is closed and the service is offline', 'C. A firewall or packet filter is blocking probe packets to that port', 'D. The host is powered off'], answer: 'C' },
      { q: 'Which scan type is essential for discovering DNS and SNMP services?', options: ['A. SYN scan (-sS)', 'B. UDP scan (-sU)', 'C. ACK scan (-sA)', 'D. NULL scan (-sN)'], answer: 'B' },
      { q: 'What is the trade-off of scanning all 65,535 ports versus the default top-1000 ports?', options: ['A. Full scans are always faster', 'B. Full scans are more thorough but significantly slower; top-1000 is faster but may miss services on non-standard ports', 'C. Top-1000 scans are more accurate', 'D. Full scans require a paid Nmap licence'], answer: 'B' },
    ],
  },
  {
    id: 'banner-grabbing',
    title: '4. Banner Grabbing',
    img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=60',
    imgAlt: 'Banner grabbing',
    bullets: [
      'Banner grabbing connects to an open port and reads the service banner � the initial response a service sends when a client connects.',
      'Banners typically reveal the application name, version number, and sometimes the operating system, providing direct input for CVE lookups.',
      'Netcat (`nc <target> <port>`) is the simplest tool for manual banner grabbing � connect and read whatever the service sends.',
      'Nmap\'s `-sV` flag automates banner grabbing and service fingerprinting across all discovered open ports.',
      'Some services require sending a specific request before returning a banner � HTTP servers respond to `HEAD / HTTP/1.0` with headers including the Server field.',
      'Banners can be modified by administrators to return misleading information � always cross-reference with other fingerprinting techniques.',
    ],
    questions: [
      { q: 'A banner grab on port 22 returns "SSH-2.0-OpenSSH_7.4". What is the most useful piece of information this provides?', options: ['A. The server\'s physical location', 'B. The exact SSH software and version, which can be checked against known CVEs', 'C. The number of active SSH sessions', 'D. The server\'s private key'], answer: 'B' },
      { q: 'Which Nmap flag automates banner grabbing and service fingerprinting?', options: ['A. -sS', 'B. -sV', 'C. -sn', 'D. -A'], answer: 'B' },
      { q: 'Why should banner information always be cross-referenced with other fingerprinting techniques?', options: ['A. Banners are always encrypted', 'B. Administrators can modify banners to return misleading version information', 'C. Banners only work on Linux servers', 'D. Banner grabbing requires root privileges'], answer: 'B' },
    ],
  },
  {
    id: 'dns-enum',
    title: '5. DNS Enumeration',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=60',
    imgAlt: 'DNS enumeration',
    bullets: [
      'DNS enumeration actively queries DNS servers to discover all records associated with a target domain � A, MX, NS, TXT, CNAME, and SOA records.',
      'Zone transfer attempts (`dig axfr @<nameserver> <domain>`) request a full copy of the DNS zone; misconfigured servers may return all hostnames and IPs.',
      'Reverse DNS lookups (`dig -x <IP>`) map IP addresses back to hostnames, revealing internal naming conventions and related infrastructure.',
      'Tools like `dnsenum`, `dnsrecon`, and `fierce` automate comprehensive DNS enumeration including zone transfers, brute forcing, and reverse lookups.',
      'DNS cache snooping queries a resolver for cached records to infer which domains a target organisation has recently visited.',
    ],
    questions: [
      { q: 'What is a DNS zone transfer and why is it a security risk if misconfigured?', options: ['A. A method to speed up DNS resolution', 'B. A request for a full copy of a DNS zone that exposes all hostnames and IPs if the server is misconfigured', 'C. A technique to poison the DNS cache', 'D. A way to block DNS queries from external sources'], answer: 'B' },
      { q: 'Which command attempts a DNS zone transfer against a target nameserver?', options: ['A. nmap -sU -p 53 <target>', 'B. dig axfr @<nameserver> <domain>', 'C. whois <domain>', 'D. nc <target> 53'], answer: 'B' },
      { q: 'What does a reverse DNS lookup reveal?', options: ['A. The domain\'s SSL certificate', 'B. The hostname associated with an IP address, revealing naming conventions and related infrastructure', 'C. The domain\'s MX records', 'D. The domain\'s registration date'], answer: 'B' },
    ],
  },
  {
    id: 'subdomain',
    title: '6. Subdomain Brute Forcing',
    img: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=700&q=60',
    imgAlt: 'Subdomain discovery',
    bullets: [
      'Subdomain brute forcing sends DNS queries for a large wordlist of potential subdomain names to discover hosts not listed in public records.',
      'Tools like `gobuster dns`, `ffuf`, and `amass` automate subdomain brute forcing using curated wordlists of common subdomain names.',
      'Discovered subdomains often reveal staging environments, admin panels, API endpoints, and internal tools inadvertently exposed to the internet.',
      'Combining brute forcing with certificate transparency log enumeration (crt.sh) and DNS enumeration maximises subdomain coverage.',
      'Wildcard DNS records (`*.example.com`) can produce false positives � tools must detect and filter wildcard responses to avoid reporting non-existent subdomains.',
    ],
    questions: [
      { q: 'Why are discovered subdomains particularly valuable during reconnaissance?', options: ['A. They always contain login pages', 'B. They often reveal staging environments, admin panels, and internal tools inadvertently exposed to the internet', 'C. They are easier to exploit than main domains', 'D. They bypass all firewall rules'], answer: 'B' },
      { q: 'What problem do wildcard DNS records cause during subdomain brute forcing?', options: ['A. They block all DNS queries', 'B. They produce false positives by resolving any queried subdomain, making non-existent subdomains appear valid', 'C. They encrypt subdomain responses', 'D. They require special tools to query'], answer: 'B' },
      { q: 'Which combination of techniques provides the most comprehensive subdomain coverage?', options: ['A. Only brute forcing with a wordlist', 'B. Brute forcing combined with certificate transparency log enumeration and DNS enumeration', 'C. Only querying crt.sh', 'D. Running Nmap against the main domain'], answer: 'B' },
    ],
  },
  {
    id: 'detection',
    title: '7. Detection and Evasion',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=60',
    imgAlt: 'Detection evasion',
    bullets: [
      'Active reconnaissance is detectable � IDS/IPS systems, firewalls, and SIEM platforms log and alert on port scans, especially aggressive or fast ones.',
      'Slowing scan speed (-T1 or -T2) and randomising target order (`--randomize-hosts`) reduces the scan\'s signature and makes it harder to correlate in logs.',
      'Decoy scanning (`-D RND:10`) inserts fake source IPs into scan traffic, making it harder for defenders to identify the real attacker IP.',
      'Fragmented packets (`-f`) split probe packets into smaller fragments that may bypass older or misconfigured packet inspection systems.',
      'Source port manipulation (`--source-port 53`) spoofs the source port to appear as DNS traffic, which some firewalls allow through by default.',
      'Despite evasion techniques, determined defenders with modern SIEM tools can still correlate fragmented or slow scans � evasion reduces risk, it does not eliminate it.',
    ],
    questions: [
      { q: 'What does the Nmap `-D RND:10` flag do?', options: ['A. Scans 10 random ports', 'B. Inserts 10 random decoy IP addresses into scan traffic to obscure the real source', 'C. Delays each probe by 10 seconds', 'D. Limits the scan to 10 hosts'], answer: 'B' },
      { q: 'Why might spoofing source port 53 help evade some firewalls?', options: ['A. Port 53 is always open on target systems', 'B. Some firewalls allow traffic from port 53 (DNS) through by default without deep inspection', 'C. Port 53 bypasses IDS systems entirely', 'D. DNS traffic is encrypted and cannot be logged'], answer: 'B' },
      { q: 'Does using evasion techniques guarantee that active reconnaissance will go undetected?', options: ['A. Yes, decoy scanning makes detection impossible', 'B. No � evasion reduces detection risk but modern SIEM tools can still correlate slow or fragmented scans', 'C. Yes, if -T0 timing is used', 'D. Yes, as long as the scan is run at night'], answer: 'B' },
    ],
  },
  {
    id: 'legal',
    title: '8. Legal and Ethical Considerations',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=60',
    imgAlt: 'Legal ethics',
    bullets: [
      'Active reconnaissance without written authorisation is illegal in most jurisdictions under computer misuse and unauthorised access laws � intent is not a defence.',
      'A signed rules of engagement (RoE) document must define the exact scope, permitted techniques, time windows, and escalation procedures before any active scanning begins.',
      'Scanning outside the agreed scope � even accidentally via tool misconfiguration � can have serious legal consequences and must be reported immediately.',
      'Service disruption caused by aggressive scanning (accidental DoS) is a real risk and must be addressed in the RoE with agreed-upon scan rate limits.',
      'All findings must be handled confidentially � data about target vulnerabilities must be stored securely and shared only with authorised stakeholders.',
    ],
    questions: [
      { q: 'What document must be signed before any active reconnaissance begins in a professional engagement?', options: ['A. Non-disclosure agreement (NDA)', 'B. Rules of engagement (RoE)', 'C. Penetration test report', 'D. Statement of work (SoW)'], answer: 'B' },
      { q: 'An analyst accidentally scans an IP outside the agreed scope due to a tool misconfiguration. What should they do?', options: ['A. Ignore it since it was accidental', 'B. Delete the scan logs', 'C. Report it immediately to the client and document the incident', 'D. Continue scanning and mention it in the final report'], answer: 'C' },
      { q: 'Why is "intent" not a legal defence for unauthorised active scanning?', options: ['A. Courts only consider the outcome, not the intent', 'B. Computer misuse laws criminalise unauthorised access regardless of the scanner\'s purpose or intent', 'C. Intent is always considered in cybersecurity cases', 'D. Only government agencies can claim intent as a defence'], answer: 'B' },
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

function ReconActive() {
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
          <h1 className="elegant-title recon-header-title">Active Reconnaissance</h1>
          <p className="elegant-subtitle recon-header-subtitle">
            Probe target systems and map live infrastructure
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

export default ReconActive;
