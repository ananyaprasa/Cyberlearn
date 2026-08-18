import { memo } from 'react';

const MAPPING = [
  {
    tcpip: 'Application',
    tcpipColor: '#e05c8a',
    osi: ['Layer 7 — Application', 'Layer 6 — Presentation', 'Layer 5 — Session'],
    osiColors: ['#e05c8a', '#c46baf', '#a07bc0'],
    protocols: 'HTTP, HTTPS, DNS, FTP, SMTP, SSH, TLS',
  },
  {
    tcpip: 'Transport',
    tcpipColor: '#7a8fd0',
    osi: ['Layer 4 — Transport'],
    osiColors: ['#7a8fd0'],
    protocols: 'TCP, UDP, SCTP',
  },
  {
    tcpip: 'Internet',
    tcpipColor: '#4aa0c8',
    osi: ['Layer 3 — Network'],
    osiColors: ['#4aa0c8'],
    protocols: 'IP (v4/v6), ICMP, ARP*',
  },
  {
    tcpip: 'Network Access',
    tcpipColor: '#1ab87a',
    osi: ['Layer 2 — Data Link', 'Layer 1 — Physical'],
    osiColors: ['#2aae8a', '#1ab87a'],
    protocols: 'Ethernet, Wi-Fi, PPP',
  },
];

const TcpIpMappingDiagram = memo(function TcpIpMappingDiagram() {
  return (
    <div className="tcpip-wrapper">
      <div className="tcpip-columns">
        {/* OSI column */}
        <div className="tcpip-col">
          <div className="tcpip-col-header">OSI Model (7 layers)</div>
          <div className="tcpip-osi-stack">
            {MAPPING.map((row) =>
              row.osi.map((name, i) => (
                <div
                  key={name}
                  className="tcpip-osi-layer"
                  style={{ borderLeftColor: row.osiColors[i], color: row.osiColors[i] }}
                >
                  {name}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Connector lines (CSS only) */}
        <div className="tcpip-connector" aria-hidden="true">
          {MAPPING.map((row) => (
            <div
              key={row.tcpip}
              className="tcpip-connector-row"
              style={{
                flex: row.osi.length,
                borderTopColor: row.tcpipColor,
              }}
            >
              <div
                className="tcpip-connector-line"
                style={{ background: row.tcpipColor }}
              />
            </div>
          ))}
        </div>

        {/* TCP/IP column */}
        <div className="tcpip-col">
          <div className="tcpip-col-header">TCP/IP Model (4 layers)</div>
          <div className="tcpip-tcpip-stack">
            {MAPPING.map((row) => (
              <div
                key={row.tcpip}
                className="tcpip-tcpip-layer"
                style={{
                  flex: row.osi.length,
                  borderLeftColor: row.tcpipColor,
                  '--tc': row.tcpipColor,
                }}
              >
                <span className="tcpip-layer-name" style={{ color: row.tcpipColor }}>
                  {row.tcpip}
                </span>
                <span className="tcpip-layer-protocols">{row.protocols}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="tcpip-note">
        * ARP technically operates between L2 and L3; it is often placed at the Internet layer in the TCP/IP model.
      </p>

      <style>{`
        .tcpip-wrapper {
          margin: 0.5rem 0;
          overflow-x: auto;
        }
        .tcpip-columns {
          display: grid;
          grid-template-columns: 1fr 36px 1fr;
          gap: 0;
          min-width: 420px;
        }
        .tcpip-col-header {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(171,207,201,0.55);
          text-align: center;
          padding-bottom: 0.5rem;
        }
        .tcpip-osi-stack {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .tcpip-osi-layer {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          padding: 0.45rem 0.7rem;
          border-radius: 5px;
          border-left: 3px solid;
          background: rgba(10,15,15,0.7);
          line-height: 1.3;
        }
        .tcpip-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 1.55rem;
        }
        .tcpip-connector-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tcpip-connector-line {
          width: 2px;
          height: 100%;
          min-height: 28px;
          border-radius: 1px;
          opacity: 0.5;
        }
        .tcpip-tcpip-stack {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .tcpip-tcpip-layer {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.45rem 0.7rem;
          border-radius: 5px;
          border-left: 3px solid;
          background: rgba(10,15,15,0.7);
          justify-content: center;
        }
        .tcpip-layer-name {
          font-family: 'Sora', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
        }
        .tcpip-layer-protocols {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(171,207,201,0.55);
          line-height: 1.3;
        }
        .tcpip-note {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(171,207,201,0.4);
          margin-top: 0.6rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
});

export default TcpIpMappingDiagram;
