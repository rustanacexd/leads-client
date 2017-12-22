import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://leads-api.local:9000'
})

const PAGE_SIZE = 25

export default {
  getPagedResources (page, resourceName) {
    return instance.get(`/${resourceName}/?page=${page}`)
  },
  deleteResource (resourceID, resourceName) {
    return instance.delete(`/${resourceName}/${resourceID}/`)
  },
  getResource (resourceID, resourceName) {
    return instance.get(`/${resourceName}/${resourceID}/`)
  },
  addResource (data, resourceName) {
    return instance.post(`/${resourceName}/`, data)
  },
  updateResource (data, resourceName) {
    return instance.put(`/${resourceName}/${data.id}/`, data)
  },
  searchResource (searchKey, resourceName) {
    return instance.get(`/${resourceName}?search=${searchKey}`)
  },
  addSegment (data, segmentFilters) {
    return instance.post('/segment/', data)
      .then(({data}) => {
        const addFilters = segmentFilters.filter(filter => filter.filterValue)
          .map(filter => {
            return instance.post('/segment-filter/', {
              filter_name: filter.name,
              operand: filter.operand,
              value: typeof (filter.filterValue) === 'boolean' ? filter.filterValue.toString() : filter.filterValue,
              segment: data.id
            })
          })
        return axios.all(addFilters).then(() => data.id)
      })
  },
  updateSegment (data, segmentFilters) {
    return instance.put(`/segment/${data.id}/`, data)
      .then(({data}) => {
        const addFilters = segmentFilters.filter(filter => filter.filterValue)
          .map(filter => {
            const filterData = {
              filter_name: filter.name,
              operand: filter.operand,
              value: typeof (filter.filterValue) === 'boolean' ? filter.filterValue.toString() : filter.filterValue,
              segment: data.id
            }
            if (filter.id) {
              return instance.put(`/segment-filter/${filter.id}/`, filterData)
            }
            return instance.post(`/segment-filter/`, filterData)
          })
        return axios.all(addFilters).then(() => data.id)
      })
  },
  getAllOrganizations () {
    return instance.get('/organization/').then(({data: {count, results}}) => {
      return {count, results}
    })
  },
  fetchAllOrgs (count) {
    let orgPromises = []

    for (let i = 2; i <= count / PAGE_SIZE; i++) {
      orgPromises.push(instance.get(`/organization/?page=${i}`))
    }

    return axios.all(orgPromises).then(results => {
      let totalOrganizations = []
      results.forEach(response => {
        totalOrganizations = [...totalOrganizations, ...response.data.results]
      })
      return totalOrganizations
    })
  }
}
