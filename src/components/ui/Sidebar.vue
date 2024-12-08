<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const props = defineProps(['isopen']);
const isSidebarOpen = ref(false);
const screenWidth = ref(window.innerWidth);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

watch(
  () => screenWidth.value,
  (newWidth) => {
    if (newWidth >= 1024) {
      isSidebarOpen.value = true;
    }
  }
);
</script>

<template>
  <div
    :class="[
      'fixed left-0 h-screen bg-white border-r-2 py-4 transition-all duration-300 ease-in-out z-[10] mt-[-2px]',
      props.isopen || screenWidth >= 1024 ? 'w-44' : 'w-0 overflow-hidden'
    ]"
  >
  <router-link to="/" class="no-underline text-inherit">
    <div
    :class="{'bg-blue-700 text-white' : route.name === 'Dashboard'}"
    class="flex items-center gap-3 hover:bg-blue-400/30 hover:!text-blue-900 p-2 w-full px-4 cursor-pointer"
    >
      <i class="lni lni-dashboard-square-1"></i>
      <span>  
        Dashboard
      </span> 
      </div>
  </router-link>
    <router-link to="/users" class="no-underline text-inherit">
  <div
    :class="{'bg-blue-700 text-white': route.name === 'Users'}"
    class="flex items-center gap-3 hover:bg-blue-400/30 hover:!text-blue-900 p-2 w-full px-4 cursor-pointer"
  >
    <i class="lni lni-user-multiple-4"></i>
    <span>Users</span>
  </div>
</router-link>

<router-link to="/roles" class="no-underline text-inherit">
  <div
    :class="{'bg-blue-700 text-white': route.name === 'Roles'}"
    class="flex items-center gap-3 hover:bg-blue-400/30 hover:!text-blue-900 p-2 w-full px-4 cursor-pointer"
  >
    <i class="lni lni-locked-2"></i>
    <span>Roles</span>
  </div>
</router-link>

  </div>

</template>
