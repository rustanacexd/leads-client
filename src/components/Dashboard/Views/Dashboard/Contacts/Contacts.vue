<template>
  <resource-list-table :resource-name="resourceName"
                       :table-columns="tableColumns"
                       :props-to-search="propsToSearch">

    <el-table-column
      type="selection"
      width="55"
      slot="select_field">
    </el-table-column>

    <el-table-column
      label="Personal"
      :filter-method="filterTag"
      :filters="[{text: 'True', value: true}, {text: 'False', value: false}]"
      filter-placement="bottom-end"
      prop="is_personal"
      min-width="150"
      slot="is_personal"
    >
      <template slot-scope="props">
        {{props.row.is_personal}}
      </template>
    </el-table-column>

  </resource-list-table>
</template>
<script>
  import Vue from 'vue'
  import ResourceListTable from 'src/components/UIComponents/ResourceListTable'
  import {TableColumn} from 'element-ui'

  Vue.use(TableColumn)

  export default {
    components: {
      ResourceListTable
    },
    data () {
      return {
        resourceName: 'contact',
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
      filterTag (value, row) {
        return row.is_personal === value
      }
    }
  }

</script>
<style>
</style>
