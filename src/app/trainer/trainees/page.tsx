"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, ChevronDown, ChevronUp, ChevronRight, Calendar, Clock, Dumbbell } from "lucide-react"

// Mock data for trainees
const trainees = [
  {
    id: 1,
    name: "John Smith",
    image: "/placeholder.svg?height=200&width=200&text=JS",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    startDate: "2023-09-15",
    goals: "Weight loss, Improve cardiovascular health",
    nextSession: "Today, 2:00 PM",
    progress: 65,
    plan: "3x weekly strength training with cardio",
    attendance: "85%",
    notes: "Making good progress on weight loss goals. Needs to focus more on form during squats and deadlifts.",
  },
  {
    id: 2,
    name: "Emily Johnson",
    image: "/placeholder.svg?height=200&width=200&text=EJ",
    email: "emily.johnson@example.com",
    phone: "(555) 234-5678",
    startDate: "2023-10-05",
    goals: "Muscle toning, Increase flexibility",
    nextSession: "Tomorrow, 10:00 AM",
    progress: 40,
    plan: "2x weekly full body workouts with yoga",
    attendance: "90%",
    notes: "Very dedicated and always on time. Has shown significant improvement in upper body strength.",
  },
  {
    id: 3,
    name: "Michael Brown",
    image: "/placeholder.svg?height=200&width=200&text=MB",
    email: "michael.brown@example.com",
    phone: "(555) 345-6789",
    startDate: "2023-08-20",
    goals: "Muscle building, Sports performance",
    nextSession: "Wednesday, 4:00 PM",
    progress: 75,
    plan: "4x weekly split routine focusing on hypertrophy",
    attendance: "75%",
    notes: "Has been inconsistent with attendance lately. Needs to improve nutrition to see better results.",
  },
  {
    id: 4,
    name: "Sarah Davis",
    image: "/placeholder.svg?height=200&width=200&text=SD",
    email: "sarah.davis@example.com",
    phone: "(555) 456-7890",
    startDate: "2023-11-01",
    goals: "Rehabilitation, Core strength",
    nextSession: "Friday, 1:00 PM",
    progress: 25,
    plan: "2x weekly gentle rehabilitation exercises",
    attendance: "100%",
    notes: "Recovering from back injury. Making steady progress but needs to avoid certain movements.",
  },
]

