<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          <template v-if="isUpdate">Edit</template>
          <template v-else>Add</template>
          Segment <span v-if="$route.params.id"> (ID {{$route.params.id}})</span>
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
                         v-model="segment.name"
                         data-vv-as="Name"
                         class="form-control"
                         @keydown.enter.prevent>
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
                <label class="col-sm-1 control-label">Description</label>
                <div class="col-sm-11">
                  <input type="text"
                         name="description"
                         v-validate="'max:255'"
                         v-model="segment.description"
                         data-vv-as="Description"
                         class="form-control"
                         @keydown.enter.prevent>
                  <small class="text-danger" v-show="description.invalid">
                    {{ getError('description') }}
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
                  <input type="number"
                         name="client"
                         v-validate="'numeric'"
                         v-model="segment.client"
                         data-vv-as="Client"
                         class="form-control"
                         @keydown.enter.prevent>
                  <small class="text-danger" v-show="client.invalid">
                    {{ getError('client') }}
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
                <label class="col-sm-1 control-label">Campaigns</label>
                <div class="col-sm-11">
                  <el-tag
                    :key="campaign"
                    v-for="campaign in dynamicCampaigns"
                    type="primary"
                    :closable="true"
                    :close-transition="false"
                    @close="handleClose(campaign)"
                  >
                    {{campaign}}
                  </el-tag>
                  <input type="number" placeholder="Add campaign ID" class="form-control input-new-tag"
                         v-model="campaigns.inputValue"
                         name="campaign"
                         v-validate="'numeric'"
                         ref="saveTagInput"
                         size="mini"
                         @keyup.enter="handleInputConfirm"
                         @keydown.enter.prevent
                         @blur="handleInputConfirm"/>
                  <div>
                    <small class="text-danger" v-show="campaign.invalid">
                      {{ getError('campaign') }}
                    </small>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

      </div>

      <div class="card-header">
        <h4 class="card-title">
          <template v-if="isUpdate">Edit</template>
          <template v-else>Add</template>
          Segment Filters
        </h4>
      </div>

      <div class="card-content">
        <div class="row" v-for="filter in filters" :key="filter.name">
          <div class="col-sm-12">
            <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">{{filter.label}}</label>
                <template v-if="filter.name ==='is_personal'">
                  <div class="col-sm-8">
                    <p-switch v-model="filter.filterValue" style="margin-top:8px">
                      <i class="fa fa-check" slot="on"></i>
                      <i class="fa fa-times" slot="off"></i>
                    </p-switch>
                  </div>
                </template>
                <template v-else>
                  <div class="col-sm-2">
                    <el-select class="select-default"
                               size="large"
                               placeholder="Operand"
                               v-model="filter.operand">
                      <el-option v-for="option in filter.operands"
                                 class="select-default"
                                 :value="option.value"
                                 :label="option.label"
                                 :key="option.label">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="col-sm-8">
                    <input type="text"
                           :name="filter.name"
                           placeholder="filter value"
                           v-model="filter.filterValue"
                           v-validate="filter.validate"
                           class="form-control"
                           @keydown.enter.prevent>
                    <small class="text-danger">
                      {{ getError(filter.name) }}
                    </small>
                  </div>
                </template>
              </div>
            </fieldset>
          </div>
        </div>

      </div>


      <template v-if="isUpdate">
        <div class="row text-center" style="max-width: 500px; margin: 0 auto">
          <div class="card-footer col-sm-6">
            <button type="submit" @click.prevent="validate('updateSegment')"
                    class="btn btn-fill btn-info btn-wd">Update Segment
            </button>
          </div>
          <div class="card-footer col-sm-6">
            <button type="button" @click="deleteResource"
                    class="btn btn-fill btn-danger btn-wd">Delete Segment
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="card-footer text-center">
          <button type="submit" @click.prevent="validate('addSegment')"
                  class="btn btn-fill btn-info btn-wd">Add Segment
          </button>
        </div>
      </template>
    </form>

  </div>
</template>
<script>
  import {Tag} from 'element-ui'
  import {mapFields} from 'vee-validate'
  import swal from 'sweetalert2'
  import {deleteResourceMixin} from 'src/mixins'
  import PSwitch from 'src/components/UIComponents/Switch.vue'


  export default {
    components: {
      [Tag.name]: Tag,
      PSwitch
    },
    props: ['isUpdate'],
    mixins: [deleteResourceMixin],
    computed: {
      ...mapFields([
        'name',
        'client',
        'description',
        'campaign',
        'confidence_score',
        'is_personal',
        'position',
        'organization__name',
        'organization__revenue',
        'organization__address__country',
        'organization__address__city',
        'organization__client__name',
        'organization__social__facebook_shares',
        'organization__social__instagram_followers',
        'organization__social__twitter_followers',
        'organization__social__klout_score',
        'organization__social__linkedin_shares',
        'organization__domain__name',
        'organization__domain__domain_rank',
        'organization__domain__domainkeyword__keyword',
        'organization__domain__organic_traffic_count',
        'organization__domain__adwords_traffic_count'
      ]),
      segment () {
        return this.$store.state.segment.segment
      },
      filters () {
        return this.$store.state.segment.filters
      },
      dynamicCampaigns () {
        return this.$store.state.segment.dynamicCampaigns
      }
    },
    data () {
      return {
        resourceName: 'segment',
        campaigns: {
          inputVisible: false,
          inputValue: ''
        }
      }
    },
    methods: {
      handleClose (tag) {
        this.$store.commit('REMOVE_DYNAMIC_CAMPAIGN', tag)
      },
      handleInputConfirm () {
        let inputValue = this.campaigns.inputValue
        if (inputValue > 0) {
          this.$store.commit('ADD_DYNAMIC_CAMPAIGN', inputValue)
        }

        this.campaigns.inputVisible = false
        this.campaigns.inputValue = ''
      },
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate (actionName) {
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            this.$store.dispatch(actionName, {
              data: {
                id: this.segment.id,
                name: this.segment.name,
                client: Number.parseInt(this.segment.client),
                description: this.segment.description,
                campaigns: this.dynamicCampaigns.map(Number)
              },
              segmentFilters: this.filters
            }).then(id => {
              swal({
                title: `Success!`,
                buttonsStyling: false,
                text: 'successfully ' + (this.isUpdate ? 'edited' : 'created') + ` ${this.resourceName} - (ID) ${id}`,
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
