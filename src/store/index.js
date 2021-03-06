import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api'
import {handleError} from '../helpers'

Vue.use(Vuex)

const NUMBER_OPERANDS = [
  {value: 'exact', label: 'Exact'},
  {value: 'lt', label: 'Less than'},
  {value: 'lte', label: 'Less than or equal'},
  {value: 'gt', label: 'Greater than'},
  {value: 'gte', label: 'Greater than or equal'}
]
const TEXT_OPERANDS = [{value: 'exact', label: 'Exact'}, {value: 'icontains', label: 'Contains'}]

export default new Vuex.Store({
  state: {
    contact: {
      paged: [],
      total: 0,
      contact: {},
      searchString: ''
    },
    client: {
      paged: [],
      total: 0,
      client: {},
      searchString: ''
    },
    organization: {
      paged: [],
      total: 0,
      organization: {},
      searchString: ''
    },
    segment: {
      paged: [],
      total: 0,
      segment: {},
      filters: [
        {
          id: '',
          name: 'confidence_score',
          label: 'Confidence Score',
          operand: '',
          filterValue: '',
          validate: {numeric: true},
          operands: NUMBER_OPERANDS
        },
        {
          id: '',
          name: 'is_personal',
          label: 'Is Personal',
          operand: 'exact',
          filterValue: false,
          operands: [{value: 'exact', label: 'Exact'}]
        },
        {
          id: '',
          name: 'position',
          label: 'Position',
          operand: '',
          filterValue: '',
          validate: {alpha: true},
          operands: TEXT_OPERANDS
        },
        {
          id: '',
          name: 'organization__name',
          label: 'Organization Name',
          operand: '',
          filterValue: '',
          validate: {alpha_num: true},
          operands: TEXT_OPERANDS
        },
        {
          id: '',
          name: 'organization__revenue',
          label: 'Organization Revenue',
          operand: '',
          filterValue: '',
          validate: {decimal: 2, max: 10},
          operands: NUMBER_OPERANDS
        },
        {
          id: '',
          name: 'organization__address__country',
          label: 'Country',
          operand: '',
          filterValue: '',
          validate: {max: 255, alpha: true},
          operands: TEXT_OPERANDS
        },
        {
          id: '',
          name: 'organization__address__city',
          label: 'City',
          operand: '',
          filterValue: '',
          validate: {max: 255, alpha: true},
          operands: TEXT_OPERANDS
        },
        {
          id: '',
          name: 'organization__client__name',
          label: 'Client Name',
          operand: '',
          filterValue: '',
          validate: {max: 255},
          operands: TEXT_OPERANDS
        },
        {
          id: '',
          name: 'organization__social__facebook_shares',
          label: 'Facebook Shares',
          operand: '',
          filterValue: '',
          validate: {numeric: true, max_value: 2147483647},
          operands: NUMBER_OPERANDS
        },
        {
          id: '',
          name: 'organization__social__instagram_followers',
          label: 'Instagram Followers',
          operand: '',
          filterValue: '',
          validate: {numeric: true, max_value: 2147483647},
          operands: NUMBER_OPERANDS

        },
        {
          id: '',
          name: 'organization__social__twitter_followers',
          label: 'Twitter Followers',
          operand: '',
          filterValue: '',
          validate: {numeric: true, max_value: 2147483647},
          operands: NUMBER_OPERANDS
        },
        {
          id: '',
          name: 'organization__social__klout_score',
          label: 'Klout Score',
          operand: '',
          filterValue: '',
          validate: {numeric: true, max_value: 2147483647},
          operands: NUMBER_OPERANDS
        },
        {
          id: '',
          name: 'organization__social__linkedin_shares',
          label: 'Linkedin Shares',
          operand: '',
          filterValue: '',
          validate: {numeric: true, max_value: 2147483647},
          operands: NUMBER_OPERANDS
        },
        {
          id: '',
          name: 'organization__domain__name',
          label: 'Domain Name',
          operand: '',
          filterValue: '',
          validate: {alpha_num: true},
          operands: TEXT_OPERANDS
        },
        {
          id: '',
          name: 'organization__domain__domain_rank',
          label: 'Domain Rank',
          operand: '',
          filterValue: '',
          validate: {numeric: true, max_value: 2147483647},
          operands: NUMBER_OPERANDS
        },
        {
          id: '',
          name: 'organization__domain__domainkeyword__keyword',
          label: 'Domain Keyword',
          operand: '',
          filterValue: '',
          validate: {alpha_num: true},
          operands: TEXT_OPERANDS
        },
        {
          id: '',
          name: 'organization__domain__organic_traffic_count',
          label: 'Organic Traffic Count',
          operand: '',
          filterValue: '',
          validate: {numeric: true, max_value: 2147483647},
          operands: NUMBER_OPERANDS
        },
        {
          id: '',
          name: 'organization__domain__adwords_traffic_count',
          label: 'Adwords Traffic Count',
          operand: '',
          filterValue: '',
          validate: {numeric: true, max_value: 2147483647},
          operands: NUMBER_OPERANDS
        }
      ],
      searchString: '',
      queryString: '',
      dynamicCampaigns: []
    },
    campaign: {
      paged: [],
      total: 0,
      campaign: {},
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
    'DELETE_RESOURCE_FROM_TABLE' (state, {indexToDelete, resourceName}) {
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
    },
    'SET_SEGMENT_QUERY_STRING' (state, queryString) {
      state.segment.queryString = queryString
    },
    'SET_SEGMENT_FILTER' (state, segmentFilter, index) {
      state.segment.filters.splice(index, 1, segmentFilter)
    },
    'SET_SEGMENT_FILTERS' (state, segmentFilters) {
      state.segment.filters = segmentFilters
    },
    'RESET_SEGMENT_FILTERS' (state) {
      state.segment.filters.forEach(filter => {
        if (filter.name === 'is_personal') {
          Vue.set(filter, 'operand', 'exact')
          Vue.set(filter, 'filterValue', false)
        } else {
          Vue.set(filter, 'operand', '')
          Vue.set(filter, 'filterValue', '')
        }
      })
    },
    'SET_CAMPAIGNS' (state, campaigns) {
      state.segment.dynamicCampaigns = campaigns
    },
    'ADD_DYNAMIC_CAMPAIGN' (state, campaign) {
      state.segment.dynamicCampaigns.push(campaign)
    },
    'REMOVE_DYNAMIC_CAMPAIGN' (state, campaign) {
      state.segment.dynamicCampaigns.splice(state.segment.dynamicCampaigns.indexOf(campaign), 1)
    }
  },
  actions: {
    login ({commit}, {username, password}) {
      commit('SET_LOADING')
      return api.login(username, password).then(({data}) => {
        localStorage.setItem('token', data.token)
        commit('SET_LOADING')
        return data
      })
    },
    logout ({commit}) {
      commit('SET_LOADING')
      return api.logout().then(() => {
        localStorage.removeItem('token')
        commit('SET_LOADING')
      })
    },
    getPagedResources ({commit}, {page, resourceName}) {
      commit('SET_LOADING')
      api.getPagedResources(page, resourceName)
        .then(({data}) => {
          commit('SET_RESOURCES', {data, resourceName})
          commit('SET_RESOURCE_SEARCH_STRING', {searchKey: '', resourceName})
          commit('SET_LOADING')
        })
        .catch(error => handleError(error))
    },
    getResource ({commit}, {id, resourceName}) {
      commit('SET_LOADING')
      return api.getResource(id, resourceName).then(({data}) => {
        commit('SET_RESOURCE', {data, resourceName})
        commit('SET_LOADING')
      })
    },
    deleteResource ({commit}, {resourceID, resourceName}) {
      return api.deleteResource(resourceID, resourceName)
    },
    deleteResourceFromTable ({commit}, {indexToDelete, resourceID, resourceName}) {
      return api.deleteResource(resourceID, resourceName)
        .then(() => commit('DELETE_RESOURCE_FROM_TABLE', {indexToDelete, resourceName}))
    },
    addResource ({commit}, {data, resourceName}) {
      return api.addResource(data, resourceName).then(({data}) => {
        commit('SET_RESOURCE', {data: {}, resourceName})
        return data
      })
    },
    updateResource ({commit}, {data, resourceName}) {
      return api.updateResource(data, resourceName)
        .then(response => response.data)
    },
    searchResource ({commit}, {searchKey, resourceName, page}) {
      commit('SET_RESOURCE_SEARCH_STRING', {searchKey, resourceName})
      commit('SET_LOADING')
      return api.searchResource(searchKey, resourceName, page)
        .then(({data}) => {
          commit('SET_RESOURCES', {data, resourceName})
          commit('SET_LOADING')
        })
    },
    exportResource ({commit}, resourceName) {
      commit('SET_LOADING')
      return api.exportResourcesCSV(resourceName)
        .then(({data}) => {
          commit('SET_LOADING')
          return data
        })
    },
    exportSegmentContacts ({commit, state}) {
      commit('SET_LOADING')
      return api.exportSegmentContactsCSV(state.segment.queryString)
        .then(({data}) => {
          commit('SET_LOADING')
          return data
        })
    },
    getContactsWithQuery ({commit}, {resourceID, page}) {
      commit('SET_LOADING')
      let queryString = ''
      return api.getResource(resourceID, 'segment').then(({data}) => {
        commit('SET_RESOURCE', {data, resourceName: 'segment'})
        if (data.segment_filters) {
          for (let segment of data.segment_filters) {
            queryString += segment.filter_name
            if (segment.operand === 'exact') {
              queryString += `=${segment.value}`
            } else {
              queryString += `__${segment.operand}=${segment.value}`
            }

            queryString += '&'
          }
          commit('SET_SEGMENT_QUERY_STRING', queryString)

          return api.getContactsWithQuery(queryString, page).then(({data}) => {
            commit('SET_LOADING')
            commit('SET_RESOURCES', {data, resourceName: 'contact'})
          })
        }
      })
    },
    getSegment ({commit, state}, segmentID) {
      const resourceName = 'segment'
      commit('SET_LOADING')
      api.getResource(segmentID, resourceName).then(({data}) => {
        commit('SET_RESOURCE', {data, resourceName})
        commit('SET_CAMPAIGNS', data.campaigns)
        commit('RESET_SEGMENT_FILTERS')
        if (data.segment_filters) {
          const newFilters = state.segment.filters.map(segmentFilter => {
            const filterObjData = data.segment_filters.find(filter => {
              return filter.filter_name === segmentFilter.name
            })
            if (filterObjData) {
              if (filterObjData.filter_name === 'is_personal') {
                segmentFilter.filterValue = (filterObjData.value === 'true')
              } else {
                segmentFilter.filterValue = filterObjData.value
              }
              segmentFilter.operand = filterObjData.operand
              segmentFilter.id = filterObjData.id
            }
            return segmentFilter
          })
          commit('SET_SEGMENT_FILTERS', newFilters)
        }

        commit('SET_LOADING')
      })
    },
    updateSegment ({commit}, {data, segmentFilters}) {
      const filteredFilters = segmentFilters
        .filter(filter => filter.filterValue || typeof (filter.filterValue) === 'boolean')

      const filters = filteredFilters.map(filter => {
        return {
          filter_name: filter.name,
          operand: filter.operand,
          value: typeof (filter.filterValue) === 'boolean' ? filter.filterValue.toString() : filter.filterValue,
          segment: data.id
        }
      })
      return api.updateSegment(data, filters)
    },
    addSegment ({commit}, {data, segmentFilters}) {
      const filters = segmentFilters.filter(filter => filter.filterValue || typeof (filter.filterValue) === 'boolean')
        .map(filter => {
          return {
            filter_name: filter.name,
            operand: filter.operand,
            value: typeof (filter.filterValue) === 'boolean' ? filter.filterValue.toString() : filter.filterValue,
            segment: data.id
          }
        })
      return api.addSegment(data, filters).then(id => {
        commit('SET_RESOURCE', {data: {}, resourceName: 'segment'})
        commit('RESET_SEGMENT_FILTERS')
        return id
      })
    }
  }

})
