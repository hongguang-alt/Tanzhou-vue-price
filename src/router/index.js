import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path:'/index',
    redirect:'/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/index',
    name: 'index',
    children: [{
        path: '/money',
        name: 'money',
        component: () => import('../components/Money.vue')
      },
      {
        path: '/personInfo',
        name: 'personInfo',
        component: () => import('../components/PersonInfo.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../components/Home.vue')
      }
    ],
    component: () => import('../views/Index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    if (localStorage.token) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router