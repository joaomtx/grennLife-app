<template>
  <div class="container mt-5">
    <h1>Meu Perfil</h1>
    <div v-if="user" class="card p-3">
      <p><strong>Nome:</strong> {{ user.fullName }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <p v-else>Carregando...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const user = ref(null);

onMounted(async () => {
  try {
    const data = await api.get('/profile/me');
    user.value = data;
    console.log("Perfil autenticado OK:", data);
  } catch (error) {
    console.error("Erro ao carregar perfil", error);
  }
});
</script>
