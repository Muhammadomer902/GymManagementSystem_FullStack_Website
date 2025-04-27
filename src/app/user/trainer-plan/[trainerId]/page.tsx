"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Dumbbell, Star, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, ShoppingCart } from "lucide-react"

// Mock data for trainers
const trainers = [
  {
    id: 1,
    name: "Alex Johnson",
    specialty: "Strength & Conditioning",
    experience: "10+ years",
    rating: 4.9,
    reviews: 124,
    location: "Main Branch",
    availability: "Mon, Wed, Fri",
    image: "/placeholder.svg?height=400&width=400&text=Alex",
    certifications: ["CSCS", "NASM-CPT", "CrossFit L3"],
    bio: "Alex specializes in strength training and athletic performance. With over 10 years of experience, he has helped clients of all levels achieve their fitness goals through personalized training programs.",
    price: "$60/session",
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
    reviewsList: [
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
    experience: "8 years",
    rating: 4.8,
    reviews: 98,
    location: "Downtown Branch",
    availability: "Tue, Thu, Sat",
    image: "/placeholder.svg?height=400&width=400&text=Sarah",
    certifications: ["NASM-CPT", "Precision Nutrition", "ACE"],
    bio: "Sarah combines effective workout routines with personalized nutrition plans to help clients achieve sustainable weight loss and improved health. Her holistic approach focuses on lifestyle changes rather than quick fixes.",
    price: "$55/session",
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
    reviewsList: [
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

// Define interfaces for better type safety
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface WorkoutPlan {
  _id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  schedule: string;
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
}

// Define a type for the trainer
interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  reviewsList: Review[];
  location: string;
  availability: string;
  image: string;
  certifications: string[];
  bio: string;
  price: string;
}

export default function SingleTrainerPlanPage() {
  const params = useParams() || {}
  const router = useRouter()
  const trainerId = params.trainerId as string

  const [trainer, setTrainer] = useState<Trainer | null>(null)
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([])
  const [loadingPlans, setLoadingPlans] = useState(true)
  const [buyingPlan, setBuyingPlan] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [reviewFormData, setReviewFormData] = useState<{
    rating: number
    comment: string
  }>({
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
      const foundTrainer = trainers.find((t) => t.id === Number.parseInt(trainerId))
      if (foundTrainer) {
        setTrainer(foundTrainer)
        // Fetch real workout plans for this trainer
        fetchTrainerWorkoutPlans(trainerId)
      } else {
        // Redirect to trainers list if trainer not found
        router.push("/user/get-trainer")
      }
    }
  }, [trainerId, router])

  const fetchTrainerWorkoutPlans = async (trainerId: string) => {
    setLoadingPlans(true)
    try {
      console.log('Fetching workout plans with real trainer ID:', trainerId);
      
      // Convert to MongoDB ObjectId format if it's not already (if needed)
      const mongoIdTrainerId = isNaN(Number(trainerId)) ? trainerId : trainerId;
      
      const response = await fetch(`/api/workout-plans?trainerId=${mongoIdTrainerId}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch workout plans:', response.status, errorText);
        throw new Error(`Failed to fetch workout plans: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      console.log('Workout plans received:', data);
      setWorkoutPlans(data);
      
      // Force display for testing (remove this later)
      if (data.length === 0) {
        const tempWorkoutPlan: WorkoutPlan = {
          _id: "test123",
          title: "Temporary Test Plan",
          description: "This is a temporary plan for testing",
          level: "Beginner",
          duration: 30,
          schedule: "3x per week",
          exercises: [
            { name: "Push-ups", sets: 3, reps: "10", rest: "60 sec" },
            { name: "Squats", sets: 3, reps: "15", rest: "60 sec" }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setWorkoutPlans([tempWorkoutPlan]);
      }
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      setError('Failed to load workout plans');
    } finally {
      setLoadingPlans(false);
    }
  }

  const togglePlanDetails = (id: string) => {
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

  const handleBuyPlan = async (planId: string) => {
    setBuyingPlan(planId)
    try {
      // In a real app, you would implement actual payment processing
      // For now, just simulate a purchase
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert(`You have successfully purchased this workout plan!`)
    } catch (err: unknown) {
      console.error('Purchase error:', err)
      alert('Failed to process your purchase. Please try again.')
    } finally {
      setBuyingPlan(null)
    }
  }

  if (!trainer) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trainer profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/user/get-trainer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Trainers
          </Link>
        </div>

        {/* Trainer Info */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <div className="h-48 w-48 rounded-lg overflow-hidden relative">
                  <Image src={trainer.image || "/placeholder.svg"} alt={trainer.name} fill className="object-cover" />
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{trainer.name}</h1>
                    <p className="text-blue-600 font-medium">{trainer.specialty}</p>
                  </div>
                  <div className="flex items-center mt-1 md:mt-0">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="ml-1 text-gray-900 font-medium">{trainer.rating}</span>
                    <span className="ml-1 text-gray-500">({trainer.reviewsList.length} reviews)</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    <span>{trainer.experience}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{trainer.location}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Price:</span> {trainer.price}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {trainer.certifications.map((cert: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {cert}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  <span className="font-medium">Available:</span> {trainer.availability}
                </div>

                <div className="mt-6">
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

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {trainer.name}</h2>
            <p className="text-gray-700">{trainer.bio}</p>
          </div>
        </div>

        {/* Training Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Workout Plans</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loadingPlans ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading workout plans...</p>
            </div>
          ) : workoutPlans.length > 0 ? (
            <div className="space-y-6">
              {workoutPlans.map((plan) => (
                <div key={plan._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="md:flex">
                      <div className="md:flex-shrink-0">
                        <div className="h-48 w-full md:w-64 rounded-lg overflow-hidden relative bg-blue-100">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Dumbbell className="h-16 w-16 text-blue-500" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                        <p className="mt-1 text-gray-600">{plan.description}</p>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-5 w-5 text-blue-600 mr-1" />
                            <span>{plan.duration} minutes</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-5 w-5 text-blue-600 mr-1" />
                            <span>{plan.schedule}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Dumbbell className="h-5 w-5 text-blue-600 mr-1" />
                            <span>{plan.level}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between">
                          <p className="text-lg font-bold text-gray-900">$49.99</p>
                          <div className="mt-2 md:mt-0 flex space-x-3">
                            <button
                              onClick={() => togglePlanDetails(plan._id)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                              suppressHydrationWarning
                            >
                              {expandedPlan === plan._id ? "Less Info" : "More Info"}
                              {expandedPlan === plan._id ? (
                                <ChevronUp className="ml-1 h-4 w-4" />
                              ) : (
                                <ChevronDown className="ml-1 h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleBuyPlan(plan._id)}
                              disabled={buyingPlan === plan._id}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-green-600 text-white hover:bg-green-700 text-sm"
                              suppressHydrationWarning
                            >
                              {buyingPlan === plan._id ? (
                                <>Processing...</>
                              ) : (
                                <>
                                  <ShoppingCart className="mr-1 h-4 w-4" />
                                  Buy Plan
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Plan Details */}
                  {expandedPlan === plan._id && (
                    <div className="border-t border-gray-200 px-6 py-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Plan Details</h4>
                      
                      <h5 className="font-medium text-gray-800 mt-4 mb-2">Exercises:</h5>
                      <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2">
                        {plan.exercises.map((exercise, index) => (
                          <li key={index}>
                            <span className="font-medium">{exercise.name}</span>: {exercise.sets} sets × {exercise.reps}, 
                            rest: {exercise.rest}
                            {exercise.notes && <span className="text-sm text-gray-500 ml-2">({exercise.notes})</span>}
                          </li>
                        ))}
                      </ul>
                      
                      <p className="text-gray-700">
                        Contact {trainer.name} for more information about this plan or to discuss customization options.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workout plans available</h3>
              <p className="text-gray-600 mb-6">
                This trainer hasn&apos;t published any workout plans yet. You can still request custom training.
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              suppressHydrationWarning
            >
              Write a Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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

          {trainer.reviewsList.length > 0 ? (
            <div className="space-y-6">
              {trainer.reviewsList.map((review: Review) => (
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
              <p className="text-gray-600 mb-6">Be the first to review {trainer.name}&apos;s training services.</p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Write a Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

