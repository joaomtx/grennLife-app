<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">GreenLife</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li v-if="!isAuthenticated" class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li>
          <li v-if="!isAuthenticated" class="nav-item"><router-link class="nav-link" to="/register">Criar Conta</router-link></li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/product/upload">Enviar Produto</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/profile">Meu Perfil</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <button class="nav-link btn btn-link" @click="handleLogout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '../../composables/useAuth';
import { useRouter } from 'vue-router';

const { isAuthenticated, logout } = useAuth();
const router = useRouter();

function handleLogout() {
  logout();
  router.push('/login');
}
</script>
