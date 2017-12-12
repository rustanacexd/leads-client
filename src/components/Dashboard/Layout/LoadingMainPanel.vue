<template>
  <div class="row" v-loading.fullscreen.lock="loading" id="loading">
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Loading} from 'element-ui'

  Vue.use(Loading.directive)
  export default {
    props: ['loading']
  }
</script>
<style>
  #loading {
    min-height: 200px;
    display: flex;
    align-items: center;

  }

  .el-loading-spinner .path {
    stroke: #66615B !important;
  }

  .el-loading-mask {
    background: rgba(255, 255, 255, 0.3);
  }
</style>
