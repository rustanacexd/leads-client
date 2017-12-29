import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api'

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
      return api.updateResource(data, resourceName).then(response => response.data)
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
      return api.updateSegment(data, segmentFilters)
    },
    addSegment ({commit}, {data, segmentFilters}) {
      return api.addSegment(data, segmentFilters).then(() => {
        commit('SET_RESOURCE', {data: {}, resourceName: 'segment'})
        commit('RESET_SEGMENT_FILTERS')
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
