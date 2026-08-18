import { memo, useState } from 'react';

const WiresharkFilterCard = memo(function WiresharkFilterCard({ filters }) {
  const [copiedFilter, setCopiedFilter] = useState(null);

  const handleCopy = (filter) => {
    navigator.clipboard.writeText(filter);
    setCopiedFilter(filter);
    setTimeout(() => setCopiedFilter(null), 2000);
  };

  return (
    <div style={{ margin: '2rem 0', display: 'grid', gap: '1rem' }}>
      {filters.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: 'rgba(10, 15, 25, 0.6)',
            border: '1px solid rgba(45, 214, 143, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(45, 214, 143, 0.4)';
            e.currentTarget.style.background = 'rgba(10, 15, 25, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(45, 214, 143, 0.2)';
            e.currentTarget.style.background = 'rgba(10, 15, 25, 0.6)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '1rem',
                color: '#2dd68f',
                fontWeight: 700,
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <code style={{
                  background: 'rgba(45, 214, 143, 0.15)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(45, 214, 143, 0.3)'
                }}>
                  {item.filter}
                </code>
              </div>
              <div style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#e6e9f0',
                marginBottom: '0.5rem'
              }}>
                {item.purpose}
              </div>
            </div>
            <button
              onClick={() => handleCopy(item.filter)}
              style={{
                background: copiedFilter === item.filter ? 'rgba(45, 214, 143, 0.2)' : 'rgba(45, 214, 143, 0.1)',
                border: '1px solid rgba(45, 214, 143, 0.3)',
                borderRadius: '6px',
                padding: '0.5rem 0.75rem',
                color: '#2dd68f',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {copiedFilter === item.filter ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>

          <div style={{
            display: 'grid',
            gap: '0.5rem',
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '8px',
            border: '1px solid rgba(45, 214, 143, 0.1)'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#02a89a',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                minWidth: '110px'
              }}>
                When to use:
              </span>
              <span style={{
                fontFamily: "'Oxanium', sans-serif",
                fontSize: '0.875rem',
                color: 'rgba(224, 224, 224, 0.9)',
                lineHeight: 1.5
              }}>
                {item.when}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#2dd68f',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                minWidth: '110px'
              }}>
                Observation:
              </span>
              <span style={{
                fontFamily: "'Oxanium', sans-serif",
                fontSize: '0.875rem',
                color: 'rgba(224, 224, 224, 0.9)',
                lineHeight: 1.5
              }}>
                {item.observation}
              </span>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 768px) {
          code {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
});

export default WiresharkFilterCard;
