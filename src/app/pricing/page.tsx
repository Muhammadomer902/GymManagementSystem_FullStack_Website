import Link from "next/link"
import { CheckCircle, X, ArrowRight } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Choose the plan that fits your fitness goals and budget. No hidden fees, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic</h2>
                <p className="text-gray-600 mb-6">Perfect for beginners looking to start their fitness journey.</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">$29</span>
                  <span className="text-xl text-gray-500 ml-2">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Access to gym facilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Basic workout plans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Locker room access</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-500">Personal training sessions</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-500">Group classes</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-500">Nutrition guidance</span>
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

            {/* Premium Plan */}
            <div className="bg-white rounded-lg border-2 border-blue-600 shadow-md relative transform scale-105 z-10">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">
                POPULAR
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium</h2>
                <p className="text-gray-600 mb-6">
                  Our most popular plan with a perfect balance of features and value.
                </p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">$49</span>
                  <span className="text-xl text-gray-500 ml-2">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Access to gym facilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Advanced workout plans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Locker room access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>1 personal training session/month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Access to all group classes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Basic nutrition guidance</span>
                  </li>
                </ul>

                <Link
                  href="/register"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Elite Plan */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Elite</h2>
                <p className="text-gray-600 mb-6">
                  The ultimate fitness experience with premium features and services.
                </p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">$89</span>
                  <span className="text-xl text-gray-500 ml-2">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Access to gym facilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Personalized workout plans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Premium locker room access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>4 personal training sessions/month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Priority booking for classes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Customized nutrition plan</span>
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
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Additional Services</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your membership with these premium services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personal Training</h3>
              <p className="text-gray-600 mb-4">
                One-on-one sessions with our expert trainers tailored to your specific goals.
              </p>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-gray-900">$50</span>
                <span className="text-lg text-gray-500 ml-2">/session</span>
              </div>
              <Link href="/contact" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nutrition Consultation</h3>
              <p className="text-gray-600 mb-4">
                Get a personalized nutrition plan designed by our certified nutritionists.
              </p>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-gray-900">$75</span>
                <span className="text-lg text-gray-500 ml-2">/session</span>
              </div>
              <Link href="/contact" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Body Composition Analysis</h3>
              <p className="text-gray-600 mb-4">
                Detailed analysis of your body composition with professional interpretation.
              </p>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-gray-900">$35</span>
                <span className="text-lg text-gray-500 ml-2">/session</span>
              </div>
              <Link href="/contact" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our membership plans.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Is there a signup fee?</h3>
                <p className="text-gray-700">
                  No, there are no signup fees or hidden costs. The price you see is the price you pay.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can I cancel my membership anytime?</h3>
                <p className="text-gray-700">
                  Yes, you can cancel your membership at any time. We require a 30-day notice for cancellations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Are there any discounts available?</h3>
                <p className="text-gray-700">
                  We offer discounts for students, seniors, and military personnel. We also have family plans available.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">What are your gym hours?</h3>
                <p className="text-gray-700">
                  Our gym is open Monday-Friday from 5:00 AM to 11:00 PM, Saturday from 7:00 AM to 9:00 PM, and Sunday
                  from 8:00 AM to 8:00 PM.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Can I freeze my membership?</h3>
                <p className="text-gray-700">
                  Yes, you can freeze your membership for up to 3 months per year due to medical reasons or extended
                  travel.
                </p>
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
            Join FitHub today and take the first step towards a healthier, stronger you.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}

