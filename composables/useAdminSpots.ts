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
  const { $db } = useNuxtApp()
  const spots = useState<FishingSpot[]>('admin_spots', () => [])
  const loading = useState<boolean>('admin_spots_loading', () => false)

  const fetchAllSpots = async () => {
    loading.value = true
    const snapshot = await getDocs(collection($db as any, 'fishing_spots'))
    spots.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as FishingSpot[]
    loading.value = false
  }

  const createSpot = async (data: Omit<FishingSpot, 'id'>) => {
    await addDoc(collection($db as any, 'fishing_spots'), data)
    await fetchAllSpots()
  }

  const updateSpot = async (id: string, data: Partial<Omit<FishingSpot, 'id'>>) => {
    await updateDoc(doc($db as any, 'fishing_spots', id), data)
    await fetchAllSpots()
  }

  const deleteSpot = async (id: string) => {
    await deleteDoc(doc($db as any, 'fishing_spots', id))
    await fetchAllSpots()
  }

  return { spots, loading, fetchAllSpots, createSpot, updateSpot, deleteSpot }
}
