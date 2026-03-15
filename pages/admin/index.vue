<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Lugares de Pesca</h1>
        <p class="text-gray-500 text-sm mt-0.5">{{ spots.length }} lugares registrados</p>
      </div>
      <NuxtLink
        to="/admin/spots/new"
        class="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
      >
        + Nuevo Lugar
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-500">
      <div class="text-3xl mb-2">🎣</div>
      Cargando lugares...
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
      Error al cargar: {{ error }}
    </div>

    <div v-else-if="spots.length === 0" class="text-center py-12 text-gray-500">
      No hay lugares registrados.
    </div>

    <div v-else class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Tipo</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Dificultad</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="spot in sortedSpots"
            :key="spot.id"
            @click="navigateTo(`/admin/spots/${spot.id}`)"
            class="hover:bg-blue-50 cursor-pointer transition-colors"
          >
            <td class="px-4 py-3 font-medium text-gray-900">{{ spot.name }}</td>
            <td class="px-4 py-3 hidden sm:table-cell">
              <span
                class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                :class="spot.type === 'saltwater' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'"
              >
                {{ spot.type === 'saltwater' ? '🌊 Agua Salada' : '🏞️ Agua Dulce' }}
              </span>
            </td>
            <td class="px-4 py-3 hidden md:table-cell capitalize text-gray-600">
              {{ { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' }[spot.difficulty] }}
            </td>
            <td class="px-4 py-3">
              <span
                class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                :class="spot.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
              >
                {{ spot.active ? '● Activo' : '○ Oculto' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 text-center">
      <NuxtLink to="/" class="text-sm text-blue-600 hover:underline">
        ← Ver mapa público
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const { spots, loading, error, fetchAllSpots } = useAdminSpots()

const sortedSpots = computed(() =>
  [...spots.value].sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))
)

onMounted(fetchAllSpots)
</script>
