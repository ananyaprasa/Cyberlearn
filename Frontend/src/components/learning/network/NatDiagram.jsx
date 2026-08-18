import { memo } from 'react';

const NatDiagram = memo(function NatDiagram() {
  return (
    <div className="nat-wrapper">
      {/* Topology row */}
      <div className="nat-topology">
        {/* Internal hosts */}
        <div className="nat-zone nat-zone--internal">
          <div className="nat-zone-label">Internal Network</div>
          <div className="nat-host nat-host--small">PC 192.168.1.10</div>
          <div className="nat-host nat-host--small">Phone 192.168.1.11</div>
          <div className="nat-host nat-host--small">Laptop 192.168.1.12</div>
          <div className="nat-zone-note">Private IPs (RFC 1918)<br />Not routable on internet</div>
        </div>

        {/* Router / NAT */}
        <div className="nat-router-col">
          <div className="nat-arrow-label">Private</div>
          <div className="nat-arrow">&#8594;</div>
          <div className="nat-router">
            <div className="nat-router-box">Router / NAT</div>
            <div className="nat-router-ips">
              <div className="nat-router-ip">LAN: 192.168.1.1</div>
              <div className="nat-router-ip nat-router-ip--public">WAN: 203.0.113.50</div>
            </div>
          </div>
          <div className="nat-arrow">&#8594;</div>
          <div className="nat-arrow-label">Public</div>
        </div>

        {/* Internet */}
        <div className="nat-zone nat-zone--internet">
          <div className="nat-zone-label">Internet</div>
          <div className="nat-host nat-host--server">Web Server<br />93.184.216.34</div>
          <div className="nat-zone-note">Public IPs only<br />Routable globally</div>
        </div>
      </div>

      {/* Translation table */}
      <div className="nat-table-section">
        <div className="nat-table-label">NAT Translation Table (example)</div>
        <div className="nat-table-scroll">
          <table className="nat-table">
            <thead>
              <tr>
                <th>Internal IP:Port</th>
                <th>External IP:Port</th>
                <th>Destination</th>
                <th>Protocol</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>192.168.1.10:52001</td>
                <td>203.0.113.50:52001</td>
                <td>93.184.216.34:443</td>
                <td>TCP</td>
              </tr>
              <tr>
                <td>192.168.1.11:52002</td>
                <td>203.0.113.50:52002</td>
                <td>93.184.216.34:443</td>
                <td>TCP</td>
              </tr>
              <tr>
                <td>192.168.1.12:52003</td>
                <td>203.0.113.50:52003</td>
                <td>8.8.8.8:53</td>
                <td>UDP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key points */}
      <div className="nat-points">
        <div className="nat-point">
          <span className="nat-point-icon">&#9654;</span>
          <span>Multiple private hosts share a <strong>single public IP</strong>. Port numbers distinguish connections (PAT / NAPT).</span>
        </div>
        <div className="nat-point">
          <span className="nat-point-icon">&#9654;</span>
          <span>Private address ranges: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code> (RFC 1918).</span>
        </div>
        <div className="nat-point nat-point--warn">
          <span className="nat-point-icon nat-point-icon--warn">!</span>
          <span>NAT hides internal hosts but is <strong>not a firewall</strong>. It provides no access control, authentication, or inspection. A firewall is still required.</span>
        </div>
      </div>

      <style>{`
        .nat-wrapper { margin: 0.75rem 0; }
        .nat-topology {
          display: flex;
          align-items: stretch;
          gap: 0;
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(2,168,154,0.15);
          border-radius: 8px;
          padding: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.85rem;
          gap: 0.5rem;
        }
        .nat-zone {
          flex: 1;
          min-width: 120px;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          align-items: center;
        }
        .nat-zone-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.2rem;
        }
        .nat-zone--internal .nat-zone-label { color: #4aa0c8; }
        .nat-zone--internet .nat-zone-label { color: #2dd68f; }
        .nat-host {
          font-family: 'Oxanium', monospace;
          font-size: 0.72rem;
          padding: 0.3rem 0.6rem;
          border-radius: 5px;
          text-align: center;
          width: 100%;
          max-width: 150px;
        }
        .nat-host--small {
          background: rgba(74,160,200,0.08);
          border: 1px solid rgba(74,160,200,0.2);
          color: rgba(74,160,200,0.85);
        }
        .nat-host--server {
          background: rgba(45,214,143,0.08);
          border: 1px solid rgba(45,214,143,0.2);
          color: rgba(45,214,143,0.85);
        }
        .nat-zone-note {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.65rem;
          color: rgba(171,207,201,0.4);
          text-align: center;
          line-height: 1.4;
        }
        .nat-router-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          flex-shrink: 0;
          min-width: 110px;
        }
        .nat-arrow {
          font-size: 1.2rem;
          color: rgba(2,168,154,0.5);
          line-height: 1;
        }
        .nat-arrow-label {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.62rem;
          color: rgba(171,207,201,0.4);
        }
        .nat-router { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
        .nat-router-box {
          font-family: 'Sora', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.4rem 0.7rem;
          border-radius: 6px;
          background: rgba(171,207,201,0.1);
          border: 1px solid rgba(171,207,201,0.3);
          color: #abcfc9;
          text-align: center;
        }
        .nat-router-ips { display: flex; flex-direction: column; gap: 0.2rem; }
        .nat-router-ip {
          font-family: 'Oxanium', monospace;
          font-size: 0.66rem;
          color: rgba(74,160,200,0.75);
          text-align: center;
        }
        .nat-router-ip--public { color: rgba(45,214,143,0.75); }
        /* Table */
        .nat-table-section { margin-bottom: 0.85rem; }
        .nat-table-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(171,207,201,0.5);
          margin-bottom: 0.4rem;
        }
        .nat-table-scroll { overflow-x: auto; }
        .nat-table {
          width: 100%;
          min-width: 460px;
          border-collapse: collapse;
          font-family: 'Oxanium', monospace;
          font-size: 0.75rem;
        }
        .nat-table th {
          text-align: left;
          padding: 0.4rem 0.7rem;
          background: rgba(2,168,154,0.08);
          color: rgba(171,207,201,0.7);
          font-family: 'Sora', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(2,168,154,0.2);
        }
        .nat-table td {
          padding: 0.38rem 0.7rem;
          color: rgba(224,224,224,0.8);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .nat-table tr:last-child td { border-bottom: none; }
        /* Key points */
        .nat-points {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .nat-point {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          color: rgba(224,224,224,0.82);
          line-height: 1.5;
        }
        .nat-point--warn { color: rgba(255,200,0,0.85); }
        .nat-point-icon { color: #02a89a; flex-shrink: 0; font-size: 0.75rem; margin-top: 0.1rem; }
        .nat-point-icon--warn { color: #ffc800; }
        .nat-point code {
          background: rgba(2,168,154,0.1);
          border: 1px solid rgba(2,168,154,0.2);
          border-radius: 3px;
          padding: 0 0.3rem;
          font-family: 'Oxanium', monospace;
          font-size: 0.78rem;
          color: #02a89a;
        }
      `}</style>
    </div>
  );
});

export default NatDiagram;
