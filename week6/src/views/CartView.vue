<template>
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
    <!-- <div class="row">
      <table class="table table-hover mt-2 text-center">
        <thead>
          <tr class>
            <th class="py-1">產品名稱</th>
            <th class="py-1">產品類型</th>
            <th class="py-1">原價</th>
            <th class="py-1">售價</th>
            <th class="py-1">商品狀態</th>
            <th class="py-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="align-middle" v-for="item in data" :key="item.id">
            <td width="10%" class="align-middle">
              <div class="d-flex justify-content-center align-items-center">
                <div class="mx-0 my-auto">
                  <img
                    style="max-height: 80px; display: block"
                    :src="item.imageUrl || item.imagesUrl[0]"
                    alt="img"
                  />
                </div>
              </div>
            </td>
            <td width class="text-start">{{ item.title }}</td>
            <td width="10%">{{ item.category }}</td>
            <td width="10%">{{ item.origin_price }}</td>
            <td width="10%">{{ item.price }}</td>
            <td width="10%" class="text-center">
              <span
                v-if="item.is_enabled === 1"
                class="badge rounded-pill bg-success fs-6 fw"
                >銷售中</span
              >
              <span
                v-else-if="item.is_enabled === 2"
                class="badge rounded-pill bg-danger fs-6"
                >已售完</span
              >
              <span
                v-else-if="item.is_enabled === 3"
                class="badge rounded-pill bg-secondary fs-6"
                >下架</span
              >
            </td>
            <td width="20% ">
              <button
                type="button"
                class="btn btn-success me-3"
                data-id="index"
                @click="openProductModal(item.id)"
                :id="productId"
              >
                查看
              </button>

              <button
                type="button"
                class="btn btn-outline-danger"
                :disabled="item.is_enabled === !1"
                data-id="index"
                @click="addToCart(item.id)"
              >
                加入購物車
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
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
    };
  },
  methods: {
    // 取得購物車
    getCartItem() {
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
      )
        .then((res) => {
          this.cartData = res.data.data;
          // console.log('取得購物車');
        })
        .catch(() => {
          // this.$refs.errorModal.openErrorModal('購物車資料失敗');
        });
    },
    // 刪除購物車
    removeCartItem(id) {
      let cart = `cart/${id}`;
      if (typeof id !== 'string') cart = 'carts';
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/${cart}`,
        )
        .then(() => {
          // console.log('刪除購物車成功');
          emitter.emit('get-cart');
          this.getCartItem();
        })
        .catch(() => {});
    },

    // 更新購物車
    updateCartItem(item) {
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
          // console.log('更新購物車成功');
          this.getCartItem();
        })
        .catch(() => {});
    },
    getproduct() {
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`,
      )
        .then((res) => {
          // console.log('getproduct', res);
          this.data = res.data.products;
        })
        .catch(() => {
          // console.log();
        });
    },
    addToCart(id, qty = 1) {
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
          // console.log(data);
          emitter.emit('get-cart');
        })
        .catch(() => {});
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
