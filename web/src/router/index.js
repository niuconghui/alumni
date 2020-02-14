import Vue from 'vue'
import Router from 'vue-router'

const MainView = () => import("views/mainView/MainView")

const News = () => import('views/news/News')
const NewsCenter = () => import('views/news/childComps/NewsCenter')
const NewsDeclear = () => import('views/news/childComps/NewsDeclear')
const NewsDetail = () => import('views/news/childComps/NewsDetail')

const Exchange = () => import('views/exchange/Exchange')
const ExchangeDetail = () => import('views/exchange/ExchangeDetail')
const Draft = () => import('views/exchange/Draft')

const Demeanor = () => import('views/demeanor/Demeanor')
const Academician = () => import('views/demeanor/childComps/Academician')
const Alumni = () => import('views/demeanor/childComps/Alumni')
const DemeanorDetail = () => import('views/demeanor/DemeanorDetail')

const Scenery = () => import('views/scenery/Scenery')

const Register = () => import('views/userCenter/Register')
const Login = () => import('views/userCenter/Login')
const Center = () => import('views/userCenter/Center')
const Profile = () => import('views/userCenter/Profile')
const Active = () => import("views/userCenter/childComps/Active")

const FeedBack = () => import('views/feedback/FeedBack')

const NotFound = () => import('views/notFound/NotFound')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/news/newsCenter' },
    { path: '/news', redirect: '/news/newsCenter' },
    { path: '/demeanor', redirect: '/demeanor/academician'},
    { path: '/user/center/:id', redirect: '/user/center/:id/activities'},
    
    { path: '/', 
      component: MainView,
      children: [
        { 
          path: '/news', 
          component: News,
          children: [
            { path: 'newsCenter', component: NewsCenter },
            { path: 'newsDeclear', component: NewsDeclear },
            { path: 'detail/:id', component: NewsDetail, props: true }
          ]
        },

        { path: '/exchange',
          component: Exchange,
        },

        { path: '/demeanor',
          component: Demeanor,
          children: [
            { path: 'academician', component: Academician },
            { path: 'alumni', component: Alumni },
            { path: 'detail/:id', component: DemeanorDetail, props: true }
          ]
        },
        { path: '/scenery',
          component: Scenery
        },

        {path: '/user/center/:id', 
          component: Center, 
          props: true, 
          meta: { requiresAuth: true },
          children: [
            { path: '/user/center/:id/activities', component: Active, props: true },
          ]
        },
        {path: '/user/settings/profile', component: Profile, meta: { requiresAuth: true } },
      ]
    },
    { path: '/exchange/detail/:id',component: ExchangeDetail, props: true },
    { 
      path: '/exchange/new', 
      component: Draft, 
      props: true,
      meta: { requiresAuth: true }
    },
    { 
      path: '/exchange/update/:id', 
      component: Draft, 
      props: true,
      meta: { requiresAuth: true }
    },

    { path: '/register',component: Register },
    { path: '/login',component: Login },
    { path: '/feedback', component: FeedBack},

    { path: '/404', component: NotFound },
    // { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!localStorage.token) {
      Vue.prototype.$message({
        type: 'error',
        message: '您还未登陆，请先登录！'
      })
      console.log(to.fullPath)
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
  
})

export default router
