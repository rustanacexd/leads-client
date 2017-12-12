<template>
  <div>
    <loading-main-panel :loading="loading"></loading-main-panel>
    <contact-form @submit.prevent page-title="Add" :is-update="true"></contact-form>

  </div>
</template>

<script>
  import ContactForm from './ContactForm.vue'
  import LoadingMainPanel from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'

  export default {
    components: {ContactForm, LoadingMainPanel},
    computed: {
      loading () {
        return this.$store.state.loading
      }
    },
    created () {
      this.$store.dispatch('getContact', {id: this.$route.params.id})
    }
  }
</script>
