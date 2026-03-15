<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="selectedSpot"
      class="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
      @click="clear"
    />
  </Transition>

  <!-- Drawer -->
  <Transition name="slide">
    <div
      v-if="selectedSpot"
      class="fixed right-0 top-[64px] bottom-0 w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
    >
      <!-- Close button -->
      <button
        @click="clear"
        class="absolute top-4 right-4 z-10 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md text-gray-500 hover:text-gray-700 hover:shadow-lg transition-all"
        aria-label="Cerrar"
      >
        ✕
      </button>

      <SpotCard :spot="selectedSpot" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { selectedSpot, clear } = useSelectedSpot()
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
