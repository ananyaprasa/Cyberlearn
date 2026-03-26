import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { NetworkSecurityIcon } from '../components/NetworkSecurityIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'understanding-mitm',
    title: '1. Understanding MITM Attacks',
    img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=700&q=60',
    imgAlt: 'Network interception',
    bullets: [
      'A Man-in-the-Middle (MITM) attack occurs when an attacker secretly intercepts and potentially alters communications between two parties who believe they are communicating directly.',
      'ARP Poisoning (ARP Spoofing) is the most common LAN-based MITM technique � the attacker sends gratuitous ARP replies associating their MAC address with a legitimate IP (e.g. the default gateway), redirecting all traffic through their machine.',
      'SSL Stripping downgrades HTTPS connections to HTTP by intercepting the initial HTTP request before the TLS upgrade, allowing the attacker to read plaintext traffic while the victim sees no obvious warning.',
      'DNS Spoofing poisons a victim\'s DNS cache with forged responses, redirecting domain lookups to attacker-controlled IP addresses � enabling credential harvesting via fake login pages.',
      'MITM attacks on Wi-Fi include Evil Twin attacks (a rogue access point mimicking a legitimate SSID) and KARMA attacks (responding to any probe request with a matching SSID).',
      'Detection methods include ARP cache monitoring (unexpected MAC-to-IP mappings), certificate warnings in browsers, and network anomaly detection via IDS/SIEM.',
      'Prevention: use end-to-end encryption (TLS with HSTS, VPNs), enable Dynamic ARP Inspection (DAI) on managed switches, use DNSSEC, and implement 802.1X port authentication.',
    ],
    questions: [
      { q: 'How does ARP poisoning enable a MITM attack on a local network?', options: ['A. It floods the network with traffic to cause a DoS', 'B. The attacker sends forged ARP replies associating their MAC with a legitimate IP, redirecting traffic through their machine', 'C. It exploits a vulnerability in the TCP handshake', 'D. It intercepts DNS queries before they reach the resolver'], answer: 'B' },
      { q: 'What does SSL stripping do to a victim\'s HTTPS connection?', options: ['A. It decrypts the TLS session using a stolen certificate', 'B. It downgrades the connection to HTTP by intercepting the initial request before the TLS upgrade, exposing plaintext traffic', 'C. It replaces the server\'s TLS certificate with a self-signed one', 'D. It blocks the HTTPS connection entirely'], answer: 'B' },
      { q: 'Which network switch feature prevents ARP poisoning attacks?', options: ['A. Port mirroring (SPAN)', 'B. VLAN segmentation', 'C. Dynamic ARP Inspection (DAI)', 'D. Spanning Tree Protocol (STP)'], answer: 'C' },
    ],
  },
  {
    id: 'arp-poisoning',
    title: '2. ARP Poisoning in Depth',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=60',
    imgAlt: 'ARP poisoning diagram',
    bullets: [
      'ARP (Address Resolution Protocol) maps IP addresses to MAC addresses on a local network segment � it has no authentication mechanism, making it inherently vulnerable to spoofing.',
      'An attacker sends unsolicited (gratuitous) ARP replies to both the victim and the gateway, poisoning both ARP caches so all traffic flows through the attacker\'s machine.',
      'Tools like Ettercap, arpspoof (dsniff suite), and Bettercap automate ARP poisoning and can simultaneously perform SSL stripping and credential harvesting.',
      'IP forwarding must be enabled on the attacker\'s machine (`echo 1 > /proc/sys/net/ipv4/ip_forward`) to relay traffic transparently � without it, the attack causes a DoS rather than interception.',
      'Detection: run `arp -a` to inspect the ARP cache; if two different IPs share the same MAC address, ARP poisoning is likely in progress.',
    ],
    questions: [
      { q: 'Why does ARP have no built-in protection against spoofing?', options: ['A. ARP was designed for internal use only', 'B. ARP has no authentication mechanism � any host can send ARP replies claiming any IP-to-MAC mapping', 'C. ARP is encrypted by default on modern networks', 'D. ARP only works on wireless networks'], answer: 'B' },
      { q: 'Why must an attacker enable IP forwarding during an ARP poisoning MITM attack?', options: ['A. To increase the speed of the attack', 'B. To relay intercepted traffic to the real destination transparently � without it, the attack causes a DoS instead of interception', 'C. To bypass the victim\'s firewall', 'D. To decrypt TLS traffic automatically'], answer: 'B' },
      { q: 'Which command-line check can reveal an active ARP poisoning attack on a local machine?', options: ['A. netstat -an', 'B. arp -a (look for two IPs sharing the same MAC address)', 'C. ipconfig /all', 'D. nslookup <gateway>'], answer: 'B' },
    ],
  },
  {
    id: 'ssl-stripping',
    title: '3. SSL Stripping and HSTS Bypass',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=60',
    imgAlt: 'SSL stripping',
    bullets: [
      'SSL stripping was first demonstrated by Moxie Marlinspike in 2009 � it exploits the fact that most users initially connect to a site via HTTP before being redirected to HTTPS.',
      'The attacker intercepts the HTTP request, establishes an HTTPS connection to the real server on behalf of the victim, and serves the victim an HTTP version of the page.',
      'The victim\'s browser shows HTTP (no padlock) but may not notice � the attacker sees all traffic in plaintext while the server believes it has a secure connection.',
      'HTTP Strict Transport Security (HSTS) is the primary defence � it instructs browsers to always use HTTPS for a domain and refuse HTTP connections, preventing the initial downgrade.',
      'HSTS Preloading submits a domain to browser-maintained lists so HTTPS is enforced even on the very first visit, before any HSTS header has been received.',
      'SSLstrip+ and tools like Bettercap can bypass HSTS for domains not on the preload list by rewriting links to use slightly different domain names (e.g. wwww.example.com).',
    ],
    questions: [
      { q: 'At what point in a user\'s connection does SSL stripping intercept traffic?', options: ['A. After the TLS handshake is complete', 'B. During the initial HTTP request before the redirect to HTTPS', 'C. During the DNS resolution phase', 'D. After the user submits a login form'], answer: 'B' },
      { q: 'What is the primary defence against SSL stripping attacks?', options: ['A. Using a strong TLS certificate', 'B. HTTP Strict Transport Security (HSTS) � instructs browsers to always use HTTPS and refuse HTTP connections', 'C. Enabling two-factor authentication', 'D. Using a VPN'], answer: 'B' },
      { q: 'What additional protection does HSTS Preloading provide over a standard HSTS header?', options: ['A. It encrypts the HSTS header itself', 'B. It enforces HTTPS even on the very first visit before any HSTS header has been received, via browser-maintained preload lists', 'C. It prevents all MITM attacks on the domain', 'D. It automatically renews TLS certificates'], answer: 'B' },
    ],
  },
  {
    id: 'detection-prevention',
    title: '4. Detection and Prevention',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=60',
    imgAlt: 'Detection and prevention',
    bullets: [
      'Network-level detection: IDS/IPS rules can flag gratuitous ARP replies, unexpected MAC-to-IP changes, and SSL certificate mismatches in monitored traffic.',
      'Host-level detection: browser certificate warnings, unexpected HTTP connections to HTTPS-only sites, and ARP cache anomalies (`arp -a`) are indicators of active MITM.',
      'Dynamic ARP Inspection (DAI) on managed switches validates ARP packets against a DHCP snooping binding table, dropping forged ARP replies automatically.',
      '802.1X port-based Network Access Control (NAC) authenticates devices before granting network access, preventing rogue devices from joining the segment.',
      'End-to-end encryption (TLS with certificate pinning, VPNs, SSH) ensures that even if traffic is intercepted, it cannot be read or modified without detection.',
      'User education: train users to notice missing HTTPS padlocks, unexpected certificate warnings, and to avoid connecting to unknown Wi-Fi networks without a VPN.',
    ],
    questions: [
      { q: 'Which managed switch feature automatically drops forged ARP replies by validating them against a DHCP snooping table?', options: ['A. Port mirroring', 'B. Dynamic ARP Inspection (DAI)', 'C. Spanning Tree Protocol', 'D. VLAN trunking'], answer: 'B' },
      { q: 'What does certificate pinning add to TLS that helps detect MITM attacks?', options: ['A. Faster TLS handshakes', 'B. The application only accepts a specific known certificate or public key, rejecting any substitute even if it is CA-signed', 'C. Automatic certificate renewal', 'D. Encryption of the TLS handshake itself'], answer: 'B' },
      { q: 'Which 802.1X feature prevents rogue devices from joining a network segment?', options: ['A. VLAN segmentation', 'B. Port-based Network Access Control (NAC) � authenticates devices before granting network access', 'C. Dynamic ARP Inspection', 'D. DHCP snooping'], answer: 'B' },
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

function NetSecMITM() {
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
        .netsec-back-btn:hover { background: rgba(92,242,255,0.25) !important; border-color: #5CF2FF !important; color: #FFFFFF !important; }
        .netsec-header-title { color: #abcfc9 !important; -webkit-text-fill-color: #abcfc9 !important; background: none !important; font-family: 'Sora', sans-serif !important; }
        .netsec-header-subtitle { font-family: 'Sora', sans-serif !important; }
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
          <div className="header-icon"><NetworkSecurityIcon size={80} /></div>
          <h1 className="elegant-title netsec-header-title">Man-in-the-Middle Attacks</h1>
          <p className="elegant-subtitle netsec-header-subtitle">
            ARP poisoning, SSL stripping, and interception techniques
            <span className="difficulty hard" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>hard</span>
          </p>
          <div className="header-divider"></div>
        </div>
        <Link to="/network-security" className="back-btn netsec-back-btn" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #00FFC8', color: '#FFFFFF' }}>
          ← Back to Network Security
        </Link>
        <div className="osint-accordion">
          {SECTIONS.map((s) => <CollapsibleCard key={s.id} {...s} />)}
        </div>
      </div>
    </div>
  );
}

export default NetSecMITM;
