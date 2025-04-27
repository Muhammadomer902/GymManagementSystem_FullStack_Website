import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Complaint from "@/models/Complaint";
import { getCurrentUser } from "@/lib/auth";

// GET: Get complaints submitted by the current user
export async function GET() {
  try {
    const user = getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    await dbConnect();
    const complaints = await Complaint.find({ user: user.userId }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ complaints });
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
