import * as types from '../mutation-types'

// initial state
const state = {
  scope: 'upcoming',
}

// getters
const getters = {
  scope: state => state.scope,
}

// actions
const actions = {
  switchScope({ commit, state }, scope) {
    commit('SWITCH_SCOPE', scope);
  },



}

// mutations
const mutations = {
  [types.SWITCH_SCOPE](state, scope) {
    state.scope = scope;
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
