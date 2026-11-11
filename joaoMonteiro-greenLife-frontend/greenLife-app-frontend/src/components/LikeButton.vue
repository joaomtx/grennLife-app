<template>
  <div class="like">
    <button
      type="button"
      class="like-button"
      :class="{ 'like-button--active': liked }"
      :aria-pressed="liked"
      :aria-busy="isBusy"
      :aria-label="liked ? 'Remover curtida' : 'Curtir'"
      @click="handleClick"
    >
      <i class="bi" :class="liked ? 'bi-heart-fill' : 'bi-heart'"></i>
      <span>{{ formatCount(count) }}</span>
    </button>
    <p v-if="errorMessage" class="like-error" role="alert">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { toggleLike } from '../services/likeService'
import { formatCount } from '../utils/format'

const props = defineProps({
  productId: { type: [Number, String], required: true },
  initialLiked: { type: Boolean, default: false },
  initialCount: { type: Number, default: 0 },
})
const emit = defineEmits(['change'])

const { isAuthenticated } = useAuth()
const router = useRouter()
const route = useRoute()

const liked = ref(props.initialLiked)
const count = ref(props.initialCount)
const isBusy = ref(false)
const errorMessage = ref('')

// Se o detalhe recarregar outro produto, sincroniza com os novos valores
watch(() => [props.productId, props.initialLiked, props.initialCount], () => {
  liked.value = props.initialLiked
  count.value = props.initialCount
})

async function handleClick() {
  // Visitante: vai ao login e volta para esta mesma tela depois
  if (!isAuthenticated.value) {
    router.push({ name: 'login', query: { redirect: route.fullPath } })
    return
  }
  if (isBusy.value) return // evita cliques duplos enquanto a requisição está no ar

  // 1) guarda o estado anterior
  const previous = { liked: liked.value, count: count.value }
  // 2) atualiza a tela NA HORA (otimista)
  liked.value = !previous.liked
  count.value = previous.count + (liked.value ? 1 : -1)
  errorMessage.value = ''
  isBusy.value = true

  try {
    // 3a) confirma com a resposta do servidor (fonte da verdade)
    const result = await toggleLike(props.productId)
    liked.value = result.liked
    count.value = result.likesCount
    emit('change', { liked: result.liked, likesCount: result.likesCount })
  } catch (error) {
    // 3b) deu erro: desfaz (rollback) e avisa
    liked.value = previous.liked
    count.value = previous.count
    errorMessage.value = 'Não foi possível registrar sua curtida. Tente novamente.'
  } finally {
    isBusy.value = false
  }
}
</script>
