import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { challengesApi } from '../api/apiService';

const ChallengeContext = createContext();

// ── Static seed challenges (shown while loading, for guests, or when DB is empty) ──
// NOTE: difficulty must be lowercase to match CTF.jsx DIFFICULTY_ORDER ["easy","medium","hard"]
const STATIC_CHALLENGES = [
  {
    id: "base64",
    title: "Base64 Basics",
    category: "Cryptography",
    points: 50,
    difficulty: "easy",
    description: "Decode this message: dof_kpkua_p_ztpsl_ihjr",
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "hidden-html",
    title: "Hidden in Plain Sight",
    category: "OSINT",
    points: 100,
    difficulty: "easy",
    description: "Analyze this satellite image and find the exact coordinates.",
    hasImage: true,
    imageUrl: "/ctf-images/satellite.jpg",
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "cipher-decode",
    title: "Cipher Decode",
    category: "Cryptography",
    points: 75,
    difficulty: "easy",
    description: "Decrypt the encoded message below to find the flag.",
    cipherText: "L/rzkw.qx@.l@hm/qx",
    hasCipherText: true,
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "osint-investigation",
    title: "OSINT Investigation",
    category: "OSINT",
    points: 125,
    difficulty: "medium",
    description: "The investigation begins at: emmatruthseeker.wordpress.com. Password: emmaseekstruth.",
    hasLink: true,
    externalUrl: "https://emmatruthseeker.wordpress.com",
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "crypto-advanced",
    title: "Advanced Cryptography",
    category: "Cryptography",
    points: 250,
    difficulty: "hard",
    description: "Decrypt the encoded message below to find the flag.",
    cipherText: "FUXC2LRAFYWSALJOEAXC4LJNFYWSALJOFUWSALJNFUQC4LRNEAXC4LJNFYWSALROFYXCALRNEAWS4LJOEAWS4LJAFYXC2LJOFUQC2IBOFYXC4IBOFYQC4LRO",
    hasCipherText: true,
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "password-crack",
    title: "Password Cracking Challenge",
    category: "Network Security",
    points: 300,
    difficulty: "hard",
    description: "Download the secret file and crack its password to reveal the flag.",
    hasFile: true,
    fileUrl: "/ctf-images/secret.zip",
    fileName: "secret.zip",
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "social-media-osint",
    title: "Social Media Investigation",
    category: "OSINT",
    points: 150,
    difficulty: "medium",
    description: "Find information about the target using social media platforms.",
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "network-scan",
    title: "Network Reconnaissance",
    category: "Reconnaissance",
    points: 200,
    difficulty: "medium",
    description: "Perform network scanning to identify open ports and services.",
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "web-recon",
    title: "Web Application Recon",
    category: "Reconnaissance",
    points: 175,
    difficulty: "easy",
    description: "Gather information about the target web application.",
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "dns-enum",
    title: "DNS Enumeration",
    category: "Reconnaissance",
    points: 125,
    difficulty: "easy",
    description: "Enumerate DNS records to find subdomains.",
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "wifi-security",
    title: "WiFi Security Analysis",
    category: "Network Security",
    points: 225,
    difficulty: "medium",
    description: "Analyze WiFi security configurations and find vulnerabilities.",
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  },
  {
    id: "hash-cracking",
    title: "Hash Cracking Challenge",
    category: "Cryptography",
    points: 180,
    difficulty: "medium",
    description: "Crack the given hash to reveal the original password.",
    solved: false,
    solvedDate: null,
    hints: [],
    attachments: []
  }
];

