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
