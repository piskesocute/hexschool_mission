export default {
  props: ['is_Edit', 'deletebatcherrdata'],
  methods: {
    closeErrorModal() {
      this.$emit('closeErrorModal');
    },
  },
  template: `
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header ">
        <h5 class="modal-title">錯誤</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <span v-if="is_Edit===0">新增資料</span>
        <span v-else-if="is_Edit===1">更新資料</span>
        <span v-else-if="is_Edit===2">刪除資料</span>
        <span>操作失敗，詳細請聯絡管理員。</span>
        <template v-if="!deletebatcherrdata==[]">
          <p v-for="errdata,index in deletebatcherrdata" :key="index+1321512"> {{errdata}}</p>
        </template>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeErrorModal()">關閉</button>
      </div>
    </div>
  </div>`,

};
