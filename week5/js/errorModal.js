/* global bootstrap */
export default {
  data() {
    return {
      modal: {},
      state: '',
    };
  },
  methods: {
    openErrorModal(state) {
      this.state = state;
      this.modal.show();
    },
    closeErrorModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.eModal);
  },
  template: `
  <div class="modal fade" id="errorModal" ref="eModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header ">
          <h5 class="modal-title text-danger">錯誤</h5>
          <button type="button" class="btn-close "  aria-label="Close" @click="closeErrorModal()"></button>
        </div>
        <div class="modal-body">
          <span>{{this.state}}</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeErrorModal()">關閉</button>
        </div>
      </div>
    </div>
  </div>`,

};
