import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import store from './store';
import Pages from './components/Pages';
import history from './history';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router history={history}>
          <Route component={Pages} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
