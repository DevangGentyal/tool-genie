import Link from "next/link"
import { Logo } from "./ui/logo"

export function MainNav() {
  return (
    <header className="py-4 border-b border-gray-800">
      <nav className="container max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <Logo />
        <div className="flex gap-6">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/explore" className="text-gray-300 hover:text-white transition-colors">
            Explore
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}

