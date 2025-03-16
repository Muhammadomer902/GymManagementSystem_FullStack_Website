"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Dumbbell, Filter, Plus, Search, ChevronDown, ChevronUp, ArrowRight } from "lucide-react"

// Mock data for workout plans
const workoutPlans = [
  {
    id: 1,
    name: "Beginner Full Body",
    description: "A comprehensive full body workout for beginners focusing on building strength and endurance.",
    level: "Beginner",
    duration: "45 min",
    frequency: "3x per week",
    category: "Strength",
    trainer: "Sarah Williams",
    image: "/placeholder.svg?height=300&width=500&text=Full+Body+Workout",
    progress: 40,
    exercises: [
      { name: "Squats", sets: 3, reps: 12, rest: "60 sec" },
      { name: "Push-ups", sets: 3, reps: 10, rest: "60 sec" },
      { name: "Lunges", sets: 3, reps: 10, rest: "60 sec" },
      { name: "Plank", sets: 3, duration: "30 sec", rest: "45 sec" },
      { name: "Dumbbell Rows", sets: 3, reps: 12, rest: "60 sec" },
    ],
  },
  {
    id: 2,
    name: "Cardio Blast",
    description: "High-intensity cardio workout designed to burn calories and improve cardiovascular health.",
    level: "Intermediate",
    duration: "30 min",
    frequency: "4x per week",
    category: "Cardio",
    trainer: "Michael Chen",
    image: "/placeholder.svg?height=300&width=500&text=Cardio+Blast",
    progress: 75,
    exercises: [
      { name: "Jumping Jacks", sets: 3, duration: "45 sec", rest: "15 sec" },
      { name: "High Knees", sets: 3, duration: "45 sec", rest: "15 sec" },
      { name: "Burpees", sets: 3, duration: "30 sec", rest: "30 sec" },
      { name: "Mountain Climbers", sets: 3, duration: "45 sec", rest: "15 sec" },
      { name: "Jump Rope", sets: 3, duration: "60 sec", rest: "30 sec" },
    ],
  },
  {
    id: 3,
    name: "Core Strength",
    description: "Focus on building a strong core with exercises targeting abs, obliques, and lower back.",
    level: "All Levels",
    duration: "20 min",
    frequency: "3x per week",
    category: "Strength",
    trainer: "Alex Johnson",
    image: "/placeholder.svg?height=300&width=500&text=Core+Strength",
    progress: 20,
    exercises: [
      { name: "Crunches", sets: 3, reps: 15, rest: "30 sec" },
      { name: "Russian Twists", sets: 3, reps: 20, rest: "30 sec" },
      { name: "Leg Raises", sets: 3, reps: 12, rest: "45 sec" },
      { name: "Plank", sets: 3, duration: "45 sec", rest: "30 sec" },
      { name: "Side Planks", sets: 3, duration: "30 sec", rest: "30 sec" },
    ],
  },
]

export default function WorkoutPlanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    level: "all",
    category: "all",
    duration: "all",
  })

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const togglePlanDetails = (id: number) => {
    setSelectedPlan(selectedPlan === id ? null : id)
  }

  const filteredPlans = workoutPlans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLevel = filters.level === "all" || plan.level.toLowerCase() === filters.level.toLowerCase()
    const matchesCategory = filters.category === "all" || plan.category.toLowerCase() === filters.category.toLowerCase()
    const matchesDuration =
      filters.duration === "all" ||
      (filters.duration === "short" && Number.parseInt(plan.duration) <= 30) ||
      (filters.duration === "medium" && Number.parseInt(plan.duration) > 30 && Number.parseInt(plan.duration) <= 45) ||
      (filters.duration === "long" && Number.parseInt(plan.duration) > 45)

    return matchesSearch && matchesLevel && matchesCategory && matchesDuration
  })

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Workout Plans</h1>
            <p className="mt-1 text-gray-600">Track and manage your personalized workout routines</p>
          </div>
          <Link
            href="/user/get-trainer"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Request New Plan
          </Link>
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
                placeholder="Search workout plans..."
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
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="level-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  id="level-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.level}
                  onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="all">All Categories</option>
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="hiit">HIIT</option>
                </select>
              </div>
              <div>
                <label htmlFor="duration-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <select
                  id="duration-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.duration}
                  onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                >
                  <option value="all">Any Duration</option>
                  <option value="short">Short (≤ 30 min)</option>
                  <option value="medium">Medium (31-45 min)</option>
                  <option value="long">Long ({">"}45 min)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Workout Plans */}
        {filteredPlans.length > 0 ? (
          <div className="space-y-6">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="md:flex-1">
                      <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                      <p className="mt-1 text-gray-600">{plan.description}</p>

                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Dumbbell className="h-5 w-5 text-blue-600 mr-1" />
                          <span>{plan.category}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-5 w-5 text-blue-600 mr-1" />
                          <span>{plan.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-5 w-5 text-blue-600 mr-1" />
                          <span>{plan.frequency}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-medium text-gray-700">{plan.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${plan.progress}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center">
                      <button
                        onClick={() => togglePlanDetails(plan.id)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                        suppressHydrationWarning
                      >
                        {selectedPlan === plan.id ? "Hide Details" : "View Details"}
                        {selectedPlan === plan.id ? (
                          <ChevronUp className="ml-2 h-5 w-5" />
                        ) : (
                          <ChevronDown className="ml-2 h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedPlan === plan.id && (
                  <div className="border-t border-gray-200 px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Workout Details</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-700">Level</h4>
                            <p>{plan.level}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700">Trainer</h4>
                            <p>{plan.trainer}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700">Recommended Schedule</h4>
                            <p>{plan.frequency}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Exercises</h3>
                        <div className="space-y-3">
                          {plan.exercises.map((exercise, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-md">
                              <h4 className="font-medium text-gray-800">{exercise.name}</h4>
                              <div className="mt-1 text-sm text-gray-600">
                                <span>{exercise.sets} sets × </span>
                                {exercise.reps ? <span>{exercise.reps} reps</span> : <span>{exercise.duration}</span>}
                                <span> • Rest: {exercise.rest}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => (window.location.href = `/user/workout-plan/${plan.id}`)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        suppressHydrationWarning
                      >
                        Start Workout
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workout plans found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.level !== "all" || filters.category !== "all" || filters.duration !== "all"
                ? "Try adjusting your search or filters to find workout plans."
                : "You don't have any workout plans yet."}
            </p>
            <Link
              href="/user/get-trainer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Request New Plan
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

