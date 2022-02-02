import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

let selectModal = '';
let deleteModal = '';
let successModal = '';
let errorModal = '';

const app = createApp({
  data() {
    return {

      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      path: 'evan-classuse',
      productsList: [],
      itemList: {
        imagesUrl: [''],
      },
      is_Edit: null,
    };
  },
  methods: {

    // --modal區--

    // 開啟新增商品modal按鈕
    addNewData() {
      this.is_Edit = 0;
      this.itemList = {
        imagesUrl: [''],
      };
      selectModal.show();
    },
    // 開啟查看或編輯modal按鈕
    checkItem(item) {
      this.is_Edit = 1;
      this.itemList = item;
      // 判斷商品賣完了沒，還沒串購買頁面先這樣示範
      if (this.itemList.quantity < 1) this.itemList.is_enabled = 2;
      selectModal.show();
    }, 
    // 開啟刪除modal
    openDeleteModal(item) {
      this.is_Edit = 2;
      this.itemList = item;
      deleteModal.show();
    },

    // 關閉彈出modal
    closeModal(){
      // 關閉新增查找
      if(this.is_Edit<=1) {
        console.log(this.is_Edit);
        selectModal.hide();
        // this.is_Edit=null;
      }
      // 關閉刪除查找
      else if(this.is_Edit===2){
        deleteModal.hide();
        // this.is_Edit=null;
      }
    },
    openFinishModal(){
    },
    // 開啟成功Modal
    openSuccessModal() {
      this.is_Edit=1
      successModal.show();
      setTimeout(() => {
        successModal.hide();
        window.location.reload();
      }, 3000);
    },
    // 開啟失敗Modal
    openErrorModal() {
      errorModal.show();
      setTimeout(() => {
        errorModal.hide();
        window.location.reload();
      }, 5000);
      
    },
    // 關閉responseModal
    closeResModal(){
      clearTimeout();
      window.location.reload();
    },

    // api操作
    // push & put api
    pushData(id) {
      let url = `${this.apiUrl}/api/${this.path}/admin/product`;
      let methods = 'post';

      if (this.is_Edit === 1) {
        console.log(id);
        url = `${this.apiUrl}/api/${this.path}/admin/product/${id}`;
        methods = 'put';
      }
      
      axios[methods](url, { data: this.itemList })
        .then((res) => {
          this.closeModal()
          this.openSuccessModal();
        }).catch((err) => {
          this.closeModal()
          this.openErrorModal();
        });
    },

    // deleteApi
    deleteData(id) {
      const url = `${this.apiUrl}/api/${this.path}/admin/product/${id}`;
      axios.delete(url)
        .then((res) => {
          this.closeModal()
          this.openSuccessModal();
        }).catch((err) => {
          this.closeModal()
          this.openErrorModal();
        });
    },

    // 登入驗證
    checkLogin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getProductList();
        }).catch((err) => {
          alert(err.data.message);
          window.location = 'index.html';
        });
    },

    // 取得資料
    getProductList() {
      const url = `${this.apiUrl}/api/${this.path}/admin/products`;
      axios.get(url)
        .then((res) => {
          this.productsList = res.data.products;
          console.log(this.productsList);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },

    // 登出
    LogOut() {
      const urlLogout = `${this.apiUrl}/logout`;
      const logoutConfirm = confirm('確定要登出嗎?');
      if (logoutConfirm) {
        axios.post(urlLogout)
          .then((res) => {
            alert('成功登出，跳轉回登入頁面');
            window.location.replace('index.html');
          }).catch((err) => {
            alert('登出失敗');
          });
      }
    },

  },
  mounted() {
    // 取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)backstageCookie\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();
    console.log(token);

    // add&edit modal
    selectModal = new bootstrap.Modal(document.getElementById('selectModal'), { backdrop: 'static', keyboard: false });
    // delete modal
    deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false });
    // successModal
    successModal = new bootstrap.Modal(document.getElementById('successModal'), { backdrop: 'static', keyboard: false });
    // errorModal
    errorModal = new bootstrap.Modal(document.getElementById('errorModal'), { backdrop: 'static', keyboard: false });
  },
});
app.mount('#app');
