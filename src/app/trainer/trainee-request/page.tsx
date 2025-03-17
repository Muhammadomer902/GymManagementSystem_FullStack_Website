"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, CheckCircle, XCircle, Filter, Search, ChevronDown, ChevronUp } from "lucide-react"

// Mock data for trainee requests
const traineeRequests = [
  {
    id: 1,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    image: "/placeholder.svg?height=200&width=200&text=EJ",
    requestDate: "2023-11-18",
    goals: "Weight loss and toning",
    preferredDays: ["Monday", "Wednesday", "Friday"],
    preferredTime: "Evening (6PM - 9PM)",
    message:
      "I'm looking to lose about 20 pounds and tone my muscles. I've been struggling with consistency and need someone to keep me accountable. I have some experience with weight training but would like to improve my form.",
    status: "pending",
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    image: "/placeholder.svg?height=200&width=200&text=MB",
    requestDate: "2023-11-15",
    goals: "Muscle building",
    preferredDays: ["Tuesday", "Thursday", "Saturday"],
    preferredTime: "Morning (6AM - 9AM)",
    message:
      "I want to build muscle mass and strength. I've been working out for about a year but have plateaued. Looking for a trainer who can help me break through and reach the next level.",
    status: "pending",
  },
  {
    id: 3,
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    image: "/placeholder.svg?height=200&width=200&text=SD",
    requestDate: "2023-11-10",
    goals: "Improve flexibility and core strength",
    preferredDays: ["Monday", "Thursday"],
    preferredTime: "Afternoon (2PM - 5PM)",
    message:
      "I'm a former dancer looking to improve my flexibility and core strength. I have some chronic back pain that I'd like to address through proper exercise and stretching routines.",
    status: "accepted",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@example.com",
    image: "/placeholder.svg?height=200&width=200&text=DW",
    requestDate: "2023-11-05",
    goals: "Sports performance",
    preferredDays: ["Wednesday", "Friday", "Sunday"],
    preferredTime: "Morning (9AM - 12PM)",
    message:
      "I'm training for a marathon and need help with strength training to complement my running. I'm also interested in nutrition advice to optimize my performance.",
    status: "rejected",
  },
]

export default function TraineeRequestPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedRequest, setExpandedRequest] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
  })
  const [requests, setRequests] = useState(traineeRequests)

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleRequestDetails = (id: number) => {
    setExpandedRequest(expandedRequest === id ? null : id)
  }

  const handleAccept = (id: number) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: "accepted" } : request)))
  }

  const handleReject = (id: number) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: "rejected" } : request)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
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
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.goals.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filters.status === "all" || request.status === filters.status

    const requestDate = new Date(request.requestDate)
    const today = new Date()
    const matchesDateRange =
      filters.dateRange === "all" ||
      (filters.dateRange === "last-week" && (today.getTime() - requestDate.getTime()) / (1000 * 3600 * 24) <= 7) ||
      (filters.dateRange === "last-month" && (today.getTime() - requestDate.getTime()) / (1000 * 3600 * 24) <= 30)

    return matchesSearch && matchesStatus && matchesDateRange
  })

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trainee Requests</h1>
          <p className="mt-1 text-gray-600">Review and manage training requests from potential clients</p>
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
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select
                  id="date-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                >
                  <option value="all">All Time</option>
                  <option value="last-week">Last 7 Days</option>
                  <option value="last-month">Last 30 Days</option>
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
                          src={request.image || "/placeholder.svg"}
                          alt={request.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{request.name}</h3>
                          <p className="text-gray-600">{request.email}</p>
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

                      <div className="mt-4 flex flex-wrap justify-between items-center">
                        <button
                          onClick={() => toggleRequestDetails(request.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
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
                              onClick={() => handleReject(request.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                            >
                              <XCircle className="h-4 w-4 mr-1 text-red-500" />
                              Reject
                            </button>
                            <button
                              onClick={() => handleAccept(request.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept
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
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Message from Client</h4>
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
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={() => handleReject(request.id)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                        >
                          <XCircle className="h-4 w-4 mr-2 text-red-500" />
                          Reject Request
                        </button>
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept Request
                        </button>
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
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.status !== "all" || filters.dateRange !== "all"
                ? "Try adjusting your search or filters to find requests."
                : "You don't have any trainee requests at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

