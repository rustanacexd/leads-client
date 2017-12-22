<template>
  <div>
    <loading-main-panel :loading="loading"></loading-main-panel>
    <segment-form @submit.prevent :is-update="true"></segment-form>

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
      this.$store.dispatch('getSegment', this.$route.params.id)
    }
  }
</script>
