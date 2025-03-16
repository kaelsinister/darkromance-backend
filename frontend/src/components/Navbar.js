"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-red-400 text-2xl font-bold">
          DarkRomance.ai
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-gray-300 text-lg">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/generator">Generator</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="/how-it-works">How It Works</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4 text-center">
          <ul className="space-y-4 text-gray-300 text-lg">
            <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/generator" onClick={() => setIsOpen(false)}>Generator</Link></li>
            <li><Link href="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link></li>
            <li><Link href="/how-it-works" onClick={() => setIsOpen(false)}>How It Works</Link></li>
            <li><Link href="/faq" onClick={() => setIsOpen(false)}>FAQ</Link></li>
            <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
