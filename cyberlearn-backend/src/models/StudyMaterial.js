import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: 'Title cannot be empty',
      },
    },

    // Local file path relative to /uploads (e.g. "materials/abc123.pdf")
    filePath: {
      type: String,
      required: [true, 'File path is required'],
      trim: true,
    },

    // Original filename shown to users (e.g. "Chapter1_Notes.pdf")
    originalName: {
      type: String,
      required: [true, 'Original file name is required'],
      trim: true,
    },

    // MIME type — currently always application/pdf, extensible for future types
    mimeType: {
      type: String,
      default: 'application/pdf',
      trim: true,
    },

    // File size in bytes
    fileSize: {
      type: Number,
      min: [1, 'File size must be positive'],
    },

    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: [true, 'Classroom reference is required'],
      index: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Uploader reference is required'],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index — most common query: all materials for a classroom, newest first
studyMaterialSchema.index({ classroom: 1, createdAt: -1 });

// Virtual: public download URL served by Express static middleware
studyMaterialSchema.virtual('fileUrl').get(function () {
  return `/uploads/${this.filePath}`;
});

export default mongoose.model('StudyMaterial', studyMaterialSchema);
