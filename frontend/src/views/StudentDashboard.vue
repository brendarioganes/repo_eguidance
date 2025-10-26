<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Student Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ auth.user?.name }}!</span>
        <button @click="logout" class="btn-logout">Logout</button>
      </div>
    </header>
    
    <main class="dashboard-content">
      <div class="welcome-card">
        <h2>Welcome to your Student Dashboard</h2>
        <p>Here you can access your academic resources, schedule appointments, and manage your counseling sessions.</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="card">
          <h3>My Profile</h3>
          <p>View and update your profile information</p>
          <button @click="viewProfile" class="btn-secondary">View Profile</button>
        </div>
        
        <div class="card">
          <h3>Appointments</h3>
          <p>Schedule and manage your counseling appointments</p>
          <button class="btn-secondary">View Appointments</button>
        </div>
        
        <div class="card">
          <h3>Resources</h3>
          <p>Access academic and career resources</p>
          <button class="btn-secondary">Browse Resources</button>
        </div>
        
        <div class="card">
          <h3>Messages</h3>
          <p>Communicate with your counselor</p>
          <button class="btn-secondary">View Messages</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  router.push('/login')
}

const viewProfile = () => {
  // Navigate to profile or show profile modal
  console.log('View profile clicked')
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f5f5f5;
}

.dashboard-header {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  margin: 0;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-logout {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-logout:hover {
  background: #c82333;
}

.dashboard-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.welcome-card h2 {
  color: #333;
  margin-bottom: 1rem;
}

.welcome-card p {
  color: #666;
  line-height: 1.6;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-2px);
}

.card h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.card p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.btn-secondary {
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-secondary:hover {
  background: #5a6fd8;
}
</style>