// ── Normalise a backend challenge doc to the shape CTF.jsx expects ──
function normaliseChallenge(apiChallenge) {
  const diff = apiChallenge.difficulty || 'Easy';
  // CTF.jsx uses lowercase difficulty for grouping
  const diffLower = diff.toLowerCase();

  return {
    // Use MongoDB _id as id if present, otherwise keep existing id
    id: apiChallenge._id || apiChallenge.id,
    title: apiChallenge.title,
    category: apiChallenge.category,
    points: apiChallenge.points,
    difficulty: diffLower,
    description: apiChallenge.description,
    solved: apiChallenge.solved || false,
    solvedDate: apiChallenge.solved ? (apiChallenge.solvedAt || new Date().toISOString()) : null,
    hints: (apiChallenge.hints || []).map((h, idx) => ({
      index: idx,
      cost: h.cost,
      isUnlocked: h.isUnlocked || false,
      text: h.text || null
    })),
    attachments: apiChallenge.attachments || [],
    // Preserve extra display fields
    cipherText: apiChallenge.cipherText || null,
    hasCipherText: !!apiChallenge.cipherText,
    imageUrl: apiChallenge.imageUrl || null,
    hasImage: !!apiChallenge.imageUrl,
    externalUrl: apiChallenge.externalUrl || null,
    hasLink: !!apiChallenge.externalUrl,
    // File attachments from the attachments array
    hasFile: (apiChallenge.attachments || []).some(a => a.type === 'file'),
    fileUrl: (apiChallenge.attachments || []).find(a => a.type === 'file')?.url || null,
    fileName: (apiChallenge.attachments || []).find(a => a.type === 'file')?.name || null,
    solveCount: apiChallenge.solveCount || 0
  };
}

