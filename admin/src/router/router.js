import Vue from 'vue'
import Router from 'vue-router'

const Manage = () => import('views/Manage')
const ManageView = () => import('views/ManageView')
const Login = () => import('views/Login')

const NewsEdit = () => import('views/news/NewsEdit')
const NewsList = () => import('views/news/NewsList')

const CategoryEdit = () => import('views/category/CategoryEdit')
const CategoryList = () => import('views/category/CategoryList')

const ExchangeEdit = () => import('views/exchange/ExchangeEdit')
const ExchangeList = () => import('views/exchange/ExchangeList')


const CommentEdit = () => import('views/comment/CommentEdit')
const CommentList = () => import('views/comment/CommentList')

const DemeanorEdit = () => import('views/demeanor/DemeanorEdit')
const DemeanorList = () => import('views/demeanor/DemeanorList')

const SceneryEdit = () => import('views/scenery/SceneryEdit')
const SceneryList = () => import('views/scenery/SceneryList')

const SourceUserEdit = () => import('views/sourceUser/SourceUserEdit')
const SourceUserList = () => import('views/sourceUser/SourceUserList')

const StudentUserEdit = () => import('views/studentUser/StudentUserEdit')
const StudentUserList = () => import('views/studentUser/StudentUserList')

const AdminUserEdit = () => import('views/adminUser/AdminUserEdit')
const AdminUserList = () => import('views/adminUser/AdminUserList')

const SecClassEdit = () => import('views/secClass/SecClassEdit')
const SecClassList = () => import('views/secClass/SecClassList')

const CityEdit = () => import('views/city/CityEdit')
const CityList = () => import('views/city/CityList')

const FeedbackEdit = () => import('views/feedback/FeedbackEdit')
const FeedbackList = () => import('views/feedback/FeedbackList')

const AdEdit = () => import('views/ad/AdEdit')
const AdList = () => import('views/ad/AdList')

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

        { path: '/ad/create', component: AdEdit },
        { path: '/ad/edit/:id', component: AdEdit, props: true },
        { path: '/ad/list', component: AdList },

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
