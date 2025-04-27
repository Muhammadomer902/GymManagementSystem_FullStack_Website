import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import WorkoutSession from "@/models/WorkoutSession";
import { getCurrentUser } from "@/lib/auth";

// POST: Create a new workout session
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const sessionData = await req.json();
    const { title, duration, exercises, notes, workoutPlanId } = sessionData;

    if (!title || !duration || !exercises || exercises.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const workoutSession = await WorkoutSession.create({
      user: user.userId,
      title,
      duration,
      exercises,
      notes,
      workoutPlanId,
      date: new Date(),
    });

    return NextResponse.json({ workoutSession }, { status: 201 });
  } catch (error) {
    console.error("Error creating workout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Get all workout sessions for the current user
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await dbConnect();

    const workoutSessions = await WorkoutSession.find({
      user: user.userId,
    }).sort({ date: -1 });

    return NextResponse.json({ workoutSessions });
  } catch (error) {
    console.error("Error fetching workout sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
