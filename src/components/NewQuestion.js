import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  render() {
    const { isAuthed } = this.props

    if (isAuthed === false) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        NewQuestion
      </div>
    )
  }
}

function mapStateToProps({ authedUserId }) {
  return {
    isAuthed: authedUserId !== null && authedUserId !== ''
  }
}

export default connect(mapStateToProps)(NewQuestion)