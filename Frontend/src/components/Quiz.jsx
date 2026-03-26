import { useState, memo, useCallback } from 'react';

const Quiz = memo(function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = useCallback((questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  }, [questions, answers]);

  const handleReset = useCallback(() => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  }, []);

  return (
    <div className="quiz-container">
      <h4>📝 Test Your Knowledge</h4>
      
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="quiz-question">
          <p className="question-text">
            <strong>Q{qIndex + 1}:</strong> {question.question}
          </p>
          <div className="quiz-options">
            {question.options.map((option, oIndex) => (
              <label 
                key={oIndex} 
                className={`quiz-option ${
                  submitted 
                    ? option === question.correct 
                      ? 'correct' 
                      : answers[qIndex] === option 
                        ? 'incorrect' 
                        : ''
                    : answers[qIndex] === option 
                      ? 'selected' 
                      : ''
                }`}
              >
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={option}
                  checked={answers[qIndex] === option}
                  onChange={() => handleAnswerChange(qIndex, option)}
                  disabled={submitted}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {submitted && answers[qIndex] === question.correct && (
            <p className="feedback correct-feedback">✓ Correct!</p>
          )}
          {submitted && answers[qIndex] !== question.correct && (
            <p className="feedback incorrect-feedback">
              ✗ Incorrect. The correct answer is: {question.correct}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <button 
          className="quiz-submit-btn" 
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== questions.length}
        >
          Submit Answers
        </button>
      ) : (
        <div className="quiz-results">
          <p className="score">
            Your Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
          </p>
          <button className="quiz-reset-btn" onClick={handleReset}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
});

export default Quiz;
