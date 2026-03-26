import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true
    },
    options: [
      {
        type: String
      }
    ],
    correctAnswer: {
      type: String,
      required: true
    },
    explanation: {
      type: String
    },
    category: {
      type: String,
      enum: ["OSINT", "Cryptography", "Network Security", "Reconnaissance"],
      required: true
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true
    },
    points: {
      type: Number,
      default: 10
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
