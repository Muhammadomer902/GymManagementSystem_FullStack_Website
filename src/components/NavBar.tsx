"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  User,
  LogOut,
  Dumbbell,
  ChevronDown,
  Bell,
  Calendar,
  ClipboardList,
  CreditCard,
  MessageSquare,
  Home,
  LogIn,
  UserPlus,
} from "lucide-react"

// This would come from your authentication system
const determineUserRole = (pathname: string | null) => {
  // For demo purposes, we'll determine role based on URL path
  // In a real app, this would come from your auth context/API
  if (pathname?.startsWith("/admin/")) return "admin"
  if (pathname?.startsWith("/trainer/")) return "trainer"
  if (pathname?.startsWith("/user/")) return "user"
  return "public" // New role for unauthenticated users
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState<"admin" | "trainer" | "user" | "public">("public")
  const pathname = usePathname()

  useEffect(() => {
    setUserRole(determineUserRole(pathname))
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname?.startsWith(path) ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"
  }

  const renderNavLinks = () => {
    switch (userRole) {
      case "admin":
        return (
          <>
            <Link
              href="/admin/dashboard"
              className={`${isActive("/admin/dashboard")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/trainer-assignment"
              className={`${isActive("/admin/trainer-assignment")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Trainer Assignment
            </Link>
            <Link
              href="/admin/trainer-payment"
              className={`${isActive("/admin/trainer-payment")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Trainer Payments
            </Link>
            <Link
              href="/admin/user-fee"
              className={`${isActive("/admin/user-fee")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              User Fees
            </Link>
            <Link
              href="/admin/complaint-handling"
              className={`${isActive("/admin/complaint-handling")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Complaints
            </Link>
          </>
        )
      case "trainer":
        return (
          <>
            <Link
              href="/trainer/dashboard"
              className={`${isActive("/trainer/dashboard")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/trainer/trainees"
              className={`${isActive("/trainer/trainees")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              My Trainees
            </Link>
            <Link
              href="/trainer/tainee-request"
              className={`${isActive("/trainer/tainee-request")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Trainee Requests
            </Link>
            <Link
              href="/trainer/complaint"
              className={`${isActive("/trainer/complaint")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Submit Complaint
            </Link>
          </>
        )
      case "user":
        return (
          <>
            <Link
              href="/user/workout-plan"
              className={`${isActive("/user/workout-plan")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Workout Plans
            </Link>
            <Link
              href="/user/get-trainer"
              className={`${isActive("/user/get-trainer")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Find Trainers
            </Link>
            <Link
              href="/user/trainer-plan"
              className={`${isActive("/user/trainer-plan")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Training Plans
            </Link>
            <Link
              href="/user/payment"
              className={`${isActive("/user/payment")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Payments
            </Link>
            <Link
              href="/user/complaint"
              className={`${isActive("/user/complaint")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Submit Complaint
            </Link>
          </>
        )
      default: // public
        return (
          <>
            <Link href="/" className={`${isActive("/")} transition-colors duration-200`} onClick={closeMenu}>
              Home
            </Link>
            <Link href="/about" className={`${isActive("/about")} transition-colors duration-200`} onClick={closeMenu}>
              About
            </Link>
            <Link
              href="/classes"
              className={`${isActive("/classes")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Classes
            </Link>
            <Link
              href="/trainers"
              className={`${isActive("/trainers")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Trainers
            </Link>
            <Link
              href="/pricing"
              className={`${isActive("/pricing")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`${isActive("/contact")} transition-colors duration-200`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </>
        )
    }
  }

  // Render the right side of the navbar based on authentication status
  const renderAuthSection = () => {
    if (userRole === "public") {
      return (
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-primary font-medium flex items-center">
            <LogIn className="h-5 w-5 mr-1" />
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
          >
            <UserPlus className="h-5 w-5 mr-1" />
            Register
          </Link>
        </div>
      )
    }

    return (
      <>
        <div className="relative">
          <button className="p-1 rounded-full text-gray-500 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>
        </div>

        <div className="ml-4 relative flex-shrink-0 group">
          <div>
            <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                {userRole === "admin" ? "A" : userRole === "trainer" ? "T" : "U"}
              </div>
              <div className="ml-2 flex items-center text-left">
                <div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {userRole === "admin" ? "Admin User" : userRole === "trainer" ? "Trainer User" : "Gym Member"}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                </div>
                <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
              </div>
            </button>
          </div>
        </div>
      </>
    )
  }

  // Render mobile menu content based on authentication status
  const renderMobileMenuContent = () => {
    if (userRole === "public") {
      return (
        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link
            href="/"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
            onClick={closeMenu}
          >
            <Home className="mr-4 h-6 w-6 text-gray-500" />
            Home
          </Link>
          <Link
            href="/about"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
            onClick={closeMenu}
          >
            <User className="mr-4 h-6 w-6 text-gray-500" />
            About
          </Link>
          <Link
            href="/classes"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
            onClick={closeMenu}
          >
            <Calendar className="mr-4 h-6 w-6 text-gray-500" />
            Classes
          </Link>
          <Link
            href="/trainers"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
            onClick={closeMenu}
          >
            <Dumbbell className="mr-4 h-6 w-6 text-gray-500" />
            Trainers
          </Link>
          <Link
            href="/pricing"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
            onClick={closeMenu}
          >
            <CreditCard className="mr-4 h-6 w-6 text-gray-500" />
            Pricing
          </Link>
          <Link
            href="/contact"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
            onClick={closeMenu}
          >
            <MessageSquare className="mr-4 h-6 w-6 text-gray-500" />
            Contact
          </Link>

          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex flex-col space-y-3">
              <Link
                href="/login"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={closeMenu}
              >
                <LogIn className="mr-4 h-6 w-6 text-gray-500" />
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
                onClick={closeMenu}
              >
                <UserPlus className="mr-4 h-6 w-6 text-white" />
                Register
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="flex items-center px-4 py-2 border-b border-gray-200">
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            {userRole === "admin" ? "A" : userRole === "trainer" ? "T" : "U"}
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">
              {userRole === "admin" ? "Admin User" : userRole === "trainer" ? "Trainer User" : "Gym Member"}
            </div>
            <div className="text-sm font-medium text-gray-500">user@example.com</div>
          </div>
          <button className="ml-auto p-1 rounded-full text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link
            href={`/${userRole === "admin" ? "admin" : userRole === "trainer" ? "trainer" : "user"}/dashboard`}
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
            onClick={closeMenu}
          >
            <Home className="mr-4 h-6 w-6 text-gray-500" />
            Dashboard
          </Link>

          {userRole === "user" && (
            <>
              <Link
                href="/user/workout-plan"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={closeMenu}
              >
                <Calendar className="mr-4 h-6 w-6 text-gray-500" />
                Workout Plans
              </Link>
              <Link
                href="/user/get-trainer"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={closeMenu}
              >
                <Dumbbell className="mr-4 h-6 w-6 text-gray-500" />
                Find Trainers
              </Link>
              <Link
                href="/user/payment"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={closeMenu}
              >
                <CreditCard className="mr-4 h-6 w-6 text-gray-500" />
                Payments
              </Link>
            </>
          )}

          {userRole === "trainer" && (
            <>
              <Link
                href="/trainer/trainees"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={closeMenu}
              >
                <User className="mr-4 h-6 w-6 text-gray-500" />
                My Trainees
              </Link>
              <Link
                href="/trainer/tainee-request"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={closeMenu}
              >
                <ClipboardList className="mr-4 h-6 w-6 text-gray-500" />
                Trainee Requests
              </Link>
            </>
          )}

          {userRole === "admin" && (
            <>
              <Link
                href="/admin/trainer-assignment"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={closeMenu}
              >
                <Dumbbell className="mr-4 h-6 w-6 text-gray-500" />
                Trainer Assignment
              </Link>
              <Link
                href="/admin/user-fee"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={closeMenu}
              >
                <CreditCard className="mr-4 h-6 w-6 text-gray-500" />
                User Fees
              </Link>
            </>
          )}

          <Link
            href={`/${userRole}/complaint${userRole === "admin" ? "-handling" : ""}`}
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary"
            onClick={closeMenu}
          >
            <MessageSquare className="mr-4 h-6 w-6 text-gray-500" />
            {userRole === "admin" ? "Complaints" : "Submit Complaint"}
          </Link>

          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-primary cursor-pointer">
              <LogOut className="mr-4 h-6 w-6 text-gray-500" />
              Sign out
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Dumbbell className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FitHub</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">{renderNavLinks()}</div>
          </div>

          <div className="hidden md:flex md:items-center">{renderAuthSection()}</div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">{renderMobileMenuContent()}</div>
        </div>
      )}
    </nav>
  )
}

