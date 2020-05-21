import Account from './modules/account.js'
import Flow from './modules/flow.js'
import Reflect from './modules/reflect.js'
import Agent from './modules/agent.js'
import Actor from './modules/actor.js'
import Union from './modules/union.js'
import Proxy from './modules/proxy.js'




export default{
  ...Account,
  ...Flow,
  ...Reflect,
  ...Agent,
  ...Actor,
  ...Union,
  ...Proxy
}

