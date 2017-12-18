import swal from 'sweetalert2'

export const deleteResourceMixin = {
  methods: {
    deleteResource () {
      swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success btn-fill',
        cancelButtonClass: 'btn btn-danger btn-fill',
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
      }).then(() => {
        this.$store.dispatch('deleteResource', {
          resourceID: this.$route.params.id,
          resourceName: this.resourceName
        })
          .then(
            swal({
              title: 'Deleted!',
              text: 'Client has been deleted.',
              type: 'success',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false
            }).then(() => {
              this.$router.push({
                name: this.resourceName.charAt(0).toUpperCase() + this.resourceName.slice(1) + 's'
              })
            })
          )
          .catch(error => {
            if (error.message) {
              swal({
                title: 'Error',
                text: error.message,
                type: 'error',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-danger btn-fill'
              })
            }
          })
      }).catch(error => console.log(error))
    }
  }
}
