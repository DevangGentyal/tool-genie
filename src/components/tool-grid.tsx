import { Tool } from "@/types/tool"
import { ToolCard } from "./tool-card"

interface ToolGridProps {
  tools: Tool[]
  maxTools?: number
}

export function ToolGrid({ tools, maxTools = 4 }: ToolGridProps) {
  const displayTools = tools.slice(0, maxTools)

  return (
    <div className="grid xl:grid-cols-4 gap-12 w-full pt-10">
      {displayTools.map((tool) => (
        <ToolCard 
          key={tool.id} 
          tool={tool}
          className="h-full"
        />
      ))}
    </div>
  )
}

