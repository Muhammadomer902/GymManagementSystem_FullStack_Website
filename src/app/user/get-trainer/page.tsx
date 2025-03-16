"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Star, Award, ChevronDown, ChevronUp, MapPin } from "lucide-react"

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
  },
  {
    id: 3,
    name: "Michael Chen",
    specialty: "Yoga & Mobility",
    experience: "6 years",
    rating: 4.7,
    reviews: 76,
    location: "Main Branch",
    availability: "Mon, Tue, Thu, Sun",
    image: "/placeholder.svg?height=400&width=400&text=Michael",
    certifications: ["RYT-500", "FRC Mobility Specialist", "NASM-CPT"],
    bio: "Michael focuses on improving flexibility, mobility, and mind-body connection through yoga and specialized mobility training. His sessions are perfect for those looking to reduce pain, improve posture, and enhance overall movement quality.",
    price: "$50/session",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    specialty: "HIIT & Functional Training",
    experience: "5 years",
    rating: 4.6,
    reviews: 62,
    location: "Downtown Branch",
    availability: "Wed, Fri, Sat, Sun",
    image: "/placeholder.svg?height=400&width=400&text=Emily",
    certifications: ["ACE-CPT", "TRX Certified", "Kettlebell Specialist"],
    bio: "Emily specializes in high-intensity interval training and functional movement patterns. Her energetic sessions are designed to maximize calorie burn while building practical, real-world strength and endurance.",
    price: "$45/session",
  },
]

export default function FindTrainerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedTrainer, setExpandedTrainer] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    specialty: "all",
    location: "all",
    rating: "all",
  })

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleTrainerDetails = (id: number) => {
    setExpandedTrainer(expandedTrainer === id ? null : id)
  }

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.bio.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty =
      filters.specialty === "all" || trainer.specialty.toLowerCase().includes(filters.specialty.toLowerCase())
    const matchesLocation =
      filters.location === "all" || trainer.location.toLowerCase().includes(filters.location.toLowerCase())
    const matchesRating =
      filters.rating === "all" ||
      (filters.rating === "4.5+" && trainer.rating >= 4.5) ||
      (filters.rating === "4+" && trainer.rating >= 4.0) ||
      (filters.rating === "3.5+" && trainer.rating >= 3.5)

    return matchesSearch && matchesSpecialty && matchesLocation && matchesRating
  })

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Trainer</h1>
          <p className="mt-1 text-gray-600">Connect with expert trainers to help you achieve your fitness goals</p>
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
                placeholder="Search trainers by name or specialty..."
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
                <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <select
                  id="specialty-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.specialty}
                  onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                >
                  <option value="all">All Specialties</option>
                  <option value="strength">Strength & Conditioning</option>
                  <option value="weight loss">Weight Loss</option>
                  <option value="yoga">Yoga & Mobility</option>
                  <option value="hiit">HIIT & Functional Training</option>
                </select>
              </div>
              <div>
                <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                  <option value="all">All Locations</option>
                  <option value="main">Main Branch</option>
                  <option value="downtown">Downtown Branch</option>
                </select>
              </div>
              <div>
                <label htmlFor="rating-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  id="rating-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                >
                  <option value="all">Any Rating</option>
                  <option value="4.5+">4.5 & Above</option>
                  <option value="4+">4.0 & Above</option>
                  <option value="3.5+">3.5 & Above</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Trainers List */}
        {filteredTrainers.length > 0 ? (
          <div className="space-y-6">
            {filteredTrainers.map((trainer) => (
              <div key={trainer.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className="h-48 w-48 rounded-lg overflow-hidden relative">
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
                          <h2 className="text-2xl font-bold text-gray-900">{trainer.name}</h2>
                          <p className="text-blue-600 font-medium">{trainer.specialty}</p>
                        </div>
                        <div className="flex items-center mt-1 md:mt-0">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <span className="ml-1 text-gray-900 font-medium">{trainer.rating}</span>
                          <span className="ml-1 text-gray-500">({trainer.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Award className="h-5 w-5 text-blue-600 mr-1" />
                          <span>{trainer.experience}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-5 w-5 text-blue-600 mr-1" />
                          <span>{trainer.location}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Price:</span> {trainer.price}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {trainer.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <p className="text-sm text-gray-500 mb-2 sm:mb-0">
                          <span className="font-medium">Available:</span> {trainer.availability}
                        </p>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => toggleTrainerDetails(trainer.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm"
                          >
                            {expandedTrainer === trainer.id ? "Less Info" : "More Info"}
                            {expandedTrainer === trainer.id ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            )}
                          </button>
                          <Link
                            href={`/user/trainer-plan/${trainer.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                          >
                            View Plans
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTrainer === trainer.id && (
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">About {trainer.name}</h3>
                    <p className="text-gray-700 mb-4">{trainer.bio}</p>

                    <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4">
                      <Link
                        href={`/user/trainer-plan/${trainer.id}`}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Request Training
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trainers found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filters.specialty !== "all" || filters.location !== "all" || filters.rating !== "all"
                ? "Try adjusting your search or filters to find trainers."
                : "There are no trainers available at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

