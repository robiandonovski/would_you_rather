import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      const { question } = action

      return {
        ...state,
        [question.id]: question,
      }
    case ANSWER_QUESTION:
      const { authedUserId, questionId, answer } = action

      return {
        ...state,
        [questionId]:{
          ...state[questionId],
          optionOne: {
            ...state[questionId].optionOne,
            votes: answer === 'optionOne'
              ? state[questionId].optionOne.votes.concat([authedUserId])
              : state[questionId].optionOne.votes
          },
          optionTwo: {
            ...state[questionId].optionTwo,
            votes: answer === 'optionTwo'
              ? state[questionId].optionTwo.votes.concat([authedUserId])
              : state[questionId].optionTwo.votes
          }
        }
      }
    default:
      return state
  }
}