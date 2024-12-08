<script setup>
import { useConfirm } from '@/composables/useConfirm'; 

const { visible, options, confirm, cancel } = useConfirm();
</script>

<template>
  <div v-if="visible" class="fixed inset-0 z-[110] flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 class="text-lg font-semibold mb-4">{{ options.title }}</h2>
      <p class="text-sm text-gray-600 mb-6">{{ options.message }}</p>
      <div class="flex justify-end gap-4">
        <button
          @click="cancel"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          {{ options.cancelText }}
        </button>
        <button
          @click="confirm"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {{ options.confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

