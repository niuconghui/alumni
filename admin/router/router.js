import Vue from 'vue'
import Router from 'vue-router'

import Manage from '../src/views/Manage'
import Login from '../src/views/Login'

import SourceUserEdit from '../src/views/sourceUser/SourceUserEdit'
import SourceUserList from '../src/views/sourceUser/SourceUserList'

import SceneryEdit from '../src/views/scenery/SceneryEdit'
import SceneryList from '../src/views/scenery/SceneryList'

import NewsEdit from '../src/views/news/NewsEdit'
import NewsList from '../src/views/news/NewsList'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'manage',
      component: Manage,
      children: [

        { path: '/news/create',component: NewsEdit },
        { path: '/news/edit/:id',component: NewsEdit,props: true },
        {path: '/news/list',component: NewsList },

        { path: '/sceneries/create',component: SceneryEdit },
        { path: '/sceneries/edit/:id',component: SceneryEdit,props: true },
        {path: '/sceneries/list',component: SceneryList },

        { path: '/sourceUser/create',component: SourceUserEdit },
        { path: '/sourceUser/edit/:id',component: SourceUserEdit,props: true },
        {path: '/sourceUser/list',component: SourceUserList },

        
      ]
    },
    {
      path: '/login',
      component: Login
    },
  ]
})

export default router
