"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageSquare, User, Calendar, AlertCircle, CheckCircle, Clock, Send, UserPlus } from "lucide-react"

// Mock data for complaints
const complaints = [
  {
    id: "101",
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
    id: "102",
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
    id: "103",
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
]

// Mock data for admin staff
const adminStaff = [
  { id: 1, name: "Sarah Admin", role: "Admin Manager" },
  { id: 2, name: "Mark Admin", role: "Admin Assistant" },
  { id: 3, name: "Jessica Admin", role: "Customer Support" },
]

export default function ComplaintDetailPage() {
  const params = useParams()
  const router = useRouter()
  const complaintId = params.complaintId as string

  const [complaint, setComplaint] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [responseText, setResponseText] = useState("")
  const [assignedStaff, setAssignedStaff] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("")

  useEffect(() => {
    // Simulate API call to fetch complaint details
    const foundComplaint = complaints.find((c) => c.id === complaintId)
    if (foundComplaint) {
      setComplaint(foundComplaint)
      setAssignedStaff(foundComplaint.assignedTo)
      setStatus(foundComplaint.status)
    } else {
      // Redirect if complaint not found
      router.push("/admin/complaint-handling")
    }
    setLoading(false)
  }, [complaintId, router])

  const handleSendResponse = () => {
    if (!responseText.trim()) return

    const newResponse = {
      from: "Admin",
      date: new Date().toISOString().split("T")[0],
      message: responseText,
    }

    const updatedComplaint = {
      ...complaint,
      responses: [...complaint.responses, newResponse],
    }

    setComplaint(updatedComplaint)
    setResponseText("")
  }

  const handleAssignStaff = (staffName: string) => {
    setAssignedStaff(staffName)
    setComplaint({
      ...complaint,
      assignedTo: staffName,
    })
  }

  const handleUpdateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setComplaint({
      ...complaint,
      status: newStatus,
    })
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
            High Priority
          </span>
        )
      case "medium":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Medium Priority
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Low Priority
          </span>
        )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading complaint details...</p>
        </div>
      </div>
    )
  }

  if (!complaint) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Complaint not found</h3>
            <p className="text-gray-600 mb-6">The complaint you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/admin/complaint-handling"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Complaints
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/admin/complaint-handling"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Complaints
          </Link>
        </div>

        {/* Complaint Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{complaint.subject}</h1>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-1" />
                  <span>
                    {complaint.user} ({complaint.userType})
                  </span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{complaint.date}</span>
                </div>
              </div>
              <div className="mt-2 md:mt-0 flex space-x-2">
                {getPriorityBadge(complaint.priority)}
                {getStatusBadge(status)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Complaint Details and Responses */}
          <div className="md:col-span-2 space-y-6">
            {/* Complaint Description */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Complaint Details</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700">{complaint.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Contact Email:</span> {complaint.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Responses */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Responses</h2>
              </div>
              <div className="p-6">
                {complaint.responses.length > 0 ? (
                  <div className="space-y-4">
                    {complaint.responses.map((response: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium text-gray-900">{response.from}</p>
                          <p className="text-sm text-gray-500">{response.date}</p>
                        </div>
                        <p className="text-gray-700">{response.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No responses yet</p>
                  </div>
                )}

                {/* Response Form */}
                <div className="mt-6">
                  <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
                    Add Response
                  </label>
                  <textarea
                    id="response"
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Type your response here..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                  ></textarea>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSendResponse}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Response
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Actions and Assignment */}
          <div className="space-y-6">
            {/* Status Management */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Status</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <button
                    onClick={() => handleUpdateStatus("pending")}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                      status === "pending"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleUpdateStatus("in-progress")}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                      status === "in-progress"
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleUpdateStatus("resolved")}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                      status === "resolved"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Resolved
                  </button>
                </div>
              </div>
            </div>

            {/* Assignment */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Assign To</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {adminStaff.map((staff) => (
                    <button
                      key={staff.id}
                      onClick={() => handleAssignStaff(staff.name)}
                      className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                        assignedStaff === staff.name
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <p>{staff.name}</p>
                        <p className="text-xs text-gray-500">{staff.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
                {assignedStaff && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      Currently assigned to: <span className="font-medium">{assignedStaff}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Actions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Email User
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Print Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

