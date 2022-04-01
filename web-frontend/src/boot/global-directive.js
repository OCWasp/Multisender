import Vue from 'vue'

export default ({ app, router, store }) => {
  Vue.directive('check-auth-on', {
    bind: function (el, binding, vnode) {
      if (!binding.arg || typeof (binding.value) !== 'function') {
        return
      }
      el.addEventListener(binding.arg, event => {
        const isKeyboard = event instanceof KeyboardEvent
        if (isKeyboard && event.type === binding.arg && !binding.modifiers[event.key.toLowerCase()]) {
          return
        }
        if (vnode.context.$store.getters['user/hasLogin']) {
          binding.value()
          return
        }
        vnode.context.$openLogin().then(user => {
          if (user) {
            binding.value()
          }
        })
      })
    }
  })
}
