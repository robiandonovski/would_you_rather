import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

// class LeaderBoardMember extends Component {
export default function LeaderBoardMember(props) {
  // static propTypes = {
  //   place: PropTypes.number.isRequired,
  //   name: PropTypes.string.isRequired,
  //   avatarURL: PropTypes.string.isRequired,
  //   totalAnsweredQuestions: PropTypes.number.isRequired,
  //   totalCreatedQuestions: PropTypes.number.isRequired,
  //   totalPoints: PropTypes.number.isRequired,
  // };
  const { place, name, avatarURL, totalAnsweredQuestions, totalCreatedQuestions, totalPoints } = props

  return (
    <Fragment>
      {place <= 3 && (
        <div className='leaderBoardPlace'>
          <span>{place} place</span>
        </div>
      )}
      <div className='leaderBoardMember'>
        <div className='leaderBoardAvatar'>
          <img
            src={avatarURL}
            alt={`Avatar of ${name}`}
          />
        </div>
        <div className='leaderBoardInfo'>
          <h2>{name}</h2>
          <br />
          <div className='leaderBoardScoreSection'>
            <span>Answered questions</span>
            <span className='float-right'>{totalAnsweredQuestions}</span>
          </div>
          <div className='leaderBoardScoreSection'>
            <span>Created questions</span>
            <span className='float-right'>{totalCreatedQuestions}</span>
          </div>
          <br />
          <br />
          <br />
        </div>
        <div className='leaderBoardScore'>
          <br />
          <h3 className='center'>Score</h3>
          <br />
          <p className='totalScore'>{totalPoints}</p>
        </div>
        <div className='clearfix'></div>
      </div>
    </Fragment>
  )
}

LeaderBoardMember.propTypes = {
  place: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  totalAnsweredQuestions: PropTypes.number.isRequired,
  totalCreatedQuestions: PropTypes.number.isRequired,
  totalPoints: PropTypes.number.isRequired
};