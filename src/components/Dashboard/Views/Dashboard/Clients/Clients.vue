<template>
  <resource-list-table :resource-name="resourceName"
                       :table-columns="tableColumns"
                       :props-to-search="propsToSearch"
  ></resource-list-table>
</template>
<script>
  import ResourceListTable from 'src/components/UIComponents/ResourceListTable'

  export default {
    components: {
      ResourceListTable
    },
    data () {
      return {
        resourceName: 'client',
        propsToSearch: ['name', 'remote_key'],
        tableColumns: [
          {prop: 'name', label: 'Name', minWidth: 250},
          {prop: 'remote_key', label: 'Remote Key', minWidth: 250}
        ]
      }
    }
  }

</script>
<style>
</style>
