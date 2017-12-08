import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://leads-api.dev:9000'
})

export default {
  getContacts: (page = 1) => {
    return instance.get(`/contact/?page=${page}`)
      .then(response => response.data)
      .catch(error => console.log(error))
  }
}
