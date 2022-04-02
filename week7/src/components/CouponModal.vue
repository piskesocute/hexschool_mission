<script>
import ModalMixin from '@/mixins/ModalMixin';

export default {
  data() {
    return {
      // paginationAPI內容
      pagination: {},
      // 優惠券暫存
      couponList: {
        is_enabled: 0,
      },
      // 時間暫存
      due_date: '',
    };
  },
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [ModalMixin],
  inject: ['emitter'],
  watch: {
    coupon() {
      this.couponList = this.coupon;
      if (this.coupon.is_enabled !== Number) this.couponList.is_enabled = 0;
      const dateAndTime = new Date(this.couponList.due_date * 1000)
        .toISOString()
        .split('T');
      // props取得的時間轉乘時間戳，並付值給due_date
      [this.due_date] = dateAndTime;
    },
    due_date() {
      // 將時間戳轉換為時間，並付值回couponList
      this.couponList.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  methods: {},
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
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <!--eslint-disable-next-line-->
            <label for="coupontitle" class="form-label">優惠券名稱</label>

            <input
              type="text"
              class="form-control"
              id="coupontitle"
              v-model="couponList.title"
            />
          </div>
          <div class="mb-3">
            <!--eslint-disable-next-line-->
            <label for="couponcode" class="form-label">優惠代碼</label>
            <input
              type="text"
              class="form-control"
              id="couponcode"
              v-model="couponList.code"
            />
          </div>
          <div class="mb-3">
            <!--eslint-disable-next-line-->
            <label for="couponpercent" class="form-label">折扣</label>
            <input
              type="number"
              class="form-control"
              id="couponpercent"
              min="0"
              max="100"
              v-model="couponList.percent"
            />
          </div>
          <div class="mb-3">
            <!--eslint-disable-next-line-->
            <label for="coupondate" class="form-label">日期</label>
            <input
              type="date"
              class="form-control"
              id="coupondate"
              v-model="due_date"
            />
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="couponEnable"
              v-model="couponList.is_enabled"
              :true-value="1"
              :false-value="0"
            />
            <!--eslint-disable-next-line-->
            <label class="form-check-label" for="couponEnable">
              是否啟用
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-coupon', couponList)"
          >
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
