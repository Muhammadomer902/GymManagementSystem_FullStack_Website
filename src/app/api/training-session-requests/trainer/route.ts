import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TrainingSessionRequest from "@/models/TrainingSessionRequest";
import { getCurrentUser } from "@/lib/auth";

// GET: Trainer views all requests made to them
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    await dbConnect();
    const requests = await TrainingSessionRequest.find({ trainer: user.userId })
      .populate("member", "_id name email")
      .sort({ createdAt: -1 });
    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Error fetching trainer session requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Trainer accepts or rejects a request
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    await dbConnect();
    const { requestId, status, responseMessage } = await req.json();
    if (!requestId || !["accepted", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const request = await TrainingSessionRequest.findOne({
      _id: requestId,
      trainer: user.userId,
    });
    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    request.status = status;
    if (responseMessage) request.responseMessage = responseMessage;
    await request.save();
    return NextResponse.json({ request });
  } catch (error) {
    console.error("Error updating trainer session request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
