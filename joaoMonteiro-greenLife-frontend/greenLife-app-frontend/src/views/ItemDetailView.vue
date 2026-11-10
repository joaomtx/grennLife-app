<template>
  <section class="item-detail">
    <RouterLink class="item-detail__back" :to="{ name: 'feed' }">← Voltar ao feed</RouterLink>

    <p v-if="loading" class="item-detail__message" role="status">Carregando produto...</p>
    <p v-else-if="errorMessage" class="item-detail__message item-detail__message--error" role="alert">
      {{ errorMessage }}
    </p>

    <article v-else-if="product" class="item-detail__card">
      <img
        class="item-detail__image"
        :src="getProductImageUrl(product.imagePath)"
        :alt="product.title"
      />
      <div class="item-detail__content">
        <p class="item-detail__eyebrow">Produto da comunidade</p>
        <h1>{{ product.title }}</h1>
        <p v-if="product.description" class="item-detail__description">{{ product.description }}</p>
        <div class="item-detail__author">
          <img
            :src="getMediaUrl(product.User?.profilePicture)"
            :alt="`Foto de ${authorName}`"
          />
          <div>
            <strong>{{ authorName }}</strong>
            <span v-if="product.User?.username">@{{ product.User.username }}</span>
          </div>
        </div>
        <p class="item-detail__views">{{ product.views }} visualizações</p>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getProductById } from '../services/productService'
import { getMediaUrl, getProductImageUrl } from '../utils/media'

const route = useRoute()
const product = ref(null)
const isOwner = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const authorName = computed(() => {
  const author = product.value?.User
  return author?.fullName || (author?.username ? `@${author.username}` : 'Autor desconhecido')
})

watch(
  () => route.params.id,
  async (id) => {
    product.value = null
    isOwner.value = false
    errorMessage.value = ''
    loading.value = true

    try {
      const result = await getProductById(id)
      product.value = result.product
      isOwner.value = result.isOwner
    } catch (error) {
      errorMessage.value = error.message || 'Não foi possível carregar este produto.'
    } finally {
      loading.value = false
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.item-detail {
  width: min(100%, 1000px);
  margin: 0 auto;
}

.item-detail__back {
  display: inline-block;
  margin-bottom: 1rem;
  color: #28783d;
  text-decoration: none;
}

.item-detail__card {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
  overflow: hidden;
  background: #fff;
  border: 1px solid #e3e8e3;
  border-radius: 16px;
}

.item-detail__image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 360px;
  max-height: 720px;
  object-fit: contain;
  background: #f2f5f2;
}

.item-detail__content {
  align-self: center;
  padding: clamp(1.25rem, 4vw, 2.5rem);
}

.item-detail__eyebrow {
  color: #28783d;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.item-detail__description {
  color: #46534a;
  line-height: 1.6;
  white-space: pre-wrap;
}

.item-detail__author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.item-detail__author img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.item-detail__author div {
  display: grid;
  gap: 0.15rem;
}

.item-detail__author span,
.item-detail__views {
  color: #58705e;
  font-size: 0.9rem;
}

.item-detail__message {
  padding: 1rem;
  color: #46534a;
  background: #f3f7f3;
  border-radius: 8px;
}

.item-detail__message--error {
  color: #842029;
  background: #f8d7da;
}

@media (max-width: 700px) {
  .item-detail__card {
    grid-template-columns: 1fr;
  }

  .item-detail__image {
    min-height: 260px;
    max-height: 60vh;
  }
}
</style>
