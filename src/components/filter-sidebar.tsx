"use client"

import { useState } from "react"
import { Slider } from "./ui/slider"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 100])

  return (
    <div className="space-y-6 bg-gray-900 p-6 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {["Image Generation", "Text to Speech", "Chatbots", "Code Assistance"].map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox id={category} className="border-pink-500 text-pink-500" />
              <Label htmlFor={category} className="ml-2 text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <div className="space-y-2">
          {["API Access", "Custom Models", "Team Collaboration", "Analytics"].map((feature) => (
            <div key={feature} className="flex items-center">
              <Checkbox id={feature} className="border-pink-500 text-pink-500" />
              <Label htmlFor={feature} className="ml-2 text-sm">
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

