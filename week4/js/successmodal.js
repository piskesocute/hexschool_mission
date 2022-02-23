export default {
  props: ['is_Edit'],
  methods: {
    closeSuccessModal() {
      this.$emit('closeSuccessModal')
    }
  },
  template: `
  <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-success bg-opacity-25">
            <h5 class="modal-title">成功</h5>
          </div>
          <div class="modal-body">
            <span v-if="is_Edit===0">新增資料</span>
            <span v-else-if="is_Edit===1">更新資料</span>
            <span v-else-if="is_Edit===2">刪除資料</span>
            <span v-else-if="is_Edit===3">批量刪除</span>
            <span>操作成功</span>
          </div>
          <div class="modal-footer ">
            <button type="button" class="btn btn-secondary" @click="closeSuccessModal()">關閉</button>
        </div>
    </div>
  </div>
  `,
}