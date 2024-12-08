<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import NavBar from './components/ui/NavBar.vue';
import Sidebar from './components/ui/Sidebar.vue';
import Confirm from './components/ui/Confirm.Vue';

const isSidebarOpen = ref(false);
const sidebarRef = ref(null);
const navbarRef = ref(null)

const handleToggle = (val) => {
  isSidebarOpen.value = val;
};

const handleClickOutside = (event) => {
  const sidebarEl = sidebarRef.value?.$el || sidebarRef.value; 
  const navbarEl = navbarRef.value?.$el || navbarRef.value; 
  
  if (sidebarEl && !sidebarEl.contains(event.target) && !navbarEl.contains(event.target)) {
    isSidebarOpen.value = false;
    navbarRef.value.isOpen = false
    // console.log('clicked outside');
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="min-h-screen">
    <Confirm/>
    <nav-bar @toggle="handleToggle" ref="navbarRef"  />
    <div class="flex mt-16">
      <Sidebar :isopen="isSidebarOpen" ref="sidebarRef" />
      <main class="container mx-auto px-4 py-6 md:ml-44" @click="handleToggle(false)">
        <router-view />
      </main>
    </div>
  </div>
</template>
