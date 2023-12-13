import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0eb4b941 = () => interopDefault(import('..\\pages\\recognize.vue' /* webpackChunkName: "pages/recognize" */))
const _63abc98a = () => interopDefault(import('..\\pages\\train.vue' /* webpackChunkName: "pages/train" */))
const _64fdd632 = () => interopDefault(import('..\\pages\\users\\index.vue' /* webpackChunkName: "pages/users/index" */))
const _6820dd05 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _70bd137f = () => interopDefault(import('..\\pages\\users\\_name.vue' /* webpackChunkName: "pages/users/_name" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/recognize",
    component: _0eb4b941,
    name: "recognize"
  }, {
    path: "/train",
    component: _63abc98a,
    name: "train"
  }, {
    path: "/users",
    component: _64fdd632,
    name: "users"
  }, {
    path: "/",
    component: _6820dd05,
    name: "index"
  }, {
    path: "/users/:name",
    component: _70bd137f,
    name: "users-name"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
