"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, MessageSquare, TrendingUp, BarChart3, Crown, Zap } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    description: "Optimize resumes for ATS compatibility with AI-powered analysis and keyword suggestions.",
    details: "Advanced NLP analysis, ATS scoring, professional templates, and real-time optimization feedback.",
  },
  {
    icon: MessageSquare,
    title: "Interview Simulator",
    description: "Practice with AI-generated questions and get personalized feedback on your responses.",
    details:
      "Technical and behavioral questions, real-time feedback, industry-specific preparation, and confidence scoring.",
  },
  {
    icon: TrendingUp,
    title: "Job Market Analysis",
    description: "Get AI-powered insights into job trends and personalized role recommendations.",
    details: "Market trend analysis, skill gap identification, salary insights, and role matching algorithms.",
  },
  {
    icon: BarChart3,
    title: "Career Dashboard",
    description: "Track your progress with comprehensive analytics and application management.",
    details: "Application tracking, progress analytics, performance metrics, and career growth insights.",
  },
  {
    icon: Crown,
    title: "Premium Features",
    description: "Unlock advanced AI tools and priority support for accelerated career growth.",
    details: "Advanced AI analysis, unlimited features, priority support, and exclusive career resources.",
  },
  {
    icon: Zap,
    title: "Smart Integrations",
    description: "Connect with popular job platforms and career tools seamlessly.",
    details: "LinkedIn integration, job board connections, calendar sync, and automated application tracking.",
  },
]

export function Features() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
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
    <section ref={sectionRef} id="features" className="py-24 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 70%, rgba(0, 255, 102, 0.1) 0%, rgba(0, 255, 102, 0.03) 50%, transparent 80%)`,
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
            <span className="text-[#15cb5e] text-sm font-medium">✦ Powerful Features</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Valuable Features That{" "}
            <span className="bg-gradient-to-r from-[#15cb5e] to-[#00ff66] bg-clip-text text-transparent">We Offer</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our comprehensive suite of AI-powered tools designed to accelerate your career growth and maximize
            your job search success.
          </p>
        </div>

        {/* Features Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            const isHovered = hoveredFeature === index

            return (
              <Card
                key={index}
                className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 group ${
                  isHovered ? "bg-white/10 border-[#15cb5e]/30 scale-105" : "hover:bg-white/8 hover:border-white/20"
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 group-hover:bg-[#15cb5e]/20 transition-all duration-300">
                    <IconComponent
                      className={`w-8 h-8 transition-all duration-300 ${isHovered ? "text-[#15cb5e]" : "text-gray-400"}`}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{feature.description}</p>

                  {/* Expanded content on hover */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      isHovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-gray-500 text-xs leading-relaxed">{feature.details}</p>
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
