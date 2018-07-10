import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
  render() {
    const { isAuthed, leaderBoardMembers } = this.props

    if (isAuthed === false) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        {leaderBoardMembers.map((member, index) => (
          <Fragment key={member.id}>
            {index < 3 && (
              <p className='leaderBoardPlace'>{index+1} place</p>
            )}
            <div className='leaderBoardMember'>
              <div className='leaderBoardAvatar'>
                <img
                  src={member.avatarURL}
                  alt={`Avatar of ${member.name}`}
                />
              </div>
              <div className='leaderBoardInfo'>
                <h1>{member.name}</h1>
                <br/>
                <div className='leaderBoardScoreSection'>
                  <span>Answered questions</span>
                  <span className='float-right'>{member.totalAnsweredQuestions}</span>
                </div>
                <div className='leaderBoardScoreSection'>
                  <span>Created questions</span>
                  <span className='float-right'>{member.totalCreatedQuestions}</span>
                </div>
                <br/>
                <br/>
              </div>
              <div className='leaderBoardScore'>
                <br/>
                <h3 className='center'>Score</h3>
                <br/>
                <p className='totalScore'>{member.totalPoints}</p>
              </div>
              <div className='clearfix'></div>
            </div>
          </Fragment>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ authedUserId, users, questions }) {

  console.log("users", users)
  console.log("questions", questions)


  const leaderBoardMembers = Object.keys(users).map((user) => (
    {
      ...users[user],
      totalCreatedQuestions: Object.keys(questions)
        .filter((question) => questions[question].author === user).length,
      totalAnsweredQuestions: Object.keys(questions)
        .filter((question) => questions[question].optionOne.votes.includes(user)
                              || questions[question].optionTwo.votes.includes(user)).length
    })
  )
  .map((leaderBoardMember) => (
    {
      ...leaderBoardMember,
      totalPoints: leaderBoardMember.totalCreatedQuestions + leaderBoardMember.totalAnsweredQuestions
    }
  ))
  .sort((a, b) => b.totalPoints - a.totalPoints)

  console.log("leaderBoard", leaderBoardMembers)

  return {
    isAuthed: authedUserId !== null && authedUserId !== '',
    leaderBoardMembers: leaderBoardMembers
  }
}

export default connect(mapStateToProps)(LeaderBoard)