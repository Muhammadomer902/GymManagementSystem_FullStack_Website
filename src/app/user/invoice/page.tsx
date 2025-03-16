"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"

// Mock data for invoices
const invoices = [
  {
    id: "INV-2023-001",
    date: "2023-11-01",
    dueDate: "2023-11-15",
    amount: 49.99,
    status: "paid",
    description: "Monthly Membership - November 2023",
    paymentMethod: "Credit Card",
    paymentDate: "2023-11-01",
  },
  {
    id: "INV-2023-002",
    date: "2023-11-05",
    dueDate: "2023-11-20",
    amount: 60.0,
    status: "pending",
    description: "Personal Training Session - Alex Johnson",
    paymentMethod: null,
    paymentDate: null,
  },
  {
    id: "INV-2023-003",
    date: "2023-10-01",
    dueDate: "2023-10-15",
    amount: 49.99,
    status: "paid",
    description: "Monthly Membership - October 2023",
    paymentMethod: "Credit Card",
    paymentDate: "2023-10-01",
  },
  {
    id: "INV-2023-004",
    date: "2023-10-12",
    dueDate: "2023-10-27",
    amount: 25.0,
    status: "overdue",
    description: "Nutrition Consultation",
    paymentMethod: null,
    paymentDate: null,
  },
  {
    id: "INV-2023-005",
    date: "2023-09-01",
    dueDate: "2023-09-15",
    amount: 49.99,
    status: "paid",
    description: "Monthly Membership - September 2023",
    paymentMethod: "Bank Transfer",
    paymentDate: "2023-09-03",
  },
]

export default function InvoicePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
  })

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleInvoiceDetails = (id: string) => {
    setExpandedInvoice(expandedInvoice === id ? null : id)
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
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
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
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XCircle className="h-3 w-3 mr-1" />
            Unknown
          </span>
        )
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filters.status === "all" || invoice.status === filters.status

    const today = new Date()
    const invoiceDate = new Date(invoice.date)
    const matchesDateRange =
      filters.dateRange === "all" ||
      (filters.dateRange === "current-month" &&
        invoiceDate.getMonth() === today.getMonth() &&
        invoiceDate.getFullYear() === today.getFullYear()) ||
      (filters.dateRange === "last-3-months" &&
        (today.getMonth() - invoiceDate.getMonth() + 12) % 12 <= 2 &&
        today.getFullYear() - invoiceDate.getFullYear() <= 1) ||
      (filters.dateRange === "last-6-months" &&
        (today.getMonth() - invoiceDate.getMonth() + 12) % 12 <= 5 &&
        today.getFullYear() - invoiceDate.getFullYear() <= 1)

    return matchesSearch && matchesStatus && matchesDateRange
  })

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices & Payments</h1>
            <p className="mt-1 text-gray-600">View and manage your billing history</p>
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
                placeholder="Search invoices..."
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
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
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
                  <option value="current-month">Current Month</option>
                  <option value="last-3-months">Last 3 Months</option>
                  <option value="last-6-months">Last 6 Months</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Invoices List */}
        {filteredInvoices.length > 0 ? (
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{invoice.description}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Invoice #{invoice.id} • Issued on {invoice.date}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">{getStatusBadge(invoice.status)}</div>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">Due: {invoice.dueDate}</span>
                    </div>
                    <div className="mt-2 sm:mt-0 text-xl font-bold text-gray-900">${invoice.amount.toFixed(2)}</div>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-between items-center">
                    <button
                      onClick={() => toggleInvoiceDetails(invoice.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      {expandedInvoice === invoice.id ? "Hide Details" : "View Details"}
                      {expandedInvoice === invoice.id ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </button>

                    <div className="mt-2 sm:mt-0 flex space-x-3">
                      <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>

                      {invoice.status !== "paid" && (
                        <Link
                          href={`/user/payment/${invoice.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pay Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedInvoice === invoice.id && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-50">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Invoice Number</dt>
                        <dd className="mt-1 text-sm text-gray-900">{invoice.id}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                        <dd className="mt-1 text-sm text-gray-900">{invoice.date}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                        <dd className="mt-1 text-sm text-gray-900">{invoice.dueDate}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Amount</dt>
                        <dd className="mt-1 text-sm text-gray-900">${invoice.amount.toFixed(2)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm text-gray-900">{invoice.description}</dd>
                      </div>

                      {invoice.status === "paid" && (
                        <>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                            <dd className="mt-1 text-sm text-gray-900">{invoice.paymentMethod}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Payment Date</dt>
                            <dd className="mt-1 text-sm text-gray-900">{invoice.paymentDate}</dd>
                          </div>
                        </>
                      )}
                    </dl>

                    <div className="mt-6 flex justify-end">
                      <Link
                        href={`/user/invoice/${invoice.id}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Full Invoice
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.status !== "all" || filters.dateRange !== "all"
                ? "Try adjusting your search or filters to find invoices."
                : "You don't have any invoices yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

