<template>
  <div class="relative w-full" style="height: calc(100vh - 64px);">
    <!-- Loading overlay -->
    <div v-if="loading" class="absolute inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="text-5xl mb-3 animate-bounce">🎣</div>
        <p class="text-blue-800 font-semibold text-lg">Cargando lugares de pesca...</p>
        <p class="text-gray-500 text-sm mt-1">Sonora, México</p>
      </div>
    </div>

    <!-- Map (client-only: Leaflet requires browser APIs) -->
    <ClientOnly>
      <LMap
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: calc(100vh - 64px); width: 100%;"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MapFishingMarker
          v-for="spot in spots"
          :key="spot.id"
          :spot="spot"
          @select="handleSpotSelect"
        />
      </LMap>
      <template #fallback>
        <div class="flex items-center justify-center bg-blue-50" style="height: calc(100vh - 64px);">
          <p class="text-blue-600">Cargando mapa...</p>
        </div>
      </template>
    </ClientOnly>

    <!-- Mobile legend -->
    <div class="sm:hidden absolute bottom-4 left-4 z-40 bg-white rounded-xl shadow-lg p-3 text-xs">
      <div class="flex items-center gap-2 mb-1.5">
        <span class="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></span>
        <span class="text-gray-700">Agua Salada</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></span>
        <span class="text-gray-700">Agua Dulce</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import type { FishingSpot } from '~/types/fishing'

const { spots, loading, loadSpots } = useFirestore()
const { select } = useSelectedSpot()

const zoom = ref(7)
const center = ref<[number, number]>([29.1, -111.0])
const mapOptions = { zoomControl: true, scrollWheelZoom: true }

onMounted(() => { loadSpots() })

const handleSpotSelect = (spot: FishingSpot) => { select(spot) }
</script>
