import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const { amount, period, method } = await request.json();
    const trainerId = params.id;

    // Auth check (admin only)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
      if (decoded.role !== "admin") {
        return NextResponse.json({ error: "Not authorized" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(trainerId);
    if (!user || user.role !== "trainer") {
      return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
    }

    // Add payment record
    const paymentRecord = {
      amount,
      paidAt: new Date(),
      period,
      method,
    };

    user.trainerProfile = user.trainerProfile || {};
    user.trainerProfile.payments = user.trainerProfile.payments || [];
    user.trainerProfile.payments.push(paymentRecord);

    await user.save();

    return NextResponse.json(
      { message: "Payment recorded", payment: paymentRecord },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error recording payment:", error);
    return NextResponse.json(
      { error: "Failed to record payment" },
      { status: 500 }
    );
  }
}
