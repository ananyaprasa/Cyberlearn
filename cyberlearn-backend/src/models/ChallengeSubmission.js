import mongoose from "mongoose";

const challengeSubmissionSchema = new mongoose.Schema(
  {
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: [true, 'Challenge is required']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'User is required']
    },
    // Whether this submission was the correct flag
    isCorrect: {
      type: Boolean,
      required: true
    },
    // Track what was submitted (for analytics, not the flag itself)
    attemptNumber: {
      type: Number,
      default: 1,
      min: 1
    },
    // Only set when isCorrect = true
    solvedAt: {
      type: Date,
      default: null
    },
    // XP/coins awarded (only on correct solve)
    xpEarned: {
      type: Number,
      default: 0
    },
    coinsEarned: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ── Indexes ────────────────────────────────────────────────────
// One correct solve per user per challenge (wrong attempts are separate docs)
challengeSubmissionSchema.index({ challenge: 1, user: 1, isCorrect: 1 });
challengeSubmissionSchema.index({ user: 1, solvedAt: -1 });
challengeSubmissionSchema.index({ challenge: 1, solvedAt: 1 });

export default mongoose.model("ChallengeSubmission", challengeSubmissionSchema);
