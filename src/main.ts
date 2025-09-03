import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { i18n } from './i18n';
import { useUserStore } from './composables/use-user-store';
// @ts-ignore - JavaScript directive without TypeScript definitions
import { Loading } from './directives/loading';
import './assets/main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'flag-icon-css/css/flag-icons.min.css';

// Service worker handling
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    // Only register SW in production
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  } else {
    // In development, make sure no SW interferes with Vite dev server
    navigator.serviceWorker.getRegistrations()
      .then((regs) => Promise.all(regs.map((r) => r.unregister())))
      .then(() => {
        if ('caches' in window) {
          caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
        }
        console.log('Service workers unregistered and caches cleared for dev');
      })
      .catch((err) => console.warn('SW cleanup failed:', err));
  }
}

// Create Vue app
const app = createApp(App);

// Use plugins
app.use(router);
app.use(i18n);

// Register global directives
app.directive('loading', Loading);

// Initialize user authentication state
const { initialize } = useUserStore();
initialize();

// Mount app
app.mount('#app'); 
