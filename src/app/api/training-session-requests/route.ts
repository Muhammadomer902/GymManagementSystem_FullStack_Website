import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TrainingSessionRequest from "@/models/TrainingSessionRequest";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

// POST: Member requests a session with a trainer
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    await dbConnect();
    const { trainerId, requestedDate, message } = await req.json();
    if (!trainerId || !requestedDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Check trainer exists and is a trainer
    const trainer = await User.findById(trainerId);
    if (!trainer || trainer.role !== "trainer") {
      return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
    }
    const sessionRequest = await TrainingSessionRequest.create({
      member: user.userId,
      trainer: trainerId,
      requestedDate: new Date(requestedDate),
      message,
      status: "pending",
    });
    return NextResponse.json({ sessionRequest }, { status: 201 });
  } catch (error) {
    console.error("Error creating training session request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Member views their session requests
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    await dbConnect();
    const requests = await TrainingSessionRequest.find({ member: user.userId })
      .populate("trainer", "name email trainerProfile")
      .sort({ createdAt: -1 });
    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Error fetching training session requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
