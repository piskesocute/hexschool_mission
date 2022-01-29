import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";


let selectModal = ""
let deleteModal = ""

const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      path: 'evan-classuse',
      productsList: [],
      is_Edit: null,
      itemList: {
        imagesUrl: ['']
      },
    }
  },
  methods: {

    // --modal區--

    // 開啟新增商品modal按鈕
    addNewData() {
      this.is_Edit = 0;
      this.itemList = {
        imagesUrl: ['']
      };
      selectModal.show()

    },
    // 開啟查看或編輯modal按鈕
    checkItem(item, index) {
      this.is_Edit = 1;
      this.itemList = item
      // 判斷商品賣完了沒，還沒串購買頁面先這樣示範
      if (this.itemList.quantity < 1) this.itemList.is_enabled = 2
      selectModal.show()

    },
    // 開啟刪除modal
    openDeleteModal(item) {
      this.itemList = item
      deleteModal.show()
    },

    closeAddEditModal() {
      selectModal.hide()
    },



    //deleteApi
    deleteData(id) {
      const url = `${this.apiUrl}/api/${this.path}/admin/product/${id}`
      axios.delete(url)
        .then((res) => {
          console.log(res.data);
        }).catch((err) => {
          console.log(err);
        })
    },
    // push&putapi
    pushData(id) {
      let url = `${this.apiUrl}/api/${this.path}/admin/product`
      let methods = 'post'
      if (this.is_Edit === 1) {
        console.log(id);
        url = `${this.apiUrl}/api/${this.path}/admin/product/${id}`
        methods = 'put'
      }
      console.log(methods);
      console.log({ data: this.itemList });

      axios[methods](url, { data: this.itemList })
        .then((res) => {
          console.log(res.data);
        }).catch((err) => {
          console.dir(err)
        })

    },

    //登入驗證
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
    // 取得點擊項目資料
    getProductList() {
      const url = `${this.apiUrl}/api/${this.path}/admin/products`
      axios.get(url)
        .then((res) => {
          this.productsList = res.data.products
          console.log(this.productsList);
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },

    // 登出
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
    // 取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)backstageCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin()
    console.log(token);

    // datalistmodal
    selectModal = new bootstrap.Modal(document.getElementById('selectModal'))
    // deletemodal
    deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))

  },
})
app.mount('#app')