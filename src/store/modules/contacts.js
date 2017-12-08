import contact from '../../api/contact'

const state = {
  pagedContacts: [],
  totalContacts: 0,
  nextURL: '',
  prevURL: '',
  loading: true
}

const actions = {
  getContacts: ({commit}, {page}) => {
    contact.getContacts(page).then(data => commit('SET_CONTACTS', data))
  }
}

const mutations = {
  'SET_CONTACTS' (state, data) {
    state.pagedContacts = data.results
    state.totalContacts = data.count
    state.nextURL = data.next
    state.prevURL = data.previous
    state.loading = false
  }
}

export default {
  state,
  actions,
  mutations
}
