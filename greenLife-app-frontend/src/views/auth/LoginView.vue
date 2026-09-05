<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-success text-white">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input v-model="form.email" type="email" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Senha</label>
                <input v-model="form.password" type="password" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-brand w-100">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter, useRoute } from 'vue-router';

const form = ref({ email: '', password: '' });
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

async function login() {
  try {
    await authStore.login(form.value);
    const redirect = route.query.redirect || '/';
    router.push(redirect);
  } catch (error) {
    alert(error.message || 'Erro ao realizar login.');
  }
}
</script>
