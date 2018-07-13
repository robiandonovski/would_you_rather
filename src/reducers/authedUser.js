import { SET_AUTHED_USER } from '../actions/types'

export default function authedUserId(state = null, action) {
  if (action.type === SET_AUTHED_USER) {
    return action.id
  }
  return state
}