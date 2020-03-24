import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Router, Route } from 'react-router-dom';
import Pages from './components/Pages';
import history from './history';
import { checkAuthentication } from './actions'
import { StoreState } from './models/types'

interface IProps {
  checkAuthenticationConnect: () => void
  isAuthenticated: boolean | null
}

const App = ({
  checkAuthenticationConnect,
  isAuthenticated
}: IProps) => {
  React.useEffect(() => {
    checkAuthenticationConnect()
  }, [])
  const app = isAuthenticated !== null ? (
    <Router history={history}>
      <Route component={Pages} />
    </Router>
  ) : null

  return (
      <div className="App">
        {app}
      </div>
  )
}

const mapStateToProps = (state: StoreState) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  checkAuthenticationConnect: checkAuthentication
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
