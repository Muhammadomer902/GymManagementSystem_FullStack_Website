"use client"

import { useState, useEffect } from "react"
import { User, Camera, Mail, User2, Key, Save, AlertCircle, CheckCircle, Calendar } from "lucide-react"
import Image from "next/image"

interface UserProfile {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
  memberProfile?: MemberProfile
  trainerProfile?: TrainerProfile
}

interface MemberProfile {
  weight?: number
  height?: number
  age?: number
  gender?: "male" | "female" | "other"
  bmi?: number
}

interface TrainerProfile {
  certifications?: string[]
  experienceYears?: number
}

export default function UserProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    weight: user?.memberProfile?.weight || "",
    height: user?.memberProfile?.height || "",
    age: user?.memberProfile?.age || "",
    gender: user?.memberProfile?.gender || "",
    bmi: user?.memberProfile?.bmi || "",
  })
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/users/me")
        
        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }
        
        const data = await response.json()
        setUser(data.user)
        setFormData({
          name: data.user.name,
          email: data.user.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          weight: data.user.memberProfile?.weight || "",
          height: data.user.memberProfile?.height || "",
          age: data.user.memberProfile?.age || "",
          gender: data.user.memberProfile?.gender || "",
          bmi: data.user.memberProfile?.bmi || "",
        })
        setLoading(false)
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError("Failed to load user data")
        setLoading(false)
      }
    }
    
    fetchUserData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "weight" || name === "height") {
      const newWeight = name === "weight" ? Number(value) : Number(formData.weight)
      const newHeight = name === "height" ? Number(value) : Number(formData.height)
      setFormData({
        ...formData,
        [name]: value,
        bmi: calculateBMI(newWeight, newHeight),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateBMI = (weight: number, height: number) => {
    if (!weight || !height) return ""
    const h = height / 100
    return (weight / (h * h)).toFixed(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setNotification({
        type: "error",
        message: "New passwords do not match",
      })
      return
    }
    
    if (formData.newPassword && !formData.currentPassword) {
      setNotification({
        type: "error",
        message: "Current password is required to set a new password",
      })
      return
    }
    
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        ...(formData.newPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
        memberProfile: {
          weight: Number(formData.weight),
          height: Number(formData.height),
          age: Number(formData.age),
          gender: formData.gender,
          bmi: Number(formData.bmi),
        },
      }
      
      const response = await fetch("/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile")
      }
      
      // Update user state with new data
      setUser(data.user)
      
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      
      setNotification({
        type: "success",
        message: "Profile updated successfully",
      })
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (err: any) {
      console.error("Error updating profile:", err)
      setNotification({
        type: "error",
        message: err.message || "Failed to update profile",
      })
    }
  }

  // Display loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading profile data...</p>
        </div>
      </div>
    )
  }

  // Display error state
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <AlertCircle className="h-8 w-8 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load profile</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-gray-600">View and edit your personal information</p>
        </div>

        {notification && (
          <div className={`mb-6 p-4 rounded-md ${notification.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
            <div className="flex items-center">
              {notification.type === "success" ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              <p>{notification.message}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Profile Image Section */}
            <div className="md:w-1/3 bg-gray-50 p-8 border-r border-gray-200 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-400">
                  {user?.name ? (
                    <span className="text-4xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
                  ) : (
                    <User className="h-12 w-12" />
                  )}
                </div>
                <button
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  title="Change profile picture"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h3>
              <p className="text-gray-500 mb-4">{user?.email}</p>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <User2 className="h-4 w-4 mr-2" />
                <span className="capitalize">{user?.role}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Member since {new Date(user?.createdAt || "").toLocaleDateString()}</span>
              </div>
            </div>

            {/* Edit Form Section */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            name="currentPassword"
                            id="currentPassword"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter current password"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter new password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Leave blank if you don't want to change your password.</p>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {user?.role === "user" && (
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Measurements</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                            Weight (kg)
                          </label>
                          <input
                            type="number"
                            name="weight"
                            id="weight"
                            className="block w-full border border-gray-300 rounded-md p-2"
                            value={formData.weight}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                            Height (cm)
                          </label>
                          <input
                            type="number"
                            name="height"
                            id="height"
                            className="block w-full border border-gray-300 rounded-md p-2"
                            value={formData.height}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                            Age
                          </label>
                          <input
                            type="number"
                            name="age"
                            id="age"
                            className="block w-full border border-gray-300 rounded-md p-2"
                            value={formData.age}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                          </label>
                          <select
                            name="gender"
                            id="gender"
                            className="block w-full border border-gray-300 rounded-md p-2"
                            value={formData.gender}
                            onChange={handleSelectChange}
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            BMI
                          </label>
                          <input
                            type="text"
                            name="bmi"
                            id="bmi"
                            className="block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                            value={formData.bmi}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 