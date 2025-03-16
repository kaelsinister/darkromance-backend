export default function Footer() {
    return (
      <footer className="w-full bg-black text-gray-400 py-6 border-t border-gray-700">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          {/* Left Section */}
          <p className="text-sm">
            © {new Date().getFullYear()} DarkRomance.ai - All Rights Reserved.
          </p>
  
          {/* Center Section */}
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a href="/how-it-works" className="hover:text-red-400 transition">
              How It Works
            </a>
            <a href="/pricing" className="hover:text-red-400 transition">
              Pricing
            </a>
            <a href="/faq" className="hover:text-red-400 transition">
              FAQ
            </a>
            <a href="/contact" className="hover:text-red-400 transition">
              Contact
            </a>
          </nav>
  
          {/* Right Section */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    );
  }
  