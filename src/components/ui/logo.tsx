"use client"

import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-12 h-12">
        <Image
          src="/favicon.png"
          alt="ToolGenie Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
      <span className="text-2xl font-bold text-white ml-2">ToolGenie</span>
    </Link>
  )
} 