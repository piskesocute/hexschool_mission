export default {
  data() {
    return {
      itemLists: {
        imagesUrl: [],
      },
    }
  },
  props: ['itemList'],
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    deleteData() {
      this.$emit('deleteData', this.itemList.id)
    },
  },
  mounted() {
    this.itemLists = this.itemList
  },
  template: `
<div class="modal-dialog modal-dialog-centered ">
  <div class="modal-content">
    <div class="modal-header bg-danger">
      <h5 class="modal-title fw-bolder text-light " id="exampleModalLabel">注意!</h5>
    </div>
    <div class="modal-body my-3 ">
      <p class="fs-5 border-bottom border-2">準備刪除下列商品</p>
      <span class="text-primary text-opacity-75">商品名稱：</span>
      <p>{{itemList.title}}</p>
      <span class="text-primary text-opacity-75">商品ID：</span>
      <p>{{itemList.id}}</p>
    </div>
    <div class="modal-footer d-flex">
      <p class="me-auto">確認無誤後，請按下刪除鍵</p>
      <button 
      type="button" 
      class="btn btn-secondary" 
      @click="closeModal">
      返回</button>
      <button 
      type="button" 
      class="btn btn-danger" 
      @click="deleteData">確定刪除</button>
    </div>
  </div>
</div>

`
}