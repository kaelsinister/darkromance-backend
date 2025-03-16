"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        {/* Page Title */}
        <h1 className="text-4xl text-red-400 font-bold mb-6 tracking-wide">
          Contact Us
        </h1>

        {/* Content Container */}
        <div className="bg-gray-900 p-8 max-w-3xl w-full rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-red-400 mb-4 text-center">
            Have questions or need support? Reach out to us!
          </h2>

          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-1">Your Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded focus:ring-2 focus:ring-red-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Your Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded focus:ring-2 focus:ring-red-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Message:</label>
              <textarea
                placeholder="Type your message..."
                className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded focus:ring-2 focus:ring-red-400 transition h-32"
              ></textarea>
            </div>

            <button
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-transform duration-200 ease-in-out"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
