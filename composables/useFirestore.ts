import { collection, getDocs, query, where } from 'firebase/firestore'
import type { FishingSpot } from '~/types/fishing'

// Fallback seed data in case Firestore is not configured yet
const SEED_SPOTS: FishingSpot[] = [
  {
    id: 'bahia-kino',
    name: 'Bahía de Kino',
    type: 'saltwater',
    subtype: 'beach',
    description: 'Una de las playas más hermosas de Sonora con aguas cristalinas del Mar de Cortés. Ideal para pescar pargo, cabrilla y huachinango desde la orilla o en lancha.',
    lat: 28.8205,
    lng: -111.9185,
    species: ['Pargo', 'Cabrilla', 'Huachinango', 'Corvina'],
    bestSeason: ['Primavera', 'Verano', 'Otoño'],
    difficulty: 'beginner',
    active: true,
    tips: 'Mejor pescar temprano por la mañana o al atardecer.',
    access: 'Carretera pavimentada desde Hermosillo, a 107 km.'
  },
  {
    id: 'puerto-peñasco',
    name: 'Puerto Peñasco',
    type: 'saltwater',
    subtype: 'beach',
    description: 'Conocido como "Rocky Point" por los estadounidenses. Excelente pesca de corvina, sierra y cabrilla. Las mareas extremas crean pozas naturales llenas de peces.',
    lat: 31.3176,
    lng: -113.5498,
    species: ['Corvina', 'Sierra', 'Cabrilla', 'Guitarra'],
    bestSeason: ['Primavera', 'Verano'],
    difficulty: 'beginner',
    active: true,
    tips: 'Consulta las tablas de mareas antes de ir. Las mareas bajas exponen zonas de pesca únicas.',
    access: 'Carretera de 4 carriles desde Sonoyta.'
  },
  {
    id: 'presa-abelardo',
    name: 'Presa Abelardo Rodríguez',
    type: 'freshwater',
    subtype: 'lake',
    description: 'El embalse más cercano a Hermosillo. Popular para pesca de lobina negra y tilapia. Las orillas arboladas ofrecen sombra y buenos puntos de pesca.',
    lat: 29.12,
    lng: -110.98,
    species: ['Lobina Negra', 'Tilapia', 'Carpa'],
    bestSeason: ['Otoño', 'Invierno', 'Primavera'],
    difficulty: 'beginner',
    active: true,
    tips: 'La lobina muerde bien en las mañanas de otoño con señuelos de superficie.',
    access: 'A 20 km al norte de Hermosillo por la carretera a Cucurpe.'
  },
  {
    id: 'guaymas',
    name: 'Guaymas - Empalme',
    type: 'saltwater',
    subtype: 'estuary',
    description: 'El puerto pesquero más importante de Sonora. Bahía de Guaymas ofrece pesca deportiva de alto nivel: marlin, dorado y pez vela en temporada.',
    lat: 27.9222,
    lng: -110.8964,
    species: ['Marlin', 'Dorado', 'Pez Vela', 'Atún', 'Cabrilla'],
    bestSeason: ['Verano', 'Otoño'],
    difficulty: 'advanced',
    active: true,
    tips: 'Renta lanchas con guías locales en el malecón. El dorado abunda en julio-agosto.',
    access: 'A 130 km al sur de Hermosillo por la carretera federal 15.'
  },
  {
    id: 'presa-alvaro-obregon',
    name: 'Presa Álvaro Obregón',
    type: 'freshwater',
    subtype: 'lake',
    description: 'La presa más grande de Sonora, conocida localmente como "Oviáchic". Famosa por la pesca de lobina de gran tamaño. Récords estatales de lobina han sido registrados aquí.',
    lat: 27.9,
    lng: -109.85,
    species: ['Lobina Negra', 'Lobina Boca Chica', 'Bagre', 'Tilapia'],
    bestSeason: ['Invierno', 'Primavera'],
    difficulty: 'intermediate',
    active: true,
    tips: 'Los mejores spots son cerca de las ramas sumergidas. Usa plasticos suaves en colores naturales.',
    access: 'Cerca de Ciudad Obregón, Cajeme. A 4 horas de Hermosillo.'
  },
  {
    id: 'bahia-lobos',
    name: 'Bahía Lobos',
    type: 'saltwater',
    subtype: 'beach',
    description: 'Playa virgen relativamente desconocida en el norte de Sonora. Aguas tranquilas y pesca abundante de corvina y pargo. Pocos turistas la conocen.',
    lat: 28.25,
    lng: -111.6,
    species: ['Corvina', 'Pargo', 'Mojarra', 'Lebrancho'],
    bestSeason: ['Primavera', 'Verano'],
    difficulty: 'intermediate',
    active: true,
    tips: 'Acceso por brecha. Lleva todo tu equipo y agua. Sin servicios en la zona.',
    access: 'Brecha desde la carretera Hermosillo-Bahía Kino. Requiere vehículo 4x4.'
  },
  {
    id: 'san-carlos',
    name: 'San Carlos',
    type: 'saltwater',
    subtype: 'beach',
    description: 'Marina de clase mundial con acceso al Mar de Cortés. Los acantilados volcánicos crean refugios ideales para cabrilla y pargo. Popular entre pescadores deportivos.',
    lat: 27.95,
    lng: -111.08,
    species: ['Cabrilla', 'Pargo', 'Dorado', 'Sierra'],
    bestSeason: ['Primavera', 'Verano', 'Otoño'],
    difficulty: 'intermediate',
    active: true,
    tips: 'La pesca en los acantilados de la bahía Algodones es excelente. Madrugada es mejor.',
    access: 'A 20 km de Guaymas por carretera pavimentada.'
  },
  {
    id: 'presa-el-novillo',
    name: 'Presa El Novillo',
    type: 'freshwater',
    subtype: 'lake',
    description: 'Embalse en la sierra sonorense rodeado de naturaleza exuberante. La pesca de lobina y bagre es excelente. El paisaje serrano hace la experiencia única.',
    lat: 28.7667,
    lng: -109.9,
    species: ['Lobina Negra', 'Bagre', 'Tilapia', 'Carpa'],
    bestSeason: ['Otoño', 'Invierno', 'Primavera'],
    difficulty: 'intermediate',
    active: true,
    tips: 'El nivel del agua varía según temporada. Verifica antes de ir.',
    access: 'Cerca de Moctezuma, Sonora. A unas 3 horas de Hermosillo.'
  }
]

// Shared state across components using useState
export function useFirestore() {
  const spots = useState<FishingSpot[]>('fishing_spots', () => [])
  const loading = useState<boolean>('fishing_spots_loading', () => false)
  const error = useState<string | null>('fishing_spots_error', () => null)

  const loadSpots = async () => {
    if (spots.value.length > 0) return // Already loaded

    loading.value = true
    error.value = null

    try {
      const nuxtApp = useNuxtApp()
      const $db = nuxtApp.$db

      if (!$db) {
        throw new Error('Firestore not initialized')
      }

      const q = query(
        collection($db as any, 'fishing_spots'),
        where('active', '==', true)
      )

      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        spots.value = SEED_SPOTS
      } else {
        spots.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as FishingSpot[]
      }
    } catch (err) {
      console.warn('Firestore unavailable, using local data:', err)
      spots.value = SEED_SPOTS
    } finally {
      loading.value = false
    }
  }

  return { spots, loading, error, loadSpots }
}
