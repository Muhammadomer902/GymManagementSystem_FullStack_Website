"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  FileText,
} from "lucide-react"

// Mock data for trainer payments
const trainerPayments = [
  {
    id: 1,
    period: "November 2023",
    amount: 1200.0,
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
    period: "October 2023",
    amount: 1140.0,
    dueDate: "2023-10-31",
    status: "paid",
    paymentDate: "2023-10-28",
    paymentMethod: "Bank Transfer",
    invoiceId: "TRN-2023-005",
    sessions: 19,
    hourlyRate: 60,
  },
  {
    id: 3,
    period: "September 2023",
    amount: 1260.0,
    dueDate: "2023-09-30",
    status: "paid",
    paymentDate: "2023-09-29",
    paymentMethod: "Bank Transfer",
    invoiceId: "TRN-2023-010",
    sessions: 21,
    hourlyRate: 60,
  },
  {
    id: 4,
    period: "August 2023",
    amount: 1320.0,
    dueDate: "2023-08-31",
    status: "paid",
    paymentDate: "2023-08-30",
    paymentMethod: "Bank Transfer",
    invoiceId: "TRN-2023-015",
    sessions: 22,
    hourlyRate: 60,
  },
]

// Mock data for trainers
const trainers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    image: "/placeholder.svg?height=200&width=200&text=AJ",
    specialty: "Strength & Conditioning",
    joinDate: "2021-05-15",
    hourlyRate: 60,
    bankDetails: {
      accountName: "Alex Johnson",
      accountNumber: "XXXX-XXXX-XXXX-1234",
      bankName: "First National Bank",
      routingNumber: "XXXXX-XXX",
    },
    taxId: "XXX-XX-XXXX",
  },
  {
    id: "2",
    name: "Sarah Martinez",
    email: "sarah.martinez@example.com",
    image: "/placeholder.svg?height=200&width=200&text=SM",
    specialty: "Weight Loss & Nutrition",
    joinDate: "2022-01-10",
    hourlyRate: 55,
    bankDetails: {
      accountName: "Sarah Martinez",
      accountNumber: "XXXX-XXXX-XXXX-5678",
      bankName: "City Credit Union",
      routingNumber: "XXXXX-XXX",
    },
    taxId: "XXX-XX-XXXX",
  },
]

export default function TrainerPaymentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const trainerId = params.trainerId as string

  const [trainer, setTrainer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedPayment, setExpandedPayment] = useState<number | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    period: "all",
  })

  useEffect(() => {
    // Simulate API call to fetch trainer details
    const foundTrainer = trainers.find((t) => t.id === trainerId)
    if (foundTrainer) {
      setTrainer(foundTrainer)
    } else {
      // Redirect if trainer not found
      router.push("/admin/trainer-payment")
    }
    setLoading(false)
  }, [trainerId, router])

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const togglePaymentDetails = (id: number) => {
    setExpandedPayment(expandedPayment === id ? null : id)
  }

  const handleProcessPayment = (id: number) => {
    // In a real app, this would process the payment
    alert(`Payment processed for invoice ${trainerPayments.find((payment) => payment.id === id)?.invoiceId}`)
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

  const filteredPayments = trainerPayments.filter((payment) => {
    const matchesSearch = payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
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
  const uniquePeriods = ["all", ...new Set(trainerPayments.map((payment) => payment.period))]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trainer payment details...</p>
        </div>
      </div>
    )
  }

  if (!trainer) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Trainer not found</h3>
            <p className="text-gray-600 mb-6">The trainer you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/admin/trainer-payment"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Trainer Payments
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/admin/trainer-payment"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Trainer Payments
          </Link>
        </div>

        {/* Trainer Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <div className="h-24 w-24 rounded-full overflow-hidden relative">
                  <Image src={trainer.image || "/placeholder.svg"} alt={trainer.name} fill className="object-cover" />
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{trainer.name}</h1>
                    <p className="text-gray-600">{trainer.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {trainer.specialty} • Joined {trainer.joinDate}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <div className="text-xl font-bold text-gray-900">${trainer.hourlyRate}/hour</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

        {/* Bank Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Bank Details</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Account Name:</span> {trainer.bankDetails.accountName}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Account Number:</span> {trainer.bankDetails.accountNumber}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Bank Name:</span> {trainer.bankDetails.bankName}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Routing Number:</span> {trainer.bankDetails.routingNumber}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tax Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Tax ID:</span> {trainer.taxId}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Payment Rate:</span> ${trainer.hourlyRate}/hour
                  </p>
                </div>
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
                placeholder="Search by invoice ID..."
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

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Payment History</h2>
          </div>
          <div className="p-6">
            {filteredPayments.length > 0 ? (
              <div className="space-y-6">
                {filteredPayments.map((payment) => (
                  <div key={payment.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{payment.period}</h3>
                          <p className="text-sm text-gray-500">Invoice: {payment.invoiceId}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-gray-900">${payment.amount.toFixed(2)}</span>
                          {getStatusBadge(payment.status)}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Due: {payment.dueDate}</span>
                        </div>

                        <div className="flex space-x-3">
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

                          {(payment.status === "pending" || payment.status === "overdue") && (
                            <button
                              onClick={() => handleProcessPayment(payment.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                              suppressHydrationWarning
                            >
                              <DollarSign className="h-4 w-4 mr-1" />
                              Process Payment
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedPayment === payment.id && (
                      <div className="border-t border-gray-200 px-4 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Details</h4>
                            <div className="bg-white p-3 rounded-md border border-gray-200">
                              <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">Status:</span>{" "}
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </p>
                              <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">Amount:</span> ${payment.amount.toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">Due Date:</span> {payment.dueDate}
                              </p>
                              {payment.paymentDate && (
                                <p className="text-sm text-gray-700 mb-2">
                                  <span className="font-medium">Payment Date:</span> {payment.paymentDate}
                                </p>
                              )}
                              {payment.paymentMethod && (
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Payment Method:</span> {payment.paymentMethod}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Session Information</h4>
                            <div className="bg-white p-3 rounded-md border border-gray-200">
                              <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">Total Sessions:</span> {payment.sessions}
                              </p>
                              <p className="text-sm text-gray-700 mb-2">
                                <span className="font-medium">Hourly Rate:</span> ${payment.hourlyRate.toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Invoice ID:</span> {payment.invoiceId}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No payment records found</h3>
                <p className="text-gray-600">
                  {searchTerm || filters.status !== "all" || filters.period !== "all"
                    ? "Try adjusting your search or filters to find payments."
                    : "There are no payment records for this trainer yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

