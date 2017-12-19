<template>
  <div>
    <loading-main-panel :loading="loading"></loading-main-panel>
    <campaign-form @submit.prevent :is-update="true"></campaign-form>

  </div>
</template>

<script>
  import CampaignForm from './CampaignForm.vue'
  import LoadingMainPanel from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'

  export default {
    components: {CampaignForm, LoadingMainPanel},
    computed: {
      loading () {
        return this.$store.state.loading
      }
    },
    created () {
      this.$store.dispatch('getResource', {
        id: this.$route.params.id,
        resourceName: 'campaign'
      })
    }
  }
</script>
