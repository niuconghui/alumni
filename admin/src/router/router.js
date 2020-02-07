import Vue from 'vue'
import Router from 'vue-router'

import Manage from '../views/Manage'
import ManageView from '../views/ManageView'
import Login from '../views/Login'


import NewsEdit from '../views/news/NewsEdit'
import NewsList from '../views/news/NewsList'

import CategoryEdit from '../views/category/CategoryEdit'
import CategoryList from '../views/category/CategoryList'

import ExchangeEdit from '../views/exchange/ExchangeEdit'
import ExchangeList from '../views/exchange/ExchangeList'

import CommentEdit from '../views/comment/CommentEdit'
import CommentList from '../views/comment/CommentList'

import DemeanorEdit from '../views/demeanor/DemeanorEdit'
import DemeanorList from '../views/demeanor/DemeanorList'

import SceneryEdit from '../views/scenery/SceneryEdit'
import SceneryList from '../views/scenery/SceneryList'

import SourceUserEdit from '../views/sourceUser/SourceUserEdit'
import SourceUserList from '../views/sourceUser/SourceUserList'

import StudentUserEdit from '../views/studentUser/StudentUserEdit'
import StudentUserList from '../views/studentUser/StudentUserList'

import AdminUserEdit from '../views/adminUser/AdminUserEdit'
import AdminUserList from '../views/adminUser/AdminUserList'

import SecClassEdit from '../views/secClass/SecClassEdit'
import SecClassList from '../views/secClass/SecClassList'

import CityEdit from '../views/city/CityEdit'
import CityList from '../views/city/CityList'

import FeedbackEdit from '../views/feedback/FeedbackEdit'
import FeedbackList from '../views/feedback/FeedbackList'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Manage,
      children: [
        { path: '/', component: ManageView },

        { path: '/news/create', component: NewsEdit },
        { path: '/news/edit/:id', component: NewsEdit, props: true },
        { path: '/news/list', component: NewsList },

        { path: '/category/create', component: CategoryEdit },
        { path: '/category/edit/:id', component: CategoryEdit, props: true },
        { path: '/category/list', component: CategoryList },

        { path: '/exchange/create', component: ExchangeEdit },
        { path: '/exchange/edit/:id', component: ExchangeEdit, props: true },
        { path: '/exchange/list', component: ExchangeList },

        { path: '/comment/create', component: CommentEdit },
        { path: '/comment/edit/:id', component: CommentEdit, props: true },
        { path: '/comment/list', component: CommentList },


        { path: '/demeanor/create', component: DemeanorEdit },
        { path: '/demeanor/edit/:id', component: DemeanorEdit, props: true },
        { path: '/demeanor/list', component: DemeanorList },

        { path: '/sceneries/create', component: SceneryEdit },
        { path: '/sceneries/edit/:id', component: SceneryEdit, props: true },
        { path: '/sceneries/list', component: SceneryList },

        { path: '/sourceUser/create', component: SourceUserEdit },
        { path: '/sourceUser/edit/:id', component: SourceUserEdit, props: true },
        { path: '/sourceUser/list', component: SourceUserList },

        { path: '/studentUser/create', component: StudentUserEdit },
        { path: '/studentUser/edit/:id', component: StudentUserEdit, props: true },
        { path: '/studentUser/list', component: StudentUserList },

        { path: '/adminUser/create', component: AdminUserEdit },
        { path: '/adminUser/edit/:id', component: AdminUserEdit, props: true },
        { path: '/adminUser/list', component: AdminUserList },

        { path: '/secClass/create', component: SecClassEdit },
        { path: '/secClass/edit/:id', component: SecClassEdit, props: true },
        { path: '/secClass/list', component: SecClassList },

        { path: '/cities/create', component: CityEdit },
        { path: '/cities/edit/:id', component: CityEdit, props: true },
        { path: '/cities/list', component: CityList },

        { path: '/feedback/create', component: FeedbackEdit },
        { path: '/feedback/edit/:id', component: FeedbackEdit, props: true },
        { path: '/feedback/list', component: FeedbackList },

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
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next('/login')
  }
  next()
})

export default router
