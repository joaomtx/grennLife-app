import api from './api'

// POST /products/:id/toggle-like → { liked, likesCount }
export const toggleLike = async (productId) => {
  const response = await api.post(`/products/${encodeURIComponent(productId)}/toggle-like`)
  return response.data.data
}

// GET /products/:id/like-status → { liked, likesCount }
export const getLikeStatus = async (productId) => {
  const response = await api.get(`/products/${encodeURIComponent(productId)}/like-status`)
  return response.data.data
}

// GET /liked-products → produtos curtidos pelo usuário logado
export const getLikedProducts = async () => {
  const response = await api.get('/liked-products')
  return response.data.data
}
