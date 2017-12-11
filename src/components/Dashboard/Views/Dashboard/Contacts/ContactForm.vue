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
                         name="first_name"
                         v-validate="'max:100'"
                         v-model="model.first_name"
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
                         v-model="model.last_name"
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
                         v-model="model.full_name"
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
                  <p-switch v-model="model.is_personal" style="margin-top:8px">
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
                         v-model="model.twitter_link"
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
                         v-model="model.facebook_link"
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
                         v-model="model.linkedin_link"
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
                         v-model="model.confidence_score"
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
                         v-model="model.email_score"
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
                <label class="col-sm-4 control-label">Organization</label>
                <div class="col-sm-8">
                  <el-select class="select-primary"
                             size="large"
                             placeholder="Single Select"
                             v-model="selects.simple">
                    <el-option v-for="option in selects.countries"
                               class="select-primary"
                               :value="option.value"
                               :label="option.label"
                               :key="option.label">
                    </el-option>
                  </el-select>
                  <small class="text-danger" v-show="email_score.invalid">
                    {{ getError('email_score') }}
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

  export default {
    components: {
      PSwitch
    },
    props: ['pageTitle'],
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
        'number'
      ])
    },
    data () {
      return {
        selects: {
          simple: '',
          countries: [{value: 'Bahasa Indonesia', label: 'Bahasa Indonesia'},
            {value: 'Bahasa Melayu', label: 'Bahasa Melayu'},
            {value: 'Català', label: 'Català'}]
        },
        model: {
          first_name: '',
          last_name: '',
          full_name: '',
          email: '',
          is_personal: false,
          twitter_link: '',
          facebook_link: '',
          linkedin_link: '',
          confidence_score: '',
          email_score: '',
          position: '',
          number: ''
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
          // this.$emit('on-submit', this.registerForm, isValid)
        })
      }
    }
  }
</script>
<style>
</style>
