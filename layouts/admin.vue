<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-900 text-white px-6 py-3 flex items-center justify-between shadow">
      <NuxtLink to="/admin" class="font-bold text-lg tracking-wide">
        🎣 Admin · Pesca Deportiva Sonora
      </NuxtLink>
      <div class="flex items-center gap-4">
        <span class="text-sm text-blue-200 hidden sm:block">{{ user?.email }}</span>
        <button
          @click="logout"
          class="text-sm bg-blue-700 hover:bg-blue-600 px-3 py-1.5 rounded transition-colors"
        >
          Salir
        </button>
      </div>
    </header>
    <main class="flex-1 p-6 max-w-5xl mx-auto w-full">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, initAuth, logout } = useAuth()

onMounted(() => {
  initAuth()
})
</script>
