<script>
import Pagination from '@/components/PagenationComponents.vue';
import DeleteModal from '../components/DeleteModal.vue';
import CouponModal from '../components/CouponModal.vue';

export default {
  data() {
    return {
      // 優惠券暫存
      coupons: [],
      // paginationAPI內容
      pagination: {},
      isNew: false,
      couponList: {},
      nowPage: 1,
    };
  },
  components: {
    Pagination,
    DeleteModal,
    CouponModal,
  },
  methods: {
    // 優惠券取得
    getCoupon(page = 1) {
      this.nowPage = page;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal(isNew, item) {
      // 假如true則為新增，如否則為編輯
      // 避免due-date為空值
      if (isNew) {
        this.couponList = {
          due_date: new Date().getTime() / 1000,
        };
        this.isNew = true;
      } else {
        this.couponList = JSON.parse(JSON.stringify(item));
        this.isNew = false;
      }
      const ModalComponent = this.$refs.couponModal;
      ModalComponent.openModal();
    },
    updateCoupon(coupon) {
      this.couponList = coupon;
      console.log(this.couponList);
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/`;
      let http = 'post';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.couponList.id}`;
        http = 'put';
      }
      const ModalComponent = this.$refs.couponModal;

      this.$http[http](api, { data: this.couponList })
        .then(() => {
          ModalComponent.hideModal();
          this.getCoupon(this.nowPage);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeEnable(isNew, item) {
      this.isNew = isNew;
      this.updateCoupon(item);
    },
    openDelModal(item) {
      this.couponList = { ...item };
      console.log(this.couponList);
      const { deleteModal } = this.$refs;
      deleteModal.openModal();
    },
    deleteCoupon() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.couponList.id}`;
      this.$http.delete(api).then((res) => {
        console.log(res);
        const { deleteModal } = this.$refs;
        deleteModal.hideModal();
      });
    },
  },
  created() {
    this.getCoupon();
  },
};
</script>

<template>
  <CouponModal
    ref="couponModal"
    :coupon="couponList"
    @update-coupon="updateCoupon"
  ></CouponModal>
  <DeleteModal
    ref="deleteModal"
    :item="couponList"
    @del-item="deleteCoupon"
  > </DeleteModal>
  <div class="d-flex mb-3">
    <div class="ms-auto">
      <button class="btn btn-primary" type="submit" @click="openModal(true)">
        新增優惠券
      </button>
    </div>
  </div>
  <Pagination :pages="pagination" @change-page="getCoupon"></Pagination>
  <table class="table text-center align-middle">
    <thead class="text-center">
      <tr>
        <th width="15%" scope="col">優惠卷名稱</th>
        <th width="5%" scope="col">折扣</th>
        <th width="5%" scope="col">到期日</th>
        <th width="5%" scope="col">啟用狀態</th>
        <th width="10%" scope="col">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in coupons" :key="index">
        <th scope="row">{{ item.title }}</th>
        <td>{{ item.percent }}%</td>
        <td>{{ $filters.date(item.due_date) }}</td>
        <td class="">
          <div class="form-check form-switch d-flex justify-content-center">
            <!--eslint-disable-next-line-->
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              :true-value="1"
              :false-value="0"
              v-model="item.is_enabled"
              @change="changeEnable(false, item)"
            />
          </div>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="openDelModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
* {
  outline: 1px solid #000;
}
</style>
