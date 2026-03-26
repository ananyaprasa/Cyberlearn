import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: [true, 'Assignment is required']
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Student is required']
    },
    studentEmail: {
      type: String,
      required: [true, 'Student email is required'],
      lowercase: true,
      trim: true
    },
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    textAnswer: {
      type: String,
      trim: true,
      maxlength: [5000, 'Text answer cannot exceed 5000 characters'],
      default: ""
    },
    linkAnswer: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: function(v) {
          if (!v || v === "") return true;
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        message: 'Invalid URL format'
      }
    },
    files: [{
      name: {
        type: String,
        required: [true, 'File name is required'],
        trim: true
      },
      url: {
        type: String,
        required: [true, 'File URL is required'],
        validate: {
          validator: function(v) {
            try {
              new URL(v);
              return true;
            } catch {
              return false;
            }
          },
          message: 'Invalid file URL format'
        }
      },
      size: {
        type: Number,
        min: [0, 'File size cannot be negative']
      }
    }],
    status: {
      type: String,
      enum: {
        values: ["submitted", "graded", "pending"],
        message: 'Invalid status'
      },
      default: "submitted"
    },
    grade: {
      type: Number,
      min: [0, 'Grade cannot be negative'],
      default: null,
      validate: {
        validator: function(v) {
          if (v === null || v === undefined) return true;
          return Number.isFinite(v) && v >= 0;
        },
        message: 'Grade must be a valid positive number'
      }
    },
    feedback: {
      type: String,
      trim: true,
      maxlength: [2000, 'Feedback cannot exceed 2000 characters'],
      default: ""
    },
    submittedAt: {
      type: Date,
      default: Date.now,
      required: [true, 'Submission date is required']
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ENHANCED: Compound index to ensure one submission per student per assignment
submissionSchema.index({ assignment: 1, student: 1 }, { 
  unique: true,
  name: 'unique_student_assignment_submission'
});

// ENHANCED: Additional indexes for data integrity and performance
submissionSchema.index({ student: 1, submittedAt: -1 });
submissionSchema.index({ assignment: 1, submittedAt: -1 });
submissionSchema.index({ status: 1 });
submissionSchema.index({ assignment: 1, status: 1 }); // For grading queries

// Custom validation to ensure at least one answer type
submissionSchema.pre('save', function () {
  if (!this.textAnswer && !this.linkAnswer && (!this.files || this.files.length === 0)) {
    throw new Error('At least one answer type (text, link, or file) is required');
  }
});

// Pre-save middleware to validate grade against assignment points
submissionSchema.pre('save', async function () {
  if (this.grade !== null && this.grade !== undefined && this.isModified('grade')) {
    const assignment = await mongoose.model('Assignment').findById(this.assignment);
    if (assignment && this.grade > assignment.points) {
      throw new Error(`Grade cannot exceed assignment points (${assignment.points})`);
    }
  }
});

export default mongoose.model("Submission", submissionSchema);
