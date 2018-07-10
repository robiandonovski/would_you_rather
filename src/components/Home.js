import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'

class Home extends Component {
  state={
    activeTab: 'unansweredQuestions'
  }

  handleTabChange = (tabName) => {
    this.setState(() => ({
      activeTab: tabName
    }))
  }

  render() {
    const { isAuthed, unansweredQuestions, answeredQuestions } = this.props

    if (isAuthed === false) {
      return <Redirect to='/login' />
    }

    const { activeTab } = this.state

    return (
      <div className='page-content'>
        <div className='tabs'>
          <div className={`tab ${ activeTab === 'unansweredQuestions' ? 'active' : '' }`}
              onClick={() => this.handleTabChange('unansweredQuestions')}>
            <h4>Unanswered Questions</h4>
          </div>
          <div className={`tab ${ activeTab === 'answeredQuestions' ? 'active' : '' }`}
               onClick={() => this.handleTabChange('answeredQuestions')}>
            <h4>Answered Questions</h4>
          </div>
        </div>
        <div className='questions'>
        {activeTab === 'unansweredQuestions'
          ?
            unansweredQuestions.map((questionId) => (
              <Question key={questionId} id={questionId} />
            ))
          :
            answeredQuestions.map((questionId) => (
              <Question key={questionId} id={questionId} />
            ))
          }
        </div>
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
  }

  return {
    isAuthed,
    unansweredQuestions,
    answeredQuestions
  }
}

export default connect(mapStateToProps)(Home)