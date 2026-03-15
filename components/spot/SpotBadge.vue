<template>
  <span
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
    :class="badgeClass"
  >
    <span>{{ icon }}</span>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'saltwater' | 'freshwater'
  subtype: 'beach' | 'lake' | 'river' | 'estuary'
}>()

const badgeClass = computed(() =>
  props.type === 'saltwater'
    ? 'bg-blue-100 text-blue-800'
    : 'bg-green-100 text-green-800'
)

const icon = computed(() => {
  const icons = {
    beach: '🏖️',
    lake: '🏞️',
    river: '🌊',
    estuary: '🦐'
  }
  return icons[props.subtype] || '📍'
})

const label = computed(() => {
  const labels = {
    beach: 'Playa',
    lake: 'Lago / Presa',
    river: 'Río',
    estuary: 'Bahía / Estuario'
  }
  return `${props.type === 'saltwater' ? 'Agua Salada · ' : 'Agua Dulce · '}${labels[props.subtype] || ''}`
})
</script>
