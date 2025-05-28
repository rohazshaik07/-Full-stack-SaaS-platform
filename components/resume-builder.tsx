"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Upload,
  Zap,
  Target,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Save,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { useSession } from "next-auth/react"

export function ResumeBuilder() {
  const [atsScore, setAtsScore] = useState(78)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  const { data: session } = useSession()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const keywords = [
    { word: "React", strength: 95, found: true },
    { word: "JavaScript", strength: 88, found: true },
    { word: "TypeScript", strength: 82, found: false },
    { word: "Node.js", strength: 76, found: true },
    { word: "Python", strength: 71, found: false },
    { word: "AWS", strength: 68, found: false },
    { word: "Docker", strength: 65, found: true },
    { word: "MongoDB", strength: 62, found: true },
  ]

  const [suggestions, setSuggestions] = useState([
    { type: "keyword", text: "Add 'TypeScript' to your skills section", priority: "high" },
    { type: "format", text: "Use bullet points for better readability", priority: "medium" },
    { type: "content", text: "Quantify your achievements with numbers", priority: "high" },
    { type: "keyword", text: "Include 'AWS' for better ATS matching", priority: "medium" },
  ])

  const handleAnalyze = async () => {
    if (!session) {
      setUploadError("Please sign in to analyze your resume")
      return
    }

    setIsAnalyzing(true)
    setUploadError("")

    try {
      // Create resume text from form data for analysis
      const resumeText = `
        ${personalInfo.name}
        ${personalInfo.email}
        ${personalInfo.phone}
        ${personalInfo.summary}
      `

      const response = await fetch("/api/resume/ats-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          text: resumeText,
          jobRole: "software_engineer", // You can make this dynamic
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze resume")
      }

      const data = await response.json()
      setAtsScore(data.score.total)
      setSuggestions(
        data.suggestions.map((suggestion: string) => ({
          type: "ai",
          text: suggestion,
          priority: "medium",
        })),
      )
    } catch (error) {
      console.error("Analysis error:", error)
      setUploadError("Failed to analyze resume. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!session) {
      setUploadError("Please sign in to upload your resume")
      return
    }

    setIsUploading(true)
    setUploadError("")

    try {
      const formData = new FormData()
      formData.append("resume", file)
      formData.append("jobRole", "software_engineer") // Make this dynamic

      const response = await fetch("/api/resume/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload resume")
      }

      const data = await response.json()

      // Update personal info with extracted data
      setPersonalInfo((prev) => ({
        ...prev,
        ...data.personalInfo,
      }))

      // Update ATS score
      setAtsScore(data.atsScore.score.total)

      // Update suggestions
      setSuggestions(
        data.atsScore.suggestions.map((suggestion: string) => ({
          type: "ai",
          text: suggestion,
          priority: "medium",
        })),
      )

      setUploadedFile(file.name)
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError("Failed to upload resume. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <section ref={sectionRef} id="resume" className="py-24 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 30%, rgba(0, 255, 102, 0.08) 0%, rgba(0, 255, 102, 0.02) 60%, transparent 90%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
            <FileText className="w-4 h-4 text-[#15cb5e] mr-2" />
            <span className="text-[#15cb5e] text-sm font-medium">AI Resume Builder</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Optimize Your{" "}
            <span className="bg-gradient-to-r from-[#15cb5e] to-[#00ff66] bg-clip-text text-transparent">Resume</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Upload your resume and get instant AI-powered analysis with ATS optimization, keyword suggestions, and
            professional formatting recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* File Upload */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{uploadError}</p>
                  </div>
                )}

                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#15cb5e]/50 transition-all duration-300">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                    disabled={isUploading}
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="w-16 h-16 bg-[#15cb5e]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {isUploading ? (
                        <Sparkles className="w-8 h-8 text-[#15cb5e] animate-spin" />
                      ) : (
                        <Upload className="w-8 h-8 text-[#15cb5e]" />
                      )}
                    </div>
                    <h3 className="text-white font-medium mb-2">
                      {isUploading
                        ? "Processing your resume..."
                        : uploadedFile
                          ? uploadedFile
                          : "Drop your resume here or click to upload"}
                    </h3>
                    <p className="text-gray-400 text-sm">Supports PDF, DOC, DOCX files up to 10MB</p>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Resume Editor */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name"
                    value={personalInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-white/10 border-white/20 text-white rounded-xl"
                  />
                  <Input
                    placeholder="Email Address"
                    value={personalInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white/10 border-white/20 text-white rounded-xl"
                  />
                  <Input
                    placeholder="Phone Number"
                    value={personalInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-white/10 border-white/20 text-white rounded-xl"
                  />
                  <Input
                    placeholder="Location"
                    value={personalInfo.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="bg-white/10 border-white/20 text-white rounded-xl"
                  />
                </div>
                <Input
                  placeholder="LinkedIn Profile"
                  value={personalInfo.linkedin}
                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  className="bg-white/10 border-white/20 text-white rounded-xl"
                />
                <Textarea
                  placeholder="Professional Summary"
                  value={personalInfo.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  className="bg-white/10 border-white/20 text-white min-h-[100px] rounded-xl"
                />
              </CardContent>
            </Card>

            {/* Keywords Analysis */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Keyword Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        keyword.found ? "bg-[#15cb5e]/10 border-[#15cb5e]/30" : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">{keyword.word}</span>
                        {keyword.found ? (
                          <CheckCircle className="w-4 h-4 text-[#15cb5e]" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            keyword.found ? "bg-[#15cb5e]" : "bg-red-400"
                          }`}
                          style={{ width: `${keyword.strength}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{keyword.strength}% match</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Sidebar */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* ATS Score Gauge */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  ATS Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  {/* Circular Progress */}
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#15cb5e"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(atsScore / 100) * 314} 314`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">{atsScore}%</div>
                        <div className="text-xs text-gray-400">ATS Score</div>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={atsScore >= 80 ? "default" : "secondary"}
                    className={`text-xs ${atsScore >= 80 ? "bg-[#15cb5e]/20 text-[#15cb5e] border-[#15cb5e]/30" : ""}`}
                  >
                    {atsScore >= 80 ? "Excellent" : atsScore >= 60 ? "Good" : "Needs Improvement"}
                  </Badge>
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !session}
                  className="w-full bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      {session ? "Analyze with AI" : "Sign in to Analyze"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-start space-x-3">
                        {suggestion.priority === "high" ? (
                          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-white text-sm">{suggestion.text}</p>
                          <Badge
                            variant={suggestion.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs mt-1"
                          >
                            {suggestion.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl" disabled={!session}>
                  <Save className="w-4 h-4 mr-2" />
                  {session ? "Save Resume" : "Sign in to Save"}
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:bg-white/10 rounded-xl">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:bg-white/10 rounded-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
