<script>
import ModalMixin from '@/mixins/ModalMixin';

export default {
  data() {
    return {
      orderList: {
        products: {},
        user: {},
      },
    };
  },
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['update-order'],
  watch: {
    order() {
      this.orderList = this.order;
    },
  },
  mixins: [ModalMixin],
};
</script>
<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">訂單內容</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <h5>訂購人資訊</h5>
            <div class="row border-bottom mb-3">
              <div class="col-md-3 mb-2">
                <!-- eslint-disable-next-line -->
                <label for="username" class="form-label">訂購人姓名</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="orderList.user.name"
                />
              </div>
              <div class="col-md-3 mb-2">
                <!-- eslint-disable-next-line -->
                <label for="usertel" class="form-label">電話</label>
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  placeholder="0912345678"
                  v-model="orderList.user.tel"
                />
              </div>
              <div class="col-md-6 mb-2">
                <!-- eslint-disable-next-line -->
                <label for="useremail" class="form-label">信箱</label>
                <input
                  type="email"
                  class="form-control"
                  id="useremail"
                  placeholder="name@example.com"
                  v-model="orderList.user.email"
                />
              </div>
              <div class="mb-3">
                <!-- eslint-disable-next-line -->
                <label for="useraddress" class="form-label">地址</label>
                <input
                  type="text"
                  class="form-control"
                  id="useraddress"
                  placeholder="台北市"
                  v-model="orderList.user.address"
                />
              </div>
            </div>
            <div class="row border-end">
              <div class="col-md-7">
                <h5>訂購商品</h5>
                <table class="table">
                  <thead class="text-center">
                    <tr>
                      <th scope="col">商品名稱</th>
                      <th scope="col" width="20%">商品數量</th>
                      <th scope="col" width="15%">金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in orderList.products"
                      :key="index"
                    >
                      <td>{{ item.product.title }}</td>
                      <td>{{ item.qty }}</td>
                      <td>{{ item.total }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-5">
                <h5>訂單狀態</h5>
                <table class="table">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <th scope="row" width="30%">訂單編號</th>
                      <td>{{ orderList.id }}</td>
                    </tr>
                    <tr>
                      <th scope="row" width="30%">訂單日期</th>
                      <td>{{ $filters.date(orderList.create_at) }}</td>
                    </tr>
                    <tr>
                      <th scope="row" width="30%">付款日期</th>
                      <td>
                        <span v-if="orderList.paid_date">
                          {{ $filters.date(orderList.paid_date) }}
                        </span>
                        <span v-else>尚未付款</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" width="30%">付款狀態</th>
                      <td>
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            v-model="orderList.is_paid"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" width="30%">結帳金額</th>
                      <td>{{ $filters.currency(orderList.total) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-order', orderList)"
          >
            更改訂單狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* * {
  outline: 1px solid #000;
} */
</style>
