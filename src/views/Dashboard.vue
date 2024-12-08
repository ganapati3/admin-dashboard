<script setup>
import { useRbacStore } from '@/stores/rbacStore';
import { onMounted, computed } from 'vue';
import DashboardCard from '@/components/ui/DashboardCard.vue';
import Datagrid from '@/components/ui/Datagrid.vue';
import { useRouter } from 'vue-router';
import RoleManager from '../components/RoleManager.vue';

const router = useRouter()
const store = useRbacStore();

const columns = [
  { key: 'user', title: 'USER',searchType:'text' },
  { key: 'action', title: 'ACTION', searchType:'text'},
  { key: 'timestamp', title: 'TIME STAMP' },

];

onMounted(async () => {
  await store.fetchDashboardMetrics();
});

const dashboardMetrics = computed(() => store.dashboardMetrics);
const recentActivity = computed(() => store.recentActivity);

</script>

<template>
  <div class="md:p-6 space-y-8" v-if="store.currentPermissions.read">
    <RoleManager/>
    <div class="shadow-md p-3 rounded-md border">
      <h1 class=" text-xl text-left mb-3">Recent Activity</h1>
      <Datagrid :columns="columns" :data="recentActivity"/>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard title="Total Users" :value="dashboardMetrics?.totalUsers || 0" />
      <DashboardCard title="Active Users" :value="dashboardMetrics?.activeUsers || 0" />
      <DashboardCard title="Total Roles" :value="dashboardMetrics?.totalRoles || 0" />
      <DashboardCard title="Inactive Users" :value="dashboardMetrics?.inactiveUsers || 0" />
    </div>
  </div>
  <div class="p-6" v-else>
    <h1>Oops! You are not allowed to view this</h1>
  </div>
</template>


