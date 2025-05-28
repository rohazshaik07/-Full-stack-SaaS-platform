"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Chrome, Star, Zap } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export function SignInPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(90) // 1.5 minutes
  const { data: session } = useSession()

  useEffect(() => {
    // Don't show popup if user is already signed in
    if (session) return

    // Show popup after a short delay
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 3000) // Show after 3 seconds

    // Auto-hide after 1.5 minutes
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 93000) // 93 seconds (3s delay + 90s visible)

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsVisible(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearInterval(countdownInterval)
    }
  }, [session])

  if (!isVisible || session) return null

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-md w-full animate-fade-in-up">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="absolute right-2 top-2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#15cb5e] to-[#00ff66] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">Unlock Your Career Potential! 🚀</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <div>
            <p className="text-gray-300 mb-4">
              Sign in with Google to access AI-powered resume optimization, interview practice, and personalized job
              insights.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-xs text-gray-400">AI Resume Builder</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-xs text-gray-400">Interview Practice</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#15cb5e]/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Chrome className="w-6 h-6 text-[#15cb5e]" />
                </div>
                <p className="text-xs text-gray-400">Market Insights</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/auth/signin">
              <Button
                className="w-full bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl font-semibold"
                onClick={() => setIsVisible(false)}
              >
                <Chrome className="w-5 h-5 mr-2" />
                Sign In with OAuth
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full border-white/20 text-gray-300 hover:bg-white/10 rounded-xl"
              onClick={() => setIsVisible(false)}
            >
              Maybe Later
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            This popup will close in {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
