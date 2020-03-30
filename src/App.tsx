import React, { useEffect } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Pages from './components/Pages';
import history from './history';
import { fetchItems } from './actions';
import { fetchUsers } from './actions/users';
import { checkAuthentication, loadUser } from './actions/userActions';
import { StoreState, Item, User } from './models/types';

interface IProps {
  checkAuthenticationConnect: () => void;
  fetchUsers: () => void;
  items: Item[];
  user: User;
}

const App = ({
  checkAuthenticationConnect,
  fetchItems,
  fetchUsers,
  loadUser,
  items,
  user
}: any) => {

  useEffect(() => {
    // checkAuthenticationConnect();
    loadUser()
    fetchItems();
    fetchUsers();
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
  loadUser,
  fetchItems,
  fetchUsers
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items,
  user: state.user,
  users: state.users
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
