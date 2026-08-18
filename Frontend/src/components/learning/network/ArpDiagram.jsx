import { useState, memo } from 'react';

const NORMAL_STEPS = [
  {
    label: 'ARP Request',
    from: 'host-a',
    msg: 'Who has 192.168.1.1? Tell 192.168.1.10',
    type: 'broadcast',
    explain: 'Host A wants to reach 192.168.1.1 (the router) but only knows the IP. It broadcasts an ARP request to the entire local segment (FF:FF:FF:FF:FF:FF). Every host on the segment receives this frame.',
  },
  {
    label: 'ARP Reply',
    from: 'router',
    msg: '192.168.1.1 is at AA:BB:CC:DD:EE:FF',
    type: 'unicast',
    explain: 'The router recognises its own IP and replies directly (unicast) to Host A, providing its MAC address. Host A stores this mapping in its ARP cache for future use — avoiding a broadcast for every packet.',
  },
  {
    label: 'ARP Cache',
    from: 'cache',
    msg: '192.168.1.1 ↔ AA:BB:CC:DD:EE:FF (cached)',
    type: 'cache',
    explain: 'Host A now has the mapping and encapsulates subsequent packets to 192.168.1.1 directly in Ethernet frames addressed to AA:BB:CC:DD:EE:FF. The cache entry typically expires after 20 seconds to 1 minute.',
  },
];

