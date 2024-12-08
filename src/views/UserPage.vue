<script setup>
import Datagrid from '@/components/ui/Datagrid.vue';
import { useRbacStore } from '@/stores/rbacStore';
import { useConfirm } from '@/composables/useConfirm';
import Slider from '@/components/ui/Slider.vue';
import { computed, ref } from 'vue';
import Toggle from '@/components/ui/Toggle.vue';

const { show } = useConfirm();

const store = useRbacStore();
const isOpen = ref(false);
const userFormRef = ref(null)
const selectedUserId = ref(null)

const initialData = () => ({name: '', email: '', role: '', status: true })

const formData = ref(initialData());
const errors = ref({ name: '', email: '', role: '', status: '' });

const columns = [
  { key: 'id', title: 'ID', searchType: 'text' },
  { key: 'name', title: 'NAME', searchType: 'text' },
  { key: 'email', title: 'EMAIL' },
  { key: 'role', title: 'ROLE', searchType: 'text' },
  { key: 'status', title: 'STATUS', slot: 'status' },
  { key: 'action', title: 'ACTION', slot: 'action' },
];

const deleteUser = async (id) => {
  const confirmed = await show({
    title: 'Delete Item',
    message: 'Do you really want to delete this item?',
    confirmText: 'Yes, Delete',
    cancelText: 'No, Cancel',
  });

  if (confirmed) {
    store.deleteUserFromStore(id);
  }
};

const editUser = (data) => {
  isOpen.value = true;
  formData.value = { ...data };
  errors.value = {}; 
  selectedUserId.value = data ? data.id : 0;

};

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!formData.value.name) {
    errors.value.name = 'Name is required.';
    isValid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!formData.value.email || !emailPattern.test(formData.value.email)) {
    errors.value.email = 'Valid email is required.';
    isValid = false;
  }

  if (!formData.value.role) {
    errors.value.role = 'Role is required.';
    isValid = false;
  }

  if (formData.value.status === undefined) {
    errors.value.status = 'Status is required.';
    isValid = false;
  }

  return isValid;
};

const submitForm = () => {
  if (validateForm()) {
    if (selectedUserId.value > 0) {
      store.updateUserInStore(formData.value.id, formData.value);
    } else {
      store.addUserToStore(formData.value);
    }
    isOpen.value = false;
  }
};

const userRoles = computed(() => {
  const array = []
  store.roles.forEach(element => array.push(element.name))

  return array
})

</script>

<template>
  <Slider v-model:isOpen="isOpen" @submit="userFormRef?.requestSubmit()">
    <template #title>{{ selectedUserId > 0 ? 'Edit User' : 'Add User' }}</template>
      <form @submit.prevent="submitForm" ref="userFormRef" class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full text-left h-1/2">
        <div class="p-0">
          <label for="name" class="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="p-2 border rounded w-full"
            placeholder="Enter your name"
            :class="{'border-red-500': errors.name}"
          />
          <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
        </div>
        <div>
          <label for="email" class="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="p-2 border rounded w-full"
            placeholder="Enter your email"
            :class="{'border-red-500': errors.email}"
          />
          <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
        </div>

        <div>
          <label for="role" class="block text-sm font-semibold mb-2">Role</label>
          <select
            id="role"
            v-model="formData.role"
            class="p-2 border rounded w-full"
            :class="{'border-red-500': errors.role}"
          >
            <option value="">Select a role</option>
            <template v-for="role in userRoles">
              <option :value="role">{{ role }}</option>              
            </template>
          </select>
          <p v-if="errors.role" class="text-sm text-red-500">{{ errors.role }}</p>
        </div>
        <div class="flex items-center gap-5 md:justify-center">
          <label for="status" class="block text-sm font-semibold mb-2">Status</label>
          <Toggle v-model="formData.status"/>
          <p v-if="errors.status" class="text-sm text-red-500">{{ errors.status }}</p>
        </div>
      </form>
      
  </Slider>
<template v-if="store.currentPermissions.read">


  <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Manage Users</h1>
      <button
        v-if="store.currentPermissions.write"
        @click="editUser(initialData())"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
      >
      <i class="lni lni-plus"></i>  
      <span>Add User</span>
      </button>
    </div>
  <Datagrid :columns="columns" :data="store.users" @rowclick="editUser">
    <template #status="{ data }">
      <div
        class="rounded shadow-sm px-3 py-1 font-semibold"
        :class="{
          'bg-green-500/20 text-green-500': Boolean(data.status),
          'bg-red-500/20 text-red-500': !Boolean(data.status),
        }"
      >
        {{ data.status ? 'ACTIVE' : 'INACTIVE' }}
      </div>
    </template>
    <template #action="{ data }">
      <div class="mt-4 flex justify-center gap-3">
        <button
          v-if="store.currentPermissions.write"
          @click="editUser(data)"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
        >
          <i class="lni lni-pencil-1"></i>
          <span>Edit</span>
        </button>
        <button
        v-if="store.currentPermissions.delete"
          @click="deleteUser(data.id)"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
        >
          <i class="lni lni-trash-3"></i>
          <span>Delete</span>
        </button>
      </div>
    </template>
  </Datagrid>
  </template>
  <div class="p-6" v-else>
    <h1>Oops! You are not allowed to view this</h1>
  </div>
</template>
