import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/modules/home/components/Home'


import Home from '@/modules/home/router'
import User from '@/modules/user/router'


Vue.use(Router)


const children =[
    ...Home,
]


const routes = [
    {
    	path: '/', component: Container,
    	children:children
    },
    ...User,
]









const router = new Router({
  routes: routes
})

export default router;