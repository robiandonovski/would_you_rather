import { SET_AUTHED_USER } from './types'

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}

export function handleSetAuthedUser(id) {
  return (dispatch) => {
    dispatch(setAuthedUser(id))
  }
}

export function handleLogout() {
  return (dispatch) => {
    dispatch(setAuthedUser(''))
  }
}