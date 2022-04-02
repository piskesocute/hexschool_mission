<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container-fluid">
      <router-link class="nav-link navbar-brand" aria-current="page" to="/"
        >第六周作業</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/product"
              >首頁</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/product/products"
              >產品列表</router-link
            >
          </li>

          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/product/cart"
              >購物車</router-link
            >
          </li>

          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/"
              >後台</router-link
            >
          </li>
        </ul>
      </div>
      <router-link class="btn btn-danger" to="/product/cart" ref="navbarcart"
        >結帳
        <span
          v-show="cartData?.carts?.length"
          class="badge rounded-pill bg-light text-danger"
          >{{ cartData?.carts?.length }}</span
        >
      </router-link>
    </div>
  </nav>
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
    };
  },

  methods: {
    // 取得產品資料
    getCartItem() {
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
          // console.log('更新navbar', this.cartData);
        })
        .catch(() => {
          // this.$refs.errorModal.openErrorModal('購物車資料失敗');
        });
    },
  },

  mounted() {
    this.getCartItem();
    emitter.on('get-cart', () => {
      // console.log('觸發emiiter');
      this.getCartItem();
    });
  },
};
</script>

<style>
</style>
