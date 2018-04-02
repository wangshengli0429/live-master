import Account from './modules/account.js'
import Flow from './modules/flow.js'
import Reflect from './modules/reflect.js'
import Agent from './modules/agent.js'
import Actor from './modules/actor.js'




export default{
  ...Account,
  ...Flow,
  ...Reflect,
  ...Agent,
  ...Actor
}

