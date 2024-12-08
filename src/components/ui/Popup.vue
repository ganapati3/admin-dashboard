<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['title','modelValue']);

const emit = defineEmits(['update:modelValue','submit']);

const visible = ref(false);

const closeModal = () => {
  emit('update:modelValue', false);
};

watch(() => props.modelValue,(newVal) => {
    visible.value = newVal;
  },{ immediate: true });
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <transition name="fade">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">{{ title }}</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>
        <div>
          <slot></slot>
        </div>
        <div class="self-end justify-self-end flex gap-3">
            <button type="button" @click="closeModal" class="bg-gray-300 hover:bg-gray-700 hover:text-white px-3 p-1 rounded-md shadow-md">
                Close
            </button>
            <button @click="emit('submit')" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white px-3 p-1 rounded-md shadow-md">
                Submit
            </button>
        </div>
      </div>
    </transition>
  </div>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>