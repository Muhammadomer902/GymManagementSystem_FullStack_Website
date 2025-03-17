"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  Mail,
  FileText,
  TrendingUp,
  Dumbbell,
  Plus,
  Edit,
  Save,
  X,
} from "lucide-react"

// Mock data for trainees
const traineesData = [
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
    age: 35,
    height: "5'10\"",
    weight: "195 lbs",
    medicalConditions: "None",
    dietaryRestrictions: "No dairy",
    fitnessLevel: "Intermediate",
    sessions: [
      {
        id: 101,
        date: "2023-11-15",
        time: "2:00 PM",
        duration: "60 min",
        type: "Strength Training",
        completed: true,
        notes: "Focused on upper body. Increased bench press weight by 5 lbs.",
      },
      {
        id: 102,
        date: "2023-11-13",
        time: "2:00 PM",
        duration: "60 min",
        type: "Cardio",
        completed: true,
        notes: "30 min HIIT session followed by stretching. Heart rate recovery improving.",
      },
      {
        id: 103,
        date: "2023-11-10",
        time: "2:00 PM",
        duration: "60 min",
        type: "Lower Body",
        completed: true,
        notes: "Worked on squat form. Added Romanian deadlifts to routine.",
      },
    ],
    measurements: [
      {
        date: "2023-11-15",
        weight: "195 lbs",
        bodyFat: "22%",
        chest: "42 in",
        waist: "36 in",
        hips: "40 in",
        arms: "15 in",
        thighs: "24 in",
      },
      {
        date: "2023-10-15",
        weight: "200 lbs",
        bodyFat: "24%",
        chest: "43 in",
        waist: "38 in",
        hips: "41 in",
        arms: "14.5 in",
        thighs: "24.5 in",
      },
      {
        date: "2023-09-15",
        weight: "205 lbs",
        bodyFat: "25%",
        chest: "44 in",
        waist: "40 in",
        hips: "42 in",
        arms: "14 in",
        thighs: "25 in",
      },
    ],
    workoutPlan: [
      {
        day: "Monday",
        focus: "Upper Body",
        exercises: [
          { name: "Bench Press", sets: 4, reps: "8-10", weight: "135 lbs" },
          { name: "Dumbbell Rows", sets: 3, reps: "10-12", weight: "45 lbs" },
          { name: "Shoulder Press", sets: 3, reps: "10-12", weight: "30 lbs" },
          { name: "Tricep Extensions", sets: 3, reps: "12-15", weight: "25 lbs" },
          { name: "Bicep Curls", sets: 3, reps: "12-15", weight: "25 lbs" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Lower Body",
        exercises: [
          { name: "Squats", sets: 4, reps: "8-10", weight: "185 lbs" },
          { name: "Romanian Deadlifts", sets: 3, reps: "10-12", weight: "135 lbs" },
          { name: "Leg Press", sets: 3, reps: "10-12", weight: "225 lbs" },
          { name: "Calf Raises", sets: 3, reps: "15-20", weight: "100 lbs" },
          { name: "Leg Curls", sets: 3, reps: "12-15", weight: "70 lbs" },
        ],
      },
      {
        day: "Friday",
        focus: "Full Body + Cardio",
        exercises: [
          { name: "Deadlifts", sets: 4, reps: "6-8", weight: "185 lbs" },
          { name: "Pull-ups", sets: 3, reps: "8-10", weight: "Bodyweight" },
          { name: "Push-ups", sets: 3, reps: "12-15", weight: "Bodyweight" },
          { name: "Lunges", sets: 3, reps: "10 each leg", weight: "30 lbs dumbbells" },
          { name: "HIIT", sets: 1, reps: "20 minutes", weight: "N/A" },
        ],
      },
    ],
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
    age: 28,
    height: "5'6\"",
    weight: "140 lbs",
    medicalConditions: "Mild asthma",
    dietaryRestrictions: "Vegetarian",
    fitnessLevel: "Beginner",
    sessions: [
      {
        id: 201,
        date: "2023-11-14",
        time: "10:00 AM",
        duration: "45 min",
        type: "Full Body",
        completed: true,
        notes: "Focused on form and technique. Introduced resistance bands.",
      },
      {
        id: 202,
        date: "2023-11-09",
        time: "10:00 AM",
        duration: "45 min",
        type: "Yoga",
        completed: true,
        notes: "Worked on flexibility and balance. Significant improvement in downward dog form.",
      },
    ],
    measurements: [
      {
        date: "2023-11-05",
        weight: "140 lbs",
        bodyFat: "24%",
        chest: "36 in",
        waist: "28 in",
        hips: "38 in",
        arms: "11 in",
        thighs: "22 in",
      },
      {
        date: "2023-10-05",
        weight: "142 lbs",
        bodyFat: "25%",
        chest: "36 in",
        waist: "29 in",
        hips: "38 in",
        arms: "10.5 in",
        thighs: "22 in",
      },
    ],
    workoutPlan: [
      {
        day: "Tuesday",
        focus: "Full Body Strength",
        exercises: [
          { name: "Dumbbell Squats", sets: 3, reps: "12-15", weight: "15 lbs" },
          { name: "Push-ups (Modified)", sets: 3, reps: "8-10", weight: "Bodyweight" },
          { name: "Dumbbell Rows", sets: 3, reps: "12-15", weight: "12 lbs" },
          { name: "Glute Bridges", sets: 3, reps: "15-20", weight: "Bodyweight" },
          { name: "Plank", sets: 3, reps: "30 seconds", weight: "Bodyweight" },
        ],
      },
      {
        day: "Thursday",
        focus: "Yoga & Flexibility",
        exercises: [
          { name: "Sun Salutations", sets: 3, reps: "5 flows", weight: "N/A" },
          { name: "Warrior Sequence", sets: 2, reps: "60 seconds each side", weight: "N/A" },
          { name: "Balance Poses", sets: 2, reps: "30 seconds each pose", weight: "N/A" },
          { name: "Hip Openers", sets: 2, reps: "60 seconds each side", weight: "N/A" },
          { name: "Meditation", sets: 1, reps: "10 minutes", weight: "N/A" },
        ],
      },
    ],
  },
]

export default function TraineeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const traineeId = params.traineeId as string

  const [trainee, setTrainee] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [editingNotes, setEditingNotes] = useState(false)
  const [notes, setNotes] = useState("")

  // Modal states
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [showMeasurementModal, setShowMeasurementModal] = useState(false)
  const [showPlanModal, setShowPlanModal] = useState(false)

  // Form states
  const [newSession, setNewSession] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    duration: "60",
    type: "Strength Training",
    location: "Main Gym Floor",
    notes: "",
  })

  const [newMeasurement, setNewMeasurement] = useState({
    date: new Date().toISOString().split("T")[0],
    weight: "",
    bodyFat: "",
    chest: "",
    waist: "",
    hips: "",
    arms: "",
    thighs: "",
  })

  const [editedPlan, setEditedPlan] = useState<any[]>([])

  useEffect(() => {
    if (traineeId) {
      const foundTrainee = traineesData.find((t) => t.id === Number.parseInt(traineeId))
      if (foundTrainee) {
        setTrainee(foundTrainee)
        setNotes(foundTrainee.notes)
        if (foundTrainee.workoutPlan) {
          setEditedPlan([...foundTrainee.workoutPlan])
        }
      } else {
        // Redirect to trainees list if trainee not found
        router.push("/trainer/trainees")
      }
    }
  }, [traineeId, router])

  const handleSaveNotes = () => {
    setTrainee({ ...trainee, notes: notes })
    setEditingNotes(false)
  }

  const handleAddSession = () => {
    const newSessionObj = {
      id: Date.now(), // Generate a unique ID
      date: newSession.date,
      time: `${newSession.time} ${Number.parseInt(newSession.time.split(":")[0]) >= 12 ? "PM" : "AM"}`,
      duration: `${newSession.duration} min`,
      type: newSession.type,
      location: newSession.location,
      completed: false,
      notes: newSession.notes,
    }

    const updatedSessions = trainee.sessions ? [newSessionObj, ...trainee.sessions] : [newSessionObj]
    setTrainee({ ...trainee, sessions: updatedSessions })
    setShowSessionModal(false)

    // Reset form
    setNewSession({
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      duration: "60",
      type: "Strength Training",
      location: "Main Gym Floor",
      notes: "",
    })
  }

  const handleAddMeasurement = () => {
    const newMeasurementObj = {
      date: newMeasurement.date,
      weight: `${newMeasurement.weight} lbs`,
      bodyFat: `${newMeasurement.bodyFat}%`,
      chest: `${newMeasurement.chest} in`,
      waist: `${newMeasurement.waist} in`,
      hips: `${newMeasurement.hips} in`,
      arms: `${newMeasurement.arms} in`,
      thighs: `${newMeasurement.thighs} in`,
    }

    const updatedMeasurements = trainee.measurements
      ? [newMeasurementObj, ...trainee.measurements]
      : [newMeasurementObj]
    setTrainee({ ...trainee, measurements: updatedMeasurements })
    setShowMeasurementModal(false)

    // Reset form
    setNewMeasurement({
      date: new Date().toISOString().split("T")[0],
      weight: "",
      bodyFat: "",
      chest: "",
      waist: "",
      hips: "",
      arms: "",
      thighs: "",
    })
  }

  const handleSavePlan = () => {
    setTrainee({ ...trainee, workoutPlan: editedPlan })
    setShowPlanModal(false)
  }

  if (!trainee) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trainee profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/trainer/trainees"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Trainees
          </Link>
        </div>

        {/* Trainee Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <div className="h-32 w-32 rounded-full overflow-hidden relative">
                  <Image src={trainee.image || "/placeholder.svg"} alt={trainee.name} fill className="object-cover" />
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{trainee.name}</h1>
                    <p className="text-gray-600">Client since {trainee.startDate}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{trainee.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{trainee.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">Next: {trainee.nextSession}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">{trainee.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${trainee.progress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("sessions")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "sessions"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Sessions
              </button>
              <button
                onClick={() => setActiveTab("measurements")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "measurements"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Measurements
              </button>
              <button
                onClick={() => setActiveTab("plan")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "plan"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Workout Plan
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Age</p>
                          <p className="font-medium">{trainee.age}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Height</p>
                          <p className="font-medium">{trainee.height}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Weight</p>
                          <p className="font-medium">{trainee.weight}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fitness Level</p>
                          <p className="font-medium">{trainee.fitnessLevel}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Medical Conditions</p>
                          <p className="font-medium">{trainee.medicalConditions}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Dietary Restrictions</p>
                          <p className="font-medium">{trainee.dietaryRestrictions}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Goals and Plan */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Goals & Training Plan</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Goals</p>
                        <p className="font-medium">{trainee.goals}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Current Plan</p>
                        <p className="font-medium">{trainee.plan}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Attendance Rate</p>
                        <p className="font-medium">{trainee.attendance}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trainer Notes */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Trainer Notes</h2>
                    {!editingNotes ? (
                      <button
                        onClick={() => setEditingNotes(true)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Notes
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setNotes(trainee.notes)
                            setEditingNotes(false)
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNotes}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                  {!editingNotes ? (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{trainee.notes}</p>
                    </div>
                  ) : (
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your notes about this trainee..."
                    ></textarea>
                  )}
                </div>
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === "sessions" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Training Sessions</h2>
                  <button
                    onClick={() => setShowSessionModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Session
                  </button>
                </div>

                {trainee.sessions && trainee.sessions.length > 0 ? (
                  <div className="space-y-4">
                    {trainee.sessions.map((session: any) => (
                      <div key={session.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex flex-wrap justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{session.type}</h3>
                            <div className="flex items-center mt-1">
                              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">{session.date}</span>
                              <Clock className="h-4 w-4 text-gray-400 ml-3 mr-1" />
                              <span className="text-sm text-gray-600">
                                {session.time} ({session.duration})
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            {session.completed ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Completed
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Upcoming
                              </span>
                            )}
                          </div>
                        </div>
                        {session.notes && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Notes:</span> {session.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions recorded</h3>
                    <p className="text-gray-600 mb-4">Start tracking your sessions with this trainee</p>
                    <button
                      onClick={() => setShowSessionModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Session
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Measurements Tab */}
            {activeTab === "measurements" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Body Measurements</h2>
                  <button
                    onClick={() => setShowMeasurementModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Measurement
                  </button>
                </div>

                {trainee.measurements && trainee.measurements.length > 0 ? (
                  <div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Weight
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Body Fat
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Chest
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Waist
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Hips
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Arms
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Thighs
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {trainee.measurements.map((measurement: any, index: number) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {measurement.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {measurement.weight}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {measurement.bodyFat}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{measurement.chest}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{measurement.waist}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{measurement.hips}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{measurement.arms}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {measurement.thighs}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Progress Chart</h3>
                      <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
                        <p className="text-gray-500">Weight and measurements chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No measurements recorded</h3>
                    <p className="text-gray-600 mb-4">Start tracking body measurements to monitor progress</p>
                    <button
                      onClick={() => setShowMeasurementModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Measurement
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Workout Plan Tab */}
            {activeTab === "plan" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Workout Plan</h2>
                  <button
                    onClick={() => {
                      setEditedPlan(trainee.workoutPlan || [])
                      setShowPlanModal(true)
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Plan
                  </button>
                </div>

                {trainee.workoutPlan && trainee.workoutPlan.length > 0 ? (
                  <div className="space-y-6">
                    {trainee.workoutPlan.map((day: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                        <div className="bg-blue-600 text-white px-4 py-2">
                          <h3 className="font-medium">
                            {day.day} - {day.focus}
                          </h3>
                        </div>
                        <div className="p-4">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Exercise
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Sets
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Reps
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Weight
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {day.exercises.map(
                                (
                                  exercise: { name: string; sets: number; reps: string; weight: string },
                                  exIndex: number,
                                ) => (
                                  <tr key={exIndex}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {exercise.name}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {exercise.sets}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {exercise.reps}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {exercise.weight}
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No workout plan created</h3>
                    <p className="text-gray-600 mb-4">Create a personalized workout plan for this trainee</p>
                    <button
                      onClick={() => setShowPlanModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Workout Plan
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Session</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddSession()
              }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="session-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="session-date"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newSession.date}
                    onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="session-time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      id="session-time"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newSession.time}
                      onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="session-duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      id="session-duration"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newSession.duration}
                      onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                      min="15"
                      max="120"
                      step="5"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="session-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Session Type
                  </label>
                  <select
                    id="session-type"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newSession.type}
                    onChange={(e) => setNewSession({ ...newSession, type: e.target.value })}
                    required
                  >
                    <option value="Strength Training">Strength Training</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Full Body">Full Body</option>
                    <option value="Upper Body">Upper Body</option>
                    <option value="Lower Body">Lower Body</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Fitness Assessment">Fitness Assessment</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="session-location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="session-location"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newSession.location}
                    onChange={(e) => setNewSession({ ...newSession, location: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="session-notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    id="session-notes"
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newSession.notes}
                    onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSessionModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                >
                  Add Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Measurement Modal */}
      {showMeasurementModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Measurement</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddMeasurement()
              }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="measurement-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="measurement-date"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newMeasurement.date}
                    onChange={(e) => setNewMeasurement({ ...newMeasurement, date: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="measurement-weight" className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (lbs)
                    </label>
                    <input
                      type="number"
                      id="measurement-weight"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newMeasurement.weight}
                      onChange={(e) => setNewMeasurement({ ...newMeasurement, weight: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="measurement-bodyfat" className="block text-sm font-medium text-gray-700 mb-1">
                      Body Fat (%)
                    </label>
                    <input
                      type="number"
                      id="measurement-bodyfat"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newMeasurement.bodyFat}
                      onChange={(e) => setNewMeasurement({ ...newMeasurement, bodyFat: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="measurement-chest" className="block text-sm font-medium text-gray-700 mb-1">
                      Chest (in)
                    </label>
                    <input
                      type="number"
                      id="measurement-chest"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newMeasurement.chest}
                      onChange={(e) => setNewMeasurement({ ...newMeasurement, chest: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="measurement-waist" className="block text-sm font-medium text-gray-700 mb-1">
                      Waist (in)
                    </label>
                    <input
                      type="number"
                      id="measurement-waist"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newMeasurement.waist}
                      onChange={(e) => setNewMeasurement({ ...newMeasurement, waist: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="measurement-hips" className="block text-sm font-medium text-gray-700 mb-1">
                      Hips (in)
                    </label>
                    <input
                      type="number"
                      id="measurement-hips"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newMeasurement.hips}
                      onChange={(e) => setNewMeasurement({ ...newMeasurement, hips: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="measurement-arms" className="block text-sm font-medium text-gray-700 mb-1">
                      Arms (in)
                    </label>
                    <input
                      type="number"
                      id="measurement-arms"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newMeasurement.arms}
                      onChange={(e) => setNewMeasurement({ ...newMeasurement, arms: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="measurement-thighs" className="block text-sm font-medium text-gray-700 mb-1">
                      Thighs (in)
                    </label>
                    <input
                      type="number"
                      id="measurement-thighs"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newMeasurement.thighs}
                      onChange={(e) => setNewMeasurement({ ...newMeasurement, thighs: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMeasurementModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                >
                  Add Measurement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Workout Plan</h3>

            <div className="space-y-6">
              {editedPlan.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                      <div>
                        <label htmlFor={`day-${dayIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Day
                        </label>
                        <input
                          type="text"
                          id={`day-${dayIndex}`}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={day.day}
                          onChange={(e) => {
                            const newPlan = [...editedPlan]
                            newPlan[dayIndex].day = e.target.value
                            setEditedPlan(newPlan)
                          }}
                        />
                      </div>
                      <div>
                        <label htmlFor={`focus-${dayIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Focus
                        </label>
                        <input
                          type="text"
                          id={`focus-${dayIndex}`}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={day.focus}
                          onChange={(e) => {
                            const newPlan = [...editedPlan]
                            newPlan[dayIndex].focus = e.target.value
                            setEditedPlan(newPlan)
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newPlan = [...editedPlan]
                        newPlan.splice(dayIndex, 1)
                        setEditedPlan(newPlan)
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Exercises</h4>
                    <div className="space-y-3">
                      {day.exercises.map(
                        (exercise: { name: string; sets: number; reps: string; weight: string }, exIndex: number) => (
                          <div key={exIndex} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-5">
                              <input
                                type="text"
                                placeholder="Exercise name"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={exercise.name}
                                onChange={(e) => {
                                  const newPlan = [...editedPlan]
                                  newPlan[dayIndex].exercises[exIndex].name = e.target.value
                                  setEditedPlan(newPlan)
                                }}
                              />
                            </div>
                            <div className="col-span-2">
                              <input
                                type="number"
                                placeholder="Sets"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={exercise.sets}
                                onChange={(e) => {
                                  const newPlan = [...editedPlan]
                                  newPlan[dayIndex].exercises[exIndex].sets = Number.parseInt(e.target.value)
                                  setEditedPlan(newPlan)
                                }}
                              />
                            </div>
                            <div className="col-span-2">
                              <input
                                type="text"
                                placeholder="Reps"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={exercise.reps}
                                onChange={(e) => {
                                  const newPlan = [...editedPlan]
                                  newPlan[dayIndex].exercises[exIndex].reps = e.target.value
                                  setEditedPlan(newPlan)
                                }}
                              />
                            </div>
                            <div className="col-span-2">
                              <input
                                type="text"
                                placeholder="Weight"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={exercise.weight}
                                onChange={(e) => {
                                  const newPlan = [...editedPlan]
                                  newPlan[dayIndex].exercises[exIndex].weight = e.target.value
                                  setEditedPlan(newPlan)
                                }}
                              />
                            </div>
                            <div className="col-span-1">
                              <button
                                type="button"
                                onClick={() => {
                                  const newPlan = [...editedPlan]
                                  newPlan[dayIndex].exercises.splice(exIndex, 1)
                                  setEditedPlan(newPlan)
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newPlan = [...editedPlan]
                        newPlan[dayIndex].exercises.push({
                          name: "",
                          sets: 3,
                          reps: "10-12",
                          weight: "",
                        })
                        setEditedPlan(newPlan)
                      }}
                      className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Exercise
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setEditedPlan([
                    ...editedPlan,
                    {
                      day: "",
                      focus: "",
                      exercises: [
                        {
                          name: "",
                          sets: 3,
                          reps: "10-12",
                          weight: "",
                        },
                      ],
                    },
                  ])
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Training Day
              </button>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowPlanModal(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePlan}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
              >
                Save Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

