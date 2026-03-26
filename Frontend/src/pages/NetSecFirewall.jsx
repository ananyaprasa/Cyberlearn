import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { NetworkSecurityIcon } from '../components/NetworkSecurityIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'understanding-firewalls',
    title: '1. Understanding Firewalls',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=60',
    imgAlt: 'Firewall architecture',
    bullets: [
      'A firewall is a network security device (hardware or software) that monitors and controls incoming and outgoing network traffic based on a defined set of security rules.',
      'Packet filtering firewalls (stateless) inspect individual packets against ACL rules based on source/destination IP, port, and protocol � they have no memory of previous packets.',
      'Stateful inspection firewalls track the state of active connections and only allow packets that are part of an established, legitimate session � far more secure than stateless filtering.',
      'Next-Generation Firewalls (NGFW) add deep packet inspection (DPI), application awareness, intrusion prevention (IPS), and SSL/TLS inspection to traditional stateful filtering.',
      'Web Application Firewalls (WAF) operate at Layer 7 and specifically protect web applications from SQL injection, XSS, and CSRF by inspecting HTTP/HTTPS traffic.',
      'Firewalls are deployed at network perimeters, between internal segments, and on individual hosts (e.g. iptables on Linux, Windows Defender Firewall).',
    ],
    questions: [
      { q: 'What is the key difference between a stateless and a stateful firewall?', options: ['A. Stateless firewalls are faster but inspect more deeply', 'B. Stateful firewalls track connection state; stateless firewalls inspect each packet independently with no session memory', 'C. Stateless firewalls are only used for web traffic', 'D. Stateful firewalls only work on internal networks'], answer: 'B' },
      { q: 'Which firewall type specifically protects web applications from SQL injection and XSS?', options: ['A. Packet filtering firewall', 'B. Stateful inspection firewall', 'C. Next-Generation Firewall (NGFW)', 'D. Web Application Firewall (WAF)'], answer: 'D' },
      { q: 'What additional capability does an NGFW add over a traditional stateful firewall?', options: ['A. The ability to block all traffic by default', 'B. Deep packet inspection, application awareness, IPS, and SSL/TLS inspection', 'C. Support for IPv6 only', 'D. The ability to route traffic between VLANs'], answer: 'B' },
    ],
  },
  {
    id: 'firewall-evasion',
    title: '2. Firewall Evasion Techniques',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=60',
    imgAlt: 'Evasion techniques',
    bullets: [
      'Source port manipulation: some firewalls allow traffic from trusted source ports (e.g. 53/DNS, 80/HTTP) � Nmap\'s --source-port 53 exploits this to bypass naive ACL rules.',
      'Packet fragmentation splits probe packets into small IP fragments that individually do not match firewall signatures; older stateless firewalls may pass fragments without reassembly.',
      'Protocol tunnelling encapsulates blocked protocols inside allowed ones � DNS tunnelling carries arbitrary data in DNS queries, ICMP tunnelling uses ping packets, HTTP tunnelling wraps traffic in web requests.',
      'Decoy scanning (nmap -D RND:10) floods firewall logs with fake source IPs, making it harder to identify and block the real attacker\'s address.',
      'Slow scanning (-T0/-T1) spaces probes far apart to stay below threshold-based IDS/firewall detection rules that trigger on high packet rates.',
      'IPv6 evasion: many organisations have robust IPv4 rules but neglected IPv6 � dual-stack hosts reachable via IPv6 may bypass IPv4-only firewall controls entirely.',
    ],
    questions: [
      { q: 'How does source port manipulation help bypass some firewall rules?', options: ['A. It encrypts the packet so the firewall cannot inspect it', 'B. Some firewalls allow traffic from trusted source ports (e.g. 53) without deep inspection, letting probes pass through', 'C. It changes the destination port to one the firewall allows', 'D. It fragments the packet to avoid signature matching'], answer: 'B' },
      { q: 'What is DNS tunnelling and why is it an effective evasion technique?', options: ['A. It exploits a vulnerability in DNS servers to gain access', 'B. It encapsulates arbitrary data inside DNS queries/responses, which most firewalls allow as legitimate DNS traffic', 'C. It poisons the DNS cache to redirect traffic', 'D. It uses DNS to discover firewall rules'], answer: 'B' },
      { q: 'Why might an attacker target IPv6 on a dual-stack host to evade firewall controls?', options: ['A. IPv6 traffic is always encrypted', 'B. Many organisations have strong IPv4 rules but neglected equivalent IPv6 rules, leaving dual-stack hosts exposed', 'C. IPv6 bypasses all IDS systems by design', 'D. IPv6 uses different ports than IPv4'], answer: 'B' },
    ],
  },
  {
    id: 'ids-ips',
    title: '3. IDS and IPS Fundamentals',
    img: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=700&q=60',
    imgAlt: 'IDS IPS systems',
    bullets: [
      'An Intrusion Detection System (IDS) monitors network traffic or host activity and generates alerts when suspicious patterns are detected � it does not block traffic.',
      'An Intrusion Prevention System (IPS) is an inline IDS that can actively block or drop malicious traffic in real time, not just alert on it.',
      'Signature-based detection matches traffic against a database of known attack patterns � highly accurate for known threats but blind to novel zero-day attacks.',
      'Anomaly-based detection establishes a baseline of normal behaviour and alerts on deviations � can detect zero-days but generates more false positives.',
      'Network-based IDS/IPS (NIDS/NIPS) monitors traffic at strategic network points; Host-based IDS/IPS (HIDS/HIPS) monitors activity on individual endpoints.',
      'Popular tools: Snort (open-source, signature-based), Suricata (multi-threaded, signatures + anomaly), and Zeek (network analysis framework).',
    ],
    questions: [
      { q: 'What is the fundamental difference between an IDS and an IPS?', options: ['A. IDS is hardware; IPS is software', 'B. IDS only detects and alerts; IPS is inline and can actively block malicious traffic', 'C. IPS only works on web traffic; IDS works on all protocols', 'D. IDS uses signatures; IPS uses anomaly detection exclusively'], answer: 'B' },
      { q: 'Which detection method can identify zero-day attacks with no known signature?', options: ['A. Signature-based detection', 'B. Anomaly-based detection � it flags deviations from established normal behaviour', 'C. Port-based filtering', 'D. Protocol whitelisting'], answer: 'B' },
      { q: 'Which open-source tool is multi-threaded and supports both signature and anomaly-based detection?', options: ['A. Snort', 'B. Zeek', 'C. Suricata', 'D. Wireshark'], answer: 'C' },
    ],
  },
  {
    id: 'ids-evasion',
    title: '4. IDS Evasion Techniques',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=60',
    imgAlt: 'IDS evasion',
    bullets: [
      'Fragmentation attacks split malicious payloads across multiple IP fragments � if the IDS does not reassemble fragments before inspection, it misses the attack signature.',
      'Insertion attacks send packets the IDS accepts but the target host rejects (e.g. invalid TTLs) � the IDS sees a different stream than the target, causing signature mismatch.',
      'Evasion attacks send packets the target accepts but the IDS rejects � the target processes the attack while the IDS sees only benign traffic.',
      'Polymorphic shellcode encodes malicious payloads differently each time, avoiding static signature matches while producing the same execution result on the target.',
      'Protocol-level obfuscation uses non-standard implementations, unusual flag combinations, or out-of-order packets that confuse IDS parsers.',
      'Encryption is the most effective evasion � TLS-encrypted C2 traffic cannot be inspected by signature-based IDS without SSL/TLS interception infrastructure.',
    ],
    questions: [
      { q: 'How do insertion attacks evade IDS detection?', options: ['A. They encrypt the attack payload', 'B. They send packets the IDS accepts but the target rejects, causing the IDS to see a different stream than the target', 'C. They fragment packets into very small pieces', 'D. They use non-standard ports to avoid signature matching'], answer: 'B' },
      { q: 'Why is encryption the most effective IDS evasion technique?', options: ['A. Encrypted traffic travels faster and avoids inspection', 'B. Signature-based IDS cannot inspect encrypted payloads without SSL/TLS interception infrastructure', 'C. Encryption changes the source IP of the traffic', 'D. IDS systems are not configured to handle encrypted protocols'], answer: 'B' },
      { q: 'What is polymorphic shellcode and why does it evade signature-based IDS?', options: ['A. Shellcode that runs on multiple operating systems', 'B. Shellcode that encodes its payload differently each time, avoiding static signature matches while producing the same execution result', 'C. Shellcode that fragments itself across multiple packets', 'D. Shellcode that uses only legitimate system calls'], answer: 'B' },
    ],
  },
];

