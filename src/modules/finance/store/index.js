import account from './modules/account'
import flow from './modules/flow'
import reflect from './modules/reflect'
import actor from './modules/flow'

export default {
	namespaced: true,
	modules:{
		account,
		flow,
		reflect,
		actor
	}
}