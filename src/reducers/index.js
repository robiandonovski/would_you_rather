import { combineReducers } from 'redux'
import authedUserId from './authedUser'
import users from './users'
import questions from './questions'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  authedUserId,
  users,
  questions,
  loadingBar: loadingBarReducer
})