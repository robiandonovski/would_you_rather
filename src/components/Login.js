import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'

class Login extends Component {
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

    if(selectedUserId !== '')
    {
      dispatch(handleSetAuthedUser(selectedUserId))

      this.setState(() => ({
        selectedUserId: '',
        showMessage: false,
        toHome: true
      }))
    }
    else{
      this.setState(() => ({
        showMessage: true
      }))
    }
  }

  render() {
    const { availableUsers } = this.props
    const { selectedUserId, showMessage, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className="content-box center">
        <div className='content-box-header'>
          <h3>Welcome to the Wrould you Rather App!</h3>
          <p>Please sign in to continue</p>
        </div>
        <div className='content-box-body'>
          <select onChange={this.handleChange} value={selectedUserId}>
            <option value="" selected disabled>Choose user</option>
            {
              availableUsers.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
          </select>
          <br />
          <br />
          {showMessage && (
            <p>Choose user from the dropdown and then sign in</p>
          )}
          <button className='center' onClick={this.handleClick}>Sign in</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
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