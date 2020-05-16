import * as types from '../mutation-types'

// initial state
const state = {
	proxyList:[],//账号组
	total:0,
	currentPage:1,
	limit:20,
}

// getters
const getters = {
	proxyList: state => state.proxyList,
	total: state => state.total,
	currentPage: state => state.currentPage,
	limit: state => state.limit,

}

// actions
const actions = {
	getProxyList ({commit, state,dispatch},{orgId,parentId,filter,status,searchKey,currentPage,limit}){
		const start = (currentPage-1)*limit;
		return new Promise((resolve,reject)=>{
			$API.proxy.getProxyList({start,limit,orgId,filter,parentId,status,searchKey},resp => {
    			commit(types.INIT_PROXY_LIST,{resp,currentPage,limit})
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
	// getAccountProxyDetail ({commit, state,dispatch},{uuid}){
	// 	return new Promise((resolve,reject)=>{
	// 		$API.limit.getAccountProxyDetail({uuid},resp => {
	// 			resolve(resp);
	// 		})
	//     })
	// },
	deleteProxy ({commit, state,dispatch},{uuid}){
		return new Promise((resolve,reject)=>{
			$API.proxy.deleteProxy({uuid},resp => {
				resolve(resp);
			})
	    })
	},




}



// mutations
const mutations = {
	[types.INIT_PROXY_LIST] (state,{resp,currentPage,limit}) {
		state.currentPage = currentPage;
		state.limit = limit;
	    state.proxyList = resp.list;
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

