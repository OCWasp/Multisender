export function hasLogin (state) {
  return !!state.address
}

export function getUser (state) {
  return state.profile || {}
}
