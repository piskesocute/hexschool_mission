/* global axios */

export default {
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      path: 'evan-classuse',
    };
  },
  props: ['itemList', 'is_Edit'],
  methods: {
    pushData(id) {
      let url = `${this.apiUrl}/api/${this.path}/admin/product`;
      let methods = 'post';
      if (this.is_Edit === 1) { // is_edit沒有傳入
        url = `${this.apiUrl}/api/${this.path}/admin/product/${id}`;
        methods = 'put';
      }
      axios[methods](url, { data: this.itemList })
        .then(() => {
          this.closeModal();

          this.openSuccessModal();
        }).catch(() => {
          this.closeModal();
          this.openErrorModal();
        });
    },
    closeModal() {
      this.$emit('close-modal');
    },
    openSuccessModal() {
      this.$emit('open-success-modal');
    },
    openErrorModal() {
      this.$emit('open-error-modal');
    },
  },
  template: `
  <div class="modal-dialog modal-xl ">
      <div class="modal-content ">
        <div class="modal-header ">
          <h5 class="modal-title" id="staticBackdropLabel">編輯商品</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body ">
          <div class="container-fluid">
            <div class="d-flex">
              <div class="col-5 h5 fw-bold mb-1">
                新增圖片
                <!-- 滾動要添加height -->
                <div class="d-flex flex-column" style="height: 600px; overflow-y: scroll;">
                  <div v-for="(image,key) in itemList.imagesUrl" :key="image+132152" class="my-3 ps-0 pe-1 pb-3 fw-normal fs-6 border-bottom">
                    <span class="">第{{key+1}}張</span>
                    <span class="ms-3 text-primary" v-if="key==0"> 此為主圖</span>
                    <div class="w-100 d-flex p-2">
                      <input type="text" class="form-control flex-grow-1" v-model.lazy.trim="itemList.imagesUrl[key]" style="float: left;">

                      <button 
                      class="btn btn-danger col-2 ms-2" 
                      type="button" id="button-addon2" 
                      @click="itemList.imagesUrl.splice(key,1)" :disabled="itemList.imagesUrl[key]=='' || itemList.imagesUrl?.length-1 <= 0">
                      刪除</button>
                    </div>
                    <img class="w-100" :src="itemList.imagesUrl[key]" alt="">
                  </div>
                </div>
              </div>
              <div class="col-7 ">
                <div class="row ps-3 mb-2">
                  <div class="">
                    <label for="productName" class="form-label h5 fw-bold mb-1">產品名稱</label>
                    <input type="text" class="form-control" id="productName" placeholder="請輸入商品名稱" v-model="itemList.title">
                  </div>
                </div>
                <div class="row ps-3 mb-2">
                  <div class="col-4 ">
                    <label for="productType" class="form-label h5 fw-bold mb-1">產品分類</label>
                    <input type="text" class="form-control" id="productType" placeholder="請輸入產品分類:" v-model="itemList.category">
                  </div>
                  <div class="col-4 ">
                    <label for="productEnable" class="form-label h5 fw-bold mb-1">產品狀態</label>
                    <select class="form-select" aria-label="Default select example" id="productEnable" v-model.number="itemList.is_enabled">
                      <option selected>請選擇產品狀態</option>
                      <option value="0">下架 </option>
                      <option value="1">上架 </option>
                      <option value="2">售完 </option>
                    </select>
                  </div>

                  <div class="col-4">
                    <label for="Price" class="form-label h5 fw-bold mb-1">商品單位</label>
                    <input type="text" class="form-control" id="Price" placeholder="商品單位" v-model="itemList.unit">
                  </div>
                </div>
                <div class="row ps-3 mb-2">
                  <div class="col-4">
                    <label for="originPrice" class="form-label h5 fw-bold mb-1">原價</label>
                    <input type="number" class="form-control " id="originPrice" placeholder="元" 
                    v-model="itemList.origin_price">
                  </div>
                  <div class="col-4 ">
                    <label for="Price" class="form-label h5 fw-bold mb-1">售價</label>
                    <input type="number" class="form-control" id="Price" placeholder="元" 
                    v-model="itemList.price">
                  </div>
                  <div class="col-4 ">
                    <label for="Price" class="form-label h5 fw-bold mb-1">庫存數量</label>
                    <input type="number" class="form-control" id="Price" placeholder="商品單位" 
                    v-model="itemList.quantity">
                  </div>

                </div>
                <div class="row ps-3 mb-2">
                  <div class=" col-12 ">
                    <label for="productContent" class="form-label h5 fw-bold mb-1">商品內容</label>
                    <textarea class="form-control overflow-auto align-self-stretch" placeholder="商品內容" id="productContent" 
                    v-model="itemList.content" 
                    style="height:100px;resize: none;text-align: justify;"></textarea>
                  </div>
                </div>
                <div class="row ps-3 mb-2">
                  <div class=" col-12 ">
                    <label for="productContent" class="form-label h5 fw-bold mb-1">商品描述</label>
                    <textarea 
                    v-model="itemList.description" class="form-control overflow-auto align-self-stretch " placeholder="請詳細描述商品" id="productContent" style="height:200px;resize: none; text-align: justify;"></textarea>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer ">
          <div class="col-3 px-3 me-auto ">
            <button class="btn btn-primary w-100" type="button" id="button-addon2" :disabled="!itemList.imagesUrl[itemList.imagesUrl.length - 1]" @click="itemList.imagesUrl.push('')">新增圖片</button>
          </div>
          <div class="d-flex justify-content-between col-3 ">
            <button type="button" class="btn btn-secondary col-4" @click="closeModal">返回</button>
            <button type="button" class="btn btn-primary col-6" @click="pushData(itemList.id)">送出</button>
          </div>
        </div>
      </div>
    </div>`,
};
