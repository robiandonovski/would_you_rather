import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'
import PropTypes from 'prop-types';

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    availableUsers: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  state = {
    selectedUserId: '',
    showMessage: false,
    toHome: false
  }

  handleChange = (e) => {
    const selectedUserId = e.target.value

    this.setState(() => ({
      selectedUserId,
    }))
  }

  handleClick = (e) => {
    e.preventDefault()

    const { selectedUserId } = this.state
    const { dispatch } = this.props

    if (selectedUserId !== '') {
      dispatch(handleSetAuthedUser(selectedUserId))

      this.setState(() => ({
        selectedUserId: '',
        showMessage: false,
        toHome: true
      }))
    }
    else {
      this.setState(() => ({
        showMessage: true
      }))
    }
  }

  render() {
    const { isAuthed, availableUsers } = this.props
    const { selectedUserId, showMessage, toHome } = this.state

    if (isAuthed === true || toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className="content-box center">
        <div className='content-box-header'>
          <h3>Welcome to the Wrould you Rather App!</h3>
          <p>Please sign in to continue</p>
        </div>
        <div className='content-box-body'>
          <br />
          <select onChange={this.handleChange} value={selectedUserId}>
            <option value="" disabled>Choose user</option>
            {
              availableUsers.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
          </select>
          <br />
          <br />
          {showMessage && (
            <div className='validation-error'>Choose user from the dropdown and then sign in!</div>
          )}
          <button className='login-button' onClick={this.handleClick}>Sign in</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUserId, users }) {
  return {
    isAuthed: authedUserId !== null && authedUserId !== '',
    availableUsers: users !== null
      ? Object.keys(users).map((id) => (
        {
          id: id,
          name: users[id].name
        }))
      : []
  }
}

export default connect(mapStateToProps)(Login)