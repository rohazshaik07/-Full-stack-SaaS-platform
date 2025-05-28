import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get the backend URL from environment variables
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    // Forward the request to your backend
    const response = await fetch(`${backendUrl}/api/resume`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Backend request failed")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Get resumes API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
