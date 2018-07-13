import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import PropTypes from 'prop-types';

class QuestionAnswer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    authedUserId: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorAvatarURL: PropTypes.string.isRequired,
    optionOne: PropTypes.string.isRequired,
    optionTwo: PropTypes.string.isRequired
  };

  state = {
    selectedOption: 'optionOne'
  }

  handleChange = (e) => {
    const option = e.target.value

    this.setState(() => ({
      selectedOption: option
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { selectedOption } = this.state
    const { dispatch, authedUserId, questionId } = this.props

    dispatch(handleAnswerQuestion(authedUserId, questionId, selectedOption))

    this.setState(() => ({
      selectedOption: ''
    }))
  }

  render() {
    const { authorName, authorAvatarURL, optionOne, optionTwo } = this.props
    const { selectedOption } = this.state

    return (
      <div className="content-box">
        <div className='content-box-header'>
          <h3>{authorName} asks:</h3>
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
            <h2>Would you rather</h2>
            <form onSubmit={this.handleSubmit}>
              <div className='answer-option'>
                <input type='radio' name='option' value='optionOne'
                  defaultChecked={selectedOption === 'optionOne'}
                  onChange={this.handleChange} />
                <span>{optionOne}</span>
              </div>
              <div className='answer-option'>
                <input type='radio' name='option' value='optionTwo'
                  defaultChecked={selectedOption === 'optionTwo'}
                  onChange={this.handleChange} />
                <span>{optionTwo}</span>
              </div>
              <br />
              <div className='center'>
                <button type='submit' className='question-answer-submit'>Submit</button>
              </div>
            </form>
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

  return {
    questionId: id,
    authedUserId: authedUserId,
    authorName: users[question.author].name,
    authorAvatarURL: users[question.author].avatarURL,
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text,
  }
}

export default connect(mapStateToProps)(QuestionAnswer)