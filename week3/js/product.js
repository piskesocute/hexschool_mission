import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";



let selectModal = "";
let deleteModal = "";
let successModal = "";
let errorModal = '';
let deletebatchModal = '';
let Timer = ''
const app = createApp({
  data() {
    return {

      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      path: 'evan-classuse',
      productsList: [],

      itemList: {
        imagesUrl: ['']
      },
      is_Edit: null,
      deleteBatchArr:[],
    }
  },
  methods: {
    // --modal區--
    // 1、新增
    // 2、查找編輯
    // 3、刪除
    // 4、操作成功
    // 5、操作失敗

    // 開啟新增商品modal按鈕
    addNewData() {
      this.is_Edit = 0;
      this.itemList = {
        imagesUrl: ['']
      };
      selectModal.show()
    },
    // 開啟查看或編輯modal按鈕
    checkItem(item) {
      this.is_Edit = 1;
      this.itemList = item
      // 判斷商品數量，售完則將狀態改為2
      if (this.itemList.quantity < 1) this.itemList.is_enabled = 2
      selectModal.show()
    },
    // 開啟刪除modal
    openDeleteModal(item) {
      this.is_Edit = 2;
      this.itemList = item
      deleteModal.show()
    },
    openDeletebatchModal(){
      this.is_Edit = 3;
      deletebatchModal.show();
    },
    // 開啟操作成功Modal
    openSuccessModal() {
      successModal.show()
      Timer = setTimeout(() => {
        successModal.hide()
        window.location.reload();
      }, 3000);
    },
    // 開啟操作失敗Modal
    openErrorModal() {
      errorModal.show();
    },
    

    // --modal區--
    // 1、新增查找編輯刪除
    // 2、操作成功
    // 3、操作失敗

    closeModal(){
      if (this.is_Edit<=1){
        selectModal.hide();
      }else if(this.is_Edit===2){
        deleteModal.hide();
      }else if(this.is_Edit===3){
        deletebatchModal.hide();
      }
    },
    // 關閉操作成功
    closeSuccessModal(){
      clearTimeout(this.Timer);
      successModal.hide()
    },
    // 關閉操作失敗
    closeErrorModal(){
      errorModal.hide()
    },

    // api操作
    // push & put api
    pushData(id) {
      let url = `${this.apiUrl}/api/${this.path}/admin/product`
      let methods = 'post'

      if (this.is_Edit === 1) {
        console.log(id);
        url = `${this.apiUrl}/api/${this.path}/admin/product/${id}`
        methods = 'put'
      }
      axios[methods](url, { data: this.itemList })
        .then((res) => {
          console.log(res.data);
          this.closeModal();
          this.openSuccessModal();
        }).catch((err) => {
          console.dir(err)
          this.closeModal();
          this.openErrorModal();
        })
    },
    //deleteApi
    deleteData(id) {
      let url = `${this.apiUrl}/api/${this.path}/admin/product/${id}`
      console.log(url);
      axios.delete(url)
        .then((res) => {
          
          this.closeModal();
          this.openSuccessModal()
        }).catch((err) => {
          console.log(err);
          this.closeModal();
          this.openErrorModal();
        })
    },
    deleteBatchData(){
      this.deleteBatchArr.forEach((item)=>{
        let url = `${this.apiUrl}/api/${this.path}/admin/product/${item}`;

        axios.delete(url)
        .then((res) => {
          console.log(res.data);
          this.closeModal();
          this.openSuccessModal()
        }).catch((err) => {
          console.log(err);
          this.closeModal();
          this.openErrorModal();
        })
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

    // 取得資料
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
    test(item){
      let isInArr = this.deleteBatchArr.indexOf(item)
      if (isInArr < 0) {
        this.deleteBatchArr.push(item)
      }else{
        this.deleteBatchArr.splice(isInArr,1)
      }
      console.log("在陣列的",isInArr);
      console.log("目前陣列內容",this.deleteBatchArr);
    }
  },

  
  mounted() {
    // 取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)backstageCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin()
    console.log(token);

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