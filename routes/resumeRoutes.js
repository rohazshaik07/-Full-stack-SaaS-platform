import express from "express"
import multer from "multer"
import { parseResume, calculateATSScore } from "../utils/resumeUtils.js"
import Resume from "../models/Resume.js"

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + "-" + file.originalname)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true)
    } else {
      cb(new Error("Only PDF and Word documents are allowed"))
    }
  },
})

// Upload and parse resume
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const userId = req.user.id
    const filePath = req.file.path
    const fileType = req.file.mimetype
    const fileName = req.file.originalname

    // Parse resume to extract personal information
    const { personalInfo, text } = await parseResume(filePath, fileType)

    // Calculate ATS score
    const jobRole = req.body.jobRole || "software_engineer" // Default role
    const atsScore = await calculateATSScore(text, jobRole)

    // Save to MongoDB
    const resume = new Resume({
      userId,
      fileName,
      fileType,
      personalInfo,
      atsScore: atsScore.score,
      keywords: atsScore.matchedKeywords,
      suggestions: atsScore.suggestions,
    })

    await resume.save()

    res.status(200).json({
      message: "Resume uploaded and parsed successfully",
      resumeId: resume._id,
      personalInfo,
      atsScore,
    })
  } catch (error) {
    console.error("Resume upload error:", error)
    res.status(500).json({ message: "Error processing resume", error: error.message })
  }
})

// Calculate ATS score for text
router.post("/ats-score", async (req, res) => {
  try {
    const { text, jobRole = "software_engineer" } = req.body

    if (!text) {
      return res.status(400).json({ message: "No resume text provided" })
    }

    const atsScore = await calculateATSScore(text, jobRole)

    res.status(200).json(atsScore)
  } catch (error) {
    console.error("ATS score calculation error:", error)
    res.status(500).json({ message: "Error calculating ATS score", error: error.message })
  }
})

// Get user's resumes
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id
    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 })

    res.status(200).json(resumes)
  } catch (error) {
    console.error("Get resumes error:", error)
    res.status(500).json({ message: "Error fetching resumes", error: error.message })
  }
})

// Get a specific resume
router.get("/:id", async (req, res) => {
  try {
    const userId = req.user.id
    const resumeId = req.params.id

    const resume = await Resume.findOne({ _id: resumeId, userId })

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" })
    }

    res.status(200).json(resume)
  } catch (error) {
    console.error("Get resume error:", error)
    res.status(500).json({ message: "Error fetching resume", error: error.message })
  }
})

export default router
