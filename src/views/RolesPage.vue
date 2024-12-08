<script setup>
import Datagrid from '@/components/ui/Datagrid.vue';
import { useRbacStore } from '@/stores/rbacStore';
import { computed } from 'vue';

const store = useRbacStore();


const columns = [
  { key: 'id', title: 'ID', searchType: 'text' },
  { key: 'name', title: 'NAME', searchType: 'text' },
  { key: 'email', title: 'EMAIL' },
  { key: 'role', title: 'ROLE', searchType: 'text',slot:'role',class:'min-w-40' },
];

const userRoles = computed(() => {
  const array = []
  store.roles.forEach(element => array.push(element.name))

  return array
})

</script>

<template>
  <template v-if="store.currentPermissions.read">
  
  
  <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Manage Permissions</h1>
    </div>
  <Datagrid :columns="columns" :data="store.users">
    <template #role="{ data }">
      <select
            id="role"
            v-model="data.role"
            class="p-2 border rounded w-full"
            :disabled="!store.currentPermissions.write"
          >
            <template v-for="role in userRoles">
              <option :value="role">{{ role }}</option>              
            </template>
          </select>
    </template>
  </Datagrid>
  </template>
  <div class="p-6" v-else>
    <h1>Oops! You are not allowed to view this</h1>
  </div>
</template>
