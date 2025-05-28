"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "What types of AI capabilities does your platform offer?",
    answer:
      "Our platform offers comprehensive AI-powered resume optimization, interview simulation with real-time feedback, job market analysis, ATS scoring, keyword optimization, and personalized career recommendations based on your skills and experience.",
  },
  {
    question: "How does your platform ensure data privacy and security?",
    answer:
      "We implement enterprise-grade security measures including end-to-end encryption, secure data storage, GDPR compliance, and strict access controls. Your personal information and resume data are never shared with third parties without your explicit consent.",
  },
  {
    question: "Can your platform integrate with our existing software systems?",
    answer:
      "Yes, our platform offers seamless integrations with popular job boards, LinkedIn, ATS systems, calendar applications, and HR management tools. We also provide API access for custom integrations with your existing workflow.",
  },
  {
    question: "What kind of support and training do you provide to users?",
    answer:
      "We offer comprehensive onboarding, video tutorials, live chat support, email assistance, and dedicated account management for premium users. Our knowledge base includes step-by-step guides and best practices for career advancement.",
  },
  {
    question: "How scalable is your platform as our business grows?",
    answer:
      "Our cloud-based infrastructure automatically scales to accommodate growing user bases. We offer flexible pricing tiers and enterprise solutions that can handle unlimited users, custom features, and dedicated support as your organization expands.",
  },
  {
    question: "Is there a trial period or demo available before committing to a subscription?",
    answer:
      "Yes, we offer a 14-day free trial with full access to all features. Additionally, you can schedule a personalized demo with our team to see how the platform can specifically benefit your career goals or organization.",
  },
]

export function FAQs() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
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

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section ref={sectionRef} className="py-24 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(0, 255, 102, 0.06) 0%, rgba(0, 255, 102, 0.01) 70%, transparent 90%)`,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
            <span className="text-[#15cb5e] text-sm font-medium">✦ FAQs</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Answers to some of your{" "}
            <span className="bg-gradient-to-r from-[#15cb5e] to-[#00ff66] bg-clip-text text-transparent">
              questions
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find answers to commonly asked questions about our AI-powered career platform and how it can help accelerate
            your professional growth.
          </p>
        </div>

        {/* FAQ Items */}
        <div
          className={`space-y-4 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/8"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                >
                  <span className="text-white font-medium text-lg pr-4">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <Minus className="w-5 h-5 text-[#15cb5e]" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    openFAQ === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
