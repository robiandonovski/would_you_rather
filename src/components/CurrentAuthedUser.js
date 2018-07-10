import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleLogout } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'

class CurrentAuthedUser extends Component {
  handleLogoutClick = () => {
    const { dispatch } = this.props

    dispatch(handleLogout())

    this.props.history.push(`/login`)
  }

  render() {
    const { name, avatarURL } = this.props

    return (
      <Fragment>
        <span>Hello, {name}</span>
        <img
          src={avatarURL}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <span className='cursor-pointer' onClick={this.handleLogoutClick}>
          Logout
        </span>
      </Fragment>
    )
  }
}

function mapStateToProps({ authedUserId, users }) {
  return {
    name: users[authedUserId] !== null ? users[authedUserId].name : null,
    avatarURL: users[authedUserId] !== null ? users[authedUserId].avatarURL : null,
  }
}

export default withRouter(connect(mapStateToProps)(CurrentAuthedUser))