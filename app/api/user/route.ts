import { NextResponse } from "next/server"

// In a real application, you would validate against your database
// This is a simplified example with a hardcoded test user
const TEST_USER = {
  id: 1,
  email: "test@example.com",
  name: "Test User",
}

// Simple token verification for demo purposes
function verifySimpleToken(token: string) {
  try {
    // Check if token has the expected format
    if (!token.startsWith("DEMO.")) {
      return null
    }

    // Extract the payload part (second segment)
    const parts = token.split(".")
    if (parts.length !== 3) {
      return null
    }

    // Decode the payload
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString())
    return payload
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

export async function GET(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Extract the token
    const token = authHeader.split(" ")[1]

    // Verify the token
    const decoded = verifySimpleToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    // Return the user data
    return NextResponse.json({
      success: true,
      user: {
        id: TEST_USER.id,
        email: TEST_USER.email,
        name: TEST_USER.name,
      },
    })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }
}
