"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, ChevronDown, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { SignInPopup } from "@/components/signin-popup"
import { useSession } from "next-auth/react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPricingPopup, setShowPricingPopup] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    setIsVisible(true)

    // Auto-popup pricing section after 1 minute for signed-in users
    if (session) {
      const timer = setTimeout(() => {
        setShowPricingPopup(true)
      }, 60000) // 60 seconds

      return () => clearTimeout(timer)
    }
  }, [session])

  const handleWatchDemo = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
  }

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing")
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" })
    }
    setShowPricingPopup(false)
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Sign-in Popup */}
      <SignInPopup />

      {/* Background with grid pattern */}
      <div className="absolute inset-0 bg-black">
        {/* Grid pattern background */}
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
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, rgba(0, 255, 102, 0.15) 0%, rgba(0, 255, 102, 0.05) 40%, transparent 70%)`,
          }}
        />
        {/* Additional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
              <div className="w-2 h-2 bg-[#15cb5e] rounded-full mr-3 animate-pulse" />
              <span className="text-gray-300 text-sm font-medium">AI-Powered Career Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-[88px] font-bold text-white mb-6 leading-tight tracking-tight">
              Land Your{" "}
              <span className="bg-gradient-to-r from-[#15cb5e] via-[#00ff66] to-[#15cb5e] bg-clip-text text-transparent">
                Dream Job
              </span>
              <br />
              with AI
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your career with AI-powered resume optimization, interview preparation, and job market insights.
              Join thousands of professionals accelerating their growth.
            </p>

            {/* CTA Buttons - Dynamic based on authentication */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              {session ? (
                // Authenticated user buttons
                <>
                  <Link href="/resume-builder">
                    <Button
                      size="lg"
                      className="bg-[#15cb5e] hover:bg-[#12b854] text-black px-8 py-4 text-lg font-semibold rounded-xl group transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#15cb5e]/25"
                    >
                      <FileText className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      Build My Resume
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Link href="/interview-simulator">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/20 text-gray-300 hover:bg-white/10 hover:border-[#15cb5e] px-8 py-4 text-lg rounded-xl group transition-all duration-300 backdrop-blur-md"
                    >
                      <MessageSquare className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      Prepare for Interview
                    </Button>
                  </Link>
                </>
              ) : (
                // Non-authenticated user buttons
                <>
                  <Link href="/auth/signin">
                    <Button
                      size="lg"
                      className="bg-[#15cb5e] hover:bg-[#12b854] text-black px-8 py-4 text-lg font-semibold rounded-xl group transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#15cb5e]/25"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Button
                    onClick={handleWatchDemo}
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-gray-300 hover:bg-white/10 hover:border-[#15cb5e] px-8 py-4 text-lg rounded-xl group transition-all duration-300 backdrop-blur-md"
                  >
                    <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Watch Demo
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#15cb5e]/30 transition-all duration-300 group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  10K+
                </div>
                <div className="text-gray-400">Active Users</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#15cb5e]/30 transition-all duration-300 group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  85%
                </div>
                <div className="text-gray-400">Success Rate</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#15cb5e]/30 transition-all duration-300 group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  50K+
                </div>
                <div className="text-gray-400">Resumes Optimized</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="animate-bounce">
          <div className="flex flex-col items-center text-gray-400">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Pricing Popup for signed-in users */}
      {showPricingPopup && session && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Unlock Premium Features!</h3>
            <p className="text-gray-300 mb-6">
              Get unlimited access to AI-powered tools, advanced analytics, and priority support.
            </p>
            <div className="flex flex-col gap-4">
              <Button onClick={scrollToPricing} className="bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl">
                View Pricing Plans
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPricingPopup(false)}
                className="border-white/20 text-gray-300 hover:bg-white/10 rounded-xl"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#15cb5e] rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#00ff66] rounded-full animate-ping delay-1000" />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-[#15cb5e] rounded-full animate-ping delay-2000" />
      </div>
    </section>
  )
}
