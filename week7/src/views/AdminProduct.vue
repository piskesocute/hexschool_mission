<script>
import Pagination from '@/components/PagenationComponents.vue';
import EditModal from '@/components/EditModal.vue';
import DeleteModal from '../components/DeleteModal.vue';

export default {
  data() {
    return {
      // 商品暫存
      products: [],
      // paginationAPI內容
      pagination: {},
      // 現在頁面
      nowPage: 1,
      // 是否為新增產品
      isNew: false,
      // 點擊的商品列表
      productList: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
    EditModal,
    DeleteModal,
  },
  methods: {
    getProduct(page = 1) {
      this.isLoading = true;
      this.nowPage = page;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },
    // 開啟modal
    openModal(isNew, item) {
      // 假如true則為新增，如否則為編輯
      if (isNew) {
        this.productList = {};
        this.isNew = true;
      } else {
        this.productList = JSON.parse(JSON.stringify(item));
        this.isNew = false;
      }
      const ModalComponent = this.$refs.productModal;
      ModalComponent.openModal();
    },
    openDelModal(item) {
      this.productList = { ...item };
      const { deleteModal } = this.$refs;
      deleteModal.openModal();
    },
    pushdata(item) {
      this.isLoading = true;
      this.productList = item;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let http = 'post';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.productList.id}`;
        http = 'put';
      }
      const ModalComponent = this.$refs.productModal;
      this.$http[http](api, { data: this.productList })
        .then(() => {
          ModalComponent.hideModal();
          this.getProduct(this.nowPage);
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },
    deleteData() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.productList.id}`;
      this.$http.delete(api).then(() => {
        const { deleteModal } = this.$refs;
        this.isLoading = false;
        deleteModal.hideModal();
      }).catch((err) => {
        console.dir(err);
        this.isLoading = false;
      });
    },

  },
  created() {
    this.getProduct();
  },
};
</script>

<template>
<Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="text-end mt-4">
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      建立新的產品
    </button>
  </div>
  <Pagination
  :pages="pagination"
  @change-page="getProduct"
  ></Pagination>
  <table class="table mt-4 text-center">
    <thead>
      <tr>
        <th>預覽圖</th>
        <th>產品名稱</th>
        <th>產品類別</th>
        <th>原價</th>
        <th>售價</th>
        <th>商品狀態</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id" class="align-middle">
        <td width="10%">
          <div class="d-flex justify-content-center align-items-center">
            <div class="w-75 mx-0 my-auto">
              <img v-if="item.imageUrl" class="" :src="item.imageUrl" alt="" />
              <img
                v-else-if="!item.imageUrl && item.imagesUrl"
                class=""
                :src="item.imagesUrl[0]"
                alt=""
              />
              <span v-else>無圖片 </span>
            </div>
          </div>
        </td>
        <td width="10%">{{ item.title }}</td>
        <td width="10%">{{ item.category }}</td>
        <td width="10%">{{ item.origin_price }}</td>
        <td width="10%">{{ item.price }}</td>
        <td width="10%">
          <span
            v-if="item.is_enabled === 2"
            class="badge rounded-pill bg-danger fs-6"
            >已售完</span
          >
          <span
            v-else-if="item.is_enabled === 1"
            class="badge rounded-pill bg-success fs-6 fw"
            >銷售中</span
          >
          <span
            v-else-if="item.is_enabled === 0"
            class="badge rounded-pill bg-secondary fs-6"
            >下架</span
          >
        </td>
        <td width="20%" class>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="openModal(false, item)"
            >
              查看
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="openDelModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <EditModal
    :product="productList"
    @push-data="pushdata"
    ref="productModal"
  ></EditModal>

  <DeleteModal
    :item="productList"
    ref="deleteModal"
    @del-item="deleteData"
  ></DeleteModal>
</template>

<style scoped>
img {
  object-fit: contain;
  max-width: 75px;
  min-width: 50px;
}
</style>
