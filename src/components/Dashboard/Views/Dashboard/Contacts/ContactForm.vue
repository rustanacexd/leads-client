<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          {{pageTitle}} Contact Form
        </h4>
      </div>
      <div class="card-content">
        <div class="row">
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">First Name</label>
                <div class="col-sm-8">
                  <input type="text"
                         name="first_name"
                         v-validate="'max:100'"
                         v-model="contact.first_name"
                         data-vv-as="First Name"
                         class="form-control">
                  <small class="text-danger" v-show="first_name.invalid">
                    {{ getError('first_name') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Last Name</label>
                <div class="col-sm-8">
                  <input type="text"
                         name="last_name"
                         v-validate="'max:100'"
                         v-model="contact.last_name"
                         data-vv-as="Last Name"
                         class="form-control">
                  <small class="text-danger" v-show="last_name.invalid">
                    {{ getError('last_name') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Full Name</label>
                <div class="col-sm-8">
                  <input type="text"
                         name="full_name"
                         v-validate="'max:100'"
                         v-model="contact.full_name"
                         data-vv-as="Full Name"
                         class="form-control">
                  <small class="text-danger" v-show="full_name.invalid">
                    {{ getError('full_name') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-3">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Email</label>
                <div class="col-sm-8">
                  <input type="text"
                         name="email"
                         v-validate="'required|email'"
                         v-model="contact.email"
                         data-vv-as="Email"
                         class="form-control">
                  <small class="text-danger" v-show="email.invalid">
                    {{ getError('email') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-3">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Phone Number</label>
                <div class="col-sm-8">
                  <input type="text"
                         name="phone"
                         v-validate="'max:50'"
                         v-model="contact.phone"
                         data-vv-as="Phone number"
                         class="form-control">
                  <small class="text-danger" v-show="phone.invalid">
                    {{ getError('phone') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-3">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Position</label>
                <div class="col-sm-8">
                  <input type="text"
                         name="position"
                         v-validate="'max:100'"
                         v-model="contact.position"
                         data-vv-as="Position"
                         class="form-control">
                  <small class="text-danger" v-show="position.invalid">
                    {{ getError('position') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-3">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Personal</label>
                <div class="col-sm-8">
                  <p-switch v-model="contact.is_personal" style="margin-top:8px">
                    <i class="fa fa-check" slot="on"></i>
                    <i class="fa fa-times" slot="off"></i>
                  </p-switch>
                </div>
              </div>

            </fieldset>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Twitter</label>
                <div class="col-sm-8">
                  <input type="url"
                         name="twitter_link"
                         v-validate="'url'"
                         v-model="contact.twitter_link"
                         data-vv-as="Twitter Link"
                         class="form-control">
                  <small class="text-danger" v-show="twitter_link.invalid">
                    {{ getError('twitter_link') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Facebook</label>
                <div class="col-sm-8">
                  <input type="url"
                         name="facebook_link"
                         v-validate="'url'"
                         v-model="contact.facebook_link"
                         data-vv-as="Facebook Link"
                         class="form-control">
                  <small class="text-danger" v-show="facebook_link.invalid">
                    {{ getError('facebook_link') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">LinkedIn</label>
                <div class="col-sm-8">
                  <input type="url"
                         name="linkedin_link"
                         v-validate="'url'"
                         v-model="contact.linkedin_link"
                         data-vv-as="LinkedIn"
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
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Confidence Score</label>
                <div class="col-sm-8">
                  <input type="number"
                         name="confidence_score"
                         v-validate="modelValidations.positiveInteger"
                         v-model="contact.confidence_score"
                         data-vv-as="Confidence Score"
                         class="form-control">
                  <small class="text-danger" v-show="confidence_score.invalid">
                    {{ getError('confidence_score') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Email Score</label>
                <div class="col-sm-8">
                  <input type="number"
                         name="email_score"
                         v-validate="modelValidations.positiveInteger"
                         v-model="contact.email_score"
                         data-vv-as="Email Score"
                         class="form-control">
                  <small class="text-danger" v-show="email_score.invalid">
                    {{ getError('email_score') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Organization ID</label>
                <div class="col-sm-8">
                  <!--<el-select class="select-primary"-->
                  <!--size="large"-->
                  <!--v-validate="'required|numeric'"-->
                  <!--data-vv-as="Organization"-->
                  <!--name="organization"-->
                  <!--placeholder="Single Select"-->
                  <!--v-model="contact.organization">-->
                  <!--<el-option v-for="organization in organizations"-->
                  <!--class="select-primary"-->
                  <!--:value="organization.id"-->
                  <!--:label="organization.id"-->
                  <!--:key="organization.id">-->
                  <!--</el-option>-->
                  <!--</el-select>-->
                  <input type="number"
                         name="organization"
                         v-validate="'required|numeric'"
                         v-model="contact.organization"
                         data-vv-as="Organization"
                         class="form-control">
                  <small class="text-danger" v-show="organization.invalid">
                    {{ getError('organization') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

      </div>
      <template v-if="isUpdate">
        <div class="card-footer text-center">
          <button type="submit" @click.prevent="validate('updateContact')" class="btn btn-fill btn-info btn-wd">Update
            Contact
          </button>
        </div>
      </template>

      <template v-else>
        <div class="card-footer text-center">
          <button type="submit" @click.prevent="validate('addContact')" class="btn btn-fill btn-info btn-wd">Add
            Contact
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
    props: ['pageTitle', 'organizations', 'isUpdate'],
    computed: {
      ...mapFields([
        'first_name',
        'last_name',
        'full_name',
        'email',
        'is_personal',
        'twitter_link',
        'facebook_link',
        'linkedin_link',
        'confidence_score',
        'email_score',
        'position',
        'phone',
        'organization'
      ]),
      contact () {
        return this.$store.state.contact.contact
      }
    },
    data () {
      return {
        modelValidations: {
          positiveInteger: {
            numeric: true,
            max_value: 2147483647
          }
        }
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
              id: this.contact.id,
              first_name: this.contact.first_name,
              last_name: this.contact.last_name,
              full_name: this.contact.full_name,
              email: this.contact.email,
              is_personal: this.contact.is_personal,
              twitter_link: this.contact.twitter_link,
              facebook_link: this.contact.facebook_link,
              linkedin_link: this.contact.linkedin_link,
              confidence_score: this.contact.confidence_score || null,
              email_score: this.contact.email_score || null,
              position: this.contact.position,
              phone: this.contact.phone,
              organization: Number.parseInt(this.contact.organization)
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
