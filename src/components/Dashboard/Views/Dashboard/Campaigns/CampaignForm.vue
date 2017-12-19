<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          <template v-if="isUpdate">Edit</template>
          <template v-else>Add</template>
          Campaign <span v-if="$route.params.id"> (ID {{$route.params.id}})</span>
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
                         v-validate="'required|max:255'"
                         v-model="campaign.name"
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
                <label class="col-sm-1 control-label">Client</label>
                <div class="col-sm-11">
                  <input type="text"
                         name="client"
                         v-validate="'required|numeric'"
                         v-model="campaign.client"
                         data-vv-as="Client"
                         class="form-control">
                  <small class="text-danger" v-show="client.invalid">
                    {{ getError('client') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

      </div>
      <template v-if="isUpdate">
        <div class="row text-center" style="max-width: 500px; margin: 0 auto">
          <div class="card-footer col-sm-6">
            <button type="submit" @click.prevent="validate('updateResource')"
                    class="btn btn-fill btn-info btn-wd">Update Campaign
            </button>
          </div>
          <div class="card-footer col-sm-6">
            <button type="button" @click="deleteResource"
                    class="btn btn-fill btn-danger btn-wd">Delete Campaign
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="card-footer text-center">
          <button type="submit" @click.prevent="validate('addResource')"
                  class="btn btn-fill btn-info btn-wd">Add Campaign
          </button>
        </div>
      </template>
    </form>

  </div>
</template>
<script>
  import {mapFields} from 'vee-validate'
  import swal from 'sweetalert2'
  import {deleteResourceMixin} from 'src/mixins'

  export default {
    props: ['isUpdate'],
    mixins: [deleteResourceMixin],
    computed: {
      ...mapFields([
        'name',
        'client'
      ]),
      campaign () {
        return this.$store.state.campaign.campaign
      }
    },
    data () {
      return {
        resourceName: 'campaign'
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
                id: this.campaign.id,
                name: this.campaign.name,
                client: Number.parseInt(this.campaign.client)
              },
              resourceName: this.resourceName
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
