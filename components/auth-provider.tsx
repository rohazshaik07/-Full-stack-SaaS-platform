"use client"

import { createContext, useContext, type ReactNode } from "react"
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react"
import type { Session } from "next-auth"

interface AuthContextType {
  user: Session["user"] | null
  login: (email: string, password: string) => Promise<void>
  loginWithOAuth: (provider: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProviderInner({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const login = async (email: string, password: string) => {
    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const loginWithOAuth = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: "/" })
    } catch (error) {
      console.error("OAuth login error:", error)
      throw error
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    }
  }

  const logout = () => {
    try {
      signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        login,
        loginWithOAuth,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider
      // Add error handling for session provider
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
