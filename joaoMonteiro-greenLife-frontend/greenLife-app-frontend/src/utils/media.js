const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '')

export const getMediaUrl = (path) => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path

  if (path.startsWith('profile-') || path === 'default-profile.png') {
    return `${API_URL}/uploads/profiles/${encodeURIComponent(path)}`
  }

  return `${API_URL}/${path}`
}

export const getProductImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (/^https?:\/\//i.test(imagePath)) return imagePath

  const filename = imagePath.replace(/^.*[\\/]/, '')
  return `${API_URL}/uploads/products/${encodeURIComponent(filename)}`
}
