import api from './api'

export const uploadProduct = (formData, onProgress) => {
  return api.post('/products/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percentage)
      }
    },
  })
}

export const getProductById = async (id) => {
  const response = await api.get(`/products/${encodeURIComponent(id)}`)
  return response.data.data
}

export const getFeed = async (page = 1, limit = 12) => {
  const response = await api.get('/feed', { params: { page, limit } })
  return response.data.data
}
