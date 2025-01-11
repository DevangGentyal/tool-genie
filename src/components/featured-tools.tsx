import { ToolGrid } from "./tool-grid"
import { mockTools } from "@/data/mock-tools"

export function FeaturedTools() {
  return (
    <section className="my-24 container mx-auto px-4">
      <h2 className="text-4xl font-semibold mb-8 text-center text-white-500 opacity-90">
        Featured Tools
      </h2>
      <ToolGrid tools={mockTools} maxTools={4} />
    </section>
  )
}

