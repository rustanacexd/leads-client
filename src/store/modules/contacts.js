import contact from '../../api/contact'

const state = {
  pagedContacts: [],
  totalContacts: 0,
  nextURL: '',
  prevURL: ''
}

const getters = {
  pagedContacts (state) {
    return state.pagedContacts
  }
}

const actions = {
  getContacts: ({commit}) => {
    contact.getContacts().then(data => commit('SET_CONTACTS', data))
  }
}

const mutations = {
  'SET_CONTACTS' (state, data) {
    state.pagedContacts = data.results
    state.totalContacts = data.count
    state.nextURL = data.nextURL
    state.prevURL = data.prevURL
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
