import axios from 'axios'


const instance = axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ? 'http://leads-api.go2impact.com' : 'http://leads-api.local:9000'
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
  searchResource (searchKey, resourceName, page) {
    return instance.get(`/${resourceName}?page=${page}&search=${searchKey}`)
  },
  getContactsWithQuery (searchString, page) {
    return instance.get(`/contact/?page=${page}&${searchString}`)
  },
  exportResourcesCSV (resourceName) {
    return instance.get(`/${resourceName}/?format=csv&page_size=5000`)
  },
  exportSegmentContactsCSV (queryString) {
    return instance.get(`/contact/?${queryString}format=csv&page_size=5000`)
  },
  addSegment (data, segmentFilters) {
    return instance.post('/segment/', {...data, segment_filters: segmentFilters})
      .then(({data}) => data.id)
  },
  updateSegment (data, segmentFilters) {
    return instance.put(`/segment/${data.id}/`, {...data, segment_filters: segmentFilters})
      .then(({data}) => data.id)
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
