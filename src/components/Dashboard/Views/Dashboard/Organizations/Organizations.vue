<template>
  <resource-list-table :resource-name="resourceName"
                       :table-columns="tableColumns">
    <el-table-column
      label="ID"
      prop="id"
      min-width="100"
      slot="id"
    >
      <template slot-scope="props">
         {{props.row.id}}
      </template>
    </el-table-column>

    <el-table-column
      label="Client"
      prop="client"
      min-width="100"
      slot="client"
    >
      <template slot-scope="props">
        <router-link :to="{ name: 'Edit client', params: { id: props.row.client }}">
          {{props.row.client}}
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
        resourceName: 'organization',
        tableColumns: [
          {prop: 'name', label: 'Name', minWidth: 250},
          {prop: 'domain_name', label: 'Domain Name', minWidth: 250},
          {prop: 'revenue', label: 'Revenue', minWidth: 150},
          {prop: 'employees', label: 'Employees', minWidth: 150},
          {prop: 'twitter_link', label: 'Twitter Link', minWidth: 250},
          {prop: 'facebook_link', label: 'Facebook Link', minWidth: 250},
          {prop: 'instagram_link', label: 'Instagram Link', minWidth: 250},
          {prop: 'linkedin_link', label: 'Linkedin Link', minWidth: 250},
          {prop: 'yelp_link', label: 'Yelp Link', minWidth: 250},
          {prop: 'pinterest_link', label: 'Pinterest Link', minWidth: 250},
          {prop: 'phone_1', label: 'Phone 1', minWidth: 250},
          {prop: 'phone_2', label: 'Phone 2', minWidth: 250}
        ]
      }
    }
  }

</script>
<style>
</style>
