<template>
<Loading :active="isLoading" :z-index="1060"></Loading>
  <h1>cart</h1>
  <div class="container">
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="removeCartItem()"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr class="text-center">
          <th width="5%"></th>
          <th width="10%">圖片</th>
          <th width="35%">品名</th>
          <th width="10%">售價</th>
          <th width="10%">單價</th>
          <th width="10%">折扣</th>
          <th width="10%">數量/單位</th>
          <th>總價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cartData.carts">
          <tr v-for="item in cartData.carts" :key="item.product.id">
            <td>
              <div class="d-flex justify-content-center align-items-center">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)"
                >
                  <i class="fas fa-spinner fa-pulse"></i>
                  x
                </button>
              </div>
            </td>
            <td class="align-middle">
              <div class="d-flex justify-content-center align-items-center">
                <div class="mx-0 my-auto overflow-hidden">
                  <img
                    style="max-height: 80px; display: block"
                    :src="item.product.imageUrl || item.product.imagesUrl[0]"
                    alt=""
                  />
                </div>
              </div>
            </td>
            <td>
              {{ item.product.title }}
            </td>
            <td class="text-center">
              {{ item.product.origin_price }}
            </td>
            <td class="text-center fs-5">
              {{ item.product.price }}
            </td>
            <td class="text-center">
              <small
                class="text-success"
                v-if="item.product.price - item.product.origin_price !== 0"
                >省下：</small
              >{{ item.product.price - item.product.origin_price }}
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <select
                    class="form-select"
                    id=""
                    v-model="item.qty"
                    @change="updateCartItem(item)"
                  >
                    <option
                      :value="num"
                      v-for="num in 10"
                      :key="num + '12312341323'"
                    >
                      {{ num }}
                    </option>
                  </select>
                </div>
              </div>
            </td>
            <td class="text-center fs-5">
              {{ item.total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="7" class="text-end">總計</td>
          <td class="text-center fs-5">{{ cartData.final_total }}</td>
        </tr>
        <!-- <tr>
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ }}</td>
          </tr> -->
      </tfoot>
    </table>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      data: [],
      product: {},
      // 購物車資料
      cartData: {},
      page: '1',
      modal: {},
      productId: '',
      orderData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',

      },
      isLoading: false,
    };
  },
  methods: {
    // 取得購物車
    getCartItem() {
      this.isLoading = true;
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
      )
        .then((res) => {
          this.cartData = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          // this.$refs.errorModal.openErrorModal('購物車資料失敗');
          console.dir(err);
          this.isLoading = false;
        });
    },
    // 刪除購物車
    removeCartItem(id) {
      this.isLoading = true;
      let cart = `cart/${id}`;
      if (typeof id !== 'string') cart = 'carts';
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/${cart}`,
        )
        .then(() => {
          emitter.emit('get-cart');
          this.getCartItem();
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },

    // 更新購物車
    updateCartItem(item) {
      this.isLoading = true;
      const data = {
        product_id: item.id,
        qty: item.qty,
      };

      this.$http
        .put(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data },
        )
        .then(() => {
          this.getCartItem();
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },
    getproduct() {
      this.isLoading = true;
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`,
      )
        .then((res) => {
          this.data = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const data = {
        product_id: id,
        qty,
      };

      this.$http
        .post(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
          { data },
        )
        .then(() => {
          emitter.emit('get-cart');
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.getproduct();
    this.getCartItem();
  },
};
</script>

<style>
</style>
