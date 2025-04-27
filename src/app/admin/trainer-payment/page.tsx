"use client"

import { useState, useEffect } from "react"
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
  Trash2,
  User,
} from "lucide-react"

interface Trainer {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  trainerProfile?: {
    certifications?: string[];
    experienceYears?: number;
    bio?: string;
    specialties?: string[];
    education?: string;
    availableHours?: string;
    socialMediaLinks?: {
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
}

interface Payment {
  id: number;
  trainer: Trainer;
  amount: number;
  period: string;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  paymentDate: string | null;
  paymentMethod: string | null;
  invoiceId: string;
  sessions: number;
  hourlyRate: number;
}

export default function TrainerPaymentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    period: "all",
  })
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [payments, setPayments] = useState<Payment[]>([])
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  // Fetch trainers from the backend
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users?role=trainer');
        
        if (!response.ok) {
          throw new Error('Failed to fetch trainers');
        }
        
        const data = await response.json();
        setTrainers(data.users);
        
        // Generate mock payments based on real trainers
        const mockPayments = data.users.flatMap((trainer: Trainer, index: number) => {
          // Create 1-2 payments per trainer
          const paymentsCount = (index % 2) + 1;
          return Array(paymentsCount).fill(0).map((_, idx) => ({
            id: index * 10 + idx + 1,
            trainer: trainer,
            amount: 1000 + Math.floor(Math.random() * 500),
            period: "November 2023",
            dueDate: "2023-11-30",
            status: ["pending", "paid", "overdue"][Math.floor(Math.random() * 3)] as "pending" | "paid" | "overdue",
            paymentDate: idx === 0 ? "2023-11-28" : null,
            paymentMethod: idx === 0 ? "Bank Transfer" : null,
            invoiceId: `TRN-2023-${100 + index * 10 + idx}`,
            sessions: 15 + Math.floor(Math.random() * 15),
            hourlyRate: 45 + Math.floor(Math.random() * 25),
          }));
        });
        
        setPayments(mockPayments);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trainers:", err);
        setError("Failed to load trainers. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchTrainers();
  }, []);

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

  const handleDeleteTrainer = async (trainerId: string) => {
    // Show confirmation dialog
    setConfirmDelete(trainerId);
  }

  const confirmDeleteTrainer = async (trainerId: string) => {
    try {
      const response = await fetch(`/api/users/${trainerId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete trainer');
      }
      
      // Remove trainer from state
      setTrainers(trainers.filter(trainer => trainer._id !== trainerId));
      
      // Remove payments associated with this trainer
      setPayments(payments.filter(payment => payment.trainer._id !== trainerId));
      
      setConfirmDelete(null);
    } catch (err) {
      console.error("Error deleting trainer:", err);
      alert("Failed to delete trainer. Please try again.");
    }
  }

  const cancelDelete = () => {
    setConfirmDelete(null);
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

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading trainer data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <AlertCircle className="h-8 w-8 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trainer Payment Management</h1>
          <p className="mt-1 text-gray-600">Process and track payments to trainers</p>
        </div>

        {confirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Trainer Removal</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to remove this trainer? This action cannot be undone and will delete all associated records.
              </p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={cancelDelete}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => confirmDeleteTrainer(confirmDelete)}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Delete Trainer
                </button>
              </div>
            </div>
          </div>
        )}

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
                  Payment Status
                </label>
                <select
                  id="status-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
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

        {/* Trainers List Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Registered Trainers</h2>
          
          <div className="space-y-4">
            {trainers.length > 0 ? (
              trainers.map((trainer) => (
                <div key={trainer._id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                        {trainer.name ? (
                          <span className="text-xl font-bold">{trainer.name.charAt(0).toUpperCase()}</span>
                        ) : (
                          <User className="h-6 w-6" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                        <div className="text-sm text-gray-500">{trainer.email}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setExpandedPayment(expandedPayment === trainer._id ? null : trainer._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                      >
                        {expandedPayment === trainer._id ? "Hide Details" : "Show Details"}
                        {expandedPayment === trainer._id ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteTrainer(trainer._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-red-600 text-white hover:bg-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {expandedPayment === trainer._id && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Profile Details</h4>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Experience:</span> {trainer.trainerProfile?.experienceYears || 0} years
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Specialties:</span> {trainer.trainerProfile?.specialties?.join(", ") || "None specified"}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Education:</span> {trainer.trainerProfile?.education || "Not provided"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Information</h4>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Bio:</span> {trainer.trainerProfile?.bio || "Not provided"}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Available Hours:</span> {trainer.trainerProfile?.availableHours || "Not specified"}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Certifications:</span> {trainer.trainerProfile?.certifications?.join(", ") || "None specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <User className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No trainers found</h3>
                <p className="text-gray-600">There are no registered trainers in the system.</p>
              </div>
            )}
          </div>
        </div>

        {/* Payments List */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Records</h2>
        {filteredPayments.length > 0 ? (
          <div className="space-y-6">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-400">
                        {payment.trainer.name ? (
                          <span className="text-4xl font-bold">{payment.trainer.name.charAt(0).toUpperCase()}</span>
                        ) : (
                          <User className="h-8 w-8" />
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{payment.trainer.name}</h3>
                          <p className="text-gray-600">{payment.trainer.email}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {payment.trainer.trainerProfile?.specialties?.join(", ") || "No specialties"} • {payment.sessions} sessions
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
                            href={`/admin/trainer-payment/${payment.trainer._id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                          >
                            Trainer History
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>

                          {(payment.status === "pending" || payment.status === "overdue") && (
                            <button
                              onClick={() => handleNavigateToPayment(payment.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
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
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Trainer Information</h4>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Name:</span> {payment.trainer.name}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Email:</span> {payment.trainer.email}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Experience:</span> {payment.trainer.trainerProfile?.experienceYears || 0} years
                          </p>
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Bio:</span> {payment.trainer.trainerProfile?.bio || "Not provided"}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Education:</span> {payment.trainer.trainerProfile?.education || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                      <Link
                        href={`/admin/trainer-payment/${payment.trainer._id}`}
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

