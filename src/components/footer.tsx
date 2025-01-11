import Link from "next/link"
import { Logo } from "./ui/logo"

export function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo />
            <p className="text-sm text-gray-400 mt-2">
              Discover the best AI tools for your needs
            </p>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/explore" className="text-sm text-gray-400 hover:text-white transition-colors">
              Explore
            </Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ToolGenie. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

