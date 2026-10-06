/**
 * O Interceptor de resposta do Axios centraliza o tratamento de erros:
 * 1. Sucesso: "descasca" a resposta para retornar apenas o `data` (o conteúdo útil).
 * 2. API Error: Captura erros da API (4xx/5xx), normalizando-os no formato esperado.
 * 3. Network Error: Captura erros de rede/servidor offline, fornecendo uma mensagem amigável.
 */
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de requisição: Adiciona o token JWT se ele existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Interceptor de resposta: Se receber 401, faz logout
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
    }

    if (error.response) {
      // A API respondeu, mas com um status de erro (4xx ou 5xx)
      const apiError = error.response.data
      return Promise.reject({
        message: apiError.message || 'Ocorreu um erro na requisição.',
        errors: apiError.errors || [],
        status: error.response.status,
      })
    } else if (error.request) {
      // A requisição foi enviada, mas nenhuma resposta chegou (API fora do ar, sem rede)
      return Promise.reject({
        message: 'Não foi possível se conectar ao servidor. Verifique sua conexão ou tente mais tarde.',
        errors: [],
        status: null,
      })
    } else {
      // Erro ao montar a própria requisição (configuração inválida, por exemplo)
      return Promise.reject({
        message: 'Erro inesperado ao preparar a requisição.',
        errors: [],
        status: null,
      })
    }
  }
)

export default api
