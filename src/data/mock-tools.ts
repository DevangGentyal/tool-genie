import { Tool } from "@/types/tool"

export const mockTools: Tool[] = [
  {
    id: 1,
    name: "AI Writer Pro",
    description: "Advanced AI-powered writing assistant",
    features: ["Grammar correction", "Style suggestions", "Plagiarism check"],
    pricing: "Freemium" as const,
    icon: "/demo.png",
    category: "Writing"
  },
  {
    id: 2,
    name: "Video Generator",
    description: "Advanced AI-powered writing assistant",
    features: ["Grammar correction", "Style suggestions", "Plagiarism check"],
    pricing: "Freemium" as const,
    icon: "/demo.png",
    category: "Video"
  },
  {
    id: 3,
    name: "Image Generator",
    description: "Advanced AI-powered writing assistant",
    features: ["Grammar correction", "Style suggestions", "Plagiarism check"],
    pricing: "Freemium" as const,
    icon: "/demo.png",
    category: "Image"
  },
  {
    id: 4,
    name: "Voice Generator",
    description: "Advanced AI-powered writing assistant",
    features: ["Grammar correction", "Style suggestions", "Plagiarism check"],
    pricing: "Freemium" as const,
    icon: "/demo.png",
    category: "Voice"
  },
  // Add more mock tools...
] as const 