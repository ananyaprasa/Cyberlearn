import { memo } from 'react';

const DiagramContainer = memo(function DiagramContainer({ title, subtitle, children, fullWidth = false }) {
  return (
    <div className={`diagram-container${fullWidth ? ' diagram-container--full' : ''}`}>
      {(title || subtitle) && (
        <div className="diagram-header">
          {title && <h3 className="diagram-title">{title}</h3>}
          {subtitle && <p className="diagram-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="diagram-content">{children}</div>

      <style>{`
        .diagram-container {
          background: rgba(10, 15, 25, 0.6);
          border: 1px solid rgba(45, 214, 143, 0.15);
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .diagram-container:hover {
          border-color: rgba(45, 214, 143, 0.25);
          background: rgba(10, 15, 25, 0.7);
          box-shadow: 0 8px 32px rgba(45, 214, 143, 0.1);
        }

        .diagram-container--full {
          padding: 2.5rem;
        }

        .diagram-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(45, 214, 143, 0.1);
        }

        .diagram-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #e6e9f0;
          margin: 0 0 0.5rem 0;
        }

        .diagram-subtitle {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.95rem;
          color: rgba(171, 207, 201, 0.7);
          margin: 0;
        }

        .diagram-content {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 768px) {
          .diagram-container {
            padding: 1.5rem 1rem;
          }

          .diagram-container--full {
            padding: 1.75rem 1rem;
          }

          .diagram-header {
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
          }

          .diagram-title {
            font-size: 1.25rem;
          }

          .diagram-subtitle {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
});

export default DiagramContainer;
