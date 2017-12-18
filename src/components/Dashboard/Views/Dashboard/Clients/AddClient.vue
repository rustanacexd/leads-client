<template>
  <div>
    <loading-main-panel :loading="loading"></loading-main-panel>
    <client-form @submit.prevent page-title="Add" :is-update="false"></client-form>
  </div>
</template>

<script>
  import ClientForm from './ClientForm.vue'
  import LoadingMainPanel from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'

  export default {
    components: {ClientForm, LoadingMainPanel},
    computed: {
      loading () {
        return this.$store.state.loading
      }
    },
    created () {
      this.$store.commit('SET_RESOURCE', {data: {}, resourceName: 'client'})
    }
  }
</script>
