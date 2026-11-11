<template>
  <section class="page page--narrow">
    <RouterLink class="page-back" :to="{ name: 'my-products' }">← Voltar para Meus Itens</RouterLink>

    <p v-if="loading" class="page-message" role="status">Carregando produto...</p>
    <p v-else-if="loadError" class="page-message page-message--error" role="alert">{{ loadError }}</p>

    <form v-else-if="loaded" class="edit-form" novalidate @submit.prevent="handleSubmit">
      <h1>Editar produto</h1>

      <div class="edit-form__grid">
        <div class="edit-form__image">
          <img :src="previewUrl || getProductImageUrl(currentImage)" alt="Imagem do produto" />
          <label class="btn-outline edit-form__file">
            <i class="bi bi-image"></i> Trocar imagem
            <input type="file" accept="image/*" @change="onFileChange" />
          </label>
          <small v-if="newFile" class="edit-form__hint">
            Nova imagem: {{ newFile.name }}
            <button type="button" class="link-button" @click="clearFile">desfazer</button>
          </small>
          <small v-else class="edit-form__hint">Opcional — se não escolher, a imagem atual é mantida.</small>
        </div>

        <div class="edit-form__fields">
          <label for="title" class="form-label">Título</label>
          <input id="title" v-model="form.title" type="text" class="form-control" :class="{ 'is-invalid': errors.title }" />
          <div v-if="errors.title" class="invalid-feedback d-block">{{ errors.title }}</div>

          <label for="description" class="form-label mt-3">Descrição</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="5"
            class="form-control"
            :class="{ 'is-invalid': errors.description }"
          ></textarea>
          <small class="text-muted">{{ form.description.length }} / {{ DESCRIPTION_MAX }}</small>
          <div v-if="errors.description" class="invalid-feedback d-block">{{ errors.description }}</div>

          <p v-if="apiError" class="page-message page-message--error mt-3" role="alert">{{ apiError }}</p>
          <p v-if="successMessage" class="page-message page-message--success mt-3" role="status">
            {{ successMessage }}
            <RouterLink :to="{ name: 'item-detail', params: { id: route.params.id } }">Ver produto</RouterLink>
          </p>

          <div class="edit-form__actions">
            <RouterLink class="btn-outline" :to="{ name: 'my-products' }">Cancelar</RouterLink>
            <button type="submit" class="btn-green" :disabled="saving">
              {{ saving ? 'Salvando...' : 'Salvar alterações' }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { onBeforeUnmount, reactive, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getProductForEdit, updateProduct } from '../../services/productService'
import { getProductImageUrl } from '../../utils/media'

// Mesmo limite do VALIDATION.DESCRIPTION_MAX da API
const DESCRIPTION_MAX = 500

const route = useRoute()
const form = reactive({ title: '', description: '' })
const errors = reactive({ title: '', description: '' })
const currentImage = ref('')
const newFile = ref(null)
const previewUrl = ref('')

const loading = ref(false)
const loaded = ref(false)
const loadError = ref('')
const saving = ref(false)
const apiError = ref('')
const successMessage = ref('')

watch(
  () => route.params.id,
  async (id) => {
    loading.value = true
    loaded.value = false
    loadError.value = ''
    try {
      const product = await getProductForEdit(id)
      form.title = product.title
      form.description = product.description || ''
      currentImage.value = product.imagePath
      loaded.value = true
    } catch (error) {
      if (error.status === 403) loadError.value = 'Você não tem permissão para editar este produto.'
      else if (error.status === 404) loadError.value = 'Produto não encontrado.'
      else loadError.value = error.message || 'Não foi possível carregar o produto.'
    } finally {
      loading.value = false
    }
  },
  { immediate: true },
)

function revokePreview() {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = ''
}

function onFileChange(event) {
  const file = event.target.files[0]
  successMessage.value = ''
  revokePreview()
  newFile.value = file || null
  if (file) previewUrl.value = URL.createObjectURL(file) // prévia imediata
  event.target.value = ''
}

function clearFile() {
  newFile.value = null
  revokePreview()
}

onBeforeUnmount(revokePreview)

function validate() {
  errors.title = form.title.trim() ? '' : 'O título do produto é obrigatório.'
  errors.description = form.description.length > DESCRIPTION_MAX
    ? `A descrição deve ter no máximo ${DESCRIPTION_MAX} caracteres.`
    : ''
  return !errors.title && !errors.description
}

async function handleSubmit() {
  apiError.value = ''
  successMessage.value = ''
  // Validação no cliente: se falhar, nenhuma requisição é feita.
  if (!validate()) return

  const formData = new FormData()
  formData.append('title', form.title.trim())
  formData.append('description', form.description)
  if (newFile.value) formData.append('image', newFile.value)

  saving.value = true
  try {
    const updated = await updateProduct(route.params.id, formData)
    currentImage.value = updated.imagePath
    clearFile()
    successMessage.value = 'Produto atualizado com sucesso!'
  } catch (error) {
    apiError.value = error.message || 'Não foi possível salvar as alterações.'
  } finally {
    saving.value = false
  }
}
</script>
