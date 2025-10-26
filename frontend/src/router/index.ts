import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import StudentDashboard from '@/views/StudentDashboard.vue'
import CounselorDashboard from '@/views/CounselorDashboard.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { 
    path: '/student-dashboard', 
    component: StudentDashboard, 
    meta: { requiresAuth: true, role: 'student' } 
  },
  { 
    path: '/counselor-dashboard', 
    component: CounselorDashboard, 
    meta: { requiresAuth: true, role: 'counselor' } 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const requiredRole = to.meta.role

  if (requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else if (requiresAuth && requiredRole && auth.user?.role !== requiredRole) {
    next('/login')
  } else {
    next()
  }
})

export default router
