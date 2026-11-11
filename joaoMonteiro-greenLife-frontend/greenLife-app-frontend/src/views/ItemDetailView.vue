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
        <RouterLink
          v-if="product.User?.username"
          class="item-detail__author"
          :to="{ name: 'public-profile', params: { username: product.User.username } }"
        >
          <img
            :src="getMediaUrl(product.User?.profilePicture)"
            :alt="`Foto de ${authorName}`"
          />
          <div>
            <strong>{{ authorName }}</strong>
            <span>@{{ product.User.username }}</span>
          </div>
        </RouterLink>
        <p class="item-detail__views">{{ product.views }} visualizações · {{ commentsCount }} comentários</p>
        <LikeButton
          class="item-detail__like"
          :product-id="product.id"
          :initial-liked="isLiked"
          :initial-count="product.likesCount || 0"
        />
        <!-- Só aparece para o dono. Isso é conveniência de interface, não segurança:
             quem garante a permissão é o 403 da API. -->
        <RouterLink
          v-if="isOwner"
          class="btn-green item-detail__edit"
          :to="{ name: 'product-edit', params: { id: product.id } }"
        >
          <i class="bi bi-pencil-square"></i> Editar
        </RouterLink>
      </div>
    </article>

    <CommentSection
      v-if="product"
      :product-id="product.id"
      :initial-count="product.commentsCount || 0"
      @added="commentsCount = $event"
    />
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getProductById } from '../services/productService'
import LikeButton from '../components/LikeButton.vue'
import CommentSection from '../components/CommentSection.vue'
import { getMediaUrl, getProductImageUrl } from '../utils/media'

const route = useRoute()
const product = ref(null)
const isOwner = ref(false)
const isLiked = ref(false)
const commentsCount = ref(0)
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
    isLiked.value = false
    errorMessage.value = ''
    loading.value = true

    try {
      const result = await getProductById(id)
      product.value = result.product
      isOwner.value = result.isOwner
      isLiked.value = result.isLiked
      commentsCount.value = result.product.commentsCount || 0
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
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.item-detail__author:hover strong {
  text-decoration: underline;
}

.item-detail__edit {
  margin-top: 1rem;
}

.item-detail__like {
  margin-top: 0.75rem;
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
