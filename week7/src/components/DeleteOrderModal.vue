<script>
import ModalMixin from '@/mixins/ModalMixin';

export default {
  data() {
    return {
      delItem: {
        user: {},
      },
    };
  },
  mixins: [ModalMixin],
  props: {
    delOrder: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    delOrder() {
      this.delItem = this.delOrder;
    },
  },
  emits: ['del-item'],
  methods: {
  },
  mounted() {
  },
};
</script>
<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title fw-bolder text-light" id="exampleModalLabel">
            注意!
          </h5>
        </div>
        <div class="modal-body mt-3">
          <p class="fs-5 border-bottom border-2">準備刪除下列項目</p>
          <ul
            style="list-style-type: none"
            class=""
          >
            <li><b>訂單ID：</b>{{ delItem.id}}</li>
            <li><b>訂單持有人：</b>{{ delItem.user.name}}</li>
            <li><b>訂單金額：</b>{{ $filters.currency(delItem.total) }}</li>
          </ul>
        </div>
        <div class="modal-footer d-flex">
          <p class="me-auto">確認無誤後，請按下刪除鍵</p>
          <button type="button" class="btn btn-secondary" @click="hideModal()">
            返回
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('del-item')"
          >
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
