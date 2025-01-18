export interface Tool {
  id: number
  name: string
  description: string
  pricing: "Free" | "Freemium" | "Paid"
  category: string
  features: string[]
  icon: string
  platform: string
  target_audience: string
  keywords: string[]
  onViewDetails?: () => void
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