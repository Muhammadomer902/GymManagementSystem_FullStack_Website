"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function WorkoutPlansPage() {
  const [workoutPlans, setWorkoutPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")
  const [planForm, setPlanForm] = useState({
    title: "",
    description: "",
    level: "",
    duration: "",
    schedule: "",
    exercises: [{ name: "", sets: 3, reps: "10", rest: "60 sec", notes: "" }],
  })

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = () => {
    setLoading(true)
    fetch("/api/workout-plans")
      .then((res) => res.json())
      .then((data) => {
        setWorkoutPlans(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

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
        level: "",
        duration: "",
        schedule: "",
        exercises: [{ name: "", sets: 3, reps: "10", rest: "60 sec", notes: "" }],
      })
      setCreating(false)
      setShowForm(false)
      fetchPlans()
    } catch (err) {
      setError("Failed to create plan")
      setCreating(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workout Plans</h1>
            <p className="mt-1 text-gray-600">Create and manage your trainees' workout plans</p>
          </div>
          <Link href="/trainer/trainees" className="text-blue-600 hover:underline">← Back to Trainees</Link>
        </div>
        <div className="mb-6 flex justify-end">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Create Workout Plan"}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleCreatePlan} className="bg-white rounded-lg shadow-md p-6 mb-8">
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
        )}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Workout Plans</h2>
          {loading ? (
            <div>Loading...</div>
          ) : workoutPlans && workoutPlans.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {workoutPlans.map((plan, idx) => (
                <div key={plan._id || idx} className="bg-white rounded-lg shadow p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-lg">{plan.title}</div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{plan.level}</span>
                  </div>
                  {plan.trainee && <div className="text-sm text-gray-600 mb-1">For: {plan.trainee?.name || plan.trainee}</div>}
                  <div className="text-xs text-gray-500 mb-1">Duration: {plan.duration} min | {plan.schedule}</div>
                  <div className="text-xs mb-2">{plan.description}</div>
                  <div className="text-xs mb-2">Exercises: {plan.exercises.map((ex: any) => ex.name).join(", ")}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No workout plans found.</div>
          )}
        </div>
      </div>
    </div>
  )
} 