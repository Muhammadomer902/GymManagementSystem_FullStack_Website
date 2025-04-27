import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

// GET: Get all trainers
export async function GET() {
  try {
    await dbConnect();

    // Find all users with role 'trainer'
    const trainers = await User.find({ role: "trainer" })
      .select("name email role trainerProfile createdAt")
      .sort({ createdAt: -1 });

    // Map the trainers to a more frontend-friendly format
    const formattedTrainers = trainers.map((trainer) => ({
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
      // Supply default image path - in a real app, you would have user profile images
      image:
        "/placeholder.svg?height=400&width=400&text=" +
        trainer.name.split(" ")[0],
    }));

    return NextResponse.json({ trainers: formattedTrainers });
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
