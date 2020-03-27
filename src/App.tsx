import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Pages from './components/Pages';
import history from './history';
import { fetchItems } from './actions';
import { checkAuthentication, loadUser } from "./actions/userActions"
import { StoreState, IItem, User } from './models/types';
import ChatWindow from './components/views/ChatWindow';
import SelectChat from './components/laura-test-area/SelectChat';


interface IProps {
  checkAuthenticationConnect: () => void;
  fetchItems: () => void;
  loadUser: (name: string, password: string) => void
  items: IItem[];
  user: User
}

const App = ({ checkAuthenticationConnect, loadUser, fetchItems, items, user }: any) => {
  React.useEffect(() => {
    // checkAuthenticationConnect();
    loadUser(user.name, user.password)
    fetchItems();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='App'>
      <Router history={history}>
        <Route component={Pages} />
        <Route path="/laura"component={ChatWindow} />
        <Route path="/laura2"component={SelectChat} />
      </Router>
    </div>
  );
};

const mapDispatchToProps = {
  // checkAuthenticationConnect: checkAuthentication,
  fetchItems,
  loadUser
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items,
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
