import api from './api'

export function register(payload) {
  return api.post('/register', payload)
}

export function login(payload) {
  return api.post('/login', payload)
}

export function logout() {
  return api.post('/logout')
}

export async function getProfile() {
  const response = await api.get('/profile/me')
  return response.data.data
}

export async function updateProfile(formData) {
  const response = await api.put('/profile/me', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data.data
}
