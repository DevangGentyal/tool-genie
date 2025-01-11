"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check, ExternalLink, Heart } from 'lucide-react'
import { useState } from "react"
import { Tool } from "@/types/tool"

interface ToolCardProps {
  tool: Tool
  className?: string
}

export function ToolCard({ tool, className = "" }: ToolCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className={`w-full max-w-md bg-black bg-opacity-30 text-white border-purple-500 border-opacity-20 p-4 ${className}`}>
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="space-y-1 w-full sm:basis-1/4 sm:flex-shrink-0">
            <img
              src={tool.icon}
              alt={tool.name}
              className="w-fill h-fill  rounded"
            />
          </div>
          <div className="flex flex-col space-y-1 w-full sm:basis-3/4 ">
            <div className="flex flex-col flex-wrap items-start gap-1">
              <h3 className="font-semibold text-lg">{tool.name}</h3>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                {tool.pricing}
              </Badge>
            </div>
            {/* <p className="text-sm text-gray-400 line-clamp-2">{tool.description}</p> */}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tool.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
              <Check className="w-4 h-4 flex-shrink-0 text-purple-500" />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between items-center py-5">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-purple-500 text-purple-500" : ""}`} />
        </Button>
        <Button
          variant="ghost"
          className="text-white hover:bg-purple-500/10 hover:text-purple-400 flex items-center"
          onClick={tool.onViewDetails}
        >
          <span className="sr-only sm:not-sr-only text-sm">View Details</span>
          <ExternalLink className="w-4 h-4 sm:ml-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}

