<template>
  <div class="card p-4 shadow-sm">
    <h2 class="text-center mb-4">{{ title }}</h2>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>
