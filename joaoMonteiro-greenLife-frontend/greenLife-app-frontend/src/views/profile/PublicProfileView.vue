<template>
  <section class="page">
    <p v-if="loading" class="page-message" role="status">Carregando perfil...</p>
    <p v-else-if="errorMessage" class="page-message page-message--error" role="alert">{{ errorMessage }}</p>

    <template v-else-if="profile">
      <header class="profile-header">
        <img class="profile-header__avatar" :src="getMediaUrl(profile.profilePicture)" :alt="`Foto de ${displayName}`" />
        <div class="profile-header__info">
          <h1>{{ displayName }}</h1>
          <p class="profile-header__username">@{{ profile.username }}</p>
          <p v-if="profile.bio" class="profile-header__bio">{{ profile.bio }}</p>
          <ul class="profile-header__stats">
            <li><strong>{{ profile.productsCount }}</strong> produtos</li>
            <li><strong>{{ profile.followersCount }}</strong> seguidores</li>
            <li><strong>{{ profile.followingCount }}</strong> seguindo</li>
          </ul>
        </div>
        <div class="profile-header__actions">
          <!-- dono -->
          <RouterLink v-if="profile.isOwner" class="btn-green" :to="{ name: 'my-profile' }">
            <i class="bi bi-pencil-square"></i> Editar Perfil
          </RouterLink>
          <!-- logado, mas não é o dono -->
          <button v-else-if="isAuthenticated" type="button" class="btn-green">
            <i class="bi bi-person-plus"></i> Seguir
          </button>
          <!-- visitante: nenhum botão -->
        </div>
      </header>

      <h2 class="section-title">Produtos</h2>
      <p v-if="!profile.Products?.length" class="page-message">
        {{ profile.isOwner ? 'Você ainda não publicou produtos.' : 'Esta pessoa ainda não publicou produtos.' }}
      </p>
      <div v-else class="product-grid">
        <ProductCard
          v-for="item in profile.Products"
          :key="item.id"
          :product="item"
          :author-override="profile"
        />
      </div>
    </template>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductCard from '../../components/ProductCard.vue'
import { useAuth } from '../../composables/useAuth'
import { getPublicProfile } from '../../services/authService'
import { getMediaUrl } from '../../utils/media'

const route = useRoute()
const { isAuthenticated } = useAuth()

const profile = ref(null)
const loading = ref(false)
const errorMessage = ref('')

const displayName = computed(() => profile.value?.fullName || `@${profile.value?.username}`)

// watch no parâmetro: indo de /profile/a para /profile/b o componente é reaproveitado,
// então onMounted não rodaria de novo. Assim a tela troca sem recarregar.
watch(
  () => route.params.username,
  async (username) => {
    if (!username) return
    profile.value = null
    errorMessage.value = ''
    loading.value = true
    try {
      profile.value = await getPublicProfile(username)
    } catch (error) {
      errorMessage.value = error.status === 404
        ? 'Usuário não encontrado.'
        : (error.message || 'Não foi possível carregar este perfil.')
    } finally {
      loading.value = false
    }
  },
  { immediate: true },
)
</script>
