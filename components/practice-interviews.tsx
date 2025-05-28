"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Brain, Target, Users, Clock, Award } from "lucide-react"

const interviewTypes = [
  {
    icon: Brain,
    title: "Technical Interviews",
    description: "Master coding challenges and system design questions with AI-powered feedback.",
    details: "Algorithm challenges, system design, code reviews, and technical problem-solving scenarios.",
  },
  {
    icon: MessageSquare,
    title: "Behavioral Interviews",
    description: "Practice soft skills and situational questions using the STAR methodology.",
    details: "Leadership scenarios, conflict resolution, teamwork examples, and cultural fit assessments.",
  },
  {
    icon: Target,
    title: "Industry-Specific Prep",
    description: "Tailored questions for your specific role and industry requirements.",
    details: "Role-specific scenarios, industry trends, company culture questions, and domain expertise.",
  },
  {
    icon: Users,
    title: "Panel Interviews",
    description: "Simulate multi-interviewer scenarios with diverse questioning styles.",
    details: "Multiple perspectives, cross-functional questions, stakeholder management, and group dynamics.",
  },
  {
    icon: Clock,
    title: "Timed Challenges",
    description: "Practice under pressure with realistic time constraints and deadlines.",
    details: "Quick thinking exercises, time management, prioritization skills, and stress handling.",
  },
  {
    icon: Award,
    title: "Executive Interviews",
    description: "Prepare for senior-level positions with strategic and leadership questions.",
    details: "Vision setting, strategic thinking, change management, and executive presence.",
  },
]

export function PracticeInterviews() {
  const [hoveredInterview, setHoveredInterview] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section ref={sectionRef} className="py-24 px-6 relative">
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
            <span className="text-[#15cb5e] text-sm font-medium">✦ Practice Interviews</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Master Every{" "}
            <span className="bg-gradient-to-r from-[#15cb5e] to-[#00ff66] bg-clip-text text-transparent">
              Interview
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Practice with AI-generated questions across different interview formats and receive personalized feedback to
            boost your confidence.
          </p>
        </div>

        {/* Interview Types Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {interviewTypes.map((interview, index) => {
            const IconComponent = interview.icon
            const isHovered = hoveredInterview === index

            return (
              <Card
                key={index}
                className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 group ${
                  isHovered ? "bg-white/10 border-[#15cb5e]/30 scale-105" : "hover:bg-white/8 hover:border-white/20"
                }`}
                onMouseEnter={() => setHoveredInterview(index)}
                onMouseLeave={() => setHoveredInterview(null)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 group-hover:bg-[#15cb5e]/20 transition-all duration-300">
                    <IconComponent
                      className={`w-8 h-8 transition-all duration-300 ${isHovered ? "text-[#15cb5e]" : "text-gray-400"}`}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{interview.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{interview.description}</p>

                  {/* Expanded content on hover */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      isHovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-gray-500 text-xs leading-relaxed">{interview.details}</p>
                    </div>
                  </div>
                </CardContent>

                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                    isHovered ? "shadow-lg shadow-[#15cb5e]/20" : ""
                  }`}
                />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
