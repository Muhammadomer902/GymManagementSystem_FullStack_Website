"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, Star, Award, ChevronDown, ChevronUp, MapPin, Loader, Calendar as CalendarIcon, X } from "lucide-react"

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  bio: string;
  certifications: string[];
  availableHours: string;
  image: string;
  email: string;
  education?: string;
  // Added defaults for compatibility with UI
  rating?: number;
  reviews?: number;
  location?: string;
  price?: string;
}

interface TrainingSessionRequest {
  _id: string;
  trainer: { name: string };
  requestedDate: string;
  status: string;
  message?: string;
  responseMessage?: string;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Generate a background color based on name for visual variety
const getColorFromName = (name: string) => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
    'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
  ];
  
  // Use the sum of character codes to pick a color
  const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charSum % colors.length];
};

export default function FindTrainerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedTrainer, setExpandedTrainer] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    specialty: "all",
    location: "all",
    rating: "all",
  })
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bookingTrainer, setBookingTrainer] = useState<Trainer | null>(null)
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [bookingMessage, setBookingMessage] = useState("")
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [requests, setRequests] = useState<TrainingSessionRequest[]>([])
  const [loadingRequests, setLoadingRequests] = useState(true)

  useEffect(() => {
    const fetchTrainers = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/trainers')
        if (!response.ok) {
          throw new Error('Failed to fetch trainers')
        }
        const data = await response.json()
        
        // Add default values for UI compatibility
        const enhancedTrainers = data.trainers.map((trainer: Trainer) => ({
          ...trainer,
          rating: 4.5 + (Math.random() * 0.5), // Random rating between 4.5-5.0 for demo
          reviews: Math.floor(Math.random() * 100) + 20, // Random reviews count for demo
          location: "Main Branch", // Default location for demo
          price: `$${Math.floor(Math.random() * 30) + 40}/session` // Random price for demo
        }))
        
        setTrainers(enhancedTrainers)
      } catch (err) {
        console.error('Error fetching trainers:', err)
        setError('Failed to load trainers. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrainers()
  }, [])

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoadingRequests(true)
    try {
      const res = await fetch("/api/training-session-requests")
      if (res.ok) {
        const data = await res.json()
        setRequests(data.requests)
      }
    } catch {
      // ignore for now
    } finally {
      setLoadingRequests(false)
    }
  }

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const toggleTrainerDetails = (id: string) => {
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
      filters.location === "all" || 
      (trainer.location && trainer.location.toLowerCase().includes(filters.location.toLowerCase()))
    const matchesRating =
      filters.rating === "all" ||
      (trainer.rating && (
        (filters.rating === "4.5+" && trainer.rating >= 4.5) ||
        (filters.rating === "4+" && trainer.rating >= 4.0) ||
        (filters.rating === "3.5+" && trainer.rating >= 3.5)
      ))

    return matchesSearch && matchesSpecialty && matchesLocation && matchesRating
  })

  const openBookingModal = (trainer: Trainer) => {
    setBookingTrainer(trainer)
    setBookingDate("")
    setBookingTime("")
    setBookingMessage("")
    setBookingSuccess(null)
    setBookingError(null)
  }

  const closeBookingModal = () => {
    setBookingTrainer(null)
    setBookingDate("")
    setBookingTime("")
    setBookingMessage("")
    setBookingSuccess(null)
    setBookingError(null)
  }

  const handleBooking = async () => {
    if (!bookingTrainer || !bookingDate || !bookingTime) {
      setBookingError("Please select a date and time.")
      return
    }
    setBookingLoading(true)
    setBookingError(null)
    setBookingSuccess(null)
    try {
      const requestedDate = new Date(`${bookingDate}T${bookingTime}`)
      const res = await fetch("/api/training-session-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trainerId: bookingTrainer.id,
          requestedDate,
          message: bookingMessage
        })
      })
      if (res.ok) {
        setBookingSuccess("Request sent successfully!")
        fetchRequests()
        setTimeout(() => closeBookingModal(), 1500)
      } else {
        const data = await res.json()
        setBookingError(data.error || "Failed to send request.")
      }
    } catch {
      setBookingError("Failed to send request.")
    } finally {
      setBookingLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Trainer</h1>
          <p className="mt-1 text-gray-600">Connect with expert trainers to help you achieve your fitness goals</p>
        </div>

        {/* Previous Requests */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">My Training Session Requests</h2>
          {loadingRequests ? (
            <div className="text-gray-500">Loading requests...</div>
          ) : requests.length > 0 ? (
            <div className="space-y-2">
              {requests.map((req) => (
                <div key={req._id} className="bg-white rounded-md p-3 flex flex-col md:flex-row md:items-center md:justify-between border border-gray-100">
                  <div>
                    <span className="font-medium text-blue-700">{req.trainer?.name || "Trainer"}</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-gray-700">{new Date(req.requestedDate).toLocaleString()}</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${req.status === "pending" ? "bg-yellow-100 text-yellow-800" : req.status === "accepted" ? "bg-green-100 text-green-800" : req.status === "rejected" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                  </div>
                  {req.message && <div className="text-gray-500 mt-1 md:mt-0 md:ml-4">Message: {req.message}</div>}
                  {req.responseMessage && <div className="text-green-700 mt-1 md:mt-0 md:ml-4">Trainer: {req.responseMessage}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No requests yet.</div>
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading trainers...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {/* Trainers List */}
        {!isLoading && !error && filteredTrainers.length > 0 ? (
          <div className="space-y-6">
            {filteredTrainers.map((trainer) => (
              <div key={trainer.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className={`h-48 w-48 rounded-lg overflow-hidden relative flex items-center justify-center text-white text-4xl font-bold ${getColorFromName(trainer.name)}`}>
                        {getInitials(trainer.name)}
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
                          <span className="ml-1 text-gray-900 font-medium">{trainer.rating?.toFixed(1) || "New"}</span>
                          {trainer.reviews && <span className="ml-1 text-gray-500">({trainer.reviews} reviews)</span>}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Award className="h-5 w-5 text-blue-600 mr-1" />
                          <span>{trainer.experience}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-5 w-5 text-blue-600 mr-1" />
                          <span>{trainer.location || "Flexible location"}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Price:</span> {trainer.price || "Contact for pricing"}
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
                          <span className="font-medium">Available:</span> {trainer.availableHours}
                        </p>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => openBookingModal(trainer)}
                            className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md bg-white hover:bg-blue-50 text-sm font-semibold"
                          >
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            Book Session
                          </button>
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
                    
                    {trainer.education && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900">Education</h4>
                        <p className="text-gray-700">{trainer.education}</p>
                      </div>
                    )}

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
        ) : !isLoading && !error ? (
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
        ) : null}

        {/* Booking Modal */}
        {bookingTrainer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
              <button onClick={closeBookingModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Session with {bookingTrainer.name}</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={e => setBookingTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                <textarea
                  value={bookingMessage}
                  onChange={e => setBookingMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Let the trainer know your goals or preferences"
                />
              </div>
              {bookingError && <div className="text-red-600 mb-2">{bookingError}</div>}
              {bookingSuccess && <div className="text-green-600 mb-2">{bookingSuccess}</div>}
              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {bookingLoading ? "Sending..." : "Send Request"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

