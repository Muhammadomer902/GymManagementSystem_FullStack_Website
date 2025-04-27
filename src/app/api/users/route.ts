import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    // Get role from query parameter (if any)
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role");

    await connectToDB();

    // Fetch users based on role or all users if no role specified
    const query = role ? { role } : {};
    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
