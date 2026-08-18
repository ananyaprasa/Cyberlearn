import mongoose from "mongoose";
import Challenge from "../models/Challenge.js";
import ChallengeSubmission from "../models/ChallengeSubmission.js";
import User from "../models/User.js";
import {
  calculateLevel,
  getLevelProgress,
  evaluateAchievements,
  getDefaultRewards
} from "../utils/gamification.js";

// ── Helpers ────────────────────────────────────────────────────

/** Strip the flagHash from a challenge document for safe API responses */
function safeChallenge(ch, solvedIds = [], unlockedHints = []) {
  const obj = ch.toObject ? ch.toObject() : { ...ch };
  delete obj.flagHash;
  obj.id = obj._id?.toString();

  const challengeId = obj._id?.toString() || obj.id;

  // Mask hint text for hints not yet unlocked
  if (obj.hints && obj.hints.length > 0) {
    obj.hints = obj.hints.map((hint, idx) => {
      const isUnlocked = unlockedHints.some(
        uh => uh.challenge?.toString() === challengeId && uh.hintIndex === idx
      );
      return {
        cost: hint.cost,
        isUnlocked,
        text: isUnlocked ? hint.text : null
      };
    });
  }

  obj.solved = solvedIds.includes(challengeId);
  return obj;
}

