import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useChallenges } from '../contexts/ChallengeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CryptographyIcon } from '../components/CryptographyIcon';
import { ReconIcon } from '../components/ReconIcon';
import './Dashboard.css';

/* ─── Static Data ───────────────────────────────────── */
// Learning domains will be calculated dynamically from challenges

const ACHIEVEMENTS_CONFIG = [
  { id: 1, name: 'First Blood',       description: 'Solve your first CTF',              icon: '🩸', requirement: 1   },
  { id: 2, name: 'Crypto Novice',     description: 'Solve 3 cryptography challenges',   icon: <CryptographyIcon size={32} />, requirement: 3   },
  { id: 3, name: 'Point Collector',   description: 'Earn 200 points',                   icon: '💎', requirement: 200 },
  { id: 4, name: 'Challenge Master',  description: 'Solve 5 challenges',                icon: '⚡', requirement: 5   },
  { id: 5, name: 'Persistent',        description: 'Maintain a 3-day streak',           icon: '🔥', requirement: 3   },
];

/* ─── Helpers ───────────────────────────────────────── */
function animateValue(start, end, duration, callback) {
  const startTime = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    callback(Math.floor(start + (end - start) * progress));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ─── Component ─────────────────────────────────────── */
function Dashboard() {
  const { challenges, recentActivity, getStats, getLevelInfo } = useChallenges();

  const stats     = getStats();
  const levelInfo = getLevelInfo();

  const [animatedStats, setAnimatedStats] = useState({
    totalPoints: 0,
    solvedCTFs:  0,
    streak:      0,
  });

  // ── Animate counters when stats change ──
  useEffect(() => {
    const delays = [
      [animatedStats.totalPoints, stats.totalPoints, 1000, 'totalPoints', 200],
      [animatedStats.solvedCTFs,  stats.solvedCount,  800, 'solvedCTFs',  400],
      [animatedStats.streak,      stats.streak,        600, 'streak',      600],
    ];

    delays.forEach(([from, to, dur, key, delay]) => {
      setTimeout(() => {
        animateValue(from, to, dur, (val) =>
          setAnimatedStats((prev) => ({ ...prev, [key]: val }))
        );
      }, delay);
    });
  }, [stats.totalPoints, stats.solvedCount, stats.streak]);

  // ── Derived data ──
  const solvedChallenges   = challenges.filter((c) => c.solved).sort((a, b) => new Date(b.solvedDate) - new Date(a.solvedDate));
  const unsolvedChallenges = challenges.filter((c) => !c.solved).slice(0, 5);

  // Calculate learning domains dynamically from challenges
  const learningDomains = ['OSINT', 'Cryptography', 'Network Security', 'Reconnaissance'];
  const updatedDomains = learningDomains.map((domainName) => {
    const domainChallenges = challenges.filter((c) => c.category === domainName);
    const completed        = domainChallenges.filter((c) => c.solved).length;
    const total            = domainChallenges.length;
    const progress         = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { name: domainName, completed, total, progress };
  });

  const unlockedAchievements = ACHIEVEMENTS_CONFIG.map((achievement) => {
    let unlocked = false;
    if (achievement.id === 1) unlocked = stats.solvedCount >= 1;
    else if (achievement.id === 2) unlocked = challenges.filter((c) => c.category === 'Cryptography' && c.solved).length >= 3;
    else if (achievement.id === 3) unlocked = stats.totalPoints >= 200;
    else if (achievement.id === 4) unlocked = stats.solvedCount >= 5;
    else if (achievement.id === 5) unlocked = stats.streak >= 3;
    return { ...achievement, unlocked };
  });

  // ── Handlers ──

  /* ── Render ── */
  return (
    <>
      <Navbar />

      <div className="dashboard">

        {/* Header */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Track your cybersecurity learning progress</p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="stats-row">
          <div className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Shimmer overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "shimmer-move 3s linear infinite",
                pointerEvents: "none",
              }}
            />
            {/* Scanline */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 60,
                background: "linear-gradient(180deg, transparent, rgba(255,255,255,.025), transparent)",
                animation: "scan-move 5s linear infinite",
                pointerEvents: "none",
              }}
            />
            <span className="label">Total Points</span>
            <div className="stat-value">{animatedStats.totalPoints}</div>
            <div className="stat-change">
              {stats.totalPoints > 0 ? `+${Math.min(stats.totalPoints, 50)} this week` : 'No points yet'}
            </div>
          </div>

          <div className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Shimmer overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "shimmer-move 3s linear infinite",
                pointerEvents: "none",
              }}
            />
            {/* Scanline */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 60,
                background: "linear-gradient(180deg, transparent, rgba(255,255,255,.025), transparent)",
                animation: "scan-move 5s linear infinite",
                pointerEvents: "none",
              }}
            />
            <span className="label">CTFs Solved</span>
            <div className="stat-value">{animatedStats.solvedCTFs}</div>
            <div className="stat-change">{stats.solvedCount} / {stats.totalChallenges} total</div>
          </div>

          <div className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Shimmer overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "shimmer-move 3s linear infinite",
                pointerEvents: "none",
              }}
            />
            {/* Scanline */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 60,
                background: "linear-gradient(180deg, transparent, rgba(255,255,255,.025), transparent)",
                animation: "scan-move 5s linear infinite",
                pointerEvents: "none",
              }}
            />
            <span className="label">Current Streak</span>
            <div className="stat-value">{animatedStats.streak}</div>
            <div className="stat-change">
              {stats.streak > 0 ? '🔥 Keep it up!' : 'Start your streak!'}
            </div>
          </div>
        </div>

        {/* ── Level Progress ── */}
        <div className="level-card">
          <div className="level-header">
            <div className="level-info">
              <span className="level-title">Level {levelInfo.level} — {levelInfo.title}</span>
              <span className="level-subtitle">
                {levelInfo.currentLevelPoints} / {levelInfo.nextLevelPoints} XP to next level
              </span>
            </div>
            <div className="level-badge">LVL {levelInfo.level}</div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${levelInfo.progress}%` }} />
          </div>
        </div>

        {/* ── Main Grid: Table + Domain Progress ── */}
        <div className="dashboard-grid">

          <div className="table-card">
            <div className="card-header">
              <h3>Recent Completions</h3>
              <Link to="/ctf" className="view-all-link">View All CTFs →</Link>
            </div>
            <div className="table-wrapper">
              {solvedChallenges.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Challenge</th>
                      <th>Category</th>
                      <th>Difficulty</th>
                      <th>Points</th>
                      <th>Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solvedChallenges.slice(0, 5).map((c) => (
                      <tr key={c.id}>
                        <td className="challenge-name">{c.title}</td>
                        <td className="category">{c.category}</td>
                        <td>
                          <span className={`difficulty-chip ${c.difficulty}`}>{c.difficulty}</span>
                        </td>
                        <td className="points">+{c.points}</td>
                        <td className="date">
                          {c.solvedDate ? new Date(c.solvedDate).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon"><ReconIcon size={64} /></div>
                  <p>No challenges completed yet</p>
                  <Link to="/ctf" className="cta-button">Start Your First Challenge</Link>
                </div>
              )}
            </div>
          </div>

          <div className="progress-card">
            <h3>Learning Progress</h3>
            <div className="domain-progress-list">
              {updatedDomains.map((domain) => (
                <div key={domain.name} className="domain-progress-item">
                  <div className="domain-header">
                    <span className="domain-name">{domain.name}</span>
                    <span className="domain-stats">{domain.completed}/{domain.total}</span>
                  </div>
                  <div className="domain-progress-bar">
                    <div className="domain-progress-fill" style={{ width: `${domain.progress}%` }} />
                  </div>
                  <div className="domain-percentage">{domain.progress}%</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom Row: Activity + Recommended ── */}
        <div className="bottom-row">

          <div className="activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.length > 0 ? (
                recentActivity.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <div className="activity-text">
                        <span className="activity-action">{activity.action}</span>
                        <span className="activity-item-name">{activity.item}</span>
                      </div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No recent activity</p>
                  <Link to="/ctf" className="cta-button">Start Learning</Link>
                </div>
              )}
            </div>
          </div>

          <div className="next-card">
            <h3>Recommended Challenges</h3>
            <div className="next-challenges-list">
              {unsolvedChallenges.map((c) => (
                <div key={c.id} className="next-challenge-item">
                  <div className="challenge-info">
                    <div className="challenge-title">{c.title}</div>
                    <div className="challenge-meta">
                      <span className="challenge-category">{c.category}</span>
                      <span className={`difficulty-chip ${c.difficulty}`}>{c.difficulty}</span>
                    </div>
                  </div>
                  <div className="challenge-points">+{c.points}</div>
                </div>
              ))}
            </div>
            <Link to="/ctf" className="view-all-challenges">View All Challenges →</Link>
          </div>

        </div>

        {/* ── Achievements ── */}
        <div className="achievements-card">
          <h3>Achievements</h3>
          <div className="achievements-grid">
            {unlockedAchievements.map((a) => (
              <div key={a.id} className={`achievement-item ${a.unlocked ? 'unlocked' : 'locked'}`}>
                <div className="achievement-icon">{a.icon}</div>
                <div className="achievement-info">
                  <div className="achievement-name">{a.name}</div>
                  <div className="achievement-description">{a.description}</div>
                </div>
                {a.unlocked && <div className="achievement-badge">✓</div>}
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;