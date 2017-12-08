<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title">Lorem ipsum dolor sit.</h4>
      <p class="category">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium adipisci aliquam assumenda, aut
        deleniti dolore doloremque dolores doloribus eligendi eveniet expedita ipsum labore laudantium nemo, nihil
        quidem quod, veniam.
      </p>
      <div class="row" style="margin-bottom: 20px">
        <div class="col-lg-6 col-lg-offset-6">
          <div class="pull-right">
            <button class="btn btn-primary btn-fill btn-wd">Add new contact</button>
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
          <el-select
            class="select-default"
            v-model="pagination.perPage"
            placeholder="Per page">
            <el-option
              class="select-default"
              v-for="item in pagination.perPageOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <label>
              <input type="search" class="form-control input-sm" placeholder="Search records" v-model="searchQuery"
                     aria-controls="datatables">
            </label>
          </div>
        </div>
        <div class="col-sm-12">
          <el-table class="table-striped"
                    :data="queriedData"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column v-for="column in tableColumns"
                             :key="column.label"
                             :min-width="column.minWidth"
                             :prop="column.prop"
                             :label="column.label"
                             :filter-method="column.filterMethod"
                             :filters="column.filters"
                             :filter-placement="column.filterPlacement"
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
        <div class="col-sm-6 pagination-info">
          <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
        </div>
        <div class="col-sm-6">
          <p-pagination class="pull-right"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="pagination.total">
          </p-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option, Loading} from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import swal from 'sweetalert2'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Loading.directive)


  export default {
    components: {
      PPagination
    },
    computed: {
      pagedData () {
        return this.$store.getters.pagedContacts
      },
      /***
       * Searches through table data and returns a paginated array.
       * Note that this should not be used for table with a lot of data as it might be slow!
       * Do the search and the pagination on the server and display the data retrieved from server instead.
       * @returns {computed.pagedData}
       */
      queriedData () {
        if (!this.searchQuery) {
          this.pagination.total = this.$store.state.contacts.totalContacts
          return this.pagedData
        }
        let result = this.tableData
          .filter((row) => {
            let isIncluded = false
            for (let key of this.propsToSearch) {
              let rowValue = row[key].toString()
              if (rowValue.includes && rowValue.includes(this.searchQuery)) {
                isIncluded = true
              }
            }
            return isIncluded
          })
        this.pagination.total = result.length
        return result.slice(this.from, this.to)
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
        this.pagination.total = this.$store.state.contacts.totalContacts
        return this.$store.state.contacts.totalContacts
      }
    },
    data () {
      return {
        pagination: {
          perPage: 20,
          currentPage: 1,
          perPageOptions: [20, 50, 100, 150, 200],
          total: 0
        },
        multipleSelection: [],
        searchQuery: '',
        propsToSearch: ['firstName', 'email', 'lastName'],
        tableColumns: [
          {prop: 'first_name', label: 'First Name', minWidth: 250},
          {prop: 'last_name', label: 'Last Name', minWidth: 250},
          {prop: 'full_name', label: 'Full Name', minWidth: 250},
          {prop: 'organization', label: 'Organization', minWidth: 250},
          {prop: 'email', label: 'Email', minWidth: 250},
          {
            prop: 'is_personal',
            label: 'Is Personal',
            minWidth: 200,
            filters: [{text: 'True', value: 'True'}, {text: 'False', value: 'False'}],
            filterMethod: this.filterTag,
            filterPlacement: 'bottom-end'
          },
          {prop: 'twitter_link', label: 'Twitter Link', minWidth: 250},
          {prop: 'facebook_link', label: 'Facebook Link', minWidth: 250},
          {prop: 'linkedinLink', label: 'Linkedin Link', minWidth: 250},
          {prop: 'confidence_score', label: 'Confidence Score', minWidth: 200},
          {prop: 'position', label: 'Position', minWidth: 200},
          {prop: 'email_score', label: 'Email Score', minWidth: 200},
          {prop: 'created', label: 'Created', minWidth: 200},
          {prop: 'updated', label: 'Last Updated', minWidth: 200}
        ],
        tableData: []
      }
    },
    methods: {
      handleEdit (index, row) {
        alert(`Your want to edit ${row.name}`)
      },
      handleDelete (index, row) {
        let tableData = this.tableData
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
          if (indexToDelete >= 0) {
            tableData.splice(indexToDelete, 1)
          }
          swal({
            title: 'Deleted!',
            text: 'Contact has been deleted.',
            type: 'success',
            confirmButtonClass: 'btn btn-success btn-fill',
            buttonsStyling: false
          })
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      filterTag (value, row) {
        return row.isPersonal === value
      }
    },
    created () {
      this.$store.dispatch('getContacts')
    }
  }

</script>
<style>
</style>
