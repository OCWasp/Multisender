import { LocalStorage } from 'quasar'
/**
 * 持久化用户账号
 * @param state
 * @param address
 */
export function saveToken (state, address) {
  state.address = address
  const profile = {
    address: address,
    balance: 0
  }
  state.profile = profile
  LocalStorage.set('user', profile)
  LocalStorage.set('address', address)
}
/**
 * 更新账户余额
 * @param balance
 */
export function renewBalance (state, balance) {
  state.profile.balance = balance
  LocalStorage.set('user', state.profile)
}
/**
 * 加载本地用户信息
 * @param state
 */
export function loadLocal (state) {
  state.address = LocalStorage.getItem('address')
  state.profile = LocalStorage.getItem('user') || {}
}

/**
 * 退出登录
 * @param state
 */
export function logout (state) {
  state.address = null
  state.profile = { }
  LocalStorage.clear()
}
