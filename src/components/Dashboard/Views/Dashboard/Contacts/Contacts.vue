<template>
  <resource-list-table :resource-name="resourceName"
                       :table-columns="tableColumns">

    <el-table-column
      type="selection"
      width="55"
      slot="select_field">
    </el-table-column>

    <el-table-column
      label="ID"
      prop="id"
      min-width="100"
      slot="id">
      <template slot-scope="props">
         {{props.row.id}}
      </template>
    </el-table-column>

    <el-table-column
        label="Personal"
        :filter-method="filterTag"
        :filters="[{text: 'True', value: true}, {text: 'False', value: false}]"
        filter-placement="bottom-end"
        prop="is_personal"
        min-width="125"
        slot="is_personal">
        <template slot-scope="props">
          {{props.row.is_personal}}
        </template>
      </el-table-column>

    <el-table-column
      label="Organization"
      prop="organization"
      min-width="150"
      slot="organization">
      <template slot-scope="props">
        <router-link :to="{ name: 'Edit organization', params: { id: props.row.organization }}">
          {{props.row.organization}}
        </router-link>
      </template>
    </el-table-column>

  </resource-list-table>
</template>
<script>
  import ResourceListTable from 'src/components/UIComponents/ResourceListTable'

  export default {
    components: {
      ResourceListTable
    },
    data () {
      return {
        resourceName: 'contact',
        tableColumns: [
          {prop: 'first_name', label: 'First Name', minWidth: 200},
          {prop: 'last_name', label: 'Last Name', minWidth: 200},
          {prop: 'full_name', label: 'Full Name', minWidth: 200},
          {prop: 'email', label: 'Email', minWidth: 200},
          {prop: 'phone', label: 'Number', minWidth: 200},
          {prop: 'position', label: 'Position', minWidth: 200},
          {prop: 'twitter_link', label: 'Twitter Link', minWidth: 250},
          {prop: 'facebook_link', label: 'Facebook Link', minWidth: 250},
          {prop: 'linkedin_link', label: 'Linkedin Link', minWidth: 250},
          {prop: 'confidence_score', label: 'Confidence Score', minWidth: 100},
          {prop: 'email_score', label: 'Email Score', minWidth: 100},
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
