import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import CurrentAuthedUser from './CurrentAuthedUser';

class Nav extends Component {

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired
  };

  render() {
    const { isAuthed } = this.props

    return (
      <nav className='nav' >
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader board
            </NavLink>
          </li>
          {isAuthed === true && (
            <li className='nav-right'>
              <CurrentAuthedUser />
            </li>
          )}
        </ul>
      </nav>
    )
  }
}


function mapStateToProps({ authedUserId }) {
  return {
    isAuthed: authedUserId !== null && authedUserId !== ''
  }
}

export default withRouter(connect(mapStateToProps)(Nav))