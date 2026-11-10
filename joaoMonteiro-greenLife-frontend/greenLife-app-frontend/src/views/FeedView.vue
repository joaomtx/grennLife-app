<template>
  <section class="feed-page">
    <header class="feed-page__header">
      <div>
        <p class="feed-page__eyebrow">GreenLife</p>
        <h1>Feed de produtos</h1>
        <p>Descubra produtos compartilhados pela comunidade.</p>
      </div>
      <RouterLink class="feed-page__upload" to="/product/upload">Enviar produto</RouterLink>
    </header>

    <p v-if="errorMessage" class="feed-page__message feed-page__message--error" role="alert">
      {{ errorMessage }}
    </p>
    <div v-else-if="loading && products.length === 0" class="feed-page__message" role="status">
      Carregando produtos...
    </div>
    <div v-else-if="products.length === 0" class="feed-page__message">
      Ainda não há produtos no feed. Seja o primeiro a compartilhar um!
    </div>

    <div v-if="products.length" class="product-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <button
      v-if="hasMore"
      class="feed-page__load-more"
      type="button"
      :disabled="loading"
      @click="loadMore"
    >
      {{ loading ? 'Carregando...' : 'Carregar mais' }}
    </button>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { getFeed } from '../services/productService'

const pageSize = 12
const products = ref([])
const page = ref(1)
const hasMore = ref(false)
const loading = ref(false)
const errorMessage = ref('')

async function loadPage(nextPage) {
  if (loading.value) return

  loading.value = true
  errorMessage.value = ''
  try {
    const result = await getFeed(nextPage, pageSize)
    products.value = nextPage === 1 ? result.products : [...products.value, ...result.products]
    page.value = result.pagination.page
    hasMore.value = result.pagination.hasMore
  } catch (error) {
    errorMessage.value = error.message || 'Não foi possível carregar o feed.'
  } finally {
    loading.value = false
  }
}

function loadMore() {
  return loadPage(page.value + 1)
}

onMounted(() => loadPage(1))
</script>

<style scoped>
.feed-page {
  width: min(100%, 1180px);
  margin: 0 auto;
}

.feed-page__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.feed-page__header h1,
.feed-page__header p {
  margin: 0;
}

.feed-page__header h1 {
  margin: 0.25rem 0 0.5rem;
}

.feed-page__eyebrow {
  color: #28783d;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.feed-page__upload,
.feed-page__load-more {
  padding: 0.7rem 1rem;
  color: #fff;
  background: #28783d;
  border: 0;
  border-radius: 8px;
  font: inherit;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.feed-page__load-more {
  display: block;
  margin: 1.5rem auto 0;
}

.feed-page__upload:hover,
.feed-page__load-more:hover:not(:disabled) {
  background: #1f6031;
}

.feed-page__load-more:disabled {
  cursor: wait;
  opacity: 0.7;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 230px), 1fr));
  gap: 1.25rem;
}

.feed-page__message {
  padding: 1rem;
  color: #46534a;
  background: #f3f7f3;
  border-radius: 8px;
}

.feed-page__message--error {
  color: #842029;
  background: #f8d7da;
}

@media (max-width: 600px) {
  .feed-page__header {
    align-items: start;
    flex-direction: column;
  }
}
</style>
