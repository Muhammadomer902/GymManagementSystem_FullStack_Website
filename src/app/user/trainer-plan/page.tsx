"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, Dumbbell, Star, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Loader } from "lucide-react"

// Define interfaces for our data
interface TrainerPlan {
  id: number;
  name: string;
  description: string;
  duration: string;
  sessionsPerWeek: number;
  level: string;
  price: string;
  category: string;
  image: string;
}

interface TrainerReview {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

interface ApiTrainer {
  id: string;
  name: string;
  email: string;
  specialty: string;
  experience: string;
  bio: string;
  certifications: string[];
  education: string;
  availableHours: string;
  image: string;
}

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  image: string;
  plans: TrainerPlan[];
  reviews: TrainerReview[];
  experience?: string;
  bio?: string;
  certifications?: string[];
  education?: string;
  planCount: number;
}

export default function TrainerPlanPage() {
  const searchParams = useSearchParams()
  const trainerId = searchParams?.get("trainerId") || null
  const router = useRouter()

  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)
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

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Generate a consistent color based on the trainer name
  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-red-500', 'bg-yellow-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-teal-500'
    ];
    
    // Simple hash function to pick a color
    const hash = name.split('').reduce(
      (acc, char) => acc + char.charCodeAt(0), 0
    );
    
    return colors[hash % colors.length];
  };

  // Make the specialty colors more visible by using stronger color values
  const getCardBackgroundColor = (specialty: string) => {
    // Extract the first specialty if there are multiple
    const mainSpecialty = specialty.split(',')[0].trim().toLowerCase();
    
    // Map of specialties to background colors - using stronger colors
    const specialtyColors: Record<string, string> = {
      'strength': 'bg-blue-100',
      'weight loss': 'bg-green-100',
      'cardio': 'bg-orange-100',
      'yoga': 'bg-purple-100',
      'nutrition': 'bg-yellow-100',
      'hiit': 'bg-red-100',
      'crossfit': 'bg-indigo-100',
      'pilates': 'bg-pink-100',
      'bodybuilding': 'bg-cyan-100',
      'functional': 'bg-teal-100',
      'rehabilitation': 'bg-amber-100',
      'flexibility': 'bg-lime-100',
      'general': 'bg-slate-100',
      'personal': 'bg-sky-100'
    };
    
    // Find a matching specialty or use a default
    for (const [key, value] of Object.entries(specialtyColors)) {
      if (mainSpecialty.includes(key)) {
        return value;
      }
    }
    
    // Default background if no match
    return 'bg-slate-100';
  };

  // Fetch trainers from the API
  useEffect(() => {
    const fetchTrainersWithWorkoutPlans = async () => {
      try {
        setLoading(true)
        
        // Fetch trainers from the API
        const trainersResponse = await fetch('/api/trainers')
        if (!trainersResponse.ok) {
          throw new Error('Failed to fetch trainers')
        }
        
        const trainersData = await trainersResponse.json()
        
        // Fetch workout plans for each trainer
        const trainersWithPlanCounts = await Promise.all(
          trainersData.trainers.map(async (trainer: ApiTrainer) => {
            try {
              // Get workout plans for this trainer
              const plansResponse = await fetch(`/api/workout-plans?trainerId=${trainer.id}`)
              
              if (!plansResponse.ok) {
                console.error(`Failed to fetch plans for trainer ${trainer.id}`)
                return {
                  ...trainer,
                  planCount: 0
                }
              }
              
              const plans = await plansResponse.json()
              // Get actual count of plans from the API response
              const planCount = Array.isArray(plans) ? plans.length : 0
              
              return {
                ...trainer,
                planCount
              }
            } catch (error) {
              console.error(`Error fetching plans for trainer ${trainer.id}:`, error)
              return {
                ...trainer,
                planCount: 0
              }
            }
          })
        )
        
        // Transform the API data to match our component's expected format
        const transformedTrainers = trainersWithPlanCounts.map((trainer: ApiTrainer & { planCount: number }) => {
          // Generate some mock plans and reviews for each trainer
          // In a real app, these would come from the API too
          const plans = [
            {
              id: Math.floor(Math.random() * 1000) + 100,
              name: `${trainer.specialty?.split(',')[0] || 'Fitness'} Program`,
              description: `A comprehensive program designed by ${trainer.name} focusing on ${trainer.specialty || 'general fitness'}.`,
              duration: `${Math.floor(Math.random() * 8) + 4} weeks`,
              sessionsPerWeek: Math.floor(Math.random() * 3) + 2,
              level: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
              price: `$${(Math.floor(Math.random() * 20) + 40) * 10} ($${Math.floor(Math.random() * 20) + 40}/session)`,
              category: trainer.specialty?.split(',')[0] || 'General',
              image: "/placeholder.svg?height=300&width=500&text=Fitness+Program",
            },
            {
              id: Math.floor(Math.random() * 1000) + 200,
              name: `${trainer.specialty?.split(',')[1] || 'Customized'} Training`,
              description: `Personalized training sessions with ${trainer.name} tailored to your specific goals and needs.`,
              duration: `${Math.floor(Math.random() * 12) + 4} weeks`,
              sessionsPerWeek: Math.floor(Math.random() * 2) + 1,
              level: "All Levels",
              price: `$${(Math.floor(Math.random() * 30) + 30) * 10} ($${Math.floor(Math.random() * 30) + 30}/session)`,
              category: trainer.specialty?.split(',')[1] || 'Personalized',
              image: "/placeholder.svg?height=300&width=500&text=Custom+Training",
            },
          ];
          
          // Generate mock reviews
          const reviews = [
            {
              id: Math.floor(Math.random() * 1000) + 1000,
              user: ["John D.", "Sarah M.", "Michael L.", "Emma W.", "Robert K."][Math.floor(Math.random() * 5)],
              rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 star ratings
              date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              comment: `${trainer.name} is an excellent trainer! The ${plans[0].name} program was exactly what I needed.`,
            },
            {
              id: Math.floor(Math.random() * 1000) + 2000,
              user: ["Alex P.", "Jessica T.", "David H.", "Lisa N.", "Chris B."][Math.floor(Math.random() * 5)],
              rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 star ratings
              date: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              comment: `Great experience working with ${trainer.name}. Very knowledgeable and motivating.`,
            },
          ];
          
          return {
            id: trainer.id,
            name: trainer.name,
            specialty: trainer.specialty || "General Fitness",
            image: trainer.image || `/placeholder.svg?height=400&width=400&text=${trainer.name.split(' ')[0]}`,
            experience: trainer.experience || `${Math.floor(Math.random() * 10) + 1} years`,
            bio: trainer.bio || `Professional fitness trainer specializing in ${trainer.specialty || 'various training methods'}.`,
            certifications: trainer.certifications || ["Certified Personal Trainer", "Nutrition Specialist"],
            education: trainer.education || "Bachelor's in Kinesiology",
            plans,
            reviews,
            planCount: trainer.planCount
          };
        });
        
        setTrainers(transformedTrainers)
        console.log("Fetched trainers with plan counts:", transformedTrainers)
        
        // If trainerId is provided in the URL, select that trainer
        if (trainerId) {
          const trainer = transformedTrainers.find((t: Trainer) => t.id === trainerId);
          if (trainer) {
            setSelectedTrainer(trainer);
          } else {
            // Redirect to the trainers list if the trainer isn't found
            router.push('/user/trainer-plan');
          }
        }
        
      } catch (error) {
        console.error("Error fetching trainers:", error)
        setError("Failed to load trainers. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrainersWithWorkoutPlans()
  }, [trainerId, router])

  useEffect(() => {
    if (trainerId) {
      // Redirect to the new single trainer page route
      router.push(`/user/trainer-plan/${trainerId}`)
    }
  }, [trainerId, router])

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

  // Display loading state
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900">Loading trainers...</h2>
          </div>
        </div>
      </div>
    )
  }

  // Display error state
  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-medium text-red-600 mb-2">Error Loading Trainers</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedTrainer ? (
          <>
            {/* Trainer Info */}
            <div className={`${getCardBackgroundColor(selectedTrainer.specialty)} rounded-lg shadow-sm overflow-hidden mb-8`}>
              <div className="p-6">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <div className="h-48 w-48 rounded-lg overflow-hidden relative flex items-center justify-center text-white text-4xl font-bold"
                         style={{ backgroundColor: getBackgroundColor(selectedTrainer.name) }}>
                      {getInitials(selectedTrainer.name)}
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
                          {selectedTrainer.reviews.reduce((acc: number, review: TrainerReview) => acc + review.rating, 0) /
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
                  {selectedTrainer.plans.map((plan: TrainerPlan) => (
                    <div key={plan.id} className={`${getCardBackgroundColor(plan.category)} rounded-lg shadow-sm overflow-hidden`}>
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
                        <div className="border-t border-gray-200 px-6 py-4 bg-white">
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
                <div className="bg-gray-100 rounded-lg shadow-sm p-8 text-center">
                  <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No training plans available</h3>
                  <p className="text-gray-600 mb-6">
                    This trainer hasn&apos;t published any training plans yet. You can still request custom training.
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
                  {selectedTrainer.reviews.map((review: TrainerReview) => (
                    <div key={review.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-400">
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
                <div className="bg-gray-100 rounded-lg shadow-sm p-8 text-center">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-6">
                    Be the first to review {selectedTrainer.name}&apos;s training services.
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
                  <div key={trainer.id} className={`${getCardBackgroundColor(trainer.specialty)} rounded-lg shadow-sm overflow-hidden`}>
                    <div className="p-6">
                      <div className="md:flex">
                        <div className="md:flex-shrink-0">
                          <div className="h-32 w-32 rounded-lg overflow-hidden relative flex items-center justify-center text-white text-2xl font-bold"
                               style={{ backgroundColor: getBackgroundColor(trainer.name) }}>
                            {getInitials(trainer.name)}
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
                                {trainer.reviews.reduce((acc: number, review: TrainerReview) => acc + review.rating, 0) /
                                  trainer.reviews.length}
                              </span>
                              <span className="ml-1 text-gray-500">({trainer.reviews.length} reviews)</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="text-gray-700">{trainer.planCount} workout {trainer.planCount === 1 ? 'plan' : 'plans'} available</p>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <Link
                              href={`/user/trainer-plan/${trainer.id}`}
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
              <div className="bg-gray-100 rounded-lg shadow-sm p-8 text-center">
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

