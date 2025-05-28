"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Mic, MicOff, Play, Star, TrendingUp, Target } from "lucide-react"

export default function InterviewSimulator() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")

  const questions = [
    {
      type: "behavioral",
      question:
        "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
      tips: "Use the STAR method: Situation, Task, Action, Result",
    },
    {
      type: "technical",
      question: "Explain the difference between React hooks and class components. When would you use each?",
      tips: "Focus on lifecycle methods, state management, and performance",
    },
    {
      type: "behavioral",
      question:
        "Describe a challenging project you worked on. What made it challenging and how did you overcome the obstacles?",
      tips: "Highlight problem-solving skills and resilience",
    },
  ]

  const feedback = {
    overall: 78,
    communication: 85,
    technical: 72,
    confidence: 80,
    suggestions: [
      "Provide more specific examples with quantifiable results",
      "Speak more slowly and clearly",
      "Use more technical terminology when appropriate",
      "Maintain better eye contact with the camera",
    ],
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Interview Simulator</h1>
          <p className="text-gray-300">Practice with AI-generated questions and get personalized feedback</p>
        </div>

        {!isInterviewActive ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interview Setup */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Interview Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-4">Select Interview Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className="h-20 border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                      >
                        <div className="text-center">
                          <Target className="w-6 h-6 mx-auto mb-2" />
                          <div>Technical</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-20 border-blue-500/50 text-blue-300 hover:bg-blue-500/20">
                        <div className="text-center">
                          <MessageSquare className="w-6 h-6 mx-auto mb-2" />
                          <div>Behavioral</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 border-green-500/50 text-green-300 hover:bg-green-500/20"
                      >
                        <div className="text-center">
                          <Star className="w-6 h-6 mx-auto mb-2" />
                          <div>Mixed</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-4">Job Role</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        "Frontend Developer",
                        "Backend Developer",
                        "Full Stack",
                        "DevOps Engineer",
                        "Data Scientist",
                        "Product Manager",
                        "UI/UX Designer",
                        "Software Architect",
                      ].map((role) => (
                        <Button
                          key={role}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800/50 text-sm"
                        >
                          {role}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-4">Experience Level</h3>
                    <div className="flex gap-4">
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800/50">
                        Entry Level
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800/50">
                        Mid Level
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800/50">
                        Senior Level
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartInterview}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Interview Simulation
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Previous Sessions */}
            <div>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Previous Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: "Yesterday", score: 85, type: "Technical" },
                      { date: "3 days ago", score: 78, type: "Behavioral" },
                      { date: "1 week ago", score: 72, type: "Mixed" },
                    ].map((session, index) => (
                      <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {session.type}
                          </Badge>
                          <span className="text-white font-medium">{session.score}%</span>
                        </div>
                        <p className="text-gray-400 text-sm">{session.date}</p>
                        <Progress value={session.score} className="mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interview Interface */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Question {currentQuestion + 1} of {questions.length}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {questions[currentQuestion].type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <h3 className="text-white font-medium mb-4">Interview Question:</h3>
                    <p className="text-gray-200 text-lg leading-relaxed">{questions[currentQuestion].question}</p>
                    <div className="mt-4 p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                      <p className="text-yellow-300 text-sm">💡 Tip: {questions[currentQuestion].tips}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Your Answer:</h4>
                    <Textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here or use voice recording..."
                      className="bg-white/10 border-white/20 text-white min-h-[150px]"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={() => setIsRecording(!isRecording)}
                        variant={isRecording ? "destructive" : "outline"}
                        className={isRecording ? "" : "border-gray-600 text-gray-300"}
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

                    <Button
                      onClick={handleNextQuestion}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Interview"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Feedback */}
            <div>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Live Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Communication</span>
                        <span className="text-white">{feedback.communication}%</span>
                      </div>
                      <Progress value={feedback.communication} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Technical Depth</span>
                        <span className="text-white">{feedback.technical}%</span>
                      </div>
                      <Progress value={feedback.technical} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Confidence</span>
                        <span className="text-white">{feedback.confidence}%</span>
                      </div>
                      <Progress value={feedback.confidence} />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <h4 className="text-purple-300 font-medium mb-2">Quick Tips:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Speak clearly and at a moderate pace</li>
                      <li>• Use specific examples</li>
                      <li>• Maintain good posture</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
