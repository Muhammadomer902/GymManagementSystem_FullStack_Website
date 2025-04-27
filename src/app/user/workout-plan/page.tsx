"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, Dumbbell, Filter, Plus, Search, ChevronDown, ChevronUp, ArrowRight, X } from "lucide-react"

// Common exercises for quick selection
const commonExercises = [
  { name: "Bench Press", category: "Chest" },
  { name: "Squats", category: "Legs" },
  { name: "Deadlift", category: "Back" },
  { name: "Pull-ups", category: "Back" },
  { name: "Push-ups", category: "Chest" },
  { name: "Shoulder Press", category: "Shoulders" },
  { name: "Bicep Curls", category: "Arms" },
  { name: "Tricep Extensions", category: "Arms" },
  { name: "Leg Press", category: "Legs" },
  { name: "Lunges", category: "Legs" },
  { name: "Lat Pulldown", category: "Back" },
  { name: "Plank", category: "Core" },
  { name: "Crunches", category: "Core" },
  { name: "Russian Twists", category: "Core" },
  { name: "Leg Raises", category: "Core" },
].sort((a, b) => a.name.localeCompare(b.name));

// Organize exercises by category
const exercisesByCategory = commonExercises.reduce((acc, exercise) => {
  if (!acc[exercise.category]) {
    acc[exercise.category] = [];
  }
  acc[exercise.category].push(exercise);
  return acc;
}, {} as Record<string, typeof commonExercises>);

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

interface WorkoutSessionExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: string;
  notes?: string;
}

interface WorkoutSession {
  _id: string;
  title: string;
  date: string;
  duration: number;
  exercises: WorkoutSessionExercise[];
  notes?: string;
  createdAt: string;
}

