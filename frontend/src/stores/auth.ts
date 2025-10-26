import { defineStore } from 'pinia'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    isAuthenticated: false
  }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      const res = await api.post('/api/login', credentials)
      this.user = res.data.user
      this.isAuthenticated = true
      return res.data
    },
    async register(data: { name: string; email: string; password: string; role: string }) {
      await api.post('/api/register', data)
    },
    async logout() {
      await api.post('/api/logout')
      this.user = null
      this.isAuthenticated = false
    },
    async fetchProfile() {
      if (!this.user) return
      const endpoint = this.user.role === 'student'
        ? '/api/student/profile'
        : '/api/counselor/profile'
      const res = await api.get(endpoint)
      this.user = { ...this.user, ...res.data }
    }
  }
})
