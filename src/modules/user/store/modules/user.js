import * as types from '../mutation-types'

// initial state
const state = {

}

// getters
const getters = {

}

// actions
const actions = {
	login ({commit, state,dispatch}, {identify, password}){
		return new Promise((resolve,reject)=>{
			$API.user.login({identify,password}, resp => {
				resolve(resp);
			})
	    })
	},
}



// mutations
const mutations = {


}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

