<template>
  <resource-list-table :resource-name="resourceName"
                       :table-columns="tableColumns"
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
        tableColumns: [
          {prop: 'id', label: 'ID', minWidth: 25},
          {prop: 'name', label: 'Name', minWidth: 100},
          {prop: 'remote_key', label: 'Remote Key', minWidth: 100}
        ]
      }
    }
  }

</script>
<style>
</style>
