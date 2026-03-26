import { Suspense, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { NetworkSecurityIcon } from '../components/NetworkSecurityIcon';
import QuestionCard from '../components/QuestionCard';

const SECTIONS = [
  {
    id: 'intro-wireshark',
    title: '1. Introduction to Wireshark',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=60',
    imgAlt: 'Wireshark interface',
    bullets: [
      'Wireshark is the world\'s most widely used open-source network protocol analyser � it captures live packets from a network interface and displays them in a human-readable format.',
      'It operates by putting a network interface into promiscuous mode, allowing it to capture all packets on the segment, not just those addressed to the local host.',
      'Wireshark dissects hundreds of protocols automatically � it decodes Ethernet frames, IP headers, TCP segments, and application-layer payloads in a single view.',
      'The interface has three main panes: the packet list (summary of each captured packet), the packet details (protocol tree), and the packet bytes (raw hex/ASCII).',
      'Wireshark is used by network engineers for troubleshooting, by security analysts for incident response, and by penetration testers for traffic interception analysis.',
    ],
    questions: [
      { q: 'What does promiscuous mode allow a network interface to do?', options: ['A. Send packets faster than normal', 'B. Capture all packets on the network segment, not just those addressed to the local host', 'C. Encrypt all captured traffic automatically', 'D. Block malicious packets before they reach the host'], answer: 'B' },
      { q: 'Which Wireshark pane shows the raw hexadecimal and ASCII representation of a packet?', options: ['A. Packet list pane', 'B. Packet details pane', 'C. Packet bytes pane', 'D. Filter toolbar'], answer: 'C' },
      { q: 'In which security scenario is Wireshark most commonly used?', options: ['A. Encrypting network traffic', 'B. Blocking firewall rules', 'C. Capturing and analysing packets for troubleshooting and incident response', 'D. Scanning for open ports'], answer: 'C' },
    ],
  },
  {
    id: 'capturing',
    title: '2. Capturing Network Traffic',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=60',
    imgAlt: 'Packet capture',
    bullets: [
      'Capture filters (BPF syntax) are applied before capture to limit which packets are written to memory � e.g. `host 192.168.1.1` or `port 80`; they reduce resource usage on busy networks.',
      'Display filters are applied after capture to show only relevant packets from an existing capture � e.g. `http`, `tcp.port == 443`, `ip.addr == 10.0.0.1`.',
      'Captures can be saved as `.pcap` or `.pcapng` files for offline analysis, sharing with colleagues, or importing into other tools like Zeek or Suricata.',
      'On switched networks, traffic is not broadcast to all ports � a SPAN/mirror port, network tap, or ARP poisoning is required to capture traffic between other hosts.',
      'Wireshark can capture on multiple interfaces simultaneously and supports remote capture via `rpcapd` or SSH tunnelling for capturing on remote systems.',
    ],
    questions: [
      { q: 'What is the difference between a capture filter and a display filter in Wireshark?', options: ['A. They are the same thing with different names', 'B. Capture filters limit what is recorded before capture; display filters show subsets of an existing capture', 'C. Display filters are applied before capture; capture filters after', 'D. Capture filters only work on wireless interfaces'], answer: 'B' },
      { q: 'Why can\'t Wireshark capture traffic between two other hosts on a switched network by default?', options: ['A. Wireshark does not support switched networks', 'B. Switches forward frames only to the destination port, so other hosts do not receive the traffic', 'C. Switches encrypt traffic between ports', 'D. Wireshark requires root access on switched networks'], answer: 'B' },
      { q: 'Which file format does Wireshark use to save captured packets for offline analysis?', options: ['A. .csv', 'B. .pcap or .pcapng', 'C. .xml', 'D. .json'], answer: 'B' },
    ],
  },
  {
    id: 'protocol-analysis',
    title: '3. Protocol Analysis Techniques',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=60',
    imgAlt: 'Protocol dissection',
    bullets: [
      'Follow TCP Stream (right-click ? Follow ? TCP Stream) reconstructs the full conversation between two hosts, showing the complete request and response in readable form.',
      'Statistics ? Protocol Hierarchy shows a breakdown of all protocols in the capture by percentage, helping identify unexpected or dominant protocols quickly.',
      'Statistics ? Conversations lists all unique host pairs communicating, with byte counts and packet counts � useful for identifying the most active or unusual connections.',
      'The `tcp.flags.syn == 1 && tcp.flags.ack == 0` filter isolates all SYN packets, revealing every new connection attempt in the capture.',
      'Wireshark can reassemble fragmented IP packets and TCP streams automatically, presenting the complete payload even when it was split across multiple packets.',
      'Expert Information (Analyse ? Expert Information) flags anomalies like retransmissions, duplicate ACKs, and RST packets that indicate network problems or attacks.',
    ],
    questions: [
      { q: 'What does "Follow TCP Stream" in Wireshark allow an analyst to do?', options: ['A. Block a TCP connection in real time', 'B. Reconstruct the full conversation between two hosts in readable form', 'C. Export all TCP packets to a CSV file', 'D. Decrypt TLS-encrypted TCP streams automatically'], answer: 'B' },
      { q: 'Which Wireshark display filter isolates all new TCP connection attempts?', options: ['A. tcp.flags.ack == 1', 'B. tcp.flags.fin == 1', 'C. tcp.flags.syn == 1 && tcp.flags.ack == 0', 'D. tcp.port == 80'], answer: 'C' },
      { q: 'What does the Statistics ? Protocol Hierarchy view show?', options: ['A. A list of all IP addresses in the capture', 'B. A breakdown of all protocols in the capture by percentage of traffic', 'C. The geographic location of each host', 'D. A timeline of packet arrival times'], answer: 'B' },
    ],
  },
  {
    id: 'security-analysis',
    title: '4. Security Analysis with Wireshark',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=60',
    imgAlt: 'Security analysis',
    bullets: [
      'Cleartext credential detection: filter `http.authbasic` or follow HTTP streams to find Base64-encoded Basic Auth credentials transmitted without TLS.',
      'ARP poisoning detection: multiple ARP replies mapping different MAC addresses to the same IP, or a single MAC claiming many IPs, indicates ARP spoofing.',
      'Port scan detection: a single source IP sending SYN packets to many different destination ports in rapid succession is a clear port scan signature.',
      'DNS exfiltration detection: unusually long DNS query names, high volumes of TXT record queries, or queries to uncommon domains may indicate DNS tunnelling.',
      'Malware C2 detection: regular beaconing traffic (periodic connections at fixed intervals to the same external IP) is a common command-and-control pattern.',
      'Wireshark can decrypt TLS traffic if the session keys are provided via the (Pre)-Master-Secret log file, enabling analysis of HTTPS sessions in lab environments.',
    ],
    questions: [
      { q: 'Which Wireshark filter helps detect HTTP Basic Authentication credentials transmitted in cleartext?', options: ['A. http.request.method == "POST"', 'B. http.authbasic', 'C. tcp.port == 80', 'D. ip.proto == 6'], answer: 'B' },
      { q: 'What traffic pattern in a Wireshark capture indicates a port scan?', options: ['A. A single host sending large amounts of UDP traffic', 'B. A single source IP sending SYN packets to many different destination ports in rapid succession', 'C. Multiple hosts sending traffic to a single destination port', 'D. High volumes of ICMP echo replies'], answer: 'B' },
      { q: 'What characteristic of malware C2 traffic makes it detectable in Wireshark?', options: ['A. It always uses port 443', 'B. Regular beaconing � periodic connections at fixed intervals to the same external IP', 'C. It generates more traffic than normal applications', 'D. It always uses unencrypted HTTP'], answer: 'B' },
    ],
  },
  {
    id: 'advanced',
    title: '5. Advanced Wireshark Features',
    img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=60',
    imgAlt: 'Advanced features',
    bullets: [
      'Wireshark supports Lua scripting for custom dissectors � analysts can write plugins to decode proprietary or custom protocols not natively supported.',
      'I/O Graphs (Statistics ? I/O Graph) plot packet rates or byte rates over time, making traffic spikes, periodic patterns, and anomalies visually obvious.',
      'GeoIP integration maps source and destination IP addresses to geographic locations, helping identify unexpected international connections.',
      'tshark is the command-line version of Wireshark � it supports the same filters and dissectors but can be scripted and run on headless servers without a GUI.',
      'Wireshark\'s colourisation rules highlight different protocol types and anomalies (retransmissions in red, HTTP in green) for faster visual triage of large captures.',
      'The `editcap` and `mergecap` utilities (bundled with Wireshark) allow splitting large capture files by time or packet count and merging multiple captures into one.',
    ],
    questions: [
      { q: 'What is tshark and when would you use it instead of Wireshark?', options: ['A. A paid version of Wireshark with more features', 'B. The command-line version of Wireshark, used on headless servers or in scripts without a GUI', 'C. A separate tool for decrypting TLS traffic', 'D. A Wireshark plugin for GeoIP lookups'], answer: 'B' },
      { q: 'What does the I/O Graph feature in Wireshark help an analyst identify?', options: ['A. The geographic location of hosts', 'B. Traffic spikes, periodic patterns, and anomalies by plotting packet or byte rates over time', 'C. The protocol hierarchy of the capture', 'D. Duplicate IP addresses on the network'], answer: 'B' },
      { q: 'Which Wireshark utility would you use to combine multiple .pcap files into a single capture file?', options: ['A. tshark', 'B. editcap', 'C. mergecap', 'D. dumpcap'], answer: 'C' },
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

function NetSecWireshark() {
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
          <h1 className="elegant-title netsec-header-title">Packet Analysis with Wireshark</h1>
          <p className="elegant-subtitle netsec-header-subtitle">
            Capture, filter, and dissect live network traffic
            <span className="difficulty medium" style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>medium</span>
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

export default NetSecWireshark;
