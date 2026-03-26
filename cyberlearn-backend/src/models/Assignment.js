import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      validate: {
        validator: function(v) {
          return v && v.trim().length > 0;
        },
        message: 'Title cannot be empty'
      }
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
      default: ""
    },
    category: {
      type: String,
      enum: {
        values: ["OSINT", "Cryptography", "Network Security", "Reconnaissance", "General"],
        message: 'Invalid category'
      },
      default: "General"
    },
    points: {
      type: Number,
      min: [1, 'Points must be at least 1'],
      max: [1000, 'Points cannot exceed 1000'],
      default: 100,
      validate: {
        validator: Number.isInteger,
        message: 'Points must be a whole number'
      }
    },
    deadline: {
      type: Date,
      validate: {
        validator: function(v) {
          // Only validate on new documents, not updates
          if (!this.isNew) return true;
          return !v || v > new Date();
        },
        message: 'Deadline must be in the future'
      }
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: false // Allow general assignments not tied to classroom
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    attachments: [{
      name: {
        type: String,
        required: [true, 'Attachment name is required'],
        trim: true
      },
      url: {
        type: String,
        required: [true, 'Attachment URL is required'],
        validate: {
          validator: function(v) {
            try {
              new URL(v);
              return true;
            } catch {
              return false;
            }
          },
          message: 'Invalid URL format'
        }
      }
    }],
    allowedFileTypes: [{
      type: String,
      validate: {
        validator: function(v) {
          return /^\.[a-zA-Z0-9]+$/.test(v);
        },
        message: 'File type must start with a dot and contain only alphanumeric characters'
      }
    }],
    allowLinks: {
      type: Boolean,
      default: true
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for better query performance
assignmentSchema.index({ classroom: 1, createdAt: -1 });
assignmentSchema.index({ createdBy: 1, createdAt: -1 });
assignmentSchema.index({ category: 1 });

// Virtual for submission count
assignmentSchema.virtual('submissionCount', {
  ref: 'Submission',
  localField: '_id',
  foreignField: 'assignment',
  count: true
});

// Pre-remove middleware to handle cascade delete
assignmentSchema.pre('deleteOne', { document: true, query: false }, async function() {
  // Remove assignment from classroom
  if (this.classroom) {
    await mongoose.model('Classroom').findByIdAndUpdate(
      this.classroom,
      { $pull: { assignments: this._id } }
    );
  }
  
  // Delete all submissions for this assignment
  await mongoose.model('Submission').deleteMany({ assignment: this._id });
});

export default mongoose.model("Assignment", assignmentSchema);
