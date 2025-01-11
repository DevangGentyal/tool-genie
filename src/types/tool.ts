export interface Tool {
  id: number
  name: string
  description: string
  features: string[]
  pricing: "Free" | "Freemium" | "Paid" | "Unknown"
  icon: string
  category: string
  tags?: string[]
  rating?: number
  onViewDetails?: () => void
  className?: string
}

export interface SearchFilters {
  categories?: string[]
  pricing?: string[]
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  tags?: string[]
} 