"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X, User } from "lucide-react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <nav className="relative z-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#15cb5e] rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-bold text-white">CareerSync</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">
                Features
              </Link>
              <Link href="#resume" className="text-gray-300 hover:text-white transition-colors duration-300">
                Resume Builder
              </Link>
              <Link href="#interview" className="text-gray-300 hover:text-white transition-colors duration-300">
                Interview Prep
              </Link>

              {!loading && session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full border-2 border-[#15cb5e]/30 hover:border-[#15cb5e] transition-colors p-0 overflow-hidden"
                    >
                      {session.user?.image ? (
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src={session.user.image || "/placeholder.svg"}
                          alt={session.user.name || "User"}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            target.nextElementSibling?.classList.remove("hidden")
                          }}
                        />
                      ) : null}
                      <User className={`h-4 w-4 ${session.user?.image ? "hidden" : ""}`} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-md border-white/10" align="end">
                    <div className="flex items-center justify-start gap-3 p-3">
                      <div className="h-10 w-10 rounded-full border-2 border-[#15cb5e]/30 overflow-hidden">
                        {session.user?.image ? (
                          <img
                            className="h-full w-full object-cover"
                            src={session.user.image || "/placeholder.svg"}
                            alt={session.user.name || "User"}
                          />
                        ) : (
                          <div className="h-full w-full bg-white/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-white">{session.user?.name || "User"}</p>
                        <p className="w-[180px] truncate text-sm text-gray-400">{session.user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="text-gray-300 hover:text-white">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/resumes" className="text-gray-300 hover:text-white">
                        My Resumes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/resume-builder" className="text-gray-300 hover:text-white">
                        Resume Builder
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/interview-simulator" className="text-gray-300 hover:text-white">
                        Interview Simulator
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/job-trends" className="text-gray-300 hover:text-white">
                        Job Trends
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="text-gray-300 hover:text-white cursor-pointer" onClick={handleSignOut}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : !loading ? (
                <>
                  <Link href="/auth/signin">
                    <Button
                      variant="outline"
                      className="border-white/20 text-gray-300 hover:bg-white/10 hover:border-[#15cb5e] rounded-xl transition-all duration-300"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl">Get Started</Button>
                  </Link>
                </>
              ) : null}
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10">
              <div className="flex flex-col space-y-4">
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Features
                </Link>
                <Link href="#resume" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Resume Builder
                </Link>
                <Link href="#interview" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Interview Prep
                </Link>

                {!loading && session ? (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="h-8 w-8 rounded-full border-2 border-[#15cb5e]/30 overflow-hidden">
                        {session.user?.image ? (
                          <img
                            className="h-full w-full object-cover"
                            src={session.user.image || "/placeholder.svg"}
                            alt={session.user.name || "User"}
                          />
                        ) : (
                          <div className="h-full w-full bg-white/10 flex items-center justify-center">
                            <User className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <span className="text-white font-medium">{session.user?.name || "User"}</span>
                    </div>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white">
                      Dashboard
                    </Link>
                    <Link href="/dashboard/resumes" className="text-gray-300 hover:text-white">
                      My Resumes
                    </Link>
                    <Link href="/resume-builder" className="text-gray-300 hover:text-white">
                      Resume Builder
                    </Link>
                    <Link href="/interview-simulator" className="text-gray-300 hover:text-white">
                      Interview Simulator
                    </Link>
                    <Link href="/job-trends" className="text-gray-300 hover:text-white">
                      Job Trends
                    </Link>
                    <Button
                      variant="ghost"
                      className="justify-start p-0 text-gray-300 hover:text-white"
                      onClick={handleSignOut}
                    >
                      Log out
                    </Button>
                  </div>
                ) : !loading ? (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                    <Link href="/auth/signin">
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-gray-300 hover:bg-white/10 rounded-xl"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full bg-[#15cb5e] hover:bg-[#12b854] text-black rounded-xl">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
