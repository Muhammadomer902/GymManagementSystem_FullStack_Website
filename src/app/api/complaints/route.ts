import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Complaint from "@/models/Complaint";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

// POST: Submit a new complaint
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const { subject, category, description } = await req.json();
    if (!subject || !category || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await dbConnect();
    const complaint = await Complaint.create({
      user: user.userId,
      subject,
      category,
      description,
      status: "pending",
    });
    return NextResponse.json({ complaint }, { status: 201 });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Get all complaints (admin only)
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    await dbConnect();
    const dbUser = await User.findById(user.userId);
    if (!dbUser || dbUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const complaints = await Complaint.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });
    return NextResponse.json({ complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Update complaint status/response (admin only)
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    await dbConnect();
    const dbUser = await User.findById(user.userId);
    if (!dbUser || dbUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { complaintId, status, response } = await req.json();
    if (!complaintId) {
      return NextResponse.json(
        { error: "Missing complaintId" },
        { status: 400 }
      );
    }
    const update: any = {};
    if (status) update.status = status;
    if (response) {
      update.response = response;
      update.responseDate = new Date();
    }
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { $set: update },
      { new: true }
    ).populate("user", "name email role");
    if (!updatedComplaint) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ complaint: updatedComplaint });
  } catch (error) {
    console.error("Error updating complaint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
