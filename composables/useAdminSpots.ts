import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import type { FishingSpot } from '~/types/fishing'

export function useAdminSpots() {
  const spots = useState<FishingSpot[]>('admin_spots', () => [])
  const loading = useState<boolean>('admin_spots_loading', () => false)
  const error = useState<string | null>('admin_spots_error', () => null)

  const fetchAllSpots = async () => {
    loading.value = true
    error.value = null
    try {
      const { $db } = useNuxtApp()
      const snapshot = await getDocs(collection($db as any, 'fishing_spots'))
      spots.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as FishingSpot[]
    } catch (err: any) {
      console.error('fetchAllSpots error:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createSpot = async (data: Omit<FishingSpot, 'id'>) => {
    const { $db } = useNuxtApp()
    await addDoc(collection($db as any, 'fishing_spots'), data)
    await fetchAllSpots()
  }

  const updateSpot = async (id: string, data: Partial<Omit<FishingSpot, 'id'>>) => {
    const { $db } = useNuxtApp()
    await updateDoc(doc($db as any, 'fishing_spots', id), data)
    await fetchAllSpots()
  }

  const deleteSpot = async (id: string) => {
    const { $db } = useNuxtApp()
    await deleteDoc(doc($db as any, 'fishing_spots', id))
    await fetchAllSpots()
  }

  return { spots, loading, error, fetchAllSpots, createSpot, updateSpot, deleteSpot }
}
