<template>
  <aside class="sidebar">
    <template v-if="isAuthenticated">
      <p class="sidebar-nav__title">Navegação</p>
      <ul class="sidebar-nav">
        <li><router-link :to="{ name: 'feed' }"><i class="bi bi-house"></i> Feed</router-link></li>
        <li><router-link :to="{ name: 'my-products' }"><i class="bi bi-grid"></i> Meus Itens</router-link></li>
        <li><router-link :to="{ name: 'liked-products' }"><i class="bi bi-heart"></i> Curtidos</router-link></li>
        <li><router-link :to="{ name: 'product-upload' }"><i class="bi bi-plus-square"></i> Enviar produto</router-link></li>
      </ul>
    </template>
    <p v-else class="text-muted small">Entre para ver seu feed, seus itens e seus curtidos.</p>
  </aside>
</template>

<script setup>
import { useAuth } from '../../composables/useAuth'

const { isAuthenticated } = useAuth()
</script>

<style scoped>
.sidebar { width: 200px; background: #f9f9f9; padding: 1rem; min-height: 80vh; }
</style>
