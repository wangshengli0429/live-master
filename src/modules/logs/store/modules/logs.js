import * as types from '../mutation-types'

// initial state
const state = {
	logs:[],//
	total:0,
	currentPage:1,
	limit:20,
}

// getters
const getters = {
	logs: state => state.logs,
	total: state => state.total,
	currentPage: state => state.currentPage,
	limit: state => state.limit,

}

// actions
const actions = {
	getLogsList ({commit, state,dispatch},{currentPage,limit}){
		const start = (currentPage-1)*limit;
		return new Promise((resolve,reject)=>{
			$API.logs.getLogsList({start,limit},resp => {
    			commit(types.INIT_LOGS_LIST,{resp,currentPage,limit})
				resolve(resp);
			})
	    })
	},

	


}



// mutations
const mutations = {
	[types.INIT_LOGS_LIST] (state,{resp,currentPage,limit}) {
		state.currentPage = currentPage;
		state.limit = limit;
	    state.logs = resp.list;
	    state.total = resp.count;
	},

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

