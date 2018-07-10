import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import QuestionStats from './QuestionStats'
import QuestionAnswer from './QuestionAnswer'
import { Redirect } from 'react-router-dom'

class QuestionDetails extends Component {

  render() {
    const { isAuthed, questionId, questionIsAnswered } = this.props

    if (isAuthed === false) {
      return <Redirect to='/login' />
    }

    return (
      <Fragment>
        {
          questionIsAnswered === true
          ? <QuestionStats id={questionId} />
          : <QuestionAnswer id={questionId} />
        }
      </Fragment>
    )
  }
}

function mapStateToProps({ authedUserId, users }, props) {
  const { id } = props.match.params

  const isAuthed = authedUserId !== null && authedUserId !== ''

  let authedUser = users[authedUserId]

  return {
    isAuthed: isAuthed,
    questionId: id,
    questionIsAnswered: isAuthed && authedUser.answers.hasOwnProperty(id) === true
  }
}

export default connect(mapStateToProps)(QuestionDetails)