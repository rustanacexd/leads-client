<template>
  <resource-list-table :resource-name="resourceName"
                       :table-columns="tableColumns">
    <el-table-column
      label="ID"
      prop="id"
      min-width="50"
      slot="id">
      <template slot-scope="props">
        {{props.row.id}}
      </template>
    </el-table-column>

    <el-table-column
      label="Client"
      prop="client"
      min-width="50"
      slot="client">
      <template slot-scope="props">
        <router-link v-if="props.row.client" :to="{ name: 'Edit client', params: { id: props.row.client }}">
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
        resourceName: 'segment',
        tableColumns: [
          {prop: 'name', label: 'Name', minWidth: 100},
          {prop: 'description', label: 'Description', minWidth: 100}
        ]
      }
    }
  }

</script>
<style>
</style>
