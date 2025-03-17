"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  DollarSign,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  ChevronRight,
  UserPlus,
  CreditCard,
  FileText,
  Dumbbell,
} from "lucide-react"

// Mock data
const adminStats = {
  totalUsers: 245,
  totalTrainers: 12,
  pendingComplaints: 8,
  monthlyRevenue: 12580,
  pendingAssignments: 5,
  unpaidFees: 15,
}

const recentActivities = [
  {
    id: 1,
    type: "new_user",
    name: "John Smith",
    time: "10 minutes ago",
    details: "New user registered",
  },
  {
    id: 2,
    type: "payment",
    name: "Emily Johnson",
    time: "1 hour ago",
    details: "Paid monthly membership fee ($49.99)",
  },
  {
    id: 3,
    type: "complaint",
    name: "Michael Brown",
    time: "2 hours ago",
    details: "Submitted a complaint about equipment",
  },
  {
    id: 4,
    type: "trainer_assignment",
    name: "Sarah Davis",
    time: "3 hours ago",
    details: "Assigned to trainer Alex Johnson",
  },
  {
    id: 5,
    type: "trainer_payment",
    name: "David Wilson (Trainer)",
    time: "5 hours ago",
    details: "Received payment for November ($1,200)",
  },
]

const pendingComplaints = [
  {
    id: 101,
    user: "Robert Taylor",
    userType: "Member",
    date: "2023-11-18",
    subject: "Locker Room Issue",
    priority: "high",
  },
  {
    id: 102,
    user: "Jennifer Lee",
    userType: "Member",
    date: "2023-11-17",
    subject: "Billing Discrepancy",
    priority: "medium",
  },
  {
    id: 103,
    user: "Michael Chen",
    userType: "Trainer",
    date: "2023-11-15",
    subject: "Schedule Conflict",
    priority: "low",
  },
]

export default function AdminDashboard() {
  const [period, setPeriod] = useState("month")

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            High
          </span>
        )
      case "medium":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Medium
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Low
          </span>
        )
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-gray-600">Overview of gym management system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Members</h2>
                <p className="text-2xl font-bold text-gray-900">{adminStats.totalUsers}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/user-fee"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View all members
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Dumbbell className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Trainers</h2>
                <p className="text-2xl font-bold text-gray-900">{adminStats.totalTrainers}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/trainer-payment"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View all trainers
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Monthly Revenue</h2>
                <p className="text-2xl font-bold text-gray-900">${adminStats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>8% increase from last month</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Pending Complaints</h2>
                <p className="text-2xl font-bold text-gray-900">{adminStats.pendingComplaints}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/complaint-handling"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View complaints
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <UserPlus className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Pending Trainer Assignments</h2>
                <p className="text-2xl font-bold text-gray-900">{adminStats.pendingAssignments}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/trainer-assignment"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                Manage assignments
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Unpaid User Fees</h2>
                <p className="text-2xl font-bold text-gray-900">{adminStats.unpaidFees}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/user-fee"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View unpaid fees
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 text-sm rounded-md ${
                        period === "day" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setPeriod("day")}
                    >
                      Today
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-md ${
                        period === "week" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setPeriod("week")}
                    >
                      This Week
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-md ${
                        period === "month" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setPeriod("month")}
                    >
                      This Month
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex">
                      <div className="flex-shrink-0">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            activity.type === "new_user"
                              ? "bg-blue-100 text-blue-600"
                              : activity.type === "payment"
                                ? "bg-green-100 text-green-600"
                                : activity.type === "complaint"
                                  ? "bg-red-100 text-red-600"
                                  : activity.type === "trainer_assignment"
                                    ? "bg-purple-100 text-purple-600"
                                    : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {activity.type === "new_user" ? (
                            <UserPlus className="h-5 w-5" />
                          ) : activity.type === "payment" ? (
                            <DollarSign className="h-5 w-5" />
                          ) : activity.type === "complaint" ? (
                            <MessageSquare className="h-5 w-5" />
                          ) : activity.type === "trainer_assignment" ? (
                            <Users className="h-5 w-5" />
                          ) : (
                            <CreditCard className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pending Complaints */}
          <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Pending Complaints</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {pendingComplaints.map((complaint) => (
                    <div key={complaint.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{complaint.subject}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            From: {complaint.user} ({complaint.userType})
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Submitted: {complaint.date}</p>
                        </div>
                        <div>{getPriorityBadge(complaint.priority)}</div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Link
                          href={`/admin/complaint-handling/${complaint.id}`}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href="/admin/complaint-handling"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All Complaints
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/admin/trainer-assignment"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mb-2">
                      <UserPlus className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">Assign Trainers</span>
                  </Link>
                  <Link
                    href="/admin/user-fee"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="p-2 rounded-full bg-green-100 text-green-600 mb-2">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">Manage Fees</span>
                  </Link>
                  <Link
                    href="/admin/trainer-payment"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600 mb-2">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">Trainer Payments</span>
                  </Link>
                  <Link
                    href="/admin/reports"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mb-2">
                      <FileText className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">Generate Reports</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

