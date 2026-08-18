import { useState, useCallback, memo } from 'react';

const CHALLENGES = [
  { clue: 'I automatically assign IP addresses, subnet masks, and default gateways to hosts joining a network.', answer: 'DHCP', port: '67/68' },
  { clue: 'I resolve domain names like google.com into IP addresses. I am a frequent target for poisoning and tunnelling attacks.', answer: 'DNS', port: '53' },
  { clue: 'I provide an encrypted remote command-line session. I replaced the insecure protocol that sent credentials in plaintext.', answer: 'SSH', port: '22' },
  { clue: 'I handle the transmission of email between mail servers. Open relays misconfigured with me can be used for spam.', answer: 'SMTP', port: '25/587' },
  { clue: 'I enable Windows file and printer sharing. An exploit targeting me was used in the WannaCry ransomware attack.', answer: 'SMB', port: '445' },
  { clue: 'I carry encrypted web traffic. My security depends entirely on TLS configuration and certificate validity.', answer: 'HTTPS', port: '443' },
  { clue: 'I allow remote desktop access to Windows systems. I am one of the most exploited internet-facing services.', answer: 'RDP', port: '3389' },
  { clue: 'I collect device health statistics and configuration from routers and switches. Default community strings make me a risk.', answer: 'SNMP', port: '161/162' },
  { clue: 'I synchronise clocks across network devices. Kerberos authentication fails if clocks drift more than 5 minutes.', answer: 'NTP', port: '123' },
];

