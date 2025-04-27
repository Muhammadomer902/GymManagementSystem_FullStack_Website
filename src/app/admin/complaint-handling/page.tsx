"use client"

import { useEffect, useState } from "react"
import { Search, Filter, ChevronDown, ChevronUp, AlertCircle, CheckCircle, Clock, MessageSquare } from "lucide-react"

interface Complaint {
  _id: string;
  user: { name: string; email: string; role: string };
  subject: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  response?: string;
  responseDate?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ComplaintHandlingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedComplaint, setExpandedComplaint] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    userType: "all",
    priority: "all",
  })
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [updateStatus, setUpdateStatus] = useState<{ [id: string]: string }>({})
  const [responseText, setResponseText] = useState<{ [id: string]: string }>({})
  const [isUpdating, setIsUpdating] = useState<{ [id: string]: boolean }>({})

  const fetchComplaints = async () => {
    setLoading(true)
    setFetchError(null)
    try {
      const res = await fetch("/api/complaints")
      if (!res.ok) throw new Error("Failed to fetch complaints")
      const data = await res.json()
      setComplaints(data.complaints)
    } catch {
      setFetchError("Could not load complaints. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleComplaintDetails = (id: string) => {
    setExpandedComplaint(expandedComplaint === id ? null : id)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Resolved
          </span>
        )
      case "in-progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </span>
        )
    }
  }

  // Filtering logic (userType/priority are placeholders for future extension)
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filters.status === "all" || complaint.status === filters.status
    // userType/priority can be extended if needed
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (id: string, status: string) => {
    setUpdateStatus((prev) => ({ ...prev, [id]: status }))
  }

  const handleResponseChange = (id: string, text: string) => {
    setResponseText((prev) => ({ ...prev, [id]: text }))
  }

  const handleUpdate = async (id: string) => {
    setIsUpdating((prev) => ({ ...prev, [id]: true }))
    try {
      const res = await fetch("/api/complaints", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          complaintId: id,
          status: updateStatus[id],
          response: responseText[id],
        }),
      })
      if (!res.ok) throw new Error("Failed to update complaint")
      await fetchComplaints()
    } catch {
      alert("There was an error updating the complaint. Please try again.")
    } finally {
      setIsUpdating((prev) => ({ ...prev, [id]: false }))
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complaint Management</h1>
          <p className="mt-1 text-gray-600">Handle and resolve user and trainer complaints</p>
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
                placeholder="Search complaints..."
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
          {/* Filter Options (status only for now) */}
          {filterOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Complaints List */}
        {loading ? (
          <div className="text-center text-gray-500">Loading complaints...</div>
        ) : fetchError ? (
          <div className="text-center text-red-500">{fetchError}</div>
        ) : filteredComplaints.length > 0 ? (
          <div className="space-y-6">
            {filteredComplaints.map((complaint) => (
              <div key={complaint._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{complaint.subject}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        From: {complaint.user.name} ({complaint.user.role}) • Submitted on {new Date(complaint.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0 flex space-x-2">
                      {getStatusBadge(complaint.status)}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-700 line-clamp-2">{complaint.description}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Email:</span> {complaint.user.email}
                      </p>
                    </div>

                    <div className="mt-2 md:mt-0 flex space-x-3">
                      <button
                        onClick={() => toggleComplaintDetails(complaint._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                        suppressHydrationWarning
                      >
                        {expandedComplaint === complaint._id ? "Hide Details" : "View Details"}
                        {expandedComplaint === complaint._id ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedComplaint === complaint._id && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Full Description</h4>
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <p className="text-gray-700">{complaint.description}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <p className="text-gray-700">
                          <span className="font-medium">Email:</span> {complaint.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Status & Response</h4>
                      <div className="flex flex-col md:flex-row gap-4">
                        <select
                          className="block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={updateStatus[complaint._id] ?? complaint.status}
                          onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <textarea
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Add or update response..."
                          value={responseText[complaint._id] ?? complaint.response ?? ""}
                          onChange={(e) => handleResponseChange(complaint._id, e.target.value)}
                          rows={2}
                        />
                        <button
                          onClick={() => handleUpdate(complaint._id)}
                          disabled={isUpdating[complaint._id]}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                          {isUpdating[complaint._id] ? "Saving..." : "Save"}
                        </button>
                      </div>
                      {complaint.response && (
                        <div className="mt-2 text-sm text-gray-700">
                          <span className="font-medium">Last Response:</span> {complaint.response}
                          {complaint.responseDate && (
                            <span className="ml-2 text-gray-500">({new Date(complaint.responseDate).toLocaleDateString()})</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.status !== "all"
                ? "Try adjusting your search or filters to find complaints."
                : "There are no complaints to handle at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

