"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        {/* Page Title */}
        <h1 className="text-4xl text-red-400 font-bold mb-6 tracking-wide">
          Pricing Plans
        </h1>

        {/* Content Container */}
        <div className="bg-gray-900 p-8 max-w-3xl w-full rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-red-400 mb-4 text-center">
            Choose the Perfect Plan for Your Dark Romance Experience
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="text-2xl font-bold text-red-400 mb-3">Free Tier</h3>
              <p className="text-gray-400">Try DarkRomance.ai for free.</p>
              <ul className="mt-4 text-gray-300 text-sm space-y-2">
                <li>✔ 3 short stories per month</li>
                <li>✔ Minimal spice</li>
                <li>✔ No customization</li>
                <li>✔ No story saving</li>
              </ul>
              <p className="mt-4 font-bold text-gray-200">💰 $0 / month</p>
            </div>

            {/* Basic Plan */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="text-2xl font-bold text-red-400 mb-3">Basic</h3>
              <p className="text-gray-400">Unlock deeper storytelling.</p>
              <ul className="mt-4 text-gray-300 text-sm space-y-2">
                <li>✔ 10 stories per month</li>
                <li>✔ Medium spice level</li>
                <li>✔ Basic customization</li>
              </ul>
              <p className="mt-4 font-bold text-gray-200">💰 $7 / month</p>
            </div>

            {/* Premium Plan */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="text-2xl font-bold text-red-400 mb-3">Premium</h3>
              <p className="text-gray-400">Fully customizable romance.</p>
              <ul className="mt-4 text-gray-300 text-sm space-y-2">
                <li>✔ 30 stories per month</li>
                <li>✔ High spice level</li>
                <li>✔ Full customization options</li>
              </ul>
              <p className="mt-4 font-bold text-gray-200">💰 $12 / month</p>
            </div>

            {/* Unlimited Plan */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="text-2xl font-bold text-red-400 mb-3">Unlimited</h3>
              <p className="text-gray-400">Endless dark romance.</p>
              <ul className="mt-4 text-gray-300 text-sm space-y-2">
                <li>✔ Unlimited story generation</li>
                <li>✔ AI-assisted story editing</li>
                <li>✔ Priority access</li>
              </ul>
              <p className="mt-4 font-bold text-gray-200">💰 $30 / month</p>
            </div>
          </div>

          {/* Pay-Per-Story Option */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 mt-8 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-red-400 mb-3">Pay-Per-Story</h3>
            <p className="text-gray-400">
              Not ready to commit? Buy individual stories.
            </p>
            <ul className="mt-4 text-gray-300 text-sm space-y-2">
              <li>✔ One-time purchases</li>
              <li>✔ Works for non-subscribers</li>
              <li>✔ Fully customizable</li>
            </ul>
            <p className="mt-4 font-bold text-gray-200">💰 Price per story: TBD</p>
          </div>

          <p className="text-gray-500 text-sm mt-8 italic">
            Prices may be subject to change. Subscriptions renew monthly.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
