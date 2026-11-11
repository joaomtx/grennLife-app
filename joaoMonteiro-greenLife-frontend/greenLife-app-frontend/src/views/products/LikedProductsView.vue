<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="page-eyebrow">GreenLife</p>
        <h1>Curtidos</h1>
        <p>Os produtos que você curtiu, do mais recente para o mais antigo.</p>
      </div>
    </header>

    <p v-if="loading" class="page-message" role="status">Carregando seus curtidos...</p>
    <p v-else-if="errorMessage" class="page-message page-message--error" role="alert">{{ errorMessage }}</p>
    <div v-else-if="!products.length" class="empty-state">
      <i class="bi bi-heart empty-state__icon"></i>
      <p>Você ainda não curtiu nenhum produto.</p>
      <RouterLink :to="{ name: 'feed' }">Explorar o feed</RouterLink>
    </div>
    <div v-else class="product-grid">
      <ProductCard v-for="item in products" :key="item.id" :product="item" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '../../components/ProductCard.vue'
import { getLikedProducts } from '../../services/likeService'

const products = ref([])
const loading = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  loading.value = true
  try {
    products.value = await getLikedProducts()
  } catch (error) {
    errorMessage.value = error.message || 'Não foi possível carregar seus curtidos.'
  } finally {
    loading.value = false
  }
})
</script>
