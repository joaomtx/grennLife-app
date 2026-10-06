<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <FormCard title="Login">
          <form @submit.prevent="handleLogin">
            <BaseInput
              id="email"
              label="E-mail"
              type="email"
              v-model="form.email"
              placeholder="seu@email.com"
              required
            />
            <BaseInput
              id="password"
              label="Senha"
              type="password"
              v-model="form.password"
              placeholder="Sua senha"
              required
            />
            <BaseButton type="submit">Entrar</BaseButton>
          </form>
        </FormCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useRouter, useRoute } from 'vue-router';
import BaseInput from '../../components/base/BaseInput.vue';
import BaseButton from '../../components/base/BaseButton.vue';
import FormCard from '../../components/base/FormCard.vue';

const form = ref({ email: '', password: '' });
const { login } = useAuth();
const router = useRouter();
const route = useRoute();

async function handleLogin() {
  try {
    await login(form.value);
    const redirect = route.query.redirect || '/';
    router.push(redirect);
  } catch (error) {
    alert(error.message || 'Erro ao realizar login.');
  }
}
</script>
