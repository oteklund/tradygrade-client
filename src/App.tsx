import React from 'react';
import './App.css';
import { Router, Route } from "react-router-dom"
import Pages from './components/Pages';
import history from './history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route component={Pages} />
      </Router>
    </div>
  );
}

export default App;
