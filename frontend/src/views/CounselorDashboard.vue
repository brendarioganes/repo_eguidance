<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Counselor Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ auth.user?.name }}!</span>
        <button @click="logout" class="btn-logout">Logout</button>
      </div>
    </header>
    
    <main class="dashboard-content">
      <div class="welcome-card">
        <h2>Welcome to your Counselor Dashboard</h2>
        <p>Manage your students, schedule appointments, and provide counseling services.</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="card">
          <h3>My Profile</h3>
          <p>View and update your counselor profile</p>
          <button @click="viewProfile" class="btn-secondary">View Profile</button>
        </div>
        
        <div class="card">
          <h3>Students</h3>
          <p>Manage your student roster and their progress</p>
          <button class="btn-secondary">View Students</button>
        </div>
        
        <div class="card">
          <h3>Appointments</h3>
          <p>Schedule and manage counseling sessions</p>
          <button class="btn-secondary">Manage Appointments</button>
        </div>
        
        <div class="card">
          <h3>Reports</h3>
          <p>Generate reports and analytics</p>
          <button class="btn-secondary">View Reports</button>
        </div>
        
        <div class="card">
          <h3>Resources</h3>
          <p>Access counseling resources and materials</p>
          <button class="btn-secondary">Browse Resources</button>
        </div>
        
        <div class="card">
          <h3>Messages</h3>
          <p>Communicate with students and parents</p>
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
