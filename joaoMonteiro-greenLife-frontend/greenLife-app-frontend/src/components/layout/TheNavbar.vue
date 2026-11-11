<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">GreenLife</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li v-if="!isAuthenticated" class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li>
          <li v-if="!isAuthenticated" class="nav-item"><router-link class="nav-link" to="/register">Criar Conta</router-link></li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/feed">Feed</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/product/upload">Enviar Produto</router-link>
          </li>

          <!-- Menu do avatar: controlado por estado (menuOpen), sem o JS do Bootstrap -->
          <li v-if="isAuthenticated" ref="menuRef" class="nav-item avatar-menu">
            <button
              type="button"
              class="avatar-menu__trigger"
              :aria-expanded="menuOpen"
              aria-haspopup="menu"
              @click="menuOpen = !menuOpen"
            >
              <img :src="avatarUrl" alt="" class="avatar-menu__img" />
              <span class="avatar-menu__name">{{ user?.username }}</span>
              <i class="bi" :class="menuOpen ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </button>

            <ul v-if="menuOpen" class="avatar-menu__list" role="menu">
              <li role="none">
                <router-link role="menuitem" class="avatar-menu__item" :to="{ name: 'my-profile' }" @click="closeMenu">
                  <i class="bi bi-pencil-square"></i> Editar Perfil
                </router-link>
              </li>
              <li role="none">
                <router-link
                  role="menuitem"
                  class="avatar-menu__item"
                  :to="{ name: 'public-profile', params: { username: user?.username || '' } }"
                  @click="closeMenu"
                >
                  <i class="bi bi-person-circle"></i> Ver Perfil
                </router-link>
              </li>
              <li role="none">
                <router-link role="menuitem" class="avatar-menu__item" :to="{ name: 'my-products' }" @click="closeMenu">
                  <i class="bi bi-grid"></i> Meus Itens
                </router-link>
              </li>
              <li role="none">
                <router-link role="menuitem" class="avatar-menu__item" :to="{ name: 'liked-products' }" @click="closeMenu">
                  <i class="bi bi-heart"></i> Curtidos
                </router-link>
              </li>
              <li role="none"><hr class="avatar-menu__divider" /></li>
              <li role="none">
                <button role="menuitem" type="button" class="avatar-menu__item avatar-menu__item--danger" @click="handleLogout">
                  <i class="bi bi-box-arrow-right"></i> Sair
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { useClickOutside } from '../../composables/useClickOutside'
import { getProfile } from '../../services/authService'
import { getMediaUrl } from '../../utils/media'

const { user, isAuthenticated, logout } = useAuth()
const router = useRouter()

const menuOpen = ref(false)
const menuRef = ref(null)
const profilePicture = ref(null)

const avatarUrl = computed(() => getMediaUrl(profilePicture.value || 'default-profile.png'))

function closeMenu() {
  menuOpen.value = false
}

// Fecha ao clicar fora
useClickOutside(menuRef, closeMenu)

// Fecha com Esc
function onKeydown(event) {
  if (event.key === 'Escape') closeMenu()
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))

// Busca a foto do avatar quando há sessão
watch(
  isAuthenticated,
  async (logged) => {
    profilePicture.value = null
    if (!logged) return
    try {
      const profile = await getProfile()
      profilePicture.value = profile.profilePicture
    } catch {
      // sem foto: fica a padrão
    }
  },
  { immediate: true },
)

// Fecha também em qualquer troca de rota
router.afterEach(closeMenu)

function handleLogout() {
  closeMenu()
  logout()
  router.push('/login')
}
</script>
