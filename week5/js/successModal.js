/* global bootstrap */
export default {
  data() {
    return {
      modal: {},
      state: '',
    };
  },
  methods: {
    opemSuccessModal(state) {
      this.state = state;
      this.modal.show();
    },
    closeSuccessModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.sModal);
  },
  template: `
  <div class="modal fade" id="successModal" ref="sModal">
    <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-success bg-opacity-25">
              <h5 class="modal-title">成功</h5>
            </div>
            <div class="modal-body">
              <span>{{this.state}}</span>
            </div>
            <div class="modal-footer ">
              <button type="button" class="btn btn-secondary" @click="closeSuccessModal()">關閉</button>
          </div>
      </div>
    </div>
  </div>
  `,
};
