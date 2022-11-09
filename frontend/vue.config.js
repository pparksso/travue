const {defineConfig} = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import '@/assets/scss/_var.scss';
       @import '@/assets/scss/_mixin.scss';`,
      },
    },
  },
});
