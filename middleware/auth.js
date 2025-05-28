import { getToken } from "next-auth/jwt"

export const auth = async (req, res, next) => {
  try {
    // Get token from NextAuth.js
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" })
    }

    // Add user info to request
    req.user = {
      id: token.id || token.sub,
      email: token.email,
    }

    next()
  } catch (error) {
    console.error("Authentication error:", error)
    res.status(401).json({ message: "Unauthorized: Invalid token" })
  }
}
