"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, Zap, Target, CheckCircle, AlertCircle, Download, Eye, Save, Sparkles } from "lucide-react"

export default function ResumeBuilder() {
  const [atsScore, setAtsScore] = useState(78)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const suggestions = [
    { type: "keyword", text: "Add 'React.js' to your skills section", priority: "high" },
    { type: "format", text: "Use bullet points for better readability", priority: "medium" },
    { type: "content", text: "Quantify your achievements with numbers", priority: "high" },
    { type: "keyword", text: "Include 'Agile methodology' for better ATS matching", priority: "medium" },
  ]

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setAtsScore(Math.min(95, atsScore + Math.floor(Math.random() * 10) + 5))
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI Resume Builder</h1>
          <p className="text-gray-300">Create an ATS-optimized resume with AI-powered suggestions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" className="bg-white/10 border-white/20 text-white" />
                  <Input placeholder="Email Address" className="bg-white/10 border-white/20 text-white" />
                  <Input placeholder="Phone Number" className="bg-white/10 border-white/20 text-white" />
                  <Input placeholder="Location" className="bg-white/10 border-white/20 text-white" />
                </div>
                <Input placeholder="LinkedIn Profile" className="bg-white/10 border-white/20 text-white" />
                <Textarea
                  placeholder="Professional Summary"
                  className="bg-white/10 border-white/20 text-white min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Work Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input placeholder="Job Title" className="bg-white/10 border-white/20 text-white" />
                    <Input placeholder="Company Name" className="bg-white/10 border-white/20 text-white" />
                    <Input placeholder="Start Date" className="bg-white/10 border-white/20 text-white" />
                    <Input placeholder="End Date" className="bg-white/10 border-white/20 text-white" />
                  </div>
                  <Textarea
                    placeholder="Job Description and Achievements"
                    className="bg-white/10 border-white/20 text-white min-h-[120px]"
                  />
                </div>
                <Button variant="outline" className="border-purple-500/50 text-purple-300">
                  + Add Another Position
                </Button>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="List your technical and soft skills (comma-separated)"
                  className="bg-white/10 border-white/20 text-white min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* AI Analysis Sidebar */}
          <div className="space-y-6">
            {/* ATS Score */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  ATS Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-white mb-2">{atsScore}%</div>
                  <Progress value={atsScore} className="mb-2" />
                  <Badge variant={atsScore >= 80 ? "default" : "secondary"} className="text-xs">
                    {atsScore >= 80 ? "Excellent" : atsScore >= 60 ? "Good" : "Needs Improvement"}
                  </Badge>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
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
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Resume
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300">
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
