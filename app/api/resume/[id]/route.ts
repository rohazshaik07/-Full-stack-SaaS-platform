import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Get the backend URL from environment variables
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    // Forward the request to your backend
    const response = await fetch(`${backendUrl}/api/resume/${id}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ message: "Resume not found" }, { status: 404 })
      }
      throw new Error("Backend request failed")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Get resume API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Get the backend URL from environment variables
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    // Forward the request to your backend
    const response = await fetch(`${backendUrl}/api/resume/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ message: "Resume not found" }, { status: 404 })
      }
      throw new Error("Backend request failed")
    }

    return NextResponse.json({ message: "Resume deleted successfully" })
  } catch (error) {
    console.error("Delete resume API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
