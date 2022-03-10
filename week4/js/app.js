/* global axios */

// eslint-disable-next-line
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const app = createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const apiUrl = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(apiUrl, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `backstageCookie=${token}; expires=${new Date(expired)}; path=/`;
          window.location.href = './backstage.html';
        }).catch((err) => {
          alert(`${err.response.data.message}\r${err.response.data.error.message}`);
          window.location.reload();
        });
    },
  },
});
app.mount('#app');
