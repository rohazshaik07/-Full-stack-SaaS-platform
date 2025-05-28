"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Edit, ArrowLeft, AlertCircle, Target, BarChart3, AlignLeft } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Resume {
  _id: string
  fileName: string
  personalInfo: {
    name: string
    email: string
    phone: string
  }
  atsScore: {
    total: number
    details: {
      keywords: number
      formatting: number
      length: number
    }
  }
  keywords: string[]
  suggestions: string[]
  createdAt: string
}

export default function ResumeDetailPage({ params }: { params: { id: string } }) {
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated" && params.id) {
      fetchResume(params.id)
    }
  }, [status, router, params.id])

  const fetchResume = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Resume not found")
        }
        throw new Error("Failed to fetch resume")
      }

      const data = await response.json()
      setResume(data)
    } catch (error) {
      console.error("Error fetching resume:", error)
      setError("Failed to load resume. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Error</h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <Link href="/dashboard/resumes">
              <Button className="bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resumes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Resume Not Found</h3>
            <p className="text-gray-400 mb-6">The resume you're looking for doesn't exist or has been deleted.</p>
            <Link href="/dashboard/resumes">
              <Button className="bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resumes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative p-6">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 70%, rgba(0, 255, 102, 0.08) 0%, rgba(0, 255, 102, 0.02) 60%, transparent 90%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/resumes"
            className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resumes
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {resume.personalInfo.name || resume.fileName || "Untitled Resume"}
              </h1>
              <p className="text-gray-400">Created on {formatDate(resume.createdAt)}</p>
            </div>
            <div className="flex space-x-3">
              <Link href={`/resume-builder?id=${resume._id}`}>
                <Button className="bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Resume
                </Button>
              </Link>
              <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Full Name</p>
                    <p className="text-white">{resume.personalInfo.name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-white">{resume.personalInfo.email || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <p className="text-white">{resume.personalInfo.phone || "Not provided"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Keywords Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-white font-medium mb-2">Matched Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.keywords && resume.keywords.length > 0 ? (
                      resume.keywords.map((keyword, index) => (
                        <Badge key={index} className="bg-[#15cb5e]/20 text-[#15cb5e] border-[#15cb5e]/30">
                          {keyword}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-400">No keywords matched</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Improvement Suggestions</h3>
                  <div className="space-y-2">
                    {resume.suggestions && resume.suggestions.length > 0 ? (
                      resume.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-yellow-400 mt-1" />
                          <p className="text-gray-300 text-sm">{suggestion}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No suggestions available</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* ATS Score */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">ATS Score</CardTitle>
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
                        strokeDasharray={`${(resume.atsScore.total / 100) * 314} 314`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">{resume.atsScore.total}%</div>
                        <div className="text-xs text-gray-400">ATS Score</div>
                      </div>
                    </div>
                  </div>

                  <Badge
                    className={`text-xs ${
                      resume.atsScore.total >= 80
                        ? "bg-[#15cb5e]/20 text-[#15cb5e] border-[#15cb5e]/30"
                        : resume.atsScore.total >= 60
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {resume.atsScore.total >= 80
                      ? "Excellent"
                      : resume.atsScore.total >= 60
                        ? "Good"
                        : "Needs Improvement"}
                  </Badge>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-gray-300">Keywords</span>
                      </div>
                      <span className="text-white">{resume.atsScore.details.keywords}%</span>
                    </div>
                    <Progress value={resume.atsScore.details.keywords} className="h-1.5" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <AlignLeft className="w-4 h-4 text-purple-400 mr-2" />
                        <span className="text-gray-300">Formatting</span>
                      </div>
                      <span className="text-white">{resume.atsScore.details.formatting}%</span>
                    </div>
                    <Progress value={resume.atsScore.details.formatting} className="h-1.5" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 text-orange-400 mr-2" />
                        <span className="text-gray-300">Length</span>
                      </div>
                      <span className="text-white">{resume.atsScore.details.length}%</span>
                    </div>
                    <Progress value={resume.atsScore.details.length} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/resume-builder?id=${resume._id}`}>
                  <Button className="w-full bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Resume
                  </Button>
                </Link>
                <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:bg-white/10 rounded-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
