import { memo } from 'react';

const LearningObjective = memo(function LearningObjective({ objectives }) {
  return (
    <div className="learning-objectives-card">
      <h3 className="learning-objectives-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="learning-objectives-icon">
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        </svg>
        What You'll Learn
      </h3>
      <ul className="learning-objectives-list">
        {objectives.map((objective, idx) => (
          <li key={idx} className="learning-objective-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="objective-check">
              <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{objective}</span>
          </li>
        ))}
      </ul>

      <style>{`
        .learning-objectives-card {
          background: linear-gradient(135deg, rgba(45, 214, 143, 0.08), rgba(2, 168, 154, 0.08));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(45, 214, 143, 0.25);
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          transition: all 0.3s ease;
        }

        .learning-objectives-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(45, 214, 143, 0.15);
          border-color: rgba(45, 214, 143, 0.4);
        }

        .learning-objectives-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #2dd68f;
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .learning-objectives-icon {
          color: #2dd68f;
        }

        .learning-objectives-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 1rem;
        }

        .learning-objective-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-family: 'Oxanium', sans-serif;
          font-size: 1rem;
          color: rgba(224, 224, 224, 0.95);
          line-height: 1.5;
          padding: 0.75rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .learning-objective-item:hover {
          background: rgba(45, 214, 143, 0.08);
          transform: translateX(4px);
        }

        .objective-check {
          flex-shrink: 0;
          color: #2dd68f;
          margin-top: 0.1rem;
        }

        @media (max-width: 768px) {
          .learning-objectives-card {
            padding: 1.5rem;
          }

          .learning-objectives-title {
            font-size: 1.25rem;
          }

          .learning-objective-item {
            font-size: 0.95rem;
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
});

export default LearningObjective;
