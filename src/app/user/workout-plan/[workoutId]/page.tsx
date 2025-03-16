"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Dumbbell, CheckCircle, Play, Pause, RotateCcw } from "lucide-react"

// Mock data for workout plans - in a real app, you would fetch this from your API
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
      {
        name: "Squats",
        sets: 3,
        reps: 12,
        rest: "60 sec",
        instructions:
          "Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing position.",
      },
      {
        name: "Push-ups",
        sets: 3,
        reps: 10,
        rest: "60 sec",
        instructions:
          "Start in a plank position with hands slightly wider than shoulders, lower your body until chest nearly touches the floor, then push back up.",
      },
      {
        name: "Lunges",
        sets: 3,
        reps: 10,
        rest: "60 sec",
        instructions:
          "Step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle, then return to starting position.",
      },
      {
        name: "Plank",
        sets: 3,
        duration: "30 sec",
        rest: "45 sec",
        instructions:
          "Hold a position similar to a push-up, but with your weight on your forearms, keeping your body in a straight line from head to heels.",
      },
      {
        name: "Dumbbell Rows",
        sets: 3,
        reps: 12,
        rest: "60 sec",
        instructions:
          "With a dumbbell in one hand, bend at your waist with your other hand on a bench, pull the weight up to your side, then lower it back down.",
      },
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
      {
        name: "Jumping Jacks",
        sets: 3,
        duration: "45 sec",
        rest: "15 sec",
        instructions:
          "Jump while raising your arms and separating your legs to the sides, then return to standing position with arms at sides and legs together.",
      },
      {
        name: "High Knees",
        sets: 3,
        duration: "45 sec",
        rest: "15 sec",
        instructions: "Run in place, lifting your knees as high as possible with each step.",
      },
      {
        name: "Burpees",
        sets: 3,
        duration: "30 sec",
        rest: "30 sec",
        instructions:
          "Begin in standing position, drop into a squat position with hands on the ground, kick feet back into a plank, return feet to squat position, and jump up from squat position.",
      },
      {
        name: "Mountain Climbers",
        sets: 3,
        duration: "45 sec",
        rest: "15 sec",
        instructions:
          "Start in a plank position and alternate bringing each knee toward your chest in a running motion.",
      },
      {
        name: "Jump Rope",
        sets: 3,
        duration: "60 sec",
        rest: "30 sec",
        instructions:
          "Jump rope at a moderate to fast pace, keeping your core engaged and landing softly on the balls of your feet.",
      },
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
      {
        name: "Crunches",
        sets: 3,
        reps: 15,
        rest: "30 sec",
        instructions:
          "Lie on your back with knees bent, place hands behind your head, and lift your shoulders off the ground using your abdominal muscles.",
      },
      {
        name: "Russian Twists",
        sets: 3,
        reps: 20,
        rest: "30 sec",
        instructions:
          "Sit on the floor with knees bent, lean back slightly, and rotate your torso from side to side, touching the floor beside you with your hands.",
      },
      {
        name: "Leg Raises",
        sets: 3,
        reps: 12,
        rest: "45 sec",
        instructions:
          "Lie on your back with legs straight, raise your legs to a 90-degree angle, then lower them back down without touching the floor.",
      },
      {
        name: "Plank",
        sets: 3,
        duration: "45 sec",
        rest: "30 sec",
        instructions:
          "Hold a position similar to a push-up, but with your weight on your forearms, keeping your body in a straight line from head to heels.",
      },
      {
        name: "Side Planks",
        sets: 3,
        duration: "30 sec",
        rest: "30 sec",
        instructions:
          "Lie on your side with legs straight, prop yourself up on your elbow, and raise your hips so your body forms a straight line.",
      },
    ],
  },
]

