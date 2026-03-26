import { useState, memo, useCallback } from 'react';

const PracticalQuiz = memo(function PracticalQuiz({ exercises }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showHints, setShowHints] = useState({});

  const handleAnswerChange = useCallback((exerciseIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [exerciseIndex]: answer.trim()
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    let correctCount = 0;
    exercises.forEach((exercise, index) => {
      const userAnswer = answers[index]?.toLowerCase();
      const correctAnswer = exercise.expectedAnswer.toLowerCase();
      
      // Check if answer matches (case insensitive, trimmed)
      if (userAnswer === correctAnswer || 
          (exercise.alternativeAnswers && 
           exercise.alternativeAnswers.some(alt => alt.toLowerCase() === userAnswer))) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  }, [exercises, answers]);

  const handleReset = useCallback(() => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowHints({});
  }, []);

  const toggleHint = useCallback((exerciseIndex) => {
    setShowHints(prev => ({
      ...prev,
      [exerciseIndex]: !prev[exerciseIndex]
    }));
  }, []);

  const isAnswerCorrect = useCallback((exerciseIndex) => {
    const userAnswer = answers[exerciseIndex]?.toLowerCase();
    const exercise = exercises[exerciseIndex];
    const correctAnswer = exercise.expectedAnswer.toLowerCase();
    
    return userAnswer === correctAnswer || 
           (exercise.alternativeAnswers && 
            exercise.alternativeAnswers.some(alt => alt.toLowerCase() === userAnswer));
  }, [exercises, answers]);

  return (
    <div className="practical-quiz-container">
      <h4>🛠️ Hands-On Practice</h4>
      <p className="practice-intro">Execute these commands on your system and enter the results:</p>
      
      {exercises.map((exercise, index) => (
        <div key={index} className="practical-exercise">
          <div className="exercise-header">
            <h5>Exercise {index + 1}: {exercise.title}</h5>
            <span className="difficulty-badge">{exercise.difficulty}</span>
          </div>
          
          <div className="exercise-description">
            <p>{exercise.description}</p>
          </div>
          
          <div className="command-box">
            <div className="command-header">
              <span className="terminal-icon">$</span>
              <span className="command-label">Command to execute:</span>
            </div>
            <code className="command-text">{exercise.command}</code>
            <button 
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(exercise.command)}
              title="Copy command"
            >
              📋
            </button>
          </div>
          
          {exercise.hint && (
            <div className="hint-section">
              <button 
                className="hint-btn"
                onClick={() => toggleHint(index)}
              >
                💡 {showHints[index] ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHints[index] && (
                <div className="exercise-hint">
                  <strong>Hint:</strong> {exercise.hint}
                </div>
              )}
            </div>
          )}
          
          <div className="answer-section">
            <label htmlFor={`answer-${index}`}>Your Answer:</label>
            <input
              id={`answer-${index}`}
              type="text"
              className={`practical-input ${
                submitted 
                  ? isAnswerCorrect(index) 
                    ? 'correct' 
                    : 'incorrect'
                  : ''
              }`}
              value={answers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={exercise.placeholder}
              disabled={submitted}
            />
          </div>
          
          {submitted && (
            <div className="exercise-feedback">
              {isAnswerCorrect(index) ? (
                <p className="feedback correct-feedback">
                  ✓ Correct! {exercise.explanation}
                </p>
              ) : (
                <p className="feedback incorrect-feedback">
                  ✗ Incorrect. Expected: <code>{exercise.expectedAnswer}</code>
                  <br />{exercise.explanation}
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      {!submitted ? (
        <button 
          className="practical-submit-btn" 
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== exercises.length}
        >
          Submit Results
        </button>
      ) : (
        <div className="practical-results">
          <p className="score">
            Score: {score} / {exercises.length} ({Math.round((score / exercises.length) * 100)}%)
          </p>
          <button className="practical-reset-btn" onClick={handleReset}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
});

export default PracticalQuiz;
