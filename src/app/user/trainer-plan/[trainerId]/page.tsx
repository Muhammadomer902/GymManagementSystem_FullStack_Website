"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, Dumbbell, ChevronDown, ChevronUp, ArrowLeft, Loader } from "lucide-react"

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
interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  bio: string;
  image: string;
  certifications: string[];
  education: string;
  availableHours: string;
}

export default function SingleTrainerPlanPage() {
  const params = useParams() || {}
  const trainerId = params.trainerId as string

  const [trainer, setTrainer] = useState<Trainer | null>(null)
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([])
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  // Fetch trainer and workout plans data
  useEffect(() => {
    const fetchData = async () => {
      if (!trainerId) return;
      
      try {
        setLoading(true);
        
        // Fetch trainer details
        const trainerResponse = await fetch(`/api/trainers/${trainerId}`);
        if (!trainerResponse.ok) {
          throw new Error('Failed to fetch trainer details');
        }
        const trainerData = await trainerResponse.json();
        setTrainer(trainerData.trainer);
        
        // Fetch workout plans for this trainer
        const plansResponse = await fetch(`/api/workout-plans?trainerId=${trainerId}`);
        if (!plansResponse.ok) {
          throw new Error('Failed to fetch workout plans');
        }
        const plansData = await plansResponse.json();
        setWorkoutPlans(plansData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load trainer data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [trainerId]);

  const togglePlanDetails = (id: string) => {
    setExpandedPlan(expandedPlan === id ? null : id);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="mt-4 text-gray-600">Loading trainer profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !trainer) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-medium text-red-600 mb-2">Error Loading Trainer</h2>
            <p className="text-gray-600 mb-6">{error || "Trainer not found"}</p>
            <Link 
              href="/user/trainer-plan"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Return to Trainers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/user/trainer-plan"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Trainers
          </Link>
        </div>

        {/* Trainer Info */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <div className="h-48 w-48 rounded-lg overflow-hidden relative flex items-center justify-center text-white text-4xl font-bold"
                     style={{ backgroundColor: trainer ? getBackgroundColor(trainer.name) : 'bg-blue-500' }}>
                  {trainer && getInitials(trainer.name)}
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{trainer.name}</h1>
                    <p className="text-blue-600 font-medium">{trainer.specialty}</p>
                    <p className="text-gray-600 mt-2">{trainer.experience}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-lg font-medium text-gray-900">About</h2>
                  <p className="mt-2 text-gray-700">{trainer.bio}</p>
                </div>

                <div className="mt-4">
                  <h2 className="text-lg font-medium text-gray-900">Certifications</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {trainer.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workout Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Workout Plans</h2>

          {workoutPlans.length > 0 ? (
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
                          <button
                            onClick={() => togglePlanDetails(plan._id)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                          >
                            {expandedPlan === plan._id ? "Less Info" : "More Info"}
                            {expandedPlan === plan._id ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Plan Details */}
                  {expandedPlan === plan._id && (
                    <div className="border-t border-gray-200 px-6 py-4">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Exercises</h4>
                      <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2">
                        {plan.exercises.map((exercise, index) => (
                          <li key={index}>
                            <span className="font-medium">{exercise.name}</span>: {exercise.sets} sets × {exercise.reps}, 
                            rest: {exercise.rest}
                            {exercise.notes && <span className="text-sm text-gray-500 ml-2">({exercise.notes})</span>}
                          </li>
                        ))}
                      </ul>
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
                This trainer hasn&apos;t published any workout plans yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

