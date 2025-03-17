"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, ChevronDown, ChevronUp, ChevronRight, Calendar, Clock, Dumbbell } from "lucide-react"

// Mock data for trainees
const trainees = [
  {
    id: 1,
    name: "John Smith",
    image: "/placeholder.svg?height=200&width=200&text=JS",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    startDate: "2023-09-15",
    goals: "Weight loss, Improve cardiovascular health",
    nextSession: "Today, 2:00 PM",
    progress: 65,
    plan: "3x weekly strength training with cardio",
    attendance: "85%",
    notes: "Making good progress on weight loss goals. Needs to focus more on form during squats and deadlifts.",
  },
  {
    id: 2,
    name: "Emily Johnson",
    image: "/placeholder.svg?height=200&width=200&text=EJ",
    email: "emily.johnson@example.com",
    phone: "(555) 234-5678",
    startDate: "2023-10-05",
    goals: "Muscle toning, Increase flexibility",
    nextSession: "Tomorrow, 10:00 AM",
    progress: 40,
    plan: "2x weekly full body workouts with yoga",
    attendance: "90%",
    notes: "Very dedicated and always on time. Has shown significant improvement in upper body strength.",
  },
  {
    id: 3,
    name: "Michael Brown",
    image: "/placeholder.svg?height=200&width=200&text=MB",
    email: "michael.brown@example.com",
    phone: "(555) 345-6789",
    startDate: "2023-08-20",
    goals: "Muscle building, Sports performance",
    nextSession: "Wednesday, 4:00 PM",
    progress: 75,
    plan: "4x weekly split routine focusing on hypertrophy",
    attendance: "75%",
    notes: "Has been inconsistent with attendance lately. Needs to improve nutrition to see better results.",
  },
  {
    id: 4,
    name: "Sarah Davis",
    image: "/placeholder.svg?height=200&width=200&text=SD",
    email: "sarah.davis@example.com",
    phone: "(555) 456-7890",
    startDate: "2023-11-01",
    goals: "Rehabilitation, Core strength",
    nextSession: "Friday, 1:00 PM",
    progress: 25,
    plan: "2x weekly gentle rehabilitation exercises",
    attendance: "100%",
    notes: "Recovering from back injury. Making steady progress but needs to avoid certain movements.",
  },
]

export default function TraineesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedTrainee, setExpandedTrainee] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    progress: "all",
    attendance: "all",
  })

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleTraineeDetails = (id: number) => {
    setExpandedTrainee(expandedTrainee === id ? null : id)
  }

  const filteredTrainees = trainees.filter((trainee) => {
    const matchesSearch =
      trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.goals.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProgress =
      filters.progress === "all" ||
      (filters.progress === "low" && trainee.progress < 30) ||
      (filters.progress === "medium" && trainee.progress >= 30 && trainee.progress < 70) ||
      (filters.progress === "high" && trainee.progress >= 70)

    const attendanceValue = Number.parseInt(trainee.attendance.replace("%", ""))
    const matchesAttendance =
      filters.attendance === "all" ||
      (filters.attendance === "low" && attendanceValue < 70) ||
      (filters.attendance === "medium" && attendanceValue >= 70 && attendanceValue < 90) ||
      (filters.attendance === "high" && attendanceValue >= 90)

    return matchesSearch && matchesProgress && matchesAttendance
  })

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Trainees</h1>
          <p className="mt-1 text-gray-600">Manage and track your clients' progress</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search trainees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={toggleFilter}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filter
              {filterOpen ? <ChevronUp className="h-5 w-5 ml-2" /> : <ChevronDown className="h-5 w-5 ml-2" />}
            </button>
          </div>

          {/* Filter Options */}
          {filterOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="progress-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Progress
                </label>
                <select
                  id="progress-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.progress}
                  onChange={(e) => setFilters({ ...filters, progress: e.target.value })}
                >
                  <option value="all">All Progress Levels</option>
                  <option value="low">Low Progress (&lt; 30%)</option>
                  <option value="medium">Medium Progress (30% - 70%)</option>
                  <option value="high">High Progress (&gt; 70%)</option>
                </select>
              </div>
              <div>
                <label htmlFor="attendance-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Attendance
                </label>
                <select
                  id="attendance-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.attendance}
                  onChange={(e) => setFilters({ ...filters, attendance: e.target.value })}
                >
                  <option value="all">All Attendance Rates</option>
                  <option value="low">Low Attendance (&lt; 70%)</option>
                  <option value="medium">Medium Attendance (70% - 90%)</option>
                  <option value="high">High Attendance (&gt; 90%)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Trainees List */}
        {filteredTrainees.length > 0 ? (
          <div className="space-y-6">
            {filteredTrainees.map((trainee) => (
              <div key={trainee.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className="h-24 w-24 rounded-full overflow-hidden relative">
                        <Image
                          src={trainee.image || "/placeholder.svg"}
                          alt={trainee.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{trainee.name}</h3>
                          <p className="text-gray-600">{trainee.email}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Link
                            href={`/trainer/trainees/${trainee.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                          >
                            View Profile
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Goals:</span> {trainee.goals}
                        </p>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Started: {trainee.startDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Next Session: {trainee.nextSession}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Dumbbell className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Attendance: {trainee.attendance}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-medium text-gray-700">{trainee.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${trainee.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => toggleTraineeDetails(trainee.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                        >
                          {expandedTrainee === trainee.id ? "Hide Details" : "View Details"}
                          {expandedTrainee === trainee.id ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTrainee === trainee.id && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Email:</span> {trainee.email}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Phone:</span> {trainee.phone}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Training Plan</h4>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <p className="text-gray-700">{trainee.plan}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Trainer Notes</h4>
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <p className="text-gray-700">{trainee.notes}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                      <Link
                        href={`/trainer/trainees/${trainee.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                      >
                        View Full Profile
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trainees found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.progress !== "all" || filters.attendance !== "all"
                ? "Try adjusting your search or filters to find trainees."
                : "You don't have any trainees assigned to you yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

