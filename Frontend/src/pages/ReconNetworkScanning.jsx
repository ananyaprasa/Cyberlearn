import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { ReconIcon } from '../components/ReconIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'what-is',
    title: '1. What is Network Scanning?',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=60',
    imgAlt: 'Network overview',
    bullets: [
      'Network scanning is the process of probing a network to discover live hosts, open ports, running services, and operating systems.',
      'It is a core phase of both offensive security (penetration testing) and defensive security (network auditing and asset inventory).',
      'Scanning generates traffic that is detectable � IDS/IPS systems and firewalls log and may alert on scanning activity.',
      'The results of network scanning form the foundation for all subsequent phases of a security engagement.',
      'Scanning must always be performed within an agreed scope and with written authorisation � unauthorised scanning is illegal in most jurisdictions.',
    ],
    questions: [
      { q: 'What is the primary purpose of network scanning in a security engagement?', options: ['A. To exploit vulnerabilities immediately', 'B. To discover live hosts, open ports, services, and OS information as a foundation for further testing', 'C. To install monitoring agents on target systems', 'D. To generate compliance reports automatically'], answer: 'B' },
      { q: 'Why is network scanning detectable by the target?', options: ['A. Scanning tools always announce themselves', 'B. Scanning generates network traffic that IDS/IPS and firewall systems log and can alert on', 'C. Scanning requires authentication on the target', 'D. Scanning only works on local networks'], answer: 'B' },
      { q: 'What legal requirement must be met before performing network scanning in a professional engagement?', options: ['A. A verbal agreement with the target', 'B. Written authorisation defining the agreed scope', 'C. A government-issued scanning licence', 'D. Notification of the target 24 hours in advance'], answer: 'B' },
    ],
  },
  {
    id: 'tcp-ip',
    title: '2. TCP/IP Fundamentals for Scanning',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=60',
    imgAlt: 'TCP/IP stack',
    bullets: [
      'The TCP three-way handshake (SYN ? SYN-ACK ? ACK) establishes a connection; scanning exploits this process to determine port states.',
      'A SYN-ACK response to a SYN probe indicates an open port; a RST-ACK indicates a closed port; no response (or ICMP unreachable) indicates a filtered port.',
      'UDP has no handshake � a closed UDP port returns an ICMP Port Unreachable message; open UDP ports typically return no response, making UDP scanning slower and less reliable.',
      'TTL (Time to Live) values in IP headers decrease by 1 at each hop; initial TTL values differ by OS (Windows: 128, Linux: 64) and can be used for OS fingerprinting.',
      'Understanding these fundamentals helps interpret scan results accurately and choose the right scan type for each situation.',
    ],
    questions: [
      { q: 'What response indicates a port is open during a TCP SYN scan?', options: ['A. RST-ACK', 'B. No response', 'C. SYN-ACK', 'D. ICMP Port Unreachable'], answer: 'C' },
      { q: 'Why is UDP scanning slower and less reliable than TCP scanning?', options: ['A. UDP uses encryption that slows down probes', 'B. Open UDP ports typically return no response, making it hard to distinguish open from filtered ports', 'C. UDP scanning requires root privileges', 'D. UDP ports are always filtered by firewalls'], answer: 'B' },
      { q: 'A host responds to a ping with a TTL of 64. What OS does this suggest?', options: ['A. Windows (default TTL 128)', 'B. Linux/Unix (default TTL 64)', 'C. macOS (default TTL 255)', 'D. Cisco IOS (default TTL 255)'], answer: 'B' },
    ],
  },
  {
    id: 'host-discovery',
    title: '3. Host Discovery Methods',
    img: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=700&q=60',
    imgAlt: 'Host discovery',
    bullets: [
      'ICMP Echo Request (ping) is the simplest host discovery method � a reply confirms the host is live, but many hosts and firewalls block ICMP.',
      'TCP SYN to port 443 and TCP ACK to port 80 are Nmap\'s fallback host discovery probes when ICMP is blocked.',
      'ARP requests are the most reliable method on local subnets � ARP operates at Layer 2 and cannot be blocked by IP-layer firewalls.',
      '`nmap -sn <subnet>` performs host discovery without port scanning, quickly identifying live hosts before committing to a full scan.',
      'Combining multiple discovery methods (ICMP + TCP + ARP) maximises host coverage on networks with mixed firewall configurations.',
    ],
    questions: [
      { q: 'Why is ARP the most reliable host discovery method on local subnets?', options: ['A. ARP is faster than ICMP', 'B. ARP operates at Layer 2 and cannot be blocked by IP-layer firewalls', 'C. ARP is encrypted and cannot be intercepted', 'D. ARP requires no special permissions'], answer: 'B' },
      { q: 'What does `nmap -sn 10.0.0.0/24` do?', options: ['A. Scans all ports on the 10.0.0.0/24 subnet', 'B. Performs host discovery on the subnet without port scanning', 'C. Runs NSE scripts against all hosts in the subnet', 'D. Performs a UDP scan of the subnet'], answer: 'B' },
      { q: 'Why does Nmap use TCP probes as fallback during host discovery?', options: ['A. TCP probes are always faster than ICMP', 'B. Many networks block ICMP, so TCP probes detect hosts that would otherwise appear offline', 'C. TCP probes are required by the Nmap licence', 'D. ICMP only works on Windows hosts'], answer: 'B' },
    ],
  },
  {
    id: 'port-states',
    title: '4. Understanding Port States',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=60',
    imgAlt: 'Port states',
    bullets: [
      'Open � a service is actively listening on the port and accepting connections; this is the primary target of service enumeration.',
      'Closed � the port is accessible (the host responds) but no service is listening; useful for OS fingerprinting as the host is confirmed reachable.',
      'Filtered � a firewall, filter, or network obstacle is blocking probes; Nmap cannot determine if the port is open or closed.',
      'Unfiltered � the port is accessible but Nmap cannot determine if it is open or closed; only returned by ACK scans.',
      'Open|Filtered � Nmap cannot distinguish between open and filtered; common with UDP scans and certain firewall configurations.',
    ],
    questions: [
      { q: 'What does a "filtered" port state indicate in an Nmap scan?', options: ['A. A service is listening on the port', 'B. No service is listening but the host is reachable', 'C. A firewall is blocking probes and Nmap cannot determine the port state', 'D. The host is offline'], answer: 'C' },
      { q: 'Which port state is most useful for OS fingerprinting even though no service is listening?', options: ['A. Open', 'B. Filtered', 'C. Closed', 'D. Open|Filtered'], answer: 'C' },
      { q: 'Which scan type returns the "unfiltered" port state?', options: ['A. SYN scan (-sS)', 'B. ACK scan (-sA)', 'C. UDP scan (-sU)', 'D. Version scan (-sV)'], answer: 'B' },
    ],
  },
  {
    id: 'tools',
    title: '5. Core Scanning Tools',
    img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=60',
    imgAlt: 'Scanning tools',
    bullets: [
      'Nmap � the industry standard; supports host discovery, port scanning, version detection, OS fingerprinting, and scripted checks via NSE.',
      'Masscan � extremely fast TCP port scanner capable of scanning the entire internet in under 6 minutes; useful for large-scope engagements.',
      'Netcat (nc) � a lightweight utility for manual port connectivity checks and banner grabbing; the "Swiss army knife" of networking.',
      'Angry IP Scanner � a GUI-based tool for quick host discovery and port scanning; useful for non-technical stakeholders.',
      'Zmap � a single-packet network scanner designed for internet-wide surveys; similar to Masscan in speed and use case.',
    ],
    questions: [
      { q: 'Which tool is best suited for rapidly scanning a very large IP range at millions of packets per second?', options: ['A. Nmap with -T4', 'B. Netcat', 'C. Masscan', 'D. Angry IP Scanner'], answer: 'C' },
      { q: 'What makes Nmap the preferred tool for most penetration testing engagements over faster alternatives like Masscan?', options: ['A. Nmap is always faster than Masscan', 'B. Nmap provides version detection, OS fingerprinting, and NSE scripting in addition to port scanning', 'C. Masscan requires a paid licence', 'D. Nmap works on more operating systems'], answer: 'B' },
      { q: 'Which tool is described as the "Swiss army knife" of networking for manual connectivity checks?', options: ['A. Nmap', 'B. Masscan', 'C. Netcat (nc)', 'D. Zmap'], answer: 'C' },
    ],
  },
  {
    id: 'interpreting',
    title: '6. Interpreting Scan Results',
    img: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=700&q=60',
    imgAlt: 'Interpreting results',
    bullets: [
      'Focus first on open ports with identified services � these are the primary attack surface and should be prioritised for further enumeration.',
      'Unexpected open ports (e.g., a database port exposed on an internet-facing host) are high-priority findings regardless of the service version.',
      'Filtered ports indicate a firewall is present � note them but do not assume the service is absent; it may be accessible from other network segments.',
      'Cross-reference scan results with passive reconnaissance findings � a subdomain discovered passively should have a corresponding IP and open ports in the scan.',
      'Always save raw scan output and document the exact command, timestamp, and target scope for reproducibility and legal defensibility.',
    ],
    questions: [
      { q: 'Why is an unexpected open database port on an internet-facing host a high-priority finding?', options: ['A. Database ports are always vulnerable', 'B. It indicates a potential misconfiguration that could allow direct unauthenticated access to sensitive data', 'C. Database ports are easy to exploit', 'D. It means the firewall is not working'], answer: 'B' },
      { q: 'What should an analyst do when passive reconnaissance reveals a subdomain that does not appear in scan results?', options: ['A. Ignore it � passive data is unreliable', 'B. Cross-reference with DNS records and consider that the host may be filtered or on a different network segment', 'C. Report it as a confirmed vulnerability', 'D. Re-run the passive reconnaissance'], answer: 'B' },
      { q: 'Why must scan results include the exact command, timestamp, and target scope?', options: ['A. To make the report longer', 'B. To ensure findings are reproducible and legally defensible', 'C. Nmap requires this for licensing', 'D. To automatically generate remediation steps'], answer: 'B' },
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

function ReconNetworkScanning() {
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
          <h1 className="elegant-title recon-header-title">Network Scanning Fundamentals</h1>
          <p className="elegant-subtitle recon-header-subtitle">
            Discover hosts, map networks, and interpret scan results
            <span className="difficulty easy" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>easy</span>
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

export default ReconNetworkScanning;
