import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import QuestionStats from './QuestionStats'
import QuestionAnswer from './QuestionAnswer'
import QuestionNotFound from './QuestionNotFound'

class QuestionDetails extends Component {

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    questionNotExists: PropTypes.bool.isRequired,
    questionId: PropTypes.string.isRequired,
    questionIsAnswered: PropTypes.bool.isRequired
  };

  render() {
    const { isAuthed, questionNotExists, questionId, questionIsAnswered } = this.props

    if (isAuthed === false) {
      return <Redirect to='/login' />
    }

    if (questionNotExists === true) {
      return (
        <QuestionNotFound></QuestionNotFound>
      )
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

function mapStateToProps({ authedUserId, users, questions }, props) {
  const { id } = props.match.params

  const isAuthed = authedUserId !== null && authedUserId !== ''

  let authedUser = users[authedUserId]

  return {
    isAuthed: isAuthed,
    questionNotExists: typeof (questions[id]) === 'undefined' || questions[id] === null,
    questionId: id,
    questionIsAnswered: isAuthed && authedUser.answers.hasOwnProperty(id) === true
  }
}

export default connect(mapStateToProps)(QuestionDetails)