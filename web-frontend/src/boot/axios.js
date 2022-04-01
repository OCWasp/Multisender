import Vue from 'vue'
import axios from 'axios'

import { Dialog, Platform } from 'quasar'
import AlertMessage from 'components/AlertMessage'
import { LOGOUT } from 'src/store/mutations-types'

function createApi (store) {
  const httpClient = axios.create({
    baseURL: `${store.state.protocol}//${process.env.SERVER_HOST}/api`,
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      platform: Platform.is.platform,
      browser: Platform.is.name,
      'client-type': 'web'
    },
    responseType: 'json'
  })
  httpClient.interceptors.request.use(config => {
    if (store.state.user.token) {
      config.headers.token = store.state.user.token
    }
    return config
  })
  httpClient.interceptors.response.use(response => {
    const res = response.data
    if (res && res.code === 401 && store.state.user.token) {
      store.commit(LOGOUT)
      Dialog.create({
        component: AlertMessage,
        parent: this,
        type: 'negative',
        message: res.message,
        persistent: true
      }).onOk(data => {
      })
    }
    return res
  })
  return {
    getNonce (address, type = 'metamask') {
      return httpClient.get(`/getnonce/${type}?address=${address}`)
    },
    walletSignature (address, signature, type = 'metamask') {
      return httpClient.post(`/login/signature/${type}`, { address, signature })
    },
    getb (limit, offset, ordering, ownerAddress) {
      return httpClient.post('https://token-indexer.broxus.com/v1/transactions', { limit, offset, ordering, ownerAddress })
    }
  }
}
let API
export default ({ app, store }) => {
  API = createApi(store)
  Vue.prototype.$api = API
  Vue.prototype.$axios = axios
}

export { axios, API }