// ── GET /api/challenges — List published challenges ────────────
export const getChallenges = async (req, res) => {
  try {
    const { category, difficulty } = req.query;

    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const challenges = await Challenge.find(filter)
      .select('-flagHash')
      .sort({ difficulty: 1, points: 1, createdAt: -1 });

    // Personalise solved/hint state if user is authenticated
    let solvedIds = [];
    let unlockedHints = [];
    if (req.user) {
      const user = await User.findById(req.user._id).select('solvedChallenges unlockedHints');
      solvedIds = (user.solvedChallenges || []).map(sc => sc.challenge?.toString());
      unlockedHints = user.unlockedHints || [];
    }

    const data = challenges.map(ch => safeChallenge(ch, solvedIds, unlockedHints));

    res.json({ success: true, data });
  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/challenges/:id — Single challenge ─────────────────
export const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findOne({
      _id: req.params.id,
      isPublished: true
    }).select('-flagHash');

    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    let solvedIds = [];
    let unlockedHints = [];
    if (req.user) {
      const user = await User.findById(req.user._id).select('solvedChallenges unlockedHints');
      solvedIds = (user.solvedChallenges || []).map(sc => sc.challenge?.toString());
      unlockedHints = user.unlockedHints || [];
    }

    res.json({ success: true, data: safeChallenge(challenge, solvedIds, unlockedHints) });
  } catch (error) {
    console.error('Get challenge by id error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── POST /api/challenges — Create challenge (teacher/admin) ────
export const createChallenge = async (req, res) => {
  try {
    const {
      title, description, category, difficulty, points,
      xpReward, coinsReward, flag,
      hints, attachments, cipherText, imageUrl, externalUrl,
      solutionExplanation, isPublished
    } = req.body;

    if (!flag || !flag.trim()) {
      return res.status(400).json({ success: false, message: 'Flag is required' });
    }

    const flagHash = await Challenge.hashFlag(flag);

    const challenge = await Challenge.create({
      title,
      description,
      category,
      difficulty,
      points,
      xpReward: xpReward ?? null,
      coinsReward: coinsReward ?? null,
      flagHash,
      hints: hints || [],
      attachments: attachments || [],
      cipherText: cipherText || null,
      imageUrl: imageUrl || null,
      externalUrl: externalUrl || null,
      solutionExplanation: solutionExplanation || null,
      isPublished: isPublished || false,
      createdBy: req.user?._id || null
    });

    const safe = challenge.toObject();
    delete safe.flagHash;
    safe.id = safe._id.toString();

    res.status(201).json({ success: true, data: safe });
  } catch (error) {
    console.error('Create challenge error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── PUT /api/challenges/:id — Update challenge (teacher/admin) ─
export const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).select('+flagHash');
    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    // Ownership check (admins can edit any)
    if (req.user.role !== 'admin' &&
        challenge.createdBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const allowedFields = [
      'title', 'description', 'category', 'difficulty', 'points',
      'xpReward', 'coinsReward', 'hints', 'attachments',
      'cipherText', 'imageUrl', 'externalUrl',
      'solutionExplanation', 'isPublished'
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        challenge[field] = req.body[field];
      }
    }

    // Re-hash flag only if a new one was provided
    if (req.body.flag && req.body.flag.trim()) {
      challenge.flagHash = await Challenge.hashFlag(req.body.flag);
    }

    await challenge.save();

    const safe = challenge.toObject();
    delete safe.flagHash;
    safe.id = safe._id.toString();

    res.json({ success: true, data: safe });
  } catch (error) {
    console.error('Update challenge error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── DELETE /api/challenges/:id — Delete challenge (teacher/admin) ─
export const deleteChallenge = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const challenge = await Challenge.findById(req.params.id).session(session);
      if (!challenge) throw Object.assign(new Error('Challenge not found'), { status: 404 });

      if (req.user.role !== 'admin' &&
          challenge.createdBy?.toString() !== req.user._id.toString()) {
        throw Object.assign(new Error('Forbidden'), { status: 403 });
      }

      await ChallengeSubmission.deleteMany({ challenge: challenge._id }, { session });
      await Challenge.findByIdAndDelete(challenge._id, { session });

      res.json({ success: true, data: { message: 'Challenge deleted' } });
    });
  } catch (error) {
    console.error('Delete challenge error:', error);
    res.status(error.status || 500).json({ success: false, message: error.message });
  } finally {
    await session.endSession();
  }
};

// ── PATCH /api/challenges/:id/publish — Toggle publish ─────────
export const togglePublish = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }
    challenge.isPublished = !challenge.isPublished;
    await challenge.save();

    const safe = challenge.toObject();
    delete safe.flagHash;
    safe.id = safe._id.toString();

    res.json({ success: true, data: safe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── POST /api/challenges/:id/submit — Submit a flag ───────────
export const submitFlag = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const { flag } = req.body;
      if (!flag || !flag.trim()) {
        throw Object.assign(new Error('Flag is required'), { status: 400 });
      }

      const challenge = await Challenge.findOne({
        _id: req.params.id,
        isPublished: true
      }).session(session);

      if (!challenge) {
        throw Object.assign(new Error('Challenge not found'), { status: 404 });
      }

      const user = await User.findById(req.user._id).session(session);
      if (!user) {
        throw Object.assign(new Error('User not found'), { status: 404 });
      }

      // Check already solved
      const alreadySolved = user.solvedChallenges.some(
        sc => sc.challenge?.toString() === challenge._id.toString()
      );
      if (alreadySolved) {
        return res.json({
          success: true,
          data: { correct: true, alreadySolved: true, message: 'Already solved!' }
        });
      }

      // Count previous attempts
      const attemptCount = await ChallengeSubmission.countDocuments({
        challenge: challenge._id,
        user: user._id
      }).session(session);

      // Validate the flag
      const isCorrect = await challenge.validateFlag(flag);

      // Record this attempt
      await ChallengeSubmission.create([{
        challenge: challenge._id,
        user: user._id,
        isCorrect,
        attemptNumber: attemptCount + 1,
        solvedAt: isCorrect ? new Date() : null,
        xpEarned: 0,
        coinsEarned: 0
      }], { session });

      if (!isCorrect) {
        return res.json({
          success: true,
          data: {
            correct: false,
            message: 'Incorrect flag, try again.',
            attempts: attemptCount + 1
          }
        });
      }

      // ── Award rewards ─────────────────────────────────────────
      const { xp, coins } = getDefaultRewards(challenge);

      // Check if any hints were used for this challenge
      const usedHints = user.unlockedHints.some(
        uh => uh.challenge?.toString() === challenge._id.toString()
      );

      // Update user: add xp, coins, solved challenge entry, recalculate level
      user.xp = (user.xp || 0) + xp;
      user.coins = (user.coins || 0) + coins;
      user.level = calculateLevel(user.xp);
      user.solvedChallenges.push({
        challenge: challenge._id,
        solvedAt: new Date(),
        xpEarned: xp,
        coinsEarned: coins
      });

      // Fetch solved challenge docs for achievement evaluation
      const allSolvedChallenges = await Challenge.find({
        _id: { $in: user.solvedChallenges.map(sc => sc.challenge) }
      }).select('category').session(session);

      const newAchievements = evaluateAchievements(user, challenge, usedHints, allSolvedChallenges);
      if (newAchievements.length > 0) {
        user.achievements.push(...newAchievements);
      }

      await user.save({ session });

      // Update challenge solve counter
      await Challenge.findByIdAndUpdate(
        challenge._id,
        { $inc: { solveCount: 1 } },
        { session }
      );

      // Update the submission with actual rewards
      await ChallengeSubmission.findOneAndUpdate(
        { challenge: challenge._id, user: user._id, isCorrect: true },
        { xpEarned: xp, coinsEarned: coins },
        { session }
      );

      const levelInfo = getLevelProgress(user.xp);

      res.json({
        success: true,
        data: {
          correct: true,
          alreadySolved: false,
          message: 'Correct flag! Well done.',
          rewards: { xp, coins },
          newAchievements,
          levelInfo,
          // Return solution explanation now that it's solved
          solutionExplanation: challenge.solutionExplanation
        }
      });
    });
  } catch (error) {
    console.error('Submit flag error:', error);
    res.status(error.status || 500).json({ success: false, message: error.message });
  } finally {
    await session.endSession();
  }
};

