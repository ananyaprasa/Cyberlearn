/**
 * Gamification utility
 * Central place for XP/coin/level/achievement logic.
 * Keep all thresholds here so they're easy to tune.
 */

// ── Level thresholds (total XP required to reach this level) ──
const LEVEL_THRESHOLDS = [
  0,    // Level 1
  100,  // Level 2
  250,  // Level 3
  500,  // Level 4
  850,  // Level 5
  1300, // Level 6
  1900, // Level 7
  2650, // Level 8
  3600, // Level 9
  5000, // Level 10
  7000, // Level 11
  9500, // Level 12
  12500,// Level 13
  16000,// Level 14
  20000,// Level 15
  25000,// Level 16
  31000,// Level 17
  38000,// Level 18
  46000,// Level 19
  55000 // Level 20
];

const LEVEL_TITLES = [
  'Cyber Beginner',      // 1
  'Script Kiddie',       // 2
  'Recon Cadet',         // 3
  'Security Student',    // 4
  'Network Scout',       // 5
  'Junior Analyst',      // 6
  'CTF Enthusiast',      // 7
  'Web Hunter',          // 8
  'Exploit Developer',   // 9
  'Junior Pentester',    // 10
  'Security Analyst',    // 11
  'Threat Hunter',       // 12
  'Red Team Cadet',      // 13
  'Vulnerability Researcher', // 14
  'Red Team Operator',   // 15
  'Senior Analyst',      // 16
  'Offensive Engineer',  // 17
  'Cyber Specialist',    // 18
  'Red Team Elite',      // 19
  'Cyber Expert'         // 20
];

/**
 * Calculate level from total XP
 */
export function calculateLevel(totalXp) {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  return Math.min(level, LEVEL_THRESHOLDS.length);
}

/**
 * Get XP progress info for current level
 */
export function getLevelProgress(totalXp) {
  const level = calculateLevel(totalXp);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[level - 1];
  const xpInLevel = totalXp - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;
  const progress = xpNeeded > 0 ? Math.round((xpInLevel / xpNeeded) * 100) : 100;

  return {
    level,
    title: LEVEL_TITLES[level - 1] || 'Cyber Legend',
    currentXp: totalXp,
    xpInLevel,
    xpNeeded,
    progress: Math.min(progress, 100),
    nextLevel: level < LEVEL_THRESHOLDS.length ? level + 1 : null,
    nextLevelTitle: LEVEL_TITLES[level] || null,
    xpToNextLevel: xpNeeded - xpInLevel
  };
}

// ── Achievement definitions ────────────────────────────────────
export const ACHIEVEMENTS = {
  FIRST_BLOOD: {
    id: 'first_blood',
    title: 'First Blood',
    description: 'Solve your first CTF challenge',
    icon: '🩸'
  },
  CRYPTO_MASTER: {
    id: 'crypto_master',
    title: 'Crypto Master',
    description: 'Solve 3 Cryptography challenges',
    icon: '🔐'
  },
  RECON_EXPERT: {
    id: 'recon_expert',
    title: 'Recon Expert',
    description: 'Solve 3 Reconnaissance challenges',
    icon: '🔭'
  },
  OSINT_ANALYST: {
    id: 'osint_analyst',
    title: 'OSINT Analyst',
    description: 'Solve 3 OSINT challenges',
    icon: '🕵️'
  },
  WEB_HUNTER: {
    id: 'web_hunter',
    title: 'Web Hunter',
    description: 'Solve 3 Web Security challenges',
    icon: '🌐'
  },
  SOLVER_5: {
    id: 'solver_5',
    title: 'Solver',
    description: 'Solve 5 challenges',
    icon: '⭐'
  },
  SOLVER_10: {
    id: 'solver_10',
    title: 'Hacker',
    description: 'Solve 10 challenges',
    icon: '💻'
  },
  SOLVER_25: {
    id: 'solver_25',
    title: 'Elite Hacker',
    description: 'Solve 25 challenges',
    icon: '🏆'
  },
  LEVEL_5: {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⬆️'
  },
  LEVEL_10: {
    id: 'level_10',
    title: 'Junior Pentester',
    description: 'Reach level 10',
    icon: '🎯'
  },
  HINT_SAVER: {
    id: 'hint_saver',
    title: 'No Hints Needed',
    description: 'Solve a challenge without using any hints',
    icon: '🧠'
  }
};

/**
 * Evaluate which achievements a user should unlock after a CTF solve.
 * Returns array of newly unlocked achievement objects.
 *
 * @param {Object} user - Mongoose user document (with solvedChallenges, achievements, xp, level)
 * @param {Object} challenge - The challenge just solved
 * @param {Boolean} usedHints - Whether the user unlocked any hints for this challenge
 * @param {Array} allSolvedChallenges - Populated solved challenge docs for category checks
 */
export function evaluateAchievements(user, challenge, usedHints, allSolvedChallenges) {
  const existing = new Set(user.achievements.map(a => a.id));
  const newAchievements = [];

  const totalSolved = user.solvedChallenges.length;
  const newLevel = calculateLevel(user.xp);

  // Count solved challenges by category
  const categoryCount = {};
  for (const sc of allSolvedChallenges) {
    const cat = sc.category;
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  }

  const check = (achievement, condition) => {
    if (!existing.has(achievement.id) && condition) {
      newAchievements.push({ ...achievement, unlockedAt: new Date() });
    }
  };

  check(ACHIEVEMENTS.FIRST_BLOOD, totalSolved === 1);
  check(ACHIEVEMENTS.SOLVER_5, totalSolved >= 5);
  check(ACHIEVEMENTS.SOLVER_10, totalSolved >= 10);
  check(ACHIEVEMENTS.SOLVER_25, totalSolved >= 25);
  check(ACHIEVEMENTS.CRYPTO_MASTER, (categoryCount['Cryptography'] || 0) >= 3);
  check(ACHIEVEMENTS.RECON_EXPERT, (categoryCount['Reconnaissance'] || 0) >= 3);
  check(ACHIEVEMENTS.OSINT_ANALYST, (categoryCount['OSINT'] || 0) >= 3);
  check(ACHIEVEMENTS.WEB_HUNTER, (categoryCount['Web Security'] || 0) >= 3);
  check(ACHIEVEMENTS.HINT_SAVER, !usedHints);
  check(ACHIEVEMENTS.LEVEL_5, newLevel >= 5);
  check(ACHIEVEMENTS.LEVEL_10, newLevel >= 10);

  return newAchievements;
}

/**
 * Calculate default rewards for a challenge if not explicitly set.
 */
export function getDefaultRewards(challenge) {
  const xp = challenge.xpReward !== null && challenge.xpReward !== undefined
    ? challenge.xpReward
    : challenge.points;

  const coins = challenge.coinsReward !== null && challenge.coinsReward !== undefined
    ? challenge.coinsReward
    : Math.max(5, Math.floor(challenge.points / 10));

  return { xp, coins };
}
