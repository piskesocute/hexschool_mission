import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
import pagenation from "./pagenation.js";
import addeditmodal from "./addeditmodal.js";
import removemodal from "./removemodal.js";
import deletebatchmodal from "./deletebatchmodal.js";
import successmodal from "./successmodal.js";
import errormodal from "./errormodal.js";

let selectModal = "";
let deleteModal = "";
let successModal = "";
let errorModal = '';
let deletebatchModal = '';

const app = createApp({
  components: {
    pagenation,
    addeditmodal,
    removemodal,
    deletebatchmodal,
    successmodal,
    errormodal,
  },
  data() {
    return {
      apiObj: {
        apiUrl: 'https://vue3-course-api.hexschool.io/v2',
        path: 'evan-classuse',
      },
      productsList: [],
      itemList: {
        imagesUrl: [],
      },
      is_Edit: null,
      deleteBatchArr: [],
      deletebatcherrdata: [],
      pagination: {},
    }
  },
  methods: {
    //modal區
    // 開啟新增商品modal按鈕
    addNewData() {
      this.is_Edit = 0;
      this.itemList = {
        imagesUrl: ['']
      };
      selectModal.show();
    },
    // 開啟查看或編輯modal按鈕
    checkItem(item) {
      this.is_Edit = 1;
      this.itemList = JSON.parse(JSON.stringify(item));
      // 判斷商品數量，售完則將狀態改為2
      if (this.itemList.quantity < 1) this.itemList.is_enabled = 2;
      if (!this.itemList.imagesUrl) {
        this.itemList.imagesUrl = [''];
      }
      selectModal.show()
    },
    // 開啟刪除modal
    openDeleteModal(item) {
      this.is_Edit = 2;
      this.itemList = item
      deleteModal.show()
    },
    openDeletebatchModal() {
      this.is_Edit = 3;
      deletebatchModal.show();
    },
    // 開啟操作成功Modal
    openSuccessModal() {
      successModal.show();
    },
    // 開啟操作失敗Modal
    openErrorModal() {
      errorModal.show();
    },
    // 關閉增刪查找modal
    closeModal() {

      if (this.is_Edit <= 1) {
        selectModal.hide();
      } else if (this.is_Edit === 2) {
        deleteModal.hide();
      } else if (this.is_Edit === 3) {
        deletebatchModal.hide();
      } else if (this.is_Edit === 4) {
        deletebatchModal.hide();
      }
    },
    // 關閉操作成功
    closeSuccessModal() {
      successModal.hide();
      this.getProductList();

    },
    // 關閉操作失敗
    closeErrorModal() {
      errorModal.hide();
      this.getProductList();
    },
    // api操作
    // push & put api
    pushData(id) {
      let url = `${this.apiObj.apiUrl}/api/${this.apiObj.path}/admin/product`
      let methods = 'post'
      if (this.is_Edit === 1) {
        url = `${this.apiObj.apiUrl}/api/${this.apiObj.path}/admin/product/${id}`
        methods = 'put'
      }
      axios[methods](url, { data: this.itemList })
        .then((res) => {
          this.closeModal();
          this.openSuccessModal();
        }).catch((err) => {
          this.closeModal();
          this.openErrorModal();
        })
    },
    //刪除deleteApi
    deleteData(id) {
      let url = `${this.apiObj.apiUrl}/api/${this.apiObj.path}/admin/product/${id}`
      axios.delete(url)
        .then((res) => {
          this.closeModal();
          this.openSuccessModal()
        }).catch((err) => {
          this.closeModal();
          this.openErrorModal();
        })
    },
    // 將checkbox 選取的商品送入刪除序列
    checkItemInDeleteArr(item) {
      let isInArr = this.deleteBatchArr.indexOf(item)
      if (isInArr < 0) {
        this.deleteBatchArr.push(item)
      } else {
        this.deleteBatchArr.splice(isInArr, 1)
      }
    },
    //登入驗證
    checkLogin() {
      const url = `${this.apiObj.apiUrl}/api/user/check`
      axios.post(url)
        .then((res) => {
          this.getProductList()
        }).catch((err) => {
          alert(err.data.message)
        })
    },
    // 取得資料
    getProductList(page = 1) {
      this.itemList = {
        imagesUrl: [],
      }
      this.is_Edit = null
      this.deleteBatchArr = []
      this.deletebatcherrdata = []
      const url = `${this.apiObj.apiUrl}/api/${this.apiObj.path}/admin/products/?page=${page}`
      axios.get(url)
        .then((res) => {
          this.productsList = res.data.products;
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          alert(err.data.message)
          window.location.href = "./index.html"
        })
    },
    // 登出
    LogOut() {
      const urlLogout = `${this.apiObj.apiUrl}/logout`;
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
    // add&edit modal
    selectModal = new bootstrap.Modal(document.getElementById('selectModal'), { backdrop: 'static', keyboard: false });
    // delete modal
    deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false });
    //successModal
    successModal = new bootstrap.Modal(document.getElementById('successModal'));
    // errorModal
    errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    //批量刪除
    deletebatchModal = new bootstrap.Modal(document.getElementById('deletebatchModal'));
  },
})
app.mount('#app')
