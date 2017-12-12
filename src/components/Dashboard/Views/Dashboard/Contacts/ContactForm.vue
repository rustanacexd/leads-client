<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          {{pageTitle}}
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
                         name="firstName"
                         v-validate="'max:100'"
                         v-model="model.firstName"
                         data-vv-as="First Name"
                         class="form-control">
                  <small class="text-danger" v-show="firstName.invalid">
                    {{ getError('firstName') }}
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
                         name="lastName"
                         v-validate="'max:100'"
                         v-model="model.lastName"
                         data-vv-as="Last Name"
                         class="form-control">
                  <small class="text-danger" v-show="lastName.invalid">
                    {{ getError('lastName') }}
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
                         name="fullName"
                         v-validate="'max:100'"
                         v-model="model.fullName"
                         data-vv-as="Full Name"
                         class="form-control">
                  <small class="text-danger" v-show="fullName.invalid">
                    {{ getError('fullName') }}
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
                <label class="col-sm-4 control-label">Email</label>
                <div class="col-sm-8">
                  <input type="text"
                         name="email"
                         v-validate="'required|email'"
                         v-model="model.email"
                         data-vv-as="Email"
                         class="form-control">
                  <small class="text-danger" v-show="email.invalid">
                    {{ getError('email') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Position</label>
                <div class="col-sm-8">
                  <input type="text"
                         name="position"
                         v-validate="'max:100'"
                         v-model="model.position"
                         data-vv-as="Position"
                         class="form-control">
                  <small class="text-danger" v-show="position.invalid">
                    {{ getError('position') }}
                  </small>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-sm-4">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-4 control-label">Personal</label>
                <div class="col-sm-8">
                  <p-switch v-model="model.isPersonal" style="margin-top:8px">
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
                         name="twitterLink"
                         v-validate="'url'"
                         v-model="model.twitterLink"
                         data-vv-as="Twitter Link"
                         class="form-control">
                  <small class="text-danger" v-show="twitterLink.invalid">
                    {{ getError('twitterLink') }}
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
                         name="facebookLink"
                         v-validate="'url'"
                         v-model="model.facebookLink"
                         data-vv-as="Facebook Link"
                         class="form-control">
                  <small class="text-danger" v-show="facebookLink.invalid">
                    {{ getError('facebookLink') }}
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
                         name="linkedinLink"
                         v-validate="'url'"
                         v-model="model.linkedinLink"
                         data-vv-as="LinkedIn"
                         class="form-control">
                  <small class="text-danger" v-show="linkedinLink.invalid">
                    {{ getError('linkedinLink') }}
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
                         name="confidenceScore"
                         v-validate="modelValidations.positiveInteger"
                         v-model="model.confidenceScore"
                         data-vv-as="Confidence Score"
                         class="form-control">
                  <small class="text-danger" v-show="confidenceScore.invalid">
                    {{ getError('confidenceScore') }}
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
                         name="emailScore"
                         v-validate="modelValidations.positiveInteger"
                         v-model="model.emailScore"
                         data-vv-as="Email Score"
                         class="form-control">
                  <small class="text-danger" v-show="emailScore.invalid">
                    {{ getError('emailScore') }}
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
                  <!--v-model="model.organization">-->
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
                         v-model="model.organization"
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
      <div class="card-footer text-center">
        <button type="submit" @click.prevent="validate" class="btn btn-fill btn-info btn-wd">Add Contact</button>
      </div>
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
    props: ['pageTitle', 'organizations'],
    computed: {
      ...mapFields([
        'firstName',
        'lastName',
        'fullName',
        'email',
        'isPersonal',
        'twitterLink',
        'facebookLink',
        'linkedinLink',
        'confidenceScore',
        'emailScore',
        'position',
        'number',
        'organization'
      ])
    },
    data () {
      return {
        model: {
          firstName: '',
          lastName: '',
          fullName: '',
          email: '',
          isPersonal: false,
          twitterLink: '',
          facebookLink: '',
          linkedinLink: '',
          confidenceScore: '',
          emailScore: '',
          position: '',
          number: '',
          organization: ''
        },
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
      validate () {
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            this.$store.dispatch('addContact', {
              first_name: this.model.firstName,
              last_name: this.model.lastName,
              full_name: this.model.fullName,
              email: this.model.email,
              is_personal: this.model.isPersonal,
              twitter_link: this.model.twitterLink,
              facebook_link: this.model.facebookLink,
              linkedin_link: this.model.linkedinLink,
              confidence_score: this.model.confidenceScore || null,
              email_score: this.model.emailScore || null,
              position: this.model.position,
              organization: Number.parseInt(this.model.organization)
            }).then(
              swal({
                title: `Success!`,
                text: 'successfully added contact',
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
