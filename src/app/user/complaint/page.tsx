"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, CheckCircle, Clock, MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react"

// Mock data for previous complaints
const previousComplaints = [
  {
    id: 1,
    subject: "Equipment Issue",
    description:
      "The treadmill in the cardio area (machine #5) is making a loud noise when used at speeds above 6 mph.",
    date: "2023-11-10",
    status: "resolved",
    response:
      "Thank you for reporting this issue. Our maintenance team has fixed the treadmill and it is now working properly.",
    responseDate: "2023-11-12",
  },
  {
    id: 2,
    subject: "Scheduling Problem",
    description: "I was charged for a session on November 5th that was canceled more than 24 hours in advance.",
    date: "2023-11-07",
    status: "in-progress",
    response: null,
    responseDate: null,
  },
  {
    id: 3,
    subject: "Cleanliness Concern",
    description:
      "The men's locker room was not properly cleaned this morning. There were wet towels on the floor and the trash bins were overflowing.",
    date: "2023-10-25",
    status: "resolved",
    response:
      "We apologize for the inconvenience. We have addressed this with our cleaning staff and implemented additional checks throughout  We have addressed this with our cleaning staff and implemented additional checks throughout the day to ensure all facilities remain clean and comfortable for our members.",
    responseDate: "2023-10-26",
  },
]

export default function ComplaintPage() {
  const [expandedComplaint, setExpandedComplaint] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const toggleComplaintDetails = (id: number) => {
    setExpandedComplaint(expandedComplaint === id ? null : id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        subject: "",
        category: "",
        description: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
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

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Submit a Complaint</h1>
          <p className="mt-1 text-gray-600">
            We value your feedback and are committed to addressing any issues you may encounter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Complaint Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {submitSuccess && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Complaint submitted successfully!</p>
                    <p>We'll review your complaint and get back to you as soon as possible.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Brief title for your complaint"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select a category</option>
                      <option value="equipment">Equipment Issue</option>
                      <option value="facility">Facility Concern</option>
                      <option value="staff">Staff Behavior</option>
                      <option value="billing">Billing/Payment Issue</option>
                      <option value="trainer">Trainer Concern</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={6}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Please provide details about your complaint..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Complaint
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Help & Guidelines */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Guidelines</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>Be specific about the issue you're experiencing.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>Include relevant details such as dates, times, and locations.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>Maintain a respectful tone, even if you're frustrated.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>If your complaint involves another member, please respect their privacy.</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Need immediate assistance? Contact us directly:</p>
                <p className="mt-2 text-sm font-medium">Phone: (555) 123-4567</p>
                <p className="text-sm font-medium">Email: support@fithub.com</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start">
                <MessageSquare className="h-6 w-6 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Need to speak with someone?</h3>
                  <p className="mt-1 text-sm text-blue-700">
                    Our customer service team is available to discuss your concerns in person.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Schedule a meeting
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Complaints */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Previous Complaints</h2>

          {previousComplaints.length > 0 ? (
            <div className="space-y-4">
              {previousComplaints.map((complaint) => (
                <div key={complaint.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{complaint.subject}</h3>
                        <p className="mt-1 text-sm text-gray-500">Submitted on {complaint.date}</p>
                      </div>
                      <div className="mt-2 sm:mt-0">{getStatusBadge(complaint.status)}</div>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-700 line-clamp-2">{complaint.description}</p>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => toggleComplaintDetails(complaint.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                      >
                        {expandedComplaint === complaint.id ? "Hide Details" : "View Details"}
                        {expandedComplaint === complaint.id ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedComplaint === complaint.id && (
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-50">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Full Description</h4>
                        <p className="mt-1 text-gray-900">{complaint.description}</p>
                      </div>

                      {complaint.response ? (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Response (on {complaint.responseDate})</h4>
                          <div className="mt-1 bg-white p-3 rounded-md border border-gray-200">
                            <p className="text-gray-900">{complaint.response}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 italic">
                          No response yet. We'll notify you when we have an update.
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No previous complaints</h3>
              <p className="text-gray-600">You haven't submitted any complaints yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

