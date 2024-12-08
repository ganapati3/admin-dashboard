<template>
  <div class="flex justify-between items-center">
    <div class="font-medium">{{ user.name }}</div>
    <div>
      <button @click="editUser" class="text-blue-500 hover:text-blue-700">Edit</button>
      <button @click="deleteUser" class="text-red-500 hover:text-red-700 ml-2">Delete</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: Object,
});

const emit = defineEmits(["edit", "delete"]);

const editUser = () => {
  emit("edit", props.user.id);
};

const deleteUser = () => {
  emit("delete", props.user.id);
};
</script>

<style scoped>
/* Optional: styles for user card */
</style>
