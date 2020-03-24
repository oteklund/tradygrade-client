import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Router, Route } from 'react-router-dom';
import Pages from './components/Pages';
import ChatTesting from './components/laura-test-area/ChatTesting';
import history from './history';
import { checkAuthentication } from './actions'
import { Authorization } from './models/types'

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
  }, [checkAuthenticationConnect])
  const app = isAuthenticated !== null ? (
    <Router history={history}>
      <Route component={Pages} />
      <Route path="/laura" component={ChatTesting}/>
    </Router>
  ) : null

  return (
      <div className="App">
        {app}
      </div>
  )
}

const mapStateToProps = (state: Authorization) => ({
  isAuthenticated: state.isAuthenticated
})

const mapDispatchToProps = {
  checkAuthenticationConnect: checkAuthentication
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


// function App() {
//   return (
//     <Provider store={store}>
//       <div className='App'>
//         <Router history={history}>
//           <Route component={Pages} />
//         </Router>
//       </div>
//     </Provider>
//   );
// }

// export default App;
