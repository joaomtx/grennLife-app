<template>
  <button :type="type" class="btn btn-primary w-100" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'button' }
})
defineEmits(['click'])
</script>
