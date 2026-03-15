export interface FishingSpot {
  id: string
  name: string
  type: 'saltwater' | 'freshwater'
  subtype: 'beach' | 'lake' | 'river' | 'estuary'
  description: string
  lat: number
  lng: number
  species: string[]
  bestSeason: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  imageUrl?: string
  active: boolean
  tips?: string
  access?: string
}
