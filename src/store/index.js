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
    client: {
      paged: [],
      total: 0,
      client: {
        // name: '',
        // remote_key: '',
      },
      searchString: ''
    },
    organization: {
      paged: [],
      total: 0,
      organization: {
        // name: '',
        // remote_key: '',
      },
      searchString: ''
    },
    loading: false
  },
  mutations: {
    'SET_RESOURCE' (state, {data, resourceName}) {
      state[resourceName][resourceName] = data
    },
    'SET_RESOURCES' (state, {data, resourceName}) {
      state[resourceName].paged = data.results
      state[resourceName].total = data.count
    },
    'DELETE_RESOURCE' (state, {indexToDelete, resourceName}) {
      state[resourceName].paged.splice(indexToDelete, 1)
      state[resourceName].total -= 1
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
    'SET_RESOURCE_SEARCH_STRING' (state, {searchKey, resourceName}) {
      state[resourceName].searchString = searchKey
    }
  },
  actions: {
    getPagedResources ({commit}, {page, resourceName}) {
      commit('SET_LOADING')
      api.getPagedResources(page, resourceName)
        .then(({data}) => {
          commit('SET_RESOURCES', {data, resourceName})
          commit('SET_RESOURCE_SEARCH_STRING', {searchKey: '', resourceName})
          commit('SET_LOADING')
        })
    },
    getResource ({commit}, {id, resourceName}) {
      commit('SET_LOADING')
      return api.getResource(id, resourceName).then(({data}) => {
        commit('SET_RESOURCE', {data, resourceName})
        commit('SET_LOADING')
      })
    },
    deleteResource ({commit}, {indexToDelete, resourceID, resourceName}) {
      return api.deleteResource(resourceID, resourceName)
        .then(() => commit('DELETE_RESOURCE', {indexToDelete, resourceName}))
    },
    addResource ({commit}, {data, resourceName}) {
      return api.addResource(data, resourceName).then(() => {
        commit('SET_RESOURCE', {data: {}, resourceName})
      })
    },
    updateResource ({commit}, {data, resourceName}) {
      return api.updateResource(data, resourceName)
    },
    searchResource ({commit}, {searchKey, resourceName}) {
      commit('SET_RESOURCE_SEARCH_STRING', {searchKey, resourceName})
      commit('SET_LOADING')
      return api.searchResource(searchKey, resourceName)
        .then(({data}) => {
          commit('SET_RESOURCES', {data, resourceName})
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
