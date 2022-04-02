<script>
import emitter from '../libs/emitter';

export default {
  data() {
    return {
      status: false,
    };
  },
  provide() {
    return {
      emitter,
    };
  },
  methods: {
    logOut() {
      const logOutApi = `${process.env.VUE_APP_API}/logout`;
      this.$http
        .post(logOutApi)
        .then(() => {
          this.status = false;
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)evanclass\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );

    this.$http.defaults.headers.common.Authorization = `${token}`;
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    this.$http
      .post(api)
      .then(() => {
        console.log('登入成功');
        // this.$httpMessageState(response, '登入');
        this.status = true;
      })
      .catch((error) => {
        console.log(error);
        this.$router.push('/');
        // this.$httpMessageState(error.response, '錯誤訊息');
      });
  },
};
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">後台</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/product">前台首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/adminproduct"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon"
              >優惠券</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/order"
              >訂單管理</router-link
            >
          </li>
        </ul>
        <button type="button" class="btn btn-danger" @click="logOut">
          登出
        </button>
      </div>
    </div>
  </nav>
  <div class="container mt-3">
    <router-view></router-view>
  </div>
</template>

<style></style>
