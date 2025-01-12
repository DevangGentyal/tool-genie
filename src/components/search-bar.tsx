"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Tool } from "@/types/tool"
import { mockTools } from "@/data/mock-tools"
import { ToolCard } from "./tool-card"

interface QueryResponse {
  app_query_analysis: {
    user_query: string;
    attributes: {
      name: string;
      description: string;
      pricing: string;
      platform: string;
      category: string;
      features: string[];
      target_audience: string;
      keywords: string[];
    };
    optimized_search_request: string;
  }
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [matchedTools, setMatchedTools] = useState<Tool[]>([])
  const [searched, setSearched] = useState(false)

  const findMatchingTools = (response: QueryResponse): Tool[] => {
    const { attributes } = response.app_query_analysis;
    
    return mockTools.filter(tool => {
      // Score system for matching
      let score = 0;
      
      // Category match (high priority)
      if (tool.category.toLowerCase() === attributes.category.toLowerCase()) {
        score += 3;
      }

      // Keywords match
      const commonKeywords = tool.keywords.filter(keyword => 
        attributes.keywords.includes(keyword)
      );
      score += commonKeywords.length;

      // Platform match
      const toolPlatforms = tool.platform.toLowerCase().split(", ");
      const responsePlatforms = attributes.platform.toLowerCase().split(", ");
      const commonPlatforms = toolPlatforms.filter(platform => 
        responsePlatforms.includes(platform)
      );
      score += commonPlatforms.length;

      // Features match
      const commonFeatures = tool.features.filter(feature =>
        attributes.features.some(f => 
          f.toLowerCase().includes(feature.toLowerCase())
        )
      );
      score += commonFeatures.length * 0.5;

      return score >= 3; // Threshold for considering it a match
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Clear previous results
    setMatchedTools([])
    setSearched(false)

    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      const data = await response.json();
      const parsedResponse = JSON.parse(data);
      const matches = findMatchingTools(parsedResponse);
      setMatchedTools(matches);
      setSearched(true);
    } catch (error) {
      console.error("Error processing search:", error)
      setSearched(true); // Show "no results" message even on error
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

      {searched && (
        <div className="space-y-6">
          {matchedTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchedTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center bg-black bg-opacity-30">
              <p className="text-lg text-purple-400">No matching tools found in our database.</p>
              <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms or check back later for new additions.</p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
