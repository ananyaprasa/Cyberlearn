import { memo } from 'react';

const InfoCard = memo(function InfoCard({ type = 'info', title, children, icon }) {
  const typeColors = {
    info: {
      bg: 'rgba(2, 168, 154, 0.08)',
      border: 'rgba(2, 168, 154, 0.3)',
      icon: '#02a89a',
      title: '#2dd68f',
    },
    tip: {
      bg: 'rgba(45, 214, 143, 0.08)',
      border: 'rgba(45, 214, 143, 0.3)',
      icon: '#2dd68f',
      title: '#3de9a0',
    },
    warn: {
      bg: 'rgba(255, 165, 0, 0.08)',
      border: 'rgba(255, 165, 0, 0.3)',
      icon: '#ffa500',
      title: '#ffb733',
    },
    danger: {
      bg: 'rgba(239, 68, 68, 0.08)',
      border: 'rgba(239, 68, 68, 0.3)',
      icon: '#ef4444',
      title: '#fca5a5',
    },
  };

  const colors = typeColors[type] || typeColors.info;

  return (
    <div className="info-card" style={{ '--bg': colors.bg, '--border': colors.border }}>
      {(title || icon) && (
        <div className="info-card-header">
          {icon && (
            <div className="info-card-icon" style={{ color: colors.icon }}>
              {icon}
            </div>
          )}
          {title && (
            <h4 className="info-card-title" style={{ color: colors.title }}>
              {title}
            </h4>
          )}
        </div>
      )}
      <div className="info-card-body">{children}</div>

      <style>{`
        .info-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .info-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .info-card-icon {
          font-size: 1.25rem;
          line-height: 1;
        }

        .info-card-title {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
          line-height: 1;
        }

        .info-card-body {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(224, 224, 224, 0.9);
        }

        .info-card-body strong {
          color: #e6e9f0;
          font-weight: 600;
        }

        .info-card-body code {
          background: rgba(0, 0, 0, 0.3);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #2dd68f;
        }

        @media (max-width: 768px) {
          .info-card {
            padding: 1rem 1.25rem;
          }

          .info-card-body {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
});

export default InfoCard;
