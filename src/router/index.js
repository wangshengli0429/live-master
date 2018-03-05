import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/modules/home/components/Home'


import Home from '@/modules/home/router'
import User from '@/modules/user/router'
import Limit from '@/modules/limit/router'
import PlatForm from '@/modules/platform/router'
import Group from '@/modules/group/router'
import Actor from '@/modules/actor/router'
import Agent from '@/modules/agent/router'
import Finance from '@/modules/finance/router'
import Analyze from '@/modules/analyze/router'
import Logs from '@/modules/logs/router'


Vue.use(Router)


const children =[
    ...Home,
    ...User.routes,
    ...Limit,
    ...PlatForm,
    ...Group,
    ...Actor,
    ...Agent,
    ...Finance,
    ...Analyze,
    ...Logs
]


const routes = [
    {
    	path: '/', component: Container,
    	children:children
    },
    ...User.routes_root,
]









const router = new Router({
  routes: routes
})

export default router;