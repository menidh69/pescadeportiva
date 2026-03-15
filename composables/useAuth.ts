import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'

export function useAuth() {
  const { $auth } = useNuxtApp()
  const user = useState<User | null>('auth_user', () => null)
  const authReady = useState<boolean>('auth_ready', () => false)

  const initAuth = () => {
    onAuthStateChanged($auth as any, (firebaseUser) => {
      user.value = firebaseUser
      authReady.value = true
      if (!firebaseUser && useRoute().path.startsWith('/admin') && useRoute().path !== '/admin/login') {
        navigateTo('/admin/login')
      }
    })
  }

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword($auth as any, email, password)
    user.value = cred.user
  }

  const logout = async () => {
    await signOut($auth as any)
    user.value = null
    await navigateTo('/admin/login')
  }

  return { user, authReady, initAuth, login, logout }
}
