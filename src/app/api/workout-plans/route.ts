import { NextRequest, NextResponse } from "next/server";
import TrainerWorkoutPlan from "@/models/WorkoutPlan";
import User from "@/models/User";
import dbConnect from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// POST: Trainer creates a workout plan for a trainee
export async function POST(req: NextRequest) {
  await dbConnect();
  const user = await getCurrentUser();
  if (!user || user.role !== "trainer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get and clean request body
    const body = await req.json();

    // Create the workout plan (no trainee field anymore)
    const plan = await TrainerWorkoutPlan.create({
      ...body,
      trainer: user.userId,
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error: any) {
    console.error("WorkoutPlan creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create workout plan" },
      { status: 400 }
    );
  }
}

// GET: Member or trainer views workout plans
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    // Get query params
    const url = new URL(req.url);
    const trainerId = url.searchParams.get("trainerId");

    console.log(
      "Received request for workout plans with trainerId:",
      trainerId
    );

    let plans = [];

    // If trainerId is provided, find plans for that trainer
    if (trainerId) {
      plans = await TrainerWorkoutPlan.find({ trainer: trainerId });
      console.log(
        `Found ${plans.length} workout plans for trainer ${trainerId}`
      );
    } else {
      // Otherwise, get plans for the current user if authenticated
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      plans = await TrainerWorkoutPlan.find({ trainer: user.userId });
      console.log(`Found ${plans.length} workout plans for current user`);
    }

    // Create a temporary plan for testing if no plans are found
    if (plans.length === 0) {
      console.log("No plans found, adding a temporary test plan");
      const tempPlan = {
        _id: "temp123",
        title: "Demo Workout Plan",
        description: "This is a temporary demo plan created by the API",
        level: "Beginner",
        duration: 45,
        schedule: "3x per week",
        exercises: [
          { name: "Push-ups", sets: 3, reps: "10", rest: "60 sec" },
          { name: "Squats", sets: 3, reps: "15", rest: "60 sec" },
          { name: "Planks", sets: 3, reps: "30 sec", rest: "45 sec" },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      plans = [tempPlan];
    }

    // Ensure we're returning JSON with the correct headers
    return new NextResponse(JSON.stringify(plans), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Error in workout plans API:", error);
    return new NextResponse(
      JSON.stringify({
        error: error.message || "Failed to fetch workout plans",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
