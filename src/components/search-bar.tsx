"use client";

import { cache, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tool } from "@/types/tool";
import { mockTools } from "@/data/mock-tools";
import { ToolCard } from "./tool-card";

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
  };
}

interface SearchResultItem {
  title: string;
  link: string;
  snippet: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [matchedTools, setMatchedTools] = useState<Tool[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState("");

  const queryProcessor = async () => {
    // Processing User query using NLP (groq)
    let processedQuery;
    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query, systemMsg: `You are an expert API specializing in analyzing raw natural language search queries for mobile applications. 
                        Your task is to decode user requests, identify their key attributes, and provide a structured response. 
                        The response should include a field called "optimized_search_request," which contains a professionally crafted 
                        Google search query designed to yield optimal results for matching apps. 
                        Note that while user refers for app they may be requesting for webapps 90% of the time. Also I want the response only as acceptable JSON object no other text like header or footer.
                        Your output should follow the JSON schema below: 
                        {
                            "app_query_analysis": {
                            "user_query": "i want an app for creating images using AI",
                            "attributes": {
                                "name": "Name of the app else null",
                                "description": "Description about the app if mentioned else null ex. (chat gpt, ideogram, sora, etc.)",
                                "pricing": "Freemium",
                                "platform": "Web, iOS, Android",
                                "category": "Text-to-Image",
                                "features": ["Image Generation", "Art Generation", "Text to Image"],
                                "target_audience": "Students, Professionals, Content Creators, Editors"
                                "keywords": ["TextToImage", "ImageGenerator", "ImageGen", "ArtGenerator", "AIImageGenerator"],
                            },
                            "optimized_search_request": "this will be a prompt which you will generate. which will act as a search query in for getting the exact tools required by user. Optimized with keywords for finding the desired apps"
                            }
                        }`
        }),
      });

      const data = await response.json();
      processedQuery = JSON.parse(data);
    } catch (error) {
      processedQuery = null;
      console.error("Error processing search:", error);
      setSearched(true); // Show "no results" message even on error
    } finally {
      setLoading(false);
    }
    return processedQuery;
  };

  const databaseSearcher = (input: QueryResponse): Tool[] => {
    const { attributes } = input.app_query_analysis;

    // Ensure attributes are defined
    if (!attributes) return [];

    return mockTools.filter((tool) => {
      // Score system for matching
      let score = 0;

      // Category match (high priority)
      if (tool.category?.toLowerCase() === attributes.category?.toLowerCase()) {
        score += 3;
      }

      // Keywords match
      const commonKeywords = tool.keywords.filter((keyword) =>
        attributes.keywords?.includes(keyword)
      );
      score += commonKeywords.length;

      // Platform match
      const toolPlatforms = tool.platform?.toLowerCase().split(", ") || [];
      const responsePlatforms = attributes.platform
        ? attributes.platform.toLowerCase().split(", ")
        : [];
      const commonPlatforms = toolPlatforms.filter((platform) =>
        responsePlatforms.includes(platform)
      );
      score += commonPlatforms.length;

      // Features match
      const commonFeatures = tool.features.filter((feature) =>
        attributes.features?.some(
          (f) => f && f.toLowerCase().includes(feature.toLowerCase())
        )
      );
      score += commonFeatures.length * 0.5;

      return score >= 3; // Threshold for considering it a match
    });
  };

  const webSearcher = async (input: QueryResponse) => {
    const { optimized_search_request } = input.app_query_analysis;
    if (!optimized_search_request) return null;

    let responseData;
    try {
      const response = await fetch("/api/google_search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(optimized_search_request),
      });

      responseData = await response.json();

    } catch (error) {
      responseData = null;
      console.error("Error processing search:", error);
      setSearched(true); // Show "no results" message even on error
    } finally {
      setLoading(false);
    }
    return responseData;
  };

  const webCrawler = async (webreuslts: { results: { title: string; snippet: string; link: string }[] }) => {
    if (!webreuslts || !webreuslts.results || webreuslts.results.length === 0) {
      console.error("No web results provided to the crawler.");
      return;
    }
    // Serialize web results to a JSON string
    const webResultsString = JSON.stringify(webreuslts.results);

    // Give the results for NLP (groq)
    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: webResultsString, // Send the JSON array directly
          systemMsg: `Okay, I have sent you a list of Web Search Results for a particular app. I want you to go through the Title, Snippet, and Link and classify each website based on these 3 types:
          Category 1: Pages listing multiple apps (e.g., "Top 10 apps for video generation").
          Category 2: Pages with a single app’s detailed information.
          Category 3: General articles or blogs with some references to apps.
          ------
          I want you to give me the response in the same format I provide you as a query, but additionally add a field as category and add the number of the category that website belongs to.`,
        }),
      });

      const data = await response.json();
      console.log("NLP Processed Data:", data);

      // Further logic to process data...
    } catch (error) {
      console.error("Error in sending data to /api/groq:", error);
    }

    // Scrape the data from Type 1 Websites (Exact Website)
    // Implement scraping logic for Type 1...

    // Recursively Scrape the data from Type 2 Websites (Redirective Website)
    // Implement scraping logic for Type 2...

    // Intelligently Scrape the data from Type 3 Websites (Mixed Content Website)
    // Implement scraping logic for Type 3...
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Clear previous results
    setMatchedTools([]);
    setSearched(false);
    setLoading(true);

    try {
      // Process Users Query
      const parsedResponse = await queryProcessor();

      if (parsedResponse != null) {
        // Search for tools in DB
        let matches = databaseSearcher(parsedResponse);

        if (matches.length > 0) {
          // Set Matched tools and display
          setMatchedTools(matches);
          setSearched(true);
        } else {
          try {
            // Perform a web search and get results
            let webSearchResults = await webSearcher(parsedResponse);

            // Ensure there are results before accessing them
            if (webSearchResults?.results?.length > 0) {
              setTemp(webSearchResults.results[0].title); // Set the first result's title
            } else {
              console.error("No results found in web search.");
              return; // Exit early if no results
            }

            // Pass the search results to the webCrawler function
            webCrawler(webSearchResults);
          } catch (error) {
            console.error("An error occurred:", error);
          }

          setMatchedTools(matches);
          setSearched(true);
        }
      }
    } catch (error) {
      console.error("Error processing search:", error);
      setSearched(true); // Show "no results" message even on error
    } finally {
      setLoading(false);
    }
  };

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
          className={`bg-purple-500 rounded-r-full px-8 ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      {searched && (
        <div className="space-y-6">
          <div><h1>{temp}</h1></div>
          {matchedTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchedTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center bg-black bg-opacity-30">
              <p className="text-lg text-purple-400">
                No matching tools found in our database.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try adjusting your search terms or check back later for new
                additions.
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
