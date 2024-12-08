<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRbacStore } from '@/stores/rbacStore';

const store = useRbacStore();

const isOpen = ref(false);
const emit = defineEmits(['toggle']);
const route = useRoute();

defineExpose({
  isOpen,
});

const userRoles = computed(() => {
  const array = []
  store.roles.forEach(element => array.push(element.name))

  return array
})

const handleChange = (e) => {
  const data = store.roles.filter(role => role.name === e.target.value)[0]?.permissions
  store.setPermissions(data)

}
</script>

<template>
  <div class="flex gap-3 items-center justify-between p-4 border-b-2 bg-white fixed top-0 left-0 w-full z-50">
    <div class="flex gap-4">
      <button
      type="button"
      class="bg-transparent text-xl m-0 p-0 md:hidden"
      @click="isOpen = !isOpen, emit('toggle', isOpen)"
    >
      <i
        class="lni lni-menu-hamburger-1"
        :class="{'lni-xmark': isOpen}"
      ></i>
    </button>
    <div class="text-lg font-semibold">{{ route.name }}</div>
    </div>
    <div>
      <select
      @change="handleChange"
      id="role"
      v-model="store.currentUser"
      class="p-2 border rounded w-full"
    >
      <template v-for="role in userRoles">
        <option :value="role">{{ role }}</option>              
      </template>
    </select>
    </div>
  </div>
</template>
