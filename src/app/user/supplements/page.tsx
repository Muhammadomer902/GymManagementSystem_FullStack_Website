"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart, Search, X, Check, CreditCard, Calendar, Lock, Clock, Package } from "lucide-react"

// Mock data for supplements (replace with actual data from your database)
const mockSupplements = [
  {
    id: 1,
    name: "Whey Protein Isolate",
    brand: "MuscleTech",
    description: "Premium whey protein isolate for muscle growth and recovery",
    price: 49.99,
    discount: 10,
    images: ["/images/Isolate Whey Protein.avif"],
    category: "Protein",
    rating: 4.5,
    reviews: 120,
    stock: 50,
    benefits: [
      "Supports muscle growth and recovery",
      "High-quality protein source",
      "Easy to digest",
      "Low in fat and carbs"
    ],
    usageInstructions: "Mix 1 scoop with 8-10 oz of water or milk. Consume within 30 minutes after workout.",
    warnings: "Consult your healthcare provider before use if you have any medical conditions."
  },
  {
    id: 2,
    name: "Pre-Workout Energy",
    brand: "Optimum Nutrition",
    description: "Powerful pre-workout formula for enhanced performance",
    price: 39.99,
    discount: 0,
    images: ["/images/PreWorkout.avif"],
    category: "Pre-Workout",
    rating: 4.8,
    reviews: 85,
    stock: 30,
    benefits: [
      "Increases energy and focus",
      "Enhances workout performance",
      "Supports endurance",
      "Improves muscle pumps"
    ],
    usageInstructions: "Take 1 scoop 20-30 minutes before workout. Do not exceed 2 scoops per day.",
    warnings: "Not recommended for individuals sensitive to caffeine."
  },
  {
    id: 3,
    name: "BCAA Powder",
    brand: "BSN",
    description: "Essential amino acids for muscle recovery and growth",
    price: 29.99,
    discount: 15,
    images: ["/images/BCAA.webp"],
    category: "Amino Acids",
    rating: 4.6,
    reviews: 95,
    stock: 40,
    benefits: [
      "Reduces muscle soreness",
      "Supports muscle recovery",
      "Prevents muscle breakdown",
      "Enhances protein synthesis"
    ],
    usageInstructions: "Mix 1 scoop with water during or after workout. Can be taken multiple times per day.",
    warnings: "Keep out of reach of children."
  },
  {
    id: 4,
    name: "Multivitamin Complex",
    brand: "GNC",
    description: "Complete daily multivitamin for overall health and wellness",
    price: 24.99,
    discount: 5,
    images: ["/images/Multivitamin Complex.webp"],
    category: "Vitamins",
    rating: 4.7,
    reviews: 150,
    stock: 75,
    benefits: [
      "Supports immune system",
      "Promotes energy production",
      "Maintains healthy bones",
      "Supports heart health"
    ],
    usageInstructions: "Take 1 tablet daily with food. Best taken in the morning.",
    warnings: "Do not exceed recommended daily intake."
  },
  {
    id: 5,
    name: "Thermogenic Fat Burner",
    brand: "Cellucor",
    description: "Advanced fat burning formula for weight management",
    price: 34.99,
    discount: 20,
    images: ["/images/Fat Burner.jpg"],
    category: "Fat Burners",
    rating: 4.4,
    reviews: 65,
    stock: 25,
    benefits: [
      "Supports fat metabolism",
      "Increases energy levels",
      "Reduces appetite",
      "Enhances focus"
    ],
    usageInstructions: "Take 2 capsules in the morning and 2 capsules in the afternoon. Do not take within 4 hours of bedtime.",
    warnings: "Not recommended for individuals with heart conditions or high blood pressure."
  },
  {
    id: 6,
    name: "Post-Workout Recovery",
    brand: "Dymatize",
    description: "Complete post-workout recovery formula with protein and carbs",
    price: 44.99,
    discount: 0,
    images: ["/images/Post Workout Recovery.jpg"],
    category: "Post-Workout",
    rating: 4.9,
    reviews: 110,
    stock: 35,
    benefits: [
      "Speeds up recovery",
      "Replenishes glycogen",
      "Reduces muscle soreness",
      "Supports muscle growth"
    ],
    usageInstructions: "Mix 1 scoop with water immediately after workout. Can be taken with or without food.",
    warnings: "Contains milk and soy ingredients."
  }
]

// Define a type for our supplement
type Supplement = {
  id: number
  name: string
  brand: string
  description: string
  price: number
  discount: number
  images: string[]
  category: string
  rating: number
  reviews: number
  stock: number
  benefits: string[]
  usageInstructions: string
  warnings: string
}

// Define a type for order history item
type OrderItem = {
  productId: number
  name: string
  price: number
  quantity: number
  image: string
  purchaseDate: Date
}

