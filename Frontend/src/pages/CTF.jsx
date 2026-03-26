import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import { useChallenges } from "../contexts/ChallengeContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import confetti from "canvas-confetti";
import { CTFIcon } from '../components/CTFIcon';

const DIFFICULTY_ORDER = ["easy", "medium", "hard"];

const difficultyLabels = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const difficultyDescriptions = {
  easy: "Great starting point if you're new to CTFs.",
  medium: "A step up in complexity – you'll need to think.",
  hard: "Advanced challenges for experienced players.",
};

function CTF() {
  const { challenges, solveChallenge, getStats } = useChallenges();
  
  // one flag input per challenge
  const [flags, setFlags] = useState({});
  // track wrong flag attempts
  const [wrongId, setWrongId] = useState(null);
  // track just solved for glow animation
  const [justSolvedId, setJustSolvedId] = useState(null);
  // animated display values
  const [displayPoints, setDisplayPoints] = useState(0);
  const [displaySolved, setDisplaySolved] = useState(0);
  const prevPointsRef = useRef(0);
  const prevSolvedRef = useRef(0);

  const stats = getStats();
  const totalPoints = challenges.reduce((sum, c) => sum + c.points, 0);

  // animate header numbers when progress changes
  useEffect(() => {
    const startPts = prevPointsRef.current;
    const endPts = stats.totalPoints;
    const startSolved = prevSolvedRef.current;
    const endSolved = stats.solvedCount;

    const duration = 600; // ms
    const startTime = performance.now();

    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = t * (2 - t); // ease-out

      setDisplayPoints(
        Math.round(startPts + (endPts - startPts) * eased)
      );
      setDisplaySolved(
        Math.round(startSolved + (endSolved - startSolved) * eased)
      );

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        prevPointsRef.current = endPts;
        prevSolvedRef.current = endSolved;
      }
    }

    requestAnimationFrame(step);
  }, [stats.totalPoints, stats.solvedCount]);

  const handleFlagChange = (id, value) => {
    setFlags((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (challenge) => {
    const value = (flags[challenge.id] || "").trim();
    if (!value) return;

    const success = solveChallenge(challenge.id, value);

    if (success) {
      // ✅ correct
      setWrongId(null);                // clear any previous error
      setJustSolvedId(challenge.id);   // trigger confetti + glow
      setFlags(prev => ({ ...prev, [challenge.id]: "" })); // clear input

      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ff88', '#00ffcc', '#3de9a0', '#5dffb3', '#ffffff', '#ffff00']
      });

      setTimeout(() => {
        setJustSolvedId(null);
      }, 900);
    } else {
      // ❌ wrong flag → trigger shake
      setWrongId(challenge.id);
      setTimeout(() => setWrongId(null), 600);
    }
  };

  return (
    <>
      <div style={{ position: 'relative', minHeight: '100vh', fontFamily: 'Oxanium, sans-serif' }}>
        {/* Shader Background */}
        <Suspense fallback={<div />}>
          <ShaderGradientCanvas
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: -1,
              opacity: 0.8,
            }}
          >
            <ShaderGradient
              animate="off"
              axesHelper="on"
              brightness={1.4}
              cAzimuthAngle={0}
              cDistance={7.1}
              cPolarAngle={140}
              cameraZoom={17.29}
              color1="#aeacb7"
              color2="#152921"
              color3="#002f00"
              destination="onCanvas"
              embedMode="off"
              envPreset="city"
              format="gif"
              fov={45}
              frameRate={10}
              gizmoHelper="hide"
              grain="off"
              lightType="3d"
              pixelDensity={1}
              positionX={0}
              positionY={0}
              positionZ={0}
              range="disabled"
              rangeEnd={40}
              rangeStart={0}
              reflection={0.1}
              rotationX={0}
              rotationY={0}
              rotationZ={0}
              shader="defaults"
              type="sphere"
              uAmplitude={1.6}
              uDensity={1.1}
              uFrequency={5.5}
              uSpeed={0.1}
              uStrength={1}
              uTime={0}
              wireframe={false}
            />
          </ShaderGradientCanvas>
        </Suspense>
        <style>
          {`
            .back-btn {
              transition: transform 0.2s ease;
            }
            .back-btn:hover {
              transform: scale(1.05) translateY(-2px);
            }
            .ctf-back-btn:hover {
              background: rgba(92, 242, 255, 0.25) !important;
              border-color: #5CF2FF !important;
              color: #FFFFFF !important;
            }
            .ctf-header-title {
              color: #abcfc9 !important;
              -webkit-text-fill-color: #abcfc9 !important;
              background: none !important;
              font-family: 'Sora', sans-serif !important;
            }
            .ctf-header-subtitle {
              font-family: 'Sora', sans-serif !important;
            }
          `}
        </style>
        <Navbar style={{ position: 'relative', zIndex: 2 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
            <CTFIcon size={64} />
            <h1 className="ctf-header-title" style={{ margin: 0 }}>CTF Challenges</h1>
          </div>
          <p className="ctf-header-subtitle">Test your skills and earn points</p>
          
          <div className="flag-format-notice">
            <span className="notice-icon">ℹ️</span>
            <span className="notice-text">
              All flags follow the format: <code>CyberLearn&#123;answer&#125;</code>
            </span>
          </div>
          
          <div className="ctf-stats-row">
            <div className="ctf-stat-card">
              <div className="ctf-stat-label">Total Points</div>
              <div className="ctf-stat-value">
                {displayPoints}
                <span className="ctf-stat-slash"> / {totalPoints}</span>
              </div>
              <div className="ctf-stat-sub">XP collected</div>
            </div>

            <div className="ctf-stat-card">
              <div className="ctf-stat-label">Challenges Solved</div>
              <div className="ctf-stat-value">
                {displaySolved}
                <span className="ctf-stat-slash">
                  {" "}
                  / {challenges.length}
                </span>
              </div>
              <div className="ctf-stat-sub">Keep hacking…</div>
            </div>
          </div>
        </div>

        <Link 
          to="/" 
          className="back-btn ctf-back-btn"
          style={{
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid #00FFC8',
            color: '#FFFFFF'
          }}
        >
          ← Back to Home
        </Link>

        {/* === GROUPED BY DIFFICULTY === */}
        <div className="difficulty-wrapper">
          {DIFFICULTY_ORDER.map((level) => {
            const list = challenges.filter((c) => c.difficulty === level);
            if (!list.length) return null;

            return (
              <section key={level} className="difficulty-section">
                <header className="difficulty-header">
                  <div>
                    <h2 className="difficulty-title">
                      {difficultyLabels[level]}
                    </h2>
                    <p className="difficulty-subtitle">
                      {difficultyDescriptions[level]}
                    </p>
                  </div>
                  <span className={`difficulty-badge-pill ${level}`}>
                    {list.length} challenge{list.length > 1 ? "s" : ""}
                  </span>
                </header>

                <div className="difficulty-grid">
                  {list.map((challenge, index) => {
                    const isSolved = challenge.solved;
                    const isJustSolved = justSolvedId === challenge.id;
                    const isWrong = wrongId === challenge.id;

                    return (
                      <article
                        key={challenge.id}
                        className={`ctf-card card-animate ${
                          isSolved ? "solved" : ""
                        } ${isJustSolved ? "just-solved" : ""} ${
                          isWrong ? "shake-card" : ""
                        }`}
                        style={{ animationDelay: `${index * 0.07}s` }}
                      >
                        <div className="ctf-header">
                          <div>
                            <div className="card-status-wrapper">
                              {isSolved && <span className="solved-pill">Solved</span>}
                              <h3 className="challenge-title">{challenge.title}</h3>
                            </div>
                            <div className="category">{challenge.category}</div>
                          </div>
                          <div className="points">{challenge.points} pts</div>
                        </div>

                        <p>{challenge.description}</p>

                        {challenge.hasLink && challenge.externalUrl && (
                          <a 
                            href={challenge.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="challenge-external-link"
                          >
                            🔗 Visit Challenge Site
                          </a>
                        )}

                        {challenge.hasCipherText && challenge.cipherText && (
                          <div className="cipher-text-container">
                            <div className="cipher-label">🔐 Encrypted Message:</div>
                            <div className="cipher-text">
                              {challenge.cipherText}
                            </div>
                          </div>
                        )}

                        {challenge.hasFile && challenge.fileUrl && (
                          <div className="challenge-file-container">
                            <a 
                              href={challenge.fileUrl} 
                              download={challenge.fileName}
                              className="download-file-btn"
                            >
                              📦 Download {challenge.fileName}
                            </a>
                          </div>
                        )}

                        {challenge.hasImage && challenge.imageUrl && (
                          <div className="challenge-image-container">
                            <img 
                              src={challenge.imageUrl} 
                              alt={challenge.title}
                              className="challenge-image"
                            />
                            <a 
                              href={challenge.imageUrl} 
                              download={`${challenge.id}-challenge.jpg`}
                              className="download-image-btn"
                            >
                              📥 Download Image
                            </a>
                          </div>
                        )}

                        {!isSolved && (
                          <div className="flag-section">
                            <input
                              className={`flag-input ${isWrong ? "flag-error" : ""}`}
                              placeholder="CyberLearn{answer}"
                              value={flags[challenge.id] || ""}
                              onChange={(e) =>
                                handleFlagChange(challenge.id, e.target.value)
                              }
                            />
                            <button
                              className={`submit-btn ${
                                isJustSolved ? "btn-success-hit" : ""
                              }`}
                              onClick={() => handleSubmit(challenge)}
                            >
                              Submit Flag
                            </button>
                            {isWrong && (
                              <div className="flag-error-text">
                                Incorrect flag, try again.
                              </div>
                            )}
                          </div>
                        )}

                        {isSolved && (
                          <div className="solved-section">
                            <div className="solved-message">
                              ✅ Challenge completed! 
                              {challenge.solvedDate && (
                                <span className="solved-date">
                                  {new Date(challenge.solvedDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* 
        Easter Egg for those who inspect the source! 
        Old flag from a previous challenge: CyberLearn{Inspect_Element_FTW}
        Keep exploring! 🔍
      */}
        <Footer />
      </div>
    </>
  );
}

export default CTF;
