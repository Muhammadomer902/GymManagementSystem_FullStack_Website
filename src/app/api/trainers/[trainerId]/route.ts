import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

// GET: Get a single trainer by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { trainerId: string } }
) {
  try {
    await dbConnect();

    const { trainerId } = params;

    // Find the trainer by ID
    const trainer = await User.findOne({
      _id: trainerId,
      role: "trainer",
    }).select("name email role trainerProfile createdAt");

    if (!trainer) {
      return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
    }

    // Format the trainer data for the frontend
    const formattedTrainer = {
      id: trainer._id,
      name: trainer.name,
      email: trainer.email,
      specialty:
        trainer.trainerProfile?.specialties?.join(", ") || "General Fitness",
      experience: trainer.trainerProfile?.experienceYears
        ? `${trainer.trainerProfile.experienceYears}+ years`
        : "New Trainer",
      bio: trainer.trainerProfile?.bio || "No bio available",
      certifications: trainer.trainerProfile?.certifications || [],
      education: trainer.trainerProfile?.education || "",
      availableHours:
        trainer.trainerProfile?.availableHours || "Contact for availability",
    };

    return NextResponse.json({ trainer: formattedTrainer });
  } catch (error) {
    console.error("Error fetching trainer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
