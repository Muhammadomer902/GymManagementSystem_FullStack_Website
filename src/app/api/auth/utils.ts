import { NextRequest, NextResponse } from "next/server";
import { users } from "./data";

// Mock JWT verification (in a real app, you would use a proper JWT library)
export function verifyToken(token: string) {
  // This is a simplified mock implementation
  // In a real app, you would verify the JWT signature and decode the payload

  if (!token || !token.startsWith("demo-token-")) {
    return null;
  }

  // Extract user ID from our mock token format: demo-token-{userId}-{timestamp}
  const parts = token.split("-");
  if (parts.length < 3) {
    return null;
  }

  const userId = parts[2];
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return null;
  }

  // Return user info without password
  const { password, ...userInfo } = user;
  return userInfo;
}

// Helper function to protect API routes
export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
  // Get token from cookie
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify token
  const user = verifyToken(token);

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Call original handler with authenticated user
  return handler(request, user);
}
