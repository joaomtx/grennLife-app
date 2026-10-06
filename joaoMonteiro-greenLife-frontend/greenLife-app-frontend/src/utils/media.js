const API_URL = import.meta.env.VITE_API_URL.replace('/api', '')

export const getMediaUrl = (path) => {
  if (!path) return ''
  // Se já for uma URL completa, retorna ela mesma
  if (path.startsWith('http')) return path
  
  // Se for uma foto de perfil, adiciona o caminho correto
  if (path.startsWith('profile-')) {
    return `${API_URL}/uploads/profiles/${path}`
  }
  
  // Caso contrário, concatena com a base da API
  return `${API_URL}/${path}`
}
