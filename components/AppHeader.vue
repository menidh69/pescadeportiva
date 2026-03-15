<template>
  <header class="bg-blue-900 text-white px-4 py-3 flex items-center justify-between shadow-lg z-50 relative">
    <div class="flex items-center gap-3">
      <span class="text-3xl">🎣</span>
      <div>
        <h1 class="text-xl font-bold leading-tight tracking-wide">Pesca Deportiva Sonora</h1>
        <p class="text-blue-200 text-xs font-medium">Sonora, México · {{ spots.length }} lugares de pesca</p>
      </div>
    </div>
    <div class="hidden sm:flex items-center gap-4">
      <div class="flex items-center gap-2 bg-blue-800 rounded-full px-3 py-1.5">
        <span class="w-3 h-3 rounded-full bg-blue-400 border-2 border-blue-200"></span>
        <span class="text-xs text-blue-100">Agua Salada</span>
      </div>
      <div class="flex items-center gap-2 bg-blue-800 rounded-full px-3 py-1.5">
        <span class="w-3 h-3 rounded-full bg-green-400 border-2 border-green-200"></span>
        <span class="text-xs text-blue-100">Agua Dulce</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { spots } = useFirestore()
</script>
