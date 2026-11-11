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

// ---- Aula 09: CRUD do item ----

export const getMyProducts = async () => {
  const response = await api.get('/my-products')
  return response.data.data
}

export const getProductForEdit = async (id) => {
  const response = await api.get(`/products/${encodeURIComponent(id)}/edit`)
  return response.data.data
}

// formData com title, description e (opcional) image
export const updateProduct = async (id, formData) => {
  const response = await api.put(`/products/${encodeURIComponent(id)}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data.data
}

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${encodeURIComponent(id)}`)
  return response.data
}
