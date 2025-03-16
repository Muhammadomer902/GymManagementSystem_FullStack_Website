"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Dumbbell, Star, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from "lucide-react"

// Mock data for trainers
const trainers = [
  {
    id: 1,
    name: "Alex Johnson",
    specialty: "Strength & Conditioning",
    image: "/placeholder.svg?height=400&width=400&text=Alex",
    plans: [
      {
        id: 101,
        name: "Strength Builder",
        description: "A comprehensive program designed to build strength and muscle mass through progressive overload.",
        duration: "8 weeks",
        sessionsPerWeek: 4,
        level: "Intermediate",
        price: "$480 ($60/session)",
        category: "Strength",
        image: "/placeholder.svg?height=300&width=500&text=Strength+Builder",
      },
      {
        id: 102,
        name: "Athletic Performance",
        description:
          "Enhance your athletic abilities with this sport-specific training program focusing on power, agility, and speed.",
        duration: "12 weeks",
        sessionsPerWeek: 3,
        level: "Advanced",
        price: "$720 ($60/session)",
        category: "Performance",
        image: "/placeholder.svg?height=300&width=500&text=Athletic+Performance",
      },
    ],
    reviews: [
      {
        id: 1001,
        user: "John D.",
        rating: 5,
        date: "2023-10-15",
        comment:
          "Alex is an amazing trainer! I've gained 10 pounds of muscle and lost 15 pounds of fat in just 3 months.",
      },
      {
        id: 1002,
        user: "Sarah M.",
        rating: 4,
        date: "2023-09-22",
        comment:
          "Great knowledge and very motivating. The only reason I'm not giving 5 stars is because sometimes sessions run a bit late.",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Martinez",
    specialty: "Weight Loss & Nutrition",
    image: "/placeholder.svg?height=400&width=400&text=Sarah",
    plans: [
      {
        id: 201,
        name: "Weight Loss Kickstart",
        description:
          "Jump-start your weight loss journey with this comprehensive program combining effective workouts and nutrition guidance.",
        duration: "6 weeks",
        sessionsPerWeek: 3,
        level: "Beginner to Intermediate",
        price: "$330 ($55/session)",
        category: "Weight Loss",
        image: "/placeholder.svg?height=300&width=500&text=Weight+Loss+Kickstart",
      },
      {
        id: 202,
        name: "Nutrition Makeover",
        description: "Transform your relationship with food through personalized nutrition coaching and meal planning.",
        duration: "4 weeks",
        sessionsPerWeek: 1,
        level: "All Levels",
        price: "$220 ($55/session)",
        category: "Nutrition",
        image: "/placeholder.svg?height=300&width=500&text=Nutrition+Makeover",
      },
    ],
    reviews: [
      {
        id: 2001,
        user: "Michael T.",
        rating: 5,
        date: "2023-11-05",
        comment: "Sarah's nutrition advice changed my life! I've lost 25 pounds and feel better than ever.",
      },
      {
        id: 2002,
        user: "Emily R.",
        rating: 5,
        date: "2023-10-18",
        comment:
          "The Weight Loss Kickstart program was exactly what I needed. Sarah is knowledgeable, supportive, and keeps you accountable.",
      },
    ],
  },
]

export default function TrainerPlanPage() {
  const searchParams = useSearchParams()
  const trainerId = searchParams.get("trainerId")

  const [selectedTrainer, setSelectedTrainer] = useState<any>(null)
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewFormData, setReviewFormData] = useState({
    rating: 5,
    comment: "",
  })
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestFormData, setRequestFormData] = useState<{
    message: string
    preferredDays: string[]
    preferredTime: string
  }>({
    message: "",
    preferredDays: [],
    preferredTime: "",
  })

  useEffect(() => {
    if (trainerId) {
      const trainer = trainers.find((t) => t.id === Number.parseInt(trainerId))
      if (trainer) {
        setSelectedTrainer(trainer)
      }
    }
  }, [trainerId])

  const togglePlanDetails = (id: number) => {
    setExpandedPlan(expandedPlan === id ? null : id)
  }

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReviewFormData({
      ...reviewFormData,
      [name]: value,
    })
  }

  const handleRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setRequestFormData({
      ...requestFormData,
      [name]: value,
    })
  }

  const handleDayChange = (day: string) => {
    const currentDays = [...requestFormData.preferredDays]
    if (currentDays.includes(day)) {
      setRequestFormData({
        ...requestFormData,
        preferredDays: currentDays.filter((d) => d !== day),
      })
    } else {
      setRequestFormData({
        ...requestFormData,
        preferredDays: [...currentDays, day],
      })
    }
  }

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    alert("Thank you for your review!")
    setReviewFormData({ rating: 5, comment: "" })
    setShowReviewForm(false)
  }

  const submitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    alert("Your request has been sent to the trainer!")
    setRequestFormData({ message: "", preferredDays: [], preferredTime: "" })
    setShowRequestForm(false)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedTrainer ? (
          <>
            {/* Trainer Info */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <div className="h-48 w-48 rounded-lg overflow-hidden relative">
                      <Image
                        src={selectedTrainer.image || "/placeholder.svg"}
                        alt={selectedTrainer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                    <div className="flex flex-wrap justify-between items-start">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">{selectedTrainer.name}</h1>
                        <p className="text-blue-600 font-medium">{selectedTrainer.specialty}</p>
                      </div>
                      <div className="flex items-center mt-1 md:mt-0">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="ml-1 text-gray-900 font-medium">
                          {selectedTrainer.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) /
                            selectedTrainer.reviews.length}
                        </span>
                        <span className="ml-1 text-gray-500">({selectedTrainer.reviews.length} reviews)</span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                          suppressHydrationWarning
                        >
                          Write a Review
                        </button>
                        <button
                          onClick={() => setShowRequestForm(!showRequestForm)}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
                          suppressHydrationWarning
                        >
                          Request Training
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
                  <form onSubmit={submitReview}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                            className="p-1 focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${reviewFormData.rating >= star ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Review
                      </label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Share your experience with this trainer..."
                        value={reviewFormData.comment}
                        onChange={handleReviewChange}
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Request Form */}
              {showRequestForm && (
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Request Training</h3>
                  <form onSubmit={submitRequest}>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message to Trainer
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Describe your fitness goals and what you're looking for..."
                        value={requestFormData.message}
                        onChange={handleRequestChange}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Days</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                          <div key={day} className="flex items-center">
                            <input
                              id={`day-${day}`}
                              name="preferredDays"
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              checked={requestFormData.preferredDays.includes(day)}
                              onChange={() => handleDayChange(day)}
                            />
                            <label htmlFor={`day-${day}`} className="ml-2 block text-sm text-gray-700">
                              {day}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Time
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={requestFormData.preferredTime}
                        onChange={handleRequestChange}
                        required
                      >
                        <option value="">Select a time</option>
                        <option value="morning">Morning (6AM - 10AM)</option>
                        <option value="midday">Midday (10AM - 2PM)</option>
                        <option value="afternoon">Afternoon (2PM - 6PM)</option>
                        <option value="evening">Evening (6PM - 10PM)</option>
                      </select>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowRequestForm(false)}
                        className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Send Request
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Training Plans */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Plans</h2>

              {selectedTrainer.plans.length > 0 ? (
                <div className="space-y-6">
                  {selectedTrainer.plans.map((plan: any) => (
                    <div key={plan.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="p-6">
                        <div className="md:flex">
                          <div className="md:flex-shrink-0">
                            <div className="h-48 w-full md:w-64 rounded-lg overflow-hidden relative">
                              <Image
                                src={plan.image || "/placeholder.svg"}
                                alt={plan.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                            <p className="mt-1 text-gray-600">{plan.description}</p>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-5 w-5 text-blue-600 mr-1" />
                                <span>{plan.duration}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-5 w-5 text-blue-600 mr-1" />
                                <span>{plan.sessionsPerWeek}x per week</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Dumbbell className="h-5 w-5 text-blue-600 mr-1" />
                                <span>{plan.level}</span>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between">
                              <p className="text-lg font-bold text-gray-900">{plan.price}</p>
                              <div className="mt-2 md:mt-0 flex space-x-3">
                                <button
                                  onClick={() => togglePlanDetails(plan.id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                                  suppressHydrationWarning
                                >
                                  {expandedPlan === plan.id ? "Less Info" : "More Info"}
                                  {expandedPlan === plan.id ? (
                                    <ChevronUp className="ml-1 h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  onClick={() => setShowRequestForm(true)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                                  suppressHydrationWarning
                                >
                                  Request Plan
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Plan Details */}
                      {expandedPlan === plan.id && (
                        <div className="border-t border-gray-200 px-6 py-4">
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Plan Details</h4>
                          <p className="text-gray-700 mb-4">
                            This is where detailed information about the plan would be displayed, including:
                          </p>
                          <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2">
                            <li>Specific workout types included</li>
                            <li>Equipment needed</li>
                            <li>Expected results</li>
                            <li>Ideal candidates for this plan</li>
                            <li>Any prerequisites or fitness requirements</li>
                          </ul>
                          <p className="text-gray-700">
                            Contact {selectedTrainer.name} for more information about this plan or to discuss
                            customization options.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No training plans available</h3>
                  <p className="text-gray-600 mb-6">
                    This trainer hasn't published any training plans yet. You can still request custom training.
                  </p>
                  <button
                    onClick={() => setShowRequestForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Request Custom Training
                  </button>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

              {selectedTrainer.reviews.length > 0 ? (
                <div className="space-y-6">
                  {selectedTrainer.reviews.map((review: any) => (
                    <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-800 font-medium">{review.user.charAt(0)}</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">{review.user}</h3>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="mt-3 text-gray-700">{review.comment}</p>
                          <div className="mt-4 flex space-x-4">
                            <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Helpful
                            </button>
                            <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              Not Helpful
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-6">
                    Be the first to review {selectedTrainer.name}'s training services.
                  </p>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Training Plans</h1>

            {trainers.length > 0 ? (
              <div className="space-y-8">
                {trainers.map((trainer) => (
                  <div key={trainer.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="md:flex">
                        <div className="md:flex-shrink-0">
                          <div className="h-32 w-32 rounded-lg overflow-hidden relative">
                            <Image
                              src={trainer.image || "/placeholder.svg"}
                              alt={trainer.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                          <div className="flex flex-wrap justify-between items-start">
                            <div>
                              <h2 className="text-xl font-bold text-gray-900">{trainer.name}</h2>
                              <p className="text-blue-600">{trainer.specialty}</p>
                            </div>
                            <div className="flex items-center mt-1 md:mt-0">
                              <Star className="h-5 w-5 text-yellow-500 fill-current" />
                              <span className="ml-1 text-gray-900 font-medium">
                                {trainer.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) /
                                  trainer.reviews.length}
                              </span>
                              <span className="ml-1 text-gray-500">({trainer.reviews.length} reviews)</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="text-gray-700">{trainer.plans.length} training plans available</p>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <Link
                              href={`/user/trainer-plan?trainerId=${trainer.id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                              View Plans
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No trainers available</h3>
                <p className="text-gray-600 mb-6">There are no trainers with training plans available at the moment.</p>
                <Link
                  href="/user/get-trainer"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Find Trainers
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

