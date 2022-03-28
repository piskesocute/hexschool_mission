<template>
  <h1>產品頁面total</h1>
  <div class="container">
    <div class="row row-cols-1 row-cols-lg-4 g-5">
      <div class="col" v-for="item in products" :key="item.id">
        <div class="card h-100">
          <img
            :src="item.imagesUrl[0]"
            class="card-img-top"
            style="width: 100%; height: 200px; object-fit: contain"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <div class="row align-items-center row-cols-2 row-cols-lg-2">
              <router-link
                :to="`/product/${item.id}`"
                class="btn btn-outline-dark"
                >查看產品</router-link
              >
              <button
                type="button"
                class="btn btn-primary"
                @click="addToCart(item.id)"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- {{ products[0] }} -->
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProduct() {
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`,
      ).then((res) => {
        this.products = res.data.products;
      });
    },
    addToCart(id, qty = 1) {
      // this.isLoadingFn();
      const data = {
        product_id: id,
        qty,
      };
      this.$http
        .post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then(() => {
          // console.log('加入購物車');
          emitter.emit('get-cart');
          this.getCartItem();
          // this.isLoadingFn();
          // this.$refs.productModal.closeModal();
          // this.$refs.successModal.opemSuccessModal('已添加至購物車');
        })
        .catch(() => {
          // this.$refs.errorModal.openErrorModal('新增購物車失敗');
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style>
</style>
