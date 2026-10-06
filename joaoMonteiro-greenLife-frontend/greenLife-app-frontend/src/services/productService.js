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
