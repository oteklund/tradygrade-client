import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Router, Route } from 'react-router-dom';
import Pages from './components/Pages';
import SelectChat from './components/laura-test-area/SelectChat';
import history from './history';
import { checkAuthentication } from './actions'

interface IProps {
  checkAuthenticationConnect: () => void
}

const App = ({
  checkAuthenticationConnect
}: IProps) => {
  React.useEffect(() => {
    checkAuthenticationConnect()
  }, [])

  return (
    <div className="App">
      <Router history={history}>
        <Route component={Pages} />
        <Route path="/laura" component={SelectChat}/>
      </Router>
    </div>
  )
}

const mapDispatchToProps = {
  checkAuthenticationConnect: checkAuthentication
}

export default connect(
  null,
  mapDispatchToProps
)(App)
