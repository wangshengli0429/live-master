import * as types from '../mutation-types'

// initial state
const state = {
  scope: 'upcoming',
  openKeys:[],
  bread_crumb:[]
}

// getters
const getters = {
  scope: state => state.scope,
  openKeys: state => state.openKeys,
  bread_crumb: state => state.bread_crumb,
}

// actions
const actions = {
  switchScope({ commit, state }, scope) {
    commit('SWITCH_SCOPE', scope);
  },
  setOpenKeys({ commit, state},key){
    commit('SET_OPEN_KEYS', key);
  },
  setBreadCrumb({ commit, state},list){
    commit('SET_BREAD_CRUMB', list);
  }


}

// mutations
const mutations = {
  [types.SWITCH_SCOPE](state, scope) {
    state.scope = scope;
  },
  [types.SET_OPEN_KEYS](state, key) {
    const index = state.openKeys.findIndex(item => item == key);
    if(index >= 0){
      state.openKeys.splice(index,1);
    }else{
      state.openKeys.push(key);
    }
  },
  [types.SET_BREAD_CRUMB](state, list) {
    const home = {
      name:"主页",
      uuid:"main",
      path:"/"
    }
    list.unshift(home);
    state.bread_crumb = list;
  },





}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