export function ChallengeProvider({ children }) {
  const { user } = useAuth();
  const isDev = import.meta.env.DEV;

  // ── State ────────────────────────────────────────────────────
  const [challenges, setChallenges] = useState(STATIC_CHALLENGES);
  const [recentActivity, setRecentActivity] = useState([]);
  const [gamification, setGamification] = useState({
    xp: 0,
    coins: 0,
    level: 1,
    levelInfo: null,
    achievements: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Track whether we are using real API data
  const usingApiRef = useRef(false);

  // ── Load challenges from backend ─────────────────────────────
  const loadChallenges = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await challengesApi.getAll();
      if (Array.isArray(data) && data.length > 0) {
        // Backend has challenges — use them
        const normalised = data.map(normaliseChallenge);
        setChallenges(normalised);
        usingApiRef.current = true;
        if (isDev) console.log(`ChallengeContext: loaded ${normalised.length} challenges from API`);
      } else {
        // API responded successfully but DB is empty — use static fallback
        // This is expected until challenges are seeded into the database
        if (isDev) console.info('ChallengeContext: API returned 0 published challenges — using static fallback. Run the seed script to populate the database.');
        setChallenges(STATIC_CHALLENGES);
        usingApiRef.current = false;
      }
    } catch (err) {
      // API unreachable or auth failed — use static fallback
      if (isDev) console.warn('ChallengeContext: API call failed, using static fallback.', err.message);
      setChallenges(STATIC_CHALLENGES);
      usingApiRef.current = false;
    } finally {
      setIsLoading(false);
    }
  }, [isDev]);

  // ── Load user progress from backend ─────────────────────────
  const loadProgress = useCallback(async () => {
    if (!user) return;
    try {
      const progress = await challengesApi.getMyProgress();
      setGamification({
        xp: progress.xp || 0,
        coins: progress.coins || 0,
        level: progress.level || 1,
        levelInfo: progress.levelInfo || null,
        achievements: progress.achievements || []
      });
      // Enrich recentActivity from solved challenges list
      if (progress.solvedChallenges?.length > 0) {
        const activities = progress.solvedChallenges
          .slice(0, 10)
          .map(sc => ({
            id: sc.id || sc.solvedAt,
            action: 'Completed',
            item: sc.title || 'Challenge',
            time: sc.solvedAt ? new Date(sc.solvedAt).toLocaleDateString() : 'Recently',
            timestamp: sc.solvedAt,
            icon: '✅',
            points: sc.xpEarned || sc.points || 0
          }));
        setRecentActivity(activities);
      }
    } catch (err) {
      if (isDev) console.warn('ChallengeContext: progress load failed.', err.message);
    }
  }, [user, isDev]);

  // ── Initial load ─────────────────────────────────────────────
  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // ── solveChallenge — submits to backend, falls back to local ─
  const solveChallenge = useCallback(async (challengeId, flag) => {
    // If we're using backend challenges, submit via API
    if (usingApiRef.current && user) {
      try {
        const result = await challengesApi.submitFlag(challengeId, flag);

        if (result.correct) {
          const now = new Date().toISOString();

          // Mark solved locally for instant UI feedback
          setChallenges(prev =>
            prev.map(c =>
              c.id === challengeId ? { ...c, solved: true, solvedDate: now } : c
            )
          );

          // Update gamification state
          if (result.rewards) {
            setGamification(prev => ({
              ...prev,
              xp: (prev.xp || 0) + (result.rewards.xp || 0),
              coins: (prev.coins || 0) + (result.rewards.coins || 0),
              level: result.levelInfo?.level || prev.level,
              levelInfo: result.levelInfo || prev.levelInfo,
              achievements: result.newAchievements?.length
                ? [...prev.achievements, ...result.newAchievements]
                : prev.achievements
            }));
          }

          // Add to activity
          const challenge = challenges.find(c => c.id === challengeId);
          if (challenge) {
            const activity = {
              id: Date.now(),
              action: 'Completed',
              item: challenge.title,
              time: 'Just now',
              timestamp: now,
              icon: '✅',
              points: result.rewards?.xp || challenge.points
            };
            setRecentActivity(prev => [activity, ...prev.slice(0, 9)]);
          }

          return { success: true, ...result };
        }

        return { success: false, correct: false, message: result.message || 'Incorrect flag.' };
      } catch (err) {
        if (isDev) console.error('Flag submit error:', err.message);
        return { success: false, correct: false, message: 'Submission failed. Please try again.' };
      }
    }

    // ── Static fallback for guests / when API is unavailable ──
    const STATIC_FLAGS = {
      "base64": "CyberLearn{why_didnt_i_smile_back}",
      "hidden-html": "CyberLearn{55.7963°N_49.1088°E}",
      "cipher-decode": "CyberLearn{S0meth1ng_1s_wr0ng}",
      "osint-investigation": "CyberLearn{cityscape}",
      "crypto-advanced": "CyberLearn{can_you_hack_this}",
      "password-crack": "CyberLearn{liberty}",
      "social-media-osint": "CyberLearn{digital_footprint}",
      "network-scan": "CyberLearn{port_22_open}",
      "web-recon": "CyberLearn{robots_txt_found}",
      "dns-enum": "CyberLearn{subdomain_discovered}",
      "wifi-security": "CyberLearn{wpa2_cracked}",
      "hash-cracking": "CyberLearn{rainbow_tables}"
    };

    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return { success: false, correct: false };

    if (flag.trim() === STATIC_FLAGS[challengeId]) {
      const now = new Date().toISOString();
      setChallenges(prev =>
        prev.map(c =>
          c.id === challengeId ? { ...c, solved: true, solvedDate: now } : c
        )
      );
      const activity = {
        id: Date.now(),
        action: 'Completed',
        item: challenge.title,
        time: 'Just now',
        timestamp: now,
        icon: '✅',
        points: challenge.points
      };
      setRecentActivity(prev => [activity, ...prev.slice(0, 9)]);
      return { success: true, correct: true };
    }

    return { success: false, correct: false };
  }, [challenges, user, isDev]);

  // ── Unlock hint ──────────────────────────────────────────────
  const unlockHint = useCallback(async (challengeId, hintIndex) => {
    if (!user) {
      return { success: false, message: 'You must be logged in to unlock hints.' };
    }
    try {
      const result = await challengesApi.unlockHint(challengeId, hintIndex);

      // Update coins in gamification state
      setGamification(prev => ({
        ...prev,
        coins: result.remainingCoins !== undefined ? result.remainingCoins : prev.coins
      }));

      // Update the local hint state
      setChallenges(prev =>
        prev.map(c => {
          if (c.id !== challengeId) return c;
          const updatedHints = (c.hints || []).map((h, idx) =>
            idx === hintIndex ? { ...h, isUnlocked: true, text: result.hint } : h
          );
          return { ...c, hints: updatedHints };
        })
      );

      return { success: true, hint: result.hint, remainingCoins: result.remainingCoins };
    } catch (err) {
      return { success: false, message: err.message || 'Failed to unlock hint.' };
    }
  }, [user]);

  // ── getStats — same interface as old context ─────────────────
  const getStats = useCallback(() => {
    const solved = challenges.filter(c => c.solved);
    const totalPoints = solved.reduce((sum, c) => sum + c.points, 0);
    // Use backend XP if available, otherwise fall back to points
    const xp = gamification.xp || totalPoints;
    const streak = calculateStreak(recentActivity);

    return {
      totalPoints: xp,
      solvedCount: solved.length,
      streak,
      totalChallenges: challenges.length,
      coins: gamification.coins || 0,
      level: gamification.level || 1,
      achievements: gamification.achievements || []
    };
  }, [challenges, gamification, recentActivity]);

  // ── getLevelInfo — same interface as old context ─────────────
  const getLevelInfo = useCallback(() => {
    if (gamification.levelInfo) {
      return {
        level: gamification.levelInfo.level,
        title: gamification.levelInfo.title,
        currentLevelPoints: gamification.levelInfo.xpInLevel,
        nextLevelPoints: gamification.levelInfo.xpNeeded,
        progress: gamification.levelInfo.progress,
        xpToNextLevel: gamification.levelInfo.xpToNextLevel
      };
    }
    // Local fallback calculation
    const { totalPoints } = getStats();
    const level = Math.floor(totalPoints / 100) + 1;
    const currentLevelPoints = totalPoints % 100;
    const nextLevelPoints = 100;
    const progress = (currentLevelPoints / nextLevelPoints) * 100;
    const levelTitles = {
      1: 'Cyber Beginner', 2: 'Script Kiddie', 3: 'Recon Cadet',
      4: 'Security Student', 5: 'Junior Analyst', 6: 'CTF Enthusiast',
      7: 'Web Hunter', 8: 'Exploit Developer'
    };
    return {
      level,
      title: levelTitles[level] || 'Cyber Legend',
      currentLevelPoints,
      nextLevelPoints,
      progress,
      xpToNextLevel: nextLevelPoints - currentLevelPoints
    };
  }, [gamification, getStats]);

  // ── resetProgress — clear local state ────────────────────────
  const resetProgress = useCallback(() => {
    setChallenges(STATIC_CHALLENGES);
    setRecentActivity([]);
    setGamification({ xp: 0, coins: 0, level: 1, levelInfo: null, achievements: [] });
  }, []);

  // ── Reload from API ──────────────────────────────────────────
  const refreshChallenges = useCallback(() => {
    loadChallenges();
    loadProgress();
  }, [loadChallenges, loadProgress]);

  const value = {
    challenges,
    recentActivity,
    gamification,
    isLoading,
    error,
    solveChallenge,
    unlockHint,
    resetProgress,
    refreshChallenges,
    getStats,
    getLevelInfo
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}

function calculateStreak(activities) {
  if (activities.length === 0) return 0;
  const today = new Date();
  const recentDays = new Set();
  activities.forEach(activity => {
    const activityDate = new Date(activity.timestamp);
    const daysDiff = Math.floor((today - activityDate) / (1000 * 60 * 60 * 24));
    if (daysDiff <= 7) recentDays.add(daysDiff);
  });
  return Math.min(recentDays.size, 7);
}

export function useChallenges() {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
}
