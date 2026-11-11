import { onMounted, onBeforeUnmount, unref } from 'vue'

/**
 * Chama `handler` quando acontece um clique (pointerdown) fora do elemento
 * referenciado por `targetRef`. Usado no menu do avatar.
 */
export function useClickOutside(targetRef, handler) {
  function onPointerDown(event) {
    const el = unref(targetRef)
    if (!el) return
    if (!el.contains(event.target)) {
      handler(event)
    }
  }

  onMounted(() => document.addEventListener('pointerdown', onPointerDown))
  onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
}
