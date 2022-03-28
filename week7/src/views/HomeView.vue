<template>
  <div class="home container">
    <div class="row justify-content-center align-items-center">
      <div class="col-3">
        <img alt="Vue logo" class="w-100" src="../assets/logo.png" />
      </div>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
};
</script>
<style>

</style>
