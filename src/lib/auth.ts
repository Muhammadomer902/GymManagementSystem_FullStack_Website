import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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
export function generateToken(userId: string, role: string) {
  const secret = process.env.JWT_SECRET || "your-secret-key";
  // You can add more fields if you want
  return jwt.sign({ userId, role }, secret, { expiresIn: "7d" });
}

/**
 * Verify a token (simplified for demo)
 * In a real app, verify the JWT signature and decode the payload
 */
export function verifyToken(
  token: string
): { userId: string; role: string } | null {
  const secret = process.env.JWT_SECRET || "your-secret-key";
  try {
    const decoded = jwt.verify(token, secret) as {
      userId: string;
      role: string;
    };
    return { userId: decoded.userId, role: decoded.role };
  } catch (err) {
    return null;
  }
}

/**
 * Get the current user from the token in cookies
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}
