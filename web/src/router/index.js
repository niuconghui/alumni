import Vue from 'vue'
import Router from 'vue-router'

import Scenery from '../views/scenery/Scenery'
import News from '../views/news/News'

Vue.use(Router)

const routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    
    { path: '/news',component: News },
    { path: '/scenery',component: Scenery },
    
  ]
})

export default routes
