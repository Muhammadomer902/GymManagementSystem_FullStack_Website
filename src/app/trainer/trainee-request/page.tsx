"use client"

import { useEffect, useState } from "react"
import { Clock, CheckCircle, XCircle, Filter, Search, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

interface TrainingSessionRequest {
  _id: string;
  member: { _id: string; name: string; email: string };
  requestedDate: string;
  status: string;
  message?: string;
  responseMessage?: string;
}

export default function TraineeRequestPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
  })
  const [requests, setRequests] = useState<TrainingSessionRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<{ [id: string]: boolean }>({})

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/training-session-requests/trainer")
      if (res.ok) {
        const data = await res.json()
        setRequests(data.requests)
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleRequestDetails = (id: string) => {
    setExpandedRequest(expandedRequest === id ? null : id)
  }

  const handleAction = async (id: string, action: "accepted" | "rejected") => {
    setActionLoading((prev) => ({ ...prev, [id]: true }))
    try {
      const res = await fetch("/api/training-session-requests/trainer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id, status: action })
      })
      if (res.ok) {
        fetchRequests()
      }
    } catch {
      // ignore
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }))
    }
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
      request.member?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.message?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filters.status === "all" || request.status === filters.status

    const requestDate = new Date(request.requestedDate)
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
                  suppressHydrationWarning
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
        {loading ? (
          <div className="text-center text-gray-500">Loading requests...</div>
        ) : filteredRequests.length > 0 ? (
          <div className="space-y-6">
            {filteredRequests.map((request) => (
              <div key={request._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className="h-24 w-24 rounded-full overflow-hidden relative flex items-center justify-center bg-blue-100 text-blue-700 text-3xl font-bold">
                        {request.member?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{request.member?.name}</h3>
                          <p className="text-gray-600">{request.member?.email}</p>
                          {request.member && (
                            <Link
                              href={`/trainer/trainees/${request.member._id}`}
                              className="inline-block mt-2 px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md bg-white hover:bg-blue-50 text-sm font-semibold"
                            >
                              View Profile
                            </Link>
                          )}
                        </div>
                        <div className="mt-2 md:mt-0">{getStatusBadge(request.status)}</div>
                      </div>

                      <div className="mt-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Requested Date:</span> {new Date(request.requestedDate).toLocaleString()}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap justify-between items-center">
                        <button
                          onClick={() => toggleRequestDetails(request._id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                          suppressHydrationWarning
                        >
                          {expandedRequest === request._id ? "Hide Details" : "View Details"}
                          {expandedRequest === request._id ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </button>

                        {request.status === "pending" && (
                          <div className="mt-2 md:mt-0 flex space-x-3">
                            <button
                              onClick={() => handleAction(request._id, "rejected")}
                              disabled={actionLoading[request._id]}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm disabled:opacity-50"
                              suppressHydrationWarning
                            >
                              <XCircle className="h-4 w-4 mr-1 text-red-500" />
                              Reject
                            </button>
                            <button
                              onClick={() => handleAction(request._id, "accepted")}
                              disabled={actionLoading[request._id]}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm disabled:opacity-50"
                              suppressHydrationWarning
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
                {expandedRequest === request._id && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Message from Member</h4>
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <p className="text-gray-700">{request.message}</p>
                      </div>
                    </div>
                    {request.responseMessage && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-green-700 mb-2">Your Response</h4>
                        <div className="bg-green-50 p-3 rounded-md border border-green-200">
                          <p className="text-green-700">{request.responseMessage}</p>
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

