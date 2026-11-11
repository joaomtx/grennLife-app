<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="base-modal__overlay"
      @click.self="close"
    >
      <div
        class="base-modal__box"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <header class="base-modal__header">
          <h2 :id="titleId" class="base-modal__title">{{ title }}</h2>
          <button type="button" class="base-modal__close" aria-label="Fechar" :disabled="busy" @click="close">
            <i class="bi bi-x-lg"></i>
          </button>
        </header>

        <div class="base-modal__body">
          <slot />
        </div>

        <footer v-if="$slots.footer" class="base-modal__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue'

/**
 * Modal genérico. Fecha no X, ao clicar no fundo escuro e com Esc.
 * Clicar dentro da caixa branca NÃO fecha (@click.self no overlay).
 * Com `busy`, nada fecha (evita fechar no meio de uma requisição).
 */
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  busy: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'close'])

const titleId = `modal-title-${Math.random().toString(36).slice(2, 9)}`

function close() {
  if (props.busy) return
  emit('update:modelValue', false)
  emit('close')
}

function onKeydown(event) {
  if (event.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) document.addEventListener('keydown', onKeydown)
    else document.removeEventListener('keydown', onKeydown)
  },
  { immediate: true },
)

onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>
