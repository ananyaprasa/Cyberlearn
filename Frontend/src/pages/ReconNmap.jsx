import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { ReconIcon } from '../components/ReconIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'scan-types',
    title: '1. Nmap Scan Types',
    img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=700&q=60',
    imgAlt: 'Network scanning',
    bullets: [
      'SYN Scan (-sS) � the default and most popular scan; sends a SYN packet and waits for SYN-ACK without completing the handshake, making it faster and less likely to be logged.',
      'TCP Connect Scan (-sT) � completes the full three-way handshake; used when SYN scan requires root privileges or is blocked; more detectable.',
      'UDP Scan (-sU) � probes UDP ports; slower than TCP scans because UDP has no handshake and closed ports respond with ICMP unreachable messages.',
      'NULL, FIN, and Xmas Scans (-sN, -sF, -sX) � send packets with unusual flag combinations to bypass some stateless firewalls; unreliable against Windows hosts.',
      'ACK Scan (-sA) � used to map firewall rules rather than find open ports; determines whether ports are filtered or unfiltered by a stateful firewall.',
      'Version Detection (-sV) � after identifying open ports, probes services to determine the application name and version running on each port.',
    ],
    questions: [
      { q: 'Why is the SYN scan (-sS) considered stealthier than a TCP Connect scan (-sT)?', options: ['A. It uses UDP instead of TCP', 'B. It never completes the three-way handshake, so the connection is less likely to be logged', 'C. It runs faster and uses less bandwidth', 'D. It requires no network access'], answer: 'B' },
      { q: 'Which Nmap scan type is specifically used to map firewall rules rather than discover open ports?', options: ['A. SYN scan (-sS)', 'B. UDP scan (-sU)', 'C. ACK scan (-sA)', 'D. Version scan (-sV)'], answer: 'C' },
      { q: 'Why are NULL, FIN, and Xmas scans unreliable against Windows hosts?', options: ['A. Windows blocks all Nmap traffic', 'B. Windows does not respond to these unusual flag combinations as RFC 793 specifies', 'C. These scans require a Windows-specific licence', 'D. Windows only supports UDP scanning'], answer: 'B' },
    ],
  },
  {
    id: 'commands',
    title: '2. Essential Nmap Commands',
    img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=60',
    imgAlt: 'Terminal commands',
    bullets: [
      '`nmap -sV -p- <target>` � scans all 65,535 TCP ports with version detection; thorough but slow.',
      '`nmap -sC -sV <target>` � runs default NSE scripts alongside version detection; a good starting point for most engagements.',
      '`nmap -A <target>` � aggressive scan combining OS detection, version detection, script scanning, and traceroute in one command.',
      '`nmap -sn <subnet>` � ping sweep to discover live hosts in a subnet without port scanning; fast and low-noise.',
      '`nmap -oA output <target>` � saves results in all three formats (normal, XML, grepable) simultaneously for later analysis.',
      '`nmap --script vuln <target>` � runs vulnerability detection scripts from the NSE library against discovered services.',
    ],
    questions: [
      { q: 'What does the `-p-` flag tell Nmap to do?', options: ['A. Scan only privileged ports (1�1024)', 'B. Scan all 65,535 TCP ports', 'C. Skip port scanning entirely', 'D. Scan UDP ports only'], answer: 'B' },
      { q: 'Which Nmap flag saves output in all three formats simultaneously?', options: ['A. -oN', 'B. -oX', 'C. -oA', 'D. -oG'], answer: 'C' },
      { q: 'What does `nmap -sn 192.168.1.0/24` do?', options: ['A. Scans all ports on 192.168.1.0', 'B. Performs a ping sweep to discover live hosts in the subnet without port scanning', 'C. Runs NSE scripts against the subnet', 'D. Performs a UDP scan of the subnet'], answer: 'B' },
    ],
  },
  {
    id: 'timing',
    title: '3. Nmap Timing and Performance',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=60',
    imgAlt: 'Performance tuning',
    bullets: [
      'Nmap provides six timing templates (-T0 through -T5) that control scan speed, parallelism, and timeout values.',
      '-T0 (Paranoid) and -T1 (Sneaky) are extremely slow, designed to evade IDS by spacing probes far apart � useful for stealth but impractical for large scopes.',
      '-T3 (Normal) is the default; -T4 (Aggressive) is commonly used in lab environments and CTFs where speed matters more than stealth.',
      '-T5 (Insane) is the fastest but may miss open ports on slow or congested networks due to very short timeouts.',
      '`--min-rate` and `--max-rate` flags provide fine-grained control over packets per second, useful when a specific throughput is required.',
      'On large engagements, combining `-T4 --min-parallelism 100` significantly reduces scan time without sacrificing accuracy on stable networks.',
    ],
    questions: [
      { q: 'Which timing template is most appropriate for evading IDS detection during a stealth engagement?', options: ['A. -T4', 'B. -T5', 'C. -T0 or -T1', 'D. -T3'], answer: 'C' },
      { q: 'What is the risk of using -T5 (Insane) on a slow or congested network?', options: ['A. It will crash the target server', 'B. Open ports may be missed due to very short timeouts', 'C. It requires root privileges', 'D. It only works on Windows targets'], answer: 'B' },
      { q: 'Which flag provides fine-grained control over the number of packets Nmap sends per second?', options: ['A. -T4', 'B. --min-parallelism', 'C. --max-rate', 'D. -sV'], answer: 'C' },
    ],
  },
  {
    id: 'nse',
    title: '4. Nmap Scripting Engine (NSE)',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=60',
    imgAlt: 'Scripting engine',
    bullets: [
      'The Nmap Scripting Engine (NSE) extends Nmap with Lua scripts that automate tasks ranging from service enumeration to vulnerability detection.',
      'Scripts are organised into categories: auth, broadcast, brute, default, discovery, dos, exploit, external, fuzzer, intrusive, malware, safe, version, and vuln.',
      '`--script default` (or `-sC`) runs all scripts in the "default" category � generally safe and informative for most targets.',
      '`--script vuln` runs vulnerability detection scripts; these are more intrusive and should only be used with explicit authorisation.',
      'Custom scripts can be written in Lua and placed in the NSE scripts directory, making NSE highly extensible for specialised engagements.',
      'Example: `nmap --script http-title,http-headers -p 80,443 <target>` retrieves page titles and HTTP headers from web servers.',
    ],
    questions: [
      { q: 'What language are Nmap NSE scripts written in?', options: ['A. Python', 'B. JavaScript', 'C. Lua', 'D. Bash'], answer: 'C' },
      { q: 'Which NSE script category should only be used with explicit written authorisation due to its intrusive nature?', options: ['A. safe', 'B. default', 'C. discovery', 'D. vuln'], answer: 'D' },
      { q: 'What does `-sC` do in an Nmap command?', options: ['A. Enables SYN scan mode', 'B. Runs all scripts in the "default" NSE category', 'C. Enables version detection', 'D. Saves output in CSV format'], answer: 'B' },
    ],
  },
  {
    id: 'output',
    title: '5. Output and Reporting',
    img: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=700&q=60',
    imgAlt: 'Reporting',
    bullets: [
      'Nmap supports four output formats: Normal (-oN), XML (-oX), Grepable (-oG), and Script Kiddie (-oS); XML is most useful for automated parsing and integration with other tools.',
      'Always save raw Nmap output with `-oA <basename>` at the start of a scan � losing output because a terminal was closed is a common and avoidable mistake.',
      'XML output can be imported into tools like Metasploit, Faraday, and Dradis for centralised vulnerability management and reporting.',
      'Grepable output (-oG) is useful for quick command-line filtering: `grep "open" output.gnmap` instantly lists all hosts with open ports.',
      'A good Nmap report section should include: scan command used, date/time, target scope, open ports per host, service versions, and any NSE findings.',
    ],
    questions: [
      { q: 'Which Nmap output format is most useful for automated parsing and integration with other security tools?', options: ['A. Normal (-oN)', 'B. Grepable (-oG)', 'C. XML (-oX)', 'D. Script Kiddie (-oS)'], answer: 'C' },
      { q: 'What is the advantage of using `-oA <basename>` instead of a single output flag?', options: ['A. It compresses the output file', 'B. It saves results in all three main formats simultaneously', 'C. It automatically emails the report', 'D. It runs the scan faster'], answer: 'B' },
      { q: 'How would you quickly list all hosts with open ports from a grepable Nmap output file?', options: ['A. nmap --list-open output.gnmap', 'B. grep "open" output.gnmap', 'C. cat output.gnmap | sort', 'D. nmap -oN output.gnmap --filter open'], answer: 'B' },
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

function ReconNmap() {
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
          <h1 className="elegant-title recon-header-title">Port Scanning with Nmap</h1>
          <p className="elegant-subtitle recon-header-subtitle">
            Master the industry-standard network scanner
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

export default ReconNmap;
