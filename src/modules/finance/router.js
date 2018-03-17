import Account from './components/Account'
import Flow from './components/Flow'
import Reflect from './components/Reflect'
import Actor from './components/Actor'
import Agent from './components/Agent'


const routes = [
	{ 
		path: '/finance/account', component: Account
	},
	{ 
		path: '/finance/flow', component: Flow
	},
	{ 
		path: '/finance/reflect', component: Reflect
	},
	{ 
		path: '/finance/actor', component: Actor
	},
	{ 
		path: '/finance/agent', component: Agent
	}
]

export default routes;