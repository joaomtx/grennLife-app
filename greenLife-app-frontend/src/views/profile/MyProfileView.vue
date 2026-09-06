<template>
  <div class="container mt-5">
    <h2 class="mb-4">Meu Perfil</h2>
    <div v-if="user" class="card p-4">
      <form @submit.prevent="saveProfile">
        <div class="row">
          <div class="col-md-4 text-center">
            <img :src="imagePreview || getMediaUrl(user.profilePicture)" alt="Foto de perfil" class="img-thumbnail mb-3" style="max-width: 200px;">
            <input type="file" @change="onFileChange" class="form-control" accept="image/*">
          </div>
          <div class="col-md-8">
            <div class="mb-3">
              <label class="form-label">Nome Completo</label>
              <input v-model="form.fullName" type="text" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Bio</label>
              <textarea v-model="form.bio" class="form-control" rows="3"></textarea>
              <small class="text-muted">{{ form.bio?.length || 0 }} / 255</small>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="loading">Salvar Alterações</button>
          </div>
        </div>
      </form>
      <div v-if="apiErrorMessage" class="alert alert-danger mt-3">{{ apiErrorMessage }}</div>
    </div>
    <p v-else>Carregando...</p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getProfile, updateProfile } from '../../services/authService';
import { getMediaUrl } from '../../utils/media';

const user = ref(null);
const form = reactive({ fullName: '', bio: '' });
const profilePicture = ref(null);
const imagePreview = ref(null);
const loading = ref(false);
const apiErrorMessage = ref('');

onMounted(async () => {
  try {
    user.value = await getProfile();
    form.fullName = user.value.fullName;
    form.bio = user.value.bio || '';
  } catch (error) {
    console.error("Erro ao carregar perfil", error);
  }
});

function onFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    profilePicture.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
}

async function saveProfile() {
  loading.value = true;
  apiErrorMessage.value = '';
  const formData = new FormData();
  formData.append('fullName', form.fullName);
  formData.append('bio', form.bio);
  if (profilePicture.value) {
    formData.append('profilePicture', profilePicture.value);
  }

  try {
    const updatedUser = await updateProfile(formData);
    user.value = updatedUser;
    
    // Atualiza o estado do formulário para refletir os novos dados
    form.fullName = updatedUser.fullName;
    form.bio = updatedUser.bio || '';
    
    alert('Perfil atualizado com sucesso!');
  } catch (error) {
    apiErrorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}
</script>
