"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-gray-300 w-full fixed top-0 left-0 z-50 shadow-lg border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand Title */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-red-400 tracking-wide cursor-pointer">
            DarkRomance.ai
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col items-center justify-center w-12 h-12 border border-gray-600 rounded-md focus:outline-none transition-all"
        >
          {/* Icon: Three horizontal bars */}
          <span className="block w-7 h-0.5 bg-gray-300 mb-1 transition-all"></span>
          <span className="block w-7 h-0.5 bg-gray-300 mb-1 transition-all"></span>
          <span className="block w-7 h-0.5 bg-gray-300 transition-all"></span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <Link href="/" className="hover:text-red-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/generator" className="hover:text-red-400 transition">
              Generator
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-red-400 transition">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/how-it-works" className="hover:text-red-400 transition">
              How It Works
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-red-400 transition">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-red-400 transition">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 absolute top-full left-0 w-full shadow-lg z-40">
          <ul className="flex flex-col text-center py-4 space-y-4">
            <li>
              <Link href="/" className="block hover:text-red-400 transition" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/generator" className="block hover:text-red-400 transition" onClick={() => setIsOpen(false)}>
                Generator
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="block hover:text-red-400 transition" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="block hover:text-red-400 transition" onClick={() => setIsOpen(false)}>
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/faq" className="block hover:text-red-400 transition" onClick={() => setIsOpen(false)}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block hover:text-red-400 transition" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
