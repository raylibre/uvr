import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './i18n';
import './assets/main.css';
import './styles/global.scss';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';

// Create Vue app
const app = createApp(App);

// Use plugins
app.use(router);
app.use(i18n);

// Mount app
app.mount('#app'); 
