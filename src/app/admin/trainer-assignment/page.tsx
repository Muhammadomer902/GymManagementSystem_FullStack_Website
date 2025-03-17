"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Filter, ChevronDown, ChevronUp, CheckCircle, XCircle, UserPlus, Calendar, Clock } from "lucide-react"

// Mock data for trainer assignment requests
const assignmentRequests = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      image: "/placeholder.svg?height=200&width=200&text=EJ",
      membershipType: "Premium",
      joinDate: "2023-10-05",
    },
    requestDate: "2023-11-18",
    goals: "Weight loss and toning",
    preferredDays: ["Monday", "Wednesday", "Friday"],
    preferredTime: "Evening (6PM - 9PM)",
    message:
      "I'm looking to lose about 20 pounds and tone my muscles. I've been struggling with consistency and need someone to keep me accountable.",
    status: "pending",
    assignedTrainer: null,
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      image: "/placeholder.svg?height=200&width=200&text=MB",
      membershipType: "Elite",
      joinDate: "2023-09-15",
    },
    requestDate: "2023-11-15",
    goals: "Muscle building",
    preferredDays: ["Tuesday", "Thursday", "Saturday"],
    preferredTime: "Morning (6AM - 9AM)",
    message:
      "I want to build muscle mass and strength. I've been working out for about a year but have plateaued. Looking for a trainer who can help me break through and reach the next level.",
    status: "pending",
    assignedTrainer: null,
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      image: "/placeholder.svg?height=200&width=200&text=SD",
      membershipType: "Basic",
      joinDate: "2023-11-01",
    },
    requestDate: "2023-11-10",
    goals: "Improve flexibility and core strength",
    preferredDays: ["Monday", "Thursday"],
    preferredTime: "Afternoon (2PM - 5PM)",
    message:
      "I'm a former dancer looking to improve my flexibility and core strength. I have some chronic back pain that I'd like to address through proper exercise and stretching routines.",
    status: "assigned",
    assignedTrainer: {
      id: 3,
      name: "Michael Chen",
      specialty: "Yoga & Mobility",
    },
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "David Wilson",
      email: "david.wilson@example.com",
      image: "/placeholder.svg?height=200&width=200&text=DW",
      membershipType: "Premium",
      joinDate: "2023-08-20",
    },
    requestDate: "2023-11-05",
    goals: "Sports performance",
    preferredDays: ["Wednesday", "Friday", "Sunday"],
    preferredTime: "Morning (9AM - 12PM)",
    message:
      "I'm training for a marathon and need help with strength training to complement my running. I'm also interested in nutrition advice to optimize my performance.",
    status: "assigned",
    assignedTrainer: {
      id: 1,
      name: "Alex Johnson",
      specialty: "Strength & Conditioning",
    },
  },
]

// Mock data for available trainers
const availableTrainers = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "/placeholder.svg?height=200&width=200&text=AJ",
    specialty: "Strength & Conditioning",
    experience: "10+ years",
    availability: ["Monday", "Wednesday", "Friday", "Saturday"],
    currentClients: 8,
    maxClients: 12,
  },
  {
    id: 2,
    name: "Sarah Martinez",
    image: "/placeholder.svg?height=200&width=200&text=SM",
    specialty: "Weight Loss & Nutrition",
    experience: "8 years",
    availability: ["Tuesday", "Thursday", "Saturday", "Sunday"],
    currentClients: 10,
    maxClients: 10,
  },
  {
    id: 3,
    name: "Michael Chen",
    image: "/placeholder.svg?height=200&width=200&text=MC",
    specialty: "Yoga & Mobility",
    experience: "6 years",
    availability: ["Monday", "Tuesday", "Thursday", "Sunday"],
    currentClients: 7,
    maxClients: 15,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    image: "/placeholder.svg?height=200&width=200&text=ER",
    specialty: "HIIT & Functional Training",
    experience: "5 years",
    availability: ["Wednesday", "Friday", "Saturday", "Sunday"],
    currentClients: 9,
    maxClients: 12,
  },
]

