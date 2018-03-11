import * as types from '../mutation-types'

// initial state
const state = {
	user: null,
}

// getters
const getters = {
	user: state => state.user,
}

// actions
const actions = {
	login ({commit, state,dispatch}, {identify, password}){
		return new Promise((resolve,reject)=>{
			$API.user.login({identify,password}, resp => {
        		commit(types.INIT_USER_INFO, resp)
				resolve(resp);
			})
	    })
	},
	userMy({ commit, state, dispatch }){
	    return new Promise((resolve, reject) => {
			$API.user.userMy(resp => {
				commit(types.GET_USER_MY_INFO, resp)
				resolve(resp);
			},resp => {
				resolve(resp);
			})
	    })
	},
}



// mutations
const mutations = {
	[types.INIT_USER_INFO](state,data) {
	    state.user = data.user;
	    let requestParam = {
	        token: data.token,
	        plat:'web',
	    }
	    localStorage.setItem("requestParam", JSON.stringify(requestParam));
      	$axios.defaults.params = requestParam;//重新修改全局联网配置
	},
	[types.GET_USER_MY_INFO](state,data) {
	    state.user = data.user;
	},

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

