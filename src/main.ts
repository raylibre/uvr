import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './i18n';
import './assets/main.css';
import './styles/global.scss';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';

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

// Mount app
app.mount('#app'); 
