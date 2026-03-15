<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <div class="text-center mb-6">
        <span class="text-4xl">🎣</span>
        <h1 class="text-xl font-bold text-blue-900 mt-2">Pesca Deportiva Sonora</h1>
        <p class="text-gray-500 text-sm mt-1">Panel de Administración</p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="admin@ejemplo.com"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p v-if="error" class="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
          {{ error }}
        </p>
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-900 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50 transition-colors"
        >
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-sm text-blue-600 hover:underline">
          ← Ver mapa público
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { login, user } = useAuth()

// Redirect if already logged in
onMounted(() => {
  if (user.value) navigateTo('/admin')
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await login(email.value, password.value)
    await navigateTo('/admin')
  } catch {
    error.value = 'Email o contraseña incorrectos.'
  } finally {
    loading.value = false
  }
}
</script>
