<template>
  <h1>產品細節頁</h1>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-3">
        <img  :src="product.imagesUrl[0]" class="w-100" alt="img" />
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <table class="table w-50">
        <thead>
          <tr>
            <th class="col-3">產品名稱</th>
            <th class="col-9">{{ product.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="col-3">產品分類</th>
            <td class="col-9">{{ product.category }}</td>
          </tr>
          <tr>
            <th class="col-3">產品說明</th>
            <td class="col-9">{{ product.description }}</td>
          </tr>
          <tr>
                        <th class="col-3">產品說明</th>
            <td class="col-9">{{ product.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        imagesUrl: [''],
      },

    };
  },
  methods: {
    getProduct() {
      // console.log(this.$route.params);
      const { id } = this.$route.params;
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
          // console.log(this.product);
        });
    },
  },
  mounted() {
    this.getProduct();
  },

};

</script>

<style>
</style>
