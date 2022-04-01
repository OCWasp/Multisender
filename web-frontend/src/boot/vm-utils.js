// import something here

// more info on params: https://quasar.dev/quasar-cli/boot-files
import Vue from 'vue'
import { Notify } from 'quasar'
import LoginDialog from 'components/LoginDialog'

export default ({ app, router, store }) => {
  Vue.prototype.$openLogin = function () {
    return new Promise((resolve, reject) => {
      this.$q.dialog({
        component: LoginDialog,
        parent: this
      }).onOk(data => {
        resolve(data)
      }).onCancel(() => {
        resolve(null)
      })
    })
  }
  Vue.prototype.$notifyMessage = {
    success (message) {
      Notify.create({
        type: 'positive',
        message: message,
        color: 'primary'
      })
    },
    error (message) {
      Notify.create({
        type: 'negative',
        message: message
      })
    },
    tip (message) {
      Notify.create({
        icon: 'announcement',
        message: message
      })
    }
  }
  Vue.filter('decimalFmt', function (val, digit = 8) {
    if (val === 0) return '0'
    if (!val) return ''
    const reg = new RegExp('^\\d+(?:\\.\\d{0,' + digit + '})?')
    return Number(val.toString().match(reg))
  })
  Vue.filter('addressFmt', function (val, start = 6, end = 4) {
    if (!val) return ''
    return val.toString().substr(0, start) + '...' + val.toString().substr(val.toString().length - end, val.toString().length - 1)
  })
}
