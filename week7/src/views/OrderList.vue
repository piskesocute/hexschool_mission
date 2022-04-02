<script>
import Pagination from '@/components/PagenationComponents.vue';
import OrderModal from '@/components/OrderModal.vue';
import DeleteOrderModal from '@/components/DeleteOrderModal.vue';

export default {
  data() {
    return {
      order: [],
      pagination: {
        products: {},
        user: {},
      },
      nowPage: 1,
      orderList: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
    OrderModal,
    DeleteOrderModal,
  },
  methods: {
    getOrderList(page = 1) {
      this.isLoading = true;
      this.nowPage = page;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/?page=${this.nowPage}`;
      this.$http
        .get(api)
        .then((res) => {
          this.pagination = res.data.pagination;
          this.order = res.data.orders;
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },
    openOrderModal(order) {
      this.orderList = order;
      const ModalComponent = this.$refs.orderModal;
      ModalComponent.openModal();
    },
    updateOrder(item) {
      this.isLoading = true;
      this.orderList = item;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.orderList.id}/`;
      const ModalComponent = this.$refs.orderModal;
      this.$http
        .put(api, { data: this.orderList })
        .then(() => {
          this.getOrderList();
          ModalComponent.hideModal();
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },
    opendelOrderModal(item) {
      this.orderList = item;
      const ModalComponent = this.$refs.delOrderModal;
      ModalComponent.openModal();
    },
    delOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.orderList.id}/`;
      const ModalComponent = this.$refs.delOrderModal;
      this.$http
        .delete(api)
        .then(() => {
          this.getOrderList();
          ModalComponent.hideModal();
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },
  },
  mounted() {},
  created() {
    this.getOrderList();
  },
};
</script>
<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <OrderModal
    :order="orderList"
    ref="orderModal"
    @update-order="updateOrder"
  ></OrderModal>
  <DeleteOrderModal
    ref="delOrderModal"
    :del-order="orderList"
    @del-item="delOrder"
  ></DeleteOrderModal>

  <Pagination :pages="pagination" @change-page="getOrderList"></Pagination>
  <table class="table text-center align-middle">
    <thead class="text-center">
      <tr>
        <th width="5%" scope="col">訂單日期</th>
        <th width="5%" scope="col">電話</th>
        <th width="15%" scope="col">寄運地址</th>
        <th width="5%" scope="col">金額</th>
        <th width="5%" scope="col">付款狀態</th>
        <th width="10%" scope="col">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in order" :key="index">
        <td>{{ $filters.date(item.create_at) }}</td>
        <td>{{ item.user.tel }}</td>
        <td>{{ item.user.address }}</td>
        <td>{{ item.total }}</td>
        <td class="">
          <div class="form-check form-switch d-flex justify-content-center">
            <!--eslint-disable-next-line-->
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              v-model="item.is_paid"
              @change="updateOrder(item)"
            />
          </div>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="openOrderModal(item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="opendelOrderModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
</style>
