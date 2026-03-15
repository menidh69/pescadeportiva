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
  const nuxtApp = useNuxtApp()
  const spots = useState<FishingSpot[]>('admin_spots', () => [])
  const loading = useState<boolean>('admin_spots_loading', () => false)
  const error = useState<string | null>('admin_spots_error', () => null)

  const db = () => nuxtApp.$db as any

  const fetchAllSpots = async () => {
    loading.value = true
    error.value = null
    try {
      const snapshot = await getDocs(collection(db(), 'fishing_spots'))
      spots.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as FishingSpot[]
    } catch (err: any) {
      console.error('fetchAllSpots error:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createSpot = async (data: Omit<FishingSpot, 'id'>) => {
    await addDoc(collection(db(), 'fishing_spots'), data)
    await fetchAllSpots()
  }

  const updateSpot = async (id: string, data: Partial<Omit<FishingSpot, 'id'>>) => {
    await updateDoc(doc(db(), 'fishing_spots', id), data)
    await fetchAllSpots()
  }

  const deleteSpot = async (id: string) => {
    await deleteDoc(doc(db(), 'fishing_spots', id))
    await fetchAllSpots()
  }

  return { spots, loading, error, fetchAllSpots, createSpot, updateSpot, deleteSpot }
}
