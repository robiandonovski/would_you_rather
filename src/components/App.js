import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import Nav from './Nav'
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import QuestionDetails from './QuestionDetails';
import Login from './Login';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: '#76AEAB' }} />
          <div className='container'>
            {this.props.loading === false && (
              <div>
                <Nav />
                <Route path='/' exact component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={LeaderBoard} />
                <Route path='/questions/:id' component={QuestionDetails} />
              </div>
            )}
          </div>
        </Fragment>
      </Router >
    )
  }
}

function mapStateToProps({ authedUserId }) {
  return {
    loading: authedUserId === null
  }
}

export default connect(mapStateToProps)(App)