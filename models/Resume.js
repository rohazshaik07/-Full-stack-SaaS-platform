import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileName: { type: String },
  fileType: { type: String },
  personalInfo: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  atsScore: {
    total: { type: Number },
    details: {
      keywords: { type: Number },
      formatting: { type: Number },
      length: { type: Number },
    },
  },
  keywords: [{ type: String }],
  suggestions: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Resume", resumeSchema)
