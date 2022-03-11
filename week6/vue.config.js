const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/hexschool_mission/'
    : '/',
  transpileDependencies: true,
});
