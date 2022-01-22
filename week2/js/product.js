import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";


const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      path: 'evan-classuse',
      productsList: [],
      itemList: [],
      isClick: null,
    }
  },
  methods: {
    checkLogin() {
      const url = `${this.apiUrl}/api/user/check`
      axios.post(url)
        .then((res) => {
          this.getProductList()
        }).catch((err) => {
          alert(err.data.message)
          window.location = 'index.html';
        })
    },
    getProductList() {
      const url = `${this.apiUrl}/api/${this.path}/admin/products`
      axios.get(url)
        .then((res) => {
          this.productsList = res.data.products
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    checkItem(item, index) {
      this.itemList = item
      this.isClick = index
    },
    LogOut() {
      const urlLogout = `${this.apiUrl}/logout`;
      const logoutConfirm = confirm('確定要登出嗎?')
      if (logoutConfirm) {
        axios.post(urlLogout)
          .then((res) => {
            alert('成功登出，跳轉回登入頁面')
            window.location.replace('index.html')
          }).catch((err) => {
            alert('登出失敗')
          })
      }
    },
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)backstageCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin()
  },
})
app.mount('#app')