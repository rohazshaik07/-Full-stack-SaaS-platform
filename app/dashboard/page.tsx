"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  MessageSquare,
  TrendingUp,
  Target,
  Plus,
  Eye,
  Download,
  Edit,
  ArrowLeft,
  Sparkles,
  Calendar,
  Clock,
  Award,
  BarChart3,
  User,
} from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isVisible, setIsVisible] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)

    // Redirect if not authenticated
    if (status === "loading") return
    if (!session) {
      router.push("/auth/signin")
      return
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const stats = [
    { label: "Resumes Created", value: "12", icon: FileText, color: "text-[#15cb5e]", bg: "bg-[#15cb5e]/20" },
    { label: "Interviews Practiced", value: "45", icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/20" },
    { label: "Job Applications", value: "28", icon: Target, color: "text-purple-400", bg: "bg-purple-500/20" },
    { label: "ATS Score Avg", value: "87%", icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-500/20" },
  ]

  const recentResumes = [
    { name: "Software Engineer Resume", score: 92, lastModified: "2 hours ago", status: "optimized" },
    { name: "Frontend Developer CV", score: 88, lastModified: "1 day ago", status: "needs-review" },
    { name: "Full Stack Resume", score: 95, lastModified: "3 days ago", status: "optimized" },
  ]

  const upcomingInterviews = [
    { company: "TechCorp", role: "Senior Developer", date: "Tomorrow, 2:00 PM", type: "Technical" },
    { company: "StartupXYZ", role: "Frontend Engineer", date: "Friday, 10:00 AM", type: "Behavioral" },
  ]

  const quickActions = [
    {
      title: "Create New Resume",
      description: "Build an ATS-optimized resume",
      icon: FileText,
      href: "/resume-builder",
      color: "from-[#15cb5e] to-[#00ff66]",
    },
    {
      title: "Practice Interview",
      description: "Simulate real interview scenarios",
      icon: MessageSquare,
      href: "/interview-simulator",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Analyze Job Market",
      description: "Get insights on trending skills",
      icon: BarChart3,
      href: "/job-trends",
      color: "from-purple-500 to-pink-500",
    },
  ]

  const firstName = session.user?.name?.split(" ")[0] || "User"

  return (
    <div className="min-h-screen bg-black relative">
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

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/"
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#15cb5e] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold text-white">CareerSync</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-2xl border-2 border-[#15cb5e]/30 overflow-hidden">
                {session.user?.image ? (
                  <img
                    src={session.user.image || "/placeholder.svg"}
                    alt={session.user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Welcome back, {firstName}! 👋</h1>
                <p className="text-gray-300 text-lg">Here's your career progress overview</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-[#15cb5e]/30 transition-all duration-500 rounded-2xl group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div
            className={`mb-8 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-[#15cb5e]/30 transition-all duration-500 rounded-2xl group cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
                      <p className="text-gray-400">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Resumes */}
            <div
              className={`lg:col-span-2 transition-all duration-1000 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Recent Resumes
                  </CardTitle>
                  <Link href="/resume-builder">
                    <Button size="sm" className="bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl">
                      <Plus className="w-4 h-4 mr-2" />
                      New Resume
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentResumes.map((resume, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#15cb5e] to-[#00ff66] rounded-xl flex items-center justify-center">
                            <FileText className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{resume.name}</h4>
                            <p className="text-gray-400 text-sm">{resume.lastModified}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">{resume.score}</span>
                              <Badge
                                variant={resume.status === "optimized" ? "default" : "secondary"}
                                className={`text-xs ${
                                  resume.status === "optimized"
                                    ? "bg-[#15cb5e]/20 text-[#15cb5e] border-[#15cb5e]/30"
                                    : ""
                                }`}
                              >
                                {resume.status === "optimized" ? "Optimized" : "Needs Review"}
                              </Badge>
                            </div>
                            <Progress value={resume.score} className="w-20 mt-1" />
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-gray-300 hover:bg-white/10 rounded-lg"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-gray-300 hover:bg-white/10 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-gray-300 hover:bg-white/10 rounded-lg"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-900 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {/* Upcoming Interviews */}
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Interviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingInterviews.map((interview, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{interview.company}</h4>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{interview.type}</Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{interview.role}</p>
                        <div className="flex items-center text-gray-400 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {interview.date}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/interview-simulator">
                    <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 rounded-xl">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Practice Interview
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Achievement Badge */}
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Recent Achievement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-medium mb-2">Resume Master</h3>
                    <p className="text-gray-400 text-sm">Created 10+ optimized resumes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
