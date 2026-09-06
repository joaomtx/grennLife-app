<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">GreenLife</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li v-if="!authStore.isAuthenticated" class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li>
          <li v-if="!authStore.isAuthenticated" class="nav-item"><router-link class="nav-link" to="/register">Criar Conta</router-link></li>
          <li v-if="authStore.isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/profile">Meu Perfil</router-link>
          </li>
          <li v-if="authStore.isAuthenticated" class="nav-item">
            <button class="nav-link btn btn-link" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push('/login');
}
</script>
