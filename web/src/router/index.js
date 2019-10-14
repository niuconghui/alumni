import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'
import Nxist from '../views/pageView/Nxist'

import Home from 'views/exchange/Exchange'

import Scenery from '../views/scenery/Scenery'

import News from '../views/news/News'
import NewsCenter from '../views/news/NewsCenter'
import NewsDeclear from '../views/news/NewsDeclear'

import Exchange from 'views/exchange/Exchange'

import Demeanor from 'views/demeanor/Demeanor'

import Donate from '../views/donate/Donate'

import Register from '../views/userCenter/Register'
import Login from '../views/userCenter/Login'

import FeedBack from 'views/feedback/FeedBack'

Vue.use(Router)

const routes = new Router({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
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
        { path: 'exchange', component: Exchange},
        { path: 'demeanor', component: Demeanor},
        { path: 'scenery', component: Scenery },
        { path: 'donate', component: Donate },
      ]
    },
    { path: '/register',component: Register },
    { path: '/login',component: Login },
    { path: '/feedback', component: FeedBack}
  ]
})

export default routes
