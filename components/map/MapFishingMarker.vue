<template>
  <LMarker
    :lat-lng="[spot.lat, spot.lng]"
    :icon="markerIcon"
    @click="$emit('select', spot)"
  >
    <LTooltip :options="{ permanent: false, direction: 'top', offset: [0, -10] }">
      <div class="text-sm font-semibold text-gray-800 whitespace-nowrap">{{ spot.name }}</div>
      <div class="text-xs text-gray-500 capitalize">{{ spot.type === 'saltwater' ? 'Agua Salada' : 'Agua Dulce' }}</div>
    </LTooltip>
  </LMarker>
</template>

<script setup lang="ts">
import { divIcon } from 'leaflet'
import type { FishingSpot } from '~/types/fishing'

const props = defineProps<{
  spot: FishingSpot
}>()

defineEmits<{
  select: [spot: FishingSpot]
}>()

const markerIcon = computed(() => {
  const isSaltwater = props.spot.type === 'saltwater'
  const bgColor = isSaltwater ? '#2563EB' : '#16A34A'
  const borderColor = isSaltwater ? '#1d4ed8' : '#15803d'
  const emoji = isSaltwater ? '🌊' : '🏞️'

  return divIcon({
    className: '',
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: ${bgColor};
        border: 3px solid ${borderColor};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.15s ease;
      ">
        <span style="transform: rotate(45deg); font-size: 16px; line-height: 1;">${emoji}</span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  })
})
</script>
