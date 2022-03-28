<script>
export default {
  data() {
    return {
      // isLoading: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  components: {},
  methods: {

    signIn() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      // this.isLoading = true;
      this.$http
        .post(api, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          document.cookie = `evanclass=${token};expires=${new Date(expired)};`;
          console.log(token);
          // this.isLoading = false;
          this.$router.push('/admin/adminproduct');
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(this.$httpMessageState(error.response, '登入'));
          this.$httpMessageState(error.response, '登入');
        });
    },
  },
};
</script>

<template>
  <div class="container mt-5">
    <!-- <Loading :active="isLoading" :z-index="1060"></Loading> -->
    <!-- <ToastMessages></ToastMessages> -->
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <!-- eslint-disable -->
          <label for="inputEmail" class="sr-only">Email address</label>
          <!-- eslint-enable -->
          <input
            v-model="user.username"
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
          />
        </div>
        <div class="mb-2">
          <!-- eslint-disable -->
          <label for="inputPassword" class="sr-only">Password</label>
          <!-- eslint-enable -->
          <input
            v-model="user.password"
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
</style>
