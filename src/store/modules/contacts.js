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
  },

  deleteContact: ({commit}, {indexToDelete, contactID}) => {
    contact.deleteContact(contactID).then(() => commit('DELETE_CONTACT', indexToDelete))
  }
}

const mutations = {
  'SET_CONTACTS' (state, data) {
    state.pagedContacts = data.results
    state.totalContacts = data.count
    state.nextURL = data.next
    state.prevURL = data.previous
    state.loading = false
  },
  'DELETE_CONTACT' (state, contact) {
    state.pagedContacts.splice(contact, 1)
    state.totalContacts -= 1
  }
}

export default {
  state,
  actions,
  mutations
}