export default function SupplementsPage() {
  const [supplements] = useState<Supplement[]>(mockSupplements)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showOrderHistoryModal, setShowOrderHistoryModal] = useState(false)
  const [orderHistory, setOrderHistory] = useState<OrderItem[]>([])
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    address: "",
  })

  const categories = ["All", "Protein", "Pre-Workout", "Post-Workout", "Vitamins", "Amino Acids", "Fat Burners"]

  const filteredSupplements = supplements
    .filter((supplement) => {
      const matchesCategory = selectedCategory === "All" || supplement.category === selectedCategory
      const matchesSearch = supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplement.brand.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const handleSupplementClick = (supplement: Supplement) => {
    setSelectedSupplement(supplement)
    setShowModal(true)
  }

  const handleBuyNow = () => {
    setShowModal(false)
    setShowCheckoutModal(true)
  }

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    })
  }

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, this would be an API call to update the user's order history
    if (selectedSupplement) {
      const newOrder: OrderItem = {
        productId: selectedSupplement.id,
        name: selectedSupplement.name,
        price: selectedSupplement.discount > 0 
          ? selectedSupplement.price * (1 - selectedSupplement.discount / 100) 
          : selectedSupplement.price,
        quantity: 1,
        image: selectedSupplement.images[0],
        purchaseDate: new Date()
      }
      
      // Add to local state for demo purposes
      setOrderHistory([newOrder, ...orderHistory])
    }
    
    setShowCheckoutModal(false)
    setShowSuccessModal(true)
    
    // Reset payment info for next purchase
    setPaymentInfo({
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      address: "",
    })
  }

  const closeSuccessModal = () => {
    setShowSuccessModal(false)
    setSelectedSupplement(null)
  }

  // Format date for display
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplements</h1>
            <p className="mt-2 text-gray-600">Browse our selection of premium supplements</p>
          </div>
          <button
            onClick={() => setShowOrderHistoryModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            <Clock className="mr-2 h-5 w-5" />
            Order History
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search supplements..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
            <div className="relative">
              <select
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Supplements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredSupplements.map((supplement) => (
            <div
              key={supplement.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleSupplementClick(supplement)}
            >
              <div className="relative h-48">
                <Image
                  src={supplement.images[0]}
                  alt={supplement.name}
                  fill
                  className="object-cover"
                />
                {supplement.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                    {supplement.discount}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{supplement.brand}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-900">{supplement.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{supplement.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{supplement.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    {supplement.discount > 0 ? (
                      <>
                        <span className="text-lg font-bold text-gray-900">
                          ${(supplement.price * (1 - supplement.discount / 100)).toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${supplement.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ${supplement.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && selectedSupplement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSupplement.name}</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={selectedSupplement.images[0]}
                      alt={selectedSupplement.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${selectedSupplement.price}
                      </span>
                      {selectedSupplement.discount > 0 && (
                        <span className="text-green-600 font-medium">
                          {selectedSupplement.discount}% off
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < selectedSupplement.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">({selectedSupplement.reviews} reviews)</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Description</h3>
                      <p className="text-gray-600">{selectedSupplement.description}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Benefits</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {selectedSupplement.benefits.map((benefit: string, index: number) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Usage Instructions</h3>
                      <p className="text-gray-600">{selectedSupplement.usageInstructions}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Warnings</h3>
                      <p className="text-gray-600">{selectedSupplement.warnings}</p>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleBuyNow}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart size={20} />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckoutModal && selectedSupplement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={selectedSupplement.images[0]}
                        alt={selectedSupplement.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedSupplement.name}</h3>
                      <p className="text-gray-600 text-sm">{selectedSupplement.brand}</p>
                      <p className="text-blue-600 font-medium">
                        ${selectedSupplement.discount > 0
                          ? (selectedSupplement.price * (1 - selectedSupplement.discount / 100)).toFixed(2)
                          : selectedSupplement.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleProceedToPayment}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardholderName"
                        name="cardholderName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                        value={paymentInfo.cardholderName}
                        onChange={handlePaymentInfoChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentInfoChange}
                          required
                        />
                        <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={paymentInfo.expiryDate}
                            onChange={handlePaymentInfoChange}
                            required
                          />
                          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123"
                            maxLength={3}
                            value={paymentInfo.cvv}
                            onChange={handlePaymentInfoChange}
                            required
                          />
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full address"
                        value={paymentInfo.address}
                        onChange={handlePaymentInfoChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <CreditCard size={20} />
                      <span>Proceed to Payment</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden">
              <div className="p-6">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                  <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
                  
                  <button
                    onClick={closeSuccessModal}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order History Modal */}
        {showOrderHistoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 overflow-hidden max-h-[80vh] flex flex-col">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                <button
                  onClick={() => setShowOrderHistoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-auto flex-grow">
                {orderHistory.length > 0 ? (
                  <div className="space-y-6">
                    {orderHistory.map((order, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={order.image}
                              alt={order.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium text-gray-900">{order.name}</h3>
                            <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Package className="h-4 w-4 mr-1 text-blue-600" />
                                <span>Qty: {order.quantity}</span>
                              </div>
                              <div className="flex items-center">
                                <CreditCard className="h-4 w-4 mr-1 text-blue-600" />
                                <span>${order.price.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-blue-600" />
                                <span>{formatDate(order.purchaseDate)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <button
                              className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
                              onClick={() => {
                                // Find the supplement and open its modal
                                const supplement = supplements.find(s => s.id === order.productId)
                                if (supplement) {
                                  setSelectedSupplement(supplement)
                                  setShowOrderHistoryModal(false)
                                  setShowModal(true)
                                }
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Your order history will appear here after you make a purchase.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {filteredSupplements.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No supplements found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
} 