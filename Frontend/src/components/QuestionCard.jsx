import { useState, memo } from 'react';

/**
 * QuestionCard — single MCQ with instant per-click feedback.
 * Wrapped in memo so parent re-renders (e.g. collapsible toggle) never
 * unmount/remount this component and reset its answered state.
 *
 * Props:
 *   question      {string}          The question text
 *   options       {string[]}        Array of exactly 4 option strings (e.g. "A. Some text")
 *   correctAnswer {string}          The letter of the correct option, e.g. "B"
 *                                   Matched against the first character of each option string.
 */
const QuestionCard = memo(function QuestionCard({ question, options, correctAnswer }) {
  const [selected, setSelected] = useState(null); // index of clicked option

  const correct = correctAnswer?.trim().toUpperCase();

  // Derive the letter from the start of an option string ("B. Foo" → "B")
  const letterOf = (opt) => opt?.trim()[0]?.toUpperCase();

  const handleSelect = (idx) => {
    if (selected !== null) return; // locked after first pick
    setSelected(idx);
  };

  const getState = (idx) => {
    if (selected === null) return 'idle';
    const letter = letterOf(options[idx]);
    if (letter === correct) return 'correct';
    if (idx === selected) return 'wrong';
    return 'idle';
  };

  const feedback = selected !== null
    ? letterOf(options[selected]) === correct ? 'correct' : 'wrong'
    : null;

  return (
    <div className="qc-root">
      <p className="qc-question">{question}</p>
      <div className="qc-options">
        {options.map((opt, idx) => {
          const state = getState(idx);
          return (
            <button
              key={idx}
              className={`qc-option qc-option--${state}`}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              aria-pressed={selected === idx}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {feedback && (
        <div className={`qc-feedback qc-feedback--${feedback}`}>
          {feedback === 'correct' ? '✓ Correct!' : `✗ Wrong — correct answer: ${correct}`}
        </div>
      )}

      <style>{`
        .qc-root {
          background: rgba(10, 15, 15, 0.72);
          border: 1px solid rgba(1, 107, 97, 0.22);
          border-radius: 8px;
          padding: 1.1rem 1.3rem 1rem;
          margin-bottom: 0.9rem;
          transition: border-color 0.2s ease;
        }
        .qc-root:has(.qc-feedback--correct) { border-color: rgba(45, 214, 143, 0.4); }
        .qc-root:has(.qc-feedback--wrong)   { border-color: rgba(255, 80, 80, 0.35); }

        .qc-question {
          font-family: 'Oxanium', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(224, 224, 224, 0.92);
          line-height: 1.55;
          margin: 0 0 0.85rem;
        }

        .qc-options {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .qc-option {
          width: 100%;
          text-align: left;
          padding: 0.75rem 1.25rem;
          margin-bottom: 0.65rem;
          border-radius: 8px;
          border: 1px solid rgba(2, 168, 154, 0.28);
          background: rgba(2, 168, 154, 0.05);
          color: rgba(224, 224, 224, 0.78);
          font-family: 'Oxanium', sans-serif;
          font-size: 0.84rem;
          line-height: 1.5;
          cursor: pointer;
          transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.15s ease;
        }
        .qc-option:last-child { margin-bottom: 0; }
        .qc-option:not(:disabled):hover {
          background: rgba(2, 168, 154, 0.14);
          border-color: #02a89a;
          color: #e0e0e0;
          transform: translateX(3px);
        }
        .qc-option:disabled { cursor: default; }

        /* correct option — always green once answered */
        .qc-option--correct {
          background: rgba(45, 214, 143, 0.12) !important;
          border-color: #2dd68f !important;
          color: #2dd68f !important;
          font-weight: 600;
        }
        /* the option the user picked when it was wrong */
        .qc-option--wrong {
          background: rgba(255, 80, 80, 0.1) !important;
          border-color: rgba(255, 80, 80, 0.6) !important;
          color: #ff6b6b !important;
        }

        .qc-feedback {
          margin-top: 0.75rem;
          padding: 0.45rem 0.8rem;
          border-radius: 5px;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .qc-feedback--correct {
          background: rgba(45, 214, 143, 0.1);
          color: #2dd68f;
          border: 1px solid rgba(45, 214, 143, 0.3);
        }
        .qc-feedback--wrong {
          background: rgba(255, 80, 80, 0.08);
          color: #ff6b6b;
          border: 1px solid rgba(255, 80, 80, 0.28);
        }
      `}</style>
    </div>
  );
});

export default QuestionCard;
