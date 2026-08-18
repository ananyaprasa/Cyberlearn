import { useState, memo } from 'react';

const LAYERS = [
  {
    num: 7,
    name: 'Application',
    color: '#e05c8a',
    pdu: 'Data',
    purpose: 'User-facing protocols and services. Where applications interact with the network.',
    protocols: 'HTTP, HTTPS, DNS, FTP, SMTP, IMAP, SSH, TLS (negotiation)',
    device: 'Application gateways, load balancers',
    security: 'WAF (Web Application Firewall), application proxies',
    attack: 'SQL Injection, XSS, phishing, DNS tunnelling',
  },
  {
    num: 6,
    name: 'Presentation',
    color: '#c46baf',
    pdu: 'Data',
    purpose: 'Data translation, encryption, and compression. Ensures data is readable by the application layer.',
    protocols: 'TLS/SSL (encryption), JPEG, MPEG, ASCII, Unicode',
    device: 'None (handled by software/OS)',
    security: 'TLS/SSL inspection, certificate validation',
    attack: 'SSL stripping, downgrade attacks (forcing older TLS versions)',
  },
  {
    num: 5,
    name: 'Session',
    color: '#a07bc0',
    pdu: 'Data',
    purpose: 'Manages sessions (dialogues) between applications — opening, maintaining, and closing connections.',
    protocols: 'NetBIOS, RPC, SMB (session management), NFS',
    device: 'None (handled by OS)',
    security: 'Session hijacking detection',
    attack: 'Session hijacking, session fixation',
  },
  {
    num: 4,
    name: 'Transport',
    color: '#7a8fd0',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    purpose: 'End-to-end communication, port numbers, reliability (TCP) or speed (UDP).',
    protocols: 'TCP, UDP, SCTP',
    device: 'Firewalls (Layer 4), load balancers',
    security: 'Stateful firewalls, SYN cookies, rate limiting',
    attack: 'SYN flood, UDP flood, port scanning',
  },
  {
    num: 3,
    name: 'Network',
    color: '#4aa0c8',
    pdu: 'Packet',
    purpose: 'Logical addressing (IP) and routing packets between different networks.',
    protocols: 'IP (IPv4/IPv6), ICMP, IGMP, routing protocols (OSPF, BGP)',
    device: 'Routers, Layer 3 switches',
    security: 'ACLs, packet filtering firewalls',
    attack: 'IP spoofing, route hijacking (BGP), ICMP floods',
  },
  {
    num: 2,
    name: 'Data Link',
    color: '#2aae8a',
    pdu: 'Frame',
    purpose: 'Node-to-node delivery on the same network segment using MAC addresses.',
    protocols: 'Ethernet (802.3), Wi-Fi (802.11), ARP, PPP, VLANs (802.1Q)',
    device: 'Switches, bridges, NICs',
    security: 'Dynamic ARP Inspection (DAI), port security, 802.1X',
    attack: 'ARP spoofing, MAC flooding, VLAN hopping',
  },
  {
    num: 1,
    name: 'Physical',
    color: '#1ab87a',
    pdu: 'Bit',
    purpose: 'Raw bit transmission over the physical medium — electrical signals, light, or radio waves.',
    protocols: 'Ethernet (physical spec), USB, DSL, 802.11 (radio), fibre optic',
    device: 'Cables, hubs, repeaters, modems, NICs',
    security: 'Physical access controls, tamper detection',
    attack: 'Cable tapping, jamming (Wi-Fi), hardware keyloggers',
  },
];

