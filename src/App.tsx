import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Pages from './components/Pages';
import history from './history';
import { fetchItems } from './actions';
import { checkAuthentication } from "./actions/userActions"
import { StoreState, IItem, User } from './models/types';

interface IProps {
  checkAuthenticationConnect: () => void;
  fetchItems: () => void;
  items: IItem[];
  user: User
}

const App = ({ checkAuthenticationConnect, fetchItems, items, user }: any) => {
  React.useEffect(() => {
    checkAuthenticationConnect(user);
    fetchItems();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='App'>
      <Router history={history}>
        <Route component={Pages} />
      </Router>
    </div>
  );
};

const mapDispatchToProps = {
  checkAuthenticationConnect: checkAuthentication,
  fetchItems
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items,
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