const FwCollapsibleCard = memo(function FwCollapsibleCard({ title, img, imgAlt, bullets, questions }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`fw-panel${open ? ' fw-panel--open' : ''}`}>
      <button className="fw-panel-header" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="fw-panel-title">{title}</span>
        <span className="fw-panel-toggle" aria-hidden="true">{open ? '-' : '+'}</span>
      </button>
      <div className="fw-panel-body">
        <div>
          <img className="fw-panel-img" src={img} alt={imgAlt} />
          <div className="fw-panel-content">
            <ul className="fw-card-list">{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <div className="fw-mcq-block">
              <p className="fw-mcq-heading">Practice Questions</p>
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

function NetSecFirewall() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.8 }}>
          <ShaderGradient animate="off" brightness={1.4} cAzimuthAngle={0} cDistance={7.1} cPolarAngle={140} cameraZoom={17.29} color1="#aeacb7" color2="#152921" color3="#002f00" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={0} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={0} shader="defaults" type="sphere" uAmplitude={1.6} uDensity={1.1} uFrequency={5.5} uSpeed={0.1} uStrength={1} uTime={0} wireframe={false} />
        </ShaderGradientCanvas>
      </Suspense>
      <style>{`
        .fw-back-btn { transition: transform 0.2s ease; }
        .fw-back-btn:hover { transform: scale(1.05) translateY(-2px); background: rgba(92,242,255,0.25) !important; border-color: #5CF2FF !important; color: #FFFFFF !important; }
        .fw-header-title { color: #abcfc9 !important; -webkit-text-fill-color: #abcfc9 !important; background: none !important; font-family: 'Sora', sans-serif !important; }
        .fw-header-subtitle { font-family: 'Sora', sans-serif !important; }
        .fw-accordion { display: flex; flex-direction: column; gap: 0.85rem; margin-top: 2rem; }
        .fw-panel { background: linear-gradient(135deg,#0a0f0f 0%,#0d0d0d 100%); border: 1px solid rgba(1,107,97,0.2); border-radius: 8px; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .fw-panel:hover, .fw-panel--open { border-color: #02a89a; box-shadow: 0 4px 18px rgba(1,107,97,0.18); }
        .fw-panel-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: transparent; border: none; cursor: pointer; text-align: left; gap: 1rem; }
        .fw-panel-header:focus-visible { outline: 2px solid #02a89a; outline-offset: -2px; }
        .fw-panel-title { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: #02a89a; letter-spacing: 0.01em; line-height: 1.3; }
        .fw-panel-toggle { flex-shrink: 0; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid rgba(2,168,154,0.45); color: #02a89a; font-size: 1.2rem; line-height: 1; font-family: 'Sora', sans-serif; font-weight: 300; transition: background 0.2s ease, border-color 0.2s ease; user-select: none; }
        .fw-panel--open .fw-panel-toggle { background: rgba(2,168,154,0.12); border-color: #02a89a; }
        .fw-panel-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; overflow: hidden; }
        .fw-panel--open .fw-panel-body { grid-template-rows: 1fr; overflow: visible; }
        .fw-panel-body > div { overflow: hidden; }
        .fw-panel--open .fw-panel-body > div { overflow: visible; }
        .fw-panel-img { width: 100%; height: auto; max-height: 240px; object-fit: cover; display: block; border-radius: 6px; margin-bottom: 1rem; opacity: 0.68; filter: saturate(0.5) brightness(0.8); transition: opacity 0.25s ease; }
        .fw-panel--open .fw-panel-img { opacity: 0.82; }
        .fw-panel-content { padding: 1rem 1.5rem 1.4rem; }
        .fw-card-list { margin: 0; padding-left: 1.15rem; list-style: disc; }
        .fw-card-list li { font-family: 'Oxanium', sans-serif; font-size: 0.875rem; color: rgba(224,224,224,0.85); line-height: 1.7; margin-bottom: 0.35rem; }
        .fw-card-list li::marker { color: #016B61; }
        .fw-mcq-block { margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid rgba(1,107,97,0.25); }
        .fw-mcq-heading { font-family: 'Sora', sans-serif; font-size: 0.82rem; font-weight: 700; color: #2dd68f; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
      `}</style>
      <Navbar />
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        <div className="page-header elegant-header">
          <div className="header-icon"><NetworkSecurityIcon size={80} /></div>
          <h1 className="elegant-title fw-header-title">Firewall &amp; IDS Evasion</h1>
          <p className="elegant-subtitle fw-header-subtitle">
            Firewall architectures, evasion techniques, and intrusion detection systems
            <span className="difficulty hard" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>hard</span>
          </p>
          <div className="header-divider"></div>
        </div>
        <Link to="/network-security" className="back-btn fw-back-btn" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #00FFC8', color: '#FFFFFF' }}>
          ← Back to Network Security
        </Link>
        <div className="fw-accordion">
          {SECTIONS.map((s) => <FwCollapsibleCard key={s.id} {...s} />)}
        </div>
      </div>
    </div>
  );
}

export default NetSecFirewall;
