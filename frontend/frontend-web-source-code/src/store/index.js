import Vue from 'vue'
import Vuex from 'vuex'

import user from './module-user'
import { LOCAL_USER } from './mutations-types'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const protocol = window.location.protocol
  return new Vuex.Store({
    modules: {
      user
    },
    state: {
      protocol: protocol,
      imgServer: `${protocol}//${process.env.SERVER_HOST}`
    },
    mutations: {
      loadLocalData (state) {
        this.commit(LOCAL_USER)
      }
    },
    actions: {
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })
}
