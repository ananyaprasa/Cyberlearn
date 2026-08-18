import { memo, useState } from 'react';

const LessonCard = memo(function LessonCard({ number, title, subtitle, icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="lesson-card">
      <button
        className={`lesson-card-header${isOpen ? ' lesson-card-header--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="lesson-card-header-left">
          {icon && <div className="lesson-card-icon">{icon}</div>}
          <div className="lesson-card-number">{number}</div>
          <div className="lesson-card-title-group">
            <h2 className="lesson-card-title">{title}</h2>
            {subtitle && <p className="lesson-card-subtitle">{subtitle}</p>}
          </div>
        </div>
        <div className="lesson-card-chevron">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <div className={`lesson-card-body${isOpen ? ' lesson-card-body--open' : ''}`}>
        <div className="lesson-card-content">{children}</div>
      </div>

      <style>{`
        .lesson-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(45, 214, 143, 0.15);
          border-radius: 16px;
          margin-bottom: 1.5rem;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lesson-card:hover {
          border-color: rgba(45, 214, 143, 0.3);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 8px 32px rgba(45, 214, 143, 0.08);
        }

        .lesson-card-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          background: transparent;
          border: none;
          color: inherit;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
        }

        .lesson-card-header:hover {
          background: rgba(45, 214, 143, 0.05);
        }

        .lesson-card-header--open {
          border-bottom: 1px solid rgba(45, 214, 143, 0.1);
        }

        .lesson-card-header-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex: 1;
        }

        .lesson-card-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(45, 214, 143, 0.15), rgba(2, 168, 154, 0.15));
          border: 1px solid rgba(45, 214, 143, 0.3);
          border-radius: 12px;
          color: #2dd68f;
          font-size: 1.5rem;
        }

        .lesson-card-number {
          font-family: 'Sora', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #2dd68f, #02a89a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          min-width: 60px;
        }

        .lesson-card-title-group {
          flex: 1;
        }

        .lesson-card-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #e6e9f0;
          margin: 0 0 0.25rem 0;
          line-height: 1.3;
        }

        .lesson-card-subtitle {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.95rem;
          color: rgba(171, 207, 201, 0.7);
          margin: 0;
          line-height: 1.4;
        }

        .lesson-card-chevron {
          color: #2dd68f;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lesson-card-header--open .lesson-card-chevron {
          transform: rotate(180deg);
        }

        .lesson-card-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lesson-card-body--open {
          max-height: 10000px;
        }

        .lesson-card-content {
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .lesson-card-header {
            padding: 1.25rem 1.5rem;
          }

          .lesson-card-header-left {
            gap: 1rem;
          }

          .lesson-card-icon {
            width: 40px;
            height: 40px;
            font-size: 1.25rem;
          }

          .lesson-card-number {
            font-size: 2rem;
            min-width: 50px;
          }

          .lesson-card-title {
            font-size: 1.25rem;
          }

          .lesson-card-subtitle {
            font-size: 0.875rem;
          }

          .lesson-card-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
});

export default LessonCard;
