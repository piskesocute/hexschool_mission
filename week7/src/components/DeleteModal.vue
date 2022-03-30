<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: '',
    };
  },
  props: {
    item: {
    },
  },
  emits: ['del-item'],
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
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
        <div class="modal-body my-3">
          <p class="fs-5 border-bottom border-2">準備刪除下列項目</p>
          <ul style="list-style-type:none;" class="text-primary text-opacity-75">
            <li><b>項目標題：</b>{{ item.title }}</li>
            <li><b>項目ID：</b>{{item.id}}</li>
          </ul>
        </div>
        <div class="modal-footer d-flex">
          <p class="me-auto">確認無誤後，請按下刪除鍵</p>
          <button type="button" class="btn btn-secondary" @click="hideModal()">
            返回
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('del-item')">
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
