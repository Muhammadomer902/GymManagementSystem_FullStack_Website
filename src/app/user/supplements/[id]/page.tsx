"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart, ChevronLeft } from "lucide-react"
import Link from "next/link"

// Mock data for a single supplement (replace with actual data from your database)
const mockSupplement = {
  id: 1,
  name: "Whey Protein Isolate",
  brand: "MuscleTech",
  description: "Premium whey protein isolate for muscle growth and recovery",
  detailedDescription: "Our premium whey protein isolate is designed to support muscle growth and recovery. It contains 25g of high-quality protein per serving with minimal fat and carbs. Perfect for post-workout recovery or as a meal replacement.",
  price: 49.99,
  discount: 10,
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  category: "Protein",
  ingredients: [
    { name: "Whey Protein Isolate", amount: "25g" },
    { name: "Natural Flavors", amount: "1g" },
    { name: "Stevia", amount: "0.5g" },
  ],
  servingSize: "1 scoop (30g)",
  servingsPerContainer: 30,
  nutritionalInfo: {
    calories: 120,
    protein: 25,
    carbs: 3,
    fat: 1,
    sugar: 1,
    sodium: 150,
  },
  benefits: [
    "Supports muscle growth and recovery",
    "High-quality protein source",
    "Low in fat and carbs",
    "Easy to digest",
    "Great taste and mixability",
  ],
  usageInstructions: "Mix 1 scoop with 8-10 oz of water or milk. Consume within 30 minutes after workout or as a meal replacement.",
  warnings: "This product is manufactured in a facility that also processes milk, eggs, soy, and tree nuts.",
  rating: 4.5,
  reviews: [
    {
      user: "John D.",
      rating: 5,
      comment: "Great protein powder! Mixes well and tastes amazing.",
      date: "2023-10-15",
    },
    {
      user: "Sarah M.",
      rating: 4,
      comment: "Good quality protein, but a bit pricey.",
      date: "2023-09-22",
    },
  ],
  stock: 50,
}

export default function SupplementDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // Add to cart functionality
    console.log(`Added ${quantity} of ${mockSupplement.name} to cart`)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/user/supplements"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Supplements
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-96 mb-4">
                <Image
                  src={mockSupplement.images[selectedImage]}
                  alt={mockSupplement.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex gap-2">
                {mockSupplement.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 rounded-md overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${mockSupplement.name} - View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-500">{mockSupplement.brand}</span>
                <h1 className="text-3xl font-bold text-gray-900">{mockSupplement.name}</h1>
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="ml-1 text-gray-900 font-medium">{mockSupplement.rating}</span>
                  <span className="ml-1 text-gray-500">({mockSupplement.reviews.length} reviews)</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">{mockSupplement.detailedDescription}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Benefits</h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {mockSupplement.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Nutritional Information</h2>
                <div className="grid grid-cols-2 gap-2 text-gray-700">
                  <div>Calories: {mockSupplement.nutritionalInfo.calories}</div>
                  <div>Protein: {mockSupplement.nutritionalInfo.protein}g</div>
                  <div>Carbs: {mockSupplement.nutritionalInfo.carbs}g</div>
                  <div>Fat: {mockSupplement.nutritionalInfo.fat}g</div>
                  <div>Sugar: {mockSupplement.nutritionalInfo.sugar}g</div>
                  <div>Sodium: {mockSupplement.nutritionalInfo.sodium}mg</div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Ingredients</h2>
                <ul className="text-gray-700 space-y-1">
                  {mockSupplement.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.name} - {ingredient.amount}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Usage Instructions</h2>
                <p className="text-gray-700">{mockSupplement.usageInstructions}</p>
              </div>

              {mockSupplement.warnings && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Warnings</h2>
                  <p className="text-gray-700">{mockSupplement.warnings}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {mockSupplement.discount > 0 ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">
                          ${(mockSupplement.price * (1 - mockSupplement.discount / 100)).toFixed(2)}
                        </span>
                        <span className="ml-2 text-lg text-gray-500 line-through">
                          ${mockSupplement.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        ${mockSupplement.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-l-md"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b border-gray-300">{quantity}</span>
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-r-md"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            {mockSupplement.reviews.length > 0 ? (
              <div className="space-y-6">
                {mockSupplement.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{review.user}</h3>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 