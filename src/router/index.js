import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import UsersView from '@/views/UserPage.vue';
import RolesView from '@/views/RolesPage.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: UsersView },
  { path: '/roles', name: 'Roles', component: RolesView },
  { path: '/:pathMatch(.*)*', name: 'NotFound',component: NotFound}
];

export default createRouter({
  history: createWebHashHistory('/admin-dashboard/'),
  routes,
});
