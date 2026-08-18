import { useState, memo } from 'react';

const NORMAL_STEPS = [
  { from: 'client', msg: 'SYN', state: 'Client sends SYN, server allocates a half-open connection entry.' },
  { from: 'server', msg: 'SYN-ACK', state: 'Server replies SYN-ACK, waiting for ACK to complete.' },
  { from: 'client', msg: 'ACK', state: 'Client sends ACK. Connection is established. Entry removed from queue.' },
];

const SynFloodDiagram = memo(function SynFloodDiagram() {
  const [view, setView] = useState('normal');

  // Queue visualisation for attack view
  const queueSlots = 8;
  const filledSlots = 7; // simulates near-full queue

  return (
    <div className="sfd-wrapper">
      <div className="sfd-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={view === 'normal'}
          className={`sfd-tab${view === 'normal' ? ' sfd-tab--active' : ''}`}
          onClick={() => setView('normal')}
        >
          Normal TCP
        </button>
        <button
          role="tab"
          aria-selected={view === 'attack'}
          className={`sfd-tab${view === 'attack' ? ' sfd-tab--active sfd-tab--attack' : ''}`}
          onClick={() => setView('attack')}
        >
          SYN Flood Attack
        </button>
      </div>

      {view === 'normal' ? (
        <div className="sfd-normal">
          <div className="sfd-cols">
            <div className="sfd-party">
              <div className="sfd-box sfd-box--client">Client</div>
              <div className="sfd-vline" />
            </div>
            <div className="sfd-msgs">
              {NORMAL_STEPS.map((s, i) => (
                <div key={i} className={`sfd-msg-row sfd-msg-row--${s.from}`}>
                  <div className={`sfd-msg-arrow sfd-msg-arrow--${s.from}`}>
                    <span className="sfd-msg-label">{s.msg}</span>
                    <div className={`sfd-msg-line sfd-msg-line--${s.from}`}>
                      <div className="sfd-msg-head" />
                    </div>
                  </div>
                  <div className="sfd-msg-state">{s.state}</div>
                </div>
              ))}
              <div className="sfd-established">Connection Established &#10003;</div>
            </div>
            <div className="sfd-party">
              <div className="sfd-box sfd-box--server">Server</div>
              <div className="sfd-vline" />
            </div>
          </div>
        </div>
      ) : (
        <div className="sfd-attack">
          <div className="sfd-attack-top">
            <div className="sfd-attack-side">
              <div className="sfd-box sfd-box--attacker">Attacker<br /><span className="sfd-spoofed">(spoofed IPs)</span></div>
            </div>
            <div className="sfd-attack-arrows">
              {[1, 2, 3].map((n) => (
                <div key={n} className="sfd-attack-syn-row">
                  <span className="sfd-attack-syn-label">SYN (forged src)</span>
                  <div className="sfd-attack-syn-line">
                    <div className="sfd-attack-syn-head" />
                  </div>
                  <span className="sfd-attack-synack-label">SYN-ACK (no reply &#8594; timeout)</span>
                </div>
              ))}
              <div className="sfd-attack-ellipsis">&#8942; (thousands per second)</div>
            </div>
            <div className="sfd-attack-side">
              <div className="sfd-box sfd-box--server">Server</div>
            </div>
          </div>

          <div className="sfd-queue-section">
            <div className="sfd-queue-label">Server half-open connection queue</div>
            <div className="sfd-queue">
              {Array.from({ length: queueSlots }).map((_, i) => (
                <div
                  key={i}
                  className={`sfd-queue-slot${i < filledSlots ? ' sfd-queue-slot--full' : ' sfd-queue-slot--last'}`}
                >
                  {i < filledSlots ? 'SYN_RCVD' : '?'}
                </div>
              ))}
            </div>
            <div className="sfd-queue-caption">
              Queue is nearly full. Legitimate connections are refused or delayed.
            </div>
          </div>

          <div className="sfd-attack-explain">
            <div className="sfd-explain-row">
              <span className="sfd-explain-icon">&#9654;</span>
              <span>Each SYN causes the server to allocate memory and send a SYN-ACK, expecting an ACK that never arrives.</span>
            </div>
            <div className="sfd-explain-row">
              <span className="sfd-explain-icon">&#9654;</span>
              <span>The spoofed source IPs ensure the real hosts never send the completing ACK.</span>
            </div>
            <div className="sfd-explain-row">
              <span className="sfd-explain-icon">&#9654;</span>
              <span><strong>Mitigation:</strong> SYN cookies, rate limiting, firewall SYN thresholds — the server avoids committing full resources until the handshake completes.</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sfd-wrapper { margin: 0.75rem 0; }
        .sfd-tabs {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 0.85rem;
          flex-wrap: wrap;
        }
        .sfd-tab {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          padding: 0.35rem 0.9rem;
          border-radius: 5px;
          border: 1px solid rgba(2,168,154,0.3);
          background: rgba(10,15,15,0.5);
          color: rgba(224,224,224,0.6);
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .sfd-tab:hover { border-color: #02a89a; color: #e0e0e0; }
        .sfd-tab--active {
          background: rgba(2,168,154,0.12);
          border-color: #02a89a;
          color: #02a89a;
          font-weight: 700;
        }
        .sfd-tab--attack.sfd-tab--active {
          background: rgba(255,80,80,0.1);
          border-color: #ff5050;
          color: #ff6b6b;
        }

        /* Normal view */
        .sfd-normal {
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(2,168,154,0.15);
          border-radius: 8px;
          padding: 1rem;
        }
        .sfd-cols {
          display: grid;
          grid-template-columns: 80px 1fr 80px;
          gap: 0;
          align-items: start;
        }
        .sfd-party {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .sfd-box {
          font-family: 'Sora', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.5rem;
          border-radius: 5px;
          text-align: center;
          white-space: nowrap;
        }
        .sfd-box--client {
          background: rgba(74,160,200,0.12);
          border: 1px solid rgba(74,160,200,0.35);
          color: #4aa0c8;
        }
        .sfd-box--server {
          background: rgba(45,214,143,0.08);
          border: 1px solid rgba(45,214,143,0.3);
          color: #2dd68f;
        }
        .sfd-box--attacker {
          background: rgba(255,80,80,0.1);
          border: 1px solid rgba(255,80,80,0.35);
          color: #ff6b6b;
          font-size: 0.75rem;
          text-align: center;
        }
        .sfd-spoofed {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.65rem;
          font-weight: 400;
          color: rgba(255,107,107,0.65);
        }
        .sfd-vline {
          width: 2px;
          height: 100px;
          background: rgba(255,255,255,0.08);
        }
        .sfd-msgs {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding-top: 0.4rem;
        }
        .sfd-msg-row { display: flex; flex-direction: column; gap: 0.2rem; }
        .sfd-msg-arrow {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.1rem;
        }
        .sfd-msg-row--server .sfd-msg-arrow { align-items: flex-end; }
        .sfd-msg-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #02a89a;
        }
        .sfd-msg-line {
          width: 100%;
          height: 2px;
          background: #02a89a;
          position: relative;
        }
        .sfd-msg-line--client .sfd-msg-head {
          position: absolute;
          right: 0;
          top: -5px;
          width: 0;
          height: 0;
          border-left: 7px solid #02a89a;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }
        .sfd-msg-line--server .sfd-msg-head {
          position: absolute;
          left: 0;
          top: -5px;
          width: 0;
          height: 0;
          border-right: 7px solid #02a89a;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }
        .sfd-msg-state {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(171,207,201,0.5);
          line-height: 1.3;
        }
        .sfd-established {
          margin-top: 0.4rem;
          font-family: 'Sora', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          color: #2dd68f;
          text-align: center;
        }

        /* Attack view */
        .sfd-attack {
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(255,80,80,0.2);
          border-radius: 8px;
          padding: 1rem;
        }
        .sfd-attack-top {
          display: grid;
          grid-template-columns: 90px 1fr 90px;
          gap: 0.5rem;
          align-items: start;
          margin-bottom: 1rem;
        }
        .sfd-attack-side { display: flex; align-items: flex-start; justify-content: center; }
        .sfd-attack-arrows { display: flex; flex-direction: column; gap: 0.5rem; }
        .sfd-attack-syn-row {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .sfd-attack-syn-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          color: #ff6b6b;
        }
        .sfd-attack-synack-label {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.66rem;
          color: rgba(255,107,107,0.55);
        }
        .sfd-attack-syn-line {
          width: 100%;
          height: 2px;
          background: rgba(255,80,80,0.5);
          position: relative;
        }
        .sfd-attack-syn-head {
          position: absolute;
          right: 0;
          top: -4px;
          width: 0;
          height: 0;
          border-left: 7px solid rgba(255,80,80,0.5);
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
        .sfd-attack-ellipsis {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,107,107,0.5);
          text-align: center;
        }
        .sfd-queue-section { margin-bottom: 0.85rem; }
        .sfd-queue-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(171,207,201,0.5);
          margin-bottom: 0.4rem;
        }
        .sfd-queue {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .sfd-queue-slot {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.62rem;
          padding: 0.3rem 0.5rem;
          border-radius: 4px;
          border: 1px solid;
        }
        .sfd-queue-slot--full {
          background: rgba(255,80,80,0.12);
          border-color: rgba(255,80,80,0.35);
          color: #ff6b6b;
        }
        .sfd-queue-slot--last {
          background: rgba(255,200,0,0.08);
          border-color: rgba(255,200,0,0.3);
          color: #ffc800;
        }
        .sfd-queue-caption {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,107,107,0.6);
          margin-top: 0.35rem;
        }
        .sfd-attack-explain {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .sfd-explain-row {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.81rem;
          color: rgba(224,224,224,0.8);
          line-height: 1.5;
        }
        .sfd-explain-icon {
          color: rgba(255,107,107,0.6);
          flex-shrink: 0;
          margin-top: 0.05rem;
        }
      `}</style>
    </div>
  );
});

export default SynFloodDiagram;
