<template>
  <div class="upload-product">
    <h2>Enviar Novo Produto</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="title" type="text" placeholder="Título" required />
      <textarea v-model="description" placeholder="Descrição"></textarea>
      <input type="file" @change="handleFileChange" accept="image/*" required />

      <div v-if="previewImage" class="preview">
        <img :src="previewImage" alt="Prévia" />
      </div>

      <button type="submit" :disabled="isUploading">Enviar</button>
    </form>

    <div v-if="isUploading" class="progress-bar">
      <div class="progress" :style="{ width: uploadProgress + '%' }">{{ uploadProgress }}%</div>
    </div>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uploadProduct } from '../services/productService'

const title = ref('')
const description = ref('')
const file = ref(null)
const previewImage = ref(null)
const uploadProgress = ref(0)
const isUploading = ref(false)
const message = ref('')

const handleFileChange = (e) => {
  file.value = e.target.files[0]
  if (file.value) {
    previewImage.value = URL.createObjectURL(file.value)
  }
}

const handleSubmit = async () => {
  isUploading.value = true
  message.value = ''
  uploadProgress.value = 0

  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('description', description.value)
  formData.append('image', file.value)

  try {
    await uploadProduct(formData, (progress) => {
      uploadProgress.value = progress
    })
    message.value = 'Produto enviado com sucesso!'
    title.value = ''
    description.value = ''
    file.value = null
    previewImage.value = null
  } catch (error) {
    message.value = 'Erro ao enviar produto.'
  } finally {
    isUploading.value = false
  }
}
</script>

<style scoped>
.progress-bar {
  width: 100%;
  background-color: #ddd;
  margin-top: 10px;
}
.progress {
  height: 20px;
  background-color: #4caf50;
  text-align: center;
  color: white;
}
.preview img {
  max-width: 200px;
  margin-top: 10px;
}
</style>
