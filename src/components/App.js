import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import Nav from './Nav'
import Login from './Login';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import QuestionDetails from './QuestionDetails';
import error404 from './error404';

class App extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  };

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
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/login' component={Login} />
                  <Route path='/add' component={NewQuestion} />
                  <Route path='/leaderboard' component={LeaderBoard} />
                  <Route path='/questions/:id' component={QuestionDetails} />
                  <Route component={error404} />
                </Switch>
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