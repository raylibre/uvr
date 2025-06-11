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

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
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
