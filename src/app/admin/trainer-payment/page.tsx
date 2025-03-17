"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Calendar,
  ChevronRight,
} from "lucide-react"

// Mock data for trainer payments
const trainerPayments = [
  {
    id: 1,
    trainer: {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      image: "/placeholder.svg?height=200&width=200&text=AJ",
      specialty: "Strength & Conditioning",
      joinDate: "2021-05-15",
    },
    amount: 1200.0,
    period: "November 2023",
    dueDate: "2023-11-30",
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    invoiceId: "TRN-2023-001",
    sessions: 20,
    hourlyRate: 60,
  },
  {
    id: 2,
    trainer: {
      id: 2,
      name: "Sarah Martinez",
      email: "sarah.martinez@example.com",
      image: "/placeholder.svg?height=200&width=200&text=SM",
      specialty: "Weight Loss & Nutrition",
      joinDate: "2022-01-10",
    },
    amount: 1375.0,
    period: "November 2023",
    dueDate: "2023-11-30",
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    invoiceId: "TRN-2023-002",
    sessions: 25,
    hourlyRate: 55,
  },
  {
    id: 3,
    trainer: {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      image: "/placeholder.svg?height=200&width=200&text=MC",
      specialty: "Yoga & Mobility",
      joinDate: "2022-03-22",
    },
    amount: 900.0,
    period: "November 2023",
    dueDate: "2023-11-30",
    status: "paid",
    paymentDate: "2023-11-28",
    paymentMethod: "Bank Transfer",
    invoiceId: "TRN-2023-003",
    sessions: 18,
    hourlyRate: 50,
  },
  {
    id: 4,
    trainer: {
      id: 4,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      image: "/placeholder.svg?height=200&width=200&text=ER",
      specialty: "HIIT & Functional Training",
      joinDate: "2022-06-15",
    },
    amount: 1080.0,
    period: "November 2023",
    dueDate: "2023-11-30",
    status: "paid",
    paymentDate: "2023-11-25",
    paymentMethod: "Bank Transfer",
    invoiceId: "TRN-2023-004",
    sessions: 24,
    hourlyRate: 45,
  },
  {
    id: 5,
    trainer: {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      image: "/placeholder.svg?height=200&width=200&text=AJ",
      specialty: "Strength & Conditioning",
      joinDate: "2021-05-15",
    },
    amount: 1140.0,
    period: "October 2023",
    dueDate: "2023-10-31",
    status: "overdue",
    paymentDate: null,
    paymentMethod: null,
    invoiceId: "TRN-2023-005",
    sessions: 19,
    hourlyRate: 60,
  },
]

export default function TrainerPaymentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedPayment, setExpandedPayment] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    period: "all",
  })
  const [payments, setPayments] = useState(trainerPayments)

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const togglePaymentDetails = (id: number) => {
    setExpandedPayment(expandedPayment === id ? null : id)
  }

  const handleNavigateToPayment = (id: number) => {
    // In a real app, this would navigate to the payment page
    window.location.href = `/admin/trainer-payment/process/${id}`
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

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filters.status === "all" || payment.status === filters.status
    const matchesPeriod = filters.period === "all" || payment.period === filters.period

    return matchesSearch && matchesStatus && matchesPeriod
  })

  // Calculate summary statistics
  const totalPaid = filteredPayments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const totalPending = filteredPayments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const totalOverdue = filteredPayments
    .filter((payment) => payment.status === "overdue")
    .reduce((sum, payment) => sum + payment.amount, 0)

  // Get unique periods for filter
  const uniquePeriods = ["all", ...new Set(payments.map((payment) => payment.period))]

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trainer Payment Management</h1>
          <p className="mt-1 text-gray-600">Process and track payments to trainers</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Paid</h2>
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
                <h2 className="text-sm font-medium text-gray-500">Pending</h2>
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
                <h2 className="text-sm font-medium text-gray-500">Overdue</h2>
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
                placeholder="Search by trainer name, email, or invoice ID..."
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
                <label htmlFor="period-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Period
                </label>
                <select
                  id="period-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.period}
                  onChange={(e) => setFilters({ ...filters, period: e.target.value })}
                  suppressHydrationWarning
                >
                  {uniquePeriods.map((period) => (
                    <option key={period} value={period}>
                      {period === "all" ? "All Periods" : period}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Payments List */}
        {filteredPayments.length > 0 ? (
          <div className="space-y-6">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className="h-16 w-16 rounded-full overflow-hidden relative">
                        <Image
                          src={payment.trainer.image || "/placeholder.svg"}
                          alt={payment.trainer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{payment.trainer.name}</h3>
                          <p className="text-gray-600">{payment.trainer.email}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {payment.trainer.specialty} • {payment.sessions} sessions
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center">
                          <span className="text-xl font-bold text-gray-900 mr-3">${payment.amount.toFixed(2)}</span>
                          {getStatusBadge(payment.status)}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Period: {payment.period}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Due: {payment.dueDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Invoice: {payment.invoiceId}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap justify-between items-center">
                        <button
                          onClick={() => togglePaymentDetails(payment.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                          suppressHydrationWarning
                        >
                          {expandedPayment === payment.id ? "Hide Details" : "View Details"}
                          {expandedPayment === payment.id ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </button>

                        <div className="mt-2 md:mt-0 flex space-x-3">
                          <Link
                            href={`/admin/trainer-payment/${payment.trainer.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                          >
                            Trainer History
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>

                          {(payment.status === "pending" || payment.status === "overdue") && (
                            <button
                              onClick={() => handleNavigateToPayment(payment.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                              suppressHydrationWarning
                            >
                              <DollarSign className="h-4 w-4 mr-1" />
                              Go to Payment
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedPayment === payment.id && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Details</h4>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Status:</span>{" "}
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Amount:</span> ${payment.amount.toFixed(2)}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Period:</span> {payment.period}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Due Date:</span> {payment.dueDate}
                          </p>
                          {payment.paymentDate && (
                            <p className="text-gray-700 mb-2">
                              <span className="font-medium">Payment Date:</span> {payment.paymentDate}
                            </p>
                          )}
                          {payment.paymentMethod && (
                            <p className="text-gray-700">
                              <span className="font-medium">Payment Method:</span> {payment.paymentMethod}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Session Information</h4>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Total Sessions:</span> {payment.sessions}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Hourly Rate:</span> ${payment.hourlyRate.toFixed(2)}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Specialty:</span> {payment.trainer.specialty}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Invoice ID:</span> {payment.invoiceId}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                      <Link
                        href={`/admin/trainer-payment/${payment.trainer.id}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                      >
                        View Trainer History
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>

                      {(payment.status === "pending" || payment.status === "overdue") && (
                        <button
                          onClick={() => handleNavigateToPayment(payment.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Go to Payment
                        </button>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.status !== "all" || filters.period !== "all"
                ? "Try adjusting your search or filters to find payments."
                : "There are no trainer payments to manage at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

