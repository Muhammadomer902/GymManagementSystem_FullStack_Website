import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
  try {
    await connectToDB();
    console.log("Processing update-profile request");

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
      console.log("No token found");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    let userId;
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as { userId: string };
      userId = decoded.userId;
      console.log("User ID from token:", userId);
    } catch (_err) {
      console.log("Invalid token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Use let instead of const for user so we can reassign it later
    let user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
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

      // Use the $set approach for mongoose
      const updateResult = await User.updateOne(
        { _id: userId },
        {
          $set: {
            "trainerProfile.certifications":
              trainerProfile.certifications || [],
            "trainerProfile.experienceYears":
              trainerProfile.experienceYears || 0,
            "trainerProfile.bio": trainerProfile.bio || "",
            "trainerProfile.specialties": trainerProfile.specialties || [],
            "trainerProfile.education": trainerProfile.education || "",
            "trainerProfile.availableHours":
              trainerProfile.availableHours || "",
            "trainerProfile.socialMediaLinks.instagram":
              trainerProfile.socialMediaLinks?.instagram || "",
            "trainerProfile.socialMediaLinks.twitter":
              trainerProfile.socialMediaLinks?.twitter || "",
            "trainerProfile.socialMediaLinks.linkedin":
              trainerProfile.socialMediaLinks?.linkedin || "",
          },
        }
      );

      console.log("Update result:", updateResult);

      // Fetch the updated user
      const updatedUserData = await User.findById(userId);
      if (updatedUserData) {
        user = updatedUserData;
      }

      console.log(
        "Updated trainer profile:",
        JSON.stringify(user.trainerProfile)
      );
    }

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: user,
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