export default function WorkoutDetailPage() {
  const params = useParams()
  const router = useRouter()
  const workoutId = params.workoutId as string

  const [workout, setWorkout] = useState<any>(null)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [timer, setTimer] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [workoutComplete, setWorkoutComplete] = useState(false)

  useEffect(() => {
    // Find the workout by ID
    const foundWorkout = workoutPlans.find((plan) => plan.id === Number.parseInt(workoutId))
    if (foundWorkout) {
      setWorkout(foundWorkout)
    } else {
      // Redirect to workout plans if workout not found
      router.push("/user/workout-plan")
    }
  }, [workoutId, router])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            setIsTimerRunning(false)
            if (isResting) {
              setIsResting(false)

              // If we've completed all sets for this exercise
              if (currentSet >= (workout?.exercises[currentExercise]?.sets || 1)) {
                setCurrentSet(1)
                setCompletedExercises((prev) => [...prev, currentExercise])

                // Move to next exercise or complete workout
                if (currentExercise >= (workout?.exercises.length || 0) - 1) {
                  setWorkoutComplete(true)
                } else {
                  setCurrentExercise((prev) => prev + 1)
                }
              } else {
                setCurrentSet((prev) => prev + 1)
              }
            } else {
              startRest()
            }
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, isResting, currentExercise, currentSet, workout])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const startExercise = () => {
    if (!workout) return

    const exercise = workout.exercises[currentExercise]
    if (!exercise) return

    if (exercise.duration) {
      // For timed exercises (like planks)
      const durationInSec = Number.parseInt(exercise.duration)
      setTimer(durationInSec)
    } else {
      // For rep-based exercises, just set a reasonable timer (10 seconds)
      setTimer(10)
    }

    setIsResting(false)
    setIsTimerRunning(true)
  }

  const startRest = () => {
    if (!workout) return

    const exercise = workout.exercises[currentExercise]
    if (!exercise) return

    const restTime = Number.parseInt(exercise.rest)
    setTimer(restTime)
    setIsResting(true)
    setIsTimerRunning(true)
  }

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)

    if (isResting) {
      const exercise = workout?.exercises[currentExercise]
      if (exercise) {
        const restTime = Number.parseInt(exercise.rest)
        setTimer(restTime)
      }
    } else {
      const exercise = workout?.exercises[currentExercise]
      if (exercise && exercise.duration) {
        const durationInSec = Number.parseInt(exercise.duration)
        setTimer(durationInSec)
      } else {
        setTimer(10)
      }
    }
  }

  const skipExercise = () => {
    if (currentExercise >= (workout?.exercises.length || 0) - 1) {
      setWorkoutComplete(true)
    } else {
      setCurrentExercise((prev) => prev + 1)
      setCurrentSet(1)
      setIsResting(false)
      setIsTimerRunning(false)
      setTimer(0)
    }
  }

  const restartWorkout = () => {
    setCurrentExercise(0)
    setCurrentSet(1)
    setIsResting(false)
    setIsTimerRunning(false)
    setTimer(0)
    setCompletedExercises([])
    setWorkoutComplete(false)
  }

  if (!workout) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/user/workout-plan"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Workout Plans
          </Link>
        </div>

        {workoutComplete ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Workout Complete!</h2>
            <p className="text-gray-600 mb-6">Great job! You've completed the {workout.name} workout.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={restartWorkout}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                suppressHydrationWarning
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Restart Workout
              </button>
              <Link
                href="/user/workout-plan"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Back to Workout Plans
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">{workout.name}</h1>
                <p className="mt-1 text-gray-600">{workout.description}</p>

                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Dumbbell className="h-5 w-5 text-blue-600 mr-1" />
                    <span>{workout.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-5 w-5 text-blue-600 mr-1" />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-5 w-5 text-blue-600 mr-1" />
                    <span>{workout.frequency}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">
                      {completedExercises.length} of {workout.exercises.length} exercises
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(completedExercises.length / workout.exercises.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {isResting ? "Rest Time" : `Exercise ${currentExercise + 1} of ${workout.exercises.length}`}
                </h2>

                {isResting ? (
                  <div className="text-center py-8">
                    <p className="text-lg font-medium text-gray-700 mb-2">Rest before next set</p>
                    <div className="text-4xl font-bold text-blue-600 mb-6">{formatTime(timer)}</div>
                    <p className="text-gray-600 mb-4">
                      Next: {workout.exercises[currentExercise].name} - Set {currentSet} of{" "}
                      {workout.exercises[currentExercise].sets}
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={toggleTimer}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                        suppressHydrationWarning
                      >
                        {isTimerRunning ? (
                          <>
                            <Pause className="h-5 w-5 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-5 w-5 mr-2" />
                            Resume
                          </>
                        )}
                      </button>
                      <button
                        onClick={resetTimer}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                        suppressHydrationWarning
                      >
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Reset
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="relative h-48 rounded-lg overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=300&width=300&text=${workout.exercises[currentExercise].name}`}
                            alt={workout.exercises[currentExercise].name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-lg font-bold text-gray-900">{workout.exercises[currentExercise].name}</h3>
                        <p className="mt-1 text-gray-600 mb-4">{workout.exercises[currentExercise].instructions}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Sets</p>
                            <p className="font-medium">
                              {currentSet} of {workout.exercises[currentExercise].sets}
                            </p>
                          </div>
                          {workout.exercises[currentExercise].reps ? (
                            <div>
                              <p className="text-sm text-gray-500">Reps</p>
                              <p className="font-medium">{workout.exercises[currentExercise].reps}</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="font-medium">{workout.exercises[currentExercise].duration}</p>
                            </div>
                          )}
                        </div>

                        {timer > 0 && (
                          <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-blue-600">{formatTime(timer)}</div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-3">
                          {timer > 0 ? (
                            <>
                              <button
                                onClick={toggleTimer}
                                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                                suppressHydrationWarning
                              >
                                {isTimerRunning ? (
                                  <>
                                    <Pause className="h-5 w-5 mr-2" />
                                    Pause
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-5 w-5 mr-2" />
                                    Resume
                                  </>
                                )}
                              </button>
                              <button
                                onClick={resetTimer}
                                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                                suppressHydrationWarning
                              >
                                <RotateCcw className="h-5 w-5 mr-2" />
                                Reset
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={startExercise}
                              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
                              suppressHydrationWarning
                            >
                              <Play className="h-5 w-5 mr-2" />
                              Start {workout.exercises[currentExercise].reps ? "Set" : "Timer"}
                            </button>
                          )}
                          <button
                            onClick={skipExercise}
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                            suppressHydrationWarning
                          >
                            Skip Exercise
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Workout Progress</h2>
                <div className="space-y-4">
                  {workout.exercises.map((exercise: any, index: number) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-md ${
                        currentExercise === index
                          ? "bg-blue-50 border border-blue-200"
                          : completedExercises.includes(index)
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          {completedExercises.includes(index) && (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          )}
                          <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          {exercise.sets} sets × {exercise.reps ? `${exercise.reps} reps` : exercise.duration}
                        </p>
                      </div>
                      {currentExercise === index && !completedExercises.includes(index) && (
                        <span className="text-sm font-medium text-blue-600">Current</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

