<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          <template v-if="isUpdate">Edit</template>
          <template v-else>Add</template>
          Organization <span v-if="$route.params.id"> (ID {{$route.params.id}})</span>
        </h4>
      </div>
      <div class="card-content">
        <div class="row">
          <div class="col-sm-12">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                  <input type="text"
                         name="name"
                         v-validate="'max:255'"
                         v-model="organization.name"
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
                <label class="col-sm-2 control-label">Domain Name</label>
                <div class="col-sm-10">
                  <input type="text"
                         name="domain_name"
                         v-validate="'max:100'"
                         v-model="organization.domain_name"
                         data-vv-as="Domain Name"
                         class="form-control">
                  <small class="text-danger" v-show="domain_name.invalid">
                    {{ getError('domain_name') }}
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
                <label class="col-sm-2 control-label">Revenue</label>
                <div class="col-sm-10">
                  <input type="text"
                         name="revenue"
                         v-validate="'decimal:2|max:10'"
                         v-model="organization.revenue"
                         data-vv-as="Revenue"
                         class="form-control">
                  <small class="text-danger" v-show="revenue.invalid">
                    {{ getError('revenue') }}
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
                <label class="col-sm-2 control-label">Employees</label>
                <div class="col-sm-10">
                  <input type="text"
                         name="employees"
                         v-validate="modelValidations.positiveInteger"
                         v-model="organization.employees"
                         data-vv-as="Employees"
                         class="form-control">
                  <small class="text-danger" v-show="employees.invalid">
                    {{ getError('employees') }}
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
                <label class="col-sm-2 control-label">Twitter</label>
                <div class="col-sm-10">
                  <input type="url"
                         name="twitter_link"
                         v-validate="'url'"
                         v-model="organization.twitter_link"
                         data-vv-as="Twitter Link"
                         class="form-control">
                  <small class="text-danger" v-show="twitter_link.invalid">
                    {{ getError('twitter_link') }}
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
                <label class="col-sm-2 control-label">Facebook</label>
                <div class="col-sm-10">
                  <input type="url"
                         name="facebook_link"
                         v-validate="'url'"
                         v-model="organization.facebook_link"
                         data-vv-as="Facebook Link"
                         class="form-control">
                  <small class="text-danger" v-show="facebook_link.invalid">
                    {{ getError('facebook_link') }}
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
                <label class="col-sm-2 control-label">Instagram</label>
                <div class="col-sm-10">
                  <input type="url"
                         name="instagram_link"
                         v-validate="'url'"
                         v-model="organization.instagram_link"
                         data-vv-as="Instagram Link"
                         class="form-control">
                  <small class="text-danger" v-show="instagram_link.invalid">
                    {{ getError('instagram_link') }}
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
                <label class="col-sm-2 control-label">Linkedin</label>
                <div class="col-sm-10">
                  <input type="url"
                         name="linkedin_link"
                         v-validate="'url'"
                         v-model="organization.linkedin_link"
                         data-vv-as="Linkedin Link"
                         class="form-control">
                  <small class="text-danger" v-show="linkedin_link.invalid">
                    {{ getError('linkedin_link') }}
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
                <label class="col-sm-2 control-label">Yelp</label>
                <div class="col-sm-10">
                  <input type="url"
                         name="yelp_link"
                         v-validate="'url'"
                         v-model="organization.yelp_link"
                         data-vv-as="Yelp Link"
                         class="form-control">
                  <small class="text-danger" v-show="yelp_link.invalid">
                    {{ getError('yelp_link') }}
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
                <label class="col-sm-2 control-label">Pinterest</label>
                <div class="col-sm-10">
                  <input type="url"
                         name="pinterest_link"
                         v-validate="'url'"
                         v-model="organization.pinterest_link"
                         data-vv-as="Pinterest Link"
                         class="form-control">
                  <small class="text-danger" v-show="pinterest_link.invalid">
                    {{ getError('pinterest_link') }}
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
                <label class="col-sm-2 control-label">Phone 1</label>
                <div class="col-sm-10">
                  <input type="text"
                         name="phone_1"
                         v-validate="'max:50'"
                         v-model="organization.phone_1"
                         data-vv-as="Phone 1"
                         class="form-control">
                  <small class="text-danger" v-show="phone_1.invalid">
                    {{ getError('phone_1') }}
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
                <label class="col-sm-2 control-label">Phone 2</label>
                <div class="col-sm-10">
                  <input type="text"
                         name="phone_2"
                         v-validate="'max:50'"
                         v-model="organization.phone_2"
                         data-vv-as="Phone 2"
                         class="form-control">
                  <small class="text-danger" v-show="phone_2.invalid">
                    {{ getError('phone_2') }}
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
                <label class="col-sm-2 control-label">Client ID</label>
                <div class="col-sm-10">
                  <input type="text"
                         name="client"
                         v-validate="'required|numeric'"
                         v-model="organization.client"
                         data-vv-as="Client ID"
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
                    class="btn btn-fill btn-info btn-wd">Update Organization
            </button>
          </div>
          <div class="card-footer col-sm-6">
            <button type="button" @click="deleteResource"
                    class="btn btn-fill btn-danger btn-wd">Delete Organization
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="card-footer text-center">
          <button type="submit" @click.prevent="validate('addResource')"
                  class="btn btn-fill btn-info btn-wd">Add Organization
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
    props: ['pageTitle', 'isUpdate'],
    mixins: [deleteResourceMixin],
    computed: {
      ...mapFields([
        'name',
        'revenue',
        'employees',
        'twitter_link',
        'facebook_link',
        'instagram_link',
        'linkedin_link',
        'yelp_link',
        'pinterest_link',
        'domain_name',
        'phone_1',
        'phone_2',
        'client'
      ]),
      organization () {
        return this.$store.state.organization.organization
      }
    },
    data () {
      return {
        modelValidations: {
          positiveInteger: {
            numeric: true,
            max_value: 2147483647
          }
        },
        resourceName: 'organization'
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
                id: this.organization.id,
                name: this.organization.name,
                revenue: this.organization.revenue,
                employees: this.organization.employees,
                twitter_link: this.organization.twitter_link,
                facebook_link: this.organization.facebook_link,
                instagram_link: this.organization.instagram_link,
                linkedin_link: this.organization.linkedin_link,
                yelp_link: this.organization.yelp_link,
                pinterest_link: this.organization.pinterest_link,
                domain_name: this.organization.domain_name,
                phone_1: this.organization.phone_1,
                phone_2: this.organization.phone_2,
                client: Number.parseInt(this.organization.client)
              },
              resourceName: this.resourceName
            }).then(({id}) => {
              swal({
                title: `Success!`,
                text: `successfully created ${this.resourceName} - (ID) ${id}`,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success btn-fill',
                type: 'success'
              })
            }).catch(error => {
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
