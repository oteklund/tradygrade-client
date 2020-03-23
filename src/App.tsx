import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router></Router>
      </div>
    </Provider>
  );
}

export default App;
