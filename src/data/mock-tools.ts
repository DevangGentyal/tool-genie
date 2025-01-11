import { Tool } from "@/types/tool"

export const mockTools: Tool[] = [
  {
    id: 1,
    name: "AI Writer Pro",
    description: "Advanced AI-powered writing assistant",
    pricing: "Freemium" as const,
    category: "Writing",
    features: ["Grammar correction", "Style suggestions", "Plagiarism check"],
    icon: "/demo.png",
    platform: "Web, iOS, Android",
    target_audience: "Writers, Students, Content Creators, Professionals"
  },
  {
    id: 2,
    name: "Video Generator",
    description: "Advanced AI-powered writing assistant",
    features: ["Grammar correction", "Style suggestions", "Plagiarism check"],
    pricing: "Freemium" as const,
    icon: "/demo.png",
    category: "Video",
    platform: "Web, iOS",
    target_audience: "Video Creators, Marketing Teams, Social Media Managers"
  },
  {
    id: 3,
    name: "Image Generator",
    description: "Advanced AI-powered writing assistant",
    features: ["Grammar correction", "Style suggestions", "Plagiarism check"],
    pricing: "Freemium" as const,
    icon: "/demo.png",
    category: "Image",
    platform: "Web",
    target_audience: "Designers, Artists, Content Creators, Marketing Teams"
  },
  {
    id: 4,
    name: "Voice Generator",
    description: "Advanced AI-powered writing assistant",
    features: ["Grammar correction", "Style suggestions", "Plagiarism check"],
    pricing: "Freemium" as const,
    icon: "/demo.png",
    category: "Voice",
    platform: "Web, Android",
    target_audience: "Voice Artists, Content Creators, Podcasters, Musicians"
  },
  // Add more mock tools...
] as const 