// ── POST /api/challenges/:id/hints/:hintIndex — Unlock a hint ──
export const unlockHint = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const hintIndex = parseInt(req.params.hintIndex, 10);
      if (isNaN(hintIndex) || hintIndex < 0) {
        throw Object.assign(new Error('Invalid hint index'), { status: 400 });
      }

      const challenge = await Challenge.findOne({
        _id: req.params.id,
        isPublished: true
      }).session(session);

      if (!challenge) {
        throw Object.assign(new Error('Challenge not found'), { status: 404 });
      }

      if (!challenge.hints[hintIndex]) {
        throw Object.assign(new Error('Hint not found'), { status: 404 });
      }

      const hint = challenge.hints[hintIndex];

      const user = await User.findById(req.user._id).session(session);
      if (!user) {
        throw Object.assign(new Error('User not found'), { status: 404 });
      }

      // Already unlocked? Return the hint without charging
      const alreadyUnlocked = user.unlockedHints.some(
        uh =>
          uh.challenge?.toString() === challenge._id.toString() &&
          uh.hintIndex === hintIndex
      );

      if (alreadyUnlocked) {
        return res.json({
          success: true,
          data: {
            hint: hint.text,
            cost: 0,
            alreadyUnlocked: true,
            remainingCoins: user.coins
          }
        });
      }

      // Check sufficient coins
      if (user.coins < hint.cost) {
        throw Object.assign(
          new Error(`Not enough coins. Need ${hint.cost}, have ${user.coins}.`),
          { status: 402 }
        );
      }

      // Deduct coins and record unlock
      user.coins -= hint.cost;
      user.unlockedHints.push({
        challenge: challenge._id,
        hintIndex,
        unlockedAt: new Date()
      });

      await user.save({ session });

      res.json({
        success: true,
        data: {
          hint: hint.text,
          cost: hint.cost,
          alreadyUnlocked: false,
          remainingCoins: user.coins
        }
      });
    });
  } catch (error) {
    console.error('Unlock hint error:', error);
    res.status(error.status || 500).json({ success: false, message: error.message });
  } finally {
    await session.endSession();
  }
};

// ── GET /api/challenges/leaderboard — Top players ─────────────
export const getLeaderboard = async (req, res) => {
  try {
    const { limit = 20, period } = req.query;

    // Global leaderboard — sorted by XP
    const users = await User.find({ role: 'student' })
      .select('name xp coins level achievements solvedChallenges')
      .sort({ xp: -1 })
      .limit(Math.min(parseInt(limit, 10), 100));

    const data = users.map((u, idx) => ({
      rank: idx + 1,
      id: u._id.toString(),
      name: u.name,
      xp: u.xp || 0,
      coins: u.coins || 0,
      level: u.level || 1,
      challengesSolved: (u.solvedChallenges || []).length,
      achievementCount: (u.achievements || []).length
    }));

    res.json({ success: true, data });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/challenges/my-progress — Authenticated user stats ─
export const getMyProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('name xp coins level achievements solvedChallenges unlockedHints')
      .populate('solvedChallenges.challenge', 'title category difficulty points');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { getLevelProgress: lvlProg } = await import('../utils/gamification.js');
    const levelInfo = lvlProg(user.xp || 0);

    const data = {
      xp: user.xp || 0,
      coins: user.coins || 0,
      level: user.level || 1,
      levelInfo,
      achievements: user.achievements || [],
      challengesSolved: (user.solvedChallenges || []).length,
      solvedChallenges: (user.solvedChallenges || []).map(sc => ({
        id: sc.challenge?._id?.toString(),
        title: sc.challenge?.title,
        category: sc.challenge?.category,
        difficulty: sc.challenge?.difficulty,
        points: sc.challenge?.points,
        solvedAt: sc.solvedAt,
        xpEarned: sc.xpEarned,
        coinsEarned: sc.coinsEarned
      }))
    };

    res.json({ success: true, data });
  } catch (error) {
    console.error('Get my progress error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/challenges/admin — All challenges (admin/teacher) ─
export const getAllChallengesAdmin = async (req, res) => {
  try {
    const { category, difficulty, published } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (published !== undefined) filter.isPublished = published === 'true';

    // Teachers see only their own, admins see all
    if (req.user.role === 'teacher') {
      filter.createdBy = req.user._id;
    }

    const challenges = await Challenge.find(filter)
      .select('-flagHash')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    const data = challenges.map(ch => {
      const obj = ch.toObject();
      delete obj.flagHash;
      obj.id = obj._id.toString();
      return obj;
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Get all challenges admin error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
