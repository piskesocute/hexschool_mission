/* global axios */
/* global Vue */
/* global VeeValidate */
/* global VeeValidateRules */
/* global VeeValidateI18n */
/* global VueLoading */

// eslint-disable-next-line
import frontproductmodal from './frontProductModal.js';
// eslint-disable-next-line
import successmodal from './successModal.js';
// eslint-disable-next-line
import errormodal from './errorModal.js';

const api = 'https://vue3-course-api.hexschool.io/';
const path = 'evan-classuse';
const {
  defineRule, Form, Field, ErrorMessage, configure,
} = VeeValidate;
const {
  required, email, min, max, regex,
} = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('regex', regex);

// 宣告
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');
// 載入
configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: true, // true => 不會lazy
});

const app = Vue.createApp({
  components: {
    frontproductmodal,
    VForm: Form,
    VField: Field,
    ErrorMessage,
    successmodal,
    errormodal,

  },
  data() {
    return {
      cartData: {},
      data: [],
      product: {},
      page: '1',
      modal: {},
      productId: '',
      isLoading: false,
      orderData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },

  methods: {
    // 取得產品資料
    getproduct() {
      axios.get(`${api}v2/api/${path}/products?page=${this.page}`).then((res) => {
        this.data = res.data.products;
      }).catch(() => {
        this.$refs.errorModal.openErrorModal('資料取得失敗');
      });
    },
    // 打開產品視窗
    openProductModal(id) {
      this.productId = id;
      this.$refs.productModal.openModal();
    },
    // 新增購物車
    addToCart(id, qty = 1) {
      this.isLoadingFn();
      const data = {
        product_id: id,
        qty,
      };
      axios.post(`${api}v2/api/${path}/cart`, { data })
        .then(() => {
          this.getCartItem();
          this.isLoadingFn();
          this.$refs.productModal.closeModal();
          this.$refs.successModal.opemSuccessModal('已添加至購物車');
        }).catch(() => {
          this.$refs.errorModal.openErrorModal('新增購物車失敗');
        });
    },
    // 取得購物車資料
    getCartItem() {
      axios.get(`${api}v2/api/${path}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        }).catch(() => {
          this.$refs.errorModal.openErrorModal('購物車資料失敗');
        });
    },
    // 移除購物車品項
    removeCartItem(id) {
      this.isLoadingFn();
      let cart = `cart/${id}`;
      if (typeof id !== 'string') cart = 'carts';
      axios.delete(`${api}v2/api/${path}/${cart}`)
        .then(() => {
          this.getCartItem();
          this.isLoadingFn();
          this.$refs.successModal.opemSuccessModal('已刪除購物車商品');
        }).catch(() => {
          this.$refs.errorModal.openErrorModal('購物車刪除失敗');
        });
    },
    // 更新購物車
    updateCartItem(item) {
      this.isLoadingFn();
      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      axios.put(`${api}/v2/api/${path}/cart/${item.id}`, { data })
        .then(() => {
          this.getCartItem();
          this.isLoadingFn();
          this.$refs.successModal.opemSuccessModal('已更新購物車商品');
        }).catch(() => {
          this.$refs.errorModal.openErrorModal('購物車更新失敗');
        });
    },
    isLoadingFn() {
      this.isLoading = !this.isLoading;
    },
    isPhone(value) {
      if (value) {
        const phoneNumber = /^(09)[0-9]{8}$/;
        return phoneNumber.test(value) ? true : '需要正確的電話號碼';
      }
      return '此欄為必填';
    },

    pushOrder() {
      this.isLoadingFn();
      const data = this.orderData;
      axios.post(`${api}v2/api/${path}/order`, { data })
        .then(() => {
          this.getCartItem();
          this.isLoadingFn();
          this.$refs.productModal.closeModal();
          this.$refs.successModal.opemSuccessModal('已送出訂單');
        }).catch(() => {
          this.$refs.errorModal.openErrorModal('訂單送出失敗');
        });
    },
  },
  mounted() {
    this.getproduct();
    this.getCartItem();
  },
});

// eslint-disable-next-line
app.component('Loading', VueLoading.Component);
app.mount('#app');
