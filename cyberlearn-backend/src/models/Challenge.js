import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const hintSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Hint text is required'],
    trim: true,
    maxlength: [1000, 'Hint cannot exceed 1000 characters']
  },
  cost: {
    type: Number,
    required: [true, 'Hint cost is required'],
    min: [0, 'Hint cost cannot be negative'],
    default: 20
  }
}, { _id: false });

const attachmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Attachment name is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Attachment URL is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['file', 'link', 'image'],
    default: 'file'
  }
}, { _id: false });

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: [
          'OSINT',
          'Reconnaissance',
          'Web Security',
          'Cryptography',
          'Network Security',
          'Linux Privilege Escalation',
          'Windows/Active Directory',
          'Forensics',
          'Miscellaneous'
        ],
        message: 'Invalid category'
      }
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: {
        values: ['Easy', 'Medium', 'Hard', 'Expert'],
        message: 'Invalid difficulty'
      }
    },
    points: {
      type: Number,
      required: [true, 'Points are required'],
      min: [10, 'Points must be at least 10'],
      max: [1000, 'Points cannot exceed 1000'],
      validate: {
        validator: Number.isInteger,
        message: 'Points must be a whole number'
      }
    },
    // XP awarded on solve (defaults to same as points if not set)
    xpReward: {
      type: Number,
      min: [0, 'XP reward cannot be negative'],
      default: null // null = will default to points value at solve time
    },
    // Coins awarded on solve
    coinsReward: {
      type: Number,
      min: [0, 'Coins reward cannot be negative'],
      default: null // null = will default to Math.floor(points / 10) at solve time
    },
    // Flag is stored as a bcrypt hash for security
    flagHash: {
      type: String,
      required: [true, 'Flag is required'],
      select: false // Never expose in API responses
    },
    // Store flag format prefix for hint purposes (e.g. "CyberLearn{")
    flagFormat: {
      type: String,
      default: 'CyberLearn{...}'
    },
    hints: [hintSchema],
    attachments: [attachmentSchema],
    // Extra display content (cipher text, image URL, external link, etc.)
    cipherText: {
      type: String,
      trim: true,
      default: null
    },
    imageUrl: {
      type: String,
      trim: true,
      default: null
    },
    externalUrl: {
      type: String,
      trim: true,
      default: null
    },
    solutionExplanation: {
      type: String,
      trim: true,
      maxlength: [5000, 'Solution explanation cannot exceed 5000 characters'],
      default: null
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    // Track total solve count (denormalized for performance in listings)
    solveCount: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ── Indexes ────────────────────────────────────────────────────
challengeSchema.index({ category: 1, difficulty: 1 });
challengeSchema.index({ isPublished: 1, createdAt: -1 });
challengeSchema.index({ points: 1 });
challengeSchema.index({ createdBy: 1 });

// ── Static helper — hash a plain-text flag before saving ───────
challengeSchema.statics.hashFlag = async function (plainFlag) {
  return bcrypt.hash(plainFlag.trim(), 10);
};

// ── Instance method — validate a submitted flag ────────────────
challengeSchema.methods.validateFlag = async function (submittedFlag) {
  // Re-fetch the document with flagHash selected since it's select:false
  const challenge = await this.constructor
    .findById(this._id)
    .select('+flagHash');
  if (!challenge || !challenge.flagHash) return false;
  return bcrypt.compare(submittedFlag.trim(), challenge.flagHash);
};

// ── Cascade: remove ChallengeSubmissions when challenge is deleted ─
challengeSchema.pre('deleteOne', { document: true, query: false }, async function () {
  await mongoose.model('ChallengeSubmission').deleteMany({ challenge: this._id });
});

export default mongoose.model('Challenge', challengeSchema);
