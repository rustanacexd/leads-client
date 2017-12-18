<template>
  <div>
    <loading-main-panel :loading="loading"></loading-main-panel>
    <organization-form @submit.prevent page-title="Add" :is-update="true"></organization-form>

  </div>
</template>

<script>
  import OrganizationForm from './OrganizationForm.vue'
  import LoadingMainPanel from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'

  export default {
    components: {OrganizationForm, LoadingMainPanel},
    computed: {
      loading () {
        return this.$store.state.loading
      }
    },
    created () {
      this.$store.dispatch('getResource', {
        id: this.$route.params.id,
        resourceName: 'organization'
      })
    }
  }
</script>
