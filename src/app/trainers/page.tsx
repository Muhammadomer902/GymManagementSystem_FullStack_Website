import Image from "next/image"
import Link from "next/link"
import { Star, Award, ArrowRight } from "lucide-react"

export default function TrainersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Our Expert Trainers</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Meet our team of certified fitness professionals dedicated to helping you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Trainers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Trainers</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our most experienced trainers with proven results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-80">
                <Image src="/placeholder.svg?height=600&width=400" alt="Trainer" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Alex Johnson</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </div>
                <p className="text-blue-600 font-medium mb-4">Strength & Conditioning Specialist</p>
                <p className="text-gray-700 mb-4">
                  With over 10 years of experience, Alex specializes in strength training and athletic performance. His
                  clients have seen remarkable improvements in strength, power, and overall fitness.
                </p>
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">Certified Strength and Conditioning Specialist (CSCS)</span>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Book a Session
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-80">
                <Image src="/placeholder.svg?height=600&width=400" alt="Trainer" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Sarah Martinez</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </div>
                <p className="text-blue-600 font-medium mb-4">Nutrition & Weight Loss Expert</p>
                <p className="text-gray-700 mb-4">
                  Sarah combines effective workout routines with personalized nutrition plans to help clients achieve
                  sustainable weight loss and improved health.
                </p>
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">Certified Nutrition Coach & Personal Trainer</span>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Book a Session
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-80">
                <Image src="/placeholder.svg?height=600&width=400" alt="Trainer" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Michael Chen</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </div>
                <p className="text-blue-600 font-medium mb-4">Yoga & Mobility Specialist</p>
                <p className="text-gray-700 mb-4">
                  Michael focuses on improving flexibility, mobility, and mind-body connection through yoga and
                  specialized mobility training.
                </p>
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">RYT-500 Yoga Instructor & Mobility Coach</span>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Book a Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Trainers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Trainers</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={`/placeholder.svg?height=300&width=250&text=Trainer ${i}`}
                    alt={`Trainer ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Trainer Name</h3>
                  <p className="text-blue-600 font-medium text-sm mb-2">Specialization</p>
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-gray-300 fill-current" />
                    <span className="text-gray-600 text-sm ml-1">(4.0)</span>
                  </div>
                  <Link
                    href={`/trainers/profile-${i}`}
                    className="text-blue-600 font-medium hover:text-blue-800 flex items-center text-sm"
                  >
                    View Profile
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Trainer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-xl p-8 md:p-12">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Are You a Fitness Professional?</h2>
                <p className="text-lg text-gray-700 mb-6 md:mb-0">
                  Join our team of expert trainers and grow your client base. We offer competitive rates and a
                  supportive environment.
                </p>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our trainers are ready to help you achieve your goals. Book a session today!
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

