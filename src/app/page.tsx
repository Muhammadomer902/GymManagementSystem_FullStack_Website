import Link from "next/link"
import { ArrowRight, CheckCircle, Dumbbell, Users, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Transform Your Body, Transform Your Life
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Join FitHub today and start your fitness journey with the best trainers and facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Choose FitHub?</h2>
            <p className="mt-4 text-xl text-gray-600">We offer everything you need to achieve your fitness goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">State-of-the-Art Equipment</h3>
              <p className="text-gray-600">
                Access to the latest fitness equipment and technology to maximize your workout efficiency.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Trainers</h3>
              <p className="text-gray-600">
                Our certified trainers create personalized plans to help you reach your goals faster.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">
                Join thousands of members who have successfully transformed their bodies with FitHub.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Membership Plans</h2>
            <p className="mt-4 text-xl text-gray-600">Choose the plan that fits your lifestyle and goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                $29<span className="text-lg text-gray-500">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Access to gym facilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic workout plans</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Locker room access</span>
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full text-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition duration-300"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-blue-600 relative transform scale-105">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                $49<span className="text-lg text-gray-500">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>All Basic features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>1 personal training session/month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Access to all group classes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Nutrition guidance</span>
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Elite</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                $89<span className="text-lg text-gray-500">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>All Premium features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>4 personal training sessions/month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Customized nutrition plan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Priority booking for classes</span>
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full text-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What Our Members Say</h2>
            <p className="mt-4 text-xl text-gray-600">Real results from real people.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">John D.</h4>
                  <p className="text-gray-600">Member for 2 years</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "FitHub completely changed my approach to fitness. The trainers are knowledgeable and the community is
                so supportive. I've lost 30 pounds and feel better than ever!"
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Sarah M.</h4>
                  <p className="text-gray-600">Member for 1 year</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The personalized training plans have been a game-changer for me. I've seen more progress in 6 months at
                FitHub than I did in years at other gyms."
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Robert T.</h4>
                  <p className="text-gray-600">Member for 3 years</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As someone who was intimidated by gyms, FitHub's welcoming atmosphere made all the difference. The
                staff is friendly and the facilities are always clean and well-maintained."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join FitHub today and take the first step towards a healthier, stronger you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition duration-300"
            >
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

