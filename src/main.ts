import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './assets/main.css';

// Import pages
import PHome from '~/components/pages/p-home/p-home.vue';

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PHome
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('~/components/pages/p-not-found/p-not-found.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0, behavior: 'smooth' };
  }
});

// Create Vue app
const app = createApp(App);

// Use router
app.use(router);

// Mount app
app.mount('#app'); 