"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [aiResponse, setAiResponse] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      const data = await response.json();
      setAiResponse(data);
    } catch (error) {
      console.error("Error processing search:", error)
    }
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

      {aiResponse && (
        <div className="mb-8 p-4 bg-black bg-opacity-30 rounded-lg">
          <pre className="whitespace-pre-wrap">{aiResponse}</pre>
        </div>
      )}
    </div>
  )
}
