<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <FormCard title="Criar Conta">
          <form @submit.prevent="handleSubmit">
            <BaseInput
              id="fullName"
              label="Nome completo"
              v-model="form.fullName"
              placeholder="Seu nome"
              required
            />
            <BaseInput
              id="username"
              label="Usuário"
              v-model="form.username"
              placeholder="Seu nome de usuário"
              required
            />
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
            <BaseInput
              id="confirmPassword"
              label="Confirmar senha"
              type="password"
              v-model="form.confirmPassword"
              placeholder="Confirme sua senha"
              required
            />
            
            <p v-if="apiErrorMessage" class="text-danger">{{ apiErrorMessage }}</p>
            
            <BaseButton type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Criando conta...' : 'Criar Minha Conta' }}
            </BaseButton>
          </form>
        </FormCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../../services/authService'
import BaseInput from '../../components/base/BaseInput.vue';
import BaseButton from '../../components/base/BaseButton.vue';
import FormCard from '../../components/base/FormCard.vue';

const router = useRouter()
const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
})

const isSubmitting = ref(false)
const apiErrorMessage = ref('')

async function handleSubmit() {
  apiErrorMessage.value = ''
  isSubmitting.value = true
  try {
    await register({
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
      confirmPassword: form.confirmPassword,
      fullName: form.fullName.trim(),
    })
    router.push({ name: 'login' })
  } catch (error) {
    apiErrorMessage.value = error.message || 'Erro ao realizar registro.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
