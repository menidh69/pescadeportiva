<template>
  <div class="p-5 space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ spot.name }}</h2>
      <SpotBadge :type="spot.type" :subtype="spot.subtype" />
    </div>

    <!-- Image -->
    <div v-if="spot.imageUrl" class="rounded-xl overflow-hidden">
      <img :src="spot.imageUrl" :alt="spot.name" class="w-full h-40 object-cover" />
    </div>
    <div v-else class="rounded-xl overflow-hidden bg-gradient-to-br h-32 flex items-center justify-center"
      :class="spot.type === 'saltwater' ? 'from-blue-400 to-blue-700' : 'from-green-400 to-green-700'"
    >
      <span class="text-5xl">{{ spot.type === 'saltwater' ? '🌊' : '🏞️' }}</span>
    </div>

    <!-- Description -->
    <p class="text-gray-600 text-sm leading-relaxed">{{ spot.description }}</p>

    <!-- Difficulty -->
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-500 font-medium">Dificultad:</span>
      <span
        class="text-xs font-semibold px-2 py-0.5 rounded-full"
        :class="difficultyClass"
      >
        {{ difficultyLabel }}
      </span>
    </div>

    <!-- Species -->
    <div>
      <h3 class="text-sm font-semibold text-gray-700 mb-2">Especies</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="fish in spot.species"
          :key="fish"
          class="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium"
        >
          🐟 {{ fish }}
        </span>
      </div>
    </div>

    <!-- Best Season -->
    <div>
      <h3 class="text-sm font-semibold text-gray-700 mb-2">Mejor temporada</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="season in spot.bestSeason"
          :key="season"
          class="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-medium"
        >
          {{ seasonIcon(season) }} {{ season }}
        </span>
      </div>
    </div>

    <!-- Tips -->
    <div v-if="spot.tips" class="bg-amber-50 border border-amber-200 rounded-xl p-3">
      <p class="text-xs font-semibold text-amber-800 mb-1">💡 Consejo del pescador</p>
      <p class="text-sm text-amber-700">{{ spot.tips }}</p>
    </div>

    <!-- Access -->
    <div v-if="spot.access" class="bg-gray-50 rounded-xl p-3">
      <p class="text-xs font-semibold text-gray-600 mb-1">🗺️ Cómo llegar</p>
      <p class="text-sm text-gray-600">{{ spot.access }}</p>
    </div>

    <!-- Coordinates -->
    <div class="text-xs text-gray-400 flex items-center gap-1.5 pt-1 border-t border-gray-100">
      <span>📍</span>
      <span>{{ spot.lat.toFixed(4) }}°N, {{ Math.abs(spot.lng).toFixed(4) }}°O</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FishingSpot } from '~/types/fishing'

defineProps<{
  spot: FishingSpot
}>()

const difficultyClass = computed(() => ({
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700'
}))

const difficultyLabel = computed(() => ({
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado'
}))

const seasonIcon = (season: string) => {
  const icons: Record<string, string> = {
    Primavera: '🌸',
    Verano: '☀️',
    Otoño: '🍂',
    Invierno: '❄️'
  }
  return icons[season] || '📅'
}
</script>