export default function TraineesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedTrainee, setExpandedTrainee] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    progress: "all",
    attendance: "all",
  })
  const [workoutPlans, setWorkoutPlans] = useState<any[]>([])
  const [showWorkoutPlanModal, setShowWorkoutPlanModal] = useState(false)
  const [loadingPlans, setLoadingPlans] = useState(false)
  const [planForm, setPlanForm] = useState({
    title: "",
    description: "",
    trainee: "",
    level: "",
    duration: "",
    schedule: "",
    exercises: [{ name: "", sets: 3, reps: "10", rest: "60 sec", notes: "" }],
  })
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")

  // Fetch workout plans for this trainer
  useEffect(() => {
    if (showWorkoutPlanModal) {
      setLoadingPlans(true)
      fetch("/api/workout-plans")
        .then((res) => res.json())
        .then((data) => {
          setWorkoutPlans(data)
          setLoadingPlans(false)
        })
        .catch(() => setLoadingPlans(false))
    }
  }, [showWorkoutPlanModal, creating])

  const handlePlanFormChange = (e: any) => {
    setPlanForm({ ...planForm, [e.target.name]: e.target.value })
  }

  const handleExerciseChange = (idx: number, field: string, value: string) => {
    const updated = [...planForm.exercises]
    updated[idx][field] = value
    setPlanForm({ ...planForm, exercises: updated })
  }

  const addExercise = () => {
    setPlanForm({ ...planForm, exercises: [...planForm.exercises, { name: "", sets: 3, reps: "10", rest: "60 sec", notes: "" }] })
  }

  const removeExercise = (idx: number) => {
    const updated = [...planForm.exercises]
    updated.splice(idx, 1)
    setPlanForm({ ...planForm, exercises: updated })
  }

  const handleCreatePlan = async (e: any) => {
    e.preventDefault()
    setCreating(true)
    setError("")
    try {
      const res = await fetch("/api/workout-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...planForm,
          duration: Number(planForm.duration),
        }),
      })
      if (!res.ok) throw new Error("Failed to create plan")
      setPlanForm({
        title: "",
        description: "",
        trainee: "",
        level: "",
        duration: "",
        schedule: "",
        exercises: [{ name: "", sets: 3, reps: "10", rest: "60 sec", notes: "" }],
      })
      setCreating(false)
    } catch (err) {
      setError("Failed to create plan")
      setCreating(false)
    }
  }

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleTraineeDetails = (id: number) => {
    setExpandedTrainee(expandedTrainee === id ? null : id)
  }

  const filteredTrainees = trainees.filter((trainee) => {
    const matchesSearch =
      trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.goals.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProgress =
      filters.progress === "all" ||
      (filters.progress === "low" && trainee.progress < 30) ||
      (filters.progress === "medium" && trainee.progress >= 30 && trainee.progress < 70) ||
      (filters.progress === "high" && trainee.progress >= 70)

    const attendanceValue = Number.parseInt(trainee.attendance.replace("%", ""))
    const matchesAttendance =
      filters.attendance === "all" ||
      (filters.attendance === "low" && attendanceValue < 70) ||
      (filters.attendance === "medium" && attendanceValue >= 70 && attendanceValue < 90) ||
      (filters.attendance === "high" && attendanceValue >= 90)

    return matchesSearch && matchesProgress && matchesAttendance
  })

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Trainees</h1>
            <p className="mt-1 text-gray-600">Manage and track your clients' progress</p>
          </div>
          <Link
            href="/trainer/workout-plans"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
          >
            Manage Workout Plans
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
                placeholder="Search trainees..."
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
                <label htmlFor="progress-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Progress
                </label>
                <select
                  id="progress-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.progress}
                  onChange={(e) => setFilters({ ...filters, progress: e.target.value })}
                >
                  <option value="all">All Progress Levels</option>
                  <option value="low">Low Progress (&lt; 30%)</option>
                  <option value="medium">Medium Progress (30% - 70%)</option>
                  <option value="high">High Progress (&gt; 70%)</option>
                </select>
              </div>
              <div>
                <label htmlFor="attendance-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Attendance
                </label>
                <select
                  id="attendance-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.attendance}
                  onChange={(e) => setFilters({ ...filters, attendance: e.target.value })}
                >
                  <option value="all">All Attendance Rates</option>
                  <option value="low">Low Attendance (&lt; 70%)</option>
                  <option value="medium">Medium Attendance (70% - 90%)</option>
                  <option value="high">High Attendance (&gt; 90%)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Workout Plan Modal */}
        {showWorkoutPlanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowWorkoutPlanModal(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Workout Plans</h2>
              {/* Create Plan Form */}
              <form onSubmit={handleCreatePlan} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="border p-2 rounded"
                    value={planForm.title}
                    onChange={handlePlanFormChange}
                    required
                  />
                  <input
                    type="text"
                    name="level"
                    placeholder="Level (e.g. Beginner)"
                    className="border p-2 rounded"
                    value={planForm.level}
                    onChange={handlePlanFormChange}
                  />
                  <input
                    type="number"
                    name="duration"
                    placeholder="Duration (min)"
                    className="border p-2 rounded"
                    value={planForm.duration}
                    onChange={handlePlanFormChange}
                  />
                  <input
                    type="text"
                    name="schedule"
                    placeholder="Schedule (e.g. 3x per week)"
                    className="border p-2 rounded"
                    value={planForm.schedule}
                    onChange={handlePlanFormChange}
                  />
                  <input
                    type="text"
                    name="trainee"
                    placeholder="Trainee User ID"
                    className="border p-2 rounded"
                    value={planForm.trainee}
                    onChange={handlePlanFormChange}
                    required
                  />
                </div>
                <textarea
                  name="description"
                  placeholder="Description"
                  className="border p-2 rounded w-full mt-2"
                  value={planForm.description}
                  onChange={handlePlanFormChange}
                />
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Exercises</h4>
                  {planForm.exercises.map((ex, idx) => (
                    <div key={idx} className="flex gap-2 mb-2 items-center">
                      <input
                        type="text"
                        placeholder="Exercise Name"
                        className="border p-1 rounded flex-1"
                        value={ex.name}
                        onChange={e => handleExerciseChange(idx, "name", e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Sets"
                        className="border p-1 rounded w-16"
                        value={ex.sets}
                        onChange={e => handleExerciseChange(idx, "sets", e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Reps"
                        className="border p-1 rounded w-16"
                        value={ex.reps}
                        onChange={e => handleExerciseChange(idx, "reps", e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Rest"
                        className="border p-1 rounded w-20"
                        value={ex.rest}
                        onChange={e => handleExerciseChange(idx, "rest", e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Notes"
                        className="border p-1 rounded w-24"
                        value={ex.notes}
                        onChange={e => handleExerciseChange(idx, "notes", e.target.value)}
                      />
                      {planForm.exercises.length > 1 && (
                        <button type="button" className="text-red-500" onClick={() => removeExercise(idx)}>
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="text-blue-600 mt-1" onClick={addExercise}>
                    + Add Exercise
                  </button>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                <button
                  type="submit"
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={creating}
                >
                  {creating ? "Creating..." : "Create Plan"}
                </button>
              </form>
              {/* List of Workout Plans */}
              <h3 className="font-semibold mb-2">Your Workout Plans</h3>
              {loadingPlans ? (
                <div>Loading...</div>
              ) : (
                <div className="max-h-48 overflow-y-auto">
                  {workoutPlans && workoutPlans.length > 0 ? (
                    workoutPlans.map((plan, idx) => (
                      <div key={plan._id || idx} className="border rounded p-2 mb-2">
                        <div className="font-bold">{plan.title}</div>
                        <div className="text-sm text-gray-600">For: {plan.trainee?.name || plan.trainee}</div>
                        <div className="text-xs text-gray-500">Level: {plan.level} | Duration: {plan.duration} min | {plan.schedule}</div>
                        <div className="text-xs mt-1">{plan.description}</div>
                        <div className="text-xs mt-1">Exercises: {plan.exercises.map((ex: any) => ex.name).join(", ")}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No workout plans found.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Trainees List */}
        {filteredTrainees.length > 0 ? (
          <div className="space-y-6">
            {filteredTrainees.map((trainee) => (
              <div key={trainee.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className="h-24 w-24 rounded-full overflow-hidden relative">
                        <Image
                          src={trainee.image || "/placeholder.svg"}
                          alt={trainee.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{trainee.name}</h3>
                          <p className="text-gray-600">{trainee.email}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Link
                            href={`/trainer/trainees/${trainee.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                          >
                            View Profile
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Goals:</span> {trainee.goals}
                        </p>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Started: {trainee.startDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Next Session: {trainee.nextSession}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Dumbbell className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Attendance: {trainee.attendance}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-medium text-gray-700">{trainee.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${trainee.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => toggleTraineeDetails(trainee.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                        >
                          {expandedTrainee === trainee.id ? "Hide Details" : "View Details"}
                          {expandedTrainee === trainee.id ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTrainee === trainee.id && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Email:</span> {trainee.email}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Phone:</span> {trainee.phone}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Training Plan</h4>
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <p className="text-gray-700">{trainee.plan}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Trainer Notes</h4>
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <p className="text-gray-700">{trainee.notes}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                      <Link
                        href={`/trainer/trainees/${trainee.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                      >
                        View Full Profile
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trainees found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.progress !== "all" || filters.attendance !== "all"
                ? "Try adjusting your search or filters to find trainees."
                : "You don't have any trainees assigned to you yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

