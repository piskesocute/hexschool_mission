/* global axios */
/* global bootstrap */
// eslint-disable-next-line
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const path = 'evan-classuse';

const app = createApp({
  data() {
    return {
      cartData: {},
      products: [],
      productId: '',
      isLoadingItem: '',
    };
  },
  methods: {
    getProducts() {
      axios.get(`${apiUrl}/api/${path}/products/all`)
        .then((res) => {
          console.log('getProducts', res);
          this.products = res.data.products;
        });
    },
    openProductModal(id) {
      this.productId = id;
      this.$refs.productModal.openModal();
    },
    getCart() {
      axios.get(`${apiUrl}/api/${path}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
          console.log('getCart', this.cartData);
        });
    },
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id;
      axios.post(`${apiUrl}/api/${path}/cart`, { data })
        .then((res) => {
          console.log('addToCart', res);
          this.getCart();
          this.isLoadingItem = '';
          this.$refs.productModal.closeModal();
        });
    },
    removeCartItem(id) {
      console.log(id);
      this.isLoadingItem = id;
      axios.delete(`${apiUrl}/api/${path}/cart/${id}`)
        .then((res) => {
          console.log('remove', res);
          this.getCart();
          this.isLoadingItem = '';
        });
    },
    updataCartItem(item) {
      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      this.isLoadingItem = item.id;
      axios.put(`${apiUrl}/api/${path}/cart/${item.id}`, { data })
        .then((res) => {
          console.log('addToCart', res);
          this.getCart();
          this.isLoadingItem = '';
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
});

// $refs
app.component('product-modal', {
  props: ['id'],
  template: '#userProductModal',
  data() {
    return {
      modal: {},
      product: {},
      qty: 1,
    };
  },
  watch: {
    id() {
      this.getProducts();
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    getProducts() {
      axios.get(`${apiUrl}/api/${path}/product/${this.id}`)
        .then((res) => {
          this.product = res.data.product;
          console.log(this.product);
        });
    },
    addToCart() {
      this.$emit('add-cart', this.product.id, this.qty);
      this.qty = 1;
    },

  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
});
app.mount('#app');
