<template>
  <div>
    <loading-main-panel :loading="loading"></loading-main-panel>
    <contact-form @on-submit="onAddContactSubmit" page-title="Add Contact Form"></contact-form>
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
    data () {
      return {
        contactModel: {}
      }
    },
    methods: {
      onAddContactSubmit (model, isValid) {
        this.contactModel = model
      }
    }
  }
</script>
