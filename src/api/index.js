import axios from 'axios'

const baseURL = (process.env.NODE_ENV === 'production') ? 'https://leads-api.go2impact.com' : 'http://leads-api.local:9000'
let getAuthHeader = () => {
  return 'JWT ' + localStorage.getItem('token')
}

export default {
  login (username, password) {
    return axios.post(`${baseURL}/rest-auth/login/`, {username, password})
  },
  logout () {
    return axios.post(`${baseURL}/rest-auth/logout/`,
      {headers: {Authorization: getAuthHeader()}})
  },
  getPagedResources (page, resourceName) {
    return axios.get(`${baseURL}/${resourceName}/?page=${page}`,
      {headers: {Authorization: getAuthHeader()}})
  },
  deleteResource (resourceID, resourceName) {
    return axios.delete(`${baseURL}/${resourceName}/${resourceID}/`,
      {headers: {Authorization: getAuthHeader()}})
  },
  getResource (resourceID, resourceName) {
    return axios.get(`${baseURL}/${resourceName}/${resourceID}/`,
      {headers: {Authorization: getAuthHeader()}})
  },
  addResource (data, resourceName) {
    return axios.post(`${baseURL}/${resourceName}/`, data,
      {headers: {Authorization: getAuthHeader()}})
  },
  updateResource (data, resourceName) {
    return axios.put(`${baseURL}/${resourceName}/${data.id}/`, data,
      {headers: {Authorization: getAuthHeader()}})
  },
  searchResource (searchKey, resourceName, page) {
    return axios.get(`${baseURL}/${resourceName}?page=${page}&search=${searchKey}`,
      {headers: {Authorization: getAuthHeader()}})
  },
  getContactsWithQuery (searchString, page) {
    return axios.get(`${baseURL}/contact/?page=${page}&${searchString}`,
      {headers: {Authorization: getAuthHeader()}})
  },
  exportResourcesCSV (resourceName) {
    return axios.get(`${baseURL}/${resourceName}/?format=csv&page_size=5000`,
      {headers: {Authorization: getAuthHeader()}})
  },
  exportSegmentContactsCSV (queryString) {
    return axios.get(`${baseURL}/contact/?${queryString}format=csv&page_size=5000`,
      {headers: {Authorization: getAuthHeader()}})
  },
  addSegment (data, segmentFilters) {
    return axios.post(`${baseURL}/segment/`, {
      ...data,
      segment_filters: segmentFilters
    }, {headers: {Authorization: getAuthHeader()}})
      .then(({data}) => data.id)
  },
  updateSegment (data, segmentFilters) {
    return axios.put(`${baseURL}/segment/${data.id}/`, {
      ...data,
      segment_filters: segmentFilters
    }, {headers: {Authorization: getAuthHeader()}})
      .then(({data}) => data.id)
  }
}
