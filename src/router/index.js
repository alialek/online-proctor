import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/components/Auth'
import UserBoard from '@/components/UserBoard'
import Admin from '@/components/Admin'
import NotFound from '@/components/NotFound'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      guest: true
    }
  },
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/dashboard',
    name: 'Userboard',
    component: UserBoard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: '/auth',
        params: { nextUrl: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        if (store.getters.isAdmin) {
          next()
        } else {
          next({ name: 'Userboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next()
    } else {
      next({ name: 'Userboard' })
    }
  } else {
    next()
  }
})

export default router
