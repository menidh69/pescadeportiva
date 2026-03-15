export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/login') return

  const user = useState<any>('auth_user')
  const authReady = useState<boolean>('auth_ready')

  // Auth state not resolved yet (hard refresh); initAuth in layout handles redirect
  if (!authReady.value) return

  if (!user.value) {
    return navigateTo('/admin/login')
  }
})
