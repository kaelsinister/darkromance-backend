"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black shadow-md z-50 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-red-400 text-2xl font-bold tracking-wide">
        DarkRomance.ai
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="text-white text-2xl sm:text-xl p-2 focus:outline-none md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 text-white shadow-lg z-50 md:hidden">
          <ul className="flex flex-col space-y-3 p-4">
            <li><Link href="/" className="hover:text-red-400" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link href="/generator" className="hover:text-red-400" onClick={() => setMenuOpen(false)}>Generator</Link></li>
            <li><Link href="/how-it-works" className="hover:text-red-400" onClick={() => setMenuOpen(false)}>How It Works</Link></li>
            <li><Link href="/pricing" className="hover:text-red-400" onClick={() => setMenuOpen(false)}>Pricing</Link></li>
            <li><Link href="/faq" className="hover:text-red-400" onClick={() => setMenuOpen(false)}>FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-red-400" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-red-400 transition">Home</Link>
        <Link href="/generator" className="hover:text-red-400 transition">Generator</Link>
        <Link href="/how-it-works" className="hover:text-red-400 transition">How It Works</Link>
        <Link href="/pricing" className="hover:text-red-400 transition">Pricing</Link>
        <Link href="/faq" className="hover:text-red-400 transition">FAQ</Link>
        <Link href="/contact" className="hover:text-red-400 transition">Contact</Link>
      </div>
    </nav>
  );
}
