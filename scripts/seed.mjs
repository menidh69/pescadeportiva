import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env manually
const envPath = resolve(__dirname, '../.env')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map(s => s.trim()))
)

const firebaseConfig = {
  apiKey: env.NUXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NUXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const spots = [
  {
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
    name: 'Puerto Peñasco',
    type: 'saltwater',
    subtype: 'beach',
    description: 'Conocido como "Rocky Point". Excelente pesca de corvina, sierra y cabrilla. Las mareas extremas crean pozas naturales llenas de peces.',
    lat: 31.3176,
    lng: -113.5498,
    species: ['Corvina', 'Sierra', 'Cabrilla', 'Guitarra'],
    bestSeason: ['Primavera', 'Verano'],
    difficulty: 'beginner',
    active: true,
    tips: 'Consulta las tablas de mareas antes de ir.',
    access: 'Carretera de 4 carriles desde Sonoyta.'
  },
  {
    name: 'Presa Abelardo Rodríguez',
    type: 'freshwater',
    subtype: 'lake',
    description: 'El embalse más cercano a Hermosillo. Popular para pesca de lobina negra y tilapia.',
    lat: 29.12,
    lng: -110.98,
    species: ['Lobina Negra', 'Tilapia', 'Carpa'],
    bestSeason: ['Otoño', 'Invierno', 'Primavera'],
    difficulty: 'beginner',
    active: true,
    tips: 'La lobina muerde bien en las mañanas de otoño con señuelos de superficie.',
    access: 'A 20 km al norte de Hermosillo.'
  },
  {
    name: 'Guaymas - Empalme',
    type: 'saltwater',
    subtype: 'estuary',
    description: 'El puerto pesquero más importante de Sonora. Bahía de Guaymas ofrece pesca deportiva de alto nivel.',
    lat: 27.9222,
    lng: -110.8964,
    species: ['Marlin', 'Dorado', 'Pez Vela', 'Atún', 'Cabrilla'],
    bestSeason: ['Verano', 'Otoño'],
    difficulty: 'advanced',
    active: true,
    tips: 'Renta lanchas con guías locales en el malecón.',
    access: 'A 130 km al sur de Hermosillo por la carretera federal 15.'
  },
  {
    name: 'Presa Álvaro Obregón',
    type: 'freshwater',
    subtype: 'lake',
    description: 'La presa más grande de Sonora. Famosa por la pesca de lobina de gran tamaño.',
    lat: 27.9,
    lng: -109.85,
    species: ['Lobina Negra', 'Lobina Boca Chica', 'Bagre', 'Tilapia'],
    bestSeason: ['Invierno', 'Primavera'],
    difficulty: 'intermediate',
    active: true,
    tips: 'Los mejores spots son cerca de las ramas sumergidas.',
    access: 'Cerca de Ciudad Obregón, Cajeme.'
  },
  {
    name: 'Bahía Lobos',
    type: 'saltwater',
    subtype: 'beach',
    description: 'Playa virgen relativamente desconocida en el norte de Sonora. Aguas tranquilas y pesca abundante.',
    lat: 28.25,
    lng: -111.6,
    species: ['Corvina', 'Pargo', 'Mojarra', 'Lebrancho'],
    bestSeason: ['Primavera', 'Verano'],
    difficulty: 'intermediate',
    active: true,
    tips: 'Acceso por brecha. Lleva todo tu equipo y agua. Sin servicios.',
    access: 'Brecha desde la carretera Hermosillo-Bahía Kino. Requiere vehículo 4x4.'
  },
  {
    name: 'San Carlos',
    type: 'saltwater',
    subtype: 'beach',
    description: 'Marina de clase mundial. Los acantilados volcánicos crean refugios ideales para cabrilla y pargo.',
    lat: 27.95,
    lng: -111.08,
    species: ['Cabrilla', 'Pargo', 'Dorado', 'Sierra'],
    bestSeason: ['Primavera', 'Verano', 'Otoño'],
    difficulty: 'intermediate',
    active: true,
    tips: 'La pesca en los acantilados de la bahía Algodones es excelente.',
    access: 'A 20 km de Guaymas por carretera pavimentada.'
  },
  {
    name: 'Presa El Novillo',
    type: 'freshwater',
    subtype: 'lake',
    description: 'Embalse en la sierra sonorense rodeado de naturaleza exuberante. La pesca de lobina y bagre es excelente.',
    lat: 28.7667,
    lng: -109.9,
    species: ['Lobina Negra', 'Bagre', 'Tilapia', 'Carpa'],
    bestSeason: ['Otoño', 'Invierno', 'Primavera'],
    difficulty: 'intermediate',
    active: true,
    tips: 'El nivel del agua varía según temporada. Verifica antes de ir.',
    access: 'Cerca de Moctezuma, Sonora.'
  }
]

console.log(`Seeding ${spots.length} fishing spots to Firestore...\n`)

let success = 0
for (const spot of spots) {
  try {
    const ref = await addDoc(collection(db, 'fishing_spots'), spot)
    console.log(`✓ ${spot.name} → ${ref.id}`)
    success++
  } catch (err) {
    console.error(`✗ ${spot.name}: ${err.message}`)
  }
}

console.log(`\nDone: ${success}/${spots.length} spots added.`)
process.exit(0)
