<template>
  <section class="comments" aria-labelledby="comments-title">
    <h2 id="comments-title" class="comments__title">
      Comentários <span class="text-muted">({{ total }})</span>
    </h2>

    <!-- Formulário só para quem está logado -->
    <form v-if="isAuthenticated" class="comments__form" novalidate @submit.prevent="handleSubmit">
      <label for="comment-text" class="visually-hidden">Escreva um comentário</label>
      <textarea
        id="comment-text"
        v-model="text"
        placeholder="Escreva um comentário..."
        :disabled="sending"
        @input="formError = ''"
      ></textarea>
      <div class="comments__form-row">
        <span class="comments__counter" :class="{ 'comments__counter--over': text.length > COMMENT_MAX }">
          {{ text.length }} / {{ COMMENT_MAX }}
        </span>
        <button type="submit" class="btn-green" :disabled="sending">
          {{ sending ? 'Enviando...' : 'Comentar' }}
        </button>
      </div>
      <p v-if="formError" class="comments__error" role="alert">{{ formError }}</p>
    </form>
    <p v-else class="comments__login">
      <RouterLink :to="{ name: 'login', query: { redirect: route.fullPath } }">Entre</RouterLink>
      para comentar.
    </p>

    <!-- Lista: carregando / erro / vazio / itens -->
    <p v-if="loading" class="page-message" role="status">Carregando comentários...</p>
    <p v-else-if="loadError" class="page-message page-message--error" role="alert">
      {{ loadError }}
      <button type="button" class="link-button" @click="load">Tentar de novo</button>
    </p>
    <p v-else-if="!comments.length" class="page-message">Ainda não há comentários. Seja o primeiro!</p>
    <ul v-else class="comments__list">
      <li
        v-for="comment in comments"
        :key="comment.id"
        class="comment"
        :class="{ 'comment--new': comment.id === newestId }"
      >
        <img class="comment__avatar" :src="getMediaUrl(comment.User?.profilePicture || 'default-profile.png')" alt="" />
        <div>
          <div class="comment__header">
            <RouterLink
              v-if="comment.User?.username"
              class="comment__author"
              :to="{ name: 'public-profile', params: { username: comment.User.username } }"
            >
              {{ comment.User.fullName || '@' + comment.User.username }}
            </RouterLink>
            <time class="comment__date" :datetime="comment.createdAt" :title="formatDateTime(comment.createdAt)">
              {{ formatRelativeDate(comment.createdAt) }}
            </time>
          </div>
          <!-- {{ }} escapa o HTML: o texto do usuário NUNCA vai em v-html -->
          <p class="comment__text">{{ comment.content }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { addComment, getComments } from '../services/commentService'
import { formatDateTime, formatRelativeDate } from '../utils/format'
import { getMediaUrl } from '../utils/media'

// Mesmo limite do VALIDATION.COMMENT_MAX da API
const COMMENT_MAX = 500

const props = defineProps({
  productId: { type: [Number, String], required: true },
  initialCount: { type: Number, default: 0 },
})
const emit = defineEmits(['added'])

const route = useRoute()
const { isAuthenticated } = useAuth()

const comments = ref([])
const total = ref(props.initialCount)
const loading = ref(false)
const loadError = ref('')
const text = ref('')
const formError = ref('')
const sending = ref(false)
const newestId = ref(null)

async function load() {
  loading.value = true
  loadError.value = ''
  try {
    comments.value = await getComments(props.productId)
    total.value = comments.value.length
  } catch (error) {
    loadError.value = error.message || 'Não foi possível carregar os comentários.'
  } finally {
    loading.value = false
  }
}

watch(() => props.productId, load, { immediate: true })

function validate() {
  const content = text.value.trim()
  if (!content) return 'O comentário não pode ficar vazio.'
  if (content.length > COMMENT_MAX) return `O comentário deve ter no máximo ${COMMENT_MAX} caracteres.`
  return ''
}

async function handleSubmit() {
  // Validação no cliente: se falhar, a API nem é chamada
  formError.value = validate()
  if (formError.value) return

  sending.value = true
  try {
    const created = await addComment(props.productId, text.value.trim())
    // Novo comentário no topo, sem recarregar a lista
    comments.value.unshift(created)
    newestId.value = created.id
    total.value += 1
    text.value = ''
    emit('added', total.value)
  } catch (error) {
    formError.value = error.message || 'Não foi possível enviar o comentário.'
  } finally {
    sending.value = false
  }
}
</script>
