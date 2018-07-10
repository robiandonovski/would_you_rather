import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import QuestionStats from './QuestionStats'
import QuestionAnswer from './QuestionAnswer'

class QuestionDetails extends Component {

  render() {
    const { questionId, questionIsAnswered } = this.props

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
  let authedUser = users[authedUserId]

  return {
    questionId: id,
    questionIsAnswered: authedUser.answers.hasOwnProperty(id) === true
  }
}

export default connect(mapStateToProps)(QuestionDetails)