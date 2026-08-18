import { memo, useState } from 'react';

const TerminalBlock = memo(function TerminalBlock({ command, output, title, description }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-block">
      {title && <div className="terminal-title">{title}</div>}
      {description && <div className="terminal-description">{description}</div>}
      
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="terminal-dot terminal-dot--red"></span>
            <span className="terminal-dot terminal-dot--yellow"></span>
            <span className="terminal-dot terminal-dot--green"></span>
          </div>
          <div className="terminal-label">Terminal</div>
          <button className="terminal-copy-btn" onClick={handleCopy} title="Copy command">
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </button>
        </div>
        <div className="terminal-body">
          <div className="terminal-prompt">
            <span className="terminal-user">user@cyberlearn</span>
            <span className="terminal-separator">:</span>
            <span className="terminal-path">~</span>
            <span className="terminal-symbol">$</span>
          </div>
          <div className="terminal-command">{command}</div>
          {output && <div className="terminal-output">{output}</div>}
        </div>
      </div>

      <style>{`
        .terminal-block {
          margin: 1.5rem 0;
        }

        .terminal-title {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #e6e9f0;
          margin-bottom: 0.5rem;
        }

        .terminal-description {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.9rem;
          color: rgba(171, 207, 201, 0.7);
          margin-bottom: 1rem;
        }

        .terminal-window {
          background: #0a0e1a;
          border: 1px solid rgba(45, 214, 143, 0.2);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
        }

        .terminal-window:hover {
          border-color: rgba(45, 214, 143, 0.4);
          box-shadow: 0 8px 32px rgba(45, 214, 143, 0.1);
        }

        .terminal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(45, 214, 143, 0.1);
        }

        .terminal-dots {
          display: flex;
          gap: 0.5rem;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .terminal-dot--red {
          background: #ff5f56;
        }

        .terminal-dot--yellow {
          background: #ffbd2e;
        }

        .terminal-dot--green {
          background: #27c93f;
        }

        .terminal-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.75rem;
          color: rgba(224, 224, 224, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .terminal-copy-btn {
          background: rgba(45, 214, 143, 0.1);
          border: 1px solid rgba(45, 214, 143, 0.3);
          border-radius: 6px;
          padding: 0.4rem 0.6rem;
          color: #2dd68f;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }

        .terminal-copy-btn:hover {
          background: rgba(45, 214, 143, 0.2);
          border-color: rgba(45, 214, 143, 0.5);
        }

        .terminal-body {
          padding: 1.25rem 1.5rem;
          font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .terminal-prompt {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .terminal-user {
          color: #2dd68f;
          font-weight: 600;
        }

        .terminal-separator {
          color: rgba(224, 224, 224, 0.5);
        }

        .terminal-path {
          color: #02a89a;
        }

        .terminal-symbol {
          color: #2dd68f;
          margin-left: 0.25rem;
        }

        .terminal-command {
          color: #e6e9f0;
          margin-left: 0;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .terminal-output {
          margin-top: 1rem;
          color: rgba(171, 207, 201, 0.8);
          white-space: pre-wrap;
          border-top: 1px solid rgba(45, 214, 143, 0.1);
          padding-top: 1rem;
        }

        @media (max-width: 768px) {
          .terminal-body {
            padding: 1rem;
            font-size: 0.8rem;
          }

          .terminal-header {
            padding: 0.6rem 0.75rem;
          }

          .terminal-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
});

export default TerminalBlock;
