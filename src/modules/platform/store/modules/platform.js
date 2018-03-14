import * as types from '../mutation-types'

// initial state
const state = {
	platList:[],//账号组
	total:0,
	currentPage:1,
	limit:20,
	authorities:[]
}

// getters
const getters = {
	platList: state => state.platList,
	total: state => state.total,
	currentPage: state => state.currentPage,
	limit: state => state.limit,
	authorities: state => state.authorities,

}

// actions
const actions = {
	getPlatFormList ({commit, state,dispatch},{orgId,status,searchKey,currentPage,limit}){
		const start = (currentPage-1)*limit;
		return new Promise((resolve,reject)=>{
			$API.platform.getPlatFormList({orgId,status,searchKey,start,limit},resp => {
    			commit(types.INIT_PLATFROM_LIST,{resp,currentPage,limit})
				resolve(resp);
			})
	    })
	},
	// getAuthoritiesList ({commit, state,dispatch}){
	// 	return new Promise((resolve,reject)=>{
	// 		$API.limit.getAuthoritiesList(resp => {
 //    			commit(types.INIT_AUTHORITIES_LIST,resp)
	// 			resolve(resp);
	// 		})
	//     })
	// },
	// getAccountGroupDetail ({commit, state,dispatch},{uuid}){
	// 	return new Promise((resolve,reject)=>{
	// 		$API.limit.getAccountGroupDetail({uuid},resp => {
	// 			resolve(resp);
	// 		})
	//     })
	// },
	// deleteAccountGroup ({commit, state,dispatch},{uuid}){
	// 	return new Promise((resolve,reject)=>{
	// 		$API.limit.deleteAccountGroup({uuid},resp => {
	// 			resolve(resp);
	// 		})
	//     })
	// },

	


}



// mutations
const mutations = {
	[types.INIT_PLATFROM_LIST] (state,{resp,currentPage,limit}) {
		state.currentPage = currentPage;
		state.limit = limit;
	    state.platList = resp.list;
	    state.total = resp.count;
	},
	// [types.INIT_AUTHORITIES_LIST] (state,resp) {
	//     state.authorities = resp.authorities;
	// },
	


}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

