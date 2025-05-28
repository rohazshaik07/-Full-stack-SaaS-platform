"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Search, MapPin, DollarSign, Calendar, ArrowUp, ArrowDown, Target, Briefcase } from "lucide-react"

export default function JobTrends() {
  const [selectedSkill, setSelectedSkill] = useState("React")

  const trendingSkills = [
    { name: "React", demand: 95, growth: 12, salary: "$85k-$120k", jobs: 1250 },
    { name: "TypeScript", demand: 88, growth: 25, salary: "$80k-$115k", jobs: 980 },
    { name: "Node.js", demand: 82, growth: 8, salary: "$75k-$110k", jobs: 850 },
    { name: "Python", demand: 90, growth: 15, salary: "$70k-$105k", jobs: 1100 },
    { name: "AWS", demand: 85, growth: 20, salary: "$90k-$130k", jobs: 750 },
    { name: "Docker", demand: 78, growth: 18, salary: "$85k-$125k", jobs: 650 },
  ]

  const jobRecommendations = [
    {
      title: "Senior React Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$120k-$150k",
      match: 95,
      posted: "2 days ago",
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$100k-$130k",
      match: 88,
      posted: "1 day ago",
      skills: ["React", "Python", "AWS"],
    },
    {
      title: "Frontend Developer",
      company: "DesignCo",
      location: "New York, NY",
      salary: "$90k-$120k",
      match: 82,
      posted: "3 days ago",
      skills: ["React", "TypeScript", "CSS"],
    },
  ]

  const marketInsights = [
    {
      title: "Remote Work Trend",
      description: "65% of tech jobs now offer remote work options",
      trend: "up",
      percentage: 15,
    },
    {
      title: "AI/ML Demand",
      description: "Machine learning roles increased by 40% this quarter",
      trend: "up",
      percentage: 40,
    },
    {
      title: "Startup Hiring",
      description: "Startup hiring slowed by 8% compared to last quarter",
      trend: "down",
      percentage: 8,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Job Market Analysis</h1>
          <p className="text-gray-300">AI-powered insights into job trends and market demand</p>
        </div>

        {/* Search */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search for skills, job titles, or companies..."
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="flex gap-4">
                <Input placeholder="Location" className="bg-white/10 border-white/20 text-white w-40" />
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Search className="w-4 h-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trending Skills */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trending Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendingSkills.map((skill, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                        selectedSkill === skill.name
                          ? "bg-purple-500/20 border-purple-500/50"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                      onClick={() => setSelectedSkill(skill.name)}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-medium">{skill.name}</h3>
                        <Badge variant={skill.growth > 15 ? "default" : "secondary"} className="text-xs">
                          {skill.growth > 0 ? "+" : ""}
                          {skill.growth}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Demand</span>
                            <span className="text-white">{skill.demand}%</span>
                          </div>
                          <Progress value={skill.demand} />
                        </div>
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>{skill.salary}</span>
                          <span>{skill.jobs} jobs</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Recommendations */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Recommended Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobRecommendations.map((job, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-medium text-lg">{job.title}</h3>
                          <p className="text-gray-300">{job.company}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{job.match}% match</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-gray-300">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          {job.posted}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        <Briefcase className="w-4 h-4 mr-2" />
                        View Job Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Insights */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketInsights.map((insight, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium text-sm">{insight.title}</h4>
                        <div
                          className={`flex items-center ${insight.trend === "up" ? "text-green-400" : "text-red-400"}`}
                        >
                          {insight.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                          <span className="text-xs ml-1">{insight.percentage}%</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Analysis */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Skill Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">78%</div>
                    <p className="text-gray-400 text-sm">Skills Match</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Strong Skills</span>
                        <span className="text-green-400">5</span>
                      </div>
                      <div className="flex gap-1">
                        {["React", "JavaScript", "CSS", "Git", "HTML"].map((skill) => (
                          <Badge key={skill} className="bg-green-500/20 text-green-300 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Skills to Improve</span>
                        <span className="text-yellow-400">3</span>
                      </div>
                      <div className="flex gap-1">
                        {["TypeScript", "AWS", "Docker"].map((skill) => (
                          <Badge key={skill} className="bg-yellow-500/20 text-yellow-300 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Get Learning Path</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Jobs Analyzed</span>
                    <span className="text-white font-medium">15,420</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Average Salary</span>
                    <span className="text-white font-medium">$95k</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Remote Jobs</span>
                    <span className="text-white font-medium">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-white font-medium">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
