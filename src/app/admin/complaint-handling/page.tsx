"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, ChevronDown, ChevronUp, AlertCircle, CheckCircle, Clock, MessageSquare } from "lucide-react"

// Mock data for complaints
const complaints = [
  {
    id: 101,
    user: "Robert Taylor",
    userType: "Member",
    email: "robert.taylor@example.com",
    date: "2023-11-18",
    subject: "Locker Room Issue",
    description:
      "The men's locker room was not properly cleaned this morning. There were wet towels on the floor and the trash bins were overflowing.",
    status: "pending",
    priority: "high",
    assignedTo: null,
    responses: [],
  },
  {
    id: 102,
    user: "Jennifer Lee",
    userType: "Member",
    email: "jennifer.lee@example.com",
    date: "2023-11-17",
    subject: "Billing Discrepancy",
    description:
      "I was charged twice for my monthly membership fee in November. Please review my account and provide a refund for the duplicate charge.",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Sarah Admin",
    responses: [
      {
        from: "Sarah Admin",
        date: "2023-11-17",
        message: "I'm looking into this issue and will get back to you shortly.",
      },
    ],
  },
  {
    id: 103,
    user: "Michael Chen",
    userType: "Trainer",
    email: "michael.chen@example.com",
    date: "2023-11-15",
    subject: "Schedule Conflict",
    description:
      "There was a double booking for Studio 2 during my session with client John Smith on November 20th. Please resolve this conflict.",
    status: "in-progress",
    priority: "low",
    assignedTo: "Mark Admin",
    responses: [
      {
        from: "Mark Admin",
        date: "2023-11-16",
        message: "I've identified the scheduling conflict and am working to resolve it.",
      },
    ],
  },
  {
    id: 104,
    user: "Emily Johnson",
    userType: "Member",
    email: "emily.johnson@example.com",
    date: "2023-11-10",
    subject: "Equipment Malfunction",
    description:
      "The treadmill #3 is making a loud noise when used at speeds above 6 mph. It seems unsafe and should be checked by maintenance.",
    status: "resolved",
    priority: "high",
    assignedTo: "Mark Admin",
    responses: [
      {
        from: "Mark Admin",
        date: "2023-11-11",
        message: "Thank you for reporting this issue. I've notified our maintenance team.",
      },
      {
        from: "Mark Admin",
        date: "2023-11-12",
        message:
          "The maintenance team has repaired treadmill #3. The issue was a loose belt that has now been properly tensioned and lubricated. The machine is now safe to use at all speeds.",
      },
    ],
  },
  {
    id: 105,
    user: "David Wilson",
    userType: "Trainer",
    email: "david.wilson@example.com",
    date: "2023-11-08",
    subject: "Payment Delay",
    description: "I haven't received my October payment yet. It was due on November 5th.",
    status: "resolved",
    priority: "medium",
    assignedTo: "Sarah Admin",
    responses: [
      {
        from: "Sarah Admin",
        date: "2023-11-09",
        message: "I apologize for the delay. I'm checking with our accounting department.",
      },
      {
        from: "Sarah Admin",
        date: "2023-11-10",
        message:
          "The payment has been processed and should appear in your account within 1-2 business days. The delay was due to a system issue that has now been resolved.",
      },
    ],
  },
]

export default function ComplaintHandlingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedComplaint, setExpandedComplaint] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    userType: "all",
    priority: "all",
  })

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleComplaintDetails = (id: number) => {
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            High
          </span>
        )
      case "medium":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Medium
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Low
          </span>
        )
    }
  }

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filters.status === "all" || complaint.status === filters.status
    const matchesUserType = filters.userType === "all" || complaint.userType.toLowerCase() === filters.userType
    const matchesPriority = filters.priority === "all" || complaint.priority === filters.priority

    return matchesSearch && matchesStatus && matchesUserType && matchesPriority
  })

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

          {/* Filter Options */}
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
              <div>
                <label htmlFor="user-type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  User Type
                </label>
                <select
                  id="user-type-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.userType}
                  onChange={(e) => setFilters({ ...filters, userType: e.target.value })}
                  suppressHydrationWarning
                >
                  <option value="all">All Users</option>
                  <option value="member">Members</option>
                  <option value="trainer">Trainers</option>
                </select>
              </div>
              <div>
                <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                  suppressHydrationWarning
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Complaints List */}
        {filteredComplaints.length > 0 ? (
          <div className="space-y-6">
            {filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{complaint.subject}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        From: {complaint.user} ({complaint.userType}) • Submitted on {complaint.date}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0 flex space-x-2">
                      {getPriorityBadge(complaint.priority)}
                      {getStatusBadge(complaint.status)}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-700 line-clamp-2">{complaint.description}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-between items-center">
                    <div>
                      {complaint.assignedTo ? (
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Assigned to:</span> {complaint.assignedTo}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">Not assigned</p>
                      )}
                    </div>

                    <div className="mt-2 md:mt-0 flex space-x-3">
                      <button
                        onClick={() => toggleComplaintDetails(complaint.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                        suppressHydrationWarning
                      >
                        {expandedComplaint === complaint.id ? "Hide Details" : "View Details"}
                        {expandedComplaint === complaint.id ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                      <Link
                        href={`/admin/complaint-handling/${complaint.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                      >
                        Handle Complaint
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedComplaint === complaint.id && (
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
                          <span className="font-medium">Email:</span> {complaint.email}
                        </p>
                      </div>
                    </div>

                    {complaint.responses.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Responses</h4>
                        <div className="space-y-3">
                          {complaint.responses.map((response, index) => (
                            <div key={index} className="bg-white p-3 rounded-md border border-gray-200">
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium text-gray-900">{response.from}</p>
                                <p className="text-xs text-gray-500">{response.date}</p>
                              </div>
                              <p className="text-sm text-gray-700">{response.message}</p>
                            </div>
                          ))}
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
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.status !== "all" || filters.userType !== "all" || filters.priority !== "all"
                ? "Try adjusting your search or filters to find complaints."
                : "There are no complaints to handle at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

