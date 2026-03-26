import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { NetworkSecurityIcon } from '../components/NetworkSecurityIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'osi',
    title: '1. The OSI Model',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=60',
    imgAlt: 'OSI model layers',
    bullets: [
      'The OSI (Open Systems Interconnection) model is a conceptual framework that standardises network communication into 7 distinct layers, each with a specific role.',
      'Layer 1 (Physical) handles raw bit transmission over cables, fibre, and wireless; Layer 2 (Data Link) manages MAC addressing and frame delivery on the same network segment.',
      'Layer 3 (Network) handles logical IP addressing and routing between networks; Layer 4 (Transport) provides end-to-end communication with TCP (reliable) or UDP (fast, unreliable).',
      'Layers 5�7 (Session, Presentation, Application) manage connection state, data encoding/encryption, and user-facing protocols like HTTP, DNS, and SMTP.',
      'Security controls map to specific OSI layers � firewalls operate at Layers 3�4, WAFs at Layer 7, and switches at Layer 2; understanding this helps place defences correctly.',
      'Attackers also target specific layers � ARP spoofing targets Layer 2, IP spoofing targets Layer 3, and SQL injection targets Layer 7.',
    ],
    questions: [
      { q: 'At which OSI layer does IP addressing and routing between networks occur?', options: ['A. Layer 2 (Data Link)', 'B. Layer 3 (Network)', 'C. Layer 4 (Transport)', 'D. Layer 5 (Session)'], answer: 'B' },
      { q: 'ARP spoofing attacks target which OSI layer?', options: ['A. Layer 1 (Physical)', 'B. Layer 3 (Network)', 'C. Layer 2 (Data Link)', 'D. Layer 7 (Application)'], answer: 'C' },
      { q: 'A Web Application Firewall (WAF) operates at which OSI layer?', options: ['A. Layer 3', 'B. Layer 4', 'C. Layer 5', 'D. Layer 7'], answer: 'D' },
    ],
  },
  {
    id: 'tcpip',
    title: '2. TCP/IP Protocol Suite',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=60',
    imgAlt: 'TCP/IP stack',
    bullets: [
      'The TCP/IP suite is the practical protocol stack that powers the internet, condensing the OSI model into 4 layers: Network Access, Internet, Transport, and Application.',
      'IP (Internet Protocol) provides logical addressing and best-effort packet delivery � it does not guarantee order, reliability, or error correction.',
      'The TCP three-way handshake (SYN ? SYN-ACK ? ACK) establishes a reliable connection; the four-way teardown (FIN ? ACK ? FIN ? ACK) closes it gracefully.',
      'IP addresses identify hosts on a network; subnet masks define which portion of the address identifies the network vs. the host, enabling routing decisions.',
      'IPv4 uses 32-bit addresses (e.g. 192.168.1.1) with a theoretical maximum of ~4.3 billion addresses; IPv6 uses 128-bit addresses to solve address exhaustion.',
      'Security implications: IP headers can be spoofed, TCP sequence numbers can be predicted in weak implementations, and fragmented packets can bypass some inspection systems.',
    ],
    questions: [
      { q: 'What is the correct sequence of the TCP three-way handshake?', options: ['A. SYN ? ACK ? SYN-ACK', 'B. SYN ? SYN-ACK ? ACK', 'C. ACK ? SYN ? SYN-ACK', 'D. SYN-ACK ? SYN ? ACK'], answer: 'B' },
      { q: 'What does IP provide that makes it a "best-effort" protocol?', options: ['A. Guaranteed delivery and ordering of packets', 'B. Logical addressing and routing without guaranteeing delivery, order, or error correction', 'C. Encryption of all transmitted data', 'D. Authentication of the sender'], answer: 'B' },
      { q: 'Why does IPv6 exist as a successor to IPv4?', options: ['A. IPv6 is faster than IPv4', 'B. IPv4\'s 32-bit address space (~4.3 billion addresses) is exhausted; IPv6\'s 128-bit space solves this', 'C. IPv6 is more secure by default', 'D. IPv4 does not support wireless networks'], answer: 'B' },
    ],
  },
  {
    id: 'transport',
    title: '3. Transport Layer Protocols',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=60',
    imgAlt: 'Transport protocols',
    bullets: [
      'TCP (Transmission Control Protocol) provides reliable, ordered, error-checked delivery via connection establishment, acknowledgements, and retransmission of lost packets.',
      'UDP (User Datagram Protocol) is connectionless and provides no delivery guarantees � it is faster and lower-overhead, making it ideal for DNS, VoIP, video streaming, and gaming.',
      'Port numbers (0�65535) identify specific services on a host; well-known ports (0�1023) are assigned to standard services (HTTP: 80, HTTPS: 443, SSH: 22, DNS: 53).',
      'TCP flow control (sliding window) and congestion control prevent a fast sender from overwhelming a slow receiver or a congested network.',
      'From a security perspective, TCP\'s connection state makes it susceptible to SYN flood DoS attacks; UDP\'s stateless nature makes it useful for amplification DDoS attacks.',
      'SCTP (Stream Control Transmission Protocol) is a lesser-known transport protocol combining features of TCP and UDP, used in telephony signalling (SS7).',
    ],
    questions: [
      { q: 'Which transport protocol is most appropriate for a real-time video streaming application where some packet loss is acceptable?', options: ['A. TCP � because it guarantees delivery', 'B. UDP � because it is lower-overhead and faster with no retransmission delays', 'C. ICMP � because it is designed for real-time traffic', 'D. SCTP � because it combines TCP and UDP features'], answer: 'B' },
      { q: 'A SYN flood attack exploits which characteristic of TCP?', options: ['A. TCP\'s use of port numbers', 'B. TCP\'s connection state � the server allocates resources for each half-open SYN without a completing ACK', 'C. TCP\'s sliding window mechanism', 'D. TCP\'s use of sequence numbers'], answer: 'B' },
      { q: 'Which port number is assigned to HTTPS?', options: ['A. 80', 'B. 22', 'C. 443', 'D. 8080'], answer: 'C' },
    ],
  },
  {
    id: 'services',
    title: '4. Common Network Services',
    img: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=700&q=60',
    imgAlt: 'Network services',
    bullets: [
      'DNS (Domain Name System, port 53) resolves human-readable domain names to IP addresses; it is a critical infrastructure service and a frequent attack target (DNS poisoning, DNS tunnelling).',
      'DHCP (Dynamic Host Configuration Protocol, port 67/68) automatically assigns IP addresses, subnet masks, gateways, and DNS servers to hosts joining a network.',
      'HTTP (port 80) and HTTPS (port 443) are the foundation of web communication; HTTPS adds TLS encryption to protect data in transit from eavesdropping and tampering.',
      'SMTP (port 25/587) handles email transmission between servers; POP3 (port 110) and IMAP (port 143/993) handle email retrieval by clients.',
      'SSH (port 22) provides encrypted remote shell access, replacing the insecure Telnet (port 23) which transmits credentials in plaintext.',
      'SMB (port 445) enables Windows file and printer sharing; it has been the vector for major attacks including EternalBlue/WannaCry due to unpatched vulnerabilities.',
    ],
    questions: [
      { q: 'Why is Telnet considered insecure compared to SSH?', options: ['A. Telnet uses a different port', 'B. Telnet transmits all data including credentials in plaintext, making it trivially interceptable', 'C. Telnet does not support remote access', 'D. Telnet requires more bandwidth than SSH'], answer: 'B' },
      { q: 'Which protocol and port is responsible for automatically assigning IP addresses to hosts on a network?', options: ['A. DNS on port 53', 'B. DHCP on port 67/68', 'C. ARP on port 21', 'D. ICMP on port 1'], answer: 'B' },
      { q: 'The EternalBlue exploit and WannaCry ransomware targeted which network service?', options: ['A. HTTP on port 80', 'B. SSH on port 22', 'C. SMB on port 445', 'D. DNS on port 53'], answer: 'C' },
    ],
  },
  {
    id: 'security-fundamentals',
    title: '5. Network Security Fundamentals',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=60',
    imgAlt: 'Network security',
    bullets: [
      'Defence in depth applies multiple overlapping security controls at different network layers � no single control is assumed to be sufficient on its own.',
      'Network segmentation divides a network into isolated zones (VLANs, DMZs) to limit lateral movement � a compromised host in one segment cannot directly reach hosts in another.',
      'The principle of least privilege applied to networks means hosts and services should only be able to communicate with what they strictly need � all other traffic is denied by default.',
      'Encryption in transit (TLS, IPSec, SSH) protects data from eavesdropping and tampering as it crosses untrusted network segments.',
      'Network monitoring and logging (IDS/IPS, NetFlow, SIEM) provide visibility into traffic patterns, enabling detection of anomalies and attacks in progress.',
      'Zero Trust networking assumes no implicit trust based on network location � every connection must be authenticated and authorised regardless of whether it originates inside or outside the perimeter.',
    ],
    questions: [
      { q: 'What is the primary security benefit of network segmentation?', options: ['A. It speeds up network traffic', 'B. It limits lateral movement � a compromised host cannot directly reach hosts in other segments', 'C. It eliminates the need for firewalls', 'D. It encrypts all network traffic automatically'], answer: 'B' },
      { q: 'Which principle states that hosts should only communicate with what they strictly need, with all other traffic denied by default?', options: ['A. Defence in depth', 'B. Zero Trust', 'C. Principle of least privilege applied to network access', 'D. Network segmentation'], answer: 'C' },
      { q: 'What does Zero Trust networking assume about connections originating from inside the corporate network?', options: ['A. They are always trusted because they are internal', 'B. They require no authentication if the user is on VPN', 'C. They must still be authenticated and authorised � no implicit trust based on network location', 'D. They are encrypted by default'], answer: 'C' },
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

function NetSecProtocols() {
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
          <h1 className="elegant-title netsec-header-title">Network Protocols Fundamentals</h1>
          <p className="elegant-subtitle netsec-header-subtitle">
            TCP/IP, DNS, HTTP, ARP � how data flows and where gaps emerge
            <span className="difficulty easy" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>easy</span>
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

export default NetSecProtocols;
