"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { CreditCard, CheckCircle, ArrowLeft, Lock } from "lucide-react"

// Mock invoice data - in a real app, you would fetch this from your API
const getInvoiceData = (invoiceId: string) => {
  return {
    id: invoiceId,
    date: "2023-11-05",
    dueDate: "2023-11-20",
    amount: 60.0,
    status: "pending",
    description: "Personal Training Session - Alex Johnson",
  }
}

export default function PaymentPage() {
  const router = useRouter()
  const params = useParams()
  const invoiceId = params.invoiceId as string

  const invoice = getInvoiceData(invoiceId)

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails({
      ...cardDetails,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!cardDetails.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required"
    } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number"
    }

    if (!cardDetails.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required"
    }

    if (!cardDetails.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = "Please use MM/YY format"
    }

    if (!cardDetails.cvv.trim()) {
      newErrors.cvv = "CVV is required"
    } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentComplete(true)

      // Redirect to invoice page after successful payment
      setTimeout(() => {
        router.push("/user/invoice")
      }, 3000)
    }, 2000)
  }

  if (paymentComplete) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="mt-2 text-gray-600">
              Your payment of ${invoice.amount.toFixed(2)} for invoice #{invoice.id} has been processed successfully.
            </p>
            <p className="mt-1 text-gray-600">A receipt has been sent to your email.</p>
            <div className="mt-6">
              <Link
                href="/user/invoice"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Return to Invoices
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link
            href="/user/invoice"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Invoices
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h1 className="text-lg font-medium text-gray-900">Payment for Invoice #{invoice.id}</h1>
            <p className="mt-1 text-sm text-gray-600">{invoice.description}</p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Amount Due</p>
                <p className="text-3xl font-bold text-gray-900">${invoice.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">Due by {invoice.dueDate}</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center text-sm text-gray-500">
                <Lock className="h-4 w-4 text-green-500 mr-1" />
                <span>Secure Payment</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={() => setPaymentMethod("credit-card")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">Credit Card</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={paymentMethod === "bank-transfer"}
                      onChange={() => setPaymentMethod("bank-transfer")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">Bank Transfer</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">PayPal</span>
                  </label>
                </div>
              </div>
            </div>

            {paymentMethod === "credit-card" && (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.cardNumber ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                    </div>
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                  </div>

                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      value={cardDetails.cardName}
                      onChange={handleInputChange}
                      className={`block w-full px-3 py-2 border ${errors.cardName ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                        className={`block w-full px-3 py-2 border ${errors.expiryDate ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                      {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        className={`block w-full px-3 py-2 border ${errors.cvv ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                      {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                    </div>
                  </div>

                  <div className="flex items-center mt-2">
                    <input
                      id="save-card"
                      name="save-card"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="save-card" className="ml-2 block text-sm text-gray-700">
                      Save this card for future payments
                    </label>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      `Pay $${invoice.amount.toFixed(2)}`
                    )}
                  </button>
                </div>

                <div className="mt-4 text-center text-xs text-gray-500">
                  <p>
                    By clicking the button above, you agree to our{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </form>
            )}

            {paymentMethod === "bank-transfer" && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-md font-medium text-gray-900 mb-2">Bank Transfer Details</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Please use the following details to make a bank transfer. Include your invoice number as the
                  reference.
                </p>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Account Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">FitHub Gym</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">National Bank</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">1234567890</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Routing Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">987654321</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Reference</dt>
                    <dd className="mt-1 text-sm text-gray-900">{invoice.id}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        "Please complete your bank transfer using the details above. Once completed, your invoice will be marked as paid within 1-2 business days.",
                      )
                      router.push("/user/invoice")
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    I've Completed the Transfer
                  </button>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="text-center">
                <p className="text-gray-600 mb-6">You will be redirected to PayPal to complete your payment.</p>
                <button
                  type="button"
                  onClick={() => {
                    setIsProcessing(true)
                    setTimeout(() => {
                      setIsProcessing(false)
                      window.open("https://www.paypal.com", "_blank")
                    }, 1500)
                  }}
                  disabled={isProcessing}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Redirecting...
                    </>
                  ) : (
                    "Pay with PayPal"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

