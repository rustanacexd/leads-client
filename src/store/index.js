import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contact: {
      paged: [],
      total: 0,
      contact: {
        // first_name: '',
        // last_name: '',
        // full_name: '',
        // email: '',
        // is_personal: false,
        // twitter_link: '',
        // facebook_link: '',
        // linkedin_link: '',
        // confidence_score: '',
        // email_score: '',
        // position: '',
        // phone: '',
        // organization: ''
      },
      searchString: ''
    },
    organization: {
      all: [],
      total: 0
    },
    loading: false
  },
  mutations: {
    'SET_CONTACT' (state, data) {
      state.contact.contact = data
    },
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
    },
    'SET_CONTACT_SEARCH_STRING' (state, data) {
      state.contact.searchString = data
    }
  },
  actions: {
    getPagedContacts ({commit}, {page}) {
      commit('SET_LOADING')
      api.getPagedContacts(page)
        .then(response => {
          commit('SET_CONTACTS', response.data)
          commit('SET_CONTACT_SEARCH_STRING', '')
          commit('SET_LOADING')
        })
    },
    getContact ({commit}, {id}) {
      commit('SET_LOADING')
      return api.getContact(id).then(({data}) => {
        commit('SET_CONTACT', data)
        commit('SET_LOADING')
      })
    },
    deleteContact ({commit}, {indexToDelete, contactID}) {
      return api.deleteContact(contactID)
        .then(() => commit('DELETE_CONTACT', indexToDelete))
    },
    addContact ({commit}, data) {
      return api.addContact(data).then(() => {
        commit('SET_CONTACT', {})
      })
    },
    updateContact ({commit}, data) {
      return api.updateContact(data)
    },
    searchContact ({commit, state}, {searchKey}) {
      commit('SET_CONTACT_SEARCH_STRING', searchKey)
      commit('SET_LOADING')
      return api.searchContact(searchKey)
        .then(response => {
          commit('SET_CONTACTS', response.data)
          commit('SET_LOADING')
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
