import { defineStore } from 'pinia';
import {
  users as InitialUsers,
  roles as InitialRoles,
  initialActivity,
  getUsers,
  getRoles,
} from '@/mock-api/mockApi';
import { ref, watch } from 'vue';

export const useRbacStore = defineStore('rbac', () => {
  const currentUser = ref('Admin')
  const currentPermissions = ref({read:true,write:true,delete:true})
  const users = ref([...InitialUsers]);
  const roles = ref([...InitialRoles]);
  const dashboardMetrics = ref({});
  const recentActivity = ref([...initialActivity]);

  // Fetch Methods
  const fetchUsers = async () => {
    users.value = await getUsers();
    fetchDashboardMetrics();
  };

  const fetchRoles = async () => {
    roles.value = await getRoles();
    fetchDashboardMetrics(); 
  };

  const addRecentActivity = (type, action) => {
    const newActivity = {
      user:type, 
      action, 
      timestamp: new Date().toLocaleString(),
    };
    recentActivity.value.unshift(newActivity); // Add to the top of the array
    // Optionally limit activity history to a certain number
    if (recentActivity.value.length > 50) {
      recentActivity.value.pop(); // Remove oldest activity
    }
  };

  const fetchDashboardMetrics = () => {
    dashboardMetrics.value = {
      totalUsers: users.value.length,
      activeUsers: users.value.filter((u) => u.status).length,
      totalRoles: roles.value.length,
      inactiveUsers : users.value.filter((u) => !u.status).length,
    };
  };

  // const fetchRecentActivity = async () => {
  //   recentActivity.value = await getRecentActivity();
  // };

  // CRUD Operations for Users
  const addUserToStore = async (user) => {
    users.value.unshift ({ id: users.value.length + 1, ...user });
    console.log({id:users.value.length + 1 ,...user})
    fetchDashboardMetrics(); 
    addRecentActivity('user', `User ${user.name} added.`);
  };

  const updateUserInStore = async (id, updatedData) => {
    const index = users.value.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.value[index] = updatedData; 
    }
    fetchDashboardMetrics(); 
    addRecentActivity('user', `User ${updatedData.name} updated.`);
  };

  const deleteUserFromStore = (id) => {
    users.value = users.value.filter((user) => user.id !== id);
    fetchDashboardMetrics(); 
    addRecentActivity('user', `User deleted.`);
  };

  const addRoleToStore = async (role) => {
    roles.value.push({ id: roles.value.length + 1, ...role });
    fetchDashboardMetrics(); 
    addRecentActivity('role', `Role ${role.name} added.`);
  };

  const updateRoleInStore = async (id, updatedData) => {
    const index = roles.value.findIndex((role) => role.id === id);
    if (index !== -1) {
      roles.value[index] = { ...roles.value[index], ...updatedData };
    }
    fetchDashboardMetrics();
    addRecentActivity('role', `Role ${updatedData.name} updated.`);
  };

  const deleteRoleFromStore = async (id) => {
    roles.value = roles.value.filter((role) => role.id !== id);
    fetchDashboardMetrics();
    addRecentActivity('role', `Role deleted.`);
  };

  const setPermissions = (data) => {
    currentPermissions.value = data
  }

  // Automatically Update Metrics on Changes
  watch([users, roles], () => {
    fetchDashboardMetrics();
  });

  return {
    users,
    roles,
    dashboardMetrics,
    recentActivity,
    fetchUsers,
    addUserToStore,
    updateUserInStore,
    deleteUserFromStore,
    fetchRoles,
    addRoleToStore,
    updateRoleInStore,
    deleteRoleFromStore,
    fetchDashboardMetrics,
    setPermissions,
    currentUser,
    currentPermissions
  };
});
