import { NextResponse } from "next/server"

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

// Sample data - in a real app, this would come from your database
const biodigesterData = {
  wasteProcessed: [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 300 },
    { month: "Mar", value: 200 },
    { month: "Apr", value: 278 },
    { month: "May", value: 189 },
    { month: "Jun", value: 239 },
    { month: "Jul", value: 349 },
  ],
  energyGenerated: [
    { month: "Jan", value: 240 },
    { month: "Feb", value: 139 },
    { month: "Mar", value: 980 },
    { month: "Apr", value: 390 },
    { month: "May", value: 480 },
    { month: "Jun", value: 380 },
    { month: "Jul", value: 430 },
  ],
  taxDeduction: [
    { month: "Jan", value: 100 },
    { month: "Feb", value: 80 },
    { month: "Mar", value: 200 },
    { month: "Apr", value: 108 },
    { month: "May", value: 120 },
    { month: "Jun", value: 150 },
    { month: "Jul", value: 180 },
  ],
  stats: {
    wasteProcessed: {
      value: "2,840",
      unit: "kg",
      change: "+12.5%",
      increasing: true,
    },
    energyGenerated: {
      value: "1,245",
      unit: "kWh",
      change: "+8.2%",
      increasing: true,
    },
    taxDeduction: {
      value: "$3,450",
      unit: "",
      change: "-2.5%",
      increasing: false,
    },
    efficiency: {
      value: "94.2",
      unit: "%",
      change: "+1.2%",
      increasing: true,
    },
  },
  recentActivity: [
    {
      id: 1,
      type: "success",
      message: "Biodigester maintenance completed",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "warning",
      message: "Temperature levels above normal",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      type: "info",
      message: "New waste batch processed",
      timestamp: "Yesterday",
    },
    {
      id: 4,
      type: "success",
      message: "Energy output increased by 15%",
      timestamp: "2 days ago",
    },
    {
      id: 5,
      type: "warning",
      message: "pH levels need adjustment",
      timestamp: "3 days ago",
    },
  ],
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

    // Return the biodigester data
    return NextResponse.json({
      success: true,
      data: biodigesterData,
    })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }
}
