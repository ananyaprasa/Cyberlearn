import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
      validate: {
        validator: function(v) {
          return v && v.trim().length >= 2;
        },
        message: 'Name must be at least 2 characters after trimming'
      }
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [100, 'Email cannot exceed 100 characters'],
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Invalid email format'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
      type: String,
      enum: {
        values: ["student", "teacher", "admin"],
        message: 'Invalid role'
      },
      default: "student"
    },
    enrolledClasses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom"
    }],

    // ── Gamification ──────────────────────────────────────────
    xp: {
      type: Number,
      default: 0,
      min: [0, 'XP cannot be negative']
    },
    coins: {
      type: Number,
      default: 0,
      min: [0, 'Coins cannot be negative']
    },
    level: {
      type: Number,
      default: 1,
      min: [1, 'Level must be at least 1']
    },
    achievements: [{
      id: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String },
      icon: { type: String },
      unlockedAt: { type: Date, default: Date.now }
    }],
    // Tracks which CTF challenges the user has solved
    solvedChallenges: [{
      challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
      },
      solvedAt: { type: Date, default: Date.now },
      xpEarned: { type: Number, default: 0 },
      coinsEarned: { type: Number, default: 0 }
    }],
    // Tracks which hints the user has unlocked (to prevent duplicate charges)
    unlockedHints: [{
      challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
      },
      hintIndex: { type: Number },
      unlockedAt: { type: Date, default: Date.now }
    }],

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { 
    timestamps: true,
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.password; // Never include password in JSON output
        return ret;
      }
    },
    toObject: { virtuals: true }
  }
);

// Index for better query performance
userSchema.index({ role: 1 });
userSchema.index({ enrolledClasses: 1 });
userSchema.index({ xp: -1 });          // leaderboard queries
userSchema.index({ level: -1 });       // leaderboard queries

// Virtual for enrolled class count
userSchema.virtual('enrolledClassCount').get(function() {
  return this.enrolledClasses ? this.enrolledClasses.length : 0;
});

// Pre-remove middleware to handle cascade delete
userSchema.pre('deleteOne', { document: true, query: false }, async function() {
  // Remove user from all classrooms they're enrolled in
  await mongoose.model('Classroom').updateMany(
    { students: this._id },
    { $pull: { students: this._id } }
  );
  
  // If user is a teacher, handle their classrooms
  if (this.role === 'teacher') {
    // Delete all classrooms they created (cascade will handle assignments/submissions)
    await mongoose.model('Classroom').deleteMany({ teacher: this._id });
  }
  
  // Delete all submissions by this user
  await mongoose.model('Submission').deleteMany({ student: this._id });
});

// Method to safely add classroom enrollment
userSchema.methods.enrollInClassroom = function(classroomId) {
  if (!this.enrolledClasses.includes(classroomId)) {
    this.enrolledClasses.push(classroomId);
  }
};

// Method to safely remove classroom enrollment
userSchema.methods.leaveClassroom = function(classroomId) {
  this.enrolledClasses = this.enrolledClasses.filter(id => !id.equals(classroomId));
};

export default mongoose.model("User", userSchema);
