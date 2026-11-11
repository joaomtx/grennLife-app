<template>
  <!-- Sem <a> gigante: só a imagem e o título levam ao detalhe.
       Assim o autor e os botões do slot "actions" podem ser clicáveis sem conflito. -->
  <article class="product-card">
    <RouterLink class="product-card__media" :to="detailRoute" tabindex="-1">
      <img
        class="product-card__image"
        :src="getProductImageUrl(product.imagePath)"
        :alt="product.title"
        loading="lazy"
      />
    </RouterLink>

    <div class="product-card__body">
      <h2 class="product-card__title">
        <RouterLink :to="detailRoute">{{ product.title }}</RouterLink>
      </h2>

      <RouterLink
        v-if="showAuthor && author?.username"
        class="product-card__author"
        :to="{ name: 'public-profile', params: { username: author.username } }"
      >
        {{ authorName }}
      </RouterLink>

      <p v-if="product.description" class="product-card__description">{{ product.description }}</p>
      <span class="product-card__views">{{ product.views || 0 }} visualizações</span>
    </div>

    <div v-if="$slots.actions" class="product-card__actions">
      <slot name="actions" :product="product" />
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getProductImageUrl } from '../utils/media'

const props = defineProps({
  product: { type: Object, required: true },
  // Autor opcional: em "Meus Itens" não faz sentido mostrar.
  showAuthor: { type: Boolean, default: true },
  // Permite informar o autor quando a lista não vem com o include de User (ex.: perfil público).
  authorOverride: { type: Object, default: null },
})

const detailRoute = computed(() => ({ name: 'item-detail', params: { id: props.product.id } }))
const author = computed(() => props.authorOverride || props.product.User || null)
const authorName = computed(() => {
  const a = author.value
  return a?.fullName || (a?.username ? `@${a.username}` : '')
})
</script>
