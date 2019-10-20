import Vue from 'vue'
import Router from 'vue-router'

import Nxist from '../views/pageView/Nxist'
import Detail from 'views/detail/Detail'

import Home from 'views/home/Home'

import News from '../views/news/News'
import NewsCenter from '../views/news/childComps/NewsCenter'
import NewsDeclear from '../views/news/childComps/NewsDeclear'
import NewsDetail from 'views/news/childComps/NewsDetail'

import Exchange from 'views/exchange/Exchange'

import Demeanor from 'views/demeanor/Demeanor'
import Academician from 'views/demeanor/Academician'
import Alumni from 'views/demeanor/Alumni'

import Scenery from '../views/scenery/Scenery'

import Donate from '../views/donate/Donate'

import Register from '../views/userCenter/Register'
import Login from '../views/userCenter/Login'

import FeedBack from 'views/feedback/FeedBack'

Vue.use(Router)

const routes = new Router({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
    { path: '', redirect: '/home'},
    { 
      path: '/',
      component: Nxist,
      children: [
        { path: 'home', component: Home},

        { path: 'news',
          component: News,
          children: [
            { path: 'center', component: NewsCenter},
            { path: 'declear', component: NewsDeclear},
          ]
        },
        { path: 'news/:id',component: NewsDetail,props: true },

        { path: 'exchange', component: Exchange},
        { path: 'demeanor', 
          component: Demeanor,
          children: [
            { path: 'academician', component: Academician},
            { path: 'alumni', component: Alumni},
          ]
        },
        { path: 'scenery', component: Scenery },
        { path: 'donate', component: Donate },
      ]
    },
    { path: '/register',component: Register },
    { path: '/login',component: Login },
    { path: '/feedback', component: FeedBack},

  ]
})

export default routes
