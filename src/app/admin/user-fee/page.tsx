"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Clock,
  CreditCard,
  Mail,
  Calendar,
  DollarSign,
} from "lucide-react"

// Mock data for user fees
const userFees = [
  {
    id: 1,
    user: {
      id: 101,
      name: "John Smith",
      email: "john.smith@example.com",
      image: "/placeholder.svg?height=200&width=200&text=JS",
      membershipType: "Premium",
      joinDate: "2023-09-15",
    },
    amount: 49.99,
    dueDate: "2023-11-15",
    status: "paid",
    paymentDate: "2023-11-10",
    paymentMethod: "Credit Card",
    invoiceId: "INV-2023-001",
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      image: "/placeholder.svg?height=200&width=200&text=EJ",
      membershipType: "Basic",
      joinDate: "2023-10-05",
    },
    amount: 29.99,
    dueDate: "2023-11-20",
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    invoiceId: "INV-2023-002",
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      image: "/placeholder.svg?height=200&width=200&text=MB",
      membershipType: "Elite",
      joinDate: "2023-08-20",
    },
    amount: 89.99,
    dueDate: "2023-11-10",
    status: "overdue",
    paymentDate: null,
    paymentMethod: null,
    invoiceId: "INV-2023-003",
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      image: "/placeholder.svg?height=200&width=200&text=SD",
      membershipType: "Premium",
      joinDate: "2023-11-01",
    },
    amount: 49.99,
    dueDate: "2023-12-01",
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    invoiceId: "INV-2023-004",
  },
  {
    id: 5,
    user: {
      id: 105,
      name: "David Wilson",
      email: "david.wilson@example.com",
      image: "/placeholder.svg?height=200&width=200&text=DW",
      membershipType: "Basic",
      joinDate: "2023-07-15",
    },
    amount: 29.99,
    dueDate: "2023-11-05",
    status: "overdue",
    paymentDate: null,
    paymentMethod: null,
    invoiceId: "INV-2023-005",
  },
]

export default function UserFeePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedFee, setExpandedFee] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    membershipType: "all",
  })
  const [fees, setFees] = useState(userFees)

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleFeeDetails = (id: number) => {
    setExpandedFee(expandedFee === id ? null : id)
  }

  const handleMarkAsPaid = (id: number) => {
    setFees(
      fees.map((fee) =>
        fee.id === id
          ? {
              ...fee,
              status: "paid",
              paymentDate: new Date().toISOString().split("T")[0],
              paymentMethod: "Manual Entry",
            }
          : fee,
      ),
    )
  }

  const handleSendReminder = (id: number) => {
    // In a real app, this would send an email reminder
    alert(`Reminder sent to user for invoice ${fees.find((fee) => fee.id === id)?.invoiceId}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </span>
        )
      case "overdue":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
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

  const filteredFees = fees.filter((fee) => {
    const matchesSearch =
      fee.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filters.status === "all" || fee.status === filters.status
    const matchesMembershipType =
      filters.membershipType === "all" || fee.user.membershipType.toLowerCase() === filters.membershipType.toLowerCase()

    return matchesSearch && matchesStatus && matchesMembershipType
  })

  // Calculate summary statistics
  const totalPaid = filteredFees.filter((fee) => fee.status === "paid").reduce((sum, fee) => sum + fee.amount, 0)
  const totalPending = filteredFees.filter((fee) => fee.status === "pending").reduce((sum, fee) => sum + fee.amount, 0)
  const totalOverdue = filteredFees.filter((fee) => fee.status === "overdue").reduce((sum, fee) => sum + fee.amount, 0)

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Fee Management</h1>
          <p className="mt-1 text-gray-600">Track and manage membership fees and payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Paid Fees</h2>
                <p className="text-2xl font-bold text-gray-900">${totalPaid.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Pending Fees</h2>
                <p className="text-2xl font-bold text-gray-900">${totalPending.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Overdue Fees</h2>
                <p className="text-2xl font-bold text-gray-900">${totalOverdue.toFixed(2)}</p>
              </div>
            </div>
          </div>
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
                placeholder="Search by name, email, or invoice ID..."
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
                  Payment Status
                </label>
                <select
                  id="status-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  suppressHydrationWarning
                >
                  <option value="all">All Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
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

        {/* Fees List */}
        {filteredFees.length > 0 ? (
          <div className="space-y-6">
            {filteredFees.map((fee) => (
              <div key={fee.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className="h-16 w-16 rounded-full overflow-hidden relative">
                        <Image
                          src={fee.user.image || "/placeholder.svg"}
                          alt={fee.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{fee.user.name}</h3>
                          <p className="text-gray-600">{fee.user.email}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Member since {fee.user.joinDate} • {fee.user.membershipType} Membership
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center">
                          <span className="text-xl font-bold text-gray-900 mr-3">${fee.amount.toFixed(2)}</span>
                          {getStatusBadge(fee.status)}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Due: {fee.dueDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <CreditCard className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Invoice: {fee.invoiceId}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap justify-between items-center">
                        <button
                          onClick={() => toggleFeeDetails(fee.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                          suppressHydrationWarning
                        >
                          {expandedFee === fee.id ? "Hide Details" : "View Details"}
                          {expandedFee === fee.id ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </button>

                        {(fee.status === "pending" || fee.status === "overdue") && (
                          <div className="mt-2 md:mt-0 flex space-x-3">
                            <button
                              onClick={() => handleSendReminder(fee.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                              suppressHydrationWarning
                            >
                              <Mail className="h-4 w-4 mr-1 text-blue-500" />
                              Send Reminder
                            </button>
                            <button
                              onClick={() => handleMarkAsPaid(fee.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                              suppressHydrationWarning
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark as Paid
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedFee === fee.id && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Details</h4>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Status:</span>{" "}
                            {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Amount:</span> ${fee.amount.toFixed(2)}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Due Date:</span> {fee.dueDate}
                          </p>
                          {fee.paymentDate && (
                            <p className="text-gray-700 mb-2">
                              <span className="font-medium">Payment Date:</span> {fee.paymentDate}
                            </p>
                          )}
                          {fee.paymentMethod && (
                            <p className="text-gray-700">
                              <span className="font-medium">Payment Method:</span> {fee.paymentMethod}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Membership Information</h4>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Membership Type:</span> {fee.user.membershipType}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Member Since:</span> {fee.user.joinDate}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Invoice ID:</span> {fee.invoiceId}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                      {(fee.status === "pending" || fee.status === "overdue") && (
                        <>
                          <button
                            onClick={() => handleSendReminder(fee.id)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                          >
                            <Mail className="h-4 w-4 mr-2 text-blue-500" />
                            Send Payment Reminder
                          </button>
                          <button
                            onClick={() => handleMarkAsPaid(fee.id)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Paid
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No fees found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.status !== "all" || filters.membershipType !== "all"
                ? "Try adjusting your search or filters to find fees."
                : "There are no membership fees to manage at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

