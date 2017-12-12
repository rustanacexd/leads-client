import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contact: {
      paged: [],
      total: 0
    },
    organization: {
      all: [],
      total: 0
    },
    loading: false
  },
  mutations: {
    'SET_CONTACTS' (state, data) {
      state.contact.paged = data.results
      state.contact.total = data.count
    },
    'DELETE_CONTACT' (state, contact) {
      state.contact.paged.splice(contact, 1)
      state.contact.total -= 1
    },
    'SET_LOADING' (state) {
      state.loading = !state.loading
    },
    'SET_ORGS' (state, data) {
      state.organization.all = data
    },
    'SET_TOTAL_ORG_COUNT' (state, count) {
      state.organization.total = count
    }
  },
  actions: {
    getPagedContacts ({commit}, {page}) {
      commit('SET_LOADING')
      api.getPagedContacts(page)
        .then(response => {
          commit('SET_CONTACTS', response.data)
          commit('SET_LOADING')
        })
        .catch(error => console.log(error))
    },
    deleteContact ({commit}, {indexToDelete, contactID}) {
      return api.deleteContact(contactID)
        .then(() => commit('DELETE_CONTACT', indexToDelete))
        .catch(error => {
          console.log(error)
        })
    },
    getAllOrganizations ({commit, state}) {
      commit('SET_LOADING')
      api.getAllOrganizations().then(({count, results}) => {
        let totalOrganizations = [...results]

        if (state.contact.total !== count) {
          api.fetchAllOrgs(count).then(results => {
            totalOrganizations = [...totalOrganizations, ...results]
            commit('SET_ORGS', totalOrganizations)
          })
        }

        commit('SET_TOTAL_ORG_COUNT', count)
        commit('SET_LOADING')
      })
    }
  }

})
