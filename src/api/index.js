import axios from 'axios'

let instance = axios.create({
  baseURL: 'http://leads-api.dev:9000'
})

export default {
  getPagedContacts (page) {
    return instance.get(`/contact/?page=${page}`)
  },
  deleteContact (contactID) {
    return instance.delete(`/contact/${contactID}/`)
  },
  addContact (data) {
    console.log(data)
    return instance.post('/contact/', data)
  },
  getAllOrganizations () {
    return instance.get('/organization/').then(({data: {count, results}}) => {
      return {count, results}
    })
  },
  fetchAllOrgs (count) {
    let orgPromises = []

    for (let i = 2; i <= count / 50; i++) {
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
