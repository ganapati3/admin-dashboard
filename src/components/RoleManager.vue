<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRbacStore } from '@/stores/rbacStore';
import Popup from './ui/Popup.vue';
import Toggle from './ui/Toggle.vue';
import { useConfirm } from '@/composables/useConfirm';

const { show } = useConfirm();
const store = useRbacStore()

const roles = ref([]);
const showModal = ref(false)
const selectedRoleId = ref(null)
const roleFormRef = ref(null)

onMounted(async () => {
  roles.value = store.roles
})

watch(() => store.roles, () => {
  roles.value = store.roles
})


const newRole = reactive({
  id: null,
  name: '',
  description: '',
  permissions:{read:false,write:false,delete:false,}
});

const isEditMode = ref(false);

const saveRole = async() => {
  if (isEditMode.value) {
    store.updateRoleInStore(selectedRoleId.value,newRole)
  } else {
    store.addRoleToStore(newRole)
  }
  // await store.fetchRoles()
  resetForm();
  showModal.value = false;
};

// Edit Role
const editRole = (id) => {
  isEditMode.value = true;
  const edited = roles.value.filter(item => item.id === id)[0];
  selectedRoleId.value = id
  Object.assign(newRole,edited)
  showModal.value = true;
};

// Delete Role
const deleteRole = async (id) => {
  const confirmed = await show({
    title: 'Delete Item',
    message: 'Do you really want to delete this item?',
    confirmText: 'Yes, Delete',
    cancelText: 'No, Cancel',
  });

  if (confirmed) {
    store.deleteRoleFromStore(id)
  } 
};

// Reset Form
const resetForm = () => {
  newRole.name = '';
  newRole.description = '';
  isEditMode.value = false;
  selectedRoleId.value = null;
};

const getPermissions = (id) => {
  const role = roles.value.filter(item => item.id === id)[0]

  const permissions = []
  for (const key in role.permissions) {
    if (role.permissions[key]) {
      permissions.push(key)   
    }
  }

  return permissions.join(',')
}

</script>

<template>
  <Popup :title="isEditMode ? 'Update Role' : 'Add New Role '" v-model="showModal" @submit="roleFormRef.requestSubmit()">
    <form ref="roleFormRef" @submit.prevent="saveRole" class="text-left">
      <div class="mb-4">
        <label for="roleName" class="block text-sm font-semibold mb-2">Role Name</label>
        <input
          id="roleName"
          v-model="newRole.name"
          type="text"
          class="p-2 border rounded w-full"
          placeholder="Enter role name"
          required
        />
      </div>

      <div class="mb-4">
        <p class="block text-sm font-semibold mb-2">Permissions</p>
        <div class="grid grid-cols-3">
          <template v-for="(permission, key) in newRole.permissions" :key="key">
            <div class="flex items-center gap-2">
              <label :for="key" class="capitalize">{{ key }}</label>
              <Toggle v-model="newRole.permissions[key]" :id="key" />
            </div>
          </template>
        </div>
      </div>

      <div class="mb-4">
        <label for="roleDescription" class="block text-sm font-semibold mb-2">Description</label>
        <textarea
          id="roleDescription"
          v-model="newRole.description"
          class="p-2 border rounded w-full"
          placeholder="Enter role description"
        ></textarea>
      </div>
      <button type="submit">submit</button>
    </form>
  </Popup>
  <div class="p-4 pt-0">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Manage Roles</h1>
      <button
        v-if="store.currentPermissions.write"
        @click="showModal = true; resetForm()"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
      >
      <i class="lni lni-plus"></i>  
      <span>Add Role</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="role in roles"
        :key="role.id"
        class="p-4 border rounded-lg shadow-sm hover:shadow-md"
      >
        <h2 class="text-xl font-semibold">{{ role.name }}</h2>
        <p class="text-gray-600 mt-2">{{ role.description }}</p>
        <p class="text-gray-600 mt-2">Permissions: {{ getPermissions(role.id) }}</p>
        <div class="mt-4 flex justify-center gap-3">
          <button
            v-if="store.currentPermissions.write"
            @click="editRole(role.id)"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
          >
          <i class="lni lni-pencil-1"></i>
          <span>Edit</span>
        </button>
        <button
        v-if="store.currentPermissions.delete"
        @click="deleteRole(role.id)"
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
        >
          <i class="lni lni-trash-3"></i>
          <span>
            Delete
          </span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
