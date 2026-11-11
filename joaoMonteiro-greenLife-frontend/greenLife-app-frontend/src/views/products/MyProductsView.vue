<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="page-eyebrow">GreenLife</p>
        <h1>Meus Itens</h1>
        <p>Gerencie os produtos que você publicou.</p>
      </div>
      <RouterLink class="btn-green" :to="{ name: 'product-upload' }">
        <i class="bi bi-plus-lg"></i> Enviar produto
      </RouterLink>
    </header>

    <p v-if="successMessage" class="page-message page-message--success" role="status">{{ successMessage }}</p>
    <p v-if="errorMessage" class="page-message page-message--error" role="alert">{{ errorMessage }}</p>

    <p v-if="loading" class="page-message" role="status">Carregando seus produtos...</p>

    <div v-else-if="!products.length && !errorMessage" class="empty-state">
      <i class="bi bi-flower1 empty-state__icon"></i>
      <p>Você ainda não publicou nenhum produto.</p>
      <RouterLink :to="{ name: 'product-upload' }">Enviar meu primeiro produto</RouterLink>
    </div>

    <div v-else class="product-grid">
      <ProductCard v-for="item in products" :key="item.id" :product="item" :show-author="false">
        <template #actions>
          <RouterLink class="btn-outline" :to="{ name: 'product-edit', params: { id: item.id } }">
            <i class="bi bi-pencil"></i> Editar
          </RouterLink>
          <button type="button" class="btn-danger-soft" @click="askDelete(item)">
            <i class="bi bi-trash"></i> Excluir
          </button>
        </template>
      </ProductCard>
    </div>

    <!-- O modal fica FORA do card e da grade (e ainda é teleportado para o <body>) -->
    <BaseModal v-model="modalOpen" title="Excluir produto" :busy="deleting" @close="toDelete = null">
      <p>
        Tem certeza que deseja excluir <strong>{{ toDelete?.title }}</strong>?
        A imagem também será apagada. Essa ação não pode ser desfeita.
      </p>
      <p v-if="modalError" class="page-message page-message--error">{{ modalError }}</p>
      <template #footer>
        <button type="button" class="btn-outline" :disabled="deleting" @click="modalOpen = false">Cancelar</button>
        <button type="button" class="btn-danger" :disabled="deleting" @click="confirmDelete">
          {{ deleting ? 'Excluindo...' : 'Excluir' }}
        </button>
      </template>
    </BaseModal>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '../../components/ProductCard.vue'
import BaseModal from '../../components/base/BaseModal.vue'
import { deleteProduct, getMyProducts } from '../../services/productService'

const products = ref([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const modalOpen = ref(false)
const toDelete = ref(null)
const deleting = ref(false)
const modalError = ref('')

onMounted(async () => {
  loading.value = true
  try {
    products.value = await getMyProducts()
  } catch (error) {
    errorMessage.value = error.message || 'Não foi possível carregar seus produtos.'
  } finally {
    loading.value = false
  }
})

function askDelete(item) {
  successMessage.value = ''
  modalError.value = ''
  toDelete.value = item
  modalOpen.value = true
}

watch(modalOpen, (open) => {
  if (!open && !deleting.value) toDelete.value = null
})

async function confirmDelete() {
  if (!toDelete.value) return
  deleting.value = true
  modalError.value = ''
  const item = toDelete.value
  try {
    await deleteProduct(item.id)
    // remoção local: sem recarregar a lista inteira
    products.value = products.value.filter((p) => p.id !== item.id)
    successMessage.value = `"${item.title}" foi excluído.`
    deleting.value = false
    modalOpen.value = false
  } catch (error) {
    modalError.value = error.message || 'Não foi possível excluir o produto.'
    deleting.value = false
  }
}
</script>
