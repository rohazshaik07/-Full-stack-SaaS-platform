import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { auth } from "./middleware/auth.js"
import resumeRoutes from "./routes/resumeRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/resume", auth, resumeRoutes)

// Basic route
app.get("/", (req, res) => {
  res.send("CareerSync Resume Optimization API")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
