export default {
  data() {
    return {
      deletebatcherrdata: []
    }
  },
  props: ['deleteBatchArr'],
  emits: ['deleteBatchArrPush', 'openSuccessModal', 'openErrorModal', 'closeModal'],
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    openSuccessModal() {
      this.$emit('openSuccessModal')
    },
    openErrorModal() {
      this.$emit('openErrorModal')
    },
    async deleteBatchData() {
      let deleteFinish = 0
      for (let id of this.deleteBatchArr) {
        let url = `${apiUrl}/api/${path}/admin/product/${id}`;
        try {
          await axios.delete(url);
          deleteFinish++;
        } catch (err) {
          this.deletebatcherrdata.push(`${id}`)
        }
      }
      this.closeModal();
      this.$emit('deleteBatchArrPush', this.deletebatcherrdata)

      if (deleteFinish === this.deleteBatchArr.length) {
        this.openSuccessModal();
      } else {
        this.openErrorModal();
      }
    },
  },
  template: `
  <div class="modal-dialog modal-dialog-centered ">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title fw-bolder text-light " id="exampleModalLabel">注意!</h5>
        </div>
        <div class="modal-body my-3 ">
          <p class="fs-5 border-bottom border-2">準備刪除下列商品</p>
          <p class="text-primary text-opacity-75">商品ID：</p>
          <ol>
            <template v-for="item, index in deleteBatchArr" :key="index+123123">
              <li>{{item}}</li>
            </template>
          </ol>
        </div>
        <div class="modal-footer d-flex">
          <p class="me-auto">確認無誤後，請按下刪除鍵</p>
          <button type="button" class="btn btn-secondary" @click="closeModal">返回</button>
          <button type="button" class="btn btn-danger" @click="deleteBatchData()">確定刪除</button>
        </div>
      </div>
    </div>
  `,
}