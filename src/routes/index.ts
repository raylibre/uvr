import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('~/components/pages/p-home')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('~/components/pages/p-not-found')
  }
];

// Router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router; 