import { useState, memo } from 'react';

const COMPONENTS = {
  internet: {
    label: 'Internet',
    color: '#ff6b6b',
    title: 'The Internet',
    desc: 'The untrusted external network. All traffic from the internet must pass through the perimeter firewall before reaching any internal resource. Assume hostile.',
  },
  perimeter: {
    label: 'Perimeter\nFirewall',
    color: '#ffc800',
    title: 'Perimeter Firewall',
    desc: 'The first line of defence. Filters traffic between the internet and internal zones based on rules (ACLs). A stateful firewall tracks connection state. An NGFW adds deep packet inspection and application awareness.',
  },
  dmz: {
    label: 'DMZ',
    color: '#e05c8a',
    title: 'DMZ (Demilitarised Zone)',
    desc: 'An isolated network segment for internet-facing services (web servers, mail gateways, DNS). If a DMZ host is compromised, the attacker cannot reach the internal network — a second firewall or VLAN boundary blocks lateral movement.',
  },
  webserver: {
    label: 'Web\nServer',
    color: '#c46baf',
    title: 'Web Server (in DMZ)',
    desc: 'Sits in the DMZ to serve external users. Protected from the internal network by segmentation. A WAF may sit in front of it to filter HTTP/HTTPS at Layer 7.',
  },
  internal: {
    label: 'Internal\nFirewall',
    color: '#7a8fd0',
    title: 'Internal Firewall / Segmentation',
    desc: 'Separates the DMZ from the internal network. Even if the perimeter firewall is bypassed or a DMZ host is compromised, this boundary controls what the attacker can reach next. Implements micro-segmentation principles.',
  },
  users: {
    label: 'User\nSegment',
    color: '#4aa0c8',
    title: 'User Segment',
    desc: 'The network segment for employee workstations. Separated from servers by VLAN or firewall rules. Least privilege: users can reach only the services they need. 802.1X enforces device authentication before granting network access.',
  },
  servers: {
    label: 'Server\nSegment',
    color: '#2aae8a',
    title: 'Server Segment',
    desc: 'Internal servers (Active Directory, databases, file servers). Isolated from user workstations to limit lateral movement after a workstation compromise. Zero Trust: servers authenticate and authorise every connection regardless of source.',
  },
  ids: {
    label: 'IDS/IPS\nSIEM',
    color: '#a07bc0',
    title: 'IDS / IPS / SIEM',
    desc: 'Intrusion Detection System (IDS) monitors traffic and alerts on suspicious patterns. IPS is inline and can block. SIEM aggregates logs from all devices for correlation and anomaly detection. Together they provide visibility across all zones.',
  },
};

const NetworkSecurityTopology = memo(function NetworkSecurityTopology() {
  const [selected, setSelected] = useState(null);

  const sel = selected ? COMPONENTS[selected] : null;

  const Box = ({ id, style = {} }) => {
    const c = COMPONENTS[id];
    return (
      <button
        className={`nst-box${selected === id ? ' nst-box--active' : ''}`}
        style={{ '--bc': c.color, ...style }}
        onClick={() => setSelected(selected === id ? null : id)}
        aria-label={c.label.replace('\n', ' ')}
        aria-pressed={selected === id}
      >
        {c.label.split('\n').map((l, i) => (
          <span key={i} className="nst-box-line">{l}</span>
        ))}
      </button>
    );
  };

  return (
    <div className="nst-wrapper">
      <p className="nst-hint">Click any component to learn what it does.</p>

      {/* Topology */}
      <div className="nst-topology">
        {/* Internet */}
        <div className="nst-row nst-row--center">
          <Box id="internet" />
        </div>
        <div className="nst-connector" aria-hidden="true"><div className="nst-vline" /></div>

        {/* Perimeter */}
        <div className="nst-row nst-row--center">
          <Box id="perimeter" />
        </div>
        <div className="nst-connector" aria-hidden="true">
          <div className="nst-hline" />
        </div>

        {/* DMZ and IDS side by side */}
        <div className="nst-row nst-row--split">
          <div className="nst-branch">
            <Box id="dmz" />
            <div className="nst-connector"><div className="nst-vline nst-vline--short" /></div>
            <Box id="webserver" />
          </div>
          <Box id="ids" />
        </div>
        <div className="nst-connector" aria-hidden="true"><div className="nst-vline" /></div>

        {/* Internal firewall */}
        <div className="nst-row nst-row--center">
          <Box id="internal" />
        </div>
        <div className="nst-connector" aria-hidden="true">
          <div className="nst-hline" />
        </div>

        {/* Users and Servers */}
        <div className="nst-row nst-row--split">
          <Box id="users" />
          <Box id="servers" />
        </div>
      </div>

      {/* Detail panel */}
      <div className="nst-detail" aria-live="polite">
        {sel ? (
          <div className="nst-detail-inner" style={{ borderLeftColor: sel.color }}>
            <div className="nst-detail-title" style={{ color: sel.color }}>{sel.title}</div>
            <div className="nst-detail-desc">{sel.desc}</div>
          </div>
        ) : (
          <div className="nst-detail-placeholder">Select a component above to see its role.</div>
        )}
      </div>

      <style>{`
        .nst-wrapper { margin: 0.75rem 0; }
        .nst-hint {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          color: rgba(171,207,201,0.5);
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .nst-topology {
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(2,168,154,0.15);
          border-radius: 8px;
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          margin-bottom: 0.85rem;
        }
        .nst-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nst-row--split {
          justify-content: space-around;
          gap: 0.5rem;
        }
        .nst-box {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          border: 1px solid var(--bc);
          background: color-mix(in srgb, var(--bc) 12%, transparent);
          color: var(--bc);
          cursor: pointer;
          transition: all 0.18s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
          min-width: 80px;
          text-align: center;
        }
        .nst-box:hover {
          background: color-mix(in srgb, var(--bc) 22%, transparent);
          box-shadow: 0 0 0 1px var(--bc);
        }
        .nst-box--active {
          background: color-mix(in srgb, var(--bc) 25%, transparent) !important;
          box-shadow: 0 0 0 2px var(--bc);
        }
        .nst-box-line { line-height: 1.3; }
        .nst-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 20px;
          width: 100%;
        }
        .nst-vline {
          width: 2px;
          height: 100%;
          background: rgba(255,255,255,0.1);
        }
        .nst-vline--short { height: 14px; }
        .nst-hline {
          width: 60%;
          height: 2px;
          background: rgba(255,255,255,0.08);
        }
        .nst-branch {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .nst-detail-inner {
          background: rgba(10,15,15,0.7);
          border: 1px solid rgba(255,255,255,0.07);
          border-left-width: 3px;
          border-radius: 0 7px 7px 0;
          padding: 0.75rem 1rem;
        }
        .nst-detail-title {
          font-family: 'Sora', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }
        .nst-detail-desc {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.82rem;
          color: rgba(224,224,224,0.85);
          line-height: 1.6;
        }
        .nst-detail-placeholder {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          color: rgba(171,207,201,0.35);
          text-align: center;
          padding: 0.75rem;
          border: 1px dashed rgba(2,168,154,0.18);
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
});

export default NetworkSecurityTopology;
