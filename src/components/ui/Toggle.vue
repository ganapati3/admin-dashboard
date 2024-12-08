<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['modelValue','id']);

const emits = defineEmits(['update:modelValue']);

const isChecked = ref(props.modelValue);

watch(isChecked, (newVal) => {
  emits('update:modelValue', newVal);
});

watch(
  () => props.modelValue,
  (newVal) => {
    isChecked.value = newVal;
  }
);
</script>

<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only peer"
      v-model="isChecked"
      :id="props.id"
    />
    <div
      class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    ></div>
  </label>
</template>
