<template>
  <div class="row">
    <loading-main-panel :loading="loading"></loading-main-panel>
    <div class="col-md-12">
      <div class="row" style="margin-bottom: 20px">
        <div class="col-lg-6 col-lg-offset-6">
          <div class="pull-right">
            <button class="btn btn-primary btn-fill btn-wd" @click="$router.push({name: 'Add ' + resourceName})">Add new
              {{resourceName}}
            </button>
            <button class="btn btn-primary btn-fill btn-wd">Import</button>
            <button class="btn btn-primary btn-fill btn-wd">Export</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 card">
      <div class="card-content row">
        <div class="col-sm-6">
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <label>
              <input type="search" class="form-control input-sm" placeholder="Search"
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
            <slot name="select_field"></slot>
            <slot name="id"></slot>
            <slot name="is_personal"></slot>
            <slot name="client"></slot>
            <slot name="organization"></slot>
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
    props: ['resourceName', 'tableColumns'],
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
          this.$store.dispatch('searchResource', {
            searchKey,
            resourceName: this.resourceName
          })
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
        pagination: {
          perPage: 25,
          currentPage: 1,
          total: 0
        },
        multipleSelection: []
      }
    },
    methods: {
      deleteResource ({indexToDelete, resourceID}) {
        this.$store.dispatch('deleteResourceFromTable', {
          resourceID,
          indexToDelete,
          resourceName: this.resourceName
        })
          .then(
            swal({
              title: 'Deleted!',
              text: this.resourceName + ' has been deleted.',
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
        this.$router.push({name: 'Edit ' + this.resourceName, params: {id: row.id}})
      },
      handleDelete (index, row) {
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
          let indexToDelete = this.paged.findIndex((tableRow) => tableRow.id === row.id)
          const resourceID = this.paged[indexToDelete].id

          if (indexToDelete >= 0) {
            this.deleteResource({indexToDelete, resourceID})
          }
        }).catch(error => console.log(error))
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
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
