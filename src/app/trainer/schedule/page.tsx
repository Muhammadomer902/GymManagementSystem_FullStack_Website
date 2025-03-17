"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Filter, ChevronDown, ChevronUp } from "lucide-react"

// Mock data for sessions
const sessions = [
  {
    id: 1,
    trainee: "John Smith",
    date: "2023-11-20",
    time: "08:00 AM",
    duration: "60 min",
    type: "Strength Training",
    location: "Main Gym Floor",
  },
  {
    id: 2,
    trainee: "Emily Johnson",
    date: "2023-11-20",
    time: "10:00 AM",
    duration: "45 min",
    type: "Weight Loss",
    location: "Studio 2",
  },
  {
    id: 3,
    trainee: "Michael Brown",
    date: "2023-11-21",
    time: "09:00 AM",
    duration: "60 min",
    type: "Muscle Building",
    location: "Weight Room",
  },
  {
    id: 4,
    trainee: "Sarah Davis",
    date: "2023-11-21",
    time: "11:00 AM",
    duration: "30 min",
    type: "Fitness Assessment",
    location: "Office",
  },
  {
    id: 5,
    trainee: "David Wilson",
    date: "2023-11-22",
    time: "02:00 PM",
    duration: "60 min",
    type: "Strength Training",
    location: "Main Gym Floor",
  },
  {
    id: 6,
    trainee: "Jennifer Lee",
    date: "2023-11-22",
    time: "04:00 PM",
    duration: "45 min",
    type: "Yoga",
    location: "Studio 1",
  },
  {
    id: 7,
    trainee: "Robert Taylor",
    date: "2023-11-23",
    time: "10:00 AM",
    duration: "60 min",
    type: "Cardio",
    location: "Cardio Area",
  },
  {
    id: 8,
    trainee: "Amanda Martinez",
    date: "2023-11-24",
    time: "01:00 PM",
    duration: "45 min",
    type: "Flexibility",
    location: "Studio 2",
  },
]

// Generate dates for the current week
const generateWeekDates = (currentDate: Date) => {
  const dates = []
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()) // Start from Sunday

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    dates.push(date)
  }

  return dates
}

// Format date to YYYY-MM-DD
const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0]
}

// Get sessions for a specific date
const getSessionsForDate = (date: string) => {
  return sessions.filter((session) => session.date === date)
}

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    sessionType: "all",
    location: "all",
  })

  const weekDates = generateWeekDates(currentDate)

  const navigatePreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const navigateNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  // Get unique session types and locations for filters
  const sessionTypes = ["all", ...new Set(sessions.map((session) => session.type))]
  const locations = ["all", ...new Set(sessions.map((session) => session.location))]

  // Filter sessions based on selected filters
  const filterSessions = (sessions: any[]) => {
    return sessions.filter(
      (session) =>
        (filters.sessionType === "all" || session.type === filters.sessionType) &&
        (filters.location === "all" || session.location === filters.location),
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Training Schedule</h1>
          <p className="mt-1 text-gray-600">Manage your upcoming training sessions</p>
        </div>

        {/* Filter and Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center">
              <button onClick={navigatePreviousWeek} className="p-2 rounded-md hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="mx-4 text-lg font-medium text-gray-900">
                {weekDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                {weekDates[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
              <button onClick={navigateNextWeek} className="p-2 rounded-md hover:bg-gray-100">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
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
                <label htmlFor="session-type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Session Type
                </label>
                <select
                  id="session-type-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filters.sessionType}
                  onChange={(e) => setFilters({ ...filters, sessionType: e.target.value })}
                >
                  {sessionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "all" ? "All Session Types" : type}
                    </option>
                  ))}
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
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Weekly Calendar */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-7 border-b border-gray-200">
            {weekDates.map((date, index) => {
              const isToday = new Date().toDateString() === date.toDateString()
              return (
                <div key={index} className={`py-3 text-center ${isToday ? "bg-blue-50" : ""}`}>
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <p className={`text-lg font-semibold ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                    {date.getDate()}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-7 divide-x divide-gray-200 min-h-[500px]">
            {weekDates.map((date, index) => {
              const dateStr = formatDate(date)
              const daysSessions = getSessionsForDate(dateStr)
              const filteredSessions = filterSessions(daysSessions)

              return (
                <div key={index} className="p-2 overflow-y-auto max-h-[500px]">
                  {filteredSessions.length > 0 ? (
                    <div className="space-y-2">
                      {filteredSessions.map((session) => (
                        <Link
                          key={session.id}
                          href={`/trainer/trainees/${session.id}`}
                          className="block p-2 rounded-md border border-gray-200 hover:bg-gray-50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{session.time}</span>
                            <span className="text-xs text-gray-500">{session.duration}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-800 mb-1">{session.trainee}</p>
                          <p className="text-xs text-gray-600">{session.type}</p>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {session.location}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-sm text-gray-400">No sessions</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* List View of Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Sessions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filterSessions(sessions).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{session.trainee}</h3>
                        <p className="text-sm text-gray-500">{session.type}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          {new Date(session.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          at {session.time}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {session.duration}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <MapPin className="h-3 w-3 mr-1" />
                        {session.location}
                      </span>
                    </div>
                  </div>
                  <Link href={`/trainer/trainees/${session.id}`} className="ml-4 p-2 text-gray-400 hover:text-gray-500">
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

