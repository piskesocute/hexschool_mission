import { createApp } from 'vue';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import router from './router';
import App from './App.vue';
import { date, currency } from './libs/filter';

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};
app.use(router);
app.use(VueAxios, axios);
// eslint-disable-next-line
app.component('Loading', Loading);
app.mount('#app');