const OSIModelDiagram = memo(function OSIModelDiagram() {
  const [selected, setSelected] = useState(null);

  const activeLayer = selected !== null ? LAYERS[selected] : null;

  return (
    <div className="osi-wrapper">
      <p className="osi-instruction">Click any layer to explore its purpose, protocols, and security relevance.</p>
      <div className="osi-layout">
        {/* Stack diagram */}
        <div className="osi-stack" role="list">
          {LAYERS.map((layer, idx) => (
            <button
              key={layer.num}
              role="listitem"
              className={`osi-layer${selected === idx ? ' osi-layer--active' : ''}`}
              style={{ '--layer-color': layer.color }}
              onClick={() => setSelected(selected === idx ? null : idx)}
              aria-pressed={selected === idx}
              aria-label={`Layer ${layer.num}: ${layer.name}`}
            >
              <span className="osi-layer-num">{layer.num}</span>
              <span className="osi-layer-name">{layer.name}</span>
              <span className="osi-layer-pdu">{layer.pdu}</span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="osi-detail" aria-live="polite">
          {activeLayer ? (
            <div className="osi-detail-inner">
              <div className="osi-detail-header" style={{ borderColor: activeLayer.color }}>
                <span className="osi-detail-badge" style={{ background: activeLayer.color }}>Layer {activeLayer.num}</span>
                <h3 className="osi-detail-title">{activeLayer.name}</h3>
                <span className="osi-detail-pdu">PDU: {activeLayer.pdu}</span>
              </div>
              <div className="osi-detail-row">
                <span className="osi-detail-label">Purpose</span>
                <span className="osi-detail-value">{activeLayer.purpose}</span>
              </div>
              <div className="osi-detail-row">
                <span className="osi-detail-label">Protocols / Technologies</span>
                <span className="osi-detail-value">{activeLayer.protocols}</span>
              </div>
              <div className="osi-detail-row">
                <span className="osi-detail-label">Typical Device</span>
                <span className="osi-detail-value">{activeLayer.device}</span>
              </div>
              <div className="osi-detail-row osi-detail-row--security">
                <span className="osi-detail-label">Security Controls</span>
                <span className="osi-detail-value">{activeLayer.security}</span>
              </div>
              <div className="osi-detail-row osi-detail-row--attack">
                <span className="osi-detail-label">Example Attacks</span>
                <span className="osi-detail-value">{activeLayer.attack}</span>
              </div>
            </div>
          ) : (
            <div className="osi-detail-placeholder">
              <div className="osi-placeholder-icon">&#x2261;</div>
              <p>Select a layer to see its details</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .osi-wrapper {
          margin: 1rem 0 0.5rem;
        }
        .osi-instruction {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          color: rgba(171,207,201,0.6);
          margin-bottom: 0.75rem;
          text-align: center;
        }
        .osi-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 1rem;
          align-items: start;
        }
        @media (max-width: 640px) {
          .osi-layout { grid-template-columns: 1fr; }
        }
        .osi-stack {
          display: flex;
          flex-direction: column;
          gap: 3px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .osi-layer {
          display: grid;
          grid-template-columns: 28px 1fr auto;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.9rem;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(10,15,15,0.7);
          cursor: pointer;
          text-align: left;
          transition: border-color 0.18s ease, background 0.18s ease, transform 0.15s ease;
          border-left: 3px solid var(--layer-color);
        }
        .osi-layer:hover {
          background: rgba(255,255,255,0.05);
          transform: translateX(2px);
        }
        .osi-layer--active {
          background: rgba(255,255,255,0.08) !important;
          border-color: var(--layer-color) !important;
          border-left-color: var(--layer-color) !important;
          box-shadow: 0 0 0 1px var(--layer-color);
        }
        .osi-layer-num {
          font-family: 'Sora', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--layer-color);
          text-align: center;
        }
        .osi-layer-name {
          font-family: 'Sora', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: rgba(224,224,224,0.92);
        }
        .osi-layer-pdu {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.7rem;
          color: rgba(171,207,201,0.5);
          white-space: nowrap;
        }
        .osi-detail {
          min-height: 260px;
        }
        .osi-detail-inner {
          background: rgba(10,15,15,0.8);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          overflow: hidden;
        }
        .osi-detail-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          border-bottom: 2px solid;
          background: rgba(255,255,255,0.03);
        }
        .osi-detail-badge {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #000;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          white-space: nowrap;
        }
        .osi-detail-title {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #e0e0e0;
          margin: 0;
          flex: 1;
        }
        .osi-detail-pdu {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(171,207,201,0.55);
        }
        .osi-detail-row {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          align-items: start;
        }
        .osi-detail-row:last-child { border-bottom: none; }
        @media (max-width: 500px) {
          .osi-detail-row { grid-template-columns: 1fr; }
        }
        .osi-detail-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(171,207,201,0.6);
          padding-top: 0.1rem;
        }
        .osi-detail-value {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.83rem;
          color: rgba(224,224,224,0.88);
          line-height: 1.55;
        }
        .osi-detail-row--security .osi-detail-label { color: #2dd68f; }
        .osi-detail-row--security .osi-detail-value { color: rgba(45,214,143,0.85); }
        .osi-detail-row--attack .osi-detail-label { color: #ff6b6b; }
        .osi-detail-row--attack .osi-detail-value { color: rgba(255,107,107,0.85); }
        .osi-detail-placeholder {
          height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(10,15,15,0.5);
          border: 1px dashed rgba(2,168,154,0.2);
          border-radius: 8px;
          color: rgba(171,207,201,0.35);
        }
        .osi-placeholder-icon {
          font-size: 2rem;
          line-height: 1;
        }
        .osi-detail-placeholder p {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.82rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
});

export default OSIModelDiagram;
