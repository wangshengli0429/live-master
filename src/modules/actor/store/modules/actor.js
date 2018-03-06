import * as types from '../mutation-types'

// initial state
const state = {
	platFromList:[],//平台列表
	groupList:[],//工会列表
	agentList:[],//经纪人列表
	actorList:[],//艺人列表
}

// getters
const getters = {
	platFromList: state => state.platFromList,
	groupList: state => state.groupList,
	agentList: state => state.agentList,
	actorList: state => state.actorList,

}

// actions
const actions = {
	getPlatFormList ({commit, state,dispatch}){
		return new Promise((resolve,reject)=>{
			$API.platform.getPlatFormList(resp => {
    			commit(types.INIT_PLATFROM_LIST,resp.list)
				resolve(resp);
			})
	    })
	},
	getGroupList ({commit, state,dispatch}){
		return new Promise((resolve,reject)=>{
			$API.group.getGroupList(resp => {
    			commit(types.INIT_GROUP_LIST,resp.list)
				resolve(resp);
			})
	    })
	},
	getAgentList ({commit, state,dispatch}){
		return new Promise((resolve,reject)=>{
			$API.agent.getAgentList(resp => {
    			commit(types.INIT_AGENT_LIST,resp.list)
				resolve(resp);
			})
	    })
	},
	getActorList ({commit, state,dispatch}){
		return new Promise((resolve,reject)=>{
			$API.actor.getActorList(resp => {
    			commit(types.INIT_ACTOR_LIST,resp.list)
				resolve(resp);
			})
	    })
	},







}



// mutations
const mutations = {
	[types.INIT_PLATFROM_LIST] (state,list) {
	    state.platFromList = list;
	},
	[types.INIT_GROUP_LIST] (state,list) {
	    state.groupList = list;
	},
	[types.INIT_AGENT_LIST] (state,list) {
	    state.agentList = list;
	},
	[types.INIT_ACTOR_LIST] (state,list) {
	    state.actorList = list;
	},
	


}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

