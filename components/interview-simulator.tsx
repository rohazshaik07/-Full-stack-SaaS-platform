"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  Mic,
  MicOff,
  Play,
  Star,
  TrendingUp,
  Target,
  Volume2,
  RotateCcw,
  CheckCircle,
  Lock,
  Unlock,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function InterviewSimulator() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedType, setSelectedType] = useState("mixed")
  const [selectedRole, setSelectedRole] = useState("Frontend Developer")
  const sectionRef = useRef<HTMLElement>(null)
  const { data: session } = useSession()
  const router = useRouter()

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

  const questions = [
    {
      type: "behavioral",
      question:
        "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
      tips: "Use the STAR method: Situation, Task, Action, Result",
      difficulty: "Medium",
    },
    {
      type: "technical",
      question: "Explain the difference between React hooks and class components. When would you use each?",
      tips: "Focus on lifecycle methods, state management, and performance",
      difficulty: "Hard",
    },
    {
      type: "behavioral",
      question:
        "Describe a challenging project you worked on. What made it challenging and how did you overcome the obstacles?",
      tips: "Highlight problem-solving skills and resilience",
      difficulty: "Medium",
    },
  ]

  const feedback = {
    overall: 78,
    communication: 85,
    technical: 72,
    confidence: 80,
    clarity: 88,
    suggestions: [
      "Provide more specific examples with quantifiable results",
      "Speak more slowly and clearly",
      "Use more technical terminology when appropriate",
      "Maintain better eye contact with the camera",
    ],
  }

  const interviewTypes = [
    { id: "technical", name: "Technical", icon: Target, color: "from-blue-500 to-cyan-500" },
    { id: "behavioral", name: "Behavioral", icon: MessageSquare, color: "from-purple-500 to-pink-500" },
    { id: "mixed", name: "Mixed", icon: Star, color: "from-[#15cb5e] to-[#00ff66]" },
  ]

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack",
    "DevOps Engineer",
    "Data Scientist",
    "Product Manager",
    "UI/UX Designer",
    "Software Architect",
  ]

  const handleStartInterview = () => {
    setIsInterviewActive(true)
    setCurrentQuestion(0)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setUserAnswer("")
    } else {
      setIsInterviewActive(false)
    }
  }

  const handleUnlock = () => {
    if (!session) {
      router.push("/auth/signin")
    } else {
      // Scroll to pricing section
      const pricingSection = document.getElementById("pricing")
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const isLocked = !session

  return (
    <section ref={sectionRef} id="interview" className="py-24 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 80%, rgba(0, 255, 102, 0.06) 0%, rgba(0, 255, 102, 0.01) 70%, transparent 90%)`,
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
            <MessageSquare className="w-4 h-4 text-[#15cb5e] mr-2" />
            <span className="text-[#15cb5e] text-sm font-medium">Interview Simulator</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Practice{" "}
            <span className="bg-gradient-to-r from-[#15cb5e] to-[#00ff66] bg-clip-text text-transparent">
              Interviews
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Simulate real interviews with AI-generated questions, get instant feedback, and build confidence for your
            next opportunity.
          </p>
        </div>

        {/* Interview Simulator Content with Lock Overlay */}
        <div className="relative">
          {/* Blur overlay when locked */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Premium Feature</h3>
                <p className="text-gray-300 mb-6 max-w-md">
                  Sign in to unlock AI-powered interview simulation with personalized feedback and industry-specific
                  questions.
                </p>
                <Button
                  onClick={handleUnlock}
                  className="bg-[#15cb5e] hover:bg-[#12b854] text-black px-8 py-3 rounded-xl font-semibold"
                >
                  <Unlock className="w-5 h-5 mr-2" />
                  {!session ? "Sign In to Unlock" : "Upgrade to Pro"}
                </Button>
              </div>
            </div>
          )}

          {!isInterviewActive ? (
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isLocked ? "blur-sm" : ""}`}>
              {/* Interview Setup */}
              <div
                className={`lg:col-span-2 transition-all duration-1000 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Play className="w-5 h-5 mr-2" />
                      Interview Setup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Interview Type Selection */}
                    <div>
                      <h3 className="text-white font-medium mb-4">Select Interview Type</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {interviewTypes.map((type) => {
                          const IconComponent = type.icon
                          return (
                            <Button
                              key={type.id}
                              variant="outline"
                              className={`h-20 rounded-xl transition-all duration-300 ${
                                selectedType === type.id
                                  ? "border-[#15cb5e] bg-[#15cb5e]/10 text-[#15cb5e]"
                                  : "border-white/20 text-gray-300 hover:bg-white/10"
                              }`}
                              onClick={() => setSelectedType(type.id)}
                              disabled={isLocked}
                            >
                              <div className="text-center">
                                <IconComponent className="w-6 h-6 mx-auto mb-2" />
                                <div>{type.name}</div>
                              </div>
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Role Selection */}
                    <div>
                      <h3 className="text-white font-medium mb-4">Job Role</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {roles.map((role) => (
                          <Button
                            key={role}
                            variant="outline"
                            className={`text-sm rounded-xl transition-all duration-300 ${
                              selectedRole === role
                                ? "border-[#15cb5e] bg-[#15cb5e]/10 text-[#15cb5e]"
                                : "border-white/20 text-gray-300 hover:bg-white/10"
                            }`}
                            onClick={() => setSelectedRole(role)}
                            disabled={isLocked}
                          >
                            {role}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                      <h3 className="text-white font-medium mb-4">Experience Level</h3>
                      <div className="flex gap-4">
                        {["Entry Level", "Mid Level", "Senior Level"].map((level) => (
                          <Button
                            key={level}
                            variant="outline"
                            className="border-white/20 text-gray-300 hover:bg-white/10 rounded-xl"
                            disabled={isLocked}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleStartInterview}
                      disabled={isLocked}
                      className="w-full bg-[#15cb5e] hover:bg-[#12b854] text-black py-4 text-lg rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Interview Simulation
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Previous Sessions & Stats */}
              <div
                className={`space-y-6 transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {/* Performance Overview */}
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(feedback)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                              <span className="text-white font-medium">{value}%</span>
                            </div>
                            <Progress value={value as number} className="h-2" />
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Previous Sessions */}
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Previous Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { date: "Yesterday", score: 85, type: "Technical", questions: 8 },
                        { date: "3 days ago", score: 78, type: "Behavioral", questions: 6 },
                        { date: "1 week ago", score: 72, type: "Mixed", questions: 10 },
                      ].map((session, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex justify-between items-center mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {session.type}
                            </Badge>
                            <span className="text-white font-medium">{session.score}%</span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">
                            {session.date} • {session.questions} questions
                          </p>
                          <Progress value={session.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isLocked ? "blur-sm" : ""}`}>
              {/* Interview Interface */}
              <div className="lg:col-span-2">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Question {currentQuestion + 1} of {questions.length}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {questions[currentQuestion].type}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-[#15cb5e]/30 text-[#15cb5e]">
                          {questions[currentQuestion].difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Question Display */}
                    <div className="p-6 bg-[#15cb5e]/10 rounded-xl border border-[#15cb5e]/30">
                      <div className="flex items-start space-x-3 mb-4">
                        <Volume2 className="w-5 h-5 text-[#15cb5e] mt-1" />
                        <div>
                          <h3 className="text-white font-medium mb-2">Interview Question:</h3>
                          <p className="text-gray-200 text-lg leading-relaxed">{questions[currentQuestion].question}</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                        <p className="text-yellow-300 text-sm">💡 Tip: {questions[currentQuestion].tips}</p>
                      </div>
                    </div>

                    {/* Answer Input */}
                    <div>
                      <h4 className="text-white font-medium mb-3">Your Answer:</h4>
                      <Textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer here or use voice recording..."
                        className="bg-white/10 border-white/20 text-white min-h-[150px] rounded-xl"
                        disabled={isLocked}
                      />
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={() => setIsRecording(!isRecording)}
                          variant={isRecording ? "destructive" : "outline"}
                          className={`rounded-xl ${!isRecording ? "border-white/20 text-gray-300 hover:bg-white/10" : ""}`}
                          disabled={isLocked}
                        >
                          {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                          {isRecording ? "Stop Recording" : "Start Recording"}
                        </Button>
                        {isRecording && (
                          <div className="flex items-center text-red-400">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-2" />
                            Recording...
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          className="border-white/20 text-gray-300 hover:bg-white/10 rounded-xl"
                          disabled={isLocked}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Retry
                        </Button>
                        <Button
                          onClick={handleNextQuestion}
                          className="bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl"
                          disabled={isLocked}
                        >
                          {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Interview"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Real-time Feedback */}
              <div>
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Live Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      {Object.entries(feedback)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                              <span className="text-white font-medium">{value}%</span>
                            </div>
                            <Progress value={value as number} className="h-2" />
                          </div>
                        ))}
                    </div>

                    <div className="p-4 bg-[#15cb5e]/10 rounded-xl border border-[#15cb5e]/30">
                      <h4 className="text-[#15cb5e] font-medium mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Quick Tips:
                      </h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Speak clearly and at a moderate pace</li>
                        <li>• Use specific examples with metrics</li>
                        <li>• Maintain good posture and eye contact</li>
                        <li>• Structure answers using STAR method</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
