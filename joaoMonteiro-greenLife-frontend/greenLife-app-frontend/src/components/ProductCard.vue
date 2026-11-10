<template>
  <RouterLink class="product-card" :to="{ name: 'item-detail', params: { id: product.id } }">
    <img
      class="product-card__image"
      :src="getProductImageUrl(product.imagePath)"
      :alt="product.title"
      loading="lazy"
    />
    <div class="product-card__body">
      <h2 class="product-card__title">{{ product.title }}</h2>
      <p class="product-card__author">{{ authorName }}</p>
      <p v-if="product.description" class="product-card__description">{{ product.description }}</p>
      <span class="product-card__views">{{ product.views || 0 }} visualizações</span>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getProductImageUrl } from '../utils/media'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const authorName = computed(() => {
  const author = props.product.User
  return author?.fullName || (author?.username ? `@${author.username}` : 'Autor desconhecido')
})
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  background: #fff;
  border: 1px solid #e3e8e3;
  border-radius: 14px;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgb(25 55 35 / 12%);
}

.product-card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  background: #f0f4f0;
}

.product-card__body {
  display: grid;
  gap: 0.4rem;
  padding: 1rem;
}

.product-card__title,
.product-card__author,
.product-card__description {
  margin: 0;
}

.product-card__title {
  font-size: 1.05rem;
}

.product-card__author,
.product-card__views {
  color: #58705e;
  font-size: 0.875rem;
}

.product-card__description {
  display: -webkit-box;
  overflow: hidden;
  color: #46534a;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
