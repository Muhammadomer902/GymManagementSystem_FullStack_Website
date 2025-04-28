import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Complaint from "@/models/Complaint";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "month";

    // Calculate date ranges based on period
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case "day":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 1);
    }

    // Fetch user statistics
    const [users, trainers, pendingComplaints, recentActivityData] =
      await Promise.all([
        User.countDocuments({ role: "user" }),
        User.countDocuments({ role: "trainer" }),
        Complaint.countDocuments({ status: "pending" }),
        getRecentActivity(startDate),
      ]);

    // Calculate revenue and other financial metrics
    // In a real app, this would fetch from a payment/transaction model
    const monthlyRevenue = await estimateMonthlyRevenue();
    const unpaidFees = await estimateUnpaidFees();

    // Get trainers waiting for assignment
    const pendingAssignments = 5; // This would be a real count in production

    // Fetch recent complaints for the dashboard
    const recentComplaints = await Complaint.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("user", "name email role")
      .lean();

    // Format complaints for the frontend
    const formattedComplaints = recentComplaints.map((complaint) => ({
      id: complaint._id.toString(),
      user: complaint.user.name,
      userType: complaint.user.role === "trainer" ? "Trainer" : "Member",
      date: complaint.createdAt.toISOString().split("T")[0],
      subject: complaint.subject,
      priority: getPriorityFromCategory(complaint.category),
    }));

    return NextResponse.json({
      stats: {
        totalUsers: users,
        totalTrainers: trainers,
        pendingComplaints,
        monthlyRevenue,
        pendingAssignments,
        unpaidFees,
      },
      recentActivity: recentActivityData,
      pendingComplaints: formattedComplaints,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

// Helper function to get recent activity
async function getRecentActivity(startDate: Date) {
  // In a production app, this would query your activity log or events collection
  // For now, we'll generate some mock data based on real user counts

  const recentUsers = await User.find({ createdAt: { $gte: startDate } })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("name role createdAt")
    .lean();

  // Transform users into activity items
  const activities = recentUsers.map((user) => {
    const hoursSince = Math.floor(
      (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60)
    );
    let timeAgo;

    if (hoursSince < 1) {
      timeAgo = "just now";
    } else if (hoursSince === 1) {
      timeAgo = "1 hour ago";
    } else if (hoursSince < 24) {
      timeAgo = `${hoursSince} hours ago`;
    } else {
      timeAgo = `${Math.floor(hoursSince / 24)} days ago`;
    }

    return {
      id: user._id.toString(),
      type: "new_user",
      name: user.name,
      time: timeAgo,
      details:
        user.role === "trainer"
          ? "New trainer registered"
          : "New user registered",
    };
  });

  // Add some mock payment activities
  // In a real app, these would come from your payment records
  const mockActivities = [
    {
      id: "payment1",
      type: "payment",
      name: "Emily Johnson",
      time: "1 day ago",
      details: "Paid monthly membership fee ($49.99)",
    },
    {
      id: "payment2",
      type: "trainer_payment",
      name: "David Wilson (Trainer)",
      time: "2 days ago",
      details: "Received payment for November ($1,200)",
    },
  ];

  return [...activities, ...mockActivities].slice(0, 5);
}

// Helper function to estimate monthly revenue
async function estimateMonthlyRevenue() {
  // In a real app, this would sum actual payment records
  const userCount = await User.countDocuments({ role: "user" });
  const avgUserFee = 49.99;

  const trainerCount = await User.countDocuments({ role: "trainer" });
  const avgTrainerCommission = 400;

  return Math.floor(
    userCount * avgUserFee + trainerCount * avgTrainerCommission
  );
}

// Helper function to estimate unpaid fees
async function estimateUnpaidFees() {
  // In a real app, this would count users with overdue payments
  const userCount = await User.countDocuments({ role: "user" });
  return Math.floor(userCount * 0.15); // Assume 15% of users have unpaid fees
}

// Helper function to determine priority from complaint category
function getPriorityFromCategory(category: string): "high" | "medium" | "low" {
  const highPriorityCategories = ["billing", "security", "injury", "emergency"];
  const mediumPriorityCategories = [
    "equipment",
    "cleanliness",
    "staff",
    "scheduling",
  ];

  category = category.toLowerCase();

  if (highPriorityCategories.some((c) => category.includes(c))) {
    return "high";
  } else if (mediumPriorityCategories.some((c) => category.includes(c))) {
    return "medium";
  } else {
    return "low";
  }
}
