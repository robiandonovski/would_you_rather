import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Question extends Component {
  render() {
    const { id, authorName, authorAvatarURL, shortInfo } = this.props

    return (
      <div className="content-box">
        <div className='content-box-header'>
          <h4>{authorName} asks:</h4>
        </div>
        <div className='content-box-body'>
          <div className='content-box-question-left center'>
            <img
              src={authorAvatarURL}
              alt={`Avatar of ${authorName}`}
              className='question-author-avatar'
            />
          </div>
          <div className='content-box-question-right'>
            <h3>Would you rather</h3>
            <br/>
            <p>{shortInfo}</p>
            <br/>
            <br/>
            <div className='center'>
              <Link to={`/questions/${id}`} className='question-details'>View Poli</Link>
            </div>
          </div>
          <div className='clearfix'></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUserId, users, questions }, props) {
  const { id } = props

  const question = questions[id]

  const options = `${question.optionOne.text} or ${question.optionTwo.text}`
  const shortInfo = `...${options.substring(0, Math.min(options.length, 40) )}...`

  return {
    id: id,
    authorName: users[question.author].name,
    authorAvatarURL: users[question.author].avatarURL,
    shortInfo: shortInfo
  }
}

export default connect(mapStateToProps)(Question)