<template>
  <div>
    <loading-main-panel :loading="loading"></loading-main-panel>
    <campaign-form @submit.prevent page-title="Add" :is-update="false"></campaign-form>
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
      this.$store.commit('SET_RESOURCE', {data: {}, resourceName: 'campaign'})
    }
  }
</script>
