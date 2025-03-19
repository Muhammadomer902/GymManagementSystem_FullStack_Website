import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { comparePasswords, generateToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if password matches
    const passwordMatches = await comparePasswords(password, user.password);

    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a token
    const token = generateToken(user._id.toString(), user.role);

    // Session max age from environment or default to 1 day
    const maxAge = parseInt(process.env.SESSION_MAX_AGE || "86400", 10);

    // Convert to plain object and remove password
    const userObj = user.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    return NextResponse.json(
      {
        message: "Login successful",
        user: userWithoutPassword,
        token,
        role: user.role, // Include the role for frontend redirection
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}`,
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
