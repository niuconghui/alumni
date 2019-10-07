import Vue from 'vue'
import Router from 'vue-router'

import Manage from '../views/Manage'
import ManageView from '../views/ManageView'
import Login from '../views/Login'

import SceneryEdit from '../views/scenery/SceneryEdit'
import SceneryList from '../views/scenery/SceneryList'

import NewsEdit from '../views/news/NewsEdit'
import NewsList from '../views/news/NewsList'

import SourceUserEdit from '../views/sourceUser/SourceUserEdit'
import SourceUserList from '../views/sourceUser/SourceUserList'
import AdminUserEdit from '../views/adminUser/AdminUserEdit'
import AdminUserList from '../views/adminUser/AdminUserList'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'manage',
      component: Manage,
      children: [
        { path: '/',component: ManageView},
        { path: '/news/create',component: NewsEdit },
        { path: '/news/edit/:id',component: NewsEdit,props: true },
        { path: '/news/list',component: NewsList },

        { path: '/sceneries/create',component: SceneryEdit },
        { path: '/sceneries/edit/:id',component: SceneryEdit,props: true },
        { path: '/sceneries/list',component: SceneryList },

        { path: '/sourceUser/create',component: SourceUserEdit },
        { path: '/sourceUser/edit/:id',component: SourceUserEdit,props: true },
        { path: '/sourceUser/list',component: SourceUserList },

        { path: '/adminUser/create',component: AdminUserEdit },
        { path: '/adminUser/edit/:id',component: AdminUserEdit,props: true },
        { path: '/adminUser/list',component: AdminUserList },

        
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: { isPublic: true }
    },
  ]
})

  router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !localStorage.token) {
      return next('/login')
    }
    next()
  })

export default router
