import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare a password with a hashed password
 */
export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a simple token (for demo purposes)
 * In a real app, use a proper JWT library
 */
export function generateToken(userId: string, role: string): string {
  return `demo-token-${userId}-${Date.now()}`;
}

/**
 * Verify a token (simplified for demo)
 * In a real app, verify the JWT signature and decode the payload
 */
export function verifyToken(
  token: string
): { userId: string; role: string } | null {
  // This is a simplified mock implementation
  if (!token || !token.startsWith("demo-token-")) {
    return null;
  }

  // Extract user ID from our mock token format: demo-token-{userId}-{timestamp}
  const parts = token.split("-");
  if (parts.length < 3) {
    return null;
  }

  const userId = parts[2];
  return { userId, role: "user" }; // In a real app, extract role from JWT
}

/**
 * Get the current user from the token in cookies
 */
export function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}
