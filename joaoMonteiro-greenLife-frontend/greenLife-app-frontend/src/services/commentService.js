import api from './api'

// GET /products/:id/comments (público) → mais novos primeiro
export const getComments = async (productId) => {
  const response = await api.get(`/products/${encodeURIComponent(productId)}/comments`)
  return response.data.data
}

// POST /products/:id/comments → comentário criado, já com o autor (User)
export const addComment = async (productId, content) => {
  const response = await api.post(`/products/${encodeURIComponent(productId)}/comments`, { content })
  return response.data.data
}
