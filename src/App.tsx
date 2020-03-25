import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Pages from './components/Pages';
import SelectChat from './components/laura-test-area/SelectChat';
import history from './history';
import { checkAuthentication, fetchItems } from './actions';
import { StoreState, IItem } from './models/types';

interface IProps {
  checkAuthenticationConnect: () => void;
  fetchItems: () => void;
  items: IItem[];
}

const App = ({ checkAuthenticationConnect, fetchItems, items }: IProps) => {
  React.useEffect(() => {
    checkAuthenticationConnect();
  }, []);

  React.useEffect(() => {
    fetchItems();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='App'>
      <Router history={history}>
        <Route component={Pages} />
        <Route path="/laura" component={SelectChat}/>
      </Router>
    </div>
  );
};

const mapDispatchToProps = {
  checkAuthenticationConnect: checkAuthentication,
  fetchItems
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
