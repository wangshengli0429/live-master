import * as types from '../mutation-types'

// initial state
const state = {
	accountList:[],//账号组
	total:0,
	currentPage:1,
	limit:20,
}

// getters
const getters = {
	accountList: state => state.accountList,
	total: state => state.total,
	currentPage: state => state.currentPage,
	limit: state => state.limit,

}

// actions
const actions = {
	getAccountList ({commit, state,dispatch},{currentPage,limit}){
		// const start = (currentPage-1)*limit;
		// return new Promise((resolve,reject)=>{
		// 	$API.limit.getAccountGroup({start,limit},resp => {
  //   			commit(types.INIT_ACCOUNT_GROUP,{resp,currentPage,limit})
		// 		resolve(resp);
		// 	})
	 //    })
	},

	


}



// mutations
const mutations = {
	// [types.INIT_ACCOUNT_GROUP] (state,{resp,currentPage,limit}) {
	// 	state.currentPage = currentPage;
	// 	state.limit = limit;
	//     state.accountGroup = resp.authorityGroup;
	//     state.total = resp.count;
	// },


}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

