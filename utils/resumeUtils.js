import PDFParser from "pdf2json"
import mammoth from "mammoth"
import jobKeywords from "../data/jobKeywords.js"

// Parse resume file (PDF or Word)
export const parseResume = async (filePath, fileType) => {
  let text = ""

  if (fileType === "application/pdf") {
    text = await parsePDF(filePath)
  } else if (
    fileType === "application/msword" ||
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    text = await parseWord(filePath)
  } else {
    throw new Error("Unsupported file type")
  }

  // Extract personal information
  const personalInfo = extractPersonalInfo(text)

  return { personalInfo, text }
}

// Parse PDF file
const parsePDF = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser()

    pdfParser.on("pdfParser_dataError", (error) => reject(error))
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      try {
        // Convert PDF to text
        let text = ""
        for (let i = 0; i < pdfData.Pages.length; i++) {
          const page = pdfData.Pages[i]
          for (let j = 0; j < page.Texts.length; j++) {
            const textItem = page.Texts[j]
            for (let k = 0; k < textItem.R.length; k++) {
              text += decodeURIComponent(textItem.R[k].T) + " "
            }
          }
          text += "\n"
        }
        resolve(text)
      } catch (error) {
        reject(error)
      }
    })

    pdfParser.loadPDF(filePath)
  })
}

// Parse Word document
const parseWord = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath })
    return result.value
  } catch (error) {
    throw new Error(`Error parsing Word document: ${error.message}`)
  }
}

// Extract personal information from text
const extractPersonalInfo = (text) => {
  const personalInfo = {
    name: "",
    email: "",
    phone: "",
  }

  // Extract name (assume it's in the first few lines)
  const lines = text.split("\n").filter((line) => line.trim())
  if (lines.length > 0) {
    // Look for "Name:" pattern or use the first line
    const nameMatch = text.match(/Name:?\s*([^\n]+)/i)
    personalInfo.name = nameMatch ? nameMatch[1].trim() : lines[0].trim()
  }

  // Extract email
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  const emailMatch = text.match(emailRegex)
  if (emailMatch) {
    personalInfo.email = emailMatch[0]
  }

  // Extract phone number
  const phoneRegex = /\+?\d{1,4}[-.\s]?$$?\d{3}$$?[-.\s]?\d{3}[-.\s]?\d{4}/
  const phoneMatch = text.match(phoneRegex)
  if (phoneMatch) {
    personalInfo.phone = phoneMatch[0]
  }

  return personalInfo
}

// Calculate ATS score
export const calculateATSScore = async (text, jobRole) => {
  // Get keywords for the job role
  const roleKeywords = jobKeywords[jobRole] || jobKeywords.default

  // 1. Keywords score (50%)
  const keywordsScore = calculateKeywordsScore(text, roleKeywords)

  // 2. Formatting score (30%)
  const formattingScore = calculateFormattingScore(text)

  // 3. Length score (20%)
  const lengthScore = calculateLengthScore(text)

  // Calculate total score
  const totalScore = Math.round(keywordsScore.score * 0.5 + formattingScore.score * 0.3 + lengthScore.score * 0.2)

  // Generate suggestions
  const suggestions = [...keywordsScore.suggestions, ...formattingScore.suggestions, ...lengthScore.suggestions]

  return {
    score: {
      total: totalScore,
      details: {
        keywords: keywordsScore.score,
        formatting: formattingScore.score,
        length: lengthScore.score,
      },
    },
    matchedKeywords: keywordsScore.matched,
    missingKeywords: keywordsScore.missing,
    suggestions,
  }
}

// Calculate keywords score
const calculateKeywordsScore = (text, keywords) => {
  const textLower = text.toLowerCase()
  const matched = []
  const missing = []
  const suggestions = []

  // Check for each keyword
  keywords.forEach((keyword) => {
    if (textLower.includes(keyword.toLowerCase())) {
      matched.push(keyword)
    } else {
      missing.push(keyword)
      suggestions.push(`Add "${keyword}" to your resume to improve ATS matching`)
    }
  })

  // Calculate score (percentage of matched keywords)
  const score = Math.round((matched.length / keywords.length) * 100)

  return { score, matched, missing, suggestions }
}

// Calculate formatting score
const calculateFormattingScore = (text) => {
  const suggestions = []
  let score = 100

  // Check for important sections
  const sections = ["experience", "education", "skills"]
  const missingSections = []

  sections.forEach((section) => {
    if (!text.toLowerCase().includes(section)) {
      missingSections.push(section)
      score -= 20
      suggestions.push(`Add a "${section.charAt(0).toUpperCase() + section.slice(1)}" section to your resume`)
    }
  })

  // Check for bullet points
  if (!text.includes("•") && !text.includes("-")) {
    score -= 10
    suggestions.push("Use bullet points to list your achievements and responsibilities")
  }

  // Check for complex formatting (tables, etc.)
  // This is a simplified check - in reality, this would be more complex
  if (text.includes("|") || (text.match(/\t/g) || []).length > 10) {
    score -= 20
    suggestions.push("Avoid complex formatting like tables that ATS systems struggle to parse")
  }

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score))

  return { score, suggestions }
}

// Calculate length score
const calculateLengthScore = (text) => {
  const suggestions = []
  const wordCount = text.split(/\s+/).length

  let score = 100

  // Penalize if too short
  if (wordCount < 300) {
    const penalty = Math.round(((300 - wordCount) / 300) * 100)
    score -= penalty
    suggestions.push("Your resume is too short. Aim for at least 300 words for better ATS performance")
  }

  // Penalize if too long
  if (wordCount > 1000) {
    const penalty = Math.round(((wordCount - 1000) / 1000) * 100)
    score -= penalty
    suggestions.push("Your resume is too long. Try to keep it under 1000 words for better ATS performance")
  }

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score))

  return { score, suggestions }
}
