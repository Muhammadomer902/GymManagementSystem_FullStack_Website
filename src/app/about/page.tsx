import Image from "next/image"
import Link from "next/link"
import { Users, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">About FitHub</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're more than just a gym. We're a community dedicated to helping you achieve your fitness goals.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                FitHub was founded in 2015 with a simple mission: to create a fitness environment that welcomes
                everyone, regardless of their fitness level or background.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                What started as a small local gym has grown into a thriving community of fitness enthusiasts,
                professional trainers, and people just beginning their fitness journey.
              </p>
              <p className="text-lg text-gray-700">
                Today, we're proud to offer state-of-the-art facilities, expert guidance, and a supportive community
                that helps our members achieve results they never thought possible.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="FitHub gym interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Values</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at FitHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Passion</h3>
              <p className="text-gray-600">
                We're passionate about fitness and helping our members achieve their goals. This passion drives
                everything we do.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in the power of community to motivate, inspire, and support each member on their fitness
                journey.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in our facilities, our training programs, and our customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our expert trainers and staff are here to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative h-64 rounded-lg overflow-hidden shadow-sm mb-4">
                <Image src="/placeholder.svg?height=400&width=300" alt="Team member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Michael Johnson</h3>
              <p className="text-blue-600 font-medium">Founder & CEO</p>
            </div>

            <div className="text-center">
              <div className="relative h-64 rounded-lg overflow-hidden shadow-sm mb-4">
                <Image src="/placeholder.svg?height=400&width=300" alt="Team member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sarah Williams</h3>
              <p className="text-blue-600 font-medium">Head Trainer</p>
            </div>

            <div className="text-center">
              <div className="relative h-64 rounded-lg overflow-hidden shadow-sm mb-4">
                <Image src="/placeholder.svg?height=400&width=300" alt="Team member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">David Chen</h3>
              <p className="text-blue-600 font-medium">Nutrition Specialist</p>
            </div>

            <div className="text-center">
              <div className="relative h-64 rounded-lg overflow-hidden shadow-sm mb-4">
                <Image src="/placeholder.svg?height=400&width=300" alt="Team member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Emily Rodriguez</h3>
              <p className="text-blue-600 font-medium">Yoga Instructor</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">Join Our Community Today</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the FitHub difference and start your fitness journey with us.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition duration-300"
          >
            Become a Member
          </Link>
        </div>
      </section>
    </div>
  )
}

