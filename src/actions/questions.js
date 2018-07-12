import { saveQuestion, saveAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from './types'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function answerQuestion(authedUserId, questionId, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUserId,
    questionId,
    answer
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleAnswerQuestion(authedUserId, questionId, answer) {
  return (dispatch) => {
    dispatch(showLoading())

    return saveAnswer({
      authedUser: authedUserId,
      qid: questionId,
      answer: answer
    })
      .then((question) => dispatch(answerQuestion(authedUserId, questionId, answer)))
      .then(() => dispatch(hideLoading()))
  }
}