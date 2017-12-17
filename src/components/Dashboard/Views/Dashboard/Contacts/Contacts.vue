<template>
  <div class="row">
    <loading-main-panel :loading="loading"></loading-main-panel>
    <div class="col-md-12">
      <div class="row" style="margin-bottom: 20px">
        <div class="col-lg-6 col-lg-offset-6">
          <div class="pull-right">
            <button class="btn btn-primary btn-fill btn-wd" @click="$router.push({name: 'Add Contact'})">Add new
              contact
            </button>
            <button class="btn btn-primary btn-fill btn-wd">Import</button>
            <button class="btn btn-primary btn-fill btn-wd">Export</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Contacts</div>
      </div>
      <div class="card-content row">
        <div class="col-sm-6">
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <label>
              <input type="search" class="form-control input-sm" placeholder="Search contact"
                     v-model.lazy="searchString"
                     aria-controls="datatables">
            </label>
          </div>
        </div>
        <div class="col-sm-6 pagination-info">
          <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
        </div>
        <div class="col-sm-6">
          <p-pagination class="pull-right"
                        v-model="pagination.currentPage"
                        :resource-name="resourceName"
                        :per-page="pagination.perPage"
                        :total="pagination.total">
          </p-pagination>
        </div>
        <div class="col-sm-12">

          <el-table class="table-striped"
                    :data="paged"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="Personal"
              :filter-method="filterTag"
              :filters="[{text: 'True', value: true}, {text: 'False', value: false}]"
              filter-placement="bottom-end"
              prop="is_personal"
              min-width="150"
            >
              <template slot-scope="props">
                {{props.row.is_personal}}
              </template>
            </el-table-column>
            <el-table-column v-for="column in tableColumns"
                             :key="column.label"
                             :min-width="column.minWidth"
                             :prop="column.prop"
                             :label="column.label"
                             sortable>
            </el-table-column>
            <el-table-column
              :min-width="120"
              fixed="right"
              label="Actions">
              <template slot-scope="props">
                <a class="btn btn-simple btn-xs btn-warning btn-icon edit" @click="handleEdit(props.$index, props.row)"><i
                  class="ti-pencil-alt"></i></a>
                <a class="btn btn-simple btn-xs btn-danger btn-icon remove"
                   @click="handleDelete(props.$index, props.row)"><i class="ti-close"></i></a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option} from 'element-ui'
  import LoadingMainPanel from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import swal from 'sweetalert2'
  import {mapState} from 'vuex'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)

  export default {
    components: {
      PPagination,
      LoadingMainPanel
    },
    computed: {
      ...mapState({
        loading: state => state.loading,
        paged (state) {
          return state[this.resourceName].paged
        }
      }),
      searchString: {
        get () {
          return this.$store.state[this.resourceName].searchString
        },
        set (searchKey) {
          this.$store.dispatch('searchResource', {searchKey, resourceName: this.resourceName})
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
        }
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        this.pagination.total = this.$store.state[this.resourceName].total
        return this.$store.state[this.resourceName].total
      }
    },
    data () {
      return {
        resourceName: 'contact',
        pagination: {
          perPage: 50,
          currentPage: 1,
          total: 0
        },
        multipleSelection: [],
        searchQuery: '',
        propsToSearch: ['first_name', 'email', 'last_name'],
        tableColumns: [
          {prop: 'first_name', label: 'First Name', minWidth: 250},
          {prop: 'last_name', label: 'Last Name', minWidth: 250},
          {prop: 'full_name', label: 'Full Name', minWidth: 250},
          {prop: 'organization', label: 'Organization', minWidth: 250},
          {prop: 'email', label: 'Email', minWidth: 250},
          {prop: 'phone', label: 'Number', minWidth: 250},
          {prop: 'position', label: 'Position', minWidth: 200},
          {prop: 'twitter_link', label: 'Twitter Link', minWidth: 250},
          {prop: 'facebook_link', label: 'Facebook Link', minWidth: 250},
          {prop: 'linkedin_link', label: 'Linkedin Link', minWidth: 250},
          {prop: 'confidence_score', label: 'Confidence Score', minWidth: 200},
          {prop: 'email_score', label: 'Email Score', minWidth: 200},
          {prop: 'created', label: 'Created', minWidth: 200},
          {prop: 'last_updated', label: 'Last Updated', minWidth: 200}
        ]
      }
    },
    methods: {
      deleteResource ({indexToDelete, resourceID}) {
        this.$store.dispatch('deleteResource', {
          resourceID,
          indexToDelete,
          resourceName: this.resourceName
        })
          .then(
            swal({
              title: 'Deleted!',
              text: 'Item has been deleted.',
              type: 'success',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false
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
      },
      handleEdit (index, row) {
        this.$router.push({name: 'Edit Contact', params: {id: row.id}})
      },
      handleDelete (index, row) {
        let tableData = this.paged
        const deleteResource = this.deleteResource
        swal({
          title: 'Are you sure?',
          text: `You won't be able to revert this!`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          confirmButtonText: 'Yes, delete it!',
          buttonsStyling: false
        }).then(function () {
          let indexToDelete = tableData.findIndex((tableRow) => tableRow.id === row.id)
          const resourceID = tableData[indexToDelete].id

          if (indexToDelete >= 0) {
            deleteResource({indexToDelete, resourceID})
          }
        }).catch(error => console.log(error))
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      filterTag (value, row) {
        return row.is_personal === value
      }
    },
    created () {
      this.$store.dispatch('getPagedResources', {
        page: 1,
        resourceName: this.resourceName
      })
    }
  }

</script>
<style>
</style>
