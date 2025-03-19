import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json(
      { message: "Logged out successfully" },
      {
        status: 200,
        headers: {
          // Clear the token cookie
          "Set-Cookie": `token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
        },
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
