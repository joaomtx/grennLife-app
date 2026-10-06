<template>
  <div class="p-4">
    <h1>Feed</h1>
    <p>Em construção.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import api from '../services/api';

onMounted(async () => {
  try {
    // This is expected to fail with 401 if token is invalid
    await api.get('/profile/me');
  } catch (error) {
    console.log("Teste de interceptor:", error);
  }
});
</script>
