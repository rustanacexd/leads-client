<template>
  <div>
    <loading-main-panel :loading="loading"></loading-main-panel>
    <segment-form @submit.prevent page-title="Add" :is-update="false"></segment-form>
  </div>
</template>

<script>
  import SegmentForm from './SegmentForm.vue'
  import LoadingMainPanel from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'

  export default {
    components: {SegmentForm, LoadingMainPanel},
    computed: {
      loading () {
        return this.$store.state.loading
      }
    },
    created () {
      this.$store.commit('SET_RESOURCE', {data: {}, resourceName: 'segment'})
      this.$store.commit('RESET_SEGMENT_FILTERS')
    }
  }
</script>
