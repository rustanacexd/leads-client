<template>
  <loading-main-panel :loading="true"></loading-main-panel>
</template>
<script>
  import LoadingMainPanel from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'

  export default {
    components: {
      LoadingMainPanel
    },
    data () {
      return {}
    }
  }
</script>
<style>
</style>