const ProtocolMatcher = memo(function ProtocolMatcher() {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [state, setState] = useState('idle'); // idle | correct | wrong
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState([]); // indices answered correctly

  const challenge = CHALLENGES[current];

  const handleSubmit = useCallback(() => {
    const val = input.trim().toUpperCase();
    if (!val) return;

    if (val === challenge.answer) {
      setState('correct');
      if (!answered.includes(current)) {
        setScore((s) => s + 1);
        setAnswered((a) => [...a, current]);
      }
    } else {
      setState('wrong');
    }
  }, [input, challenge, answered, current]);

  const handleNext = useCallback(() => {
    setInput('');
    setState('idle');
    setCurrent((c) => (c + 1) % CHALLENGES.length);
  }, []);

  const handleKey = useCallback((e) => {
    if (e.key === 'Enter' && state === 'idle') handleSubmit();
    if (e.key === 'Enter' && state !== 'idle') handleNext();
  }, [state, handleSubmit, handleNext]);

  return (
    <div className="pm-wrapper">
      <div className="pm-header">
        <span className="pm-title">Protocol Identification</span>
        <span className="pm-score">{score} / {CHALLENGES.length} identified</span>
      </div>
      <div className="pm-progress">
        {CHALLENGES.map((_, i) => (
          <div
            key={i}
            className={`pm-dot${answered.includes(i) ? ' pm-dot--done' : i === current ? ' pm-dot--current' : ''}`}
          />
        ))}
      </div>

      <div className="pm-card">
        <div className="pm-challenge-num">Challenge {current + 1} of {CHALLENGES.length}</div>
        <div className="pm-clue">&#8220;{challenge.clue}&#8221;</div>

        <div className="pm-input-row">
          <input
            className={`pm-input pm-input--${state}`}
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); if (state !== 'idle') setState('idle'); }}
            onKeyDown={handleKey}
            placeholder="Protocol name (e.g. DNS)"
            disabled={state === 'correct'}
            aria-label="Enter protocol name"
          />
          {state === 'idle' ? (
            <button className="pm-btn pm-btn--submit" onClick={handleSubmit}>Check</button>
          ) : (
            <button className="pm-btn pm-btn--next" onClick={handleNext}>Next &#8594;</button>
          )}
        </div>

        {state === 'correct' && (
          <div className="pm-feedback pm-feedback--correct">
            &#10003; Correct! <strong>{challenge.answer}</strong> &mdash; Port {challenge.port}
          </div>
        )}
        {state === 'wrong' && (
          <div className="pm-feedback pm-feedback--wrong">
            &#10007; Not quite. Try again or click Next to reveal.
          </div>
        )}
        {state === 'wrong' && (
          <button className="pm-reveal" onClick={() => setState('correct')}>Reveal answer</button>
        )}
      </div>

      {answered.length === CHALLENGES.length && (
        <div className="pm-complete">
          &#127881; All {CHALLENGES.length} protocols identified!
        </div>
      )}

      <style>{`
        .pm-wrapper { margin: 0.75rem 0; }
        .pm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .pm-title {
          font-family: 'Sora', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          color: #02a89a;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .pm-score {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.78rem;
          color: rgba(171,207,201,0.55);
        }
        .pm-progress {
          display: flex;
          gap: 4px;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        .pm-dot {
          width: 20px;
          height: 5px;
          border-radius: 3px;
          background: rgba(2,168,154,0.15);
          border: 1px solid rgba(2,168,154,0.2);
          transition: background 0.2s;
        }
        .pm-dot--done {
          background: #2dd68f;
          border-color: #2dd68f;
        }
        .pm-dot--current {
          background: rgba(2,168,154,0.4);
          border-color: #02a89a;
        }
        .pm-card {
          background: rgba(10,15,15,0.6);
          border: 1px solid rgba(2,168,154,0.18);
          border-radius: 8px;
          padding: 1rem 1.1rem;
        }
        .pm-challenge-num {
          font-family: 'Sora', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(171,207,201,0.4);
          margin-bottom: 0.5rem;
        }
        .pm-clue {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.88rem;
          color: rgba(224,224,224,0.9);
          line-height: 1.65;
          font-style: italic;
          margin-bottom: 0.85rem;
        }
        .pm-input-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .pm-input {
          flex: 1;
          min-width: 140px;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.85rem;
          padding: 0.5rem 0.85rem;
          border-radius: 6px;
          border: 1px solid rgba(2,168,154,0.3);
          background: rgba(10,15,15,0.7);
          color: #e0e0e0;
          outline: none;
          transition: border-color 0.18s;
        }
        .pm-input:focus { border-color: #02a89a; }
        .pm-input--correct { border-color: #2dd68f !important; }
        .pm-input--wrong { border-color: #ff5050 !important; }
        .pm-btn {
          font-family: 'Sora', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid;
          cursor: pointer;
          transition: background 0.18s;
          white-space: nowrap;
        }
        .pm-btn--submit {
          background: rgba(2,168,154,0.12);
          border-color: #02a89a;
          color: #02a89a;
        }
        .pm-btn--submit:hover { background: rgba(2,168,154,0.22); }
        .pm-btn--next {
          background: rgba(45,214,143,0.1);
          border-color: #2dd68f;
          color: #2dd68f;
        }
        .pm-btn--next:hover { background: rgba(45,214,143,0.18); }
        .pm-feedback {
          margin-top: 0.65rem;
          padding: 0.45rem 0.75rem;
          border-radius: 5px;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
        }
        .pm-feedback--correct {
          background: rgba(45,214,143,0.1);
          border: 1px solid rgba(45,214,143,0.25);
          color: #2dd68f;
        }
        .pm-feedback--wrong {
          background: rgba(255,80,80,0.08);
          border: 1px solid rgba(255,80,80,0.2);
          color: #ff6b6b;
        }
        .pm-reveal {
          margin-top: 0.4rem;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.75rem;
          color: rgba(171,207,201,0.45);
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }
        .pm-reveal:hover { color: rgba(171,207,201,0.75); }
        .pm-complete {
          margin-top: 0.75rem;
          text-align: center;
          font-family: 'Sora', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #2dd68f;
          padding: 0.5rem;
          background: rgba(45,214,143,0.07);
          border-radius: 6px;
          border: 1px solid rgba(45,214,143,0.2);
        }
      `}</style>
    </div>
  );
});

export default ProtocolMatcher;
