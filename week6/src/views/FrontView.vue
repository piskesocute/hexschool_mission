<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container-fluid">
      <router-link class="nav-link navbar-brand" aria-current="page" to="/">第六周作業</router-link>
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
            <router-link class="nav-link" aria-current="page" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/products">產品列表</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/cart">購物車</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/admin">後台</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
export default {

};
</script>

<style>
</style>
