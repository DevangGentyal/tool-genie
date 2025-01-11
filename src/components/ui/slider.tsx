"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={className}
    {...props}
  >
    <SliderPrimitive.Track className="bg-gray-700 relative grow rounded-full h-2">
      <SliderPrimitive.Range className="absolute h-full bg-pink-500 rounded-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block w-4 h-4 bg-pink-500 rounded-full hover:bg-pink-600" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider } 