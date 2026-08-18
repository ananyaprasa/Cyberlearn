import { useState, memo } from 'react';

const STEPS = [
  {
    label: 'Step 1 — SYN',
    arrow: 'client-to-server',
    clientMsg: 'SYN\nSeq=0',
    serverMsg: '...',
    clientState: 'SYN_SENT',
    serverState: 'LISTEN',
    explanation:
      'The client sends a SYN (synchronise) packet to the server. It includes the client\'s initial sequence number (ISN), randomly chosen to prevent prediction attacks. The client enters the SYN_SENT state.',
  },
  {
    label: 'Step 2 — SYN-ACK',
    arrow: 'server-to-client',
    clientMsg: '...',
    serverMsg: 'SYN-ACK\nSeq=0, Ack=1',
    clientState: 'SYN_SENT',
    serverState: 'SYN_RECEIVED',
    explanation:
      'The server acknowledges the client\'s SYN (Ack = client ISN + 1) and sends its own SYN with its own initial sequence number. The server allocates resources and enters SYN_RECEIVED. This is the half-open state that SYN flood attacks exploit — an attacker sends many SYNs but never replies, filling the server\'s connection queue.',
  },
  {
    label: 'Step 3 — ACK',
    arrow: 'client-to-server',
    clientMsg: 'ACK\nAck=1',
    serverMsg: '...',
    clientState: 'ESTABLISHED',
    serverState: 'ESTABLISHED',
    explanation:
      'The client acknowledges the server\'s SYN (Ack = server ISN + 1). Both sides are now ESTABLISHED. Data can flow in both directions. The connection is fully formed.',
  },
];

const TCPHandshakeDiagram = memo(function TCPHandshakeDiagram() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  return (
    <div className="hs-wrapper">
      {/* Step buttons */}
      <div className="hs-step-btns" role="tablist" aria-label="Handshake steps">
        {STEPS.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={step === i}
            className={`hs-step-btn${step === i ? ' hs-step-btn--active' : ''}`}
            onClick={() => setStep(i)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Diagram */}
      <div className="hs-diagram">
        {/* Client */}
        <div className="hs-endpoint">
          <div className="hs-box hs-box--client">CLIENT</div>
          <div className="hs-state-label">State: <span className="hs-state">{current.clientState}</span></div>
          <div className="hs-timeline" />
        </div>

        {/* Arrow area */}
        <div className="hs-arrow-area">
          <div className={`hs-arrow-container hs-arrow-container--${current.arrow}`}>
            <div className="hs-arrow-label">{current.arrow === 'client-to-server' ? current.clientMsg : current.serverMsg}</div>
            <div className={`hs-arrow-line hs-arrow-line--${current.arrow}`}>
              <div className="hs-arrow-head" />
            </div>
          </div>
        </div>

        {/* Server */}
        <div className="hs-endpoint">
          <div className="hs-box hs-box--server">SERVER</div>
          <div className="hs-state-label">State: <span className="hs-state">{current.serverState}</span></div>
          <div className="hs-timeline" />
        </div>
      </div>

      {/* Explanation */}
      <div className="hs-explanation">{current.explanation}</div>

      {/* Navigation */}
      <div className="hs-nav">
        <button
          className="hs-nav-btn"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          aria-label="Previous step"
        >
          &#8592; Prev
        </button>
        <span className="hs-progress">{step + 1} / {STEPS.length}</span>
        <button
          className="hs-nav-btn"
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          disabled={step === STEPS.length - 1}
          aria-label="Next step"
        >
          Next &#8594;
        </button>
      </div>

      {step === STEPS.length - 1 && (
        <div className="hs-complete">&#10003; Connection Established — Data transfer can begin</div>
      )}

      <style>{`
        .hs-wrapper { margin: 0.75rem 0; }
        .hs-step-btns {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .hs-step-btn {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          padding: 0.35rem 0.75rem;
          border-radius: 5px;
          border: 1px solid rgba(2,168,154,0.3);
          background: rgba(10,15,15,0.6);
          color: rgba(224,224,224,0.6);
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .hs-step-btn:hover { border-color: #02a89a; color: #e0e0e0; }
        .hs-step-btn--active {
          background: rgba(2,168,154,0.15);
          border-color: #02a89a;
          color: #02a89a;
          font-weight: 700;
        }
        .hs-diagram {
          display: grid;
          grid-template-columns: 1fr 180px 1fr;
          gap: 0;
          align-items: start;
          padding: 1rem 0.5rem;
          background: rgba(10,15,15,0.5);
          border: 1px solid rgba(2,168,154,0.15);
          border-radius: 8px;
          min-height: 120px;
        }
        @media (max-width: 500px) {
          .hs-diagram { grid-template-columns: 1fr 120px 1fr; }
        }
        .hs-endpoint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .hs-box {
          font-family: 'Sora', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.4rem 0.9rem;
          border-radius: 6px;
          text-align: center;
        }
        .hs-box--client {
          background: rgba(74,160,200,0.15);
          border: 1px solid rgba(74,160,200,0.4);
          color: #4aa0c8;
        }
        .hs-box--server {
          background: rgba(45,214,143,0.1);
          border: 1px solid rgba(45,214,143,0.35);
          color: #2dd68f;
        }
        .hs-state-label {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.7rem;
          color: rgba(171,207,201,0.4);
        }
        .hs-state {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.7rem;
          color: #ffc800;
        }
        .hs-timeline {
          width: 2px;
          height: 60px;
          background: rgba(255,255,255,0.1);
          margin-top: 0.2rem;
        }
        .hs-arrow-area {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 1.6rem;
        }
        .hs-arrow-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }
        .hs-arrow-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #02a89a;
          text-align: center;
          white-space: pre-line;
          line-height: 1.25;
        }
        .hs-arrow-line {
          width: 100%;
          height: 2px;
          background: #02a89a;
          position: relative;
        }
        .hs-arrow-line--client-to-server .hs-arrow-head {
          position: absolute;
          right: -1px;
          top: -5px;
          width: 0;
          height: 0;
          border-left: 8px solid #02a89a;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
        }
        .hs-arrow-line--server-to-client .hs-arrow-head {
          position: absolute;
          left: -1px;
          top: -5px;
          width: 0;
          height: 0;
          border-right: 8px solid #02a89a;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
        }
        .hs-explanation {
          margin-top: 0.9rem;
          padding: 0.85rem 1rem;
          background: rgba(2,168,154,0.06);
          border-left: 3px solid #02a89a;
          border-radius: 0 6px 6px 0;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.83rem;
          color: rgba(224,224,224,0.85);
          line-height: 1.65;
        }
        .hs-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.75rem;
        }
        .hs-nav-btn {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          padding: 0.35rem 0.8rem;
          border-radius: 5px;
          border: 1px solid rgba(2,168,154,0.35);
          background: transparent;
          color: #02a89a;
          cursor: pointer;
          transition: background 0.18s ease;
        }
        .hs-nav-btn:hover:not(:disabled) { background: rgba(2,168,154,0.1); }
        .hs-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .hs-progress {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          color: rgba(171,207,201,0.5);
        }
        .hs-complete {
          margin-top: 0.6rem;
          text-align: center;
          font-family: 'Sora', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          color: #2dd68f;
          padding: 0.4rem;
          background: rgba(45,214,143,0.07);
          border-radius: 5px;
          border: 1px solid rgba(45,214,143,0.2);
        }
      `}</style>
    </div>
  );
});

export default TCPHandshakeDiagram;
