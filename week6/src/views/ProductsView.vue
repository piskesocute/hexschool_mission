<template>
  <h1>產品列表</h1>

  {{ products }}
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProduct() {
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          console.log(res);
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
