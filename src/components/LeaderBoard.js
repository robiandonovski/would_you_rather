import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeaderBoardMember from './LeaderBoardMember';
import PropTypes from 'prop-types';

class LeaderBoard extends Component {

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    leaderBoardMembers: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { isAuthed, leaderBoardMembers } = this.props

    if (isAuthed === false) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        {leaderBoardMembers.map((member, index) => (
          <LeaderBoardMember
            key={member.id}
            place={index + 1}
            name={member.name}
            avatarURL={member.avatarURL}
            totalAnsweredQuestions={member.totalAnsweredQuestions}
            totalCreatedQuestions={member.totalCreatedQuestions}
            totalPoints={member.totalPoints}
          />
        ))}
      </div>
    )
  }
}

function mapStateToProps({ authedUserId, users, questions }) {

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

  return {
    isAuthed: authedUserId !== null && authedUserId !== '',
    leaderBoardMembers: leaderBoardMembers
  }
}

export default connect(mapStateToProps)(LeaderBoard)