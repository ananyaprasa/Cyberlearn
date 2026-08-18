import { memo } from 'react';

const ConceptGrid = memo(function ConceptGrid({ concepts }) {
  return (
    <div className="concept-grid">
      {concepts.map((concept, idx) => (
        <div key={idx} className="concept-card">
          <h4 className="concept-label">{concept.label}</h4>
          <div className="concept-body">{concept.children}</div>
        </div>
      ))}

      <style>{`
        .concept-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
          margin: 2rem 0;
        }

        .concept-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(45, 214, 143, 0.15);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .concept-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(45, 214, 143, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(45, 214, 143, 0.12);
        }

        .concept-label {
          font-family: 'Sora', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #2dd68f;
          margin: 0 0 0.75rem 0;
          line-height: 1.3;
        }

        .concept-body {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.95rem;
          color: rgba(224, 224, 224, 0.9);
          line-height: 1.6;
        }

        .concept-body code {
          background: rgba(45, 214, 143, 0.15);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #3de9a0;
        }

        @media (max-width: 768px) {
          .concept-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .concept-card {
            padding: 1.25rem;
          }

          .concept-label {
            font-size: 1rem;
          }

          .concept-body {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
});

export default ConceptGrid;
