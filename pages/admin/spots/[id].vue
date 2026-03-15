<template>
  <div class="max-w-2xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <NuxtLink to="/admin" class="text-gray-400 hover:text-gray-600">
          ← Volver
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-800">
          {{ isNew ? 'Nuevo Lugar' : 'Editar Lugar' }}
        </h1>
      </div>
      <button
        v-if="!isNew"
        @click="handleDelete"
        class="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
      >
        Eliminar
      </button>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="bg-white rounded-xl shadow p-6 space-y-5">
      <!-- Basic info -->
      <AdminSpotField label="Nombre del lugar *" v-model="form.name" required />
      <AdminSpotField label="Descripción *" v-model="form.description" type="textarea" required />

      <!-- Type + Subtype -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de agua *</label>
          <select v-model="form.type" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="saltwater">🌊 Agua Salada</option>
            <option value="freshwater">🏞️ Agua Dulce</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtipo *</label>
          <select v-model="form.subtype" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="beach">Playa</option>
            <option value="lake">Lago / Presa</option>
            <option value="river">Río</option>
            <option value="estuary">Bahía / Estuario</option>
          </select>
        </div>
      </div>

      <!-- Coordinates -->
      <div class="grid grid-cols-2 gap-4">
        <AdminSpotField label="Latitud *" v-model="form.lat" type="number" required />
        <AdminSpotField label="Longitud *" v-model="form.lng" type="number" required />
      </div>
      <p class="text-xs text-gray-400 -mt-3">
        Ejemplo Sonora: Latitud 29.12, Longitud -110.98
      </p>

      <!-- Difficulty -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Dificultad *</label>
        <select v-model="form.difficulty" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="beginner">Principiante</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
      </div>

      <!-- Species -->
      <div>
        <AdminSpotField
          label="Especies (separadas por coma)"
          v-model="speciesStr"
          placeholder="Pargo, Cabrilla, Corvina"
        />
        <div v-if="speciesTags.length" class="flex flex-wrap gap-1.5 mt-2">
          <span v-for="s in speciesTags" :key="s" class="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            🐟 {{ s }}
          </span>
        </div>
      </div>

      <!-- Best season -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Mejor temporada</label>
        <div class="flex flex-wrap gap-2">
          <label v-for="s in allSeasons" :key="s" class="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" :value="s" v-model="selectedSeasons" class="w-4 h-4 text-blue-600" />
            <span class="text-sm">{{ seasonLabel(s) }}</span>
          </label>
        </div>
      </div>

      <!-- Optional fields -->
      <AdminSpotField label="Tips para el pescador" v-model="form.tips" type="textarea" />
      <AdminSpotField label="Cómo llegar / Acceso" v-model="form.access" type="textarea" />
      <AdminSpotField label="URL de imagen (opcional)" v-model="form.imageUrl" />

      <!-- Active toggle -->
      <div class="flex items-center gap-2 pt-1">
        <input type="checkbox" v-model="form.active" id="active" class="w-4 h-4 text-blue-600" />
        <label for="active" class="text-sm font-medium text-gray-700">
          Activo — visible en el mapa público
        </label>
      </div>

      <!-- Error -->
      <p v-if="error" class="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
        {{ error }}
      </p>

      <!-- Actions -->
      <div class="flex gap-3 pt-2 border-t border-gray-100">
        <button
          type="submit"
          :disabled="saving"
          class="bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50 transition-colors"
        >
          {{ saving ? 'Guardando...' : (isNew ? 'Crear Lugar' : 'Guardar Cambios') }}
        </button>
        <NuxtLink to="/admin" class="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
          Cancelar
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { FishingSpot } from '~/types/fishing'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const id = route.params.id as string
const isNew = id === 'new'

const { spots, fetchAllSpots, createSpot, updateSpot, deleteSpot } = useAdminSpots()

// Form state
const form = reactive<Omit<FishingSpot, 'id'>>({
  name: '',
  type: 'saltwater',
  subtype: 'beach',
  description: '',
  lat: 0,
  lng: 0,
  species: [],
  bestSeason: [],
  difficulty: 'beginner',
  active: true,
  tips: '',
  access: '',
  imageUrl: ''
})

const speciesStr = ref('')
const selectedSeasons = ref<string[]>([])
const allSeasons = ['Primavera', 'Verano', 'Otoño', 'Invierno']

const speciesTags = computed(() =>
  speciesStr.value.split(',').map(s => s.trim()).filter(Boolean)
)

const seasonLabel = (s: string) => {
  const icons: Record<string, string> = { Primavera: '🌸 Primavera', Verano: '☀️ Verano', Otoño: '🍂 Otoño', Invierno: '❄️ Invierno' }
  return icons[s] || s
}

const saving = ref(false)
const error = ref('')

onMounted(async () => {
  if (!isNew) {
    if (!spots.value.length) await fetchAllSpots()
    const spot = spots.value.find(s => s.id === id)
    if (spot) {
      Object.assign(form, { ...spot })
      speciesStr.value = spot.species.join(', ')
      selectedSeasons.value = [...spot.bestSeason]
    }
  }
})

const handleSubmit = async () => {
  saving.value = true
  error.value = ''
  form.species = speciesTags.value
  form.bestSeason = selectedSeasons.value
  try {
    if (isNew) {
      await createSpot({ ...form })
    } else {
      await updateSpot(id, { ...form })
    }
    await navigateTo('/admin')
  } catch {
    error.value = 'Error al guardar. Verifica tu sesión e inténtalo de nuevo.'
  } finally {
    saving.value = false
  }
}

const handleDelete = async () => {
  if (!confirm(`¿Eliminar "${form.name}"? Esta acción no se puede deshacer.`)) return
  try {
    await deleteSpot(id)
    await navigateTo('/admin')
  } catch {
    error.value = 'Error al eliminar.'
  }
}
</script>
