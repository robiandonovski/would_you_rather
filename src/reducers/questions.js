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

      console.log("add_question state:", state)
      console.log("add_question question:", question)

      return {
        ...state,
        [question.id]: question,
      }
    case ANSWER_QUESTION:
      const { authedUserId, questionId, answer } = action

      console.log("state question:", state)

      console.log("answer:", answer)


      const toReturn = {
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

      console.log("toReturn question:", toReturn)

      return toReturn

    default:
      return state
  }
}