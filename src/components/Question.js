import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    const { authorName, authorAvatarURL } = this.props

    return (
      <div className="content-box center">
        <div className='content-box-header'>
          <h3>{authorName} asks:</h3>
        </div>
        <div className='content-box-body'>
          <div className='content-box-question-left'>
            <img
              src={authorAvatarURL}
              alt={`Avatar of ${authorName}`}
              className='question-author-avatar'
            />
          </div>
          <div className='content-box-question-right'>
            <h3>Would you rather</h3>
            <p>asd asd asd</p>
            <button>View Poli</button>
          </div>
          {/* <select onChange={this.handleChange} value={selectedUserId}>
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
          <button className='center' onClick={this.handleClick}>Sign in</button> */}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUserId, users, questions }, props) {
  const { id } = props

  const question = questions[id]

  return {
    authorName: users[question.author].name,
    authorAvatarURL: users[question.author].avatarURL
  }
}

export default connect(mapStateToProps)(Question)