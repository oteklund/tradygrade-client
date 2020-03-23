import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import store from './store';
import Pages from './components/Pages';
import ChatTesting from './components/laura-test-area/ChatTesting';
import history from './history';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router history={history}>
          <Route component={Pages} />
          <Route path="/laura" component={ChatTesting}/>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
