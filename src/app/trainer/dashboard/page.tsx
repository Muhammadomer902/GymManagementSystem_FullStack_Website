"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Calendar,
  TrendingUp,
  MessageSquare,
  Bell,
  Clock,
  CheckCircle,
  Dumbbell,
  ChevronRight,
  Star,
} from "lucide-react"

// Mock data
const trainerStats = {
  totalTrainees: 12,
  pendingRequests: 3,
  upcomingSessions: 8,
  completedSessions: 124,
  rating: 4.8,
}

const upcomingSessions = [
  {
    id: 1,
    trainee: "John Smith",
    time: "Today, 2:00 PM",
    duration: "60 min",
    type: "Strength Training",
    location: "Main Gym Floor",
  },
  {
    id: 2,
    trainee: "Emily Johnson",
    time: "Today, 4:00 PM",
    duration: "45 min",
    type: "Weight Loss",
    location: "Studio 2",
  },
  {
    id: 3,
    trainee: "Michael Brown",
    time: "Tomorrow, 10:00 AM",
    duration: "60 min",
    type: "Muscle Building",
    location: "Weight Room",
  },
  {
    id: 4,
    trainee: "Sarah Davis",
    time: "Tomorrow, 1:00 PM",
    duration: "30 min",
    type: "Fitness Assessment",
    location: "Office",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "session_completed",
    trainee: "David Wilson",
    time: "Yesterday, 5:30 PM",
    details: "Completed a 60-minute strength training session",
  },
  {
    id: 2,
    type: "plan_updated",
    trainee: "Jennifer Lee",
    time: "Yesterday, 3:15 PM",
    details: "Updated workout plan for the next 4 weeks",
  },
  {
    id: 3,
    type: "request_received",
    trainee: "Robert Taylor",
    time: "2 days ago",
    details: "New training request received",
  },
  {
    id: 4,
    type: "feedback_received",
    trainee: "Amanda Martinez",
    time: "3 days ago",
    details: "Received a 5-star review",
  },
]

export default function TrainerDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trainer Dashboard</h1>
          <p className="mt-1 text-gray-600">Welcome back! Here's an overview of your training activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Trainees</h2>
                <p className="text-2xl font-bold text-gray-900">{trainerStats.totalTrainees}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/trainer/trainees"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View all trainees
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Bell className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Pending Requests</h2>
                <p className="text-2xl font-bold text-gray-900">{trainerStats.pendingRequests}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/trainer/trainee-request"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                Review requests
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Upcoming Sessions</h2>
                <p className="text-2xl font-bold text-gray-900">{trainerStats.upcomingSessions}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/trainer/schedule"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View schedule
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Trainer Rating</h2>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">{trainerStats.rating}</p>
                  <div className="flex ml-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(trainerStats.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Based on {trainerStats.completedSessions} sessions</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Sessions</h2>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 text-sm rounded-md ${activeTab === "upcoming" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
                      onClick={() => setActiveTab("upcoming")}
                    >
                      Upcoming
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-md ${activeTab === "past" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
                      onClick={() => setActiveTab("past")}
                    >
                      Past
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {activeTab === "upcoming" ? (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {session.trainee
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{session.trainee}</h3>
                              <p className="text-sm text-gray-500">{session.type}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">{session.time}</span>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {session.duration}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {session.location}
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/trainer/trainees/${session.id}`}
                          className="ml-4 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No past sessions to display</h3>
                    <p className="text-gray-600">Past sessions will appear here once completed</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Quick Actions */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/trainer/trainee-request"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600 mb-2">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Trainee Requests</span>
                </Link>
                <Link
                  href="/trainer/trainees"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="p-2 rounded-full bg-green-100 text-green-600 mb-2">
                    <Dumbbell className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">My Trainees</span>
                </Link>
                <Link
                  href="/trainer/complaint"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="p-2 rounded-full bg-red-100 text-red-600 mb-2">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Submit Complaint</span>
                </Link>
                <Link
                  href="/trainer/schedule"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="p-2 rounded-full bg-purple-100 text-purple-600 mb-2">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Schedule</span>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex">
                      <div className="flex-shrink-0">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            activity.type === "session_completed"
                              ? "bg-green-100 text-green-600"
                              : activity.type === "plan_updated"
                                ? "bg-blue-100 text-blue-600"
                                : activity.type === "request_received"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {activity.type === "session_completed" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : activity.type === "plan_updated" ? (
                            <Dumbbell className="h-4 w-4" />
                          ) : activity.type === "request_received" ? (
                            <Bell className="h-4 w-4" />
                          ) : (
                            <Star className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.trainee}</p>
                        <p className="text-sm text-gray-500">{activity.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

