import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Classroom name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
      validate: {
        validator: function(v) {
          return v && v.trim().length > 0;
        },
        message: 'Name cannot be empty'
      }
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: ""
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [50, 'Subject cannot exceed 50 characters'],
      default: "Cybersecurity"
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Teacher is required'],
      index: true // 🔥 added for faster queries
    },
    teacherName: {
      type: String,
      required: [true, 'Teacher name is required'],
      trim: true
    },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    joinCode: {
      type: String,
      unique: true, // ✅ ONLY index needed
      required: [true, 'Join code is required'],
      uppercase: true,
      minlength: [6, 'Join code must be exactly 6 characters'],
      maxlength: [6, 'Join code must be exactly 6 characters'],
      validate: {
        validator: function(v) {
          return /^[A-Z0-9]{6}$/.test(v);
        },
        message: 'Join code must be 6 uppercase letters and numbers'
      }
    },
    assignments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment"
    }]
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


// Optimized indexes (NO duplication now)
classroomSchema.index({ teacher: 1, createdAt: -1 });
classroomSchema.index({ students: 1 });


//  Virtuals
classroomSchema.virtual('studentCount').get(function() {
  return this.students?.length || 0;
});

classroomSchema.virtual('assignmentCount').get(function() {
  return this.assignments?.length || 0;
});


//  Pre-delete middleware (safe)
classroomSchema.pre('deleteOne', { document: true, query: false }, async function() {
  await mongoose.model('User').updateMany(
    { enrolledClasses: this._id },
    { $pull: { enrolledClasses: this._id } }
  );
  
  await mongoose.model('Assignment').deleteMany({ classroom: this._id });

  // Cascade delete study materials for this classroom
  await mongoose.model('StudyMaterial').deleteMany({ classroom: this._id });
});


//  Methods (cleaner comparison)
classroomSchema.methods.addStudent = function(studentId) {
  if (!this.students.some(id => id.equals(studentId))) {
    this.students.push(studentId);
  }
};

classroomSchema.methods.removeStudent = function(studentId) {
  this.students = this.students.filter(id => !id.equals(studentId));
};


export default mongoose.model("Classroom", classroomSchema);