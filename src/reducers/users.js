import { RECEIVE_USERS } from '../actions/users'
import { ANSWER_QUESTION } from '../actions/questions'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }

    case ANSWER_QUESTION:
      const { authedUserId, questionId, answer } = action

      // console.log("state:", state)

      const toReturn = {
        ...state,
        [authedUserId]: {
          ...state[authedUserId],
          answers: {
            ...state[authedUserId].answers,
            [questionId]: answer
          }
        }
      }

      // console.log(toReturn)

      return toReturn
    default:
      return state
  }
}