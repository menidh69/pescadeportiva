import type { FishingSpot } from '~/types/fishing'

export function useSelectedSpot() {
  const selectedSpot = useState<FishingSpot | null>('selectedSpot', () => null)

  const select = (spot: FishingSpot) => {
    selectedSpot.value = spot
  }

  const clear = () => {
    selectedSpot.value = null
  }

  return { selectedSpot, select, clear }
}
