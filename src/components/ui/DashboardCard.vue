<template>
  <div class="bg-white shadow-md rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
    <h2 class="text-lg font-bold text-gray-700 mb-2">{{ title }}</h2>
    <p class="text-4xl font-extrabold text-blue-500">{{ value }}</p>
  </div>
</template>

<script setup>
const props = defineProps(['title','value'])
</script>

<style scoped>
/* Add scoped styles if needed, though Tailwind is sufficient here. */
</style>
