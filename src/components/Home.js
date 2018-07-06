import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'

class Home extends Component {
  render() {
    const { isAuthed, unansweredQuestions, answeredQuestions } = this.props

    if (isAuthed === false) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        {unansweredQuestions.map((questionId) => (
          <Question key={questionId} id={questionId} />
        ))}

        Answered:

        {answeredQuestions.map((questionId) => (
          <Question key={questionId} id={questionId} />
        ))}
      </div>
    )
  }
}

function mapStateToProps({ authedUserId, users, questions }) {

  const isAuthed = authedUserId !== null && authedUserId !== ''
  let unansweredQuestions = []
  let answeredQuestions = []

  if(isAuthed === true){
    let authedUser = users[authedUserId]

    console.log(authedUser)

    console.log(Object.keys(questions))

    unansweredQuestions = Object.keys(questions)
      .filter((questionId) => (
        authedUser.answers.hasOwnProperty(questionId) === false
      ))
      .map((questionId) => (
        questions[questionId]
      ))
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((question) => (
        question.id
      ))

    answeredQuestions = Object.keys(authedUser.answers)
      .map((questionId) => (
        questions[questionId]
      ))
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((question) => (
        question.id
      ))

    // answeredQuestions = authedUser.answers
    //   .filter((questionId) => (
    //     authedUser.answers[questionId] !== null
    //   ))
    //   .map((questionId) => (
    //     questions[questionId]
    //   ))
    //   .sort((a, b) => b.timestamp -a.timestamp)


    // unansweredQuestions = authedUser.questions
    // .filter((questionId) => (
    //   authedUser.answers[questionId] === null
    // ))
    // .map((questionId) => (
    //   questions[questionId]
    // ))
    // .sort((a, b) => b.timestamp -a.timestamp)

    // answeredQuestions = authedUser.questions
    //   .filter((questionId) => (
    //     authedUser.answers[questionId] !== null
    //   ))
    //   .map((questionId) => (
    //     questions[questionId]
    //   ))
    //   .sort((a, b) => b.timestamp -a.timestamp)
  }
  console.log(unansweredQuestions)
  console.log(answeredQuestions)

  return {
    isAuthed,
    unansweredQuestions,
    answeredQuestions
  }
}

export default connect(mapStateToProps)(Home)