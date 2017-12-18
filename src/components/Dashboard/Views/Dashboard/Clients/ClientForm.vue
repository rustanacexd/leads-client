<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          {{pageTitle}} Client Form
        </h4>
      </div>
      <div class="card-content">
        <div class="row">
          <div class="col-sm-12">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-1 control-label">Name</label>
                <div class="col-sm-11">
                  <input type="text"
                         name="name"
                         v-validate="'required'"
                         v-model="client.name"
                         data-vv-as="Name"
                         class="form-control">
                  <small class="text-danger" v-show="name.invalid">
                    {{ getError('name') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-1 control-label">Remote Key</label>
                <div class="col-sm-11">
                  <input type="text"
                         name="remote_key"
                         v-validate="'max:255'"
                         v-model="client.remote_key"
                         data-vv-as="Remote Key"
                         class="form-control">
                  <small class="text-danger" v-show="remote_key.invalid">
                    {{ getError('remote_key') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

      </div>
      <template v-if="isUpdate">
        <div class="card-footer text-center">
          <button type="submit" @click.prevent="validate('updateResource')"
                  class="btn btn-fill btn-info btn-wd">Update Client
          </button>
        </div>
      </template>

      <template v-else>
        <div class="card-footer text-center">
          <button type="submit" @click.prevent="validate('addResource')"
                  class="btn btn-fill btn-info btn-wd">Add Client
          </button>
        </div>
      </template>
    </form>

  </div>
</template>
<script>
  import {mapFields} from 'vee-validate'
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  import swal from 'sweetalert2'

  export default {
    components: {
      PSwitch
    },
    props: ['pageTitle', 'isUpdate'],
    computed: {
      ...mapFields([
        'name',
        'remote_key'
      ]),
      client () {
        return this.$store.state.client.client
      }
    },
    methods: {
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate (actionName) {
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            this.$store.dispatch(actionName, {
              data: {
                id: this.client.id,
                name: this.client.name,
                remote_key: this.client.remote_key
              },
              resourceName: 'client'
            }).then(
              swal({
                title: `Success!`,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success btn-fill',
                type: 'success'
              })
            ).catch(error => {
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
          }
        })
      }
    }
  }
</script>
<style>
</style>