export default function TrainerAssignmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedRequest, setExpandedRequest] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    membershipType: "all",
  })
  const [requests, setRequests] = useState(assignmentRequests)
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null)

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleRequestDetails = (id: number) => {
    setExpandedRequest(expandedRequest === id ? null : id)
    setSelectedTrainer(null)
  }

  const handleAssignTrainer = (requestId: number, trainerId: number) => {
    const trainer = availableTrainers.find((t) => t.id === trainerId)
    if (!trainer) return

    setRequests(
      requests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: "assigned",
              assignedTrainer: {
                id: trainer.id,
                name: trainer.name,
                specialty: trainer.specialty,
              },
            }
          : request,
      ),
    )
    setSelectedTrainer(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "assigned":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Assigned
          </span>
        )
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        )
    }
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.goals.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filters.status === "all" || request.status === filters.status
    const matchesMembershipType =
      filters.membershipType === "all" ||
      request.user.membershipType.toLowerCase() === filters.membershipType.toLowerCase()

    return matchesSearch && matchesStatus && matchesMembershipType
  })

  const isTrainerAvailable = (trainer: any, request: any) => {
    // Check if trainer has capacity
    if (trainer.currentClients >= trainer.maxClients) return false

    // Check if trainer is available on preferred days
    const hasMatchingDays = request.preferredDays.some((day: string) => trainer.availability.includes(day))
    return hasMatchingDays
  }

  const handleRejectRequest = (requestId: number) => {
    setRequests(
      requests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: "rejected",
              assignedTrainer: null,
            }
          : request,
      ),
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trainer Assignment</h1>
          <p className="mt-1 text-gray-600">Assign trainers to members based on their requests and preferences</p>
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
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                suppressHydrationWarning
              />
            </div>
            <button
              onClick={toggleFilter}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              suppressHydrationWarning
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
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  suppressHydrationWarning
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label htmlFor="membership-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Membership Type
                </label>
                <select
                  id="membership-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.membershipType}
                  onChange={(e) => setFilters({ ...filters, membershipType: e.target.value })}
                  suppressHydrationWarning
                >
                  <option value="all">All Memberships</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="elite">Elite</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Requests List */}
        {filteredRequests.length > 0 ? (
          <div className="space-y-6">
            {filteredRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className="h-24 w-24 rounded-full overflow-hidden relative">
                        <Image
                          src={request.user.image || "/placeholder.svg"}
                          alt={request.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{request.user.name}</h3>
                          <p className="text-gray-600">{request.user.email}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Member since {request.user.joinDate} • {request.user.membershipType} Membership
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">{getStatusBadge(request.status)}</div>
                      </div>

                      <div className="mt-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Goals:</span> {request.goals}
                        </p>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Requested on {request.requestDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{request.preferredTime}</span>
                        </div>
                      </div>

                      {request.assignedTrainer && (
                        <div className="mt-4 bg-green-50 p-3 rounded-md">
                          <p className="text-sm text-green-800">
                            <span className="font-medium">Assigned Trainer:</span> {request.assignedTrainer.name} (
                            {request.assignedTrainer.specialty})
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap justify-between items-center">
                        <button
                          onClick={() => toggleRequestDetails(request.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                          suppressHydrationWarning
                        >
                          {expandedRequest === request.id ? "Hide Details" : "View Details"}
                          {expandedRequest === request.id ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </button>

                        {request.status === "pending" && (
                          <div className="mt-2 md:mt-0 flex space-x-3">
                            <button
                              onClick={() => handleRejectRequest(request.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                              suppressHydrationWarning
                            >
                              <XCircle className="h-4 w-4 mr-1 text-red-500" />
                              Reject
                            </button>
                            <button
                              onClick={() => setExpandedRequest(request.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                              suppressHydrationWarning
                            >
                              <UserPlus className="h-4 w-4 mr-1" />
                              Assign Trainer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRequest === request.id && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Message from Member</h4>
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <p className="text-gray-700">{request.message}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Preferred Days</h4>
                      <div className="flex flex-wrap gap-2">
                        {request.preferredDays.map((day) => (
                          <span
                            key={day}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>

                    {request.status === "pending" && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Available Trainers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          {availableTrainers
                            .filter((trainer) => isTrainerAvailable(trainer, request))
                            .map((trainer) => (
                              <div
                                key={trainer.id}
                                className={`border rounded-lg p-4 cursor-pointer ${
                                  selectedTrainer === trainer.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                                onClick={() => setSelectedTrainer(trainer.id)}
                              >
                                <div className="flex items-center">
                                  <div className="h-12 w-12 rounded-full overflow-hidden relative">
                                    <Image
                                      src={trainer.image || "/placeholder.svg"}
                                      alt={trainer.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <h5 className="text-sm font-medium text-gray-900">{trainer.name}</h5>
                                    <p className="text-xs text-gray-500">{trainer.specialty}</p>
                                    <p className="text-xs text-gray-500">
                                      {trainer.currentClients}/{trainer.maxClients} clients • {trainer.experience}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <p className="text-xs text-gray-500 mb-1">Available on:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {trainer.availability.map((day) => (
                                      <span
                                        key={day}
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                                          request.preferredDays.includes(day)
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                      >
                                        {day.substring(0, 3)}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>

                        {availableTrainers.filter((trainer) => isTrainerAvailable(trainer, request)).length === 0 && (
                          <div className="bg-yellow-50 p-4 rounded-md">
                            <p className="text-sm text-yellow-800">
                              No trainers are currently available that match this member's preferences. Consider
                              suggesting alternative days or times.
                            </p>
                          </div>
                        )}

                        <div className="mt-6 flex justify-end space-x-4">
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                          >
                            <XCircle className="h-4 w-4 mr-2 text-red-500" />
                            Reject Request
                          </button>
                          <button
                            onClick={() => selectedTrainer && handleAssignTrainer(request.id, selectedTrainer)}
                            disabled={!selectedTrainer}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign Selected Trainer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <UserPlus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.status !== "all" || filters.membershipType !== "all"
                ? "Try adjusting your search or filters to find requests."
                : "There are no trainer assignment requests at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

