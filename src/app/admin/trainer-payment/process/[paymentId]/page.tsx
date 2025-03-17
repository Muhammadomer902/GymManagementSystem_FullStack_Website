"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, DollarSign, AlertCircle } from "lucide-react"
import { use } from "react"

// Mock data for trainer payments (same as in the trainer-payment page)
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

// Define a type for our payment object
interface Payment {
  id: number
  trainer: {
    id: number
    name: string
    email: string
    image: string
    specialty: string
    joinDate: string
  }
  amount: number
  period: string
  dueDate: string
  status: string
  paymentDate: string | null
  paymentMethod: string | null
  invoiceId: string
  sessions: number
  hourlyRate: number
}

export default function ProcessPaymentPage({ params }: { params: Promise<{ paymentId: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const paymentId = Number.parseInt(resolvedParams.paymentId)

  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer")
  const [notes, setNotes] = useState("")
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundPayment = trainerPayments.find((p) => p.id === paymentId)
    setPayment(foundPayment || null)
    setLoading(false)
  }, [paymentId])

  const handleProcessPayment = () => {
    setProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/admin/trainer-payment")
      }, 2000)
    }, 1500)
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!payment) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Not Found</h3>
            <p className="text-gray-600 mb-6">The payment you are looking for does not exist or has been removed.</p>
            <Link
              href="/admin/trainer-payment"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Payments
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Processed Successfully</h3>
            <p className="text-gray-600 mb-6">
              The payment of ${payment.amount.toFixed(2)} to {payment.trainer.name} has been processed successfully.
            </p>
            <p className="text-sm text-gray-500 mb-6">You will be redirected to the payments page shortly...</p>
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
            href="/admin/trainer-payment"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Payments
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Process Trainer Payment</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full overflow-hidden relative">
                <Image
                  src={payment.trainer.image || "/placeholder.svg"}
                  alt={payment.trainer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">{payment.trainer.name}</h2>
                <p className="text-gray-600">{payment.trainer.email}</p>
                <p className="text-sm text-gray-500 mt-1">{payment.trainer.specialty}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Invoice ID</span>
                      <span className="font-medium text-gray-900">{payment.invoiceId}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Payment Period</span>
                      <span className="font-medium text-gray-900">{payment.period}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Due Date</span>
                      <span className="font-medium text-gray-900">{payment.dueDate}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Sessions</span>
                      <span className="font-medium text-gray-900">{payment.sessions}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Hourly Rate</span>
                      <span className="font-medium text-gray-900">${payment.hourlyRate.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Total Amount</span>
                      <span className="font-bold text-gray-900 text-xl">${payment.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="bank_transfer"
                      name="payment_method"
                      type="radio"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      checked={paymentMethod === "bank_transfer"}
                      onChange={() => setPaymentMethod("bank_transfer")}
                      suppressHydrationWarning
                    />
                    <label htmlFor="bank_transfer" className="ml-3 block text-sm font-medium text-gray-700">
                      Bank Transfer
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="check"
                      name="payment_method"
                      type="radio"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      checked={paymentMethod === "check"}
                      onChange={() => setPaymentMethod("check")}
                      suppressHydrationWarning
                    />
                    <label htmlFor="check" className="ml-3 block text-sm font-medium text-gray-700">
                      Check
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="cash"
                      name="payment_method"
                      type="radio"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                      suppressHydrationWarning
                    />
                    <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                      Cash
                    </label>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      rows={4}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Add any notes about this payment..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      suppressHydrationWarning
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Link
                href="/admin/trainer-payment"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleProcessPayment}
                disabled={processing}
                suppressHydrationWarning
              >
                {processing ? (
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
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Process Payment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

