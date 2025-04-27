import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
  try {
    await connectToDB();

    const {
      name,
      email,
      currentPassword,
      newPassword,
      memberProfile,
      trainerProfile,
    } = await request.json();

    // Get authenticated user from cookie (correctly awaited)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    let userId;
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as { userId: string };
      userId = decoded.userId;
    } catch (_err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Handle password change if requested
    if (newPassword && currentPassword) {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        );
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    // Update user information
    user.name = name || user.name;
    user.email = email || user.email;

    // Check if email is already in use by another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    // Update memberProfile if present
    if (memberProfile) {
      user.memberProfile = {
        ...user.memberProfile,
        ...memberProfile,
      };
    }

    // Update trainerProfile if present
    if (trainerProfile) {
      console.log(
        "Trainer profile data received:",
        JSON.stringify(trainerProfile)
      );

      // Always assign all fields, even if empty
      user.trainerProfile = {
        certifications: Array.isArray(trainerProfile.certifications)
          ? trainerProfile.certifications
          : [],
        experienceYears:
          typeof trainerProfile.experienceYears === "number"
            ? trainerProfile.experienceYears
            : 0,
        bio: typeof trainerProfile.bio === "string" ? trainerProfile.bio : "",
        specialties: Array.isArray(trainerProfile.specialties)
          ? trainerProfile.specialties
          : [],
        education:
          typeof trainerProfile.education === "string"
            ? trainerProfile.education
            : "",
        availableHours:
          typeof trainerProfile.availableHours === "string"
            ? trainerProfile.availableHours
            : "",
        socialMediaLinks: {
          instagram: trainerProfile.socialMediaLinks?.instagram ?? "",
          twitter: trainerProfile.socialMediaLinks?.twitter ?? "",
          linkedin: trainerProfile.socialMediaLinks?.linkedin ?? "",
        },
      };

      console.log(
        "Updated trainer profile:",
        JSON.stringify(user.trainerProfile)
      );
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user information" },
      { status: 500 }
    );
  }
}
