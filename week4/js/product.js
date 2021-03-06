/* global axios */
/* global bootstrap */
// eslint-disable-next-line
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
// eslint-disable-next-line
import pagenation from './pagenation.js';
// eslint-disable-next-line
import addeditmodal from './addEditModal.js';
// eslint-disable-next-line
import removemodal from './removeModal.js';
// eslint-disable-next-line
import deletebatchmodal from './deleteBatchModal.js';
// eslint-disable-next-line
import successmodal from './successModal.js';
// eslint-disable-next-line
import errormodal from './errorModal.js';

let selectModal = '';
let deleteModal = '';
let successModal = '';
let errorModal = '';
let deletebatchModal = '';
const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const path = 'evan-classuse';

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
      productsList: [],
      itemList: {
        imagesUrl: [],
      },
      is_Edit: null,
      deleteBatchArr: [],
      deletebatcherrdata: [],
      pagination: {},
    };
  },
  methods: {
    // modal區
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
      this.itemList = JSON.parse(JSON.stringify(item));
      // 判斷商品數量，售完則將狀態改為2
      if (this.itemList.quantity < 1) this.itemList.is_enabled = 2;
      if (!this.itemList.imagesUrl) {
        this.itemList.imagesUrl = [''];
      }
      selectModal.show();
    },
    // 開啟刪除modal
    openDeleteModal(item) {
      this.is_Edit = 2;
      this.itemList = item;
      deleteModal.show();
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
      let url = `${apiUrl}/api/${path}/admin/product`;
      let methods = 'post';
      if (this.is_Edit === 1) {
        url = `${apiUrl}/api/${path}/admin/product/${id}`;
        methods = 'put';
      }
      axios[methods](url, { data: this.itemList })
        .then(() => {
          this.closeModal();
          this.openSuccessModal();
        }).catch(() => {
          this.closeModal();
          this.openErrorModal();
        });
    },
    // 刪除deleteApi
    deleteData(id) {
      const url = `${apiUrl}/api/${path}/admin/product/${id}`;
      axios.delete(url)
        .then(() => {
          this.closeModal();
          this.openSuccessModal();
        }).catch(() => {
          this.closeModal();
          this.openErrorModal();
        });
    },
    // 將checkbox 選取的商品送入刪除序列
    checkItemInDeleteArr(item) {
      const isInArr = this.deleteBatchArr.indexOf(item);
      if (isInArr < 0) {
        this.deleteBatchArr.push(item);
      } else {
        this.deleteBatchArr.splice(isInArr, 1);
      }
    },
    // 登入驗證
    checkLogin() {
      const url = `${apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getProductList();
        }).catch((err) => {
          alert(err.data.message);
        });
    },
    // 取得資料
    getProductList(page = 1) {
      this.itemList = {
        imagesUrl: [],
      };
      this.is_Edit = null;
      this.deleteBatchArr = [];
      this.deletebatcherrdata = [];
      const url = `${apiUrl}/api/${path}/admin/products/?page=${page}`;
      axios.get(url)
        .then((res) => {
          this.productsList = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          alert(err.data.message);
          window.location.href = './index.html';
        });
    },
    // 登出
    LogOut() {
      const urlLogout = `${apiUrl}/logout`;
      const logoutConfirm = window.confirm('確定要登出嗎?');
      if (logoutConfirm) {
        axios.post(urlLogout)
          .then(() => {
            alert('成功登出，跳轉回登入頁面');
            window.location.replace('index.html');
          }).catch(() => {
            alert('登出失敗');
          });
      }
    },
  },
  mounted() {
    // 取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)backstageCookie\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();
    // add&edit modal
    selectModal = new bootstrap.Modal(document.getElementById('selectModal'), { backdrop: 'static', keyboard: false });
    // delete modal
    deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false });
    // successModal
    successModal = new bootstrap.Modal(document.getElementById('successModal'));
    // errorModal
    errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    // 批量刪除
    deletebatchModal = new bootstrap.Modal(document.getElementById('deletebatchModal'));
  },
});
app.mount('#app');
