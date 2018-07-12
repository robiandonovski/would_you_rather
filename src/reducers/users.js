import { RECEIVE_USERS, ANSWER_QUESTION } from '../actions/types'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }

    case ANSWER_QUESTION:
      const { authedUserId, questionId, answer } = action

      return {
        ...state,
        [authedUserId]: {
          ...state[authedUserId],
          answers: {
            ...state[authedUserId].answers,
            [questionId]: answer
          }
        }
      }
    default:
      return state
  }
}