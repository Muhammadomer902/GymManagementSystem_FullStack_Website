import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Calendar, ArrowRight } from "lucide-react"

export default function ClassesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Our Classes</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover a variety of classes designed to help you reach your fitness goals, led by expert instructors.
            </p>
          </div>
        </div>
      </section>

      {/* Class Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Class Categories</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a wide range of classes to suit all fitness levels and interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="Cardio class" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cardio</h3>
                <p className="text-gray-600 mb-4">
                  High-energy classes designed to get your heart pumping and burn calories.
                </p>
                <Link
                  href="#cardio-classes"
                  className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
                >
                  View Classes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Strength training class"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Strength</h3>
                <p className="text-gray-600 mb-4">
                  Build muscle and increase your strength with our resistance training classes.
                </p>
                <Link
                  href="#strength-classes"
                  className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
                >
                  View Classes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Mind and body class"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mind & Body</h3>
                <p className="text-gray-600 mb-4">
                  Focus on flexibility, balance, and mental wellbeing with yoga and pilates.
                </p>
                <Link
                  href="#mind-body-classes"
                  className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
                >
                  View Classes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="HIIT class" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">HIIT</h3>
                <p className="text-gray-600 mb-4">
                  High-intensity interval training for maximum results in minimum time.
                </p>
                <Link href="#hiit-classes" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                  View Classes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cardio Classes */}
      <section id="cardio-classes" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Cardio Classes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Spin Class</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>45 minutes</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Max 20 participants</span>
                </div>
                <p className="text-gray-700 mb-4">
                  A high-energy indoor cycling workout that simulates an outdoor bike ride. Great for cardio and lower
                  body strength.
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <div>
                    <div>Monday, Wednesday, Friday: 6:00 AM, 5:30 PM</div>
                    <div>Saturday: 9:00 AM</div>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Zumba</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>60 minutes</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Max 25 participants</span>
                </div>
                <p className="text-gray-700 mb-4">
                  A dance fitness program that combines Latin and international music with dance moves. Fun and
                  effective for all fitness levels.
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <div>
                    <div>Tuesday, Thursday: 6:00 PM</div>
                    <div>Saturday: 10:30 AM</div>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kickboxing</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>50 minutes</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Max 15 participants</span>
                </div>
                <p className="text-gray-700 mb-4">
                  A high-energy workout that combines martial arts techniques with fast-paced cardio. Great for stress
                  relief and full-body fitness.
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <div>
                    <div>Monday, Wednesday: 7:00 PM</div>
                    <div>Saturday: 12:00 PM</div>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strength Classes */}
      <section id="strength-classes" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Strength Classes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">BodyPump</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>55 minutes</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Max 20 participants</span>
                </div>
                <p className="text-gray-700 mb-4">
                  A barbell workout that strengthens your entire body. This workout challenges all your major muscle
                  groups.
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <div>
                    <div>Tuesday, Thursday: 5:30 PM</div>
                    <div>Sunday: 10:00 AM</div>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Circuit Training</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>45 minutes</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Max 15 participants</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Move through a series of strength and cardio stations designed to build muscle and burn fat.
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <div>
                    <div>Monday, Wednesday, Friday: 12:00 PM</div>
                    <div>Saturday: 11:00 AM</div>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Core Strength</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>30 minutes</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Max 20 participants</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Focus on strengthening your core muscles with targeted exercises for abs, back, and obliques.
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <div>
                    <div>Tuesday, Thursday: 12:15 PM</div>
                    <div>Friday: 5:15 PM</div>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">Ready to Join a Class?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Sign up today and get your first class free!</p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition duration-300"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  )
}

