import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://leads-api.dev:9000'
})

export default {
  getContacts: (page) => {
    return instance.get(`/contact/?page=${page}`)
  },
  deleteContact: (contactID) => {
    return instance.delete(`/contact/${contactID}`)
  }
}
