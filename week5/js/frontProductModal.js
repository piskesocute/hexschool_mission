/* global axios */
/* global bootstrap */
const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const path = 'evan-classuse';
export default {
  props: ['id'],
  data() {
    return {
      modal: {},
      product: {},
      qty: 1,
    };
  },
  watch: {
    id() {
      this.getProducts();
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    getProducts() {
      axios.get(`${apiUrl}/api/${path}/product/${this.id}`)
        .then((res) => {
          this.product = res.data.product;
          this.qty = 1;
        });
    },
    addToCart() {
      this.$emit('add-cart', this.product.id, this.qty);
      this.closeModal();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
  template: `<div class="modal fade" id="productModal" ref="modal">
  <div class="modal-dialog modal-xl ">
        <div class="modal-content ">
          <div class="modal-header ">
            <h5 class="modal-title" id="staticBackdropLabel">商品標題</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body ">
            <div class="container-fluid">
              <div class="row">
                <div class="col-6 h5 fw-bold mb-1">
                  
                  <!-- 滾動要添加height -->
                  <div class="d-flex flex-column" style="height: 500px; overflow-y: scroll;">
                    <div class="my-3 ps-0 pe-1 pb-3 fw-normal fs-6 border-bottom">
                      <!-- 產品圖片 -->
                      <img class="w-100 border-bottom mb-3" :src="img" v-for="img in product.imagesUrl"
                      :key="img+1231313" alt="">
                    </div>
                  </div>
                </div>
                <div class="col-6 my-4">
                  <div class="row ps-3 mb-4 ">
                    <p class="fw-bold col-2 m-0">產品名稱</p>
                    <p class="col-10 m-0">{{product.title}}</p>
                  </div>
                  <div class="row ps-3 mb-4">
                    <p class="fw-bold col-2 m-0">產品分類</p>
                    <p class="col-10 m-0">{{product.category}}</p>
                  </div>
                  <div class="row ps-3 mb-4">
                    <p class="fw-bold col-2 mb-1">產品描述</p>
                    <p class="col-12 m-0">{{product.description}}</p>
                  </div>
                  <div class="row ps-3 mb-4 ">
                    <div class="col-4">
                      <label for="productQty" class=" fw-bold mb-1 me-5">數量</label>
                      <select class="form-select text-center" id="productQty" v-model="qty">
                        <option v-for="num in 10" :key="num+'12313'" :value="num">{{num}}</option>
                      </select>
                    </div>
                    <div class="row col-7 justify-content-end align-items-end ">
                      <div class="row justify-content-center">
                        <button type="button" class="btn btn-primary col-12" @click="addToCart">送出</button>
                      </div>
                    </div>
                  </div>
                  <div class="row ps-3 mb-2">
                    <p class="form-label h5 fw-bold ">產品內容</p>
                    <p class="">{{product.content}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex">
            <button type="button" class="btn btn-secondary col-1" @click="closeModal">返回</button>
          </div>
        </div>
      </div>
    </div>`,
};
