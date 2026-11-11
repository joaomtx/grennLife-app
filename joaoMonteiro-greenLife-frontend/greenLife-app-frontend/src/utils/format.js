// Formatadores usados no card, no detalhe e nos comentários.

const compact = new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 })

// 999 → "999", 1500 → "1,5 mil"
export function formatCount(value) {
  const n = Number(value) || 0
  return n < 1000 ? String(n) : compact.format(n)
}

// "agora", "há 5 min", "há 3 h", "há 2 dias" ou a data (dd/mm/aaaa)
export function formatRelativeDate(value) {
  if (!value) return ''
  const date = new Date(value)
  const diff = Math.floor((Date.now() - date.getTime()) / 1000)
  if (Number.isNaN(diff)) return ''
  if (diff < 60) return 'agora'
  if (diff < 3600) return `há ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`
  if (diff < 7 * 86400) {
    const d = Math.floor(diff / 86400)
    return `há ${d} ${d === 1 ? 'dia' : 'dias'}`
  }
  return date.toLocaleDateString('pt-BR')
}

export function formatDateTime(value) {
  if (!value) return ''
  return new Date(value).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}