const ArpDiagram = memo(function ArpDiagram() {
  const [view, setView] = useState('normal');
  const [step, setStep] = useState(0);

  return (
    <div className="arp-wrapper">
      <div className="arp-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={view === 'normal'}
          className={`arp-tab${view === 'normal' ? ' arp-tab--active' : ''}`}
          onClick={() => { setView('normal'); setStep(0); }}
        >
          Normal ARP
        </button>
        <button
          role="tab"
          aria-selected={view === 'spoof'}
          className={`arp-tab${view === 'spoof' ? ' arp-tab--active arp-tab--attack' : ''}`}
          onClick={() => setView('spoof')}
        >
          ARP Spoofing
        </button>
      </div>

      {view === 'normal' ? (
        <div className="arp-normal">
          {/* Hosts row */}
          <div className="arp-hosts">
            <div className="arp-host arp-host--a">
              <div className="arp-host-box">Host A<br /><span className="arp-ip">192.168.1.10</span></div>
            </div>
            <div className="arp-segment-label">LAN Segment</div>
            <div className="arp-host arp-host--router">
              <div className="arp-host-box arp-host-box--router">Router<br /><span className="arp-ip">192.168.1.1</span></div>
            </div>
          </div>

          {/* Step display */}
          <div className="arp-step-display">
            {NORMAL_STEPS[step] && (
              <>
                <div className={`arp-msg-box arp-msg-box--${NORMAL_STEPS[step].type}`}>
                  <span className="arp-msg-type">
                    {NORMAL_STEPS[step].type === 'broadcast' ? 'Broadcast' :
                     NORMAL_STEPS[step].type === 'unicast' ? 'Unicast Reply' : 'Cache Updated'}
                  </span>
                  <span className="arp-msg-text">{NORMAL_STEPS[step].msg}</span>
                </div>
                <div className="arp-explain">{NORMAL_STEPS[step].explain}</div>
              </>
            )}
          </div>

          {/* Step navigation */}
          <div className="arp-step-nav">
            {NORMAL_STEPS.map((s, i) => (
              <button
                key={i}
                className={`arp-step-btn${step === i ? ' arp-step-btn--active' : ''}`}
                onClick={() => setStep(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="arp-spoof">
          <div className="arp-spoof-diagram">
            <div className="arp-spoof-col">
              <div className="arp-host-box">Host A<br /><span className="arp-ip">192.168.1.10</span></div>
            </div>
            <div className="arp-spoof-arrows">
              <div className="arp-spoof-arrow arp-spoof-arrow--attacker">
                <span className="arp-spoof-msg">Gratuitous ARP: 192.168.1.1 is at ATTACKER:MAC</span>
                <div className="arp-spoof-line"><div className="arp-spoof-head arp-spoof-head--left" /></div>
                <span className="arp-spoof-sub">(poisons Host A's ARP cache)</span>
              </div>
              <div className="arp-spoof-arrow arp-spoof-arrow--attacker" style={{ marginTop: '0.5rem' }}>
                <span className="arp-spoof-msg">Gratuitous ARP: 192.168.1.10 is at ATTACKER:MAC</span>
                <div className="arp-spoof-line"><div className="arp-spoof-head arp-spoof-head--right" /></div>
                <span className="arp-spoof-sub">(poisons Router's ARP cache)</span>
              </div>
            </div>
            <div className="arp-spoof-col">
              <div className="arp-host-box arp-host-box--attacker">Attacker<br /><span className="arp-ip">192.168.1.99</span></div>
            </div>
            <div className="arp-spoof-arrows">
              <div className="arp-spoof-arrow arp-spoof-arrow--normal" style={{ marginTop: '2rem' }}>
                <span className="arp-spoof-msg">Traffic intended for router flows here instead</span>
                <div className="arp-spoof-line-green"><div className="arp-spoof-head-green" /></div>
              </div>
            </div>
            <div className="arp-spoof-col">
              <div className="arp-host-box arp-host-box--router">Router<br /><span className="arp-ip">192.168.1.1</span></div>
            </div>
          </div>

          <div className="arp-spoof-points">
            <div className="arp-spoof-point"><span className="arp-spoof-icon">!</span>ARP has no authentication — any host can claim any IP-to-MAC mapping.</div>
            <div className="arp-spoof-point"><span className="arp-spoof-icon">!</span>Gratuitous ARP replies are accepted without a prior request.</div>
            <div className="arp-spoof-point"><span className="arp-spoof-icon">&#10003;</span>Defence: Dynamic ARP Inspection (DAI) on managed switches validates ARP packets against the DHCP snooping table.</div>
            <div className="arp-spoof-point"><span className="arp-spoof-icon">&#10003;</span>Detection: run <code>arp -a</code> — if two IPs share the same MAC, ARP poisoning may be active.</div>
          </div>
        </div>
      )}

      <style>{`
        .arp-wrapper { margin: 0.75rem 0; }
        .arp-tabs {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 0.85rem;
          flex-wrap: wrap;
        }
        .arp-tab {
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
        .arp-tab:hover { border-color: #02a89a; color: #e0e0e0; }
        .arp-tab--active {
          background: rgba(2,168,154,0.12);
          border-color: #02a89a;
          color: #02a89a;
          font-weight: 700;
        }
        .arp-tab--attack.arp-tab--active {
          background: rgba(255,80,80,0.1);
          border-color: #ff5050;
          color: #ff6b6b;
        }
        .arp-normal {
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(2,168,154,0.15);
          border-radius: 8px;
          padding: 1rem;
        }
        .arp-hosts {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
          gap: 0.5rem;
        }
        .arp-host { display: flex; flex-direction: column; align-items: center; }
        .arp-host-box {
          font-family: 'Sora', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          text-align: center;
          background: rgba(74,160,200,0.1);
          border: 1px solid rgba(74,160,200,0.3);
          color: #4aa0c8;
        }
        .arp-host-box--router {
          background: rgba(45,214,143,0.08);
          border-color: rgba(45,214,143,0.25);
          color: #2dd68f;
        }
        .arp-host-box--attacker {
          background: rgba(255,80,80,0.1);
          border-color: rgba(255,80,80,0.3);
          color: #ff6b6b;
        }
        .arp-ip {
          display: block;
          font-family: 'Oxanium', monospace;
          font-size: 0.65rem;
          font-weight: 400;
          opacity: 0.7;
          margin-top: 0.15rem;
        }
        .arp-segment-label {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.68rem;
          color: rgba(171,207,201,0.35);
          text-align: center;
        }
        .arp-step-display { margin-bottom: 0.75rem; }
        .arp-msg-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.85rem;
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }
        .arp-msg-box--broadcast {
          background: rgba(255,200,0,0.08);
          border: 1px solid rgba(255,200,0,0.25);
        }
        .arp-msg-box--unicast {
          background: rgba(2,168,154,0.08);
          border: 1px solid rgba(2,168,154,0.25);
        }
        .arp-msg-box--cache {
          background: rgba(160,123,192,0.08);
          border: 1px solid rgba(160,123,192,0.25);
        }
        .arp-msg-type {
          font-family: 'Sora', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #ffc800;
          white-space: nowrap;
        }
        .arp-msg-box--unicast .arp-msg-type { color: #02a89a; }
        .arp-msg-box--cache .arp-msg-type { color: #a07bc0; }
        .arp-msg-text {
          font-family: 'Oxanium', monospace;
          font-size: 0.78rem;
          color: rgba(224,224,224,0.85);
        }
        .arp-explain {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.81rem;
          color: rgba(224,224,224,0.8);
          line-height: 1.6;
          padding: 0.6rem 0.85rem;
          background: rgba(2,168,154,0.04);
          border-left: 2px solid rgba(2,168,154,0.3);
          border-radius: 0 5px 5px 0;
        }
        .arp-step-nav {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-top: 0.75rem;
        }
        .arp-step-btn {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.75rem;
          padding: 0.3rem 0.7rem;
          border-radius: 5px;
          border: 1px solid rgba(2,168,154,0.25);
          background: rgba(10,15,15,0.5);
          color: rgba(224,224,224,0.55);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .arp-step-btn:hover { border-color: #02a89a; color: #e0e0e0; }
        .arp-step-btn--active {
          background: rgba(2,168,154,0.12);
          border-color: #02a89a;
          color: #02a89a;
          font-weight: 700;
        }
        /* Spoof view */
        .arp-spoof {
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(255,80,80,0.18);
          border-radius: 8px;
          padding: 1rem;
        }
        .arp-spoof-diagram {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
          overflow-x: auto;
        }
        .arp-spoof-col { flex-shrink: 0; }
        .arp-spoof-arrows { flex: 1; min-width: 120px; }
        .arp-spoof-arrow { display: flex; flex-direction: column; gap: 0.15rem; }
        .arp-spoof-arrow--attacker {}
        .arp-spoof-msg {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.68rem;
          color: #ff6b6b;
          line-height: 1.3;
        }
        .arp-spoof-sub {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.62rem;
          color: rgba(255,107,107,0.45);
        }
        .arp-spoof-line {
          width: 100%;
          height: 2px;
          background: rgba(255,80,80,0.4);
          position: relative;
        }
        .arp-spoof-head--left {
          position: absolute;
          left: 0;
          top: -4px;
          width: 0;
          height: 0;
          border-right: 6px solid rgba(255,80,80,0.4);
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
        .arp-spoof-head--right {
          position: absolute;
          right: 0;
          top: -4px;
          width: 0;
          height: 0;
          border-left: 6px solid rgba(255,80,80,0.4);
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
        .arp-spoof-line-green {
          width: 100%;
          height: 2px;
          background: rgba(45,214,143,0.4);
          position: relative;
        }
        .arp-spoof-head-green {
          position: absolute;
          right: 0;
          top: -4px;
          width: 0;
          height: 0;
          border-left: 6px solid rgba(45,214,143,0.4);
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
        .arp-spoof-arrow--normal .arp-spoof-msg { color: #2dd68f; font-size: 0.68rem; }
        .arp-spoof-points {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .arp-spoof-point {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          color: rgba(224,224,224,0.82);
          line-height: 1.5;
        }
        .arp-spoof-icon {
          font-size: 0.78rem;
          color: #ff6b6b;
          flex-shrink: 0;
          margin-top: 0.05rem;
          font-weight: 700;
        }
        .arp-spoof-point:nth-child(3) .arp-spoof-icon,
        .arp-spoof-point:nth-child(4) .arp-spoof-icon { color: #2dd68f; }
        .arp-spoof-point code {
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

export default ArpDiagram;
