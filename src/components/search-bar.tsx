"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Tool } from "@/types/tool"
import { ToolCard } from "./tool-card"
import { mockTools } from "@/data/mock-tools"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Tool[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Simple search in mock data
    const searchResults = mockTools.filter(tool => 
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase())
    )
    setResults(searchResults)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex mb-8">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search AI tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-black bg-opacity-30 border-2 border-purple-500 border-opacity-50 rounded-l-full"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 opacity-75" />
        </div>
        <Button 
          type="submit"
          className="bg-purple-500 rounded-r-full px-8"
        >
          Search
        </Button>
      </form>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
