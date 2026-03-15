<template>
  <div class="relative w-full h-full">
    <!-- Loading overlay -->
    <div v-if="loading" class="absolute inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="text-5xl mb-3 animate-bounce">🎣</div>
        <p class="text-blue-800 font-semibold text-lg">Cargando lugares de pesca...</p>
        <p class="text-gray-500 text-sm mt-1">Sonora, México</p>
      </div>
    </div>

    <!-- Map -->
    <ClientOnly>
      <LMap
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 100%; width: 100%;"
        @ready="onMapReady"
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
        <div class="flex items-center justify-center h-full bg-blue-50">
          <p class="text-blue-600">Cargando mapa...</p>
        </div>
      </template>
    </ClientOnly>

    <!-- Mobile legend (bottom) -->
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
import type { FishingSpot } from '~/types/fishing'

const { spots, loading, loadSpots } = useFirestore()
const { select } = useSelectedSpot()

const zoom = ref(7)
const center = ref<[number, number]>([29.1, -111.0])
const mapOptions = {
  zoomControl: true,
  scrollWheelZoom: true
}

onMounted(() => {
  loadSpots()
})

const onMapReady = () => {
  // Map is ready
}

const handleSpotSelect = (spot: FishingSpot) => {
  select(spot)
}
</script>