export default function WorkoutPlanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    level: "all",
    category: "all",
    duration: "all",
  })
  const [isLogModalOpen, setIsLogModalOpen] = useState(false)
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [exercisesToLog, setExercisesToLog] = useState<WorkoutSessionExercise[]>([])
  const [sessionDetails, setSessionDetails] = useState({
    title: "",
    duration: 30,
    notes: ""
  })
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)

  useEffect(() => {
    fetchWorkoutSessions()
  }, [])

  const fetchWorkoutSessions = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/workout-sessions')
      if (res.ok) {
        const data = await res.json()
        setWorkoutSessions(data.workoutSessions)
      }
    } catch (err) {
      console.error("Error fetching workout sessions:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const togglePlanDetails = (id: number) => {
    setSelectedPlan(selectedPlan === id ? null : id)
  }

  const toggleSessionDetails = (id: string) => {
    setActiveSessionId(activeSessionId === id ? null : id)
  }

  const openLogModal = () => {
    setIsLogModalOpen(true)
    setExercisesToLog([])
    setSessionDetails({
      title: "",
      duration: 30,
      notes: ""
    })
  }

  const closeLogModal = () => {
    setIsLogModalOpen(false)
  }

  const addExercise = (name: string) => {
    setExercisesToLog([
      ...exercisesToLog,
      {
        name,
        sets: 3,
        reps: 10,
        weight: 0
      }
    ])
  }

  const updateExercise = (index: number, field: string, value: string | number) => {
    const updatedExercises = [...exercisesToLog]
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value
    }
    setExercisesToLog(updatedExercises)
  }

  const removeExercise = (index: number) => {
    setExercisesToLog(exercisesToLog.filter((_, i) => i !== index))
  }

  const handleSessionDetailChange = (field: string, value: string | number) => {
    setSessionDetails({
      ...sessionDetails,
      [field]: value
    })
  }

  const saveWorkoutSession = async () => {
    if (!sessionDetails.title || exercisesToLog.length === 0) {
      alert("Please add a title and at least one exercise")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/workout-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: sessionDetails.title,
          duration: sessionDetails.duration,
          exercises: exercisesToLog,
          notes: sessionDetails.notes
        })
      })

      if (res.ok) {
        await fetchWorkoutSessions()
        closeLogModal()
      } else {
        alert("Failed to save workout session")
      }
    } catch (err) {
      console.error("Error saving workout session:", err)
      alert("Error saving workout session")
    } finally {
      setIsLoading(false)
    }
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
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button
              onClick={openLogModal}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Log Workout
            </button>
            <Link
              href="/user/get-trainer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Request New Plan
            </Link>
          </div>
        </div>

        {/* Log Workout Modal */}
        {isLogModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Log Workout Session</h2>
                  <button onClick={closeLogModal} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Title
                  </label>
                  <input
                    type="text"
                    value={sessionDetails.title}
                    onChange={(e) => handleSessionDetailChange("title", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Morning Leg Day"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={sessionDetails.duration}
                    onChange={(e) => handleSessionDetailChange("duration", parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (optional)
                  </label>
                  <textarea
                    value={sessionDetails.notes}
                    onChange={(e) => handleSessionDetailChange("notes", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                    placeholder="How did the workout feel? Any achievements?"
                  />
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900">Exercises</h3>
                    <div className="relative">
                      <select
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-8"
                        onChange={(e) => e.target.value && addExercise(e.target.value)}
                        value=""
                      >
                        <option value="">Add exercise...</option>
                        {Object.keys(exercisesByCategory).map((category) => (
                          <optgroup key={category} label={category}>
                            {exercisesByCategory[category].map((exercise) => (
                              <option key={exercise.name} value={exercise.name}>
                                {exercise.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  </div>

                  {exercisesToLog.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No exercises added yet. Select exercises from the dropdown above.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {exercisesToLog.map((exercise, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{exercise.name}</h4>
                            <button
                              onClick={() => removeExercise(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm text-gray-700 mb-1">Sets</label>
                              <input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) => updateExercise(index, "sets", parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                min="1"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-700 mb-1">Reps</label>
                              <input
                                type="number"
                                value={exercise.reps}
                                onChange={(e) => updateExercise(index, "reps", parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                min="1"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-700 mb-1">Weight (kg)</label>
                              <input
                                type="number"
                                value={exercise.weight || 0}
                                onChange={(e) => updateExercise(index, "weight", parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                                step="0.5"
                              />
                            </div>
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-700 mb-1">Notes (optional)</label>
                            <input
                              type="text"
                              value={exercise.notes || ""}
                              onChange={(e) => updateExercise(index, "notes", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Increased weight from last time"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeLogModal}
                    className="px-4 py-2 border border-gray-300 rounded-md mr-2 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveWorkoutSession}
                    disabled={isLoading || exercisesToLog.length === 0 || !sessionDetails.title}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : "Save Workout"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workout History Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Workout Sessions</h2>
          
          {isLoading ? (
            <div className="text-center py-8">Loading workout history...</div>
          ) : workoutSessions.length > 0 ? (
            <div className="space-y-4">
              {workoutSessions.map((session) => (
                <div key={session._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{session.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(session.date).toLocaleDateString()} • {session.duration} minutes
                        </p>
                      </div>
                      <button
                        onClick={() => toggleSessionDetails(session._id)}
                        className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                      >
                        {activeSessionId === session._id ? "Hide Details" : "View Details"}
                        {activeSessionId === session._id ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </div>
                    
                    {activeSessionId === session._id && (
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <h4 className="font-medium text-gray-700 mb-2">Exercises:</h4>
                        <div className="space-y-3">
                          {session.exercises.map((exercise, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-md">
                              <h5 className="font-medium text-gray-800">{exercise.name}</h5>
                              <div className="mt-1 text-sm text-gray-600">
                                <span>{exercise.sets} sets × {exercise.reps} reps</span>
                                {exercise.weight ? ` × ${exercise.weight} kg` : ""}
                                {exercise.notes && (
                                  <p className="mt-1 italic">{exercise.notes}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {session.notes && (
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-700 mb-1">Session Notes:</h4>
                            <p className="text-gray-600">{session.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workout sessions logged yet</h3>
              <p className="text-gray-600 mb-6">
                Start tracking your workouts to monitor your progress over time.
              </p>
              <button
                onClick={openLogModal}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Log Your First Workout
              </button>
            </div>
          )}
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Workout Plans</h2>
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

