"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Download, Edit, Trash2, Plus, AlertCircle } from "lucide-react"
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
  createdAt: string
}

export default function ResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
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

    if (status === "authenticated") {
      fetchResumes()
    }
  }, [status, router])

  const fetchResumes = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/resume", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch resumes")
      }

      const data = await response.json()
      setResumes(data)
    } catch (error) {
      console.error("Error fetching resumes:", error)
      setError("Failed to load your resumes. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteResume = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) {
      return
    }

    try {
      const response = await fetch(`/api/resume/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete resume")
      }

      // Remove the deleted resume from state
      setResumes(resumes.filter((resume) => resume._id !== id))
    } catch (error) {
      console.error("Error deleting resume:", error)
      setError("Failed to delete resume. Please try again.")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Resumes</h1>
            <p className="text-gray-400">Manage your resumes and track their ATS optimization scores</p>
          </div>
          <Link href="/resume-builder">
            <Button className="bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Resumes list */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white">Loading your resumes...</div>
          </div>
        ) : resumes.length === 0 ? (
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No resumes found</h3>
              <p className="text-gray-400 mb-6">
                You haven't created any resumes yet. Get started by creating your first resume.
              </p>
              <Link href="/resume-builder">
                <Button className="bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Resume
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {resumes.map((resume) => (
              <Card
                key={resume._id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#15cb5e]/20 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#15cb5e]" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg">
                          {resume.personalInfo.name || resume.fileName || "Untitled Resume"}
                        </h3>
                        <p className="text-gray-400 text-sm">Created on {formatDate(resume.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{resume.atsScore.total}%</span>
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
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-400">ATS Score</span>
                          <Progress value={resume.atsScore.total} className="w-24 h-1.5" />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-gray-300 hover:bg-white/10 rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Link href={`/resume-builder?id=${resume._id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-gray-300 hover:bg-white/10 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-gray-300 hover:bg-white/10 rounded-lg"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-lg"
                          onClick={() => handleDeleteResume(resume._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
