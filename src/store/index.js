import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: {
      pagedContacts: [],
      totalContacts: 0,
      loading: true
    }
  },
  mutations: {
    'SET_CONTACTS' (state, data) {
      state.contacts.pagedContacts = data.results
      state.contacts.totalContacts = data.count
      state.contacts.loading = false
    },
    'DELETE_CONTACT' (state, contact) {
      state.contacts.pagedContacts.splice(contact, 1)
      state.contacts.totalContacts -= 1
    }
  },
  actions: {
    getContacts ({commit}, {page}) {
      api.getContacts(page)
        .then(response => commit('SET_CONTACTS', response.data))
        .catch(error => console.log(error))
    },
    deleteContact ({commit}, {indexToDelete, contactID}) {
      return api.deleteContact(contactID)
        .then(() => commit('DELETE_CONTACT', indexToDelete))
        .catch(error => console.log(error.message))
    }
  }

})
