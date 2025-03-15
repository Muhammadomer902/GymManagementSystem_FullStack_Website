import Link from "next/link"
import { Dumbbell, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">FitHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate fitness companion. We provide top-notch gym facilities and personalized training programs to
              help you achieve your fitness goals.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-400">123 Fitness Street, Gym City</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-400">info@fithub.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-400 hover:text-primary flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-gray-400 hover:text-primary flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Trainers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-primary flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Working Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-gray-400">
                <span>Monday - Friday:</span>
                <span>6:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Saturday:</span>
                <span>7:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Sunday:</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Holidays:</span>
                <span>9:00 AM - 5:00 PM</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-semibold mb-2">Need Help?</h4>
              <Link
                href="/contact"
                className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to get the latest updates on classes, events, and promotions.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark transition-colors duration-300"
                  suppressHydrationWarning
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div>
              <h4 className="text-sm font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} FitHub. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-400 hover:text-primary text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-gray-400 hover:text-primary text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

